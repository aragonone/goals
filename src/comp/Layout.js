import React, { useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { BaseStyles } from './BaseStyles'

export const Layout = ({ children, title }) => (
  <div
    css={`
      min-width: 320px;
      max-width: 700px;
      padding: 40px;
      margin: 0 auto;
    `}
  >
    <BaseStyles />
    <h1
      css={`
        font-size: 40px;
        margin: 40px 0 80px;
      `}
    >
      Goals · {title}
    </h1>
    {children}
  </div>
)
