
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Shield, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  billAmount: number;
  billNumber: string;
}

const PaymentModal = ({ isOpen, onClose, billAmount, billNumber }: PaymentModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md bg-gradient-glass backdrop-blur-lg border border-white/20">
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Payment Successful!</h3>
            <p className="text-gray-600">Your bill has been paid successfully.</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-glass backdrop-blur-lg border border-white/20">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-electric rounded-lg">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
            <span>Pay Bill #{billNumber}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-gradient-bill p-4 rounded-lg text-center">
            <p className="text-white/80 text-sm">Amount to Pay</p>
            <p className="text-3xl font-bold text-white">${billAmount}</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input 
                id="cardNumber" 
                placeholder="1234 5678 9012 3456"
                className="bg-white/50 backdrop-blur-sm"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input 
                  id="expiry" 
                  placeholder="MM/YY"
                  className="bg-white/50 backdrop-blur-sm"
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input 
                  id="cvv" 
                  placeholder="123"
                  className="bg-white/50 backdrop-blur-sm"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="name">Cardholder Name</Label>
              <Input 
                id="name" 
                placeholder="John Doe"
                className="bg-white/50 backdrop-blur-sm"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Shield className="h-4 w-4" />
            <span>Your payment is secured with 256-bit encryption</span>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handlePayment}
              disabled={isProcessing}
              className="flex-1 bg-gradient-energy hover:opacity-90"
            >
              {isProcessing ? 'Processing...' : 'Pay Now'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
