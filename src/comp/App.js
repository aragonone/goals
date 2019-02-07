import React, { useState, useCallback } from 'react'
import { getNames, getGoalsToRate } from '../goals'
// import { goals } from '../../goals.json'

import { Layout } from './Layout'
import { PickYourName } from './PickYourName'
import { RateGoals } from './RateGoals'
import { ImportGoals } from './ImportGoals'
import { DownloadGoals } from './DownloadGoals'

export const App = () => {
  const [name, setName] = useState(null)
  const [ratings, setRatings] = useState(null)
  const [goals, setGoals] = useState(null)

  return (
    <Layout
      title={(() => {
        if (!goals) return 'Import goals'
        if (!name) return 'Pick your name'
        if (!ratings) return 'Rate goals'
        return 'Download ratings'
      })()}
    >
      {(() => {
        if (!goals) {
          return <ImportGoals onGoals={setGoals} />
        }
        if (!name) {
          return <PickYourName names={getNames(goals)} onPick={setName} />
        }
        if (!ratings) {
          return (
            <RateGoals
              name={name}
              goals={getGoalsToRate(goals, name)}
              onValidate={ratings => {
                setRatings(JSON.stringify({ name, ratings }))
              }}
              onBack={() => setName('')}
            />
          )
        }
        return <DownloadGoals name={name} ratings={ratings} />
      })()}
    </Layout>
  )
}
