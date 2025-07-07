
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { calculateBillAmount } from '@/utils/billCalculator';
import { Bill } from '@/types/bill';
import Layout from '@/components/Layout';
import { toast } from 'sonner';

const GenerateBill = () => {
  const [consumerName, setConsumerName] = useState('');
  const [meterNumber, setMeterNumber] = useState('');
  const [connectionType, setConnectionType] = useState<'domestic' | 'commercial'>('domestic');
  const [unitsConsumed, setUnitsConsumed] = useState('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const units = parseInt(unitsConsumed);
    const billAmount = calculateBillAmount(units, connectionType);
    
    const newBill: Bill = {
      id: Date.now().toString(),
      consumerName,
      meterNumber,
      connectionType,
      unitsConsumed: units,
      billAmount,
      status: 'Unpaid',
      username: currentUser?.username || '',
      createdAt: new Date().toISOString(),
    };

    const existingBills = JSON.parse(localStorage.getItem('bills') || '[]');
    const updatedBills = [...existingBills, newBill];
    localStorage.setItem('bills', JSON.stringify(updatedBills));
    
    toast.success('Bill generated successfully!');
    navigate('/bill-result', { state: { bill: newBill } });
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 bg-gradient-glass backdrop-blur-lg border border-white/20">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Generate New Bill</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Consumer Name
              </label>
              <Input
                type="text"
                value={consumerName}
                onChange={(e) => setConsumerName(e.target.value)}
                required
                placeholder="Enter consumer name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meter Number
              </label>
              <Input
                type="text"
                value={meterNumber}
                onChange={(e) => setMeterNumber(e.target.value)}
                required
                placeholder="Enter meter number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Connection Type
              </label>
              <Select value={connectionType} onValueChange={(value: 'domestic' | 'commercial') => setConnectionType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select connection type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="domestic">Domestic</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Units Consumed
              </label>
              <Input
                type="number"
                value={unitsConsumed}
                onChange={(e) => setUnitsConsumed(e.target.value)}
                required
                min="0"
                placeholder="Enter units consumed"
              />
            </div>

            <Button type="submit" className="w-full bg-gradient-electric hover:opacity-90">
              Calculate & Generate Bill
            </Button>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default GenerateBill;
