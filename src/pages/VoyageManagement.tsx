import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useSecureVoyageChain } from '@/hooks/useContract';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const VoyageManagement = () => {
  const { address, isConnected } = useAccount();
  const { createVoyage, addShipment, submitInsuranceClaim, isLoading, error } = useSecureVoyageChain();
  
  const [voyageForm, setVoyageForm] = useState({
    origin: '',
    destination: '',
    duration: 0,
  });
  
  const [shipmentForm, setShipmentForm] = useState({
    voyageId: 0,
    cargoType: '',
  });
  
  const [claimForm, setClaimForm] = useState({
    voyageId: 0,
    claimReason: '',
  });

  const handleCreateVoyage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) return;
    
    try {
      await createVoyage(voyageForm.origin, voyageForm.destination, voyageForm.duration);
      alert('Voyage created successfully!');
      setVoyageForm({ origin: '', destination: '', duration: 0 });
    } catch (err) {
      console.error('Failed to create voyage:', err);
    }
  };

  const handleAddShipment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) return;
    
    try {
      await addShipment(shipmentForm.voyageId, shipmentForm.cargoType);
      alert('Shipment added successfully!');
      setShipmentForm({ voyageId: 0, cargoType: '' });
    } catch (err) {
      console.error('Failed to add shipment:', err);
    }
  };

  const handleSubmitClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) return;
    
    try {
      await submitInsuranceClaim(claimForm.voyageId, claimForm.claimReason);
      alert('Insurance claim submitted successfully!');
      setClaimForm({ voyageId: 0, claimReason: '' });
    } catch (err) {
      console.error('Failed to submit claim:', err);
    }
  };

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Connect Wallet</CardTitle>
            <CardDescription>
              Please connect your wallet to manage voyages and shipments.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ConnectButton />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Voyage Management</h1>
        <p className="text-muted-foreground">
          Manage your shipping voyages with encrypted data and smart contracts.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Connected: {address}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Create Voyage */}
        <Card>
          <CardHeader>
            <CardTitle>Create Voyage</CardTitle>
            <CardDescription>
              Start a new shipping voyage with encrypted tracking.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateVoyage} className="space-y-4">
              <div>
                <Label htmlFor="origin">Origin Port</Label>
                <Input
                  id="origin"
                  value={voyageForm.origin}
                  onChange={(e) => setVoyageForm({ ...voyageForm, origin: e.target.value })}
                  placeholder="e.g., Port of Singapore"
                  required
                />
              </div>
              <div>
                <Label htmlFor="destination">Destination Port</Label>
                <Input
                  id="destination"
                  value={voyageForm.destination}
                  onChange={(e) => setVoyageForm({ ...voyageForm, destination: e.target.value })}
                  placeholder="e.g., Port of Los Angeles"
                  required
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration (days)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={voyageForm.duration}
                  onChange={(e) => setVoyageForm({ ...voyageForm, duration: parseInt(e.target.value) })}
                  placeholder="e.g., 14"
                  required
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Creating...' : 'Create Voyage'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Add Shipment */}
        <Card>
          <CardHeader>
            <CardTitle>Add Shipment</CardTitle>
            <CardDescription>
              Add cargo to an existing voyage with encrypted data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddShipment} className="space-y-4">
              <div>
                <Label htmlFor="voyageId">Voyage ID</Label>
                <Input
                  id="voyageId"
                  type="number"
                  value={shipmentForm.voyageId}
                  onChange={(e) => setShipmentForm({ ...shipmentForm, voyageId: parseInt(e.target.value) })}
                  placeholder="e.g., 1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="cargoType">Cargo Type</Label>
                <Input
                  id="cargoType"
                  value={shipmentForm.cargoType}
                  onChange={(e) => setShipmentForm({ ...shipmentForm, cargoType: e.target.value })}
                  placeholder="e.g., Electronics, Food, Medicine"
                  required
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Adding...' : 'Add Shipment'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Submit Insurance Claim */}
        <Card>
          <CardHeader>
            <CardTitle>Insurance Claim</CardTitle>
            <CardDescription>
              Submit an insurance claim for voyage damages.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitClaim} className="space-y-4">
              <div>
                <Label htmlFor="claimVoyageId">Voyage ID</Label>
                <Input
                  id="claimVoyageId"
                  type="number"
                  value={claimForm.voyageId}
                  onChange={(e) => setClaimForm({ ...claimForm, voyageId: parseInt(e.target.value) })}
                  placeholder="e.g., 1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="claimReason">Claim Reason</Label>
                <Textarea
                  id="claimReason"
                  value={claimForm.claimReason}
                  onChange={(e) => setClaimForm({ ...claimForm, claimReason: e.target.value })}
                  placeholder="Describe the damage or loss..."
                  required
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Submitting...' : 'Submit Claim'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Smart Contract Features</CardTitle>
            <CardDescription>
              All operations use encrypted data and smart contracts instead of direct transfers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">🔐 Encrypted Data</h4>
                <p className="text-sm text-muted-foreground">
                  All cargo information is encrypted using FHE technology, ensuring privacy while allowing computations.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">📋 Smart Contracts</h4>
                <p className="text-sm text-muted-foreground">
                  Operations are executed through smart contracts, providing transparency and immutability.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🛡️ No Direct Transfers</h4>
                <p className="text-sm text-muted-foreground">
                  All transactions go through contract functions, avoiding direct ETH transfers for security.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🌊 Maritime Focus</h4>
                <p className="text-sm text-muted-foreground">
                  Specialized for shipping and logistics operations with industry-specific features.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VoyageManagement;
