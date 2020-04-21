#!/bin/bash
peer node start
sleep 3 
peer node status
peer channel fetch 0  -o $ORDERER_ADDRESS -c healthblocksplatformchannel
sleep 3
#2 Join the channel
peer channel join -b $HEALTHBLOCKSPLATFROM_CHANNEL_BLOCK -o $ORDERER_ADDRESS



