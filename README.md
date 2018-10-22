# Development Environment

## Using pipenv

```
$ pip install -U pipenv
$ cd backend/ 
$ pipenv install
$ pipenv shell
$ pipenv install some-pip-dependency
```


# Connecting to stuff


## Database:

**User:** `postgres`

**Database:** `postgres`

**Host / Port:** [localhost:9432](postgres://postgres@localhost:9432/postgres)

**Connecting from command:**

```
$ psql --host localhost --port 9432 --user postgres

postgres=# ... query here
```

## Frontend: 
http://127.0.0.1:19002/