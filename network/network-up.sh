#!/bin/bash
### Note: Copy configtxgen to /usr/bin
sudo chmod 755 ./orderer/gen-genesis-channeltx.sh

#./orderer/gen-genesis-channeltx.sh


docker-compose -f ./orderer/orderer.yaml up -d

sleep 5

docker-compose -f ./peers/peers.yaml up -d
