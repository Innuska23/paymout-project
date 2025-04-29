type PaymentData = {
  cardNumber: string;
  expiration: string;
  cvv: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const simulatePayment = (_data: PaymentData): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
};
