pragma solidity ^0.6.0;
contract Patient{
  address owner;
  mapping(bytes32=>address) disprensedPrescriptions;
  constructor(address _owner) public {
      owner= _owner;
  }
  
 
  function verifyPrescription( address _patientAddress) public isOwner {
      require(verifySender(_patientAddress), "Error: Invalid address");
 
  }
  
 function disprensePrescriptions( address _patientAddress, bytes32 _pres) public isOwner {
      require(verifySender(_patientAddress), "Error: Invalid address");
  }
  
  

  function isPrescDispensed(bytes32 _prescription) public view returns(bool){
     return (disprensedPrescriptions[_prescription]!=address(0));
  }
  
  
  function verifySender(address _doctorAddress) public pure returns (bool) {
      require(_doctorAddress !=address(0), "Error: Invalid doctor address.");
      return true;
  }
  
 
  modifier isOwner() {
      require(owner==msg.sender,"Error: Not an owner");
      _;
  }
 
}