import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, Skeleton } from 'uikit'
import { ChainId } from '@pancakeswap/sdk'
import max from 'lodash/max'
import { NavLink } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state'
import { useFarms, usePriceKDMBusd } from 'state/hooks'
import { fetchFarmsPublicDataAsync, nonArchivedFarms } from 'state/farms'
import { getFarmApr } from 'utils/apr'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import GetItButton from './GetItButton'

const StyledFarmStakingCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background_2};

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }

  transition: opacity 200ms;
  // &:hover {
  //   opacity: 0.65;
  // }
`
const CardMidContent = styled(Heading).attrs({ scale: 'xl' })`
  line-height: 44px;
`
const EarnAPRCard = () => {
  const [isFetchingFarmData, setIsFetchingFarmData] = useState(true)
  const { t } = useTranslation()
  const { data: farmsLP } = useFarms()
  const cakePrice = usePriceKDMBusd()
  const dispatch = useAppDispatch()
  const { observerRef, isIntersecting } = useIntersectionObserver()

  // Fetch farm data once to get the max APR
  useEffect(() => {
    const fetchFarmData = async () => {
      try {
        await dispatch(fetchFarmsPublicDataAsync(nonArchivedFarms.map((nonArchivedFarm) => nonArchivedFarm.pid)))
      } finally {
        setIsFetchingFarmData(false)
      }
    }

    if (isIntersecting) {
      fetchFarmData()
    }
  }, [dispatch, setIsFetchingFarmData, isIntersecting])

  const highestApr = useMemo(() => {
    if (cakePrice.gt(0)) {
      const aprs = farmsLP.map((farm) => {
        // Filter inactive farms, because their theoretical APR is super high. In practice, it's 0.
        if (farm.pid !== 0 && farm.multiplier !== '0X' && farm.lpTotalInQuoteToken && farm.quoteToken.busdPrice) {
          const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.busdPrice)
          const { cakeRewardsApr, lpRewardsApr } = getFarmApr(
            new BigNumber(farm.poolWeight),
            cakePrice,
            totalLiquidity,
            farm.lpAddresses[ChainId.MAINNET],
          )
          return cakeRewardsApr + lpRewardsApr
        }
        return null
      })

      const maxApr = max(aprs)
      return maxApr?.toLocaleString('en-US', { maximumFractionDigits: 2 })
    }
    return null
  }, [cakePrice, farmsLP])

  const aprText = highestApr || '-'
  const earnAprText = t('Earn up to %highestApr% APR in Farms', { highestApr: aprText })
  const [earnUpTo, InFarms] = earnAprText.split(aprText)

  return (
    <StyledFarmStakingCard isSecondary>
      <CardBody p="16px 16px 16px 30px">
        <Heading color="contrast" scale="lg" mb="8px">
          {earnUpTo}
        </Heading>
        <CardMidContent color="#FEFACD" mb="8px">
          {highestApr && !isFetchingFarmData ? (
            `${highestApr}%`
          ) : (
            <>
              <Skeleton animation="pulse" variant="rect" height="44px" />
              <div ref={observerRef} />
            </>
          )}
        </CardMidContent>
        <Flex flexDirection="column">
          <Flex justifyContent="flex-start">
            <Heading color="contrast" scale="lg">
              {InFarms}
            </Heading>
          </Flex>
          <Flex justifyContent="flex-end">
            <GetItButton to="/farms" textColor="#FFFFFF" buttonColor="#9112FF" />
          </Flex>
        </Flex>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default EarnAPRCard
