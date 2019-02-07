import React, { useState } from 'react'
import styled from 'styled-components'
import { palette } from '../palette'
import { Button } from './Button'
import { NumberInput } from './NumberInput'
import { Highlight } from './Highlight'

const filterRating = value => {
  value = Number(value)
  if (isNaN(value)) {
    return -1
  }
  return Math.max(0, Math.min(1, value))
}

const possessive = str => str + (str.endsWith('s') ? '’' : '’s')

export const RateGoal = ({ name, goal, rating, onUpdate }) => {
  return (
    <div
      css={`
        overflow: hidden;
        position: relative;
        padding: 40px;
        margin: 40px 0;
        background: #fff;
        border: 2px solid ${palette[2]};
        border-radius: 5px;
      `}
    >
      <div
        css={`
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 40px;
        `}
      >
        <div
          css={`
            padding-right: 10px;
            font-size: 20px;
          `}
        >
          {goal.name} − 
          <span title={`Goal ID: #${goal.id}`}>goal #{goal.id}</span>
        </div>
        <div
          css={`
            margin-top: -40px;
            margin-right: -40px;
            padding: 5px 10px;
            border-radius: 0 3px 0 3px;
            white-space: nowrap;
            font-size: 14px;
          `}
          style={{
            color: goal.subgoal ? palette[2] : palette[0],
            background: goal.subgoal ? palette[0] : palette[2],
          }}
        >
          {goal.subgoal ? 'sub goal' : 'main goal'}
        </div>
      </div>
      <div
        css={`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <div>
          <Highlight>
            {possessive(goal.advisor === name ? goal.owner : goal.advisor)}
          </Highlight>{' '}
          score as an{' '}
          <Highlight>{goal.advisor === name ? 'owner' : 'advisor'}</Highlight>:
        </div>
        <div
          css={`
            display: flex;
            margin-left: 10px;
          `}
        >
          <NumberInput
            placeholder="0"
            min="0"
            max="1"
            step="0.05"
            value={rating > -1 ? rating : ''}
            onChange={e => onUpdate(filterRating(e.currentTarget.value))}
          />
        </div>
      </div>
    </div>
  )
}
