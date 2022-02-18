import React, { ReactNode } from 'react'

import styles from './desktop.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

type DesktopProps = {
  background: string
  backgroundPosition?: string
  children: ReactNode
}
export const Desktop = ({
  background,
  backgroundPosition,
  children,
}: DesktopProps) => (
  <div className={cx('desktop')}>
    <div
      className={cx('desktop_background')}
      style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: backgroundPosition,
      }}
    />
    {children}
  </div>
)
Desktop.defaultProps = {
  backgroundPosition: 'top center',
}
