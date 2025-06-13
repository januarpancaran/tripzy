FROM python:3.11-alpine

RUN addgroup --system celery && adduser --system --ingroup celery --uid 1000 celery

RUN apk add --no-cache \
  gcc \
  musl-dev \
  libffi-dev \
  mysql-client \
  mariadb-dev \
  build-base \
  python3-dev \
  pkgconfig \
  linux-headers \
  openssl-dev

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

USER celery

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]
