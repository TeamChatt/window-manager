import React from 'react'

import styles from './desktop-item.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

const DesktopItem = ({ icon, label }) => (
  <div className={cx('desktop-item')}>
    <img className={cx('desktop-item_icon')} src={icon} />
    <span className={cx('desktop-item_label')}>{label}</span>
  </div>
)
export default DesktopItem
