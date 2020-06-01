export interface I_FIELD_CSS {
	css_group?: string;
	css_label?: string;
	css_control?: string;
	css_icon?: string;
}

export interface I_FORM_FIELD {
	type: 'AC' | 'DP' | 'DUR' | 'SUBMIT' | 'COUNT' | 'TEXT';
	typeControl: 'text' | 'number' | 'tel' | 'submit' | 'mail';
	name: string;
	label?: string;
	defaultValue?: string;
	placeholder?: string;
	css?: I_FIELD_CSS;
}

export interface I_FORM_FIELDS {
	fields: Array<I_FORM_FIELD>;
}

export interface I_FORM {
	type: string;
	fields: Array<I_FORM_FIELD>;
	url: {
		direction: string;
	};
}

export interface I_ERROR_REQUEST {
	status: boolean;
	text: string;
}

export interface I_LOADING_REQUEST {
	status: boolean;
	text: string;
}
export interface I_HTTP_RESPONSE<T> extends Response {
	requestBody?: T;
}

export interface I_DIRECTION {
	direction: {
		id: string;
		link: string;
		name: string;
		tours_id: Array<number>;
	};
	error: boolean;
	tours: {
		[key: number]: {
			id: string;
			link: string;
			name: string;
		};
	};
}
