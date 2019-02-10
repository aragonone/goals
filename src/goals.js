// Validate that the data structure correspond to the goals
export const isJsonGoals = data =>
  data &&
  Array.isArray(data.goals) &&
  data.goals.every(
    goal => typeof goal.id === 'number' && Array.isArray(goal.subgoals)
  )

// Validate that the data structure correspond to the ratings
export const isJsonRatings = data =>
  data &&
  typeof data.name === 'string' &&
  Array.isArray(data.ratings) &&
  data.ratings.every(
    rating =>
      Array.isArray(rating) &&
      rating.length === 2 &&
      typeof rating[0] === 'number' &&
      Array.isArray(rating[1]) &&
      rating[1].every(
        score =>
          Array.isArray(score) &&
          score.length === 2 &&
          typeof score[0] === 'string' &&
          typeof score[1] === 'number'
      )
  )

// Make the goals a flat structure and identify them as main / subgoal.
export const goalsFromJsonGoals = data =>
  data.goals.reduce((goals, { ...goal }) => {
    const { subgoals } = goal
    delete goal.subgoals
    return [
      ...goals,
      { ...goal, parentId: null },
      ...subgoals.map(subgoal => ({ ...subgoal, parentId: goal.id })),
    ]
  }, [])

// Returns true if it is a main goal, false otherwise (subgoal)
export const isMainGoal = goal => goal.parentId === null

// Returns a goal based on its id
export const getGoal = (id, goals) => goals.find(goal => goal.id === id)

// Get all the subgoals of a goal, using its id
export const getSubgoals = (id, goals) =>
  goals.filter(g => goal.parentId === id)

// Get all names (founders + advisors + owners)
export const getNames = (goals, founders = []) =>
  [
    ...new Set(
      goals.reduce(
        (names, goal) => [...names, goal.owner, goal.advisor],
        founders
      )
    ),
  ].sort()

// Get the peer of a name in a goal
export const getPeer = (name, goal) => {
  if (name === goal.owner) return goal.advisor
  if (name === goal.advisor) return goal.owner
  return null
}

// Get the role of a name in a goal
export const getRole = (name, goal) => {
  if (name === goal.owner) return 'owner'
  if (name === goal.advisor) return 'advisor'
  return null
}

// Is the name either an owner or an advisor of a goal
export const hasPeer = (name, goal) => getPeer(name, goal) !== null

// Get the goal to rate for a given name
export const getGoalsToRate = (name, goals, founders = []) =>
  goals.reduce((goalsToRate, goal) => {
    const ratingAs = []
    const ratingNames = new Set()

    // Founders rate all the main goals
    if (isMainGoal(goal) && founders.includes(name)) {
      ratingAs.push('founder')
      ratingNames.add(goal.advisor).add(goal.owner)
    }

    // Parent goal advisors / owners rate all the subgoals
    if (!isMainGoal(goal) && hasPeer(name, getGoal(goal.parentId, goals))) {
      ratingAs.push('parent')
      ratingNames.add(goal.advisor).add(goal.owner)
    }

    // Peer rating
    if (hasPeer(name, goal)) {
      ratingAs.push('peer')
      ratingNames.add(getPeer(name, goal))
    }

    // Delete the reviewer name
    if (ratingNames.has(name)) {
      ratingNames.delete(name)
    }

    // Goal unrelated to this name
    if (ratingAs.length === 0) {
      return goalsToRate
    }

    return [
      ...goalsToRate,
      { ...goal, ratingAs, ratingNames: [...ratingNames] },
    ]
  }, [])

// Get the goals directly related to a name
export const getDirectGoals = (goals, name) =>
  goals
    .filter(goal => [goal.owner, goal.advisor].includes(name))

// Returns all the reviewers of a name, per goal.
// goalsToRateByName must have the following shape: [reviewer, goals]
export const getReviewersByGoal = (name, goalsToRateByName) =>
  goalsToRateByName.reduce(
    (reviewersByGoal, [reviewer, goals]) =>
      goals.reduce(
        (reviewersByGoal, goal) =>
          goal.ratingNames.includes(name)
            ? [...reviewersByGoal, { goalId: goal.id, reviewer }]
            : reviewersByGoal,
        reviewersByGoal
      ),
    []
  )

// Get the ratings required for a given name
export const getRatingsRequired = (name, goals, founders) =>
  getReviewersByGoal(
    name,
    getNames(goals, founders).map(name => [
      name,
      getGoalsToRate(name, goals, founders),
    ])
  )

// Get all the ratings required
export const getAllRatingsRequired = (goals, founders) => {
  const names = getNames(goals, founders)
  const allGoalsToRate = names.map(name => [
    name,
    getGoalsToRate(name, goals, founders),
  ])
  return names.map(name => ({
    name,
    reviewersByGoal: getReviewersByGoal(name, allGoalsToRate),
  }))
}
