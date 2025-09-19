import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Package, MapPin, Clock, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ShipmentQuery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = () => {
    // Mock search results
    const mockResults = [
      {
        id: "SH001",
        trackingNumber: "FHE-2024-001-SH-LA",
        from: "Shanghai Port",
        to: "Los Angeles Port",
        status: "In Transit",
        encrypted: true,
        estimatedArrival: "2024-01-25",
        cargo: "Electronics",
      },
      {
        id: "SH002", 
        trackingNumber: "FHE-2024-002-HK-NY",
        from: "Hong Kong",
        to: "New York",
        status: "Encrypted",
        encrypted: true,
        estimatedArrival: "2024-01-28",
        cargo: "Pharmaceuticals",
      }
    ];
    setSearchResults(mockResults);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              Shipment Query
            </h1>
            <p className="text-muted-foreground">
              Search for shipments using tracking numbers or container IDs
            </p>
          </div>

          {/* Search Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" />
                Search Shipments
              </CardTitle>
              <CardDescription>
                Enter tracking number, container ID, or shipment reference
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input
                  placeholder="Enter tracking number (e.g., FHE-2024-001-SH-LA)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleSearch} className="wallet-connect">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                Search Results ({searchResults.length})
              </h2>
              
              {searchResults.map((shipment) => (
                <Card key={shipment.id} className="border border-border/50 hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          {shipment.trackingNumber}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {shipment.from} → {shipment.to}
                          </div>
                          <div className="flex items-center gap-1">
                            <Package className="w-4 h-4" />
                            {shipment.cargo}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <Badge 
                          className={
                            shipment.status === "Encrypted" 
                              ? "status-encrypted" 
                              : "status-active"
                          }
                        >
                          {shipment.encrypted && <Shield className="w-3 h-3 mr-1" />}
                          {shipment.status}
                        </Badge>
                        
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          ETA: {shipment.estimatedArrival}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        {shipment.encrypted 
                          ? "🔒 Shipment data is encrypted and protected by FHE until delivery checkpoint"
                          : "📍 Shipment location and details are accessible"
                        }
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {searchResults.length === 0 && searchTerm && (
            <Card className="text-center py-8">
              <CardContent>
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No shipments found</h3>
                <p className="text-muted-foreground">
                  Try searching with a different tracking number or container ID
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShipmentQuery;