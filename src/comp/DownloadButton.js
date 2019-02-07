import React from 'react'
import { Button } from './Button'

export const DownloadButton = ({ filename = 'untitled', data, children }) => (
  <Button
    as="a"
    href={'data:text/plain;charset=utf-8,' + encodeURIComponent(data)}
    download={filename}
  >
    {children}
  </Button>
)
