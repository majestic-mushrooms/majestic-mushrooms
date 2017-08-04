# Timebox

Seamless email client compatible with Gmail

## Team

- Bryant Huang
- Jennifer Wang
- Kirk Rohani
- Soo Park
- Andrea Miralles

## Roadmap

View the project roadmap [here](https://docs.google.com/document/d/1mt4K9bqHS1zIeejx9vtdj4LopGqEdqqY94ZmrbRnXQU/edit#heading=h.ihjn7e6kkht8)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

# Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)

## Usage

Click this [link](http://timebox-dev.us-west-1.elasticbeanstalk.com) and login with your Gmail acount to get started!

## Requirements

- Node 6.9.x
- Postgresql 9.6.x
- Redis
- Knex
- Semantic UI React
- Bookshelf ORM
- React
- Redux
- React Router
- Nylas Emal API
- Nylas Authentication
- Amazon Web Services


## Development

### Installing System Dependencies

```
brew install yarn
brew install postgresql
```

We chose to use Yarn as a replacement for npm. It's faster and *guarantees* consistency -- as we deploy in various environments, we don't run the risk of slight variations in what gets installed.

### Install Project Dependencies

```
yarn global add grunt-cli knex eslint
```


## Database Initialization

IMPORTANT: ensure `postgres` is running before performing these steps.

### Database Creation:

Use grunt to create a new database for development and test environments:

Development envronment: `grunt pgcreatedb:default`

Other environments, specify like so: NODE_ENV=test grunt pgcreatedb:default


### Run Migrations & Data Seeds

In terminal, from the root directory:

To migrate to the latest version, run:

`knex migrate:latest --env NODE_ENV`

To rollback a version, run:

`knex migrate:rollback --env NODE_ENV`

To populate the database with seed data, run:

`knex seed:run --env NODE_ENV`

Note: scripts are set up in package.json for these knex commands during development. Omit --env NODE_ENV for development

## Running the App

To run webpack build: `yarn build`

To run server: `yarn start`

To run tests: `yarn test`

To run your redis server for the session store `redis-server`


