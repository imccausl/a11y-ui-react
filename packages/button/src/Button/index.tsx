import * as React from 'react'

import { ButtonPrimary } from './Button.styles'

enum SubmitType {
  BUTTON = 'button',
  SUBMIT = 'submit',
}

// enum ButtonStyle {
//   RAISED = 'raised',
//   FLAT = 'flat',
// }

// enum Variants {
//   PRIMARY = 'primary',
//   SECONDARY = 'secondary',
// }

export type ButtonProps = {
  submitType?: SubmitType
  // variant?: Variants
  onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  submitType,
}) => {
  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      console.log('trigger publish for testing')
      onClick(e)
    }
  }

  return (
    <ButtonPrimary
      aria-disabled={disabled}
      type={submitType}
      onClick={handleOnClick}
    >
      {children}
    </ButtonPrimary>
  )
}

export default Button
