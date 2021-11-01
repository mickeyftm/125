import React from 'react'
import { Text } from 'uikit'
import { useWeb3React } from '@web3-react/core'
import useTokenBalance from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { getCakeAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceKDMBusd } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const CakeWalletBalance = () => {
  const { t } = useTranslation()
  const { balance: cakeBalance } = useTokenBalance(getCakeAddress())
  const cakePriceBusd = usePriceKDMBusd()
  const busdBalance = new BigNumber(getBalanceNumber(cakeBalance)).multipliedBy(cakePriceBusd).toNumber()
  const { account } = useWeb3React()

  if (!account) {
    return (
      <Text color="contrast" style={{ lineHeight: '54px' }}>
        {t('Locked')}
      </Text>
    )
  }

  return (
    <>
      <CardValue value={getBalanceNumber(cakeBalance)} decimals={4} fontSize="24px" lineHeight="1.5" />
      {cakePriceBusd.gt(0) ? <CardBusdValue value={busdBalance} /> : <br />}
    </>
  )
}

export default CakeWalletBalance
