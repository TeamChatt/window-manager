import React from 'react'

import { TaskbarButton } from '/components/taskbar'
import { WMOutline } from './outline'

export const WMTaskbarButton = ({ id, active, hasOutline, onClick, children }) => (
  <TaskbarButton active={active} onClick={onClick}>
    {children}
    {hasOutline && <WMOutline id={id} />}
  </TaskbarButton>
)