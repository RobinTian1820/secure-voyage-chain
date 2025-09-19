// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract SecureVoyageChain is SepoliaConfig {
    using FHE for *;
    
    struct Voyage {
        euint32 voyageId;
        euint32 cargoValue;
        euint32 insuranceAmount;
        euint32 riskScore;
        bool isActive;
        bool isVerified;
        string origin;
        string destination;
        address owner;
        uint256 startTime;
        uint256 endTime;
    }
    
    struct Shipment {
        euint32 shipmentId;
        euint32 cargoWeight;
        euint32 cargoValue;
        euint32 temperature;
        bool isSecure;
        string cargoType;
        address shipper;
        uint256 timestamp;
    }
    
    struct InsuranceClaim {
        euint32 claimId;
        euint32 claimAmount;
        euint32 damageAssessment;
        bool isApproved;
        string claimReason;
        address claimant;
        uint256 timestamp;
    }
    
    mapping(uint256 => Voyage) public voyages;
    mapping(uint256 => Shipment) public shipments;
    mapping(uint256 => InsuranceClaim) public insuranceClaims;
    mapping(address => euint32) public userReputation;
    mapping(address => euint32) public insuranceScore;
    
    uint256 public voyageCounter;
    uint256 public shipmentCounter;
    uint256 public claimCounter;
    
    address public owner;
    address public verifier;
    
    event VoyageCreated(uint256 indexed voyageId, address indexed owner, string origin, string destination);
    event ShipmentAdded(uint256 indexed shipmentId, uint256 indexed voyageId, address indexed shipper);
    event InsuranceClaimed(uint256 indexed claimId, uint256 indexed voyageId, address indexed claimant);
    event VoyageVerified(uint256 indexed voyageId, bool isVerified);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createVoyage(
        string memory _origin,
        string memory _destination,
        uint256 _duration
    ) public returns (uint256) {
        require(bytes(_origin).length > 0, "Origin cannot be empty");
        require(bytes(_destination).length > 0, "Destination cannot be empty");
        require(_duration > 0, "Duration must be positive");
        
        uint256 voyageId = voyageCounter++;
        
        voyages[voyageId] = Voyage({
            voyageId: FHE.asEuint32(0),
            cargoValue: FHE.asEuint32(0),
            insuranceAmount: FHE.asEuint32(0),
            riskScore: FHE.asEuint32(0),
            isActive: true,
            isVerified: false,
            origin: _origin,
            destination: _destination,
            owner: msg.sender,
            startTime: block.timestamp,
            endTime: block.timestamp + _duration
        });
        
        emit VoyageCreated(voyageId, msg.sender, _origin, _destination);
        return voyageId;
    }
    
    function addShipment(
        uint256 voyageId,
        externalEuint32 cargoWeight,
        externalEuint32 cargoValue,
        externalEuint32 temperature,
        string memory cargoType,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(voyages[voyageId].owner != address(0), "Voyage does not exist");
        require(voyages[voyageId].isActive, "Voyage is not active");
        
        uint256 shipmentId = shipmentCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalWeight = FHE.fromExternal(cargoWeight, inputProof);
        euint32 internalValue = FHE.fromExternal(cargoValue, inputProof);
        euint32 internalTemp = FHE.fromExternal(temperature, inputProof);
        
        shipments[shipmentId] = Shipment({
            shipmentId: FHE.asEuint32(0),
            cargoWeight: internalWeight,
            cargoValue: internalValue,
            temperature: internalTemp,
            isSecure: true,
            cargoType: cargoType,
            shipper: msg.sender,
            timestamp: block.timestamp
        });
        
        // Update voyage totals
        voyages[voyageId].cargoValue = FHE.add(voyages[voyageId].cargoValue, internalValue);
        
        emit ShipmentAdded(shipmentId, voyageId, msg.sender);
        return shipmentId;
    }
    
    function submitInsuranceClaim(
        uint256 voyageId,
        euint32 claimAmount,
        euint32 damageAssessment,
        string memory claimReason
    ) public returns (uint256) {
        require(voyages[voyageId].owner == msg.sender, "Only voyage owner can claim");
        require(voyages[voyageId].isActive, "Voyage must be active");
        
        uint256 claimId = claimCounter++;
        
        insuranceClaims[claimId] = InsuranceClaim({
            claimId: FHE.asEuint32(0),
            claimAmount: claimAmount,
            damageAssessment: damageAssessment,
            isApproved: false,
            claimReason: claimReason,
            claimant: msg.sender,
            timestamp: block.timestamp
        });
        
        emit InsuranceClaimed(claimId, voyageId, msg.sender);
        return claimId;
    }
    
    function verifyVoyage(uint256 voyageId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify voyages");
        require(voyages[voyageId].owner != address(0), "Voyage does not exist");
        
        voyages[voyageId].isVerified = isVerified;
        emit VoyageVerified(voyageId, isVerified);
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        userReputation[user] = reputation;
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function updateInsuranceScore(address user, euint32 score) public {
        require(msg.sender == verifier, "Only verifier can update insurance score");
        require(user != address(0), "Invalid user address");
        
        insuranceScore[user] = score;
    }
    
    function getVoyageInfo(uint256 voyageId) public view returns (
        string memory origin,
        string memory destination,
        uint8 cargoValue,
        uint8 insuranceAmount,
        uint8 riskScore,
        bool isActive,
        bool isVerified,
        address owner,
        uint256 startTime,
        uint256 endTime
    ) {
        Voyage storage voyage = voyages[voyageId];
        return (
            voyage.origin,
            voyage.destination,
            0, // FHE.decrypt(voyage.cargoValue) - will be decrypted off-chain
            0, // FHE.decrypt(voyage.insuranceAmount) - will be decrypted off-chain
            0, // FHE.decrypt(voyage.riskScore) - will be decrypted off-chain
            voyage.isActive,
            voyage.isVerified,
            voyage.owner,
            voyage.startTime,
            voyage.endTime
        );
    }
    
    function getShipmentInfo(uint256 shipmentId) public view returns (
        uint8 cargoWeight,
        uint8 cargoValue,
        uint8 temperature,
        bool isSecure,
        string memory cargoType,
        address shipper,
        uint256 timestamp
    ) {
        Shipment storage shipment = shipments[shipmentId];
        return (
            0, // FHE.decrypt(shipment.cargoWeight) - will be decrypted off-chain
            0, // FHE.decrypt(shipment.cargoValue) - will be decrypted off-chain
            0, // FHE.decrypt(shipment.temperature) - will be decrypted off-chain
            shipment.isSecure,
            shipment.cargoType,
            shipment.shipper,
            shipment.timestamp
        );
    }
    
    function getInsuranceClaimInfo(uint256 claimId) public view returns (
        uint8 claimAmount,
        uint8 damageAssessment,
        bool isApproved,
        string memory claimReason,
        address claimant,
        uint256 timestamp
    ) {
        InsuranceClaim storage claim = insuranceClaims[claimId];
        return (
            0, // FHE.decrypt(claim.claimAmount) - will be decrypted off-chain
            0, // FHE.decrypt(claim.damageAssessment) - will be decrypted off-chain
            claim.isApproved,
            claim.claimReason,
            claim.claimant,
            claim.timestamp
        );
    }
    
    function getUserReputation(address user) public view returns (uint8) {
        return 0; // FHE.decrypt(userReputation[user]) - will be decrypted off-chain
    }
    
    function getInsuranceScore(address user) public view returns (uint8) {
        return 0; // FHE.decrypt(insuranceScore[user]) - will be decrypted off-chain
    }
    
    function completeVoyage(uint256 voyageId) public {
        require(voyages[voyageId].owner == msg.sender, "Only voyage owner can complete");
        require(voyages[voyageId].isVerified, "Voyage must be verified");
        require(block.timestamp > voyages[voyageId].endTime, "Voyage must be ended");
        
        voyages[voyageId].isActive = false;
    }
}
