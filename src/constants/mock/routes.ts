const API_VERSION = "v1";

const API = {
  GET_EVENTS: `/api/${API_VERSION}/events`,
  GET_EVENT: `/api/${API_VERSION}/events/:id`,
  POST_EVENT: `/api/${API_VERSION}/events`,
  PATCH_EVENT: `/api/${API_VERSION}/events/:id`,
  DELETE_EVENT: `/api/${API_VERSION}/events/:id`,
};

export default API;
