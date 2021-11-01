import React from 'react'
import styled from 'styled-components'
import { Flex, ArrowRightIcon, Button, Text } from 'uikit'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'

const IconWrapper = styled(ArrowRightIcon)`
  margin-left: 15px;
`

const TextWrapper = styled(Text)`
  margin: 0;
  color: ${(props) => props.color};
`

const CustomStyledButton = styled.button`
  align-items: center;
  border: 0;
  border-radius: 8px;
  box-shadow: 0px -1px 0px 0px rgba(14, 14, 44, 0.4) inset;
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  letter-spacing: 0.03em;
  line-height: 1;
  outline: 0;
  transition: background-color 0.2s, opacity 0.2s;
  padding: 5px 30px 5px 30px;
  background-color: ${(props) => props.color};
  display: none;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: inline;
  }
`

const SimpleIconWrapper = styled(ArrowRightIcon)`
  margin-top: 20px;
  display: inline;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: none;
  }
`

const LargeGetItButton = ({ textColor, buttonColor }) => {
  const { t } = useTranslation()

  return (
    <CustomStyledButton color={buttonColor}>
      <Flex justifyContent="center" flexDirection="row" alignItems="center" flexWrap="nowrap">
        <TextWrapper color={textColor} small>
          {t('GET IT')}
        </TextWrapper>
        <IconWrapper width="16px" fill={textColor} />
      </Flex>
    </CustomStyledButton>
  )
}

const GetItButton = ({ to, textColor, buttonColor }) => {
  return (
    <NavLink exact activeClassName="active" to={to}>
      <LargeGetItButton textColor={textColor} buttonColor={buttonColor} />
      <SimpleIconWrapper width="16px" fill="#fff" />
    </NavLink>
  )
}

export default GetItButton
