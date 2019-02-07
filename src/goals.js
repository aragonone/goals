// Add names from a goal to an array if they don’t exist yet
const addGoalNames = (names, { owner, advisor }) => [
  ...names,
  ...(names.includes(owner) ? [] : [owner]),
  ...(names.includes(advisor) ? [] : [advisor]),
]

// Get all names (advisors + owners)
export const getNames = goals =>
  goals
    .reduce(
      (names, { subgoals, ...goal }) =>
        addGoalNames(
          subgoals.reduce((names, goal) => addGoalNames(names, goal), names),
          goal
        ),
      []
    )
    .sort()

// Add a goal to an array if the given name is either owner or advisor
const addGoalToRate = (goalsToRate, goal, name, subgoal) =>
  goal.owner !== name && goal.advisor !== name
    ? goalsToRate
    : [...goalsToRate, { ...goal, subgoal }]

// Get the goal to rate for a given name
export const getGoalsToRate = (goals, name) =>
  goals
    .reduce(
      (goalsToRate, { subgoals, ...goal }) => [
        ...addGoalToRate(goalsToRate, goal, name, false),
        ...subgoals.reduce(
          (goalsToRate, goal) => addGoalToRate(goalsToRate, goal, name, true),
          []
        ),
      ],
      []
    )
    .sort((goalA, goalB) => {
      if (goalA.subgoal === goalB.subgoal) {
        return 0
      }
      return goalA.subgoal ? 1 : -1
    })

// Validate that the data structure correspond to the ratings
export const isRatings = data =>
  typeof data.name === 'string' &&
  Array.isArray(data.ratings) &&
  data.ratings.every(
    rating =>
      Array.isArrya(rating) &&
      rating.length === 2 &&
      rating.every(v => typeof v === 'number')
  )

// Validate that the data structure correspond to the goals
export const isGoals = data =>
  Array.isArray(data.goals) &&
  data.goals.every(
    goal => typeof goal.id === 'number' && Array.isArray(goal.subgoals)
  )
