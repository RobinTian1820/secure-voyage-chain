import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Ship, Plane, Package, Lock, Unlock } from "lucide-react";

interface ShipmentNode {
  id: string;
  name: string;
  type: 'warehouse' | 'port' | 'airport' | 'distribution';
  status: 'encrypted' | 'active' | 'completed';
  icon: React.ReactNode;
  position: { x: number; y: number };
}

const LogisticsMap = () => {
  const shipmentNodes: ShipmentNode[] = [
    {
      id: '1',
      name: 'Origin Warehouse',
      type: 'warehouse',
      status: 'completed',
      icon: <Package className="w-4 h-4" />,
      position: { x: 10, y: 50 }
    },
    {
      id: '2',
      name: 'Port of Shanghai',
      type: 'port',
      status: 'completed',
      icon: <Ship className="w-4 h-4" />,
      position: { x: 30, y: 40 }
    },
    {
      id: '3',
      name: 'Pacific Transit',
      type: 'port',
      status: 'active',
      icon: <Ship className="w-4 h-4" />,
      position: { x: 55, y: 35 }
    },
    {
      id: '4',
      name: 'Port of LA',
      type: 'port',
      status: 'encrypted',
      icon: <Ship className="w-4 h-4" />,
      position: { x: 75, y: 45 }
    },
    {
      id: '5',
      name: 'Final Destination',
      type: 'distribution',
      status: 'encrypted',
      icon: <Truck className="w-4 h-4" />,
      position: { x: 90, y: 55 }
    }
  ];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success/20 border-success text-success';
      case 'active':
        return 'status-active';
      case 'encrypted':
        return 'status-encrypted';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Unlock className="w-3 h-3" />;
      case 'active':
        return <Unlock className="w-3 h-3" />;
      case 'encrypted':
        return <Lock className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Shipment #SC-2024-001</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="status-encrypted">
            <Lock className="w-3 h-3 mr-1" />
            FHE Protected
          </Badge>
        </div>
      </div>

      <Card className="p-6 bg-gradient-to-br from-card to-accent/5">
        <div className="relative h-96 bg-background/50 rounded-lg overflow-hidden">
          {/* Grid pattern background */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `
                linear-gradient(hsl(var(--border)) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          {/* Route lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {shipmentNodes.slice(0, -1).map((node, index) => {
              const nextNode = shipmentNodes[index + 1];
              const isActive = node.status === 'active' || nextNode.status === 'active';
              const isCompleted = node.status === 'completed' && nextNode.status === 'completed';
              
              return (
                <line
                  key={`route-${node.id}-${nextNode.id}`}
                  x1={node.position.x}
                  y1={node.position.y}
                  x2={nextNode.position.x}
                  y2={nextNode.position.y}
                  stroke={
                    isCompleted ? 'hsl(var(--success))' :
                    isActive ? 'hsl(var(--route-active))' : 
                    'hsl(var(--route-encrypted))'
                  }
                  strokeWidth="2"
                  strokeDasharray={isCompleted ? "0" : isActive ? "5,5" : "10,5"}
                  className={isActive ? "route-glow" : ""}
                  opacity="0.8"
                />
              );
            })}
          </svg>

          {/* Shipment nodes */}
          {shipmentNodes.map((node) => (
            <div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${node.position.x}%`,
                top: `${node.position.y}%`
              }}
            >
              <div className={`
                flex items-center space-x-2 px-3 py-2 rounded-full border backdrop-blur-sm
                ${getStatusStyles(node.status)}
                transition-all duration-300 hover:scale-105
              `}>
                {node.icon}
                {getStatusIcon(node.status)}
              </div>
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 min-w-max">
                <div className="text-xs text-center">
                  <div className="font-medium text-foreground">{node.name}</div>
                  <div className="text-muted-foreground capitalize">{node.status}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-1 bg-success rounded"></div>
            <span className="text-muted-foreground">Completed & Verified</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-1 bg-route-active rounded route-glow"></div>
            <span className="text-muted-foreground">Active Tracking</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-1 bg-route-encrypted rounded"></div>
            <span className="text-muted-foreground">FHE Encrypted</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LogisticsMap;