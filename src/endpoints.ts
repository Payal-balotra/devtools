export const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",
  ME: "/auth/me",
  REFRESH_TOKEN: "/auth/renew-token",
  PROJECTS: "/projects/getAll",
  CREATE_PROJECT: "/projects/create",
};

export const PROJECT_ENDPOINTS = {
  GET_PROJECT_BY_ID: (id: string) => `/projects/getById/${id}`,

  CREATE_PROJECT: "/projects/create",
  GET_ALL_PROJECTS: "/projects/getAll",
  DELETE_PROJECT: (id: string) => `/projects/delete/${id}`,
};

export const SUBSCRIPTION_ENDPOINTS = {
  GET_SUBSCRIPTION: "/subscription/getSubscription",
  CREATE_CHECKOUT_SESSION: "/subscription/createCheckoutSession",
  CANCEL_SUBSCRIPTION: "/subscription/cancelSubscription",
    CREATE_PORTAL_SESSION:"/subscription/createPortalSession",
};