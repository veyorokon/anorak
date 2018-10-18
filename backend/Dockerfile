FROM python:3.6

ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip

COPY requirements.txt backend/

WORKDIR /backend

RUN pip install -r requirements.txt 
 
