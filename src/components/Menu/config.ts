import { MenuEntry } from 'uikit'
import { ContextApi } from 'contexts/Localization/types'
import { getAddress } from 'utils/addressHelpers'
import tokens from 'config/constants/tokens'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Home'),
    icon: 'HomeIcon',
    href: '/',
  },
  // {
  //   label: t('PreSale'),
  //   icon: 'PresaleIcon',
  //   href: '/presale',
  // },
  {
    label: t('Trade'),
    icon: 'TradeIcon',
    items: [
      {
        label: t('Exchange'),
        href: `https://spookyswap.finance/swap?outputCurrency=${getAddress(tokens.dmd.address)}`,
      },
    ],
  },
  {
    label: t('Farms'),
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: t('Pools'),
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
    label: t('More'),
    icon: 'MoreIcon',
    items: [
      {
        label: t('Github'),
        href: 'https://github.com/darkmatterdefi',
      },
      {
        label: t('Docs'),
        href: 'https://darkmatterdefi.gitbook.io/docs/',
      },
      {
        label: t('DMD Contract'),
        href: 'https://ftmscan.com/address/0x90e892fed501ae00596448aecf998c88816e5c0f',
      },
      {
        label: t('DMU'),
        href: 'https://www.dmu.zone/',
      },
    ],
  },
  {
    label: t('Info'),
    icon: 'InfoIcon',
    items: [
      {
        label: t('Gecko'),
        href: 'https://www.coingecko.com/en/coins/dark-matter-defi',
      },
      {
        label: t('CMC'),
        href: 'https://coinmarketcap.com/currencies/dark-matter-defi/',
      },
      {
        label: t('Chart'),
        href: 'https://kek.tools/t/0x90e892fed501ae00596448aecf998c88816e5c0f?pair=0xf10f0eeb144eb223dd8ae7d5dd7f3327e63a3c94',
      },
      {
        label: t('DeFiLlama'),
        href: 'https://defillama.com/protocol/dark-matter',
      },
      {
        label: t('Vfat.tools'),
        href: 'https://vfat.tools/fantom/darkmatter/',
      },
    ],
  },
]

export default config
