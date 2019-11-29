import React from 'react'

import { TaskbarButton } from '/components/taskbar'
import { WMOutline } from './outline'

export const WMTaskbarButton = ({ label, active, onClick, children }) => (
  <TaskbarButton active={active} onClick={onClick}>
    {children}
    {!active && <WMOutline label={label} />}
  </TaskbarButton>
)