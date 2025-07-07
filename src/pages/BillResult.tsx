
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, FileText, ArrowLeft } from 'lucide-react';
import { Bill } from '@/types/bill';
import Layout from '@/components/Layout';

const BillResult = () => {
  const location = useLocation();
  const bill = location.state?.bill as Bill;

  if (!bill) {
    return (
      <Layout>
        <div className="text-center">
          <p className="text-gray-600">No bill data found</p>
          <Link to="/generate-bill">
            <Button className="mt-4">Generate New Bill</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 bg-gradient-glass backdrop-blur-lg border border-white/20">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Bill Generated Successfully!</h1>
            <p className="text-gray-600">Your electricity bill has been calculated and saved.</p>
          </div>

          <div className="bg-white/50 rounded-lg p-6 space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800">Bill Details</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <p className="text-sm text-gray-600">Status</p>
                <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                  {bill.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Generated On</p>
                <p className="font-medium">{new Date(bill.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center">
                <p className="text-lg font-medium">Total Bill Amount:</p>
                <p className="text-2xl font-bold text-green-600">₹{bill.billAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mt-8">
            <Link to="/generate-bill" className="flex-1">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Generate Another Bill
              </Button>
            </Link>
            <Link to="/bill-history" className="flex-1">
              <Button className="w-full bg-gradient-electric hover:opacity-90">
                View All Bills
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default BillResult;
