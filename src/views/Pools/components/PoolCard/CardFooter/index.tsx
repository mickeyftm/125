import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Flex, CardFooter, ExpandableLabel, HelpIcon, useTooltip, Text } from 'uikit'
import { Pool } from 'state/types'
import { CompoundingPoolTag, ManualPoolTag } from 'components/Tags'
import ExpandedFooter from './ExpandedFooter'

interface FooterProps {
  pool: Pool
  account: string
  totalCakeInVault?: BigNumber
}

const ExpandableButtonWrapper = styled(Flex)`
  align-items: center;
  justify-content: center;
  button {
    padding: 0;
  }
`

const TextWrapper = styled.div`
  color: #ffffff;
`

const Footer: React.FC<FooterProps> = ({ pool, account }) => {
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <CardFooter backgroundColor="#361C7F">
      <ExpandableButtonWrapper>
        <ExpandableLabel expanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)}>
          <Text fontFamily="Quicksand" fontSize="10px" color="contrast" bold>
            {isExpanded ? t('Hide') : t('Details')}
          </Text>
        </ExpandableLabel>
      </ExpandableButtonWrapper>
      {isExpanded && <ExpandedFooter pool={pool} account={account} />}
    </CardFooter>
  )
}

export default Footer
