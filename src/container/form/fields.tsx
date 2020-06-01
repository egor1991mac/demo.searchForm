import React, { useContext } from 'react';
import { TextInput } from '../../components/textInput';
import { FormContext } from './context';
import { I_FORM_FIELDS } from '../../type';

export const Fields = () => {
	const { fields = [] } = useContext(FormContext);

	return (
		<div>
			{fields.map((field, index) => {
				switch (field.type) {
					case 'AC':
						return <TextInput key={`field_${index}`} {...field} />;
					case 'DP':
						return <TextInput key={`field_${index}`} {...field} />;
					case 'DUR':
						return <TextInput key={`field_${index}`} {...field} />;
					case 'SUBMIT':
						return <TextInput key={`field_${index}`} {...field} />;
					case 'COUNT':
						return <TextInput key={`field_${index}`} {...field} />;
					case 'TEXT':
						return <TextInput key={`field_${index}`} {...field} />;
				}
			})}
		</div>
	);
};
