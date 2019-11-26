import React from 'react'

import styles from './index.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

const Desktop = ({ season, children }) => {
  const className = cx('desktop', {
    'desktop--spring': season === 'spring',
    'desktop--summer': season === 'summer',
    'desktop--fall':   season === 'fall',
    'desktop--winter': season === 'winter'
  })
  return (
    <div className={className}>
      <div className={cx('desktop_background')}/>
      {children}
    </div>
  )
}
export default Desktop
