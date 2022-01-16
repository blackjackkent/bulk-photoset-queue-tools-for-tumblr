import doubleCheckDisabledMonths from './doubleCheckDisabledMonths';

const makeBrowseMonthsWidget = (currentYr, lTs, fTs, jump, jumpTo, name) => {
	// last timestamp, first timestamp
	const browseMonthsWidget2 = document.createElement('div');
	browseMonthsWidget2.classList.add('popover');
	browseMonthsWidget2.classList.add('popover_gradient');
	browseMonthsWidget2.id = 'browse_months_widget';
	const browseMonthsPopInner = document.createElement('div');
	browseMonthsPopInner.classList.add('popover_inner');
	const browseMonthsYear = document.createElement('div');
	browseMonthsYear.classList.add('year');
	const browseMonthsYearNavigation = document.createElement('div');
	browseMonthsYearNavigation.classList.add('year_navigation');
	const prevYearVis = (e) => {
		e.preventDefault();
		e.stopPropagation();
		e.cancelBubble = true;
		const cy = document.getElementsByClassName('current_year')[0];
		let yr = parseInt(cy.innerText, 10);
		if (this.classList.contains('previous_year')) {
			--yr;
			cy.innerText = yr;
		} else {
			++yr;
			cy.innerText = yr;
		}
		doubleCheckDisabledMonths(yr, lTs, fTs, jump, jumpTo, name);
	};
	const browseMonthPrevYearA = document.createElement('a');
	browseMonthPrevYearA.href = '#';
	browseMonthPrevYearA.addEventListener('click', prevYearVis);
	const prevYearSpan = document.createElement('span');
	prevYearSpan.appendChild(document.createTextNode('prev'));
	browseMonthPrevYearA.classList.add('previous_year');
	browseMonthPrevYearA.appendChild(prevYearSpan);
	const browseMonthNextYearA = document.createElement('a');
	browseMonthNextYearA.href = '#';
	browseMonthNextYearA.addEventListener('click', prevYearVis);
	const nextYearSpan = document.createElement('span');
	nextYearSpan.appendChild(document.createTextNode('next'));
	browseMonthNextYearA.classList.add('next_year');
	browseMonthNextYearA.appendChild(nextYearSpan);
	const currentYearSpan = document.createElement('span');
	currentYearSpan.classList.add('current_year');
	currentYearSpan.appendChild(document.createTextNode(currentYr));
	browseMonthsYearNavigation.appendChild(browseMonthPrevYearA);
	browseMonthsYearNavigation.appendChild(currentYearSpan);
	browseMonthsYearNavigation.appendChild(browseMonthNextYearA);
	browseMonthsYear.appendChild(browseMonthsYearNavigation);
	browseMonthsPopInner.appendChild(browseMonthsYear);
	const clear1 = document.createElement('div');
	clear1.classList.add('clear');
	browseMonthsYearNavigation.appendChild(clear1);
	const browseMonths = document.createElement('div');
	browseMonths.classList.add('months');
	const browseMonthsUl = document.createElement('ul');
	const month = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	let browseMonthsLi;
	let browseMonthsA;
	for (let i = 0; i < 12; i++) {
		browseMonthsA = document.createElement('span');
		browseMonthsA.appendChild(document.createTextNode(month[i]));
		browseMonthsLi = document.createElement('li');
		browseMonthsLi.appendChild(browseMonthsA);
		browseMonthsUl.appendChild(browseMonthsLi);
	}
	browseMonths.appendChild(browseMonthsUl);
	browseMonthsYear.appendChild(browseMonths);
	browseMonthsPopInner.appendChild(browseMonthsYear);
	browseMonthsWidget2.appendChild(browseMonthsPopInner);
	return browseMonthsWidget2;
};

export default makeBrowseMonthsWidget;
