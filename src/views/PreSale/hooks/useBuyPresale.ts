import React, { useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import { FarmConfig } from 'config/constants/types'
import { usePresale } from 'hooks/useContract'

export interface FarmWithBalance extends FarmConfig {
  balance: BigNumber
}

const useBuyPresale = () => {
  const presaleContract = usePresale()

  const handleBuy = useCallback(
    async (amount: string) => {
      const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
      const tx = await presaleContract.deposit({ value })
      const receipt = await tx.wait()
      const txHash = receipt.status
      console.info(txHash)
    },
    [presaleContract],
  )

  return { onBuy: handleBuy }
}

export default useBuyPresale
