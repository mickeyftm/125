import tokens from './tokens'
import { PoolCategory, PoolConfig } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 1,
    stakingToken: tokens.dmd,
    earningToken: tokens.usdc,
    contractAddress: {
      4002: '',
      250: '0x481055C4182B9A5e90d8E7EDe9f65b957dC0Ec22',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.002480',
    sortOrder: 999,
    isFinished: false,
  },
]

export default pools