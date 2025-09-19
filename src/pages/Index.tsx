import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LogisticsMap from "@/components/LogisticsMap";
import ShipmentStatus from "@/components/ShipmentStatus";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main map area */}
          <div className="lg:col-span-2">
            <LogisticsMap />
          </div>
          
          {/* Status sidebar */}
          <div className="lg:col-span-1">
            <ShipmentStatus />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
