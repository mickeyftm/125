import React from 'react'
import styled from 'styled-components'
import { getAddress } from 'utils/addressHelpers'
import tokens from 'config/constants/tokens'
import { PancakeRoundIcon, ArrowRightIcon } from '../../../components/Svg'
import { DarkMatterRound } from '../../../components/Png'
import Text from '../../../components/Text/Text'
import Skeleton from '../../../components/Skeleton/Skeleton'
import Button from '../../../components/Button/Button'
import Flex from '../../../components/Box/Flex'

interface Props {
  cakePriceUsd?: number
}

const PriceButton = styled(Button)<{ isFinished?: boolean; background?: string }>`
  height: 60px;
  padding: 0 16px;
  background: linear-gradient(90deg, #c45bec, #9112ff);
`

const PriceLink = styled.a`
  svg {
    transition: transform 0.3s;
  }
  :hover {
    svg {
      transform: scale(1.2);
    }
  }
`

const PriceRoundTextWrapper = styled.div`
  margin-right: 32px;
`

const PriceArrow = styled(ArrowRightIcon)`
  margin: 8px;
`

const CakePrice: React.FC<Props> = ({ cakePriceUsd }) => {
  return cakePriceUsd ? (
    <PriceLink href={`https://info.spookyswap.finance/token/${getAddress(tokens.dmd.address)}`} target="_blank">
      <PriceButton>
        <PriceRoundTextWrapper>
          <Flex alignItems="center">
            <DarkMatterRound w="36px" m="0 8px 0 0" />
            <Text color="text" bold>{`$${cakePriceUsd.toFixed(3)}`}</Text>
          </Flex>
        </PriceRoundTextWrapper>
        <Flex alignItems="center">
          <PriceArrow />
        </Flex>
      </PriceButton>
    </PriceLink>
  ) : (
    <Skeleton width={80} height={24} />
  )
}

export default React.memo(CakePrice)
