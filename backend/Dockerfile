FROM python:3.6

ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip
RUN pip install --upgrade pipenv

COPY ./build/entrypoint.sh /entrypoint.sh
COPY ./build/.bashrc /root/.bashrc

ADD . backend/

WORKDIR /backend

RUN pipenv install --dev --deploy --system --skip-lock

RUN jupyter notebook --generate-config
COPY ./build/jupyter_notebook_config.py /root/.jupyter/jupyter_notebook_config.py

EXPOSE 8000

ENTRYPOINT [ "/entrypoint.sh" ]
