import React from 'react'
import { List } from '/components/generic/list'

import styles from './start-screen.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

const StartScreen = ({ children }) => (
  <div className={cx('start-screen')}>
    <div className={cx('start-screen_inner')}>
      <div className={cx('start-screen_contents')}>
        <List>
          {children}
        </List>
      </div>
    </div>
  </div>
)
export default StartScreen
