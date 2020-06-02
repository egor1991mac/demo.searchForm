import React, { useContext, useState, useEffect } from 'react';

import { FormContext } from './context';

import { AutoCompleate } from '../../components/autoCompleate';
import { TextInput } from '../../components/textInput';
import { useRequest } from '../../hooks/useRequest';
import { http, filtredPoints, getDefaultValue, generateBodyRequestForm } from '../../api';
import dateFnsFormat from 'date-fns/format';
import { DatePicker } from '../../components/datepicker';
import { Counter } from '../../components/Counter';

export const Fields = () => {
	//props
	const {
		fields = [],
		url: { url_direction = '', url_date = '', url_redirect = '' },
		request_modifire = '',
		sessid = '',
		css
	} = useContext(FormContext);
	//requset hook
	const { request, loading, error } = useRequest();

	//body
	const [ body, setBody ] = useState({
		sessid: '',
		from: null,
		to: null,
		date_from: new Date(),
		date_to: null,
		pessanger: getDefaultValue(fields, 'COUNT', 1)
	});

	//direction and points
	const [ points, setPoints ] = useState({
		ID: '',
		NAME: ''
	});
	const [ directions, setDirections ] = useState({});

	const getDataPoints = async () => {
		const result = await request(http(url_direction), 'Загрузка направление', 'Ошибка загрузки');
		setPoints(result.points);
		setDirections(result.direction);
	};

	useEffect(() => {
		getDataPoints();
	}, []);

	//dates
	const [ dates, setDates ] = useState([ dateFnsFormat(new Date(), 'dd.MM.yyyy') ]);

	const getDates = async (from, to) => {
		const result = await request(
			http(`${url_date}/?sessid=${sessid}&city_from=${from}&city_to=${to}`),
			'Загрузка дат',
			'Ошибка загрузки дат'
		);
		setDates(result.dates);
	};
	//set Body
	const setData = (key) => (data) => {
		setBody({ ...body, [key]: data });
		if (key == 'to' && Object.values(body.from).length && Object.values(data).length) {
			getDates(body.from.KEY, data.KEY);
		}
	};

	//submit
	const handleSubmit = (e) => {
		e.preventDefault();
		const url = generateBodyRequestForm(body, request_modifire, url_redirect, sessid);
		window.location.href = url;
	};

	return (
		<form autoComplete="nope" id="#transferForm">
			{fields.map((field, index) => {
				switch (field.type) {
					case 'AC':
						if (field.name == 'from') {
							return (
								<AutoCompleate
									disabled={!points ? true : false}
									key={`field_${index}`}
									field={field}
									value={body[field.name]}
									setData={setData(field.name)}
									css={css}
									options={points}
								/>
							);
						}
						if (field.name == 'to') {
							return (
								<AutoCompleate
									disabled={!body.from ? true : false}
									key={`field_${index}`}
									field={field}
									value={body[field.name]}
									setData={setData(field.name)}
									css={css}
									options={body.from ? filtredPoints(directions[body['from'].ID], points) : null}
								/>
							);
						}

					case 'DP':
						return (
							<DatePicker
								disabled={!body.from || !body.to ? true : false}
								key={`field_${index}`}
								field={field}
								value={body[field.name]}
								setData={setData(field.name)}
								css={css}
								dates={dates}
							/>
						);

					case 'COUNT':
						return (
							<Counter
								disabled={!body.from || !body.to ? true : false}
								key={`field_${index}`}
								field={field}
								value={body[field.name]}
								setData={setData(field.name)}
								css={css}
							/>
						);
					case 'SUBMIT':
						const { css_icon = '' } = css;
						const { icon = '' } = field;
						return (
							<div className={css.css_box}>
								<button
									disabled={!body.from && !body.to ? true : false}
									type={field.typeControl}
									className={css.css_submit}
									onClick={handleSubmit}
								>
									{icon.length ? <i className={[ css_icon, icon ].join(' ')} /> : null}
									{field.defaultValue}
								</button>
							</div>
						);
				}
			})}
		</form>
	);
};
