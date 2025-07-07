
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Zap, LogOut, Home, FileText, CreditCard, Search } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
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
            
            {currentUser && (
              <nav className="hidden md:flex items-center space-x-4">
                <Link to="/dashboard">
                  <Button variant="ghost" className="text-white hover:bg-white/20">
                    <Home className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Link to="/generate-bill">
                  <Button variant="ghost" className="text-white hover:bg-white/20">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Bill
                  </Button>
                </Link>
                <Link to="/bill-history">
                  <Button variant="ghost" className="text-white hover:bg-white/20">
                    <CreditCard className="h-4 w-4 mr-2" />
                    My Bills
                  </Button>
                </Link>
                <Link to="/search-meter">
                  <Button variant="ghost" className="text-white hover:bg-white/20">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="text-white hover:bg-white/20"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </nav>
            )}
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
