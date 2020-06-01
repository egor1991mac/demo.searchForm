import React, { useCallback, useEffect, useState } from 'react';
import { I_ERROR_REQUEST, I_LOADING_REQUEST } from '../type';

export function useRequest() {
	const [ loading, setLoading ] = useState<I_LOADING_REQUEST>({
		status: false,
		text: 'loading'
	});
	const [ error, setError ] = useState<I_ERROR_REQUEST>({
		status: false,
		text: 'no error'
	});

	const request = useCallback(async (callback, loadingText: string, errorText: string) => {
		try {
			setLoading({
				status: true,
				text: loadingText
			});
			const result = await callback;
			setLoading({
				status: false,
				text: ''
			});
			if (result.ok) {
				const { error = null } = result.requestBody;
				if (error) {
					throw new Error(errorText);
				} else {
					return result;
				}
			} else throw new Error(errorText);
		} catch (e) {
			setLoading({
				status: false,
				text: ''
			});
			setError({
				status: true,
				text: errorText
			});
		}
	}, []);

	return { loading, request, error };
}
