#!/bin/bash 

docker build -t dobble-server .
docker run --rm -v $(pwd):/usr/src/app -p 3000:3000 dobble-server
