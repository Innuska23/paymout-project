type PaymentData = {
  cardNumber: string;
  expiration: string;
  cvv: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const simulatePayment = (_data: PaymentData): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccessful = Math.random() < 0.95;
      if (isSuccessful) {
        resolve(true);
      } else {
        reject(new Error("Payment processing failed"));
      }
    }, 1500);
  });
};
