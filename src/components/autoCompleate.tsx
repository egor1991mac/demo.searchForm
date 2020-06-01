import React, { ReactElement } from 'react';
import { I_FORM_FIELD } from '../type';

type T_CHILDREN = {
	children: React.ReactNode;
	setData(value: string): void;
};
interface I_TEXT_FIELD extends I_FORM_FIELD {
	children: React.ReactNode;
	callback: any;
}

export const AutoCompleate: React.FC<T_CHILDREN> = ({ children, setData }) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setData(e.target.value);
	};
	return <div>{React.cloneElement(children as ReactElement<I_TEXT_FIELD>, { callback: handleChange })}</div>;
};
