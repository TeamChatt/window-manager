import React, { ReactNode } from 'react'

import styles from './desktop.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

type DesktopProps = {
  background: string
  children: ReactNode
}
export const Desktop = ({ background, children }: DesktopProps) => (
  <div className={cx('desktop')}>
    <div
      className={cx('desktop_background')}
      style={{ backgroundImage: `url(${background})` }}
    />
    {children}
  </div>
)
