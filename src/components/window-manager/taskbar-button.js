import React from 'react'

import { TaskbarButton } from '/components/taskbar'
import { WMOutline } from './outline'

export const WMTaskbarButton = ({ id, active, onClick, children }) => (
  <TaskbarButton active={active} onClick={onClick}>
    {children}
    {!active && <WMOutline id={id} />}
  </TaskbarButton>
)