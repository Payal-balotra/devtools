import { axiosClient } from "../axios";
import { SUBSCRIPTION_ENDPOINTS } from "@/src/endpoints";

export const getSubscription = async () => {
  const response = await axiosClient.get(
    SUBSCRIPTION_ENDPOINTS.GET_SUBSCRIPTION
  );

  return response.data;
};

export const createCheckoutSession = async () => {
  const response = await axiosClient.post(
    SUBSCRIPTION_ENDPOINTS.CREATE_CHECKOUT_SESSION
  );

  return response.data;
};

export const cancelSubscription = async () => {
  const response = await axiosClient.post(
    SUBSCRIPTION_ENDPOINTS.CANCEL_SUBSCRIPTION
  );

  return response.data;
};

export const createPortalSession = async () => {
  const response = await axiosClient.post(
    SUBSCRIPTION_ENDPOINTS.CREATE_PORTAL_SESSION
  );

  return response.data;
};