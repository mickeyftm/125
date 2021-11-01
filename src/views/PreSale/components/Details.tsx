import React from 'react'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import styled from 'styled-components'
import { PresaleState } from 'state/types'

const CTACards = styled.div`
  display: flex;
  justify-content: center;
  grid-gap: 24px;
  flex-wrap: wrap;

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-wrap: nowrap;
    grid-gap: 32px;

    & > div {
      grid-column: span 4;
    }
  }
`

const Pill = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primaryDark};
  width: 95%;
  border-radius: 16px;
  padding: 6px;
`

const Text = styled.div`
  color: ${({ theme }) => theme.colors.contrast};
  font-size: 14px;
  font-weight: 600px;
`

interface DetailsProps {
  presale: PresaleState
}

const Details: React.FC<DetailsProps> = ({ presale }) => {
  const maximumDepositEthAmount = presale.maximumDepositEthAmount
    ? getBalanceAmount(new BigNumber(presale.maximumDepositEthAmount))
    : BIG_ZERO
  const hardCapEthAmount = presale.hardCapEthAmount
    ? getBalanceAmount(new BigNumber(presale.hardCapEthAmount))
    : BIG_ZERO
  return (
    <Pill>
      <CTACards>
        <Text>SALE PRICE : 1 FTM = 4 DMD</Text>
        <Text>{`PRESALE HARDCAP : ${maximumDepositEthAmount} FTM`}</Text>
        <Text>{`PRESALE SUPPLY : ${hardCapEthAmount.multipliedBy(4)} DMD`}</Text>
      </CTACards>
    </Pill>
  )
}

export default Details
