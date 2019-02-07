import React from 'react'
import styled from 'styled-components'
import { palette } from '../palette'

export const NumberInput = props => (
  <input
    css={`
      width: 60px;
      padding: 5px;
      font-size: 18px;
      border: 2px solid ${palette[2]};
      border-radius: 3px;
      text-align: center;
      &:focus {
        outline: 0;
        border-color: ${palette[1]};
      }
    `}
    type="number"
    {...props}
  />
)
