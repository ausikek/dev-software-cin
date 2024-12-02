FROM python:3.12.6-slim AS base

RUN mkdir /app

WORKDIR /app

## Build and Install Dependencies

FROM base AS builder

COPY Pipfile Pipfile.lock ./

RUN pip install pipenv \
    && pipenv requirements > requirements.txt

RUN --mount=type=cache,target=/root/.cache/pip \
    pip3 install -r requirements.txt

COPY . .

## Run the Application

FROM base AS runner

RUN addgroup --system --gid 1001 flask-python
RUN adduser --system --uid 1001 flask

COPY --from=builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages

COPY --from=builder /app ./

ENV PORT=3001

EXPOSE 3001

USER flask

CMD ["python", "run.py"]