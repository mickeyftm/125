import React from 'react'
import styled from 'styled-components'
import { Flex, Text, Button, Heading, useModal, Skeleton } from 'uikit'
import BigNumber from 'bignumber.js'
import { Token } from 'config/constants/types'
import { useTranslation } from 'contexts/Localization'
import { getFullDisplayBalance, getBalanceNumber, formatNumber } from 'utils/formatBalance'
import Balance from 'components/Balance'
import CollectModal from '../Modals/CollectModal'

interface HarvestActionsProps {
  earnings: BigNumber
  earningToken: Token
  sousId: number
  earningTokenPrice: number
  isBnbPool: boolean
  isLoading?: boolean
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

const HarvestActions: React.FC<HarvestActionsProps> = ({
  earnings,
  earningToken,
  sousId,
  isBnbPool,
  earningTokenPrice,
  isLoading = false,
}) => {
  const { t } = useTranslation()
  const earningTokenBalance = getBalanceNumber(earnings, earningToken.decimals)
  const formattedBalance = formatNumber(earningTokenBalance, 3, 3)

  const earningTokenDollarBalance = getBalanceNumber(earnings.multipliedBy(earningTokenPrice), earningToken.decimals)

  const fullBalance = getFullDisplayBalance(earnings, earningToken.decimals)
  const hasEarnings = earnings.toNumber() > 0
  const isCompoundPool = sousId === 0

  const [onPresentCollect] = useModal(
    <CollectModal
      formattedBalance={formattedBalance}
      fullBalance={fullBalance}
      earningToken={earningToken}
      earningsDollarValue={earningTokenDollarBalance}
      sousId={sousId}
      isBnbPool={isBnbPool}
      isCompoundPool={isCompoundPool}
    />,
  )

  return (
    <Flex justifyContent="space-between" alignItems="center" mb="16px">
      <Flex flexDirection="column">
        {isLoading ? (
          <Skeleton width="80px" height="48px" />
        ) : (
          <>
            {hasEarnings ? (
              <>
                <Balance fontFamily="Quicksand" fontSize="12px" bold decimals={5} value={earningTokenBalance} />
                {earningTokenPrice > 0 && (
                  <Balance
                    display="inline"
                    fontFamily="Quicksand"
                    fontSize="12px"
                    color="textSubtle"
                    decimals={2}
                    prefix="~"
                    value={earningTokenDollarBalance}
                    unit=" USD"
                  />
                )}
              </>
            ) : (
              <>
                <Heading color="textDisabled">0</Heading>
                <Text fontFamily="Quicksand" fontSize="12px" color="textDisabled">
                  0 USD
                </Text>
              </>
            )}
          </>
        )}
      </Flex>
      <HarvestBtn disabled={!hasEarnings} onClick={onPresentCollect}>
        <Text fontFamily="Quicksand" bold fontSize="10px">
          {isCompoundPool ? t('Collect') : t('Harvest')}
        </Text>
      </HarvestBtn>
    </Flex>
  )
}

export default HarvestActions
