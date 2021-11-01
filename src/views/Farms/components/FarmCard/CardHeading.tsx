import React from 'react'
import styled from 'styled-components'
import { Tag, Flex, Heading } from 'uikit'
import { CommunityTag, CoreTag } from 'components/Tags'
import { Token } from 'config/constants/types'
import TokenPairImage from 'components/TokenPairImage'
import { getAddress } from 'utils/addressHelpers'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  isCommunityFarm?: boolean
  token: Token
  quoteToken: Token
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 4px;
  }
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
  color: ${({ theme }) => theme.colors.secondary}; ;
`

const TagWrapper = styled(Flex)`
  margin-bottom: 6px;
`

const CardHeading: React.FC<ExpandableSectionProps> = ({ lpLabel, multiplier, isCommunityFarm, token, quoteToken }) => {
  return (
    <Wrapper justifyContent="space-between" alignItems="center">
      <img
        src={`images/pairs/${getAddress(quoteToken.address)}-${getAddress(token.address)}.png`}
        alt={`${getAddress(quoteToken.address)}-${getAddress(token.address)}.png`}
      />
      <Flex flexDirection="column" alignItems="flex-end">
        <TagWrapper justifyContent="center">
          {isCommunityFarm ? <CommunityTag /> : <CoreTag scale="xxs" />}
          <MultiplierTag scale="xs" variant="text">
            {multiplier}
          </MultiplierTag>
        </TagWrapper>
        <Heading scale="sm" mb="4px">
          {lpLabel.split(' ')[0]}
        </Heading>
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
