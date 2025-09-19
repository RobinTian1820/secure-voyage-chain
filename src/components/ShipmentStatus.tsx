import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Unlock, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const ShipmentStatus = () => {
  const shipmentData = {
    id: "SC-2024-001",
    origin: "Shanghai, China",
    destination: "Los Angeles, USA",
    estimatedDelivery: "2024-09-25",
    currentLocation: "Pacific Transit",
    encryptedSegments: 3,
    verifiedSegments: 2,
    totalValue: "$45,000",
    containers: 4
  };

  const statusUpdates = [
    {
      timestamp: "2024-09-18 14:30",
      location: "Origin Warehouse",
      status: "completed",
      message: "Shipment secured and encrypted",
      encrypted: false
    },
    {
      timestamp: "2024-09-18 18:45", 
      location: "Port of Shanghai",
      status: "completed",
      message: "Loaded onto vessel MS Ocean Pioneer",
      encrypted: false
    },
    {
      timestamp: "2024-09-19 05:20",
      location: "Pacific Transit",
      status: "active",
      message: "In transit - data encrypted until checkpoint",
      encrypted: true
    },
    {
      timestamp: "2024-09-23 12:00",
      location: "Port of LA",
      status: "pending",
      message: "Awaiting delivery verification",
      encrypted: true
    }
  ];

  const getStatusIcon = (status: string, encrypted: boolean) => {
    if (encrypted) return <Lock className="w-4 h-4 text-route-encrypted" />;
    
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'active':
        return <Clock className="w-4 h-4 text-route-active" />;
      case 'pending':
        return <AlertTriangle className="w-4 h-4 text-cargo-warning" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Encryption Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-primary">{shipmentData.encryptedSegments}</div>
                <div className="text-xs text-muted-foreground">Encrypted Segments</div>
              </div>
              <Lock className="w-8 h-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success/10 to-success/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Verified Checkpoints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-success">{shipmentData.verifiedSegments}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
              <Unlock className="w-8 h-8 text-success/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Shipment Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-secondary">{shipmentData.totalValue}</div>
                <div className="text-xs text-muted-foreground">{shipmentData.containers} Containers</div>
              </div>
              <div className="text-secondary/50 text-sm font-mono">FHE</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shipment Details */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Shipment Details</CardTitle>
            <Badge variant="outline" className="status-active">
              In Transit
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Shipment ID</div>
              <div className="font-mono">{shipmentData.id}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Current Location</div>
              <div>{shipmentData.currentLocation}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Origin</div>
              <div>{shipmentData.origin}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Destination</div>
              <div>{shipmentData.destination}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Estimated Delivery</div>
              <div>{shipmentData.estimatedDelivery}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Tracking Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {statusUpdates.map((update, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(update.status, update.encrypted)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm">{update.location}</div>
                    <div className="text-xs text-muted-foreground">{update.timestamp}</div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1 flex items-center space-x-2">
                    <span>{update.message}</span>
                    {update.encrypted && (
                      <Badge variant="outline" className="status-encrypted text-xs">
                        ENCRYPTED
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShipmentStatus;