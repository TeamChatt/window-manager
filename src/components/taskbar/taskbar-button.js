import React from 'react'
import PropTypes from 'prop-types'

import styles from './taskbar-button.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

const TaskbarButton = ({
  name,
  borderless,
  children,
  disabled,
  onClick,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  onKeyDown,
  onKeyUp,
  onFocus,
  onBlur,
}) => (
  <button
    name={name}
    className={cx('taskbar-button', {
      'taskbar-button--borderless': borderless
    })}
    disabled={disabled}
    onClick={onClick}
    onMouseDown={onMouseDown}
    onMouseUp={onMouseUp}
    onMouseLeave={onMouseLeave}
    onKeyDown={onKeyDown}
    onKeyUp={onKeyUp}
    onFocus={onFocus}
    onBlur={onBlur}
  >
    {children}
  </button>
)
TaskbarButton.propTypes = {
  name: PropTypes.string,
  borderless: PropTypes.bool,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
}
export default TaskbarButton
