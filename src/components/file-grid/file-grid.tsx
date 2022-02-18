import React, { createContext, ReactNode, useContext } from 'react'

import styles from './file-grid.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

type LabelColor = 'light' | 'dark'

const FileGridContext = createContext<LabelColor>('dark')
export const useFileGridContext = () => useContext(FileGridContext)

type FileGridProps = {
  children: ReactNode
  layout?: 'row' | 'column'
  color?: LabelColor
}
export const FileGrid = ({ children, layout, color }: FileGridProps) => (
  <FileGridContext.Provider value={color!}>
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
FileGrid.defaultProps = {
  layout: 'row',
  color: 'dark',
}
