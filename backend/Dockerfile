FROM python:3.11-slim

RUN addgroup --system celery && adduser --system --ingroup celery --uid 1000 celery

RUN apt-get update && apt-get install -y \
  pkg-config default-libmysqlclient-dev build-essential  \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

USER celery

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]
