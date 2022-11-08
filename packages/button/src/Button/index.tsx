import React, { useMemo } from 'react'

import { ButtonPrimary, ButtonSecondary, ButtonMinimal } from './Button.styles'

enum SubmitType {
  BUTTON = 'button',
  SUBMIT = 'submit',
}

enum Variants {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  MINIMAL = 'minimal',
}

export type ButtonProps = {
  /**
   * Default: "button". Can be one of either "button" or "submit". Sets the button type.
   */
  submitType?: SubmitType
  /**
   * Default: "secondary". Can be one of either "primary", "secondary", or "minimal". Sets the button style (variant).
   */
  variant?: Variants
  /**
   * Sets the action the button should perform on click or if space or enter is typed when the button is in focus.
   */
  onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void
  /**
   * Default: false. Sets whether the button can be clicked or not.
   */
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  submitType = SubmitType.BUTTON,
  variant = Variants.SECONDARY,
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
