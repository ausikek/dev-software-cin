FROM python:3.12.6-slim AS base

RUN mkdir /app

WORKDIR /app

## Build and Install Dependencies

FROM base as builder

COPY Pipfile Pipfile.lock ./

RUN --mount=type=cache, id=python, target=/app/.cache pip install pipenv && pipenv install --deploy --system

COPY . .

## Run the Application

FROM base as runner

RUN addgroup --system --gid 1001 flask-python
RUN adduser --system --uid 1001 flask

COPY --from=builder /app ./

ENV PORT=3001

EXPOSE 3001

USER flask

CMD ["python", "main.py"]