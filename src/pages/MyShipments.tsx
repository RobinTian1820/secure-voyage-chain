import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, MapPin, Clock, Shield, Eye, Truck, Anchor } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const MyShipments = () => {
  const [activeTab, setActiveTab] = useState("all");

  const myShipments = [
    {
      id: "MS001",
      trackingNumber: "FHE-2024-001-SH-LA",
      from: "Shanghai Port",
      to: "Los Angeles Port", 
      status: "In Transit",
      encrypted: true,
      estimatedArrival: "2024-01-25",
      cargo: "Electronics",
      progress: 65,
      type: "sea"
    },
    {
      id: "MS002",
      trackingNumber: "FHE-2024-003-JP-SF",
      from: "Tokyo",
      to: "San Francisco",
      status: "Delivered",
      encrypted: false,
      estimatedArrival: "2024-01-20",
      cargo: "Automotive Parts",
      progress: 100,
      type: "sea"
    },
    {
      id: "MS003",
      trackingNumber: "FHE-2024-004-DE-CH",
      from: "Hamburg",
      to: "Chicago",
      status: "Encrypted",
      encrypted: true,
      estimatedArrival: "2024-01-30",
      cargo: "Machinery",
      progress: 25,
      type: "land"
    }
  ];

  const getFilteredShipments = () => {
    switch (activeTab) {
      case "active":
        return myShipments.filter(s => s.status === "In Transit" || s.status === "Encrypted");
      case "delivered":
        return myShipments.filter(s => s.status === "Delivered");
      default:
        return myShipments;
    }
  };

  const getStatusIcon = (type: string) => {
    switch (type) {
      case "sea":
        return <Anchor className="w-4 h-4" />;
      case "land":
        return <Truck className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              My Shipments
            </h1>
            <p className="text-muted-foreground">
              Track and manage your shipments with FHE encryption
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Shipments</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="grid gap-4">
                {getFilteredShipments().map((shipment) => (
                  <Card key={shipment.id} className="border border-border/50 hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getStatusIcon(shipment.type)}
                            <h3 className="text-lg font-semibold text-foreground">
                              {shipment.trackingNumber}
                            </h3>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {shipment.from} → {shipment.to}
                            </div>
                            <div className="flex items-center gap-1">
                              <Package className="w-4 h-4" />
                              {shipment.cargo}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              ETA: {shipment.estimatedArrival}
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="mb-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="text-foreground">{shipment.progress}%</span>
                            </div>
                            <div className="w-full bg-muted/30 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${shipment.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2 ml-4">
                          <Badge 
                            className={
                              shipment.status === "Encrypted" 
                                ? "status-encrypted"
                                : shipment.status === "In Transit"
                                ? "status-active" 
                                : "bg-success/20 text-success border-success/30"
                            }
                          >
                            {shipment.encrypted && <Shield className="w-3 h-3 mr-1" />}
                            {shipment.status}
                          </Badge>
                          
                          <Button size="sm" variant="outline" className="text-xs">
                            <Eye className="w-3 h-3 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </div>
                      
                      <div className="bg-muted/30 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          {shipment.encrypted 
                            ? "🔒 Shipment data is encrypted and protected by FHE until delivery checkpoint"
                            : shipment.status === "Delivered"
                            ? "✅ Shipment has been delivered and data is accessible"
                            : "📍 Shipment location and details are accessible"
                          }
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {getFilteredShipments().length === 0 && (
                  <Card className="text-center py-12">
                    <CardContent>
                      <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        No shipments found
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        You don't have any {activeTab === "all" ? "" : activeTab} shipments yet.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MyShipments;