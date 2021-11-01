import React, { useState } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading, Text } from 'uikit'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
import useToast from 'hooks/useToast'
import { getBalanceAmount } from 'utils/formatBalance'
import { BIG_ZERO } from 'utils/bigNumber'
import { useWeb3React } from '@web3-react/core'
import { usePriceKDMBusd } from 'state/hooks'
import Balance from 'components/Balance'
import useHarvestFarm from '../../hooks/useHarvestFarm'

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
}

const HarvestBtn = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: #fff;
  border-radius: 6px;
  border: none;
  padding: 6px 24px;
  width: 84px;
  height: 30px;

  &:disabled {
    opacity: 0.2;
  }

  &:hover {
    cursor: pointer;
  }
`

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid }) => {
  const { account } = useWeb3React()
  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvestFarm(pid)
  const cakePrice = usePriceKDMBusd()
  const dispatch = useAppDispatch()
  const rawEarningsBalance = account ? getBalanceAmount(earnings) : BIG_ZERO
  const displayBalance = rawEarningsBalance.toFixed(3, BigNumber.ROUND_DOWN)
  const earningsBusd = rawEarningsBalance ? rawEarningsBalance.multipliedBy(cakePrice).toNumber() : 0

  return (
    <Flex mb="16px" justifyContent="space-between" alignItems="center">
      <Flex flexDirection="column" alignItems="flex-start">
        <Text fontFamily="Quicksand" fontSize="12px" bold color={rawEarningsBalance.eq(0) ? 'textDisabled' : 'text'}>
          {displayBalance}
        </Text>
        {earningsBusd > 0 && (
          <Balance
            fontFamily="Quicksand"
            fontSize="12px"
            color="textSubtle"
            decimals={2}
            value={earningsBusd}
            unit=" USD"
            prefix="~"
            bold
          />
        )}
      </Flex>
      <HarvestBtn
        disabled={rawEarningsBalance.eq(0) || pendingTx}
        onClick={async () => {
          setPendingTx(true)
          try {
            await onReward()
            toastSuccess(
              `${t('Harvested')}!`,
              t('Your %symbol% earnings have been sent to your wallet!', { symbol: 'DMD' }),
            )
          } catch (e) {
            toastError(
              t('Error'),
              t('Please try again. Confirm the transaction and make sure you are paying enough gas!'),
            )
            console.error(e)
          } finally {
            setPendingTx(false)
          }
          dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
        }}
      >
        <Text fontFamily="Quicksand" bold fontSize="10px">
          {t('Harvest')}
        </Text>
      </HarvestBtn>
    </Flex>
  )
}

export default HarvestAction
