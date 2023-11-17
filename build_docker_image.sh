#!/bin/bash
docker rmi selenefox/blockscout-frontend:dev-zh
docker build -f Dockerfile -t selenefox/blockscout-frontend:dev-zh ./