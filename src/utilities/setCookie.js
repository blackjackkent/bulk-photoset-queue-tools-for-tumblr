const setCookie = (cname, cvalue, exdays) => {
	const currentDateTime = new Date();
	currentDateTime.setTime(
		currentDateTime.getTime() + exdays * 24 * 60 * 60 * 1000
	);
	const expires = `expires=${currentDateTime.toUTCString()}`;
	document.cookie = `${cname}=${cvalue};${expires};path=/`;
};
export default setCookie;
