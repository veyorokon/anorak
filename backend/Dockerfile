FROM python:3.6

ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip
RUN pip install --upgrade pipenv

COPY Pipfile backend/
COPY Pipfile.lock backend/

WORKDIR /backend

RUN pipenv install --system --deploy
