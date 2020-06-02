import React, { useCallback, useMemo } from 'react';
import dateFnsFormat from 'date-fns/format';

import addDays from 'date-fns/addDays';
import dateFnsParse from 'date-fns/parse';
import isDate from 'date-fns/isDate';

export function useCalendarb(initData = [ new Date() ], min) {
	const modifires = {
		sunday: { daysOfWeek: [ 0, 6 ] }
		//hilight: toDateArray(initData)
	};
	const formatDate = (date) => {
		return dateFnsFormat(date, 'dd.MM.yyyy');
	};

	const getAllDates = useCallback(
		() => {
			const dates = initData;
			if (isDate(dates[0])) {
				return dates.map((date) => dateFnsFormat(date, 'dd.MM.yyyy'));
			} else if (typeof dates[0] == 'string') {
				return dates;
			} else {
				return dates.length && dates.map(({ date }) => date);
			}
		},
		[ JSON.stringify(initData) ]
	);
	initData = getAllDates();

	const memoCalendarb = useMemo(() => {
		let calendarb = [];

		if (initData.length > 0) {
			for (let i = 0; i < 365; i++) {
				let data = dateFnsFormat(addDays(new Date(), i), 'dd.MM.yyyy');
				data.toString();
				calendarb.push(data);
			}
		}
		return calendarb;
	}, []);

	const getMaxDate = useCallback(() => (initData.length > 1 ? initData[initData.length - 1] : null), [ initData ]);
	const getMinDate = useCallback(
		() => {
			return initData.length ? dateFnsParse(initData[0], 'dd.MM.yyyy', new Date()) : min;
		},
		[ JSON.stringify(initData) ]
	);
	const getDisableDate = useCallback(
		() => {
			let disableDate = [];
			const dates = initData;

			if (dates.length) {
				disableDate = memoCalendarb.filter((item) => {
					if (item != dates.find((day) => day == item)) {
						return item;
					}
				});

				disableDate = disableDate.map((day) => dateFnsParse(day, 'dd.MM.yyyy', new Date()));
				disableDate.push({ before: getMinDate() || new Date() });
				disableDate.push({
					after: getMaxDate() ? dateFnsParse(getMaxDate(), 'yyyy-MM-dd', new Date()) : addDays(new Date(), 90)
				});
			} else {
				disableDate.push({ before: getMinDate || new Date() });
			}
			return disableDate;
		},
		[ initData ]
	);

	return { getDisableDate, getMaxDate, getMinDate, getAllDates, formatDate, modifires };
}
