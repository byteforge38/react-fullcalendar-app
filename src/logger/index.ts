// eslint-disable-next-line @typescript-eslint/no-explicit-any
const info = (message: string, params?: any) => {
  // TODO: Implement info logging with Sentry or other logging service
  console.log(message, params);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const error = (message: string, params?: any) => {
  // TODO: Implement error logging with Sentry or other logging service
  console.error(message, params);
};

const Logger = { info, error };

export default Logger;
