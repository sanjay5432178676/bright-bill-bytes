
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bill } from '@/types/bill';
import Layout from '@/components/Layout';
import { Search, FileText, CheckCircle, XCircle } from 'lucide-react';

const SearchMeter = () => {
  const [meterNumber, setMeterNumber] = useState('');
  const [searchResult, setSearchResult] = useState<Bill | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const bills = JSON.parse(localStorage.getItem('bills') || '[]') as Bill[];
    const foundBill = bills.find(bill => bill.meterNumber === meterNumber);
    
    setSearchResult(foundBill || null);
    setSearched(true);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="p-8 bg-gradient-glass backdrop-blur-lg border border-white/20">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Search Meter Status</h1>
          
          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meter Number
              </label>
              <Input
                type="text"
                value={meterNumber}
                onChange={(e) => setMeterNumber(e.target.value)}
                required
                placeholder="Enter meter number to search"
              />
            </div>

            <Button type="submit" className="w-full bg-gradient-electric hover:opacity-90">
              <Search className="h-4 w-4 mr-2" />
              Search Meter
            </Button>
          </form>
        </Card>

        {searched && (
          <Card className="p-8 bg-gradient-glass backdrop-blur-lg border border-white/20">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                {searchResult ? (
                  <FileText className="h-16 w-16 text-blue-600" />
                ) : (
                  <XCircle className="h-16 w-16 text-red-500" />
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {searchResult ? 'Meter Found' : 'Meter Not Found'}
              </h2>
              <p className="text-gray-600">
                {searchResult 
                  ? `Meter number ${meterNumber} is registered in the system`
                  : `No records found for meter number ${meterNumber}`
                }
              </p>
            </div>

            {searchResult && (
              <div className="bg-white/50 rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Consumer Name</p>
                    <p className="font-medium">{searchResult.consumerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Meter Number</p>
                    <p className="font-medium">{searchResult.meterNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Connection Type</p>
                    <p className="font-medium capitalize">{searchResult.connectionType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Units Consumed</p>
                    <p className="font-medium">{searchResult.unitsConsumed} kWh</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Bill Amount</p>
                    <p className="font-bold text-lg">₹{searchResult.billAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Status</p>
                    <div className="flex items-center space-x-2">
                      {searchResult.status === 'Paid' ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        searchResult.status === 'Paid' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {searchResult.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <p className="text-sm text-gray-600">Last Updated</p>
                  <p className="font-medium">{new Date(searchResult.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            )}
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default SearchMeter;
