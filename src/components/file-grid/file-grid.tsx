import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

import styles from './file-grid.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

const FileGridContext = createContext()
export const useFileGridContext = () => useContext(FileGridContext)

export const FileGrid = ({ children, layout, color }) => (
  <FileGridContext.Provider value={color}>
    <div
      className={cx('file-grid', {
        'file-grid--row': layout === 'row',
        'file-grid--column': layout === 'column',
      })}
    >
      {children}
    </div>
  </FileGridContext.Provider>
)
FileGrid.propTypes = {
  children: PropTypes.node,
  layout: PropTypes.oneOf(['row', 'column']),
  color: PropTypes.oneOf(['light', 'dark']),
}
FileGrid.defaultProps = {
  layout: 'row',
  color: 'dark',
}