import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { palette } from '../palette'
import { Button } from './Button'
import { TextButton } from './TextButton'
import { RateGoal } from './RateGoal'
import { Highlight } from './Highlight'

const plural = (value, singular, plural) => (value > 1 ? plural : singular)

const getRating = (ratings, id) => {
  const rating = ratings.find(rating => rating[0] === id)
  return rating ? rating[1] : -1
}

const setRating = (ratings, id, value) =>
  ratings.map(rating => (rating[0] === id ? [id, value] : rating))

export const RateGoals = ({ name, goals, onBack, onValidate }) => {
  const [ratings, setRatings] = useState(goals.map(({ id }) => [id, -1]))
  return (
    <div>
      <h2
        css={`
          margin-bottom: 40px;
          font-size: 26px;
        `}
      >
        There {plural(goals.length, 'is', 'are')}{' '}
        <Highlight>
          {goals.length} {plural(goals.length, 'goal', 'goals')}
        </Highlight>{' '}
        related to <Highlight>{name}</Highlight>
      </h2>
      <div>
        {goals.map(goal => (
          <RateGoal
            key={goal.id}
            name={name}
            goal={goal}
            rating={getRating(ratings, goal.id)}
            onUpdate={value => {
              setRatings(setRating(ratings, goal.id, value))
            }}
          />
        ))}
      </div>
      <div
        css={`
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 20px;
        `}
      >
        <TextButton onClick={onBack}>Back</TextButton>
        <Button
          css={`
            padding-left: 40px;
            padding-right: 40px;
          `}
          onClick={() => onValidate(ratings)}
        >
          Validate ratings
        </Button>
      </div>
    </div>
  )
}
