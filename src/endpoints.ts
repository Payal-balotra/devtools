export const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",
  ME: "/auth/me",
  REFRESH_TOKEN: "/auth/renew-token",
  PROJECTS: "/projects/getAll",
  CREATE_PROJECT: "/projects/create",
  GET_PROJECT_BY_ID: "/projects/getById/:id",
};

export const PROJECT_ENDPOINTS = {
  CREATE_PROJECT: "/projects/create",
  GET_PROJECT_BY_ID: "/projects/getById",
  GET_ALL_PROJECTS: "/projects/getAll",
};
