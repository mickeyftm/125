import React, { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Button, Flex, Text, IconButton, AddIcon, MinusIcon, useModal } from 'uikit'
import { useLocation } from 'react-router-dom'
import Balance from 'components/Balance'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
import { useLpTokenPrice } from 'state/hooks'
import { getBalanceAmount, getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import DepositModal from '../DepositModal'
import WithdrawModal from '../WithdrawModal'
import useUnstakeFarms from '../../hooks/useUnstakeFarms'
import useStakeFarms from '../../hooks/useStakeFarms'

interface FarmCardActionsProps {
  stakedBalance?: BigNumber
  tokenBalance?: BigNumber
  tokenName?: string
  pid?: number
  addLiquidityUrl?: string
  fee?: number
}

const IconButtonWrapper = styled.div`
  display: flex;
  svg {
    width: 20px;
  }
`

const StyledButton = styled(Button)`
  border-radius: 6px;
`

const StakeAction: React.FC<FarmCardActionsProps> = ({
  stakedBalance,
  tokenBalance,
  tokenName,
  pid,
  addLiquidityUrl,
  fee,
}) => {
  const { t } = useTranslation()
  const { onStake } = useStakeFarms(pid)
  const { onUnstake } = useUnstakeFarms(pid)
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const lpPrice = useLpTokenPrice(tokenName)

  const handleStake = async (amount: string) => {
    await onStake(amount)
    dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
  }

  const handleUnstake = async (amount: string) => {
    await onUnstake(amount)
    dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
  }

  const displayBalance = useCallback(() => {
    const stakedBalanceBigNumber = getBalanceAmount(stakedBalance)
    if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0001)) {
      return getFullDisplayBalance(stakedBalance).toLocaleString()
    }
    return stakedBalanceBigNumber.toFixed(3, BigNumber.ROUND_DOWN)
  }, [stakedBalance])

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={handleStake}
      tokenName={tokenName}
      addLiquidityUrl={addLiquidityUrl}
      fee={fee}
    />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={handleUnstake} tokenName={tokenName} />,
  )

  const renderStakingButtons = () => {
    return stakedBalance.eq(0) ? (
      <StyledButton
        onClick={onPresentDeposit}
        disabled={['history', 'archived'].some((item) => location.pathname.includes(item))}
        mt="8px"
        height="38px"
        scale="xs"
      >
        {t('Stake LP')}
      </StyledButton>
    ) : (
      <IconButtonWrapper>
        <IconButton variant="tertiary" scale="sm" onClick={onPresentWithdraw} mr="6px">
          <MinusIcon color="primary" width="14px" />
        </IconButton>
        <IconButton
          variant="tertiary"
          scale="sm"
          onClick={onPresentDeposit}
          disabled={['history', 'archived'].some((item) => location.pathname.includes(item))}
        >
          <AddIcon color="primary" width="14px" />
        </IconButton>
      </IconButtonWrapper>
    )
  }

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Flex flexDirection="column" alignItems="flex-start">
        <Text fontFamily="Quicksand" fontSize="12px" bold color={stakedBalance.eq(0) ? 'textDisabled' : 'text'}>
          {displayBalance()}
        </Text>
        {stakedBalance.gt(0) && lpPrice.gt(0) && (
          <Balance
            fontFamily="Quicksand"
            fontSize="12px"
            color="textSubtle"
            decimals={2}
            value={getBalanceNumber(lpPrice.times(stakedBalance))}
            unit=" USD"
            prefix="~"
          />
        )}
      </Flex>
      {renderStakingButtons()}
    </Flex>
  )
}

export default StakeAction
