pragma solidity ^0.6.0;
contract Pharmacy{
  address owner;
  mapping(bytes32=>address) disprensedPrescriptions;
  event dispensePrescription(bytes32 _pres, address _patient) ;
  constructor(address _owner) public {
      owner= _owner;
  }
  

  
 function disprensePrescriptions( address _patientAddress, bytes32 _pres) public  isOwner {
      require(verifySender(_patientAddress), "Error: Invalid address");
      Patient patient = Patient(_patientAddress);
      require(patient.isPresVerified(_pres), "Error: Prescription not verified");
      disprensedPrescriptions[_pres]=_patientAddress;
      emit dispensePrescription(_pres,_patientAddress);
  }
  
  

  function isPrescDispensed(bytes32 _prescription) public view returns(bool){
     return (disprensedPrescriptions[_prescription]!=address(0));
  }
  
  
  function verifySender(address _patientAddress) public view returns (bool) {
      require(_patientAddress !=address(0), "Error: Invalid doctor address.");
      Registry registry= Registry(0x05dCE7DaB2447EA6F14dA36E2Ee1AC57549395E0);
      return registry.isPatient(_patientAddress);
  }
  
 
  modifier isOwner() {
      require(owner==msg.sender,"Error: Not an owner");
      _;
  }
 
 
}


interface Patient {
      function isPresVerified(bytes32 _prescription) external view returns(bool);
}

interface Registry {
      function isPatient(address patientAddress) external view returns(bool);
      function isDoctor(address doctorAddress) external view returns(bool);
}