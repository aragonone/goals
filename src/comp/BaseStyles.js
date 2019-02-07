import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { palette } from '../palette'

export const BaseStyles = createGlobalStyle`
  body {
    background: ${palette[0]};
  }
  body, button, input, h1, h2, h3 {
    font: 300 18px/1.5 monospace;
    color: ${palette[3]};
  }
  body, h1, h2, h3 {
    margin: 0;
    padding: 0;
  }
`
