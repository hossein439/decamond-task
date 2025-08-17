import type { InternalAxiosRequestConfig, AxiosError } from 'axios';

const onRequestError = (error: AxiosError): Promise<never> => {
  return Promise.reject(error);
};

const onRequest = (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  return Promise.resolve(config);
};

export { onRequest, onRequestError };
