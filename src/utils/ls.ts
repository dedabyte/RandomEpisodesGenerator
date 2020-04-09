export enum LsKeys {
	SHUFFLED = 'shuffled',
	SHUFFLED_INDEX = 'shuffled_index',
}

const prefix = 'reg_';

const makeKey = (key: LsKeys) => `${prefix}${key}`;

const get = (key: LsKeys) => {
	const rawValue = localStorage.getItem(makeKey(key));
	return rawValue ? JSON.parse(rawValue) : null;
};

const set = (key: LsKeys, value: any) => {
	return localStorage.setItem(makeKey(key), JSON.stringify(value));
};

const rem = (key: LsKeys) => {
	return localStorage.removeItem(makeKey(key));
}

export const ls = {
	get,
	set,
	rem,
};
