import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    stakingToken: tokens.dmd,
    earningToken: tokens.dmd,
    contractAddress: {
      4002: '0x67d7a98dbc2c773048f84071e7a77ea1841f0376',
      250: '0x7C36c64811219CF9B797C5D9b264d9E7cdade7a4',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.07075471698',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 14,
    stakingToken: tokens.wftm,
    earningToken: tokens.dmd,
    contractAddress: {
      4002: '0x67d7a98dbc2c773048f84071e7a77ea1841f0376',
      250: '0x7C36c64811219CF9B797C5D9b264d9E7cdade7a4',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.0039761431411531',
    sortOrder: 1,
    isFinished: false,
    fee: 2,
  },
  {
    sousId: 15,
    stakingToken: tokens.usdc,
    earningToken: tokens.dmd,
    contractAddress: {
      4002: '0x67d7a98dbc2c773048f84071e7a77ea1841f0376',
      250: '0x7C36c64811219CF9B797C5D9b264d9E7cdade7a4',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.0019880715705765',
    sortOrder: 1,
    isFinished: false,
    fee: 2,
  },
  {
    sousId: 16,
    stakingToken: tokens.dai,
    earningToken: tokens.dmd,
    contractAddress: {
      4002: '0x67d7a98dbc2c773048f84071e7a77ea1841f0376',
      250: '0x7C36c64811219CF9B797C5D9b264d9E7cdade7a4',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.0019880715705765',
    sortOrder: 1,
    isFinished: false,
    fee: 2,
  },
  {
    sousId: 17,
    stakingToken: tokens.usdt,
    earningToken: tokens.dmd,
    contractAddress: {
      4002: '0x67d7a98dbc2c773048f84071e7a77ea1841f0376',
      250: '0x7C36c64811219CF9B797C5D9b264d9E7cdade7a4',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.0019880715705765',
    sortOrder: 1,
    isFinished: false,
    fee: 2,
  },
  {
    sousId: 18,
    stakingToken: tokens.btc,
    earningToken: tokens.dmd,
    contractAddress: {
      4002: '0x67d7a98dbc2c773048f84071e7a77ea1841f0376',
      250: '0x7C36c64811219CF9B797C5D9b264d9E7cdade7a4',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.0019880715705765',
    sortOrder: 1,
    isFinished: false,
    fee: 2,
  },
  {
    sousId: 19,
    stakingToken: tokens.eth,
    earningToken: tokens.dmd,
    contractAddress: {
      4002: '0x67d7a98dbc2c773048f84071e7a77ea1841f0376',
      250: '0x7C36c64811219CF9B797C5D9b264d9E7cdade7a4',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.0019880715705765',
    sortOrder: 1,
    isFinished: false,
    fee: 2,
  },
  {
    sousId: 20,
    stakingToken: tokens.bnb,
    earningToken: tokens.dmd,
    contractAddress: {
      4002: '0x67d7a98dbc2c773048f84071e7a77ea1841f0376',
      250: '0x7C36c64811219CF9B797C5D9b264d9E7cdade7a4',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.0019880715705765',
    sortOrder: 1,
    isFinished: false,
    fee: 2,
  },
  {
    sousId: 23,
    stakingToken: tokens.mim,
    earningToken: tokens.dmd,
    contractAddress: {
      4002: '0x67d7a98dbc2c773048f84071e7a77ea1841f0376',
      250: '0x7C36c64811219CF9B797C5D9b264d9E7cdade7a4',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.0019880715705765',
    sortOrder: 1,
    isFinished: false,
    fee: 2,
  },
  {
    sousId: 24,
    stakingToken: tokens.boo,
    earningToken: tokens.dmd,
    contractAddress: {
      4002: '0x67d7a98dbc2c773048f84071e7a77ea1841f0376',
      250: '0x7C36c64811219CF9B797C5D9b264d9E7cdade7a4',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.0019880715705765',
    sortOrder: 1,
    isFinished: false,
    fee: 2,
  },

  {
    sousId: 31,
    stakingToken: tokens.dmd,
    earningToken: tokens.dai,
    contractAddress: {
      4002: '',
      250: '0x28b75A0304078Dee675a8d2700a35a04Fb6CbB11',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.0001',
    sortOrder: 999,
    isFinished: false,
  },
]

export default pools
