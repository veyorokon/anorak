FROM python:3.6

ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip
RUN pip install --upgrade pipenv

COPY ./scripts/entrypoint.sh /entrypoint.sh
ADD . backend/

WORKDIR /backend

RUN pipenv install --system --deploy

EXPOSE 8000

ENTRYPOINT [ "/entrypoint.sh" ]
