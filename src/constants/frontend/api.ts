export const API_URL = ""; // TODO: Add API URL (https://rec-calendar-api.herokuapp.com)
export const API_VERSION = "v1";

export const API = {
  GET_EVENTS: () => `${API_URL}/api/${API_VERSION}/events`,
  GET_EVENT: (id: string) => `${API_URL}/api/${API_VERSION}/events/${id}`,
  POST_EVENT: () => `${API_URL}/api/${API_VERSION}/events`,
  PATCH_EVENT: (id: string) => `${API_URL}/api/${API_VERSION}/events/${id}`,
  DELETE_EVENT: (id: string) => `${API_URL}/api/${API_VERSION}/events/${id}`,
};

export default API;
