import { stringify } from 'qs';
import dateFnsFormat from 'date-fns/format';
export async function http(request) {

    const response = await fetch(request);
    response.requestBody = await response.json();
    return response;
}

export function getKeyValue(key, data) {
    return data[key];
}

export function filtredPoints(keys = [], data) {
    let result = {};
    if (keys.length) {
        const dataKeys = Object.keys(data);
        keys.forEach((item) => {
            if (dataKeys.find((index) => parseInt(index) == item)) {
                result[item] = data[item];
            }
        });
        if (Object.values(result).length) {
            return result;
        } else return data;
    } else return data;

}


export function isValidDate(date) {
    return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
}

export function getDefaultValue(object, typeField, errorValue) {
    try {
        const field = object.find(({ type }) => type == typeField);

        if (Object.values(field).length) {
            return 'defaultValue' in field ? field.defaultValue : errorValue;
        } else {
            return null;
        }
    } catch (e) {
        return errorValue;
    }
}

export function generateArray(maxLength) {
    const array = [];
    for (let i = 0; i <= maxLength; i++) {
        array.push(i);
    }
    return array;
}
const data = {

    sessid: '',
    from: null,
    to: null,
    date_from: new Date(),
    date_to: null,
    pessanger: {
        adults: 1,
        children: 0,
        childrenAge: []
    }

}
export function generateBodyRequestForm(obj, str, url = '', sessid = '') {
    const body = {};
    for (let key in obj) {
        if (obj[key]) {
            if (key.indexOf('date_') != -1) {
                body[key] = dateFnsFormat(obj[key], 'dd.MM.yyyy');
            } else {
                body[key] = obj[key];
            }

        }
    }

    return `${url}/?sessid=${sessid}&${stringify({
        [str]: body
    })}`;
}