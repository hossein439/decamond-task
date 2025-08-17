import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const TIMEOUT = 2 * 60 * 1000;

const onRequestFallback = (request: InternalAxiosRequestConfig): InternalAxiosRequestConfig => request;
const onRequestErrorFallback = (error: AxiosError): Promise<never> => Promise.reject(error);
const onResponseFallback = (response: AxiosResponse): AxiosResponse => response;
const onResponseErrorFallback = (error: AxiosError): Promise<never> => Promise.reject(error);

interface Interceptor {
	onRequest?: (config: InternalAxiosRequestConfig, client: AxiosInstance) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
	onRequestError?: (error: AxiosError, client: AxiosInstance) => any;
	onResponse?: (response: AxiosResponse, client: AxiosInstance) => AxiosResponse | Promise<AxiosResponse>;
	onResponseError?: (error: AxiosError, client: AxiosInstance) => any;
}

interface HttpClientOptions {
	baseURL?: string;
	headers?: Record<string, string>;
	defaults?: AxiosRequestConfig;
	timeout?: number;
	interceptors?: Interceptor[];
}

class HttpClient {
	private client: AxiosInstance;

	constructor({ baseURL, headers, defaults, timeout = TIMEOUT, interceptors = [] }: HttpClientOptions) {
		this.client = axios.create({
			baseURL,
			headers,
			timeout,
			...defaults,
		});

		interceptors.forEach(
			({
				onRequest = onRequestFallback,
				onRequestError = onRequestErrorFallback,
				onResponse = onResponseFallback,
				onResponseError = onResponseErrorFallback,
			}) => {
				this.client.interceptors.request.use(
					(config: InternalAxiosRequestConfig) => onRequest(config, this.client),
					(error: AxiosError) => onRequestError(error, this.client),
				);
				this.client.interceptors.response.use(
					(response: AxiosResponse) => onResponse(response, this.client),
					(error: AxiosError) => onResponseError(error, this.client),
				);
			},
		);
	}

	getInstance(): AxiosInstance {
		return this.client;
	}
}

export default HttpClient;
