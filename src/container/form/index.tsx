import React, { useEffect } from 'react';
import { Fields } from './fields';
import { FormContext } from './context';
import { I_FORM, I_DIRECTION } from '../../type';
import { useRequest } from '../../hooks/useRequest';
import { http } from '../../api';

export const Form: React.FC<I_FORM> = ({ fields = [], url: { direction = '' } = {} }) => {
	
	
	const { request, loading, error } = useRequest();

	useEffect(() => {
		request(http<I_DIRECTION>(direction), 'Загрузка данных', 'Ошибка загрузки данных');
	}, []);

	return (
		<div>
			<FormContext.Provider value={{ fields }}>
				<Fields />
			</FormContext.Provider>
		</div>
	);
};
