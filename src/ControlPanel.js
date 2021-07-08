import React from 'react'
import {Leva} from 'leva'

export const ControlPanel = ({hidden}) => {
  const theme = {
    colors: {
      accent1: '#f4f5f8',
      accent2: '#f4f5f8',
      elevation1: '#f4f5f8',
      elevation2: 'white',
      elevation3: '#f4f5f8',
      highlight3: '#0f1f2e',
    },
    sizes: {
      scrubberWidth: '20px',
      controlWidth: '148px',
      titleBarHeight: '18px',
    },
  }
  return (
    <>
      <div className="-mx-4">
        <Leva
          theme={theme}
          hidden={hidden}
          fill
          flat
          hideCopyButton
          titleBar={false}
        />
      </div>
    </>
  )
}
