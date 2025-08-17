import { onResponse, onResponseError } from '@/client/http/instances/real/response.interceptor';
import { onRequest, onRequestError } from '@/client/http/instances/real/request.interceptor';
import HttpClient from '@/client/http/helpers/generator.helper';

const HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache',
};
const TIMEOUT = 2 * 60 * 1000;

export default new HttpClient({
  timeout: TIMEOUT,
  baseURL: 'https://randomuser.me/api/',
  interceptors: [{ onResponse, onResponseError, onRequest, onRequestError }],
  headers: HEADERS,
}).getInstance();
