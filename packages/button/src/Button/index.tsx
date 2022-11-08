import React, { useMemo } from 'react'

import { ButtonPrimary, ButtonSecondary, ButtonMinimal } from './Button.styles'

enum SubmitType {
  BUTTON = 'button',
  SUBMIT = 'submit',
}

// enum ButtonStyle {
//   RAISED = 'raised',
//   FLAT = 'flat',
// }

enum Variants {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  MINIMAL = 'minimal',
}

export type ButtonProps = {
  submitType?: SubmitType
  variant?: Variants
  onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  submitType,
  variant,
}) => {
  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      console.log('trigger publish for testing')
      onClick(e)
    }
  }

  const ButtonComponent = useMemo(() => {
    switch (variant) {
      case Variants.PRIMARY:
        return ButtonPrimary
      case Variants.MINIMAL:
        return ButtonMinimal
      default:
        return ButtonSecondary
    }
  }, [variant])

  return (
    <ButtonComponent
      aria-disabled={disabled}
      type={submitType}
      onClick={handleOnClick}
    >
      {children}
    </ButtonComponent>
  )
}

export default Button
