/* eslint-disable import/prefer-default-export */
import erc20 from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import { BIG_TEN } from 'utils/bigNumber'
import BigNumber from 'bignumber.js'

export const getETHPrice = async () => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  try {
    const addresses = {
      usdc: {
        250: '0x04068da6c83afcfa0e13ba15a6696662335d5b75',
        4002: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
      },
      eth: {
        250: '0x74b23882a30290451a17c44f4f05243b6b58c76d',
        4002: '0x5512Ae5E7eE55869dA7dc2a5D2F74a5Df65683B8',
      },
      lp: {
        4002: '0xe5133ca897f1c5cdd273775eefb950f3055f125d',
        250: '0xa572bdf049382f1f98f9a430788dadd51a303969',
      },
    }
    const calls = [
      // Balance of token in the LP contract
      {
        address: addresses.eth[chainId],
        name: 'balanceOf',
        params: [addresses.lp[chainId]],
      },
      // Balance of quote token on LP contract
      {
        address: addresses.usdc[chainId],
        name: 'balanceOf',
        params: [addresses.lp[chainId]],
      },
      {
        address: addresses.eth[chainId],
        name: 'decimals',
      },
      // Quote token decimals
      {
        address: addresses.usdc[chainId],
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
