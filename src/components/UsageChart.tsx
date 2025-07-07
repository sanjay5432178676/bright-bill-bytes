
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Card } from '@/components/ui/card';
import { TrendingUp, Zap } from 'lucide-react';

const data = [
  { month: 'Jan', usage: 320, cost: 85 },
  { month: 'Feb', usage: 280, cost: 75 },
  { month: 'Mar', usage: 350, cost: 95 },
  { month: 'Apr', usage: 420, cost: 110 },
  { month: 'May', usage: 480, cost: 125 },
  { month: 'Jun', usage: 520, cost: 140 },
];

const UsageChart = () => {
  return (
    <Card className="p-6 bg-gradient-glass backdrop-blur-lg border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-power rounded-lg">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Usage Analytics</h3>
            <p className="text-gray-600">Monthly consumption trends</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-green-600">
          <Zap className="h-4 w-4" />
          <span className="font-medium">15% increase</span>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4facfe" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4facfe" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="month" 
              stroke="#64748b"
              fontSize={12}
            />
            <YAxis 
              stroke="#64748b"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="usage" 
              stroke="#4facfe" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorUsage)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default UsageChart;
