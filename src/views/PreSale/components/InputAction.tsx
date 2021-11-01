import React, { useCallback, useMemo, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'utils/bigNumber'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state'
import { fetchUserPresaleDataAsync } from 'state/presale'
import { Text, Flex, Button, Input, InputProps } from 'uikit'
import { getFullDisplayBalance, getBalanceAmount } from 'utils/formatBalance'
import styled from 'styled-components'
import { PresaleState } from 'state/types'
import useToast from 'hooks/useToast'
import useBuyPresale from '../hooks/useBuyPresale'

const getBoxShadow = ({ isWarning = false, theme }) => {
  if (isWarning) {
    return theme.shadows.warning
  }

  return theme.shadows.inset
}

const StyledActionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 64px;
  margin-bottom: 6px;
  justify-content: space-between;
  padding: 0 12px;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 90px;
    padding: 0 36px;
  }
`

const StyledText = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  margin: auto;
`

const StyledTokenInput = styled.div<InputProps>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.primaryDark};
  border-radius: 26px;
  box-shadow: ${getBoxShadow};
  color: ${({ theme }) => theme.colors.text};
  padding: 6px 8px;
  width: 100%;
`

const StyledInput = styled(Input)`
  box-shadow: none;
  width: 60px;
  margin: 0 8px;
  padding: 0 8px;
  height: 30px;

  ${({ theme }) => theme.mediaQueries.xs} {
    width: 80px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    height: 36px;
    width: auto;
  }
`

const StyledMax = styled(Button)`
  height: 30px;
  width: 70px;
  border-radius: 18px;
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 36px;
    width: 80px;
  }
`

const ActionButton = styled(Button)`
  height: 48px;
  border-radius: 24px;
  width: 184px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 240px;
  }
`

interface InputActionProps {
  presale: PresaleState
}

const InputAction: React.FC<InputActionProps> = ({ presale }) => {
  const { account } = useWeb3React()
  const [val, setVal] = useState('')
  const { toastSuccess, toastError } = useToast()
  const { onBuy } = useBuyPresale()
  const [pendingTx, setPendingTx] = useState(false)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const maximumDepositEthAmount = presale.maximumDepositEthAmount
    ? getBalanceAmount(new BigNumber(presale.maximumDepositEthAmount).minus(presale.userData.deposits || 0))
    : BIG_ZERO
  const minimumDepositEthAmount = presale.minimumDepositEthAmount
    ? getBalanceAmount(new BigNumber(presale.minimumDepositEthAmount))
    : BIG_ZERO

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(
      BigNumber.minimum(
        new BigNumber(presale.userData.balance),
        new BigNumber(presale.maximumDepositEthAmount).minus(presale.userData.deposits),
      ),
    )
  }, [presale.userData.balance, presale.userData.deposits, presale.maximumDepositEthAmount])

  const handleBuy = async (amount: string) => {
    await onBuy(amount)
    if (account) {
      dispatch(fetchUserPresaleDataAsync(account))
    }
  }

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, '.'))
      }
    },
    [setVal],
  )

  const { userDataLoaded } = presale
  return (
    <Flex flexDirection="column" mb={['40px', '40px', '100px']} px={['0px', '0px', '36px']}>
      <StyledActionContainer>
        <Flex>
          <StyledText color="contrast" textTransform="uppercase">
            {`Your balance : ${
              userDataLoaded ? getFullDisplayBalance(new BigNumber(presale.userData.balance), 18, 2) : 0
            }`}
          </StyledText>
        </Flex>
        <Flex>
          <StyledText color="contrast" textTransform="uppercase">
            {`MIN : ${minimumDepositEthAmount} FTM / MAX : ${maximumDepositEthAmount} FTM`}
          </StyledText>
        </Flex>
      </StyledActionContainer>
      <StyledTokenInput>
        <Flex justifyContent="space-between">
          <StyledInput
            pattern="^[0-9]*[.,]?[0-9]{0,18}$"
            inputMode="decimal"
            step="any"
            min="0"
            onChange={handleChange}
            placeholder="Enter Amount"
            value={val}
          />
          <StyledMax disabled={!account} scale="sm" onClick={() => handleSelectMax()}>
            <Text bold fontSize="14px">
              {t('MAX')}
            </Text>
          </StyledMax>
        </Flex>
      </StyledTokenInput>
      <Flex mt="33px" justifyContent="center">
        <ActionButton
          disabled={pendingTx || maximumDepositEthAmount.lt(val) || minimumDepositEthAmount.gt(val) || !account || !val}
          onClick={async () => {
            setPendingTx(true)
            try {
              await handleBuy(val)
              toastSuccess(t('DMD Successfully Purchased!'))
            } catch (e) {
              toastError(
                t('Error'),
                t('Please try again. Confirm the transaction and make sure you are paying enough gas!'),
              )
              console.error(e)
            } finally {
              setPendingTx(false)
            }
          }}
        >
          <Text bold fontSize="18px">
            {pendingTx ? t('Pending Confirmation') : t('BUY')}
          </Text>
        </ActionButton>
        {/* <ActionButton>
          <Text bold fontSize="18px">
            {t('DEPOSIT')}
          </Text>
        </ActionButton> */}
      </Flex>
    </Flex>
  )
}

export default InputAction
