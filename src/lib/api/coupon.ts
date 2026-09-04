import { axiosClient } from "../axios";

export const createCoupon = async (params: {
  percentOff?: number;
  amountOff?: number;
  currency?: string;
  duration?: "once" | "forever" | "repeating";
  code: string;
}) => {
  const response = await axiosClient.post("/admin/coupons", params);
  return response.data as {
    coupon: { id: string; percent_off?: number; amount_off?: number };
    promotionCode: { id: string; code: string };
  };
};
