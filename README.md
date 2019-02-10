# Goals

This is a tool that helps to review and calculate scores for the Aragon goals.

## Usage

### Review your related goals

```sh
yarn
FOUNDERS=Luis,Jorge yarn build
```

Open `bundle/index.html`.

### Get the final scores

Run the `aragon-goals` command, passing to it all the files in your possession:
`goals.json`, and `goals-ratings-Xyz.json` files transmitted by the team
members.

Example:

```sh
FOUNDERS=Luis,Jorge ./bin/aragon-goals ~/goals/goals.json ~/goals/scores-Popeye.json ~/goals/scores-Olive.json
```

Or using a glob pattern:

```sh
FOUNDERS=Luis,Jorge ./bin/aragon-goals ~/goals/*
```
