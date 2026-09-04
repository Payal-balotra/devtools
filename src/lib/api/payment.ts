import { axiosClient } from "../axios";

export const createPaymentIntent = async (params: {
  amount: number;
  currency?: string;
  description?: string;
  promotionCode?: string;
}) => {
  const response = await axiosClient.post(
    "/subscription/payment/create-intent",
    params
  );
  return response.data as {
    clientSecret: string;
    paymentIntentId: string;
  };
};

export const refundPayment = async (params: {
  paymentIntentId: string;
  amount?: number;
  reason?: "duplicate" | "fraudulent" | "requested_by_customer";
}) => {
  const response = await axiosClient.post(
    "/subscription/payment/refund",
    params
  );
  return response.data;
};

export const getMyPayments = async () => {
  const response = await axiosClient.get(
    "/subscription/payment/my-payments"
  );
  return response.data as { payments: Array<{
    id: number;
    amount: number;
    amountRefunded: number;
    currency: string;
    status: string;
    description: string | null;
    receiptUrl: string | null;
    failureMessage: string | null;
    createdAt: string;
  }> };
};

export const createInvoice = async (params: {
  amount: number;
  description?: string;
}) => {
  const response = await axiosClient.post(
    "/subscription/payment/invoice",
    params
  );
  return response.data as {
    invoiceId: string;
    hostedInvoiceUrl: string | null;
    invoicePdf: string | null;
  };
};
