import React, { useState } from 'react';
import { I_FORM_FIELD, I_FIELD_CSS } from '../type';

interface I_TEXT_FIELD extends I_FORM_FIELD {
	setData?: any;
}

export const TextInput: React.FC<I_TEXT_FIELD> = ({
	label = '',
	name = '',
	defaultValue = '',
	placeholder = '',
	typeControl = 'text',
	css: { css_group = '', css_label = '', css_control = '', css_icon = '' } = {},
	setData = function() {}
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
				defaultValue={defaultValue}
				placeholder={placeholder}
				onChange={setData}
			/>
		</div>
	);
};
