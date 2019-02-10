import React, { useState, useEffect, useMemo } from 'react'
import { getNames, getGoalsToRate, goalsFromJsonGoals } from '../goals'
import { useHashChange } from '../hooks'

import { Layout } from './Layout'
import { PickYourName } from './PickYourName'
import { RateGoals } from './RateGoals'
import { ImportGoals } from './ImportGoals'
import { DownloadGoals } from './DownloadGoals'

export const App = ({ founders = [] }) => {
  const [hash, setHash] = useHashChange()
  const [goals, setGoals] = useState(null)
  const [ratings, setRatings] = useState(null)

  const names = useMemo(() => (goals ? getNames(goals, founders) : []), [
    goals,
    founders,
  ])

  const name = names.includes(hash) ? hash : null

  const title = useMemo(
    () => {
      if (!goals) return 'Import goals'
      if (!name) return 'Pick your name'
      if (!ratings) return 'Rate goals'
      return 'Download ratings'
    },
    [goals, name, ratings]
  )

  useEffect(
    () => {
      document.title = `Goals · ${title}`
    },
    [title]
  )

  useEffect(
    () => {
      if (hash === '') {
        setRatings(null)
      }
    },
    [hash]
  )

  return (
    <Layout title={title}>
      {(() => {
        if (!goals) {
          return <ImportGoals onGoals={setGoals} />
        }
        if (!name) {
          return <PickYourName names={names} onPick={setHash} />
        }
        if (!ratings) {
          return (
            <RateGoals
              name={name}
              goals={getGoalsToRate(name, goals, founders)}
              onValidate={ratings => {
                setRatings(JSON.stringify({ name, ratings }))
              }}
              onBack={() => setHash('')}
            />
          )
        }
        return <DownloadGoals name={name} ratings={ratings} />
      })()}
    </Layout>
  )
}
