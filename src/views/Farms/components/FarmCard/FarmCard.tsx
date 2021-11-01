import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { Flex, Text, Skeleton, TrophyIcon, PercentIcon } from 'uikit'
import { Farm } from 'state/types'
import { getBscScanAddressUrl } from 'utils/bscscan'
import { useTranslation } from 'contexts/Localization'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import { getAddress } from 'utils/addressHelpers'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'

export interface FarmWithStakedValue extends Farm {
  apr?: number
  lpRewardsApr?: number
  liquidity?: BigNumber
}

const AccentGradient = keyframes`
  0% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 50% 100%;
  }
  100% {
    background-position: 50% 0%;
  }
`

const StyledCardAccent = styled.div`
  background-size: 400% 400%;
  border-radius: 12px;
  position: absolute;
  top: -1px;
  right: -1px;
  bottom: -3px;
  left: -1px;
  z-index: -1;
`

const FCard = styled.div<{ isPromotedFarm: boolean }>`
  align-self: baseline;
  background: ${(props) => props.theme.card.background};
  border-radius: 12px;
  box-shadow: 0px 1px 4px rgba(25, 19, 38, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  text-align: center;
  background-color: #361c7f;
`

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBorder};
  height: 2px;
  margin: 12px auto;
  width: 100%;
  background-color: #2e0055;
`

const HeadingWrapper = styled.div<{ isPromotedFarm: boolean }>`
  padding: 32px 22px 26px;
  border-radius: 12px 12px 0px 0px;
  background-color: ${({ theme }) => theme.colors.primary}; ;
`

const SubheadingWrapper = styled.div<{ isPromotedFarm: boolean }>`
  padding: 12px 22px 12px 20px;
  border-radius: 0px 0px 12px 12px;
  background-color: #6700c1;
`

const BodyWrapper = styled.div`
  padding: 0px 24px 24px 24px;
`

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`

interface FarmCardProps {
  farm: FarmWithStakedValue
  displayApr: string
  removed: boolean
  kdmPrice?: BigNumber
  account?: string
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, displayApr, removed, kdmPrice, account }) => {
  const { t } = useTranslation()

  const [showExpandableSection, setShowExpandableSection] = useState(false)

  const totalValueFormatted =
    farm.liquidity && farm.liquidity.gt(0)
      ? `$${farm.liquidity.toNumber().toLocaleString(undefined, { maximumFractionDigits: 0 })}`
      : ''

  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('PANCAKE', '')
  const earnLabel = farm.dual ? farm.dual.earnLabel : t('DMD')

  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: farm.quoteToken.address,
    tokenAddress: farm.token.address,
  })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`
  const lpAddress = getAddress(farm.lpAddresses)
  const isPromotedFarm = farm.token.symbol === 'DMD'
  return (
    <FCard isPromotedFarm={isPromotedFarm}>
      {isPromotedFarm && <StyledCardAccent />}
      <HeadingWrapper isPromotedFarm={isPromotedFarm}>
        <CardHeading
          lpLabel={lpLabel}
          multiplier={farm.multiplier}
          isCommunityFarm={farm.isCommunity}
          token={farm.token}
          quoteToken={farm.quoteToken}
        />
      </HeadingWrapper>
      <SubheadingWrapper isPromotedFarm={isPromotedFarm}>
        <Flex justifyContent="space-between" flexWrap="wrap">
          <Flex justifyContent="space-evenly">
            <Flex>
              <PercentIcon width="32px" color="secondary" mr="8px" />
            </Flex>
            <Flex justifyContent="space-between" flexDirection="column" alignContent="flex-start">
              <Flex>
                <Text fontFamily="Quicksand" fontSize="10px" fontWeight="700">
                  {t('APR')}
                </Text>
              </Flex>
              <Flex>
                <Text fontFamily="Quicksand" fontSize="12px" fontWeight="700">
                  {displayApr}%
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex>
            <Flex>
              <TrophyIcon width="32px" color="secondary" mr="8px" />
            </Flex>
            <Flex justifyContent="center" flexDirection="column" alignContent="flex-start">
              <Flex>
                <Text fontFamily="Quicksand" fontSize="8px" fontWeight="700">
                  {t('Reward')}
                </Text>
              </Flex>
              <Flex>
                <Text fontFamily="Quicksand" fontSize="10px" fontWeight="700">
                  {earnLabel}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </SubheadingWrapper>
      <BodyWrapper>
        <CardActionsContainer farm={farm} account={account} addLiquidityUrl={addLiquidityUrl} />
        <Divider />
        <ExpandableSectionButton
          onClick={() => setShowExpandableSection(!showExpandableSection)}
          expanded={showExpandableSection}
        />
        <ExpandingWrapper expanded={showExpandableSection}>
          <DetailsSection
            removed={removed}
            bscScanAddress={getBscScanAddressUrl(lpAddress)}
            infoAddress={`https://info.spookyswap.finance/pair/${lpAddress}`}
            totalValueFormatted={totalValueFormatted}
            lpLabel={lpLabel}
            addLiquidityUrl={addLiquidityUrl}
            fee={farm.fee}
          />
        </ExpandingWrapper>
      </BodyWrapper>
    </FCard>
  )
}

export default FarmCard
