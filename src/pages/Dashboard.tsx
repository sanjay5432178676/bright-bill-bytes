
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, CreditCard, Search, Zap, DollarSign, Clock, Users } from 'lucide-react';
import Layout from '@/components/Layout';

const Dashboard = () => {
  const { currentUser } = useAuth();
  
  const bills = JSON.parse(localStorage.getItem('bills') || '[]');
  const userBills = bills.filter((bill: any) => bill.username === currentUser?.username);
  const unpaidBills = userBills.filter((bill: any) => bill.status === 'Unpaid');
  const totalUnpaid = unpaidBills.reduce((sum: number, bill: any) => sum + bill.billAmount, 0);

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome back, {currentUser?.username}!
          </h1>
          <p className="text-gray-600">Manage your electricity bills efficiently</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 bg-gradient-electric text-white backdrop-blur-lg border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Total Bills</p>
                <p className="text-2xl font-bold">{userBills.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-energy text-white backdrop-blur-lg border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Unpaid Bills</p>
                <p className="text-2xl font-bold">{unpaidBills.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-power text-white backdrop-blur-lg border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <DollarSign className="h-6 w-6" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Amount Due</p>
                <p className="text-2xl font-bold">₹{totalUnpaid.toFixed(2)}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-bill text-white backdrop-blur-lg border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Active</p>
                <p className="text-2xl font-bold">Connected</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-8 bg-gradient-glass backdrop-blur-lg border border-white/20">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/generate-bill">
              <Button className="w-full h-24 bg-gradient-electric hover:opacity-90 flex flex-col items-center justify-center space-y-2">
                <FileText className="h-8 w-8" />
                <span className="font-medium">Generate New Bill</span>
              </Button>
            </Link>
            
            <Link to="/bill-history">
              <Button className="w-full h-24 bg-gradient-energy hover:opacity-90 flex flex-col items-center justify-center space-y-2">
                <CreditCard className="h-8 w-8" />
                <span className="font-medium">View Bill History</span>
              </Button>
            </Link>
            
            <Link to="/search-meter">
              <Button className="w-full h-24 bg-gradient-power hover:opacity-90 flex flex-col items-center justify-center space-y-2">
                <Search className="h-8 w-8" />
                <span className="font-medium">Search Meter</span>
              </Button>
            </Link>
          </div>
        </Card>

        {/* Recent Bills */}
        {userBills.length > 0 && (
          <Card className="p-6 bg-gradient-glass backdrop-blur-lg border border-white/20">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Bills</h3>
            <div className="space-y-3">
              {userBills.slice(0, 3).map((bill: any) => (
                <div key={bill.id} className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                  <div>
                    <p className="font-medium">{bill.consumerName}</p>
                    <p className="text-sm text-gray-600">Meter: {bill.meterNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">₹{bill.billAmount.toFixed(2)}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      bill.status === 'Paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {bill.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
