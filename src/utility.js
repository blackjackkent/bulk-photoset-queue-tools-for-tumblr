function addStyle(rules) {
	const style =
		document.getElementById('AddStyleBulkPhotosetQueue') ||
		(function () {
			const newStyle = document.createElement('style');
			newStyle.id = 'AddStyleBulkPhotosetQueue';
			document.head.appendChild(newStyle);
			return newStyle;
		})();
	const { sheet } = style;
	rules.forEach((rule) => {
		sheet.insertRule(rule, (sheet.rules || sheet.cssRules || []).length);
	});
}

// eslint-disable-next-line import/prefer-default-export
export { addStyle };
