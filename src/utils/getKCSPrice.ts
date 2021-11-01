/* eslint-disable import/prefer-default-export */
import erc20 from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import { BIG_TEN } from 'utils/bigNumber'
import BigNumber from 'bignumber.js'

export const getKCSPrice = async () => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  try {
    const addresses = {
      usdt: {
        250: '0x049d68029688eabf473097a2fc38ef61633a3c7a',
        4002: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
      },
      wftm: {
        250: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
        4002: '0x5512Ae5E7eE55869dA7dc2a5D2F74a5Df65683B8',
      },
      lp: {
        4002: '0xe5133ca897f1c5cdd273775eefb950f3055f125d',
        250: '0x5965e53aa80a0bcf1cd6dbdd72e6a9b2aa047410',
      },
    }
    const calls = [
      // Balance of token in the LP contract
      {
        address: addresses.wftm[chainId],
        name: 'balanceOf',
        params: [addresses.lp[chainId]],
      },
      // Balance of quote token on LP contract
      {
        address: addresses.usdt[chainId],
        name: 'balanceOf',
        params: [addresses.lp[chainId]],
      },
      {
        address: addresses.wftm[chainId],
        name: 'decimals',
      },
      // Quote token decimals
      {
        address: addresses.usdt[chainId],
        name: 'decimals',
      },
    ]
    const [tokenBalanceLP, quoteTokenBalanceLP, tokenDecimals, quoteTokenDecimals] = await multicall(erc20, calls)
    // Raw amount of token in the LP, including those not staked
    const tokenAmountTotal = new BigNumber(tokenBalanceLP).div(BIG_TEN.pow(tokenDecimals))
    const quoteTokenAmountTotal = new BigNumber(quoteTokenBalanceLP).div(BIG_TEN.pow(quoteTokenDecimals))
    return quoteTokenAmountTotal.div(tokenAmountTotal).toJSON()
  } catch (err) {
    console.error('fetch price error:', err)
    return 0
  }
}
