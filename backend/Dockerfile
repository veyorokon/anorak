FROM python:3.6

ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip
RUN pip install --upgrade pipenv

COPY ./build/entrypoint.sh /entrypoint.sh
COPY ./build/jupyter_notebook_config.py ~/.jupyter/

ADD . backend/

WORKDIR /backend

RUN set -ex && pipenv install --deploy --system --skip-lock

EXPOSE 8000

ENTRYPOINT [ "/entrypoint.sh" ]
