
export const calculateBillAmount = (units: number, type: 'domestic' | 'commercial'): number => {
  if (type === 'domestic') {
    if (units <= 100) return 0;
    if (units <= 200) return (units - 100) * 2.35;
    if (units <= 400) return 100 * 2.35 + (units - 200) * 4.70;
    if (units <= 500) return 100 * 2.35 + 200 * 4.70 + (units - 400) * 6.30;
    if (units <= 600) return 100 * 2.35 + 200 * 4.70 + 100 * 6.30 + (units - 500) * 8.40;
    if (units <= 800) return 100 * 2.35 + 200 * 4.70 + 100 * 6.30 + 100 * 8.40 + (units - 600) * 9.45;
    if (units <= 1000) return 100 * 2.35 + 200 * 4.70 + 100 * 6.30 + 100 * 8.40 + 200 * 9.45 + (units - 800) * 10.50;
    return 100 * 2.35 + 200 * 4.70 + 100 * 6.30 + 100 * 8.40 + 200 * 9.45 + 200 * 10.50 + (units - 1000) * 11.55;
  } else {
    if (units <= 100) return units * 6.00;
    if (units <= 500) return 100 * 6.00 + (units - 100) * 7.00;
    return 100 * 6.00 + 400 * 7.00 + (units - 500) * 8.00;
  }
};
