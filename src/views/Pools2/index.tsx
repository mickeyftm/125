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
import { usepools, useFetchPublicpoolsData, usePollFarmsData, useCakeVault } from 'state/hooks'
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
    background-image: url('images/pools/3d-model.png'),
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

const NUMBER_OF_pools_VISIBLE = 12

const pools: React.FC = () => {
  const location = useLocation()
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { pools, userDataLoaded } = usepools(account)
  const [stakedOnly, setStakedOnly] = usePersistState(false, { localStorageKey: 'pancake_pool_staked' })
  const [numberOfpoolsVisible, setNumberOfpoolsVisible] = useState(NUMBER_OF_pools_VISIBLE)
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

  // const pools = useMemo(() => {
  //   const cakePool = poolsWithoutAutoVault.find((pool) => pool.sousId === 0)
  //   const cakeAutoVault = { ...cakePool, isAutoVault: true }
  //   return [cakeAutoVault, ...poolsWithoutAutoVault]
  // }, [poolsWithoutAutoVault])

  // TODO aren't arrays in dep array checked just by reference, i.e. it will rerender every time reference changes?
  const [finishedpools, openpools] = useMemo(() => partition(pools, (pool) => pool.isFinished), [pools])
  const stakedOnlyFinishedpools = useMemo(
    () =>
      finishedpools.filter((pool) => {
        if (pool.isAutoVault) {
          return accountHasVaultShares
        }
        return pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)
      }),
    [finishedpools, accountHasVaultShares],
  )
  const stakedOnlyOpenpools = useMemo(
    () =>
      openpools.filter((pool) => {
        if (pool.isAutoVault) {
          return accountHasVaultShares
        }
        return pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)
      }),
    [openpools, accountHasVaultShares],
  )
  const hasStakeInFinishedpools = stakedOnlyFinishedpools.length > 0

  usePollFarmsData()
  useFetchPublicpoolsData()

  useEffect(() => {
    const showMorepools = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfpoolsVisible((poolsCurrentlyVisible) => poolsCurrentlyVisible + NUMBER_OF_pools_VISIBLE)
      }
    }

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMorepools, {
        rootMargin: '0px',
        threshold: 1,
      })
      loadMoreObserver.observe(loadMoreRef.current)
      setObserverIsSet(true)
    }
  }, [observerIsSet])

  const showFinishedpools = location.pathname.includes('history')

  const handleChangeSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  const sortpools = (poolsToSort: Pool[]) => {
    switch (sortOption) {
      case 'apr':
        // Ternary is needed to prevent pools without APR (like MIX) getting top spot
        return orderBy(
          poolsToSort,
          (pool: Pool) => (pool.apr ? getAprData(pool, performanceFeeAsDecimal).apr : 0),
          'desc',
        )
      case 'earned':
        return orderBy(
          poolsToSort,
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
          poolsToSort,
          (pool: Pool) => (pool.isAutoVault ? totalCakeInVault.toNumber() : pool.totalStaked.toNumber()),
          'desc',
        )
      default:
        return poolsToSort
    }
  }

  const poolsToShow = () => {
    let chosenpools = []
    if (showFinishedpools) {
      chosenpools = stakedOnly ? stakedOnlyFinishedpools : finishedpools
    } else {
      chosenpools = stakedOnly ? stakedOnlyOpenpools : openpools
    }

    if (searchQuery) {
      const lowercaseQuery = latinise(searchQuery.toLowerCase())
      chosenpools = chosenpools.filter((pool) =>
        latinise(pool.earningToken.symbol.toLowerCase()).includes(lowercaseQuery),
      )
    }

    return sortpools(chosenpools).slice(0, numberOfpoolsVisible)
  }

  const cardLayout = (
    <CardLayout>
      {poolsToShow().map((pool) => (
        <PoolCard key={pool.sousId} pool={pool} account={account} />
      ))}
    </CardLayout>
  )

  return (
    <>
      <Page>
        <Hero>
          <Title>{t('Partners pools')}</Title>
          < Subtitle > {t('Just Stake some tokens to earn.')}</Subtitle>
          <Subtitle bold>{t('👽')}</Subtitle>
        </Hero>
        <PoolControls>
          <SwitchWrapper>
            <PoolTabButtons
              stakedOnly={stakedOnly}
              setStakedOnly={setStakedOnly}
              hasStakeInFinishedpools={hasStakeInFinishedpools}
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
                <SearchInput onChange={handleChangeSearchQuery} placeholder="Search pools" />
              </ControlStretch>
            </TabWrapper>
          </SearchWrapper>
        </PoolControls>
        {showFinishedpools && (
          <Text fontSize="20px" color="failure" pb="32px">
            {t('These pools are no longer distributing rewards. Please unstake your tokens.')}
          </Text>
        )}
        {cardLayout}
        <div ref={loadMoreRef} />
      </Page>
    </>
  )
}

export default pools
