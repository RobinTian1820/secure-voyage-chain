import { useWriteContract, useReadContract } from 'wagmi';
import { useAccount } from 'wagmi';
import { useState } from 'react';

// Contract ABI for SecureVoyageChain
const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_origin", "type": "string"},
      {"internalType": "string", "name": "_destination", "type": "string"},
      {"internalType": "uint256", "name": "_duration", "type": "uint256"}
    ],
    "name": "createVoyage",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "voyageId", "type": "uint256"},
      {"internalType": "string", "name": "cargoType", "type": "string"}
    ],
    "name": "addShipment",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "voyageId", "type": "uint256"},
      {"internalType": "string", "name": "claimReason", "type": "string"}
    ],
    "name": "submitInsuranceClaim",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "voyageId", "type": "uint256"}],
    "name": "getVoyageInfo",
    "outputs": [
      {"internalType": "string", "name": "origin", "type": "string"},
      {"internalType": "string", "name": "destination", "type": "string"},
      {"internalType": "uint8", "name": "cargoValue", "type": "uint8"},
      {"internalType": "uint8", "name": "insuranceAmount", "type": "uint8"},
      {"internalType": "uint8", "name": "riskScore", "type": "uint8"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "bool", "name": "isVerified", "type": "bool"},
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "uint256", "name": "startTime", "type": "uint256"},
      {"internalType": "uint256", "name": "endTime", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Contract address (replace with actual deployed contract address)
const CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000'; // Replace with actual address

export const useSecureVoyageChain = () => {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { writeContract } = useWriteContract();

  // Create a new voyage
  const createVoyage = async (origin: string, destination: string, duration: number) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'createVoyage',
        args: [origin, destination, duration],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create voyage');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Add shipment to voyage
  const addShipment = async (voyageId: number, cargoType: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'addShipment',
        args: [voyageId, cargoType],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add shipment');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Submit insurance claim
  const submitInsuranceClaim = async (voyageId: number, claimReason: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'submitInsuranceClaim',
        args: [voyageId, claimReason],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit insurance claim');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Read voyage information
  const getVoyageInfo = (voyageId: number) => {
    return useReadContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'getVoyageInfo',
      args: [voyageId],
    });
  };

  return {
    createVoyage,
    addShipment,
    submitInsuranceClaim,
    getVoyageInfo,
    isLoading,
    error,
    address,
  };
};
