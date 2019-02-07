import React from 'react'
import styled from 'styled-components'
import { palette } from '../palette'

export const Button = props => (
  <button
    css={`
      position: relative;
      border: 0;
      border-radius: 3px;
      padding: 15px 20px;
      color: ${palette[2]};
      background: ${palette[1]};
      box-shadow: 2px 2px 0 ${palette[2]};
      cursor: pointer;
      font-weight: 400;
      white-space: nowrap;
      text-decoration: none;
      &::-moz-focus-inner {
        border: 0;
        padding: 0;
      }
      &:active {
        transform: translate3d(1px, 1px, 0);
        box-shadow: 1px 1px 0 ${palette[2]};
      }
      &:focus {
        outline: 0;
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
