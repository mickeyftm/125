import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import { Route, useRouteMatch, useLocation, NavLink } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Image, Heading, RowType, Toggle, Text, Button, ArrowForwardIcon, Flex } from 'uikit'
import { ChainId } from '@pancakeswap/sdk'
import styled from 'styled-components'
import FlexLayout from 'components/Layout/Flex'
import Page from 'components/Layout/Page'
import { useFarms, usePollFarmsData, usePriceKDMBusd } from 'state/hooks'
import usePersistState from 'hooks/usePersistState'
import { Farm } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber } from 'utils/formatBalance'
import { getFarmApr } from 'utils/apr'
import { orderBy } from 'lodash'
import isArchivedPid from 'utils/farmHelpers'
import { latinise } from 'utils/latinise'
import PageHeader from 'components/PageHeader'
import SearchInput from 'components/SearchInput'
import Select, { OptionProps } from 'components/Select/Select'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import Table from './components/FarmTable/FarmTable'
import FarmTabButtons from './components/FarmTabButtons'
import { RowProps } from './components/FarmTable/Row'
import ToggleView from './components/ToggleView/ToggleView'
import { DesktopColumnSchema, ViewMode } from './components/types'

const Hero = styled.div`
  background: #9012fe; /* fallback */
  background-image: url('IMAGE_URL'); /* fallback */
  background-image: url('images/farms/3d-model.png'),
    linear-gradient(94.61deg, ${({ theme }) => theme.colors.background_2} 15.09%, #9012fe 90.14%); /* W3C */
  background-repeat: no-repeat;
  background-position: top center;
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

const Subtitle = styled.div`
  font-weight: 300;
  font-size: 18px;
`

const TitleButton = styled.button`
  margin-top: 20px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: #fff;
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 15px;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
    transition-duration: 0.3s;
  }
`

const ControlContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  position: relative;

  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 64px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 16px 32px;
    margin-bottom: 32px;
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  height: 30px;
  justify-content: flex-start;

  ${Text} {
    margin-left: 8px;
  }
`

const SwitchWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: 20px
  margin-right: 20px
  width: 100%;

  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: flex-end;
    width: auto;
    padding: 0;
  }
`

const LabelWrapper = styled.div`
  > ${Text} {
    font-size: 7px;
  }
`

const FilterContainer = styled.div`
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

const ViewControls = styled.div`
  justify-content: flex-start;
  display: flex;
  width: 100%;

  > div {
    padding: 8px 0px;
  }
  align-items: end;

  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`

const StyledImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 58px;
`
const NUMBER_OF_FARMS_VISIBLE = 12

const getDisplayApr = (cakeRewardsApr?: number, lpRewardsApr?: number) => {
  if (cakeRewardsApr && lpRewardsApr) {
    return (cakeRewardsApr + lpRewardsApr).toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  if (cakeRewardsApr) {
    return cakeRewardsApr.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  return null
}

const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const { data: farmsLP, userDataLoaded } = useFarms()
  const kdmPrice = usePriceKDMBusd()
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = usePersistState(ViewMode.TABLE, { localStorageKey: 'pancake_farm_view' })
  const { account } = useWeb3React()
  const [sortOption, setSortOption] = useState('hot')

  const isArchived = pathname.includes('archived')
  const isInactive = pathname.includes('history')
  const isActive = !isInactive && !isArchived

  usePollFarmsData(isArchived)

  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const userDataReady = !account || (!!account && userDataLoaded)

  const [stakedOnly, setStakedOnly] = useState(!isActive)
  useEffect(() => {
    setStakedOnly(!isActive)
  }, [isActive])

  const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X' && !isArchivedPid(farm.pid))
  const inactiveFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier === '0X' && !isArchivedPid(farm.pid))
  const archivedFarms = farmsLP.filter((farm) => isArchivedPid(farm.pid))

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedInactiveFarms = inactiveFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedArchivedFarms = archivedFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const farmsList = useCallback(
    (farmsToDisplay: Farm[]): FarmWithStakedValue[] => {
      let farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken || !farm.quoteToken.busdPrice) {
          return farm
        }
        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.busdPrice)
        const { cakeRewardsApr, lpRewardsApr } = isActive
          ? getFarmApr(
              new BigNumber(farm.poolWeight),
              kdmPrice,
              totalLiquidity,
              farm.lpAddresses[process.env.REACT_APP_CHAIN_ID],
            )
          : { cakeRewardsApr: 0, lpRewardsApr: 0 }
        return { ...farm, apr: cakeRewardsApr, lpRewardsApr, liquidity: totalLiquidity }
      })
      farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm) => !farm.isTokenOnly)

      if (query) {
        const lowercaseQuery = latinise(query.toLowerCase())
        farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm: FarmWithStakedValue) => {
          return latinise(farm.lpSymbol.toLowerCase()).includes(lowercaseQuery)
        })
      }
      return farmsToDisplayWithAPR
    },
    [kdmPrice, query, isActive],
  )

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const loadMoreRef = useRef<HTMLDivElement>(null)

  const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)
  const [observerIsSet, setObserverIsSet] = useState(false)

  const farmsStakedMemoized = useMemo(() => {
    let farmsStaked = []

    const sortFarms = (farms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
      switch (sortOption) {
        case 'apr':
          return orderBy(farms, (farm: FarmWithStakedValue) => farm.apr + farm.lpRewardsApr, 'desc')
        case 'multiplier':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0),
            'desc',
          )
        case 'earned':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.userData ? Number(farm.userData.earnings) : 0),
            'desc',
          )
        case 'liquidity':
          return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.liquidity), 'desc')
        default:
          return farms
      }
    }

    if (isActive) {
      farmsStaked = stakedOnly ? farmsList(stakedOnlyFarms) : farmsList(activeFarms)
    }
    if (isInactive) {
      farmsStaked = stakedOnly ? farmsList(stakedInactiveFarms) : farmsList(inactiveFarms)
    }
    if (isArchived) {
      farmsStaked = stakedOnly ? farmsList(stakedArchivedFarms) : farmsList(archivedFarms)
    }

    return sortFarms(farmsStaked).slice(0, numberOfFarmsVisible)
  }, [
    sortOption,
    activeFarms,
    farmsList,
    inactiveFarms,
    archivedFarms,
    isActive,
    isInactive,
    isArchived,
    stakedArchivedFarms,
    stakedInactiveFarms,
    stakedOnly,
    stakedOnlyFarms,
    numberOfFarmsVisible,
  ])

  useEffect(() => {
    const showMoreFarms = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfFarmsVisible((farmsCurrentlyVisible) => farmsCurrentlyVisible + NUMBER_OF_FARMS_VISIBLE)
      }
    }

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMoreFarms, {
        rootMargin: '0px',
        threshold: 1,
      })
      loadMoreObserver.observe(loadMoreRef.current)
      setObserverIsSet(true)
    }
  }, [farmsStakedMemoized, observerIsSet])

  // const rowData = farmsStakedMemoized.map((farm) => {
  //   const { token, quoteToken } = farm
  //   const tokenAddress = token.address
  //   const quoteTokenAddress = quoteToken.address
  //   const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase().replace('PANCAKE', '')

  //   const row: RowProps = {
  //     apr: {
  //       value: getDisplayApr(farm.apr, farm.lpRewardsApr),
  //       multiplier: farm.multiplier,
  //       lpLabel,
  //       tokenAddress,
  //       quoteTokenAddress,
  //       kdmPrice,
  //       originalValue: farm.apr,
  //     },
  //     farm: {
  //       label: lpLabel,
  //       pid: farm.pid,
  //       token: farm.token,
  //       quoteToken: farm.quoteToken,
  //     },
  //     earned: {
  //       earnings: getBalanceNumber(new BigNumber(farm.userData.earnings)),
  //       pid: farm.pid,
  //     },
  //     liquidity: {
  //       liquidity: farm.liquidity,
  //     },
  //     multiplier: {
  //       multiplier: farm.multiplier,
  //     },
  //     details: farm,
  //   }

  //   return row
  // })

  const renderContent = (): JSX.Element => {
    // if (viewMode === ViewMode.TABLE && rowData.length) {
    //   const columnSchema = DesktopColumnSchema

    //   const columns = columnSchema.map((column) => ({
    //     id: column.id,
    //     name: column.name,
    //     label: column.label,
    //     sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
    //       switch (column.name) {
    //         case 'farm':
    //           return b.id - a.id
    //         case 'apr':
    //           if (a.original.apr.value && b.original.apr.value) {
    //             return Number(a.original.apr.value) - Number(b.original.apr.value)
    //           }

    //           return 0
    //         case 'earned':
    //           return a.original.earned.earnings - b.original.earned.earnings
    //         default:
    //           return 1
    //       }
    //     },
    //     sortable: column.sortable,
    //   }))

    //   return <Table data={rowData} columns={columns} userDataReady={userDataReady} />
    // }

    return (
      <div>
        <FlexLayout>
          <Route exact path={`${path}`}>
            {farmsStakedMemoized.map((farm) => (
              <FarmCard
                key={farm.pid}
                farm={farm}
                displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
                kdmPrice={kdmPrice}
                account={account}
                removed={false}
              />
            ))}
          </Route>
          <Route exact path={`${path}/history`}>
            {farmsStakedMemoized.map((farm) => (
              <FarmCard
                key={farm.pid}
                farm={farm}
                displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
                kdmPrice={kdmPrice}
                account={account}
                removed
              />
            ))}
          </Route>
          <Route exact path={`${path}/archived`}>
            {farmsStakedMemoized.map((farm) => (
              <FarmCard
                key={farm.pid}
                farm={farm}
                displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
                kdmPrice={kdmPrice}
                account={account}
                removed
              />
            ))}
          </Route>
        </FlexLayout>
      </div>
    )
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  return (
    <>
      <Page>
        <Hero>
          <Title>{t('Farms')}</Title>
          <Subtitle>{t('Stable LP tokens to earn.')}</Subtitle>
          {/* <NavLink exact activeClassName="active" to="/farms/auction" id="lottery-pot-banner">
          <TitleButton>
              {t('Community Auctions')}
              <ArrowForwardIcon color="primary" />
            </TitleButton>
          </NavLink> */}
        </Hero>
        <ControlContainer>
          <ViewControls>
            <ToggleWrapper>
              <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} scale="sm" />
              <Text fontSize="10px" mr="16px">
                {t('Staked only')}
              </Text>
            </ToggleWrapper>
            <SwitchWrapper>
              <FarmTabButtons hasStakeInFinishedFarms={stakedInactiveFarms.length > 0} />
            </SwitchWrapper>
          </ViewControls>
          <FilterContainer>
            <LabelWrapper>
              <Text textTransform="uppercase">{t('Sort by')}</Text>
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
                    label: t('Multiplier'),
                    value: 'multiplier',
                  },
                  {
                    label: t('Earned'),
                    value: 'earned',
                  },
                  {
                    label: t('Liquidity'),
                    value: 'liquidity',
                  },
                ]}
                onChange={handleSortOptionChange}
              />
            </LabelWrapper>
            <LabelWrapper style={{ marginLeft: 16 }}>
              <Text textTransform="uppercase">{t('Search')}</Text>
              <SearchInput onChange={handleChangeQuery} placeholder="Search Farms" />
            </LabelWrapper>
          </FilterContainer>
        </ControlContainer>
        {renderContent()}
        <div ref={loadMoreRef} />
      </Page>
    </>
  )
}

export default Farms
