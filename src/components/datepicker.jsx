import React, { useState, useRef } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';
import { Fade } from 'react-awesome-reveal';
import { useClickOutside } from '../hooks/useClickOutside';
import { TextInput } from './textInput';
import { useCalendarb } from '../hooks/useCalendarb';
import { format } from 'date-fns';

export const DatePicker = ({
	field = null,
	css = null,
	setData = null,
	value = null,
	dates = [ new Date() ],
	disabled = false
}) => {
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

	const { getMinDate, getMaxDate, getDisableDate, formatDate } = useCalendarb(dates, new Date());

	return (
		<div className={css.css_box} ref={refContainer} {...attributes.popper}>
			<div ref={setTargetElement} className={css.css_group} data-disabled={disabled}>
				<TextInput {...field} css={css} onClick={handleOpen} value={formatDate(value)} disabled={disabled} />
			</div>
			{open && (
				<Fade>
					<div>
						<div ref={setPopperElement} style={styles.popper} className={css.css_popper}>
							<DayPicker
								month={getMinDate()}
								disabledDays={getDisableDate()}
								selectedDays={value}
								onDayClick={(day) => setData(day)}
							/>
						</div>
					</div>
				</Fade>
			)}
		</div>
	);
};
