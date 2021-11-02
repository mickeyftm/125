import { serializeToken } from 'state/user/hooks/helpers'
import { SerializedToken } from './types

const tokens = {
  dmd: {
    symbol: 'DMD',
    address: {
      250: '0x90e892fed501ae00596448aecf998c88816e5c0f',
      4002: '0xe7Fb84899A643ed3747335a18f3e17d68Db87935',
    },
    decimals: 18,
    projectLink: 'https://www.kdm.network/',
  },
  dai: {
    symbol: 'DAI',
    address: {
      250: '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E',
      4002: '0xc9baa8cfdde8e328787e29b4b078abf2dadc2055',
    },
    decimals: 18,
    projectLink: 'https://makerdao.com/en/',
  },
  usdc: {
    symbol: 'USDC',
    address: {
      250: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
      4002: '0x980a5afef3d17ad98635f6c5aebcbaeded3c3430',
    },
    decimals: 6,
    projectLink: 'https://www.circle.com/en/usdc',
  },
  wftm: {
    symbol: 'WFTM',
    address: {
      250: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
      4002: '0x5512Ae5E7eE55869dA7dc2a5D2F74a5Df65683B8',
    },
    decimals: 18,
    projectLink: 'https://fantom.foundation/',
  },
  usdt: {
    symbol: 'USDT',
    address: {
      250: '0x049d68029688eabf473097a2fc38ef61633a3c7a',
      4002: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
    },
    decimals: 6,
    projectLink: 'https://tether.to/',
  },
  eth: {
    symbol: 'ETH',
    address: {
      250: '0x74b23882a30290451a17c44f4f05243b6b58c76d',
      4002: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
    },
    decimals: 18,
    projectLink: 'https://ethereum.org/en/',
  },
  bnb: {
    symbol: 'BNB',
    address: {
      250: '0xd67de0e0a0fd7b15dc8348bb9be742f3c5850454',
      4002: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
    },
    decimals: 18,
    projectLink: 'https://www.binance.com/en',
  },
  btc: {
    symbol: 'BTC',
    address: {
      250: '0x321162cd933e2be498cd2267a90534a804051b11',
      4002: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
    },
    decimals: 8,
    projectLink: 'https://bitcoin.org/en/',
  },
  sushi: {
    symbol: 'Sushi',
    address: {
      250: '0xae75a438b2e0cb8bb01ec1e1e376de11d44477cc',
      4002: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
    },
    decimals: 8,
    projectLink: 'https://sushi.com/',
  },
  crv: {
    symbol: 'CRV',
    address: {
      250: '0x1e4f97b9f9f913c46f1632781732927b9019c68b',
      4002: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
    },
    decimals: 18,
    projectLink: 'https://curve.fi/',
  },
  yfi: {
    symbol: 'YFI',
    address: {
      250: '0x29b0da86e484e1c0029b56e817912d778ac0ec69',
      4002: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
    },
    decimals: 18,
    projectLink: 'https://yearn.finance/',
  },
  mim: {
    symbol: 'MIM',
    address: {
      250: '0x82f0b8b456c1a451378467398982d4834b6829c1',
      4002: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
    },
    decimals: 18,
    projectLink: 'https://abracadabra.money/',
  },
  boo: {
    symbol: 'BOO',
    address: {
      250: '0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE',
      4002: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
    },
    decimals: 18,
    projectLink: 'https://spookyswap.finance/',
  },
  cgs: {
    symbol: 'CGS',
    address: {
      250: '0x5a2e451Fb1b46FDE7718315661013ae1aE68e28C',
      4002: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
    },
    decimals: 18,
    projectLink: 'https://fantomapp.cougarswap.io/',
  },
  max: {
    symbol: 'MAX',
    address: {
      250: '0x287a3f943db1c053c3e79d2f211ffe5c795b978b',
      4002: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
    },
    decimals: 18,
    projectLink: 'https://maximum.farm/',
  },
  dola: {
    symbol: 'DOLA',
    address: {
      250: '0x3129662808bEC728a27Ab6a6b9AFd3cBacA8A43c',
      4002: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
    },
    decimals: 18,
    projectLink: 'https://www.inverse.finance/',
  },
}

export default tokens
