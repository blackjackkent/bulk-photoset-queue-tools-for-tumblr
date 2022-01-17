/* eslint-disable no-bitwise */
const getShortCodeForString = function (str) {
	let hash = 0;
	let chr;
	for (let i = 0; i < str.length; i++) {
		chr = str.charCodeAt(i);
		hash = (hash << 5) - hash + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
};
export default getShortCodeForString;
