import React from 'react'
import {
  Flex,
  TooltipText,
  IconButton,
  useModal,
  CalculateIcon,
  Skeleton,
  useTooltip,
  PercentIcon,
  Text,
  HelpIcon,
  InfoFillIcon,
} from 'uikit'
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'
import ApyCalculatorModal from 'components/ApyCalculatorModal'
import { Pool } from 'state/types'
import { BASE_EXCHANGE_URL } from 'config'
import { getAprData } from 'views/Pools/helpers'
import { getAddress } from 'utils/addressHelpers'
import { CompoundingPoolTag, ManualPoolTag } from 'components/Tags'
import styled from 'styled-components'

interface AprRowProps {
  pool: Pool
  performanceFee?: number
}

const TagWrapper = styled(Flex)``

const AprRow: React.FC<AprRowProps> = ({ pool, performanceFee = 0 }) => {
  const { t } = useTranslation()
  const { stakingToken, earningToken, apr, earningTokenPrice, isAutoVault } = pool

  const { apr: earningsPercentageToDisplay, roundingDecimals, compoundFrequency } = getAprData(pool, performanceFee)

  const apyModalLink =
    stakingToken.address && `${BASE_EXCHANGE_URL}/#/swap?outputCurrency=${getAddress(stakingToken.address)}`

  const autoTooltipText = t(
    'Any funds you stake in this pool will be automagically harvested and restaked (compounded) for you.',
  )
  const manualTooltipText = t('You must harvest and compound your earnings from this pool manually.')
  const { targetRef, tooltip, tooltipVisible } = useTooltip(isAutoVault ? autoTooltipText : manualTooltipText, {
    placement: 'bottom',
  })

  const displayAPR = earningsPercentageToDisplay
    ? earningsPercentageToDisplay.toLocaleString('en-US', { maximumFractionDigits: 2 })
    : null

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Flex justifyContent="flex-start">
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
              {displayAPR}%
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex justifyContent="flex-end">
        <TagWrapper>
          {isAutoVault ? <CompoundingPoolTag /> : <ManualPoolTag scale="xxxs" />}
          {tooltipVisible && tooltip}
        </TagWrapper>
        <Flex ref={targetRef}>
          <InfoFillIcon ml="4px" width="12px" height="12px" color="textSubtle" />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default AprRow
