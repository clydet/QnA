#!/bin/bash
USER=${1:-user}
PASSWORD=${2:-pass}
DATABASE=${3:-db}
PORT=${4:-5432}

echo USER $USER PASSORD $PASSWORD DATABASE $DATABASE PORT $PORT

mkdir -p ./tmpData
docker run \
  --name qna-db \
  -p $PORT:$PORT \
  -e POSTGRES_PASSWORD=$PASSWORD \
  -e POSTGRES_USER=$USER \
  -e POSTGRES_DB=$DATABASE \
  -v $(pwd)/tmpData/:/var/lib/postgresql/data \
  -d \
  postgres

attempt=0
while [ $attempt -le 59 ]; do
    attempt=$(( $attempt + 1 ))
    echo "Waiting for server to be up (attempt: $attempt)..."
    result=$(docker logs qna-db)
    if grep -q 'database system is ready to accept connections' <<< $result ; then
      echo "Postgres is up!"
      break
    fi
    sleep 2
done