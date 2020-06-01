import React, { useEffect, useState } from 'react';
import { Fields } from './fields';
import { FormContext } from './context';
import { I_FORM, I_TRANSFER_DIRECTION } from '../../type';
import { useRequest } from '../../hooks/useRequest';
import { http } from '../../api';

export const Form: React.FC<I_FORM> = ({ fields = [], url: { direction = '' } = {} }) => {
	const { request, loading, error } = useRequest();
	const [ requestBody, setRequestBody ] = useState();

	//request(http<I_TRANSFER_DIRECTION>(direction), 'Загрузка данных', 'Ошибка загрузки данных');

	return (
		<div>
			<FormContext.Provider value={{ fields }}>
				<Fields />
			</FormContext.Provider>
		</div>
	);
};
