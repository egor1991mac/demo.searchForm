import React, { useCallback, useEffect, useState } from 'react';

export function useGetData() {
	const [ state, setState ] = useState();
	const [ error, setError ] = useState();

	const result = useCallback(() => {}, []);
}
