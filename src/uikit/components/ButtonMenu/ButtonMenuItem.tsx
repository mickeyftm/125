import React from 'react'
import styled from 'styled-components'
import Button from '../Button/Button'
import { BaseButtonProps, PolymorphicComponent, variants } from '../Button/types'
import { ButtonMenuItemProps } from './types'

interface InactiveButtonProps extends BaseButtonProps {
  forwardedAs: BaseButtonProps['as']
}

const InactiveButton: PolymorphicComponent<InactiveButtonProps, 'button'> = styled(Button)<InactiveButtonProps>`
  background-color: transparent;
  color: ${({ theme, variant }) => (variant === variants.PRIMARY ? theme.colors.primary : theme.colors.textSubtle)};
  color: #fff;

  &:hover:not(:disabled):not(:active) {
    background-color: transparent;
  }
`

const ButtonMenuItem: PolymorphicComponent<ButtonMenuItemProps, 'button'> = ({
  isActive = false,
  variant = variants.PRIMARY,
  as,
  ...props
}: ButtonMenuItemProps) => {
  if (!isActive) {
    return (
      <InactiveButton
        borderRadius={14.5}
        width="62px"
        px="22px"
        py="6px"
        height="23px"
        forwardedAs={as}
        variant="tertiary"
        {...props}
      />
    )
  }

  return (
    <Button borderRadius={14.5} width="62px" px="22px" py="6px" height="23px" as={as} variant="primary" {...props} />
  )
}

export default ButtonMenuItem
