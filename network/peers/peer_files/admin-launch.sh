#!/bin/bash

peer channel create -o $ORDERER_ADDRESS -c healthblocksplatformchannel -f $CHANNEL_TX_FILE
sleep 3
rm -rf $HEALTHBLOCKSPLATFROM_CHANNEL_BLOCK_0
rm -rf $HEALTHBLOCKSPLATFROM_CHANNEL_BLOCK
peer node status


peer channel fetch 0  -o $ORDERER_ADDRESS -c healthblocksplatformchannel

sleep 3
#2 Join the channel
peer channel join -b $HEALTHBLOCKSPLATFROM_CHANNEL_BLOCK -o $ORDERER_ADDRESS
#sleep 3 

./peer_files/chaincode-install.sh install 


#./peer_files/chaincode-install.sh instantiate

