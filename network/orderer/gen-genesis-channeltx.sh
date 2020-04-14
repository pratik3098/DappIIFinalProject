#!/bin/bash

rm -f ./artefacts/*
#1 Generate the Genesis block
GENESIS_FILE=./artefacts/healthblocksPlatform-genesis.block
CHANNEL_NAME=ordererchannel
echo "====> Generating Genesis <====" 
configtxgen -profile HealthblocksPlatformOrdererGenesis -channelID $CHANNEL_NAME -outputBlock $GENESIS_FILE

#2 Generate the commercialpaper channel transaction file
CHANNEL_TX_FILE=./artefacts/healthblocksPlatform-channel.tx
CHANNEL_NAME=healthblocksplatformchannel
echo "====> Generating Channel Tx <===="
configtxgen -profile HealthblocksPlatformChannel -outputCreateChannelTx $CHANNEL_TX_FILE -channelID $CHANNEL_NAME


cp -f ./artefacts/healthblocksPlatform-channel.tx ../peers/peer_files


