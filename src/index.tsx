import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Form } from './container/form';
import * as serviceWorker from './serviceWorker';
import { I_FORM } from './type';

const config: I_FORM = {
	type: 'excursion',
	fields: [
		{
			type: 'AC',
			typeControl: 'text',
			name: 'direction_from',
			label: 'Выезд из',
			defaultValue: '',
			placeholder: 'text placholder',
			css: {
				css_group: 'form-css_group',
				css_label: 'form-label',
				css_control: 'form-control',
				css_icon: 'form-icon'
			}
		},
		{
			type: 'AC',
			typeControl: 'text',
			name: 'direction_to',
			label: 'Тур',
			defaultValue: '',
			placeholder: 'text placholder',
			css: {
				css_group: 'form-css_group',
				css_label: 'form-label',
				css_control: 'form-control',
				css_icon: 'form-icon'
			}
		},
		{
			type: 'DP',
			typeControl: 'text',
			name: 'date_from',
			label: 'Дата выезда',
			defaultValue: '',
			placeholder: 'text placholder',
			css: {
				css_group: 'form-css_group',
				css_label: 'form-label',
				css_control: 'form-control',
				css_icon: 'form-icon'
			}
		},
		{
			type: 'DUR',
			typeControl: 'text',
			name: 'duration',
			label: 'Продолжительность',
			defaultValue: '',
			placeholder: 'text placholder',
			css: {
				css_group: 'form-css_group',
				css_label: 'form-label',
				css_control: 'form-control',
				css_icon: 'form-icon'
			}
		},
		{
			type: 'COUNT',
			typeControl: 'text',
			name: 'pessanger',
			label: 'Пассажиров',
			defaultValue: '',
			placeholder: 'text placholder',
			css: {
				css_group: 'form-css_group',
				css_label: 'form-label',
				css_control: 'form-control',
				css_icon: 'form-icon'
			}
		},
		{
			type: 'SUBMIT',
			typeControl: 'submit',
			name: 'pessanger',
			defaultValue: 'submit',
			css: {
				css_group: 'form-css_group',
				css_label: 'form-label',
				css_control: 'form-control',
				css_icon: 'form-icon'
			}
			// label: 'Пассажиров',

			// placeholder: 'text placholder'
		}
	],
	url: {
		direction:
			'http://trakt.travelsoft.by/local/components/travelsoft/booking.search_form/templates/transfers/ajax/directions.php',
		dates:
			'http://trakt.travelsoft.by/local/components/travelsoft/booking.search_form/templates/transfer/ajax/directions.php'
	}
};
function initRender() {
	ReactDOM.render(
		<React.StrictMode>
			<Form {...config} />
		</React.StrictMode>,
		document.getElementById('root')
	);
}
initRender();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
