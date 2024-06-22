export const calculateTotalPrice = (data: any[], discount: number = 0): number => {
    const totalPrice = data?.reduce((total, item) => total + item.total_price, 0);
    const discountAmount = totalPrice * (discount / 100);
    return totalPrice - discountAmount;
  };