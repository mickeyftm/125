import React from 'react'
import styled from 'styled-components'
import { CogIcon } from '../../../components/Svg'
import IconButton from '../../../components/Button/IconButton'
import { MENU_ENTRY_HEIGHT } from '../config'
import { PanelProps, PushedProps } from '../types'
import CakePrice from './CakePrice'
import SocialLinks from './SocialLinks'

interface Props extends PanelProps, PushedProps {}

const Container = styled.div`
  flex: none;
  padding: 8px 4px;
`

const SocialEntry = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${MENU_ENTRY_HEIGHT}px;
  padding: 0 16px;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const PanelFooter: React.FC<Props> = ({
  isPushed,
  pushNav,
  // toggleTheme,
  // isDark,
  cakePriceUsd,
  currentLang,
  langs,
  setLang,
}) => {
  if (!isPushed) {
    return (
      <Container>
        <IconButton variant="text" onClick={() => pushNav(true)}>
          <CogIcon />
        </IconButton>
      </Container>
    )
  }

  return (
    <Container>
      <SocialEntry>
        <SocialLinks />
      </SocialEntry>
      <ButtonWrapper>
        <CakePrice cakePriceUsd={cakePriceUsd} />
      </ButtonWrapper>
    </Container>
  )
}

export default PanelFooter
