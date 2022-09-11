import React from 'react'
import PropTypes from 'prop-types'

import { BaseButtonStyled } from './Button.styles'

const ALLOWED_TYPES = ['button', 'submit']
const ALLOWED_STYLES = ['raised', 'flat']
const ALLOWED_THEMES = ['primary', 'secondary']

const Button = ({ children, type, onClick, disabled, ...restProps }) => {
  const handleOnClick = (e) => {
    if (!disabled) {
      onClick(e)
    }
  }

  return (
    <BaseButtonStyled
      {...restProps}
      isDisabled={disabled}
      type={type}
      onClick={handleOnClick}
    >
      {children}
    </BaseButtonStyled>
  )
}

Button.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(ALLOWED_TYPES),
}

Button.defaultProps = {
  disabled: false,
  type: 'button',
}

export default Button
