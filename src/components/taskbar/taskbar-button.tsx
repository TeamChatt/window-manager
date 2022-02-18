import React, { ReactNode, SyntheticEvent } from 'react'

import styles from './taskbar-button.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

type TaskbarButtonProps = {
  active: boolean
  children: ReactNode
  disabled?: boolean
  onClick: (e: SyntheticEvent) => void
  onKeyDown?: (e: SyntheticEvent) => void
  onFocus?: (e: SyntheticEvent) => void
  onBlur?: (e: SyntheticEvent) => void
}
export const TaskbarButton = ({
  active,
  children,
  disabled,
  onClick,
  onKeyDown,
  onFocus,
  onBlur,
}: TaskbarButtonProps) => (
  <button
    className={cx('taskbar-button', {
      'taskbar-button--active': active,
    })}
    disabled={disabled}
    onClick={onClick}
    onKeyDown={onKeyDown}
    onFocus={onFocus}
    onBlur={onBlur}
  >
    {children}
  </button>
)
