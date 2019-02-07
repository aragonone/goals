import React from 'react'
import styled from 'styled-components'
import { palette } from '../palette'

export const Highlight = props => (
  <span
    css={`
      padding: 5px 10px;
      border-radius: 3px;
      background: ${palette[1]};
    `}
    {...props}
  />
)
