import React from 'react'

import { BaseButtonStyled } from './Button.styles'

enum SubmitType {
  BUTTON = 'button', 
  SUBMIT='submit'
} 

enum ButtonStyle {
  RAISED = 'raised',
  FLAT = 'flat'
} 

enum Variants  {
  PRIMARY="primary",
  SECONDARY="secondary",
}

export type ButtonProps = {
  submitType?: SubmitType
  variant?: Variants
  onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ children, variant, onClick, disabled, submitType }) => {
  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      onClick(e)
    }
  }

  return (
    <BaseButtonStyled
      aria-disabled={disabled}
      isDisabled={disabled}
      type={submitType}
      onClick={handleOnClick}
    >
      {children}
    </BaseButtonStyled>
  )
}


export default Button
