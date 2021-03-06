import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { TextInput } from './textInput';
import { Select } from './select';
import { useRequest } from '../hooks/useRequest';
import { usePopper } from 'react-popper';
import { Fade } from 'react-awesome-reveal';
import { useClickOutside } from '../hooks/useClickOutside';

export const AutoCompleate = ({ field, css, setData, getData, options, value, disabled = false }) => {
	//popup settings
	const [ targetElement, setTargetElement ] = useState(null);
	const [ popperElemet, setPopperElement ] = useState(null);
	const { styles, attributes } = usePopper(targetElement, popperElemet, { placement: 'bottom-start' });

	//change
	const handleChange = (e) => {
		const value = e.target.value;
	};

	///select
	const handleSelect = (value) => {
		setData(value);
		setOpen(false);
	};

	//open
	const [ open, setOpen ] = useState(false);
	const handleOpen = (e) => {
		!disabled && setOpen(true);
	};

	//click outside
	const refContainer = useRef(null);
	useClickOutside(refContainer, () => {
		setOpen(false);
	});

	return (
		<div className={css.css_group} {...attributes.popper} data-disabled={disabled}>
			<TextInput
				ref={setTargetElement}
				disabled={disabled}
				{...field}
				css={css}
				onChange={handleChange}
				onClick={handleOpen}
				value={value ? value.NAME : ''}
			/>

			{options &&
				open &&
				createPortal(
					<Fade>
						<div ref={refContainer}>
							<div ref={setPopperElement} style={styles.popper} className={css.css_popper}>
								<Select options={options} css={css} onSelect={handleSelect} />
							</div>
						</div>
					</Fade>,
					document.getElementById('transferPortal')
				)}
		</div>
	);
};
