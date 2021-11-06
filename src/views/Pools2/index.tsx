import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Heading, Flex, Image, Text } from 'uikit'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import { useTranslation } from 'contexts/Localization'
import usePersistState from 'hooks/usePersistState'
import { usepools2, useFetchPublicpools2Data, usePollFarmsData, useCakeVault } from 'state/hooks'
import { latinise } from 'utils/latinise'
import FlexLayout from 'components/Layout/Flex'
import Page from 'components/Layout/Page'
import PageHeader from 'components/PageHeader'
import SearchInput from 'components/SearchInput'
import Select, { OptionProps } from 'components/Select/Select'
import { Pool } from 'state/types'
import PoolCard from './components/PoolCard'
import PoolTabButtons from './components/PoolTabButtons'
import { ViewMode } from './components/ToggleView/ToggleView'
import { getAprData, getCakeVaultEarnings } from './helpers'

const Hero = styled.div`
  background: #9012fe; /* fallback */
  background-image: url('IMAGE_URL'); /* fallback */
  background-image: linear-gradient(94.61deg, ${({ theme }) => theme.colors.background_2} 15.09%, #9012fe 90.14%);
  ${({ theme }) => theme.mediaQueries.md} {
    background-image: url('images/pools2/3d-model.png'),
      linear-gradient(94.61deg, ${({ theme }) => theme.colors.background_2} 15.09%, #9012fe 90.14%); /* W3C */
  }

  background-repeat: no-repeat;
  background-position: top right 15%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: left;
  color: white;
  height: 245px;
  margin: auto;
  margin-bottom: 32px;
  padding-left: 40px;
  // -webkit-box-shadow: 0px 4px 4px 0px ${({ theme }) => theme.colors.background_2};
  // box-shadow: 0px 4px 4px 0px ${({ theme }) => theme.colors.background_2};
  border-radius: 24px;
`

const Title = styled.div`
  font-size: 50px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #ffffff;
`

interface SubtitleProps {
  bold?: boolean
}

const Subtitle = styled.div<SubtitleProps>`
  font-weight: ${({ bold }) => (bold ? 600 : 300)};
  margin-bottom: 10px;
  font-size: 18px;
`

const CardLayout = styled(FlexLayout)`
  justify-content: center;
`

const SearchSortContainer = styled(Flex)`
  gap: 10px;
  justify-content: space-between;
`

const ControlStretch = styled(Flex)`
  > div {
    flex: 1;
  }
`

const PoolControls = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 54px;
  justify-content: space-between;
  flex-wrap: wrap;
`

const TabWrapper = styled.div``

const SwitchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    width: auto;
  }
`

const SearchWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 8px 0px;
  justify-content: flex-end;
  align-items: end;

  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: flex-end;
    width: auto;
    padding: 0;
  }
`

const NUMBER_OF_pools2_VISIBLE = 12

const pools2: React.FC = () => {
  const location = useLocation()
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { pools2, userDataLoaded } = usepools2(account)
  const [stakedOnly, setStakedOnly] = usePersistState(false, { localStorageKey: 'pancake_pool_staked' })
  const [numberOfpools2Visible, setNumberOfpools2Visible] = useState(NUMBER_OF_pools2_VISIBLE)
  const [observerIsSet, setObserverIsSet] = useState(false)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const [viewMode, setViewMode] = usePersistState(ViewMode.TABLE, { localStorageKey: 'pancake_farm_view' })
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState('hot')
  const {
    userData: { cakeAtLastUserAction, userShares },
    fees: { performanceFee },
    pricePerFullShare,
    totalCakeInVault,
  } = useCakeVault()
  const accountHasVaultShares = userShares && userShares.gt(0)
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100

  // const pools2 = useMemo(() => {
  //   const cakePool = pools2WithoutAutoVault.find((pool) => pool.sousId === 0)
  //   const cakeAutoVault = { ...cakePool, isAutoVault: true }
  //   return [cakeAutoVault, ...pools2WithoutAutoVault]
  // }, [pools2WithoutAutoVault])

  // TODO aren't arrays in dep array checked just by reference, i.e. it will rerender every time reference changes?
  const [finishedpools2, openpools2] = useMemo(() => partition(pools2, (pool) => pool.isFinished), [pools2])
  const stakedOnlyFinishedpools2 = useMemo(
    () =>
      finishedpools2.filter((pool) => {
        if (pool.isAutoVault) {
          return accountHasVaultShares
        }
        return pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)
      }),
    [finishedpools2, accountHasVaultShares],
  )
  const stakedOnlyOpenpools2 = useMemo(
    () =>
      openpools2.filter((pool) => {
        if (pool.isAutoVault) {
          return accountHasVaultShares
        }
        return pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)
      }),
    [openpools2, accountHasVaultShares],
  )
  const hasStakeInFinishedpools2 = stakedOnlyFinishedpools2.length > 0

  usePollFarmsData()
  useFetchPublicpools2Data()

  useEffect(() => {
    const showMorepools2 = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfpools2Visible((pools2CurrentlyVisible) => pools2CurrentlyVisible + NUMBER_OF_pools2_VISIBLE)
      }
    }

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMorepools2, {
        rootMargin: '0px',
        threshold: 1,
      })
      loadMoreObserver.observe(loadMoreRef.current)
      setObserverIsSet(true)
    }
  }, [observerIsSet])

  const showFinishedpools2 = location.pathname.includes('history')

  const handleChangeSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  const sortpools2 = (pools2ToSort: Pool[]) => {
    switch (sortOption) {
      case 'apr':
        // Ternary is needed to prevent pools2 without APR (like MIX) getting top spot
        return orderBy(
          pools2ToSort,
          (pool: Pool) => (pool.apr ? getAprData(pool, performanceFeeAsDecimal).apr : 0),
          'desc',
        )
      case 'earned':
        return orderBy(
          pools2ToSort,
          (pool: Pool) => {
            if (!pool.userData || !pool.earningTokenPrice) {
              return 0
            }
            return pool.isAutoVault
              ? getCakeVaultEarnings(
                account,
                cakeAtLastUserAction,
                userShares,
                pricePerFullShare,
                pool.earningTokenPrice,
              ).autoUsdToDisplay
              : pool.userData.pendingReward.times(pool.earningTokenPrice).toNumber()
          },
          'desc',
        )
      case 'totalStaked':
        return orderBy(
          pools2ToSort,
          (pool: Pool) => (pool.isAutoVault ? totalCakeInVault.toNumber() : pool.totalStaked.toNumber()),
          'desc',
        )
      default:
        return pools2ToSort
    }
  }

  const pools2ToShow = () => {
    let chosenpools2 = []
    if (showFinishedpools2) {
      chosenpools2 = stakedOnly ? stakedOnlyFinishedpools2 : finishedpools2
    } else {
      chosenpools2 = stakedOnly ? stakedOnlyOpenpools2 : openpools2
    }

    if (searchQuery) {
      const lowercaseQuery = latinise(searchQuery.toLowerCase())
      chosenpools2 = chosenpools2.filter((pool) =>
        latinise(pool.earningToken.symbol.toLowerCase()).includes(lowercaseQuery),
      )
    }

    return sortpools2(chosenpools2).slice(0, numberOfpools2Visible)
  }

  const cardLayout = (
    <CardLayout>
      {pools2ToShow().map((pool) => (
        <PoolCard key={pool.sousId} pool={pool} account={account} />
      ))}
    </CardLayout>
  )

  return (
    <>
      <Page>
        <Hero>
          <Title>{t('Partners pools2')}</Title>
          < Subtitle > {t('Just Stake some tokens to earn.')}</Subtitle>
          <Subtitle bold>{t('👽')}</Subtitle>
        </Hero>
        <PoolControls>
          <SwitchWrapper>
            <PoolTabButtons
              stakedOnly={stakedOnly}
              setStakedOnly={setStakedOnly}
              hasStakeInFinishedpools2={hasStakeInFinishedpools2}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
          </SwitchWrapper>
          <SearchWrapper>
            <TabWrapper>
              <Text fontSize="7px" bold textTransform="uppercase">
                {t('Sort by')}
              </Text>
              <Select
                options={[
                  {
                    label: t('Hot'),
                    value: 'hot',
                  },
                  {
                    label: t('APR'),
                    value: 'apr',
                  },
                  {
                    label: t('Earned'),
                    value: 'earned',
                  },
                  {
                    label: t('Total staked'),
                    value: 'totalStaked',
                  },
                ]}
                onChange={handleSortOptionChange}
              />
            </TabWrapper>
            <TabWrapper style={{ marginLeft: 16 }}>
              <Text fontSize="7px" bold textTransform="uppercase">
                {t('Search')}
              </Text>
              <ControlStretch>
                <SearchInput onChange={handleChangeSearchQuery} placeholder="Search pools2" />
              </ControlStretch>
            </TabWrapper>
          </SearchWrapper>
        </PoolControls>
        {showFinishedpools2 && (
          <Text fontSize="20px" color="failure" pb="32px">
            {t('These pools2 are no longer distributing rewards. Please unstake your tokens.')}
          </Text>
        )}
        {cardLayout}
        <div ref={loadMoreRef} />
      </Page>
    </>
  )
}

export default pools2
