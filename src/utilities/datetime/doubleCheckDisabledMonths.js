const doubleCheckDisabledMonths = (currentYr, lTs, fTs, jump, jumpTo, name) => {
	const mw = document.getElementById('browse_months_widget');
	const cy = mw.getElementsByClassName('current_year')[0].innerText;
	const yr1 = parseInt(cy, 10);
	let timestampF;
	let timestampL;
	const mo = mw
		.getElementsByClassName('months')[0]
		.getElementsByTagName('li');
	let a;
	let span;
	for (let i = 0; i < 12; i++) {
		timestampF = new Date(yr1, i + 1, 1).getTime();
		timestampL = new Date(yr1, i, 1).getTime();
		if (timestampL >= lTs || timestampF <= fTs) {
			if (!mo[i].classList.contains('empty')) {
				mo[i].classList.add('empty');
			}
			a = mo[i].getElementsByTagName('a');
			if (a.length > 0) {
				span = document.createElement('span');
				span.appendChild(document.createTextNode(a[0].innerText));
				mo[i].replaceChild(span, a[0]);
			}
		} else {
			if (mo[i].classList.contains('empty')) {
				mo[i].removeAttribute('class');
			}
			a = mo[i].getElementsByTagName('span');
			const month = i;
			const ts = new Date(yr1, month + 1, 0).getTime() / 1000;
			const href2g2 = `http://www.tumblr.com/mega-editor/published/${name}?${jump}&${jumpTo}&${ts}#month${
				i + 1
			}year${yr1}`;
			if (a.length > 0) {
				span = document.createElement('a');
				span.href = href2g2;
				span.target = '_top';
				span.setAttribute('data-month-index', i.toString());
				span.appendChild(document.createTextNode(a[0].innerText));
				mo[i].replaceChild(span, a[0]);
			} else {
				mo[i].getElementsByTagName('a')[0].href = href2g2;
			}
		}
	}
};

export default doubleCheckDisabledMonths;
