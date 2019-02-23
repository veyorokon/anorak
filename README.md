# Anorak

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/veyorokon/Anorak)

Anorak is a platform that allows users to create, share and discover (CSD) subscription services.

  - Subscriptions can be any reocurring payment (rent, phone, Netflix etc.).
  - Squads encapsulate subscriptions so they can be CSD'ed on Anorak.
  - Anorak rewards content creators with 100% of profit generated by squads.

# New Features!

  - Squad card images are now optionally available.

You can also:
  - Create squads for free.
  - Invite members to your squad.

### Tech

Anorak uses a number of open source and free tier projects to work properly:

* [ReactJS] - Front end JS framework.
* [Django] - Backend framework built with python.
* [npm] - Package manager for installing ReactJS modules.
* [Mixpanel] - User data analytics and tracking.
* [Docker] - Platform independent portable development.
* [GraphQL] - Query language for APIs.
* [Graphene] - GraphQL framework for python.
* [GraphIQL] - An in-browser IDE for exploring GraphQL.
* [Apollo] - Caching GraphQL client for GraphQL servers.
* [Material-UI] - React components that implement Google's Material Design.
* [Stripe] - Python library for the Stripe API.
* [Postgres] - SQL relational database. 

### Anorak's Three Distinct Components:
  - The database - Stores user/squad data using [Postgres](https://www.postgresql.org/).
  - The backend - Hosts a [GraphQL](https://graphql.org/) API to access data in the database.
  - The frontend - Serves the web browser UI that interfaces with the backend's API.

### Local Installation & Development

Anorak requires [Node.js](https://nodejs.org/) v8.11.4+ to run.

After *every* pull from Github, configure Mixpanel and Stripe keys for `local` or `server`. This step is for analytics and separates development from production data on our Mixpanel and Stripe dashboards.
```sh
$ ./config local
```

Docker container is used for version control for the backend and database. Docker Compose creates isolated environments as mini virtual machines making them portable and preventing version clashes. 

After you have [installed Docker Compose](https://docs.docker.com/compose/install/) you can create two containers: one for the backend which contains the API server logic and a separate container for the postgres database. Build the backend and database into individual containers.

```sh
$ docker-compose build
```

Running the build command with existing containers applies any package version updates. Data in the that container will not be deleted.

The `docker-compose.yml` file specifies which and how containers will start/build and also contains bash environment variables. For the `backend` container, the default `DJANGO_SETTINGS_MODULE` is set to development. 

The command to start the `backend` and `database` containers is:

```sh
$ docker-compose up
```

Your terminal window will now show any output/messages/errors from programs running on the containers. 

Leave this window and open a new terminal. Execute the `bash` command on the `backend` container to connect to its bash shell: 
```sh
$ docker-compose exec backend bash
```

You should be connected to the `backend` container's bash and your terminal window will look something like:
```sh
root@9daded436eb5:/app/backend#
```

If this is your first time, create a new Django superuser and follow the prompt.
```sh
$ ./manage.py createsuperuser
```

While still inside the backend container, make migrations and migrate them to the `database` container. Exit this container after this step.

```sh
$ ./manage.py makemigrations
$ ./manage.py migrate
$ exit
```

With your Django superuser, you can access the Django Admin locally with:

```sh
127.0.0.1:8000/api/admin/
```

The `backend` container has a GUI for GraphQL called GraphIQL. This allows you to debug GraphQL queries/mutations. Note, this is **only** available in development environments.

```sh
127.0.0.1:8000/api/graphql/
```

Install the frontend dependencies and start the `frontend` server. Open a new terminal and run:

```sh
$ cd frontend
$ npm install -d
$ npm start
```

You should now have two terminal windows: one running the dockerized `backend` with the `database` and another running the `frontend` from the previous step. Verify this by navigating to localhost port 3000 in your web browser. **If you're on Mac testing Mixpanel, note it will not work in Chrome but it works in Safari for some reason.**

```sh
127.0.0.1:3000
```

To stop the `frontend`, go back to the terminal window running it. Then, press `control + c`.

To stop the `backend` and `database` containers, go back to the terminal window running them. Then, press `control + c`. If you get an `ERROR: Aborting.` message run:
```sh
docker-compose stop
```

**Because containers are set to `restart: always` in the `docker-compose.yml`, Docker containers will automatically start on boot. Until fixed, you will need to manually stop them using the command above each time you restart `Docker` or your computer.**


### For production environments...

```sh
$ Install instructions needed.
```

### Common Errors
> could not translate host name "postgres" to address: Name or service not known

Make sure you have added '127.0.0.1 postgres' to your /etc/hosts file.

> Cannot read squad search of undefined `data.squadSearch`

In frontend/src/App/index.jsx, make sure you have the correct host: `uri: http://localhost:8000/api/graphql/`


### Todos

 - Write server install instructions

License
----

***Proprietary, Please Keep Private***


   [ReactJS]: <https://github.com/facebook/react>
   [Django]: <https://github.com/django/django>
   [npm]: <https://github.com/npm/cli>
   [Mixpanel]: <https://github.com/mixpanel/mixpanel-js>
   [Docker]: <https://github.com/docker>
   [Graphene]: <https://github.com/graphql-python/graphene>
   [Apollo]: <https://github.com/apollographql/apollo-client>
   [Material-UI]: <https://github.com/mui-org/material-ui>
   [Stripe]: <https://github.com/stripe/stripe-python>
   [GraphQL]: <https://graphql.org/>
   [GraphIQL]: <https://github.com/graphql/graphiql>
   [Postgres]: <https://www.postgresql.org/>
   
