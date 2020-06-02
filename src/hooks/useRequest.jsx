import React, { useCallback, useEffect, useState } from 'react';

const fields = {
	AC: false,
	DP: false,
	TEXT: false,
	DUR: false,
	SUBMIT: false,
	COUNT: false
};

export function useRequest() {
	const [ loading, setLoading ] = useState({
		status: false,
		text: 'loading',
		fields
	});

	const [ error, setError ] = useState({
		status: false,
		text: 'no error',
		fields
	});

	const request = useCallback(async (callback = null, loadingText = '', errorText = '', fieldKey = null) => {
		try {
			setLoading({
				status: true,
				text: loadingText,
				fields: fieldKey ? { ...loading.fields, [fieldKey]: !!loading.fields[fieldKey] } : fields
			});

			const result = await callback;
			setLoading({
				status: false,
				text: '',
				fields: fieldKey ? { ...loading.fields, [fieldKey]: !loading.fields[fieldKey] } : fields
			});
			if (result.ok) {
				const { error = null } = result.requestBody;
				if (error) {
					throw new Error(errorText);
				} else {
					return result.requestBody;
				}
			} else {
				console.log(3);
				throw new Error(errorText);
			}
		} catch (e) {
			console.log(2);
			setLoading({
				status: false,
				text: '',
				fields: fieldKey ? { ...loading.fields, [fieldKey]: !loading.field[fieldKey] } : fields
			});
			setError({
				status: true,
				text: errorText,
				fields: fieldKey ? { ...error.fields, [fieldKey]: !error.field[fieldKey] } : fields
			});
		}
	}, []);

	return { loading, request, error };
}
