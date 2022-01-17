const butt = (nam) => {
	// buttons for widgets
	const sel = document.createElement('button');
	sel.id = `${nam.toLowerCase().replace(/\s+/, '_')}_button`;
	sel.classList.add('chrome');
	sel.classList.add('big_dark');
	const div = document.createElement('div');
	div.classList.add('chrome_button'); // numbers for same name buttons
	div.appendChild(document.createTextNode(nam.replace(/\d+$/, '')));
	sel.appendChild(div);
	return sel;
};
export default butt;
