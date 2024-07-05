export const calculateTotalPrice = (data: any[], discount: number = 0, voucher:number=0): any => {
    const totalPriceBeforeDiscount = data?.reduce((total, item) => total + item.total_price, 0);
    const discountAmount = totalPriceBeforeDiscount * (discount / 100);
    const totalPriceAfterDiscount = totalPriceBeforeDiscount - discountAmount;
    const voucherAmount = totalPriceAfterDiscount * (voucher/100);
    const finalDiscount = discountAmount + voucherAmount;
    const finalPrice = totalPriceAfterDiscount - voucherAmount

    return {totalPriceBeforeDiscount, totalPriceAfterDiscount, finalPrice, finalDiscount};
  };