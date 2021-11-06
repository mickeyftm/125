import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
  {
    pid: 0,
    lpSymbol: 'DMD',
    lpAddresses: {
      4002: '0x278817c0f2a104cec3e0d17c11c3e2ea743d9a87',
      250: '0xf62475cbd5121e56fb09eb9727dd95e0755414ae',
    },
    token: tokens.dmd,
    quoteToken: tokens.usdc,
    isTokenOnly: true,
  },
  {
    pid: 1,
    lpSymbol: 'FTM-DMD LP',
    lpAddresses: {
      4002: '0x278817c0f2a104cec3e0d17c11c3e2ea743d9a87',
      250: '0xf10f0eeb144eb223dd8ae7d5dd7f3327e63a3c94',
    },
    token: tokens.dmd,
    quoteToken: tokens.wftm,
  },
  {
    pid: 2,
    lpSymbol: 'DMD-USDT LP',
    lpAddresses: {
      4002: '0x0e48855B9f3DcfD7c8d46385d0fCeed94D3FA3Ac',
      250: '0x03da3E1c3b4Aa7f5458D63a45Ca345e8bC470b15',
    },
    token: tokens.dmd,
    quoteToken: tokens.usdt,
  },
  {
    pid: 3,
    lpSymbol: 'DMD-DAI LP',
    lpAddresses: {
      4002: '0x11F72CBD9deC2664790e60aaBb805BecA4dB8b2d',
      250: '0xc3f95f723921350cae9022b022e523f09454dc44',
    },
    token: tokens.dmd,
    quoteToken: tokens.dai,
  },
  {
    pid: 4,
    lpSymbol: 'DMD-USDC LP',
    lpAddresses: {
      4002: '0x0e48855B9f3DcfD7c8d46385d0fCeed94D3FA3Ac',
      250: '0xf62475cbd5121e56fb09eb9727dd95e0755414ae',
    },
    token: tokens.dmd,
    quoteToken: tokens.usdc,
  },
  {
    pid: 21,
    lpSymbol: 'MIM-DMD LP',
    lpAddresses: {
      4002: '0x0e48855B9f3DcfD7c8d46385d0fCeed94D3FA3Ac',
      250: '0x38dA6316eAEeE5E87D7BA1ae8b101e5207509B0a',
    },
    token: tokens.mim,
    quoteToken: tokens.dmd,
  },
  {
    pid: 28,
    lpSymbol: 'BTC-DMD LP',
    lpAddresses: {
      4002: '0x0e48855B9f3DcfD7c8d46385d0fCeed94D3FA3Ac',
      250: '0xf6862656CbEDAF8146474EF0AF926f01c352178B',
    },
    token: tokens.dmd,
    quoteToken: tokens.btc,
  },
  {
    pid: 31,
    lpSymbol: 'DOLA-DMD LP',
    lpAddresses: {
      4002: '0x0e48855B9f3DcfD7c8d46385d0fCeed94D3FA3Ac',
      250: '0x527b5590B062F4e93CDB1eE518498E9a4Aa8F034',
    },
    token: tokens.dola,
    quoteToken: tokens.dmd,
  },
  {
    pid: 5,
    lpSymbol: 'FTM-USDC LP',
    lpAddresses: {
      4002: '0x0e48855B9f3DcfD7c8d46385d0fCeed94D3FA3Ac',
      250: '0x2b4C76d0dc16BE1C31D4C1DC53bF9B45987Fc75c',
    },
    token: tokens.wftm,
    quoteToken: tokens.usdc,
    fee: 2,
  },
  {
    pid: 6,
    lpSymbol: 'ETH-FTM LP',
    lpAddresses: {
      4002: '0x0e48855B9f3DcfD7c8d46385d0fCeed94D3FA3Ac',
      250: '0xf0702249F4D3A25cD3DED7859a165693685Ab577',
    },
    token: tokens.wftm,
    quoteToken: tokens.eth,
    fee: 2,
  },
  {
    pid: 7,
    lpSymbol: 'FTM-BNB LP',
    lpAddresses: {
      4002: '0x0e48855B9f3DcfD7c8d46385d0fCeed94D3FA3Ac',
      250: '0x956DE13EA0FA5b577E4097Be837BF4aC80005820',
    },
    token: tokens.bnb,
    quoteToken: tokens.wftm,
    fee: 2,
  },
  {
    pid: 8,
    lpSymbol: 'USDC-DAI LP',
    lpAddresses: {
      4002: '0x0e48855B9f3DcfD7c8d46385d0fCeed94D3FA3Ac',
      250: '0x484237bc35cA671302d19694c66d617142FBC235',
    },
    token: tokens.usdc,
    quoteToken: tokens.dai,
    fee: 2,
  },
  {
    pid: 9,
    lpSymbol: 'USDC-USDT LP',
    lpAddresses: {
      4002: '0x0e48855B9f3DcfD7c8d46385d0fCeed94D3FA3Ac',
      250: '0xFdef392aDc84607135C24ca45DE5452d77aa10DE',
    },
    token: tokens.usdt,
    quoteToken: tokens.usdc,
    fee: 2,
  },
  {
    pid: 10,
    lpSymbol: 'BTC-FTM LP',
    lpAddresses: {
      4002: '0x0e48855B9f3DcfD7c8d46385d0fCeed94D3FA3Ac',
      250: '0xFdb9Ab8B9513Ad9E419Cf19530feE49d412C3Ee3',
    },
    token: tokens.btc,
    quoteToken: tokens.wftm,
    fee: 2,
  },
  {
    pid: 11,
    lpSymbol: 'FTM-Sushi LP',
    lpAddresses: {
      4002: '0x0e48855B9f3DcfD7c8d46385d0fCeed94D3FA3Ac',
      250: '0xf84E313B36E86315af7a06ff26C8b20e9EB443C3',
    },
    token: tokens.sushi,
    quoteToken: tokens.wftm,
    fee: 2,
  },
  {
    pid: 12,
    lpSymbol: 'CRV-FTM LP',
    lpAddresses: {
      4002: '0x0e48855B9f3DcfD7c8d46385d0fCeed94D3FA3Ac',
      250: '0xB471Ac6eF617e952b84C6a9fF5de65A9da96C93B',
    },
    token: tokens.crv,
    quoteToken: tokens.wftm,
    fee: 2,
  },
  {
    pid: 13,
    lpSymbol: 'YFI-ETH LP',
    lpAddresses: {
      4002: '0x0e48855B9f3DcfD7c8d46385d0fCeed94D3FA3Ac',
      250: '0x0845c0bFe75691B1e21b24351aAc581a7FB6b7Df',
    },
    token: tokens.yfi,
    quoteToken: tokens.eth,
    fee: 2,
  },
  {
    pid: 14,
    lpSymbol: 'FTM',
    lpAddresses: {
      4002: '0x0e48855B9f3DcfD7c8d46385d0fCeed94D3FA3Ac',
      250: '0x2b4C76d0dc16BE1C31D4C1DC53bF9B45987Fc75c',
    },
    token: tokens.wftm,
    quoteToken: tokens.usdc,
    isTokenOnly: true,
    fee: 2,
  },
  {
    pid: 15,
    lpSymbol: 'USDC',
    lpAddresses: {
      4002: '0x0e48855B9f3DcfD7c8d46385d0fCeed94D3FA3Ac',
      250: '0xf62475CbD5121e56FB09Eb9727Dd95e0755414aE',
    },
    token: tokens.usdc,
    quoteToken: tokens.dmd,
    isTokenOnly: true,
    fee: 2,
  },
  {
    pid: 16,
    lpSymbol: 'DAI',
    lpAddresses: {
      4002: '0x0e48855B9f3DcfD7c8d46385d0fCeed94D3FA3Ac',
      250: '0xc3f95F723921350caE9022b022E523f09454DC44',
    },
    token: tokens.dai,
    quoteToken: tokens.dmd,
    isTokenOnly: true,
    fee: 2,
  },
  {
    pid: 17,
    lpSymbol: 'USDT',
    lpAddresses: {
      4002: '0x0e48855B9f3DcfD7c8d46385d0fCeed94D3FA3Ac',
      250: '0xFdef392aDc84607135C24ca45DE5452d77aa10DE',
    },
    token: tokens.usdt,
    quoteToken: tokens.usdc,
    isTokenOnly: true,
    fee: 2,
  },
  {
    pid: 18,
    lpSymbol: 'BTC',
    lpAddresses: {
      4002: '0x0e48855B9f3DcfD7c8d46385d0fCeed94D3FA3Ac',
      250: '0xFdb9Ab8B9513Ad9E419Cf19530feE49d412C3Ee3',
    },
    token: tokens.btc,
    quoteToken: tokens.wftm,
    isTokenOnly: true,
    fee: 2,
  },
  {
    pid: 19,
    lpSymbol: 'ETH',
    lpAddresses: {
      4002: '0x0e48855B9f3DcfD7c8d46385d0fCeed94D3FA3Ac',
      250: '0xf0702249F4D3A25cD3DED7859a165693685Ab577',
    },
    token: tokens.eth,
    quoteToken: tokens.wftm,
    isTokenOnly: true,
    fee: 2,
  },
  {
    pid: 20,
    lpSymbol: 'BNB',
    lpAddresses: {
      4002: '0x0e48855B9f3DcfD7c8d46385d0fCeed94D3FA3Ac',
      250: '0x956DE13EA0FA5b577E4097Be837BF4aC80005820',
    },
    token: tokens.bnb,
    quoteToken: tokens.wftm,
    isTokenOnly: true,
    fee: 2,
  },
  {
    pid: 22,
    lpSymbol: 'FTM-MIM LP',
    lpAddresses: {
      4002: '0x0e48855B9f3DcfD7c8d46385d0fCeed94D3FA3Ac',
      250: '0x6f86e65b255c9111109d2D2325ca2dFc82456efc',
    },
    token: tokens.mim,
    quoteToken: tokens.wftm,
    fee: 2,
  },
  {
    pid: 23,
    lpSymbol: 'MIM',
    lpAddresses: {
      4002: '0x0e48855B9f3DcfD7c8d46385d0fCeed94D3FA3Ac',
      250: '0x6f86e65b255c9111109d2d2325ca2dfc82456efc',
    },
    token: tokens.mim,
    quoteToken: tokens.wftm,
    isTokenOnly: true,
    fee: 2,
  },
  {
    pid: 24,
    lpSymbol: 'BOO',
    lpAddresses: {
      4002: '0x0e48855B9f3DcfD7c8d46385d0fCeed94D3FA3Ac',
      250: '0xec7178f4c41f346b2721907f5cf7628e388a7a58',
    },
    token: tokens.boo,
    quoteToken: tokens.wftm,
    isTokenOnly: true,
    fee: 2,
  },
  {
    pid: 25,
    lpSymbol: 'FTM-DAI LP',
    lpAddresses: {
      4002: '0x0e48855B9f3DcfD7c8d46385d0fCeed94D3FA3Ac',
      250: '0xe120ffBDA0d14f3Bb6d6053E90E63c572A66a428',
    },
    token: tokens.dai,
    quoteToken: tokens.wftm,
    fee: 2,
  },
  {
    pid: 26,
    lpSymbol: 'FTM-CGS LP',
    lpAddresses: {
      4002: '0x0e48855B9f3DcfD7c8d46385d0fCeed94D3FA3Ac',
      250: '0x2b5965F901f8817DA4D660c64051bA8ADCdc495E',
    },
    token: tokens.cgs,
    quoteToken: tokens.wftm,
  },
  {
    pid: 29,
    lpSymbol: 'BTC-ETH LP',
    lpAddresses: {
      4002: '0x0e48855B9f3DcfD7c8d46385d0fCeed94D3FA3Ac',
      250: '0xEc454EdA10accdD66209C57aF8C12924556F3aBD',
    },
    token: tokens.eth,
    quoteToken: tokens.btc,
    fee: 2,
  },
  {
    pid: 30,
    lpSymbol: 'FTM-MAX LP',
    lpAddresses: {
      4002: '0x0e48855B9f3DcfD7c8d46385d0fCeed94D3FA3Ac',
      250: '0xa15A9Af64ac736D15A8A610947166b6ae6A11026',
    },
    token: tokens.max,
    quoteToken: tokens.wftm,
  },
]

export default farms
