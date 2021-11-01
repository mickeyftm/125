import React from 'react'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { Text, Flex, LinkExternal, Skeleton } from 'uikit'

export interface ExpandableSectionProps {
  bscScanAddress?: string
  infoAddress?: string
  removed?: boolean
  totalValueFormatted?: string
  lpLabel?: string
  addLiquidityUrl?: string
  fee?: number
}

const Wrapper = styled.div`
  margin-top: 24px;
`

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  bscScanAddress,
  infoAddress,
  removed,
  totalValueFormatted,
  lpLabel,
  addLiquidityUrl,
  fee,
}) => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      {fee && (
        <Flex mb="2px" justifyContent="space-between" alignItems="center">
          <Text fontSize="12px" fontFamily="Quicksand" color="failure">
            {t(`This pool has a deposit fee of ${fee}%`)}
          </Text>
        </Flex>
      )}
      <Flex justifyContent="space-between">
        <Text fontSize="12px" fontFamily="Quicksand">
          {t('Total Liquidity')}:
        </Text>
        {totalValueFormatted ? (
          <Text fontSize="12px" fontFamily="Quicksand">
            {totalValueFormatted}
          </Text>
        ) : (
          <Skeleton width={75} height={25} />
        )}
      </Flex>
      {!removed && (
        <StyledLinkExternal fontSize="12px" fontFamily="Quicksand" href={addLiquidityUrl}>
          {t('Get %symbol%', { symbol: lpLabel })}
        </StyledLinkExternal>
      )}
      <StyledLinkExternal fontSize="12px" fontFamily="Quicksand" href={bscScanAddress}>
        {t('View Contract')}
      </StyledLinkExternal>
      <StyledLinkExternal fontSize="12px" fontFamily="Quicksand" href={infoAddress}>
        {t('See Pair Info')}
      </StyledLinkExternal>
    </Wrapper>
  )
}

export default DetailsSection
