# Goals

This is a tool that helps to review and calculate scores for the Aragon goals.

## Usage

### Review your goals

```sh
yarn && yarn serve
```

Open <http://localhost:4000>.

### Calculate the final score

Run the `aragon-goals` command, passing to it all the files in your possession:
`goals.json`, and `goals-ratings-Xyz.json` files transmitted by the team
members.

Example:

```sh
./bin/aragon-goals ~/Desktop/goals.json ~/Desktop/goals-rating-Popeye.json ~/Desktop/goals-rating-Olive.json
```

Or using a glob pattern:

```sh
./bin/aragon-goals ~/goals-2020-q1/*
```

