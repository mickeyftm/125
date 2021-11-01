import BigNumber from 'bignumber.js/bignumber'
import { BIG_TEN } from 'utils/bigNumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const KCC_BLOCK_TIME = 1.15

// CAKE_PER_BLOCK details
// 40 CAKE is minted per block
// 20 CAKE per block is sent to Burn pool (A farm just for burning cake)
// 10 CAKE per block goes to CAKE syrup pool
// 9 CAKE per block goes to Yield farms and lottery
// CAKE_PER_BLOCK in config/index.ts = 40 as we only change the amount sent to the burn pool which is effectively a farm.
// CAKE/Block in src/views/Home/components/CakeStats.tsx = 19 (40 - Amount sent to burn pool)

export const KDM_PER_BLOCK = new BigNumber(0.5)
export const BLOCKS_PER_YEAR = new BigNumber((60 / KCC_BLOCK_TIME) * 60 * 24 * 365)
export const CAKE_PER_YEAR = KDM_PER_BLOCK.times(BLOCKS_PER_YEAR)
export const BASE_URL = 'https://www.darkmatterdefi.com'
export const BASE_EXCHANGE_URL = 'https://spookyswap.finance'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_EXCHANGE_URL}/add`
export const BASE_LIQUIDITY_POOL_URL = `${BASE_EXCHANGE_URL}/pool`
export const BASE_KCC_SCAN_URL = 'https://ftmscan.com'
export const LOTTERY_MAX_NUMBER_OF_TICKETS = 50
export const LOTTERY_TICKET_PRICE = 1
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
export const DEFAULT_GAS_LIMIT = 400000
export const DEFAULT_GAS_PRICE = 5
