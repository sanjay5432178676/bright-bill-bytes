
import { useState } from 'react';
import Header from '@/components/Header';
import BillCard from '@/components/BillCard';
import UsageChart from '@/components/UsageChart';
import PaymentModal from '@/components/PaymentModal';
import QuickActions from '@/components/QuickActions';
import { Card } from '@/components/ui/card';
import { Zap, DollarSign, Calendar, TrendingUp } from 'lucide-react';

const Index = () => {
  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean;
    billAmount: number;
    billNumber: string;
  }>({
    isOpen: false,
    billAmount: 0,
    billNumber: ''
  });

  const bills = [
    {
      billNumber: "EB001234",
      amount: 125.50,
      dueDate: "2024-01-15",
      status: "pending" as const,
      unitsConsumed: 520
    },
    {
      billNumber: "EB001233",
      amount: 98.75,
      dueDate: "2023-12-15",
      status: "paid" as const,
      unitsConsumed: 420
    },
    {
      billNumber: "EB001232",
      amount: 156.20,
      dueDate: "2023-11-15",
      status: "overdue" as const,
      unitsConsumed: 650
    }
  ];

  const handlePayClick = (amount: number, billNumber: string) => {
    setPaymentModal({
      isOpen: true,
      billAmount: amount,
      billNumber
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-electric text-white backdrop-blur-lg border border-white/20 hover:scale-105 transition-transform duration-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <DollarSign className="h-6 w-6" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Current Bill</p>
                <p className="text-2xl font-bold">$125.50</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-energy text-white backdrop-blur-lg border border-white/20 hover:scale-105 transition-transform duration-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <p className="text-white/80 text-sm">This Month</p>
                <p className="text-2xl font-bold">520 kWh</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-power text-white backdrop-blur-lg border border-white/20 hover:scale-105 transition-transform duration-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Due Date</p>
                <p className="text-xl font-bold">Jan 15</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-bill text-white backdrop-blur-lg border border-white/20 hover:scale-105 transition-transform duration-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Avg. Monthly</p>
                <p className="text-2xl font-bold">$98</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bills Section */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Bills</h2>
              <div className="space-y-4">
                {bills.map((bill) => (
                  <BillCard
                    key={bill.billNumber}
                    {...bill}
                    onPayClick={() => handlePayClick(bill.amount, bill.billNumber)}
                  />
                ))}
              </div>
            </div>
            
            <UsageChart />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <QuickActions />
            
            <Card className="p-6 bg-gradient-glass backdrop-blur-lg border border-white/20">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Energy Tips</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <p className="text-sm text-green-800">💡 Use LED bulbs to save up to 80% energy</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <p className="text-sm text-blue-800">❄️ Set AC to 24°C for optimal efficiency</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                  <p className="text-sm text-purple-800">🔌 Unplug devices when not in use</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      
      <PaymentModal
        isOpen={paymentModal.isOpen}
        onClose={() => setPaymentModal(prev => ({ ...prev, isOpen: false }))}
        billAmount={paymentModal.billAmount}
        billNumber={paymentModal.billNumber}
      />
    </div>
  );
};

export default Index;
