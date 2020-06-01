import React, { useContext, useState } from 'react';

import { FormContext } from './context';
import { I_FORM_FIELDS, I_REQUESTBODY } from '../../type';
import { AutoCompleate } from '../../components/autoCompleate';
import { TextInput } from '../../components/textInput';

export const Fields = () => {
	const { fields = [] } = useContext(FormContext);

	const [ body, setBody ] = useState<I_REQUESTBODY>();
	const setData = (data: string): void => {
		console.log(data);
	};

	return (
		<form>
			{fields.map((field, index) => {
				switch (field.type) {
					case 'AC':
						return (
							<AutoCompleate key={`field_${index}`} setData={setData}>
								<TextInput {...field} />
							</AutoCompleate>
						);
					// case 'DP':
					// 	return <TextInput key={`field_${index}`} {...field} />;
					// case 'DUR':
					// 	return <TextInput key={`field_${index}`} {...field} />;
					// case 'SUBMIT':
					// 	return <TextInput key={`field_${index}`} {...field} />;
					// case 'COUNT':
					// 	return <TextInput key={`field_${index}`} {...field} />;
					// case 'TEXT':
					// 	return <TextInput key={`field_${index}`} {...field} />;
				}
			})}
		</form>
	);
};
