import BigNumber from 'bignumber.js'
import presaleABI from 'config/abi/presale.json'
import { getPresaleAddress } from 'utils/addressHelpers'
import { BIG_TEN, BIG_ZERO } from 'utils/bigNumber'
import multicall from 'utils/multicall'
import { PresaleState } from '../types'

const fetchPresale = async (): Promise<PresaleState> => {
  const calls = [
    {
      address: getPresaleAddress(),
      name: 'presaleStartTimestamp',
    },
    {
      address: getPresaleAddress(),
      name: 'presaleEndTimestamp',
    },
    {
      address: getPresaleAddress(),
      name: 'hardCapEthAmount',
    },
    {
      address: getPresaleAddress(),
      name: 'totalDepositedEthBalance',
    },
    {
      address: getPresaleAddress(),
      name: 'minimumDepositEthAmount',
    },
    {
      address: getPresaleAddress(),
      name: 'maximumDepositEthAmount',
    },
  ]
  const [
    presaleStartTimestamp,
    presaleEndTimestamp,
    hardCapEthAmount,
    totalDepositedEthBalance,
    minimumDepositEthAmount,
    maximumDepositEthAmount,
  ] = await multicall(presaleABI, calls)

  return {
    presaleStartTimestamp: new BigNumber(presaleStartTimestamp[0]._hex).toJSON(),
    presaleEndTimestamp: new BigNumber(presaleEndTimestamp[0]._hex).toJSON(),
    hardCapEthAmount: new BigNumber(hardCapEthAmount[0]._hex).toJSON(),
    totalDepositedEthBalance: new BigNumber(totalDepositedEthBalance[0]._hex).toJSON(),
    minimumDepositEthAmount: new BigNumber(minimumDepositEthAmount[0]._hex).toJSON(),
    maximumDepositEthAmount: new BigNumber(maximumDepositEthAmount[0]._hex).toJSON(),
  }
}

export default fetchPresale
