import { I_HTTP_RESPONSE } from './type';

export async function http<T>(request: RequestInfo): Promise<I_HTTP_RESPONSE<T>> {
	const response: I_HTTP_RESPONSE<T> = await fetch(request);
	response.requestBody = await response.json();
	return response;
}
