import presaleABI from 'config/abi/presale.json'
import multicall from 'utils/multicall'
import { getPresaleContract } from 'utils/contractHelpers'
import { simpleRpcProvider } from 'utils/providers'
import BigNumber from 'bignumber.js'

export default async (account) => {
  const ftmBalance = await simpleRpcProvider.getBalance(account)
  const contract = getPresaleContract()
  const deposits = await contract.deposits(account)
  return { deposits: new BigNumber(deposits._hex).toJSON(), balance: new BigNumber(ftmBalance.toString()).toJSON() }
}
