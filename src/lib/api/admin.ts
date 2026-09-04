import { axiosClient } from "../axios";

export const adminGetProducts = async () => {
  const res = await axiosClient.get("/admin/products");
  return res.data as {
    products: Array<{
      id: string;
      name: string;
      description: string | null;
      active: boolean;
    }>;
  };
};

export const adminCreateProduct = async (params: {
  name: string;
  description?: string;
}) => {
  const res = await axiosClient.post("/admin/products/create", params);
  return res.data;
};

export const adminGetPrices = async () => {
  const res = await axiosClient.get("/admin/prices");
  return res.data as {
    prices: Array<{
      id: string;
      product: string | { id: string; name: string };
      unit_amount: number | null;
      currency: string;
      active: boolean;
      recurring?: { interval: string } | null;
    }>;
  };
};

export const adminCreatePrice = async (params: {
  productId: string;
  amount: number;
  currency: string;
  interval?: "day" | "week" | "month" | "year";
}) => {
  const res = await axiosClient.post("/admin/prices/create", params);
  return res.data;
};

export const adminGetSubscriptions = async () => {
  const res = await axiosClient.get("/admin/subscriptions");
  return res.data as {
    subscriptions: Array<{
      subscriptionId: number;
      stripeSubscriptionId: string;
      stripeCustomerId: string;
      userId: number;
      userName: string;
      userEmail: string;
      status: string;
      priceId: string;
      currentPeriodStart: string;
      currentPeriodEnd: string;
      createdAt: string;
      updatedAt: string;
    }>;
  };
};

export const adminGetSubscriptionById = async (id: number) => {
  const res = await axiosClient.get(`/admin/subscriptions/${id}`);
  return res.data;
};

export const adminChangeSubscriptionPlan = async (
  id: number,
  priceId: string
) => {
  const res = await axiosClient.post(
    `/admin/subscriptions/${id}/change-plan`,
    { priceId }
  );
  return res.data;
};

export const adminCancelSubscription = async (id: number) => {
  const res = await axiosClient.post(
    `/admin/subscriptions/${id}/cancel`
  );
  return res.data;
};

export const adminGetPayments = async () => {
  const res = await axiosClient.get("/admin/payments");
  return res.data as {
    payments: Array<{
      id: number;
      userId: number;
      stripeCustomerId: string | null;
      stripePaymentIntentId: string;
      amount: number;
      amountRefunded: number;
      currency: string;
      status: string;
      description: string | null;
      receiptUrl: string | null;
      failureMessage: string | null;
      promotionCode: string | null;
      createdAt: string;
    }>;
  };
};

export const adminRefundPayment = async (params: {
  paymentIntentId: string;
  amount?: number;
  reason?: "duplicate" | "fraudulent" | "requested_by_customer";
}) => {
  const res = await axiosClient.post("/admin/payments/refund", params);
  return res.data;
};

export const adminGetUsers = async () => {
  const res = await axiosClient.get("/admin/users");
  return res.data as {
    users: Array<{
      id: number;
      name: string;
      email: string;
      createdAt: string;
    }>;
  };
};
