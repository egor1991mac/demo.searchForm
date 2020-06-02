import React, { useState, useRef } from 'react';
import { usePopper } from 'react-popper';
import { createPortal } from 'react-dom';
import { Fade } from 'react-awesome-reveal';
import { useClickOutside } from '../hooks/useClickOutside';
import { TextInput } from './textInput';
import { useCalendarb } from '../hooks/useCalendarb';
import { max } from 'moment';
import { generateArray } from '../api';

export default function({
	css,
	field,
	field: { popup, popupSubContent, maxAge },
	value,
	value: { adults = 1, children = 0, childrenAge = [] },
	setData,
	disabled = false
}) {
	//popup settings
	const [ targetElement, setTargetElement ] = useState(null);
	const [ popperElemet, setPopperElement ] = useState(null);
	const { styles, attributes } = usePopper(targetElement, popperElemet, { placement: 'bottom-start' });
	//click outside
	const refContainer = useRef(null);
	useClickOutside(refContainer, () => setOpen(false));
	//open
	const [ open, setOpen ] = useState(false);
	const handleOpen = (e) => {
		!disabled && setOpen(true);
	};

	//controls
	const increment = (key) => (e) => {
		e.preventDefault();
		switch (key) {
			case 'adults':
				adults++;
				setData({ ...value, adults });
				break;
			case 'children':
				children++;
				childrenAge.push(0);
				setData({ ...value, children });
				break;
		}
	};
	const dicrement = (key) => (e) => {
		e.preventDefault();

		switch (key) {
			case 'adults':
				adults > 0 && adults--;
				setData({ ...value, adults });
				break;
			case 'children':
				if (children > 0) {
					children--;
					childrenAge.pop();
				}
				setData({ ...value, children });
				break;
		}
	};
	const changeAge = (index) => ({ target }) => {
		childrenAge[index] = target.value;
		setData({ ...value, childrenAge });
	};
	return (
		<div className={css.css_box} {...attributes.popper}>
			<div ref={setTargetElement} className={css.css_group} data-disabled={disabled}>
				<TextInput {...field} onClick={handleOpen} value={value.adults + value.children} disabled={disabled} />
			</div>
			{open &&
				createPortal(
					<Fade>
						<div ref={refContainer}>
							<div ref={setPopperElement} style={styles.popper} className={css.css_popper}>
								{popup.map(({ key, title, subtitle, defaultValue }, index) => (
									<div key={key} className={css.css_counter_popupRow}>
										<div className={css.css_counter_popupCol}>
											{title}
											<small>{subtitle}</small>
										</div>
										<div className={css.css_counter_popupCol}>
											<button className={css.css_counter_dicrement} onClick={dicrement(key)}>
												-
											</button>
											<span className={css.css_coutner_value}>{value[key]}</span>
											<button className={css.css_counter_increment} onClick={increment(key)}>
												+
											</button>
										</div>
									</div>
								))}
								{childrenAge.length ? (
									childrenAge.map((age, index) => (
										<div key={`${index}_age`} className={css.css_counter_popupRow}>
											<div className={css.css_counter_popupCol}>{popupSubContent(index + 1)}</div>
											<div className={css.css_counter_popupCol}>
												<select
													name=""
													id=""
													onChange={changeAge(index)}
													value={childrenAge[index]}
												>
													{generateArray(maxAge).map((item) => (
														<option key={`${item}_option_ages`} value={item}>
															{item}
														</option>
													))}
												</select>
											</div>
										</div>
									))
								) : null}
							</div>
						</div>
					</Fade>,
					document.getElementById('transferPortal')
				)}
		</div>
	);
}
