import React from 'react'
import styled from 'styled-components'
import { palette } from '../palette'

export const TextButton = props => (
  <button
    css={`
      position: relative;
      border: 0;
      background: none;
      cursor: pointer;
      font-weight: 400;
      &::-moz-focus-inner {
        border: 0;
        padding: 0;
      }
      &:focus {
        outline: 0;
      }
      &:active {
        transform: translate3d(1px, 1px, 0);
      }
      &:focus-visible:after {
        content: '';
        position: absolute;
        top: -4px;
        left: -4px;
        right: -6px;
        bottom: -6px;
        border-radius: 3px;
        border: 2px solid ${palette[1]};
      }
      &:-moz-focusring:after {
        content: '';
        position: absolute;
        top: -4px;
        left: -4px;
        right: -6px;
        bottom: -6px;
        border-radius: 3px;
        border: 2px solid ${palette[1]};
      }
    `}
    {...props}
  />
)
