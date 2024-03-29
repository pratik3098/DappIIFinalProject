pragma solidity ^0.6.0;
contract Doctor{
  address owner;
  mapping(address=> uint) patients;
  mapping(address=>mapping(uint=>uint)) assignPeriod;
  constructor(address _owner) public {
      owner= _owner;
  }
  
 
  function assignPatient( address _patientAddress) public isOwner {
      require(verifySender(_patientAddress), "Error: Invalid address");
      patients[_patientAddress]=now;
      assignPeriod[_patientAddress][patients[_patientAddress]]=0;
  }
  
 function withdrawPatient( address _patientAddress) public isOwner {
      require(verifySender(_patientAddress), "Error: Invalid address");
      assignPeriod[_patientAddress][patients[_patientAddress]]=now;
  }
  
  
  function addEmr(address _patientAddress, bytes32 _emr) public isOwner {
      require(verifySender(_patientAddress), "Error: Invalid address");
      Patient patient = Patient(_patientAddress);
      patient.addVerifiedEmr(_emr,address(this),keccak256(abi.encodePacked(_emr,address(this),now)));
  }
  
   function addPrescription(address _patientAddress, bytes32 _prescription) public isOwner {
      require(verifySender(_patientAddress), "Error: Invalid address");
      Patient patient = Patient(_patientAddress);
      patient.addVerifiedPrescription(_prescription,address(this),keccak256(abi.encodePacked(_prescription,address(this),now)));
  
  }
  
  function isPatientAssigned(address _patientAddress) public view returns(bool){
      return ( assignPeriod[_patientAddress][patients[_patientAddress]]!=now);
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
      function addVerifiedEmr(bytes32 _emr, address _doctorAddress,bytes32 _sign) external;
      function addVerifiedPrescription(bytes32 _prescription, address _doctorAddress, bytes32 _sign) external;
}