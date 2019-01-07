# SquadUp

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/veyorokon/SquadUp)

SquadUp is a platform that allows users to create, share and discover (CSD) subscription services.

  - Subscriptions can be any reocurring payment (rent, phone, Netflix etc.).
  - Squads encapsulate subscriptions so they can be CSD'ed on SquadUp.
  - SquadUp rewards content creators with 100% of profit generated by squads.

# New Features!

  - Squad card images are now optionally available.


You can also:
  - Create squads for free.
  - Invite members to your squad.

### Tech

SquadUp uses a number of open source and free tier projects to work properly:

* [ReactJS] - Front end JS framework
* [Django] - Backend framework built with python
* [npm] - Package manager for installing ReactJS modules
* [Mixpanel] - User data analytics and tracking
* [Docker] - Platform independent portable development
* [Graphene] - GraphQL framework for python
* [Apollo] - Caching GraphQL client for GraphQL servers
* [Material-UI] - React components that implement Google's Material Design.
* [Stripe] - Python library for the Stripe API.

### Installation

SquadUp requires [Node.js](https://nodejs.org/) v8.11.4+ to run.



After *every* pull the code from Github, configure Mixpanel and Stripe keys for 'local' or 'server'. This step is for analytics and separates development from production data on our Mixpanel and Stripe dashboards.
```sh
$ ./config local
```

Install the backend dependencies by building the container.

```sh
$ docker-compose build
```

To start a docker container for the backend run the following. The terminal window will then show both the database container and the backend container starting each in their own container named: backend and database; respectively.

```sh
$ docker-compose up
```

Leave the previous terminal window and open a new terminal window. If this is the first time after a fresh install, create a Django super user. Since Django was installed in the backend container, you have to connect/login to that container.
```sh
$ docker-compose exec backend bash
```

You will be connected to the bash terminal in the backend container and your terminal window will display something like the following:
```sh
root@9daded436eb5:/app/backend#
```

If this is your first time, create a new Django superuser.
```sh
$ ./manage.py createsuperuser
```

While still inside the backend container, make migrations and migrate them to the database. Exit this container after this step.

```sh
$ ./manage.py makemigrations
$ ./manage.py migrate
$ exit
```

Django Admin is available via the following URL:

```sh
127.0.0.1:8000/api/admin/
```

GraphIQL is available on the backend *only* in development environments.

```sh
127.0.0.1:8000/api/graphql/
```

Install the frontend dependencies and devDependencies and start the server.

```sh
$ cd frontend
$ npm install -d
$ npm start
```

Verify the deployment of frontend by navigating to localhost port 3000 in your preferred browser. *Mixpanel integrations will not work in Chrome but works in Safari.*

```sh
127.0.0.1:3000
```

For production environments...

```sh
$ Install instructions needed.
```

### Common Errors
> could not translate host name "postgres" to address: Name or service not known

Make sure you have added '127.0.0.1 postgres' to your /etc/hosts file.


### Todos

 - Write server install instructions

License
----

Proprietary, Private


   [ReactJS]: <https://github.com/facebook/react>
   [Django]: <https://github.com/django/django>
   [npm]: <https://github.com/npm/cli>
   [Mixpanel]: <https://github.com/mixpanel/mixpanel-js>
   [Docker]: <https://github.com/docker>
   [Graphene]: <https://github.com/graphql-python/graphene>
   [Apollo]: <https://github.com/apollographql/apollo-client>
   [Material-UI]: <https://github.com/mui-org/material-ui>
   [Stripe]: <https://github.com/stripe/stripe-python>
   
