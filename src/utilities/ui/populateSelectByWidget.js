/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import getShortcodeForString from '../getShortcodeForString';
import butt from './butt';
import svgForType from './svgForType';

const precountTheSelection = function () {
	const pick = document.getElementsByClassName('picked');
	while (pick.length > 0) {
		pick[0].classList.remove('picked');
	}
	const data = document.getElementById('mass_post_features-plugin_data');
	const allToSelect = JSON.parse(data.getAttribute('data-all-to-select'));
	const typeToIds = JSON.parse(data.getAttribute('data-type_to_ids'));
	const tagToIds = JSON.parse(data.getAttribute('data-tag_to_ids'));
	const idToTags = JSON.parse(data.getAttribute('data-id_to_tags'));
	const idToTypes = JSON.parse(data.getAttribute('data-id_to_types'));
	const idToOrigin = JSON.parse(data.getAttribute('data-id_to_origin'));
	const idToState = JSON.parse(data.getAttribute('data-id_to_state'));
	const gt2select = JSON.parse(data.getAttribute('data-gt-to-select'));
	const lt2select = JSON.parse(data.getAttribute('data-lt-to-select'));
	// less than notes, the ID is the generated java shortcode thing
	const ltIs = data.classList.contains(
		// not more
		'istype-1902356151'
	);
	const gtIs = data.classList.contains(
		// more than notes
		'istype-454920947' // not less :)
	);
	let type;
	let id;
	let tag;
	const toSelect = [];
	// contains tag
	for (let l = 0; l < allToSelect.istag.length; l++) {
		tag = allToSelect.istag[l];
		for (let i = 0; i < tagToIds[tag].length; i++) {
			id = tagToIds[tag][i];
			if (toSelect.indexOf(id) === -1) {
				toSelect.push(id);
			}
		}
	}
	let index;
	let originType;
	const origin = ['original', 'reblog-self', 'reblog-other'];
	let stateType;
	if (toSelect.length === 0) {
		// contains type, go from 0, capture all
		for (let l = 0; l < allToSelect.istype.length; l++) {
			type = allToSelect.istype[l];
			if (type === 'notes-more-than' || type === 'notes-less-than') {
				// eslint-disable-next-line no-continue
				continue;
			}
			for (let i = 0; i < typeToIds[type].length; i++) {
				id = typeToIds[type][i];
				if (
					allToSelect.istype.length > 1 && // capture some
					allToSelect.istype.indexOf(idToOrigin[id]) === -1 &&
					allToSelect.istype.indexOf(idToState[id]) === -1
				) {
					// eslint-disable-next-line no-continue
					continue; // has type1, but not type2
				} else if (toSelect.indexOf(id) === -1) {
					toSelect.push(id);
				}
			}
		}
	}
	if (toSelect.length !== 0) {
		// go twice, for 2 or 3 typeTypes
		// if doesn't contain type, remove  from selection
		for (let l = 0; l < allToSelect.istype.length; l++) {
			type = allToSelect.istype[l];
			if (type === 'notes-more-than' || type === 'notes-less-than') {
				// eslint-disable-next-line no-continue
				continue;
			}
			originType = origin.indexOf(type) !== -1;
			stateType = type === 'private';
			for (let i = 0; i < toSelect.length; i++) {
				id = toSelect[i];
				if (
					(idToTypes[id] !== type && !originType && !stateType) ||
					(idToOrigin[id] !== type && originType) ||
					(idToState[id] !== type && stateType)
				) {
					index = toSelect.indexOf(id);
					if (index !== -1) {
						toSelect.splice(i, 1);
						i--;
					}
				}
			}
		}
	}
	// intermission/break here, continued from @ var notesLtGt
	if (ltIs) {
		// no :not, so no opposite-day ui confusion :)
		if (toSelect.length !== 0) {
			// after thought types like note count for LT
			for (let i = 0; i < toSelect.length; i++) {
				id = toSelect[i];
				if (lt2select.indexOf(id) === -1) {
					toSelect.splice(i, 1);
					i--;
				}
			}
		} else {
			for (let i = 0; i < lt2select.length; i++) {
				id = lt2select[i];
				if (toSelect.indexOf(id) === -1) {
					toSelect.push(id);
				}
			}
		}
	}
	if (gtIs) {
		// this has no :not, less confusion
		if (toSelect.length !== 0) {
			// after thought types like note count for GT
			for (let i = 0; i < toSelect.length; i++) {
				id = toSelect[i];
				if (gt2select.indexOf(id) === -1) {
					toSelect.splice(i, 1);
					i--;
				}
			}
		} else {
			for (let i = 0; i < gt2select.length; i++) {
				id = gt2select[i];
				if (toSelect.indexOf(id) === -1) {
					toSelect.push(id);
				}
			}
		}
	}
	// back to the normal function
	if (toSelect.length !== 0) {
		// remove from selection
		// doesn't contain tag
		for (let l = 0; l < allToSelect.nottag.length; l++) {
			tag = allToSelect.nottag[l];
			for (i = 0; i < toSelect.length; i++) {
				id = toSelect[i];
				if (tagToIds[tag].indexOf(id) !== -1) {
					toSelect.push(id);
				}
			}
		}
	} else {
		// or wild select from 0, so add to selection
		for (let l = 0; l < allToSelect.nottag.length; l++) {
			tag = allToSelect.nottag[l];
			// eslint-disable-next-line no-restricted-syntax
			for (id in idToTags) {
				if (idToTags[id] !== tag) {
					if (toSelect.indexOf(id) === -1) {
						toSelect.push(id);
					}
				}
			}
		}
	}
	if (toSelect.length !== 0) {
		// doesn't contain type, exclusive or whatever
		for (let l = 0; l < allToSelect.nottype.length; l++) {
			type = allToSelect.nottype[l];
			if (type === 'notes-more-than' || type === 'notes-less-than') {
				// eslint-disable-next-line no-continue
				continue;
			}
			originType = origin.indexOf(type) !== -1;
			stateType = type === 'private';
			for (let i = 0; i < toSelect.length; i++) {
				id = toSelect[i];
				if (
					(idToTypes[id] === type && !originType && !stateType) ||
					(idToOrigin[id] === type && originType) ||
					(idToState[id] === type && originType)
				) {
					index = toSelect.indexOf(id);
					if (index !== -1) {
						toSelect.splice(i, 1);
						i--;
					}
				}
			}
		}
	} else {
		// select from nothing
		for (let l = 0; l < allToSelect.nottype.length; l++) {
			type = allToSelect.nottype[l];
			if (type === 'notes-more-than' || type === 'notes-less-than') {
				// eslint-disable-next-line no-continue
				continue;
			}
			// eslint-disable-next-line no-restricted-syntax
			for (const type2 in typeToIds) {
				if (type === type2) {
					// eslint-disable-next-line no-continue
					continue;
				}
				for (let i = 0; i < typeToIds[type2].length; i++) {
					id = typeToIds[type2][i];
					if (
						typeToIds[type].indexOf(id) !== -1 ||
						(allToSelect.nottype.length > 1 && // capture some
							allToSelect.nottype.indexOf(idToOrigin[id]) !==
								-1 &&
							allToSelect.nottype.indexOf(idToState[id]) === -1)
					) {
						// eslint-disable-next-line no-continue
						continue; // has type1, but not type2
					} else if (toSelect.indexOf(id) === -1) {
						toSelect.push(id);
					}
				}
			}
		}
	}
	// proudly show the posts select count
	const titleD = document.getElementById('select-by-widget_title');
	const countEl = titleD.getElementsByClassName('preselect-count')[0];
	countEl.classList.add('noanim');
	setTimeout(() => {
		countEl.classList.remove('noanim');
		countEl.innerHTML = ` (x${toSelect.length})`;
	}, 1);
	const sb = document.getElementById('select_button');
	if (toSelect.length === 0) {
		if (!data.classList.contains('show-only')) {
			sb.disabled = true;
		}
	} else {
		sb.disabled = false;
		let sel;
		for (let i = 0; i < toSelect.length; i++) {
			id = toSelect[i];
			sel = document.getElementById(`post_${id}`);
			if (sel !== null) {
				sel.classList.add('picked');
			}
		}
		data.setAttribute('data-to-select', JSON.stringify(toSelect));
	} // to be continued @ var selecto
};
const populateSelectByWidget = () => {
	if (!document.getElementById('select-by').checked) {
		return;
	}
	const data = document.getElementById('mass_post_features-plugin_data');
	// these are large JSON attributes DOM, but it should run ok
	// as long as no mutation events/observers on Tumblr's side
	const tagsAllArr = JSON.parse(data.getAttribute('data-tags_all_arr'));
	const typesAllArr = JSON.parse(data.getAttribute('data-types_all_arr'));
	const tagToIds = JSON.parse(data.getAttribute('data-tag_to_ids'));
	const typeToIds = JSON.parse(data.getAttribute('data-type_to_ids'));
	const widgetFirstFocus = data.getAttribute('widget_first-focus');
	let rowsLength = 0;
	const anti = () => {
		// is and not checkboxes
		const ante = document.getElementById(this.getAttribute('anti'));
		const allToSelect = JSON.parse(data.getAttribute('data-all-to-select'));
		const tp = document.getElementsByClassName('type');
		let tg;
		let tg2;
		let tgi;
		if (this.checked && ante.checked) {
			ante.parentNode.classList.remove('ch');
			ante.classList.remove(this.id);
			ante.checked = false;
			tg = ante.getAttribute('data-is');
			tg2 = ante.getAttribute('data-tag');
			tgi = allToSelect[tg].indexOf(tg2);
			if (tgi !== -1) {
				allToSelect[tg].splice(tgi, 1);
			}
		}
		const tag = this.getAttribute('data-tag');
		const is = this.getAttribute('data-is');
		let i = allToSelect[is].indexOf(tag);
		if (this.checked) {
			this.parentNode.classList.add('ch');
			data.classList.add(this.id);
			const origin = ['original', 'reblog-self', 'reblog-other'];
			if (i === -1) {
				if (this.classList.contains('type')) {
					for (i = 0; i < tp.length; i++) {
						if (tp[i] !== this) {
							tg = tp[i].getAttribute('data-is');
							tg2 = tp[i].getAttribute('data-tag');
							if (tg2 === null) {
								// eslint-disable-next-line no-continue
								continue;
							}
							if (
								(data.classList.contains(tp[i].id) &&
									tg2 !== 'reblog-self' &&
									tg2 !== 'reblog-other' &&
									tg2 !== 'original' &&
									tg2 !== 'notes-less-than' &&
									tg2 !== 'notes-more-than' &&
									tg2 !== 'private' &&
									tag !== 'private') ||
								(data.classList.contains(tp[i].id) &&
									origin.indexOf(tg2) !== -1 &&
									origin.indexOf(tag) !== -1)
							) {
								// there can be only one...
								tgi = allToSelect[tg].indexOf(tg2);
								tp[i].parentNode.classList.remove('ch');
								tp[i].checked = false;
								data.classList.remove(tp[i].id);
								if (tgi !== -1) {
									allToSelect[tg].splice(tgi, 1);
								}
								// you can't select 1 post, with 2 basic types...
								// it doesn't exist
							}
						}
					}
				}
				allToSelect[is].push(tag);
			}
		} else {
			this.parentNode.classList.remove('ch');
			data.classList.remove(this.id);
			if (i !== -1) {
				allToSelect[is].splice(i, 1);
			}
		}
		data.setAttribute('data-all-to-select', JSON.stringify(allToSelect));
		// istag, nottag, istype, nottype
		// step 1 ^ gain the checkBoxes
		// step 2 v preCount the selection
		precountTheSelection();
	};
	const notesLtGt = () => {
		const row = this.parentNode;
		const recount = row.getElementsByClassName('input_is')[0];
		const idToNotes = JSON.parse(data.getAttribute('data-id_to_notes'));
		const alreadyHidden = data.classList.contains(
			'some-posts-already-hidden'
		);
		const visibleIdsAllArr = JSON.parse(
			data.getAttribute('data-visible_ids_all_arr')
		);
		const op = this.getAttribute('data-operator');
		const ltb = op === 'lt';
		const gtb = op === 'gt';
		let count = 0;
		const ids = [];
		let nh; // not hidden
		const countEl = row.getElementsByClassName('count')[0];
		// eslint-disable-next-line no-restricted-syntax, guard-for-in
		for (const id in idToNotes) {
			nh =
				// do not count for hidden posts
				(alreadyHidden && visibleIdsAllArr.indexOf(id) !== -1) ||
				!alreadyHidden;
			if (
				(idToNotes[id] < this.value && ltb && nh) ||
				(idToNotes[id] > this.value && gtb && nh)
			) {
				ids.push(id);
				count++; // count the posts to select
			}
		}
		if (ltb) {
			data.setAttribute('select-by-note_lt', this.value);
			data.setAttribute('data-lt-to-select', JSON.stringify(ids));
		}
		// to be continued @ var precountTheSelection
		if (gtb) {
			data.setAttribute('select-by-note_gt', this.value);
			data.setAttribute('data-gt-to-select', JSON.stringify(ids));
		}
		countEl.innerHTML = count;
		if (recount.checked) {
			precountTheSelection();
		}
	};
	// make row function makeRow
	const widgetRow = (tag, count, isType, tagIcon) => {
		const row = document.createElement('div');
		const rowId = (isType ? 'type' : 'tag') + getShortcodeForString(tag);
		row.id = rowId;
		row.setAttribute('data-row', rowsLength);
		row.classList.add('row');
		if (isType) {
			row.classList.add('type');
			row.classList.add(tag);
		} else {
			row.classList.add('tag');
		}
		const countColumn = document.createElement('div');
		countColumn.classList.add('count');
		countColumn.appendChild(
			document.createTextNode(
				count.toLocaleString('en', { useGrouping: true })
			)
		);
		const label1 = document.createElement('label');
		const label2 = document.createElement('label');
		const input1 = document.createElement('input');
		const input2 = document.createElement('input');
		input1.setAttribute('data-tag', tag);
		input2.setAttribute('data-tag', tag);
		const lb = isType ? 'type' : 'tag';
		input1.setAttribute('data-is', `is${lb}`);
		input2.setAttribute('data-is', `not${lb}`);
		input1.classList.add(lb);
		input2.classList.add(lb);
		input1.classList.add('yes');
		input2.classList.add('no');
		input1.setAttribute('data-yn', 'yes');
		input2.setAttribute('data-yn', 'no');
		const id1 = `is${rowId}`;
		const id2 = `not${rowId}`;
		input1.setAttribute('anti', `not${rowId}`);
		input1.classList.add('input_is');
		input2.setAttribute('anti', `is${rowId}`);
		input2.classList.add('input_not');
		input1.id = id1;
		input2.id = id2;
		input1.addEventListener('change', anti);
		input2.addEventListener('change', anti);
		input1.type = 'checkbox';
		input2.type = 'checkbox';
		label1.setAttribute('for', id1);
		label2.setAttribute('for', id2);
		const div = document.createElement('div');
		div.classList.add('row-child');
		row.setAttribute('title', tag);
		label1.appendChild(countColumn);
		// we use html instead of textNode for emoji :(
		if (isType) {
			div.innerHTML = tag
				.replace(/-/g, ' ')
				.replace(/^.|\s./g, (m) => m.toUpperCase())
				.replace('Original', 'Original (op)');
		} else {
			div.innerHTML = tag;
		}
		tagIcon.classList.add('tag-icon');
		label1.appendChild(tagIcon);
		label1.appendChild(div);
		const is = document.createElement('span');
		is.appendChild(document.createTextNode('is: '));
		is.appendChild(input1);
		label2.appendChild(document.createTextNode('not: '));
		label2.appendChild(input2);
		label1.classList.add('is');
		label2.classList.add('not');
		if (data.classList.contains(`is${rowId}`)) {
			input1.checked = true;
			is.classList.add('ch');
		} else if (data.classList.contains(`not${rowId}`)) {
			label2.classList.add('ch');
			input2.checked = true;
		}
		label1.appendChild(is);
		row.appendChild(label2);
		row.appendChild(label1);
		rowsLength++;
		return row;
	};
	let tag;
	let type;
	const widget = document.getElementById('select-by_widget');
	widget.innerHTML = '';
	const topPart = document.createElement('div');
	topPart.id = 'widget-top-buttons';
	const abcSort = document.createElement('div');
	abcSort.classList.add('sort');
	abcSort.classList.add('abc');
	abcSort.appendChild(document.createTextNode('abc'));
	const numSort = document.createElement('div');
	numSort.classList.add('sort');
	numSort.classList.add('num');
	numSort.appendChild(document.createTextNode('123'));
	const dateSort = document.createElement('div');
	dateSort.classList.add('sort');
	dateSort.classList.add('date');
	dateSort.appendChild(document.createTextNode('date'));
	const redSort = document.createElement('div');
	redSort.classList.add('red');
	// the sorting method gets the arrow
	const arrow = document.createElement('div');
	arrow.classList.add('arrow');
	const widgetSortBy = data.getAttribute('widget_sort-by');
	dateSort.setAttribute('widget_sort-by', 'date-down');
	abcSort.setAttribute('widget_sort-by', 'abc-down');
	numSort.setAttribute('widget_sort-by', 'num-down');
	if (widgetSortBy === 'date-down') {
		dateSort.appendChild(arrow);
		// this is default sort method, do nothing
		dateSort.setAttribute('widget_sort-by', 'date-up');
	}
	if (widgetSortBy === 'date-up') {
		arrow.classList.add('reverse');
		dateSort.appendChild(arrow);
		// this is default sort method reversed
		typesAllArr.reverse();
		tagsAllArr.reverse();
	}
	if (widgetSortBy === 'abc-down') {
		abcSort.appendChild(arrow);
		// sort by alphabetical
		typesAllArr.sort();
		tagsAllArr.sort();
		abcSort.setAttribute('widget_sort-by', 'abc-up');
	}
	if (widgetSortBy === 'abc-up') {
		arrow.classList.add('reverse');
		abcSort.appendChild(arrow);
		// sort by reverse alphabetical
		typesAllArr.sort();
		tagsAllArr.sort();
		typesAllArr.reverse();
		tagsAllArr.reverse();
	}
	const sortByCounts = () => {
		const typeArr = [];
		for (const typeValue in typeToIds) {
			typeArr.push([typeToIds[typeValue].length, type]);
		}
		typeArr.sort((a, b) => parseFloat(b[0]) - parseFloat(a[0]));
		for (let i = 0; i < typeArr.length; i++) {
			// eslint-disable-next-line prefer-destructuring
			typesAllArr[i] = typeArr[i][1];
		}
		const tagArr = [];
		for (const tagValue in tagToIds) {
			tagArr.push([tagToIds[tagValue].length, tag]);
		}
		tagArr.sort((a, b) => parseFloat(b[0]) - parseFloat(a[0]));
		for (let i = 0; i < tagArr.length; i++) {
			// eslint-disable-next-line prefer-destructuring
			tagsAllArr[i] = tagArr[i][1];
		}
	};
	if (widgetSortBy === 'num-down') {
		numSort.appendChild(arrow);
		// sort by counts
		sortByCounts();
		numSort.setAttribute('widget_sort-by', 'num-up');
	}
	if (widgetSortBy === 'num-up') {
		arrow.classList.add('reverse');
		numSort.appendChild(arrow);
		// sort by reverse counts
		sortByCounts();
		typesAllArr.reverse();
		tagsAllArr.reverse();
	}
	const sortBy = function () {
		data.setAttribute(
			'widget_sort-by',
			this.getAttribute('widget_sort-by')
		);
		populateSelectByWidget();
	};
	const reSte = typesAllArr.indexOf('private');
	if (reSte !== -1) {
		typesAllArr.splice(reSte, 1);
		typesAllArr.unshift('private');
	}
	const reOthr = typesAllArr.indexOf('reblog-other');
	if (reOthr !== -1) {
		typesAllArr.splice(reOthr, 1);
		typesAllArr.unshift('reblog-other');
	}
	const reSelf = typesAllArr.indexOf('reblog-self');
	if (reSelf !== -1) {
		typesAllArr.splice(reSelf, 1);
		typesAllArr.unshift('reblog-self');
	}
	const reOrgi = typesAllArr.indexOf('original');
	if (reOrgi !== -1) {
		typesAllArr.splice(reOrgi, 1);
		typesAllArr.unshift('original');
	}
	// ^ the last shall be first
	const inputFocus = function () {
		data.setAttribute('widget_first-focus', this.id);
	};
	const memValue = function () {
		const alreadyHidden = data.classList.contains(
			'some-posts-already-hidden'
		);
		let sb;
		let s;
		if (this.id === 'uncheck') {
			s = document.getElementById('select_button');
			sb = s.firstChild;
			sb.innerHTML = this.checked ? 'UnSelect' : 'Select';
		}
		if (this.id === 'show-only') {
			s = document.getElementById('select_button');
			sb = s.firstChild;
			// eslint-disable-next-line no-nested-ternary
			sb.innerHTML = this.checked
				? alreadyHidden
					? 'ShowAll'
					: 'Hide=!X'
				: 'Select';
		}
		if (this.checked) {
			data.classList.add(this.id);
		} else {
			data.classList.remove(this.id);
		}
	};
	const memAndRePopulate = function () {
		const ante = document.getElementById(this.getAttribute('anti'));
		const href = document.location.href.split(/[\/\?&#=]+/g);
		if (this.checked && ante.checked) {
			ante.checked = false;
		}
		if (this.checked) {
			data.classList.add(this.id);
			data.classList.remove(ante.id);
		} else {
			data.classList.remove(this.id);
			if (ante.checked) {
				data.classList.add(ante.id);
			}
		}
	};
	dateSort.addEventListener('click', sortBy);
	abcSort.addEventListener('click', sortBy);
	numSort.addEventListener('click', sortBy);
	topPart.appendChild(numSort);
	topPart.appendChild(abcSort);
	topPart.appendChild(dateSort);
	topPart.appendChild(redSort);
	widget.appendChild(topPart);
	const scrollingPart = document.createElement('div');
	scrollingPart.classList.add('overflow-auto');
	scrollingPart.id = 'widget_scrolling_part';
	widget.appendChild(scrollingPart);
	// the types / tags rows begin
	const div1 = document.createElement('div');
	div1.classList.add('tags_title');
	div1.appendChild(
		document.createTextNode(
			href[5] === 'followers' ||
				href[5] === 'follows' ||
				href[5] === 'fans'
				? 'Blogs By Type'
				: 'Posts By Type'
		)
	);
	const wsp = document.getElementById('widget_scrolling_part');
	wsp.appendChild(div1);
	// firstly, add some integral buttons that need to go first
	const ltgtInput = document.createElement('input');
	ltgtInput.addEventListener('focus', inputFocus);
	ltgtInput.id = 'hide-ltgt-than-tags';
	ltgtInput.type = 'number';
	ltgtInput.addEventListener('change', function () {
		const data = document.getElementById('mass_post_features-plugin_data');
		data.setAttribute('hide-ltgt-than-tags', this.value);
		const gtl = document.getElementById('gt_input');
		const ltl = document.getElementById('lt_input');
	});
	ltgtInput.value = parseFloat(data.getAttribute('hide-ltgt-than-tags'));
	const lt = document.createElement('input');
	lt.type = 'checkbox';
	lt.id = 'lt_input';
	lt.setAttribute('anti', 'gt_input');
	const ltlabel = document.createElement('label');
	ltlabel.setAttribute('for', 'lt_input');
	ltlabel.appendChild(document.createTextNode('Less Than'));
	const gt = document.createElement('input');
	gt.type = 'checkbox';
	gt.id = 'gt_input';
	gt.setAttribute('anti', 'lt_input');
	const gtlabel = document.createElement('label');
	gtlabel.setAttribute('for', 'gt_input');
	gtlabel.appendChild(document.createTextNode('More Than'));
	lt.checked = data.classList.contains('lt_input');
	gt.checked = data.classList.contains('gt_input');
	const hider = butt('Hide');
	hider.setAttribute('title', 'Hide/Show');
	hider.addEventListener('click', () => {
		populateSelectByWidget();
	});
	const acheck = butt('Clear');
	acheck.firstChild.innerHTML = 'UnCheck';
	acheck.setAttribute('title', 'Uncheck All');
	acheck.addEventListener('click', () => {
		const ch = new CustomEvent('change');
		const wgt = document.getElementById('select-by_widget');
		const check = wgt.getElementsByTagName('input');
		for (let i = 0; i < check.length; i++) {
			if (
				check[i].getAttribute('type') === 'checkbox' &&
				check[i].checked
			) {
				check[i].checked = false;
				check[i].dispatchEvent(ch);
			} // else {
			// TODO ??
			// }
		}
		populateSelectByWidget();
	});
	const ltgtContainer = document.createElement('div');
	ltgtContainer.setAttribute('title', 'Hide tags that occur less than: X#');
	gt.addEventListener('change', memAndRePopulate);
	lt.addEventListener('change', memAndRePopulate);
	ltgtContainer.appendChild(lt);
	ltgtContainer.appendChild(ltlabel);
	ltgtContainer.appendChild(gt);
	ltgtContainer.appendChild(gtlabel);
	ltgtContainer.appendChild(ltgtInput);
	ltgtContainer.classList.add('select-by_ltgt');
	ltgtContainer.appendChild(ltgtInput);
	ltgtContainer.appendChild(hider);
	widget.appendChild(ltgtContainer);
	// append rows for types
	let count;
	const countOver = document.getElementById('hide-ltgt-than-tags').value;
	// this boolean says to check post counts, to hide
	const lti = document.getElementById('lt_input');
	const gti = document.getElementById('gt_input');
	let postTypeTagHiddenCount = 0;
	const alreadyHidden = data.classList.contains('some-posts-already-hidden');
	const visibleIdsAllArr = JSON.parse(
		data.getAttribute('data-visible_ids_all_arr')
	);
	// start the types with note count rows
	const ltrow = widgetRow(
		'notes-less-than',
		'0',
		1,
		svgForType.notes.cloneNode(true)
	);
	ltrow.getElementsByClassName('input_not')[0].disabled = true;
	ltrow.getElementsByClassName('not')[0].classList.add('disabled');
	const gtrow = widgetRow(
		'notes-more-than',
		'0',
		1,
		svgForType.notes.cloneNode(true)
	);
	gtrow.getElementsByClassName('input_not')[0].disabled = true;
	gtrow.getElementsByClassName('not')[0].classList.add('disabled');
	const ltnumber = document.createElement('input');
	ltnumber.type = 'number';
	// input focus, remembers focus, for constant DOM rebuild
	ltnumber.addEventListener('focus', inputFocus);
	const gtnumber = document.createElement('input');
	gtnumber.addEventListener('focus', inputFocus);
	gtnumber.type = 'number';
	ltnumber.classList.add('number-input');
	gtnumber.classList.add('number-input');
	ltnumber.setAttribute('data-operator', 'lt');
	gtnumber.setAttribute('data-operator', 'gt');
	ltnumber.value = parseFloat(data.getAttribute('select-by-note_lt'));
	gtnumber.value = parseFloat(data.getAttribute('select-by-note_gt'));
	ltnumber.addEventListener('input', notesLtGt);
	gtnumber.addEventListener('input', notesLtGt);
	const quickInput = new CustomEvent('input');
	ltnumber.id = 'select-by-notes_less-than';
	gtnumber.id = 'select-by-notes_more-than';
	ltrow.append(ltnumber);
	gtrow.append(gtnumber);
	if (href[5] !== 'follows' && href[5] !== 'followers') {
		wsp.appendChild(ltrow);
		wsp.appendChild(gtrow);
	}
	// this func just counts the posts w/ note counts
	if (
		document.getElementById('select-by-notes_less-than') !== null &&
		document.getElementById('select-by-notes_more-than') !== null
	) {
		document
			.getElementById('select-by-notes_less-than')
			.dispatchEvent(quickInput);
		document
			.getElementById('select-by-notes_more-than')
			.dispatchEvent(quickInput);
	}
	const div2 = document.createElement('div');
	div2.classList.add('tags_title');
	let newCount;
	let id;
	let l;
	for (let i = 0; i < typesAllArr.length; i++) {
		type = typesAllArr[i];
		if (type === 'notes-more-than' || type === 'notes-less-than') {
			continue;
		}
		count = typeToIds[type].length;
		if (alreadyHidden) {
			newCount = 0;
			// also do this for tags scroll below,
			// make sure id is visible
			for (l = 0; l < typeToIds[type].length; l++) {
				id = typeToIds[type][l];
				if (visibleIdsAllArr.indexOf(id) !== -1) {
					newCount++;
				}
			}
			// hide counts--; and rows that are invisible
			if (newCount === 0) {
				postTypeTagHiddenCount++;
				continue;
			} else {
				count = newCount;
			}
		}
		// skip if less than tags/type count :)
		if (
			// get both countOvers (type and tag, scroll down :)
			type !== 'reblog-self' &&
			type !== 'reblog-other' &&
			((count < countOver && lti.checked) ||
				(count > countOver && gti.checked))
		) {
			postTypeTagHiddenCount++;
			continue;
		}
		wsp.appendChild(
			widgetRow(type, count, 1, svgForType[type].cloneNode(true))
		);
	}
	// types / tags seperator
	div2.appendChild(
		document.createTextNode(
			href[5] === 'followers' || href[5] === 'follows'
				? ''
				: 'Posts By Tag'
		)
	);
	wsp.appendChild(div2);
	// append rows for tags
	for (let i = 0; i < tagsAllArr.length; i++) {
		tag = tagsAllArr[i];
		count = tagToIds[tag].length;
		if (alreadyHidden) {
			newCount = 0;
			// also do this for types up above
			for (l = 0; l < tagToIds[tag].length; l++) {
				id = tagToIds[tag][l];
				if (visibleIdsAllArr.indexOf(id) !== -1) {
					newCount++;
				}
			}
			// hide counts--; and rows that are invisible (AGAIN)
			if (newCount === 0) {
				postTypeTagHiddenCount++;
				continue;
			} else {
				count = newCount;
			}
		}
		// skip if tags amount to lessThan / moreThan
		if (
			// get both countOvers (scroll up :)
			(count < countOver && lti.checked) ||
			(count > countOver && gti.checked)
		) {
			postTypeTagHiddenCount++;
			continue;
		}
		wsp.appendChild(
			widgetRow(tag, count, 0, svgForType.tag.cloneNode(true))
		);
	}
	// finish with the tags, show hidden count in top
	const wigTB = document.getElementById('widget-top-buttons');
	const redTB = wigTB.getElementsByClassName('red')[0];
	if (postTypeTagHiddenCount !== 0) {
		redTB.innerHTML = `${postTypeTagHiddenCount} rows hidden`;
	} else {
		wigTB.removeChild(redTB);
	}
	const re = butt('List');
	re.setAttribute('title', 'Refresh Tags/Type List...');
	re.firstChild.innerHTML = 'Refresh';
	re.addEventListener('click', () => {
		const data = document.getElementById('mass_post_features-plugin_data');
		const wsp = document.getElementById('widget_scrolling_part');
		data.setAttribute('widget_scroll-top', wsp.scrollTop);
		// refresh the tag select by widget
		document.getElementById('lt_input').checked = false;
		document.getElementById('gt_input').checked = false;
		data.classList.remove('lt_input');
		data.classList.remove('gt_input');
		populateSelectByWidget();
	});
	const cancel = butt('Cancel1');
	cancel.firstChild.innerHTML = '&#x274C;';
	cancel.setAttribute('title', 'Cancel and Close Widget...');
	cancel.addEventListener('click', () => {
		const data = document.getElementById('mass_post_features-plugin_data');
		const pick = document.getElementsByClassName('picked');
		while (pick.length > 0) {
			pick[0].classList.remove('picked');
		}
		const wsp = document.getElementById('widget_scrolling_part');
		data.setAttribute('widget_scroll-top', wsp.scrollTop);
		document.getElementById('select-by').checked = false;
	});
	const needle = parseFloat(data.getAttribute('data-select-by_needle'));
	const selecto = butt('Select'); // this is the select-by/show-by button
	if (data.classList.contains('show-only')) {
		selecto.firstChild.innerHTML = alreadyHidden ? 'ShowAll' : 'Hide=!X';
	} else if (needle > 0 && !data.classList.contains('uncheck')) {
		selecto.firstChild.innerHTML = '100more';
	}
	// "select by tag" "select by type"
	selecto.addEventListener('click', () => {
		const data = document.getElementById('mass_post_features-plugin_data');
		const limit = 100; // tumblr limit, for classic mass tag api
		let needle = parseFloat(data.getAttribute('data-select-by_needle'));
		const s = document.getElementById('select_button');
		const sb = s.firstChild;
		// Mass Post Features v3 by benign-mx (me) Jake Jilg
		// oh wait. I don't need this^ anymore... :) sorry...
		precountTheSelection();
		// continued from this^ function @ var precountTheSelection
		const toSelect = JSON.parse(data.getAttribute('data-to-select'));
		const idsAllArr = JSON.parse(data.getAttribute('data-ids_all_arr'));
		const alreadyHidden = data.classList.contains(
			'some-posts-already-hidden'
		);
		const visibleIdsAllArr = JSON.parse(
			data.getAttribute('data-visible_ids_all_arr')
		);
		let hl;
		const un = data.classList.contains('uncheck');
		const regularSelect = !data.classList.contains('show-only');
		// and finally select some posts
		let i = 0;
		let id;
		let hlBrick;
		hl = document.getElementsByClassName('highlighted');
		const needleBefore = needle;
		let selectedCount = 0;
		if (regularSelect) {
			while (hl.length > 0 && needle !== 0) {
				highlightBrick(hl[0], 0);
			}
			for (i = needle; i < toSelect.length; i++) {
				hlBrick = document.getElementById(`post_${toSelect[i]}`);
				if (hlBrick !== null) {
					// or deselect if uselect is checked
					if (!un) {
						needle++;
						if (needle > needleBefore + limit) {
							// stop at 100 select
							break;
						}
					}
					selectedCount++;
					highlightBrick(hlBrick, !un);
				}
			}
			if (selectedCount < limit) {
				needle = 0;
			}
			data.setAttribute('data-select-by_needle', needle);
		} else {
			// but this is the ShowOnly mode thing... :)
			let needRebuild = false;
			let brick;
			if (!alreadyHidden) {
				sb.innerHTML = 'ShowAll';
				s.disabled = false;
				data.classList.add('some-posts-already-hidden');
				for (i = 0; i < idsAllArr.length; i++) {
					id = idsAllArr[i];
					brick = document.getElementById(`post_${id}`);
					if (toSelect.indexOf(id) !== -1) {
						visibleIdsAllArr.push(id);
					} // a clone of toSelect,
					// but this staggers back for more after selections :)
					if (toSelect.indexOf(id) === -1 && brick !== null) {
						needRebuild = true;
						brick.classList.remove('brick');
						brick.classList.remove('laid');
						brick.classList.remove('highlighted');
						brick.classList.add('display-none');
					} else if (
						toSelect.indexOf(id) !== -1 &&
						brick !== null &&
						brick.classList.contains('display-none')
					) {
						needRebuild = true;
						brick.classList.add('brick');
						brick.classList.add('laid');
						brick.classList.remove('display-none');
					}
				}
			} else {
				sb.innerHTML = 'Hide=!X';
				const dn = document.getElementsByClassName('display-none');
				data.classList.remove('some-posts-already-hidden');
				needRebuild = dn.length > 0;
				while (dn.length > 0) {
					dn[0].classList.add('brick');
					dn[0].classList.add('laid');
					// this goes lass, or else dn[0] becomes undefined :)
					dn[0].classList.remove('display-none');
				}
			}
			if (needRebuild) {
				pluginBuildColumns();
			}
		}
		data.setAttribute(
			'data-visible_ids_all_arr',
			JSON.stringify(visibleIdsAllArr)
		);
		postCountMake();
		populateSelectByWidget();
	});
	cancel.setAttribute('title', 'Close Widget');
	selecto.setAttribute('title', 'Select or Show');
	widget.appendChild(selecto);
	widget.appendChild(cancel);
	widget.appendChild(acheck);
	widget.appendChild(re);
	const unlabel = document.createElement('label');
	const uncheck = document.createElement('input');
	uncheck.type = 'checkbox';
	uncheck.id = 'uncheck';
	uncheck.addEventListener('change', memValue);
	if (data.classList.contains('uncheck')) {
		uncheck.checked = true;
	}
	unlabel.setAttribute('for', 'uncheck');
	unlabel.appendChild(document.createTextNode('Un'));
	const h1 = document.createElement('div');
	const shoLabel = document.createElement('label');
	const shoInput = document.createElement('input');
	shoInput.id = 'show-only';
	shoInput.addEventListener('change', memValue);
	if (data.classList.contains('show-only')) {
		shoInput.checked = true;
	}
	shoInput.type = 'checkbox';
	shoLabel.setAttribute('for', 'show-only');
	shoLabel.appendChild(document.createTextNode('Show Only'));
	h1.appendChild(shoInput);
	h1.appendChild(shoLabel);
	h1.appendChild(uncheck);
	h1.appendChild(unlabel);
	h1.id = 'select-by-widget_title';
	const innerSpan = document.createElement('span');
	innerSpan.appendChild(document.createTextNode('Select'));
	const countSpan = document.createElement('span');
	countSpan.classList.add('preselect-count');
	countSpan.appendChild(document.createTextNode('(x0)'));
	countSpan.setAttribute('title', 'Selecting X Many...');
	innerSpan.appendChild(countSpan);
	h1.appendChild(innerSpan);
	// refocus number inputs
	const ff = document.getElementById(widgetFirstFocus);
	ff.focus();
	// all elements added, go back down/up scrollTop
	wsp.scrollTo(0, parseFloat(data.getAttribute('widget_scroll-top')));
	// lastly, the title element textNode
	widget.appendChild(h1);
	precountTheSelection();
};
export default populateSelectByWidget;
