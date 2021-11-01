/* eslint-disable no-nested-ternary */
import React from 'react'
import styled, { keyframes, DefaultTheme } from 'styled-components'
import { Text } from '../../../components/Text'
import { Colors } from '../../../theme/types'
import { MENU_ENTRY_HEIGHT } from '../config'

export interface Props {
  secondary?: boolean
  isActive?: boolean
  isPushed?: boolean
  theme: DefaultTheme
}

const rainbowAnimation = keyframes`
  0%,
  100% {
    background-position: 0 0;
  }
  50% {
    background-position: 100% 0;
  }
`

const LinkLabel = styled.div<{ isPushed: boolean }>`
  color: ${({ isPushed, theme }) => (isPushed ? '#fff' : 'transparent')};
  transition: color 0.4s;
  flex-grow: 1;
  font-size: 14px;
`

const MenuEntry = styled.div<Props>`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: ${MENU_ENTRY_HEIGHT}px;
  padding: 0 16px 4px 16px;
  margin: ${({ isPushed }) => (isPushed ? '0 16px 4px 16px' : 0)};
  font-size: 16px;
  background-color: ${({ secondary, theme }) => (secondary ? theme.colors.background : 'transparent')};
  color: ${({ theme }) => theme.colors.textSubtle};
  background-color: ${({ isActive, isPushed, theme }) => (isActive && isPushed ? theme.colors.primary : '0')};
  border-radius: ${({ isPushed }) => (isPushed ? '6px' : '0px')};
  box-shadow: ${({ isActive, isPushed, theme }) =>
    isActive && !isPushed ? `${theme.colors.primary} 6px 0px 0px inset` : 'none'};

  a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  svg {
    fill: #fff;
  }

  &:hover {
    transition: background-color 0.1s ease-out;
    background-color: ${({ theme }) => theme.colors.background_3};
  }

  // Safari fix
  flex-shrink: 0;

  &.rainbow {
    background-clip: text;
    animation: ${rainbowAnimation} 3s ease-in-out infinite;
    background: ${({ theme }) => theme.colors.gradients.bubblegum};
    background-size: 400% 100%;
  }
`
MenuEntry.defaultProps = {
  secondary: false,
  isActive: false,
}

const LinkStatus = styled(Text)<{ color: keyof Colors }>`
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 0 8px;
  border: 2px solid;
  border-color: ${({ theme, color }) => theme.colors[color]};
  box-shadow: none;
  color: ${({ theme, color }) => theme.colors[color]};
  margin-left: 8px;
`

const LinkLabelMemo = React.memo(LinkLabel, (prev, next) => prev.isPushed === next.isPushed)
// const MenuEntryMemo = React.memo(MenuEntry, (prev, next) => prev.isPushed === next.isPushed)

export { MenuEntry, LinkStatus, LinkLabelMemo as LinkLabel }
