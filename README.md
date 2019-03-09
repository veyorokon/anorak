# Anorak

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/veyorokon/Anorak)

Anorak is a platform that allows users to create, share and discover (CSD) subscription services.

  - Subscriptions can be any recurring payment (rent, phone, Netflix etc.).
  - Anorak rewards content creators with 100% of profit generated by subscriptions.

# New Features!

  - New UI!

You can also:
  - Create subscriptions for free.
  - In the future, you can invite members to your subscription.

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
  - The database - Stores user/subscription data using [Postgres](https://www.postgresql.org/).
  - The backend - Hosts a [GraphQL](https://graphql.org/) API to access data in the database.
  - The frontend - Serves the web browser UI that interfaces with the backend's API.

### Local Installation & Development

Anorak requires [Node.js](https://nodejs.org/) v8.11.4+ to run. the frontend. 

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

> Cannot read subscription search of undefined `data.subscriptionSearch`

In frontend/src/App/index.jsx, make sure you have the correct host: `uri: http://localhost:8000/api/graphql/`


# Deployment

The install instructions for deploying the backend and frontend on a server.

#### Important Paths
  - Nginx Config:  /etc/nginx/sites-available/squadup.xyz
  - Production VirtualENV: ~/.virtualenvs/production
  - Build Dir: /home/squadup0/server
  - GUnicorn Service: /etc/systemd/system/gunicorn.service
  - GUnicorn Socket: /etc/systemd/system/gunicorn.socket

#### Install Overview

The install instructions will proceed in the following order:
1) Creating Production VirtualEnv
2) Setting up Nginx
3) Setting up GUnicorn
4) Build and Deploy ReactJS Frontend

#### Creating the Production Virtual Environment
We need to keep the packages we use for the production version of the site separate from the global packages of the server to prevent version clashes. For this we use a Virtual ENV. The Production Virtual ENV or Production Environment is an isolated environment containing the Python3 modules needed to run the backend server. First, in your home directory for your user, pull the most recent version from the Github server. Then rename the project folder to 'server' to make it easily identifiable.


```sh
$ git pull/clone 
$ mv <folder> server
```

Create an alias in your bash profile to use pip3 when calling pip. Next, install virtual env and virtual env wrapper. Virtual env wrapper provides shortcuts that allow you to create, source and modify virtual environments in one specified directory called the WORKON_HOME. This is a bash environment variable set in the bash profile (if MAC) or bashrc file (if Ubuntu). 

```sh
$ sudo pip install virtualenv
$ mkdir ~/.virtualenvs
$ sudo pip install virtualenvwrapper
```

Then open the ~/.bashrc file and add export WORKON_HOME=~/.virtualenvs to the end of the file. This gets set everytime a new terminal opens up and tells virtualenv wrapper where to find all the virtual environments so you can create/modify them irrespective of your current directory. 

```sh
$ nano ~/.bashrc
```

```
[~/.bashrc]
...
export WORKON_HOME=~/.virtualenvs
```

Since .bashrc is the config file for terminal sessions, and you're currently using the terminal, the new settings won't be applied to your session unless you close your current terminal and open a new one or source the terminal config file (which now includes your changes) from your terminal. Afterwards, the changes will be applied to your session.

```
$ source ~/.bashrc
```

Now, the command $ echo $WORKON_HOME should display:
```
$ /home/<username>/.virtualenvs
```

Next create a Python 3 virtual environment called 'production' that will contain all of the packages needed for the production build with the following command and then exit the virtual environment.
```
$ mkvirtualenv -p 3.6 production
(production) $ deactivate
```

If a requirements.txt file doesn't exist, you'll need to create it. This file contains the packages to install for our production environment. In development, this file was maintained using PipEnv and currently is a PipFile. To convert this file into a requirements.txt file:
```
$ cd server/backend
$ pipenv install
$ pipenv shell
$ pip freeze > requirements.txt
```

This will generate a requirements file after which, you can then deactivate the pipenv. Then activate the production environment we created earlier and install all the packages in the requirements file.
```
$ exit
$ workon production
$ pip3 install -r requirements.txt
```

Lastly, create the productionEnv file that contains our environement variables in the home directory. The difference between this and the requirements.txt file is that the requirements file contains packages to install using the pip package manager while the productionEnv file contains environement variables and their values used at runtime. In the productionEnv we can set values for our STRIPE_ANORAK_PRODUCT or SECRET_KEY etc.

```
[~/productionEnv]
#!/bin/bash
# This hook is sourced after every virtualenv is activated.
DJANGO_SETTINGS_MODULE="backend.settings.production"
FACEBOOK_CLIENT_ID="<THE CODE HERE>"
FACEBOOK_CLIENT_SECRET="<THE SECRET HERE>"
SECRET_KEY="<THE DJANGO SECRET HERE>"
FIELD_ENCRYPTION_KEY="<FIELD ENCRYPTION KEY HERE>"
STRIPE_ACCOUNT_SID="<STRIPE KEY>"
STRIPE_ANORAK_PRODUCT="<PRODUCT>"
STRIPE_ANORAK_PLAN="<PLAN>"
DB_NAME="<DATABASE>"
DB_USER="<DATABASE USER>"
DB_HOST="localhost"
DB_PORT="5432"
DB_PASS='<DATABASE PASS>'
```

You'll also need to setup Postgres and create a Database and User/Pass for the application and add the fields to the file.

##### Configure Nginx

Nginx is the reverse proxy for the server that routes client requests to the appropriate services (processes) running on the server. Install Nginx and then create the config file:

```
$ touch -p /etc/nginx/sites-available/squadup.xyz
```

```
[/etc/nginx/sites-available/squadup.xyz]
...
server {
    server_name squadup.xyz www.squadup.xyz;

   # location = /favicon.ico { access_log off; log_not_found off; }
    location /static_files/{
        root /home/squadup0/server/backend;
    }
    location /api/ {
	#proxy_set_header   Host $host;
        include proxy_params;
	alias /home/squadup0/server/backend;
        proxy_pass http://unix:/run/gunicorn.sock;
    }

    location / {
	#proxy_set_header   X-Forwarded-For $remote_addr;
        proxy_set_header   Host $host;
        #include proxy_params;
	proxy_set_header Upgrade $http_upgrade;
	#alias /home/squadup0/server/frontend/build;
	proxy_pass http://127.0.0.1:5000;
	proxy_set_header Connection "upgrade";
	index index.html;
    autoindex on;
    set $fallback_file /index.html;
    if ($http_accept !~ text/html) {
        set $fallback_file /null;
    }
    if ($uri ~ /$) {
        set $fallback_file /null;
    }
    try_files $uri $fallback_file;
    }
}

```

After this point, you can configure HTTPS using certbot.

##### Configure GUnicorn
GUnicorn is the service that runs the Django backend. Create a file in: /etc/systemd/system/gunicorn.service:

```sh
[/etc/systemd/system/gunicorn.service]
...
[sudo] password for squadup0:
[Unit]
Description=gunicorn daemon
Requires=gunicorn.socket
After=network.target

[Service]
User=squadup0
Group=www-data
EnvironmentFile=/home/squadup0/productionEnv
WorkingDirectory=/home/squadup0/server/backend
ExecStart=/home/squadup0/.virtualenvs/production/bin/gunicorn \
          --access-logfile - \
          --workers 3 \
          --bind unix:/run/gunicorn.sock \
          backend.wsgi:application

[Install]
WantedBy=multi-user.target
```

This file tells GUnicorn to load the production virtualenv we created earlier along with the environment variable file productionEnv. Next create the socket file in: /etc/systemd/system/gunicorn.socket:

```
[/etc/systemd/system/gunicorn.socket]
...
[Unit]
Description=gunicorn socket

[Socket]
ListenStream=/run/gunicorn.sock

[Install]
WantedBy=sockets.target
```

#### Creating the Production Frontend Service
We need to update keys used by Mixpanel for tracking and Facebook for our App login. The config.sh file can change these variables. Navigate to the server folder and run: 

```sh
$ ./config server
```

Navigate to the frontend folder and edit the `src/index.js` folder changing the Apollo client to access the server by commenting out the line: `uri: 'http://localhost:8000/api/graphql'` and uncommenting the `uri:http://squadup.xyz/api/graphql/`.

Then add a .env file with the following values:
```
[.env]
...
NODE_PATH=./src
PUBLIC_URL="https://squadup.xyz"
```
   
Lastly, we'll need to build the production version and run it using Pm2 which you'll need to install.
```sh
rm -rf build &&  npm run build && pm2 stop all && pm2 serve /home/squadup0/server/frontend/build 5000
```

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
   
