import { scales, variants } from './types'

export const scaleVariants = {
  [scales.MD]: {
    height: '28px',
    padding: '0 8px',
    fontSize: '14px',
  },
  [scales.SM]: {
    height: '24px',
    padding: '0 4px',
    fontSize: '12px',
  },
  [scales.XS]: {
    height: '20px',
    padding: '0 12px',
    fontSize: '12px',
  },
  [scales.XXS]: {
    height: '20px',
    padding: '0 4px',
    fontSize: '12px',
  },
  [scales.XXXS]: {
    height: '14px',
    padding: '0 11px',
    fontSize: '6px',
  },
}

export const styleVariants = {
  [variants.PRIMARY]: {
    backgroundColor: 'primary',
  },
  [variants.SECONDARY]: {
    backgroundColor: 'secondary',
  },
  [variants.SUCCESS]: {
    backgroundColor: 'success',
  },
  [variants.TEXT]: {
    backgroundColor: 'text',
  },
  [variants.TEXTDISABLED]: {
    backgroundColor: 'textDisabled',
  },
  [variants.TEXTSUBTLE]: {
    backgroundColor: 'textSubtle',
  },
  [variants.BINANCE]: {
    backgroundColor: 'binance',
  },
  [variants.FAILURE]: {
    backgroundColor: 'failure',
  },
  [variants.WARNING]: {
    backgroundColor: 'warning',
  },
}
