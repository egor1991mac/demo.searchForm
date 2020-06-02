import React, { useEffect, useState } from 'react';
import { Fields } from './fields';
import { FormContext } from './context';

import { useRequest } from '../../hooks/useRequest';
import { http } from '../../api';

export const Form = (props) => {
	const [ requestBody, setRequestBody ] = useState();

	return (
		<>
			<FormContext.Provider value={props}>
				<Fields />
			</FormContext.Provider>
		</>
	);
};
