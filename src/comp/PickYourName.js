import React from 'react'
import styled from 'styled-components'
import { palette } from '../palette'
import { Button } from './Button'

export const PickYourName = ({ names, onPick }) => {
  return (
    <div
      css={`
        display: grid;
        grid-template-columns: repeat(4, auto);
        grid-column-gap: 10px;
        grid-row-gap: 40px;
      `}
    >
      {names.map(name => (
        <div key={name}>
          <Button
            onClick={() => {
              onPick(name)
            }}
          >
            {name}
          </Button>
        </div>
      ))}
    </div>
  )
}
