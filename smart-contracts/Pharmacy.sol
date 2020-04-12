pragma solidity ^0.6.0;
contract Pharmacy{
  address owner;
  mapping(bytes32=>address) disprensedPrescriptions;
  constructor(address _owner) public {
      owner= _owner;
  }
  

  
 function disprensePrescriptions( address _patientAddress, bytes32 _pres) public  isOwner {
      require(verifySender(_patientAddress), "Error: Invalid address");
      Patient patient = Patient(_patientAddress);
      require(patient.isPresVerified(_pres), "Error: Prescription not verified");
      
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


interface Patient {
      function isPresVerified(bytes32 _prescription) external view returns(bool);
}