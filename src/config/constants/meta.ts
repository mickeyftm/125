import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'DarkMatter',
  description: 'Dark Matter Swap for DMD',
  image: 'favicon.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/':
      return {
        title: `${t('Home')} | ${t('DarkMatter')}`,
      }
    case '/presale':
      return {
        title: `${t('Presale')} | ${t('DarkMatter')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('DarkMatter')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('DarkMatter')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('DarkMatter')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('DarkMatter')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('DarkMatter')}`,
      }
    case '/collectibles':
      return {
        title: `${t('Collectibles')} | ${t('DarkMatter')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('DarkMatter')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('DarkMatter')}`,
      }
    case '/profile/tasks':
      return {
        title: `${t('Task Center')} | ${t('DarkMatter')}`,
      }
    case '/profile':
      return {
        title: `${t('Your Profile')} | ${t('DarkMatter')}`,
      }
    default:
      return null
  }
}
