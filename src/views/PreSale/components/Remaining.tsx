import React from 'react'
import BigNumber from 'bignumber.js'
import { Text, Flex } from 'uikit'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import styled from 'styled-components'
import { PresaleState } from 'state/types'

const StyledRemainingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 64px;
  margin-bottom: 6px;
  justify-content: space-between;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 90px;
  }
`

const StyledText = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  margin: auto;
`

const ProgressOuter = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryDark};
  border-radius: 10px;
  max-width: 100%;
  height: 20px;
  position: relative;
`
interface ProgressInnerProps {
  soldPercentage: number
}

const ProgressInner = styled.div<ProgressInnerProps>`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  width: ${(props) => props.soldPercentage * 95}%;
  height: 10px;
  position: absolute;
  top: 25%;
  left: 2.5%;
`
interface RemainingProps {
  presale: PresaleState
}

const Remaining: React.FC<RemainingProps> = ({ presale }) => {
  const hardCapEthAmount = presale.hardCapEthAmount
    ? getBalanceAmount(new BigNumber(presale.hardCapEthAmount))
    : BIG_ZERO
  const totalDepositedEthBalance = presale.totalDepositedEthBalance
    ? getBalanceAmount(new BigNumber(presale.totalDepositedEthBalance))
    : BIG_ZERO
  return (
    <Flex flexDirection="column" mb={['40px', '40px', '100px']}>
      <StyledRemainingContainer>
        <Flex>
          <StyledText color="contrast" textTransform="uppercase">
            {`${totalDepositedEthBalance} FTM / ${hardCapEthAmount} FTM`}
          </StyledText>
        </Flex>
        <Flex>
          <StyledText color="contrast" textTransform="uppercase">
            {`${totalDepositedEthBalance.dividedBy(hardCapEthAmount).multipliedBy(100)}%`}
          </StyledText>
        </Flex>
      </StyledRemainingContainer>
      <ProgressOuter>
        <ProgressInner soldPercentage={totalDepositedEthBalance.dividedBy(hardCapEthAmount).toNumber()} />
      </ProgressOuter>
    </Flex>
  )
}

export default Remaining
