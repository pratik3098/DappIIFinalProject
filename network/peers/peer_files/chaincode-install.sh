function    usage {
    echo  "Usage: ./chain-test.sh    install | instantiate | invoke | query "
    echo  "Utility for testing peer/channel setup with chaincode"
}
if [ -z $1 ];
then
    usage
    echo  "Please specify Operation!!!"
    exit 0
else
  
    OPERATION=$1
fi


# Test Chaincode related properties
# Change these if you would like to try out your own chaincode
export CC_CONSTRUCTOR='{"Args":["instantiate"]}'
export CC_NAME="healthblocksPlatform"
export CC_PATH="/opt/gopath/src/github.com/hyperledger/fabric/peer/peer_files/contract_files/contract"
export CC_VERSION="1.0"
export CC_CHANNEL_ID="healthblocksplatformchannel"

echo "CC Operation : $OPERATION    for   Org: Healthblocks"

# Invoke the "peer chain code" command using the operation
case $OPERATION in
    "install")   
              peer chaincode install  -n $CC_NAME -p $CC_PATH -v $CC_VERSION -l node

              peer chaincode list --installed -C $CC_CHANNEL_ID 
        ;;
    "instantiate")
             # npm run --prefix $CC_PATH
              peer chaincode instantiate -C $CC_CHANNEL_ID -n $CC_NAME  -v $CC_VERSION -c $CC_CONSTRUCTOR  -o $ORDERER_ADDRESS

              #peer chaincode list --instantiated -C $CC_CHANNEL_ID
        ;;
    "clear")
            echo "Cleaning up Chaincode Docker images"
            docker rmi -f $(docker images -q | grep dev-)
        ;;
    *) usage
        ;;
esac


