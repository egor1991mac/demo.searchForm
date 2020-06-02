import React, { useState } from 'react';
import { I_FORM_FIELD, I_FIELD_CSS, I_POINT } from '../type';



export const TextInput= ({
	label = '',
	name = '',
	defaultValue = '',
	placeholder = '',
	typeControl = 'text',
	disabled=false,
	css: { css_label = '', css_control = '', css_icon = '' } = {},
	onChange = function() {},
	onClick = function() {},
	value=''
}) => {
	
	return (
		<>
			
			{label && (
				<label htmlFor="" className={css_label}>
					{css_icon.length ? <i className={css_icon}  /> : null}
					{label}
				</label>
			)}
			<input
				disabled={disabled}
				autoComplete="off"
				type={typeControl}
				className={css_control}
				name={name}
				value={value ? value : ''}
				defaultValue={defaultValue}
				placeholder={placeholder}
				onChange={onChange}
				onClick={onClick}
			/>
		</>
	);
};
