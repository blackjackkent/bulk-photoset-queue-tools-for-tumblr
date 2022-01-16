const newChromeButton = (id, text, withWidget) => {
	const container = document.createElement('span');
	container.classList.add('header_button');
	const button = document.createElement('button');
	button.id = `${id}_button`;
	button.classList.add('chrome');
	button.classList.add('big_dark');
	const cb = document.createElement('div');
	cb.classList.add('chrome_button');
	if (typeof text === 'string') {
		cb.innerHTML = text;
	} else {
		// assumed element/fragment
		cb.appendChild(text);
		const sv = cb.getElementsByTagName('svg');
		for (let i = 0; i < sv.length; i++) {
			sv[i].setAttribute('fill', '#fff');
			sv[i].setAttribute('width', '15');
			sv[i].setAttribute('height', '15');
		}
	}
	if (withWidget) {
		const arrow = document.createElement('div');
		arrow.classList.add('arrow');
		cb.appendChild(arrow);
		const input = document.createElement('input');
		input.type = 'checkbox';
		input.id = id;
		button.addEventListener('click', () => {
			input.checked = !input.checked;
			input.dispatchEvent(new Event('change'));
		});
		button.appendChild(cb);
		container.appendChild(button);
		container.appendChild(input);
		const widget = document.createElement('div');
		widget.classList.add('widget');
		widget.id = `${id}_widget`;
		container.appendChild(widget);
	} else {
		button.appendChild(cb);
	}
	container.appendChild(button);
	return container;
};
export default newChromeButton;
