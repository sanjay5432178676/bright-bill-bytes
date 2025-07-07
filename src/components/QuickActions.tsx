
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, BarChart3, Settings, Phone, CreditCard } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    { 
      icon: Download, 
      label: 'Download Bill', 
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      description: 'Get PDF copy'
    },
    { 
      icon: FileText, 
      label: 'View History', 
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      description: 'Past 12 months'
    },
    { 
      icon: BarChart3, 
      label: 'Usage Report', 
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      description: 'Detailed analytics'
    },
    { 
      icon: CreditCard, 
      label: 'Auto Pay', 
      color: 'bg-gradient-to-r from-pink-500 to-pink-600',
      description: 'Set up recurring'
    },
    { 
      icon: Settings, 
      label: 'Preferences', 
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
      description: 'Account settings'
    },
    { 
      icon: Phone, 
      label: 'Support', 
      color: 'bg-gradient-to-r from-teal-500 to-teal-600',
      description: '24/7 help center'
    }
  ];

  return (
    <Card className="p-6 bg-gradient-glass backdrop-blur-lg border border-white/20">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="ghost"
            className="h-auto p-4 flex flex-col items-center space-y-2 hover:scale-105 transition-all duration-200 group"
          >
            <div className={`p-3 rounded-xl ${action.color} group-hover:shadow-lg transition-shadow`}>
              <action.icon className="h-6 w-6 text-white" />
            </div>
            <div className="text-center">
              <p className="font-medium text-gray-800 text-sm">{action.label}</p>
              <p className="text-xs text-gray-500">{action.description}</p>
            </div>
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default QuickActions;
