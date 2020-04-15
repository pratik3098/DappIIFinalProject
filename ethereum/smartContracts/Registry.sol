pragma solidity ^0.6.0;
contract Registry{
  address owner;
  mapping(address=> bool) patients;
  mapping(address=>bool) doctors;
  mapping(address=>bool) pharmacies;
  uint counterPatient;
  uint counterDoctor;
  uint counterPharmacy;
  event entityAdded(bytes32 entityType,address entity);
  constructor() public{
      owner=msg.sender;
  }
  
  
  function addPatient(address _patientAddress) public isOwner{
      require(_patientAddress != address(0), "Error: Invalid address");
      patients[_patientAddress]=true;
  }
  
   function addDoctor(address _doctorAddress) public isOwner{
      require(_doctorAddress != address(0), "Error: Invalid address");
      doctors[_doctorAddress]=true;
  }
  
   function addPharmacy(address _pharmacyAddress) public isOwner{
      require(_pharmacyAddress != address(0), "Error: Invalid address");
      pharmacies[_pharmacyAddress]=true;
  }
  
  function isPatient(address patientAddress) public view returns(bool){
      return (patients[patientAddress]);
  }
  
   function isDoctor(address doctorAddress) public view returns(bool){
      return (doctors[doctorAddress]);
  }
  
  function isPharmacy(address pharmacyAddress) public view returns(bool){
      return (pharmacies[pharmacyAddress]);
  }
 
  modifier isOwner() {
      require(owner==msg.sender,"Error: Not an owner");
      _;
  }
 
}