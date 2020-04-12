pragma solidity ^0.6.0;
contract Patient{
  address owner;
  mapping(bytes32=>address) emrs;
  mapping(bytes32=>bytes32) verifiedEmrs;
  mapping(bytes32=>address) prescriptions;
  mapping(bytes32=>bytes32) verifiedPres;
  event emrAdded(address doctor, bytes32 emr);
  event emrVerified(bytes32 emr, bool sign);
  event presVerified(bytes32 pres, bool sign);
  event prescriptionAdded(address doctor, bytes32 prescription);
  
  constructor(address _owner) public {
      owner= _owner;
  }
  
 
  function addEmr(bytes32 _emr, address _doctorAddress) public isOwner {
      require(verifySender(_doctorAddress), "Error: Invalid address");
      emrs[_emr]=_doctorAddress;
      emit emrAdded(_doctorAddress,_emr);
  }
  
  function addPrescription(bytes32 _prescription, address _doctorAddress) public isOwner {
      require(verifySender(_doctorAddress), "Error: Invalid address");
      emrs[_prescription]=_doctorAddress;
      emit prescriptionAdded(_doctorAddress,_prescription);
  }
  
  function addVerifiedEmr(bytes32 _emr, address _doctorAddress,bytes32 _sign) public isOwner {
      require(verifySender(_doctorAddress), "Error: Invalid address");
      emrs[_emr]=_doctorAddress;
      verifiedEmrs[_emr]=_sign;
      emit emrVerified(_emr,true);
      emit emrAdded(_doctorAddress,_emr);
  }
  
  function addVerifiedPrescription(bytes32 _prescription, address _doctorAddress, bytes32 _sign) public isOwner {
      require(verifySender(_doctorAddress), "Error: Invalid address");
      emrs[_prescription]=_doctorAddress;
      verifiedPres[_prescription]=_sign;
      emit emrVerified(_prescription,true);
      emit prescriptionAdded(_doctorAddress,_prescription);
  }
  
  function isEmrVerified(bytes32 _emr) public view returns(bool) {
      return (verifiedEmrs[_emr] !=0);
  }
  
   function isPresVerified(bytes32 _prescription) public view returns(bool) {
      return (verifiedPres[_prescription] !=0);
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