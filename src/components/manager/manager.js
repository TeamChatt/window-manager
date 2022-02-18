import React, { createContext, useContext } from 'react'

import { FileGrid } from '~/src/components/file-grid'
import { Desktop } from '~/src/components/desktop'
import { Taskbar } from '~/src/components/taskbar'

import styles from './manager.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

const WindowContext = createContext()

export const useWindowContext = () => useContext(WindowContext)

export const Manager = ({
  background,
  windowItems,
  desktopItems,
  taskbarItems,
  taskbarExtras,
}) => {
  return (
    <div className={cx('window-manager')}>
      <div className={cx('window-manager_layer-group')}>
        <div className={cx('window-manager_layer')}>
          <Desktop background={background}>
            <FileGrid layout="column" color="light">{desktopItems}</FileGrid>
          </Desktop>
        </div>
        <div className={cx('window-manager_layer')}>{windowItems}</div>
      </div>
      <Taskbar>
        {taskbarItems}
        {taskbarExtras}
      </Taskbar>
    </div>
  )
}
