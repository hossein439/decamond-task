import type { AxiosError, AxiosResponse } from 'axios';

const onResponseError = (error: AxiosError) => {
  const errorResponse = error.response;
  return Promise.reject({
    success: false,
    status: errorResponse?.status,
    data: errorResponse?.data,
    statusText: errorResponse?.statusText,
  });
};

const onResponse = (response: AxiosResponse) => {
  return Promise.resolve({
    success: true,
    status: response.status,
    data: response.data,
    statusText: response.statusText,
  });
};

export { onResponse, onResponseError };
