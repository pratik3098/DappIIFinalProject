#fabric-ca-server start -b admin.healthblocks:adminpw 

export FABRIC_CA_CLIENT_HOME=/etc/hyperledger/fabric-ca-client/admin.healthblocks

fabric-ca-client enroll -u http://admin.healthblocks:adminpw@ca.healthblocks.com:7054
fabric-ca-client identity modify admin.healthblocks  --json '{"attrs": [{"name": "hf.Registrar.Roles", "value": "peer,admin,orderer,client,user"}]}'
fabric-ca-client certificate list --id admin.healthblocks --store msp/admincerts

#fabric-ca-client affiliation add healthblocks

#Registering identities: 
fabric-ca-client register -d --id.name authenticator.healthblocks --id.secret authpw --id.attrs 'hf.Revoker=true,admin=true:ecert'

fabric-ca-client register -d --id.name cli.healthblocks --id.secret adminpw --id.attrs 'hf.Revoker=true,admin=true:ecert'

fabric-ca-client register -d --id.name patient.healthblocks --id.secret patientpw --id.attrs 'hf.Revoker=true,admin=true:ecert'

fabric-ca-client register -d --id.name doctor.healthblocks --id.secret doctorpw --id.attrs 'hf.Revoker=true,admin=true:ecert'

fabric-ca-client register -d --id.name pharmacy.healthblocks --id.secret pharmacypw --id.attrs 'hf.Revoker=true,admin=true:ecert'

#Registering Orderer Identity :

fabric-ca-client register -d --id.name orderer.healthblocks --id.type admin --id.secret ordererpw --id.attrs 'hf.Revoker=true,admin=true:ecert'
fabric-ca-client certificate list --id orderer.healthblocks --store msp/admincerts
# 6. Enrolling identities
export FABRIC_CA_CLIENT_HOME=/etc/hyperledger/fabric-ca-client/authenticator.healthblocks
fabric-ca-client enroll -u http://authenticator.healthblocks:pw@localhost:7054

export FABRIC_CA_CLIENT_HOME=/etc/hyperledger/fabric-ca-client/distributor.healthblocks 
fabric-ca-client enroll -u http://patient.healthblocks:pw@localhost:7054

export FABRIC_CA_CLIENT_HOME=/etc/hyperledger/fabric-ca-client/distributor.healthblocks 
fabric-ca-client enroll -u http://doctor.healthblocks:pw@localhost:7054

export FABRIC_CA_CLIENT_HOME=/etc/hyperledger/fabric-ca-client/distributor.healthblocks 
fabric-ca-client enroll -u http://pharmacy.healthblocks:pw@localhost:7054


export FABRIC_CA_CLIENT_HOME=/etc/hyperledger/fabric-ca-client/orderer.healthblocks
fabric-ca-client enroll -u http://orderer.healthblocks:ordererpw@localhost:7054

export FABRIC_CA_CLIENT_HOME=/etc/hyperledger/fabric-ca-client/cli.healthblocks
fabric-ca-client enroll -u http://cli.healthblocks:adminpw@localhost:7054


export FABRIC_CA_CLIENT_HOME=/etc/hyperledger/fabric-ca-client/admin.healthblocks


