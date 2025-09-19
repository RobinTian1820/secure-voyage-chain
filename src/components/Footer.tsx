import cargoShipBanner from "@/assets/cargo-ship-banner.png";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-accent/20 to-muted/20 p-6">
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <h3 className="text-lg font-semibold mb-2 text-primary">
                  Encrypted Until Delivery
                </h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Your supply chain data remains protected with fully homomorphic encryption 
                  until verified delivery checkpoints are reached.
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-center space-y-2">
                  <div className="status-encrypted px-3 py-1 rounded-full text-xs font-medium">
                    ENCRYPTED
                  </div>
                  <div className="text-xs text-muted-foreground">In Transit</div>
                </div>
                <div className="w-8 h-px bg-gradient-to-r from-route-encrypted to-route-active route-glow"></div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="status-active px-3 py-1 rounded-full text-xs font-medium">
                    VERIFIED
                  </div>
                  <div className="text-xs text-muted-foreground">Delivered</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Animated cargo ship background */}
          <div className="absolute inset-0 opacity-30">
            <img 
              src={cargoShipBanner} 
              alt="Cargo ship with encrypted waves" 
              className="w-full h-full object-cover cargo-ship"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent"></div>
          </div>
          
          {/* Encrypted waves animation */}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="flex space-x-2 opacity-20">
              <div className="h-1 bg-route-encrypted rounded-full flex-1 encrypted-wave"></div>
              <div className="h-1 bg-primary rounded-full flex-1 encrypted-wave" style={{animationDelay: '0.5s'}}></div>
              <div className="h-1 bg-route-encrypted rounded-full flex-1 encrypted-wave" style={{animationDelay: '1s'}}></div>
              <div className="h-1 bg-primary rounded-full flex-1 encrypted-wave" style={{animationDelay: '1.5s'}}></div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; 2024 SupplyChain FHE. Secure logistics through encryption.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;