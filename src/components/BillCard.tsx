
import { Calendar, DollarSign, Zap, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface BillCardProps {
  billNumber: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  unitsConsumed: number;
  onPayClick: () => void;
}

const BillCard = ({ billNumber, amount, dueDate, status, unitsConsumed, onPayClick }: BillCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'paid':
        return 'bg-gradient-to-r from-green-400 to-green-600';
      case 'pending':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 'overdue':
        return 'bg-gradient-to-r from-red-400 to-red-600';
      default:
        return 'bg-gradient-to-r from-gray-400 to-gray-600';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'paid':
        return 'Paid';
      case 'pending':
        return 'Pending';
      case 'overdue':
        return 'Overdue';
      default:
        return 'Unknown';
    }
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-glass backdrop-blur-lg border border-white/20 hover:scale-105 transition-all duration-300 group">
      <div className="absolute inset-0 bg-gradient-power opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      
      <div className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-electric rounded-lg">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="font-medium text-gray-700">Bill #{billNumber}</span>
          </div>
          <div className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-600">
              <DollarSign className="h-4 w-4" />
              <span>Amount</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">${amount}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>Due Date</span>
            </div>
            <span className="font-medium text-gray-700">{dueDate}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Units Used</span>
            </div>
            <span className="font-medium text-gray-700">{unitsConsumed} kWh</span>
          </div>
        </div>
        
        {status !== 'paid' && (
          <Button 
            onClick={onPayClick}
            className="w-full mt-4 bg-gradient-energy hover:opacity-90 transition-opacity"
          >
            Pay Now
          </Button>
        )}
      </div>
    </Card>
  );
};

export default BillCard;
