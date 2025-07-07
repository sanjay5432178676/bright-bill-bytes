
export interface Bill {
  id: string;
  consumerName: string;
  meterNumber: string;
  connectionType: 'domestic' | 'commercial';
  unitsConsumed: number;
  billAmount: number;
  status: 'Paid' | 'Unpaid';
  username: string;
  createdAt: string;
}
