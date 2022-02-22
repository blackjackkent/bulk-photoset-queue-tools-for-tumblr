class BulkPhotosetQueueTools {
	constructor() {
		this.cssMap = {};
	}

	async init() {
		const map = await window.tumblr.getCssMap();
		this.cssMap = map;
	}

	initMenuButton() {
		const postTypeButtonClasses = this.cssMap.postTypeButton;
		const buttonIconClasses = this.cssMap.icon;
		const barSelector = this.cssMap.bar.map((c) => `.${c} > ul`).join(', ');
		const liElement = document.createElement('li');
		const buttonElement = document.createElement('button');
		postTypeButtonClasses.forEach((c) => {
			buttonElement.classList.add(c);
		});
		const iconSpan = document.createElement('span');
		buttonIconClasses.forEach((c) => {
			iconSpan.classList.add(c);
		});
		iconSpan.innerHTML =
			'<svg viewBox="0 0 17 15" width="40" height="35" fill="RGB(var(--red))"><path d="M14.6 1h-2.7l-.6-1h-6l-.6 1H2.4C1.1 1 0 2 0 3.3v9.3C0 13.9 1.1 15 2.4 15h12.2c1.3 0 2.4-1.1 2.4-2.4V3.3C17 2 15.9 1 14.6 1zM8.3 13.1c-2.9 0-5.2-2.3-5.2-5.1s2.3-5.1 5.2-5.1c2.9 0 5.2 2.3 5.2 5.1s-2.3 5.1-5.2 5.1zm5.9-8.3c-.6 0-1.1-.5-1.1-1.1 0-.6.5-1.1 1.1-1.1s1.1.5 1.1 1.1c0 .6-.5 1.1-1.1 1.1zm-10 3.1c0 1.2.5 2.2 1.3 3 0-.2 0-.4-.1-.6 0-2.2 1.8-4 4.1-4 1.1 0 2 .4 2.8 1.1-.3-2-2-3.4-4-3.4-2.2-.1-4.1 1.7-4.1 3.9z"></path></svg>';
		const textSpan = document.createElement('span');
		textSpan.innerText = 'Bulk';
		buttonElement.appendChild(iconSpan);
		buttonElement.appendChild(textSpan);
		liElement.appendChild(buttonElement);
		document.querySelector(barSelector).appendChild(liElement);
		this.bulkButton = liElement;
	}
}
export default BulkPhotosetQueueTools;
