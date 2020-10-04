import React from 'react'
import PropTypes from 'prop-types'

const ALLOWED_TYPES = ['button', 'submit']

const Button = ({ children, type, ...restProps }) => {
  return <button type={type}>{children}</button>
}

Button.propTypes = {
  type: PropTypes.oneOf(ALLOWED_TYPES),
}

Button.defaultProps = {
  type: 'button',
}

export default Button
