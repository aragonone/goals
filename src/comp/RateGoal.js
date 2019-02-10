import React, { useState } from 'react'
import styled from 'styled-components'
import { palette } from '../palette'
import { Button } from './Button'
import { NumberInput } from './NumberInput'
import { Highlight } from './Highlight'
import { isMainGoal, getRole, getGoal } from '../goals'

const filterRating = value => {
  value = Number(value)
  if (isNaN(value)) {
    return -1
  }
  return Math.max(0, Math.min(1, value))
}

// split “ratingAs” between the different roles
const splitRoles = ratingAs => {
  if (ratingAs.length === 1) {
    return ratingAs
  }
  for (const role of ['parent', 'peer', 'founder']) {
    if (ratingAs.includes(role)) {
      return [role, ratingAs.filter(r => r !== role)]
    }
  }
}

const RoleLabel = ({ role, name, goal, goals }) => {
  if (role === 'parent') {
    return (
      <span>
        the{' '}
        <Highlight>{getRole(name, getGoal(goal.parentId, goals))}</Highlight> of
        the parent goal
      </span>
    )
  }
  if (role === 'founder') {
    return (
      <span>
        a <Highlight>founder</Highlight>
      </span>
    )
  }
  if (role === 'peer') {
    return (
      <span>
        the <Highlight>{getRole(name, goal)}</Highlight>
      </span>
    )
  }
  return null
}

const RateAs = ({ name, goal, goals }) => {
  const { ratingAs } = goal

  const [role, otherRoles] = splitRoles(ratingAs)

  return (
    <div>
      <p>
        You are rating this goal as{' '}
        <RoleLabel role={role} name={name} goal={goal} goals={goals} />.
      </p>
      {otherRoles && (
        <p>
          {' '}
          You are also{' '}
          {otherRoles.map((role, i) => (
            <span key={i}>
              {i > 0 && i < otherRoles.length - 1 ? ',' : ''}
              {i > 0 && i === otherRoles.length - 1 ? <span> and </span> : null}
              <RoleLabel role={role} name={name} goal={goal} goals={goals} />
              {role === 'peer' && <span> of this goal</span>}
            </span>
          ))}
          , but only one score is needed.
        </p>
      )}
    </div>
  )

  return null
}

const Badge = props => (
  <div
    css={`
      padding: 5px 10px;
      white-space: nowrap;
      font-size: 14px;
    `}
    {...props}
  />
)

const getScoreValue = (rating, name) => {
  const score = rating.find(score => score[0] === name)
  if (score && score[1] > -1) {
    return score[1]
  }
  return ''
}

export const RateGoal = ({ name, goal, goals, rating, even, onUpdate }) => {
  return (
    <div
      css={`
        position: relative;
        padding: 40px 40px 60px;
        background: #fff;
        border: 2px solid ${palette[2]};
        border-radius: 5px;
        margin-left: ${goal.ratingAs.includes('parent') ? '60px' : '0'};
        margin-top: 40px;
        margin-bottom: 40px;
        &:before {
          content: '';
          display: ${goal.ratingAs.includes('parent') ? 'block' : 'none'};
          position: absolute;
          top: -42px;
          left: 40px;
          right: 40px;
          height: 40px;
          border: 2px solid ${palette[2]};
          border-width: 0 2px;
        }
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
            padding: 10px 20px;
            font-size: 20px;
            background: ${palette[0]};
            border-radius: 5px;
            margin-right: 20px;
          `}
        >
          {goal.name}
        </div>
        <Badge
          css={`
            color: ${isMainGoal(goal) ? palette[0] : palette[2]};
            background: ${isMainGoal(goal) ? palette[2] : palette[0]};
            border-radius: 0 3px 0 3px;
            margin-top: -40px;
            margin-right: -40px;
            white-space: nowrap;
          `}
        >
          {`#${goal.id}`} − {isMainGoal(goal) ? 'main goal' : 'sub goal'}
        </Badge>
      </div>
      <div>
        <div
          css={`
            margin-bottom: 40px;
          `}
        >
          <RateAs goal={goal} name={name} goals={goals} />
        </div>
        <div>
          {goal.ratingNames.map(name => (
            <div
              key={name}
              css={`
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 20px;
              `}
            >
              <div>
                <Highlight>{name}</Highlight> was the{' '}
                <Highlight>{getRole(name, goal)}</Highlight>.
              </div>
              <div
                css={`
                  display: flex;
                  margin-left: 10px;
                `}
              >
                <label>
                  {'Score: '}
                  <NumberInput
                    placeholder="0"
                    min="0"
                    max="1"
                    step="0.05"
                    value={getScoreValue(rating, name)}
                    onChange={e =>
                      onUpdate(name, filterRating(e.currentTarget.value))
                    }
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
