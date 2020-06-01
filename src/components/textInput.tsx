import React from 'react';
import { I_FORM_FIELD, I_FIELD_CSS } from '../type';

export const TextInput: React.FC<I_FORM_FIELD> = ({
	label = '',
	name = '',
	defaultValue = '',
	placeholder = '',
	typeControl = 'text',
	css: { css_group = '', css_label = '', css_control = '', css_icon = '' } = {}
}) => {
	return (
		<div className={css_group}>
			{css_icon.length && <i className={css_icon} />}
			{label && (
				<label htmlFor="" className={css_label}>
					{label}
				</label>
			)}
			<input
				type={typeControl}
				className={css_control}
				name={name}
				value={defaultValue}
				placeholder={placeholder}
			/>
		</div>
	);
};
