
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bill } from '@/types/bill';
import Layout from '@/components/Layout';
import { CreditCard, Trash2, Filter, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

const BillHistory = () => {
  const { currentUser } = useAuth();
  const [filter, setFilter] = useState<'all' | 'paid' | 'unpaid'>('all');
  
  const bills = JSON.parse(localStorage.getItem('bills') || '[]') as Bill[];
  const userBills = bills.filter(bill => bill.username === currentUser?.username);
  
  const filteredBills = userBills.filter(bill => {
    if (filter === 'all') return true;
    if (filter === 'paid') return bill.status === 'Paid';
    if (filter === 'unpaid') return bill.status === 'Unpaid';
    return true;
  });

  const totalUnpaid = userBills
    .filter(bill => bill.status === 'Unpaid')
    .reduce((sum, bill) => sum + bill.billAmount, 0);

  const handlePayBill = (billId: string) => {
    const updatedBills = bills.map(bill => 
      bill.id === billId ? { ...bill, status: 'Paid' as const } : bill
    );
    localStorage.setItem('bills', JSON.stringify(updatedBills));
    toast.success('Bill paid successfully!');
    window.location.reload();
  };

  const handleDeleteBill = (billId: string) => {
    const updatedBills = bills.filter(bill => bill.id !== billId);
    localStorage.setItem('bills', JSON.stringify(updatedBills));
    toast.success('Bill deleted successfully!');
    window.location.reload();
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Bill History</h1>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-600" />
              <Select value={filter} onValueChange={(value: 'all' | 'paid' | 'unpaid') => setFilter(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Bills</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Card className="px-4 py-2 bg-gradient-electric text-white">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium">Total Due: ₹{totalUnpaid.toFixed(2)}</span>
              </div>
            </Card>
          </div>
        </div>

        {filteredBills.length === 0 ? (
          <Card className="p-8 text-center bg-gradient-glass backdrop-blur-lg border border-white/20">
            <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No bills found</h3>
            <p className="text-gray-500">
              {filter === 'all' 
                ? "You haven't generated any bills yet." 
                : `No ${filter} bills found.`}
            </p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredBills.map((bill) => (
              <Card key={bill.id} className="p-6 bg-gradient-glass backdrop-blur-lg border border-white/20">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Consumer Name</p>
                        <p className="font-medium">{bill.consumerName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Meter Number</p>
                        <p className="font-medium">{bill.meterNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Connection Type</p>
                        <p className="font-medium capitalize">{bill.connectionType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Units Consumed</p>
                        <p className="font-medium">{bill.unitsConsumed} kWh</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Bill Amount</p>
                        <p className="font-bold text-lg">₹{bill.billAmount.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          bill.status === 'Paid' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {bill.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4 md:mt-0 md:ml-6">
                    {bill.status === 'Unpaid' && (
                      <Button 
                        onClick={() => handlePayBill(bill.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Pay Now
                      </Button>
                    )}
                    <Button 
                      variant="destructive"
                      onClick={() => handleDeleteBill(bill.id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BillHistory;
