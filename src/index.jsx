import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Form } from './container/form';
import * as serviceWorker from './serviceWorker';

const config = {
	type: 'excursion',
	sessionid: '',
	css: {
		css_group: 'form-group',
		css_label: '',
		css_control: 'form-control',
		css_icon: 'form-icon',
		css_popper: 'form-popper',
		css_select: 'form-select',
		css_option: 'form-option',
		css_submit: 'form-submit',
		css_counter_popupRow: 'popup-row',
		css_counter_popupCol: 'popup-col',
		css_coutner_value: 'counter-value',
		css_counter_dicrement: 'counter-dicrement',
		css_counter_increment: 'counter_increment',
		css_list_select: 'form-select',
		css_list_select_item: 'form-select-item',
		css_box: 'form-box'
	},
	fields: [
		{
			type: 'AC',
			typeControl: 'text',
			name: 'from',
			label: 'Откуда',
			defaultValue: '',
			placeholder: 'text placholder',
			icon: '123'
		},
		{
			type: 'AC',
			typeControl: 'text',
			name: 'to',
			label: 'Куда',
			defaultValue: '',
			placeholder: 'text placholder',
			icon: '123'
		},
		{
			type: 'DP',
			typeControl: 'text',
			name: 'date_from',
			label: 'Дата выезда',
			defaultValue: '',
			placeholder: 'text placholder',
			icon: ''
		},
		{
			type: 'DUR',
			typeControl: 'text',
			name: 'duration',
			label: 'Продолжительность',
			defaultValue: '',
			placeholder: 'text placholder',
			icon: ''
		},
		{
			type: 'COUNT',
			typeControl: 'text',
			name: 'pessanger',
			label: 'Пассажиров',
			defaultValue: { adults: 1, children: 0, childrenAge: [] },
			placeholder: 'text placholder',
			maxAge: 12,
			icon: '',
			popup: [
				{
					key: 'adults', // !!! Обязательное поле
					title: 'Взрослых',
					subtitle: `12 лет и старше`
				},
				{
					key: 'children', // !!! Обязательное поле
					title: 'Детей',
					subtitle: `до 12 лет`
				}
			],
			popupSubContent: (count) => `Возраст ${count} ребенка`
		},
		{
			type: 'SUBMIT',
			typeControl: 'submit',
			defaultValue: 'Искать',
			icon: ''
		}
	],
	url: {
		url_direction:
			'http://trakt.travelsoft.by/local/components/travelsoft/booking.search_form/templates/transfers/ajax/directions.php',
		url_date:
			'http://trakt.travelsoft.by/local/components/travelsoft/booking.search_form/templates/transfers/ajax/dates.php'
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
