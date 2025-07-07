
import { Bell, User, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-gradient-electric backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Zap className="h-8 w-8 text-white animate-pulse-slow" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">ElectriPay</h1>
              <p className="text-white/80 text-sm">Smart Bill Management</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-white/80 hover:text-white transition-colors">Dashboard</a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">Bills</a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">Usage</a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">Support</a>
          </nav>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
