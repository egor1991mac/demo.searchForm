import { fi } from "date-fns/locale";

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