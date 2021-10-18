#!/bin/bash
docker stop qna-db
docker container rm qna-db
rm -rf ./tmpData