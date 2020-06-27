import React, { useState, useEffect } from 'react'
import {
  useWMWindowState,
  useWMWindowElement,
  WindowManager,
  WMFileGridItem,
  WMFileGrid,
} from 'window-manager'

import background from '../images/touhou-wings.jpg'
import folderIcon from '../images/folder.png'
import imageIcon from '../images/image.png'
import chatIcon from '../images/chat.png'
import textIcon from '../images/text-file.png'

import picture1 from '../images/avatar-01.png'
import picture2 from '../images/avatar-02.png'
import picture3 from '../images/avatar-03.png'


const iconTypes = {
  'application/chat': chatIcon,
  'file/image': imageIcon,
  'file/document': textIcon,
  'folder': folderIcon,
}
const FSItem = ({ fsItem, onOpenItem }) => {
  const { id, label, type } = fsItem
  return (
    <WMFileGridItem
      icon={iconTypes[type]}
      label={label}
      id={id}
      onDoubleClick={() => onOpenItem(fsItem)}
    />
  )
}

const PictureWindow = ({ picture }) => (
  <div
    style={{
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 200,
      background: 'black'
    }}
  >
    <img src={picture} alt="" />
  </div>
)

const TextWindow = ({ text }) => (
  <div style={{ whiteSpace: 'pre-wrap', minHeight: 300 }}>
    {text}
  </div>
)

const FolderWindow = ({ fsItems, onOpenItem }) => (
  <div style={{width: 400, height: 250 }}>
    <WMFileGrid>
      {fsItems.map((fsItem) => (
        <FSItem key={fsItem.id} fsItem={fsItem} onOpenItem={onOpenItem} />
      ))}
    </WMFileGrid>
  </div>
)

const Counter = ({ count, setCount }) => {
  const windowElement = useWMWindowElement()
  
  // Window-level hotkey
  useEffect(() => {
    const el = windowElement.current
    const handler = (event) => {
      if(event.key === ' ' && event.target === el) {
        setCount((c) => c + 1)
      }
    }

    el.addEventListener('keypress', handler)
    return () => el.removeEventListener('keypress', handler)
  }, [windowElement.current])

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
    </div>
  )
}

const fsItems = [
  { id: 'chat', label: 'Chat', type: 'application/chat' },
  {
    id: 'pictures',
    label: 'Pictures',
    type: 'folder',
    contents: [
      {
        id: 'picture1',
        label: 'picture-1.png',
        type: 'file/image',
        file: picture1,
      },
      {
        id: 'picture2',
        label: 'picture-2.png',
        type: 'file/image',
        file: picture2,
      },
      {
        id: 'picture3',
        label: 'picture-3.png',
        type: 'file/image',
        file: picture3,
      },
    ],
  },
  {
    id: 'documents',
    label: 'Documents',
    type: 'folder',
    contents: [
      {
        id: 'document1',
        label: 'document-1.txt',
        type: 'file/document',
        file: 'Hello, World!',
      },
    ],
  },
]
const ExampleApp = () => {
  const [count, setCount] = useState(0)

  const [windowState, windowActions] = useWMWindowState({
    chat: {
      data: { id: 'chat', label: 'Chat', type: 'application/chat' },
      visibility: 'open',
      isFocused: true,
      dimensions: {
        width: 600,
        height: '80vh',
      },
    },
  })

  const onOpenItem = (fsItem) => {
    windowActions.openWindow(fsItem.id, {
      data: fsItem,
    })
  }

  const renderWindow = (fsItem) => {
    switch (fsItem.type) {
      case 'application/chat': {
        return {
          title: 'Chat',
          content: <Counter count={count} setCount={setCount} />,
        }
      }
      case 'file/image': {
        return {
          title: `Picture Viewer - ${fsItem.label}`,
          content: <PictureWindow picture={fsItem.file} />,
        }
      }
      case 'file/document': {
        return {
          title: `Notepad - ${fsItem.label}`,
          content: <TextWindow text={fsItem.file} />,
        }
      }
      case 'folder': {
        return {
          title: fsItem.label,
          content: (
            <FolderWindow fsItems={fsItem.contents} onOpenItem={onOpenItem} />
          ),
        }
      }
    }
  }

  const windows = Object.keys(windowState).map(id => {
    const state = windowState[id]
    const actions = windowActions.window[id]
    const fsItem = state.data
    const window = renderWindow(fsItem)
    return {
      id,
      state,
      actions,
      ...window,
    }
  })

  const desktopItems = (
    <>
      {fsItems.map((fsItem) => (
        <FSItem key={fsItem.id} fsItem={fsItem} onOpenItem={onOpenItem} />
      ))}
    </>
  )

  return (
    <WindowManager
      background={background}
      desktopItems={desktopItems}
      windows={windows}
    />
  )
}

export default ExampleApp
