import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Button, Flex, Text } from 'uikit'
import { getAddress } from 'utils/addressHelpers'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
import { Farm } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { useERC20 } from 'hooks/useContract'
import UnlockButton from 'components/UnlockButton'
import StakeAction from './StakeAction'
import HarvestAction from './HarvestAction'
import useApproveFarm from '../../hooks/useApproveFarm'

const Action = styled.div`
  padding-top: 12px;
`

const StyledButton = styled(Button)`
  border-radius: 6px;
`

const StyledUnlock = styled(UnlockButton)`
  border-radius: 6px;
`

export interface FarmWithStakedValue extends Farm {
  apr?: number
}

interface FarmCardActionsProps {
  farm: FarmWithStakedValue
  account?: string
  addLiquidityUrl?: string
}

const CardActions: React.FC<FarmCardActionsProps> = ({ farm, account, addLiquidityUrl }) => {
  const { t } = useTranslation()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { pid, lpAddresses } = farm
  const {
    allowance: allowanceAsString = 0,
    tokenBalance: tokenBalanceAsString = 0,
    stakedBalance: stakedBalanceAsString = 0,
    earnings: earningsAsString = 0,
  } = farm.userData || {}
  const allowance = new BigNumber(allowanceAsString)
  const tokenBalance = new BigNumber(tokenBalanceAsString)
  const stakedBalance = new BigNumber(stakedBalanceAsString)
  const earnings = new BigNumber(earningsAsString)
  const lpAddress = getAddress(lpAddresses)
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const dispatch = useAppDispatch()

  const lpContract = useERC20(lpAddress)

  const { onApprove } = useApproveFarm(lpContract)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, dispatch, account, pid])
  const renderApprovalOrStakeButton = () => {
    return isApproved ? (
      <StakeAction
        stakedBalance={stakedBalance}
        tokenBalance={tokenBalance}
        tokenName={farm.lpSymbol}
        pid={pid}
        addLiquidityUrl={addLiquidityUrl}
        fee={farm.fee}
      />
    ) : (
      <StyledButton
        mt="8px"
        height="38px"
        width="90%"
        disabled={requestedApproval}
        onClick={handleApprove}
        scale="xs"
        bold
        fontFamily="Quicksand"
      >
        {t('Approve Contract')}
      </StyledButton>
    )
  }

  return (
    <Action>
      <Flex>
        <Text fontFamily="Quicksand" bold textTransform="uppercase" color="#fff" fontSize="10px" pr="4px">
          DMD
        </Text>
        <Text fontFamily="Quicksand" bold textTransform="uppercase" color="#fff" fontSize="10px">
          {t('Earned')}
        </Text>
      </Flex>
      <HarvestAction earnings={earnings} pid={pid} />
      <Flex>
        <Text fontFamily="Quicksand" bold textTransform="uppercase" color="contrast" fontSize="10px" pr="4px">
          {farm.lpSymbol}
        </Text>
        <Text fontFamily="Quicksand" bold textTransform="uppercase" color="contrast" fontSize="10px">
          {t('Staked')}
        </Text>
      </Flex>
      {!account ? (
        <StyledUnlock mt="8px" height="38px" width="90%" scale="xs" bold fontFamily="Quicksand" />
      ) : (
        renderApprovalOrStakeButton()
      )}
    </Action>
  )
}

export default CardActions
