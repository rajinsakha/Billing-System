import BikramSambat from "@askbuddie/bikram-sambat";

export const calculateTotalPrice = (
  data: any[],
  discount: number = 0,
  voucher: number = 0
): any => {
  const totalPriceBeforeDiscount = data?.reduce(
    (total, item) => total + item.total_price,
    0
  );
  const discountAmount = totalPriceBeforeDiscount * (discount / 100);
  const totalPriceAfterDiscount = totalPriceBeforeDiscount - discountAmount;
  const voucherAmount = totalPriceAfterDiscount * (voucher / 100);
  const finalDiscount = discountAmount + voucherAmount;
  const finalPrice = totalPriceAfterDiscount - voucherAmount;

  return {
    totalPriceBeforeDiscount: parseFloat(totalPriceBeforeDiscount.toFixed(2)),
    totalPriceAfterDiscount: parseFloat(totalPriceAfterDiscount.toFixed(2)),
    finalPrice: parseFloat(finalPrice.toFixed(2)),
    finalDiscount: parseFloat(finalDiscount.toFixed(2)),
  };
};

export function generateDateTime(dateType?: boolean) {
  const now = new Date();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = days[now.getDay()];
  const month = months[now.getMonth()];
  const date = now.getDate();
  const year = now.getFullYear();

  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'

  const time = `${hours}:${minutes}:${seconds} ${ampm}`;

  if (dateType) {
    return `${month} ${date}, ${year}`;
  } else {
    return `${day}, ${month} ${date}, ${year} ${time}`;
  }
}

export function generateNepaliDate() {
  const nepaliMonths = [
    "Baishakh",
    "Jestha",
    "Ashad",
    "Shrawan",
    "Bhadra",
    "Ashwin",
    "Kartik",
    "Mangsir",
    "Poush",
    "Magh",
    "Falgun",
    "Chaitra",
  ];

  const date = new BikramSambat();

  const year = date.getYear();

  const month = date.getMonth();

  const day = date.getDay();

  const monthName = nepaliMonths[month - 1];

  return `${monthName} ${day}, ${year}`;
}

export function formatNumber(num: number) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
  }).format(num);
}
