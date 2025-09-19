import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import logoContainer from "@/assets/logo-container.png";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src={logoContainer} 
              alt="Supply Chain Tracker" 
              className="w-10 h-10 circuit-pulse"
            />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                SupplyChain FHE
              </h1>
              <p className="text-xs text-muted-foreground">Confidential Tracking</p>
            </div>
          </Link>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className={`px-4 py-2 text-sm rounded-md transition-colors ${location.pathname === '/' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                  Dashboard
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/query" className={`px-4 py-2 text-sm rounded-md transition-colors ${location.pathname === '/query' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                  Query Shipments
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/my-shipments" className={`px-4 py-2 text-sm rounded-md transition-colors ${location.pathname === '/my-shipments' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                  My Shipments
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/voyage-management" className={`px-4 py-2 text-sm rounded-md transition-colors ${location.pathname === '/voyage-management' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                  Voyage Management
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:block text-sm text-muted-foreground">
            Secure Voyage Chain with FHE
          </div>
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};

export default Header;