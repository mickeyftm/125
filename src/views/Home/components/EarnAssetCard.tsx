import React from 'react'
import styled from 'styled-components'
import orderBy from 'lodash/orderBy'
import { Heading, Card, CardBody, Flex } from 'uikit'
import { NavLink } from 'react-router-dom'
import pools from 'config/constants/pools'
import { Pool } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import GetItButton from './GetItButton'

const StyledFarmStakingCard = styled(Card)`
  background: linear-gradient(#53dee9, #7645d9);
  background: linear-gradient(107.19deg, #5f01b1 13.74%, #ec5bdc 87.06%);
  margin-left: auto;
  margin-right: auto;
  width: 100%;
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

const LinkButton = styled.button`
  background-color: #fff;
  // font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  border-radius: 8px;
  border: none;
  width: 100px;
  height: 30px;
`

const activeNonCakePools = pools.filter((pool) => !pool.isFinished && !pool.earningToken.symbol.includes('CAKE'))
const latestPools: Pool[] = orderBy(activeNonCakePools, ['sortOrder', 'pid'], ['desc', 'desc']).slice(0, 3)
// Always include CAKE
const assets = ['CAKE', ...latestPools.map((pool) => pool.earningToken.symbol)].join(', ')

const EarnAssetCard = () => {
  const { t } = useTranslation()
  const assetText = t('Earn %assets% in Pools', { assets })
  const [earn, InPools] = assetText.split(assets)

  return (
    <StyledFarmStakingCard isSecondary>
      <CardBody p="16px 16px 16px 30px">
        <Heading color="white" scale="lg" mb="8px">
          {earn}
        </Heading>
        <CardMidContent color="white" mb="8px">
          DMD
        </CardMidContent>
        <Flex flexDirection="column">
          <Flex justifyContent="flex-start">
            <Heading color="contrast" scale="lg">
              {InPools}
            </Heading>
          </Flex>
          <Flex justifyContent="flex-end">
            <GetItButton to="/pools" textColor="#001824" buttonColor="#FFFFFF" />
          </Flex>
        </Flex>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default EarnAssetCard
