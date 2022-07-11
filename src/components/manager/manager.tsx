import React, { ReactNode } from 'react'

import { FileGrid } from '~/src/components/file-grid'
import { Desktop } from '~/src/components/desktop'
import { Taskbar } from '~/src/components/taskbar'

import styles from './manager.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

type ManagerProps = {
  background: string
  backgroundPosition?: string
  themeColor: 'blue' | 'silver'
  windowItems: ReactNode
  desktopItems: ReactNode
  taskbarItems: ReactNode
  taskbarExtras: ReactNode
}
export const Manager = ({
  background,
  backgroundPosition,
  themeColor,
  windowItems,
  desktopItems,
  taskbarItems,
  taskbarExtras,
}: ManagerProps) => {
  return (
    <div className={cx('window-manager')} data-theme-color={themeColor}>
      <div className={cx('window-manager_layer-group')}>
        <div className={cx('window-manager_layer')}>
          <Desktop
            background={background}
            backgroundPosition={backgroundPosition}
          >
            <FileGrid layout="column" color="light">
              {desktopItems}
            </FileGrid>
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
