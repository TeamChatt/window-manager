import React from 'react'

import styles from './index.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

const BSOD = ({ error }) => (
  <div className={cx('bsod')}>
    <div className={cx('bsod_column')}>
      <h2>Error</h2>
      <pre>An exception has occurred and the application cannot continue</pre>
      <pre>{error && error.stack}</pre>
    </div>
  </div>
)

export default BSOD
