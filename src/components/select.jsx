import React from 'react';

export const Select = ({ options = {}, css, onSelect }) => {
	if (Object.values(options).length) {
		return (
			<ul className={css.css_list_select}>
				{Object.keys(options).map((KEY) => (
					<li
						className={css.css_list_select_item}
						key={`${KEY}_option`}
						onClick={() => {
							const { ID, NAME } = options[KEY];
							onSelect({ ID, NAME, KEY });
						}}
					>
						{options[KEY].NAME}
					</li>
				))}
			</ul>
		);
	} else {
		return 'Error';
	}
};
