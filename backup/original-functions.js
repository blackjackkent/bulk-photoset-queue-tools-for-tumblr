var doubleCheckDisabledMonths = function (currentYr, lTs, fTs, jump, jumpTo) {
	var mw = document.getElementById('browse_months_widget');
	var cy = mw.getElementsByClassName('current_year')[0].innerText;
	var yr1 = parseInt(cy);
	var timestampF;
	var timestampL;
	var mo = mw.getElementsByClassName('months')[0].getElementsByTagName('li');
	var a;
	var span;
	for (var i = 0; i < 12; i++) {
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
			var month = i;
			var ts = new Date(yr1, month + 1, 0).getTime() / 1000;
			var href2g2 =
				'http://www.tumblr.com/mega-editor/published/' +
				name +
				'?' +
				jump +
				'&' +
				jumpTo +
				'&' +
				ts +
				'#month' +
				(i + 1) +
				'year' +
				yr1;
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

var makeBrowseMonthsWidget = function (currentYr, lTs, fTs, jump, jumpTo) {
	// last timestamp, first timestamp
	var browseMonthsWidget2 = document.createElement('div');
	browseMonthsWidget2.classList.add('popover');
	browseMonthsWidget2.classList.add('popover_gradient');
	browseMonthsWidget2.id = 'browse_months_widget';
	var browseMonthsPopInner = document.createElement('div');
	browseMonthsPopInner.classList.add('popover_inner');
	var browseMonthsYear = document.createElement('div');
	browseMonthsYear.classList.add('year');
	var browseMonthsYearNavigation = document.createElement('div');
	browseMonthsYearNavigation.classList.add('year_navigation');
	var prevYearVis = function (e) {
		e.preventDefault();
		e.stopPropagation();
		e.cancelBubble = true;
		var cy = document.getElementsByClassName('current_year')[0];
		var yr = parseInt(cy.innerText);
		if (this.classList.contains('previous_year')) {
			--yr;
			cy.innerText = yr;
		} else {
			++yr;
			cy.innerText = yr;
		}
		doubleCheckDisabledMonths(yr, lTs, fTs, jump, jumpTo);
	};
	var browseMonthPrevYearA = document.createElement('a');
	browseMonthPrevYearA.href = '#';
	browseMonthPrevYearA.addEventListener('click', prevYearVis);
	var prevYearSpan = document.createElement('span');
	prevYearSpan.appendChild(document.createTextNode('prev'));
	browseMonthPrevYearA.classList.add('previous_year');
	browseMonthPrevYearA.appendChild(prevYearSpan);
	var browseMonthNextYearA = document.createElement('a');
	browseMonthNextYearA.href = '#';
	browseMonthNextYearA.addEventListener('click', prevYearVis);
	var nextYearSpan = document.createElement('span');
	nextYearSpan.appendChild(document.createTextNode('next'));
	browseMonthNextYearA.classList.add('next_year');
	browseMonthNextYearA.appendChild(nextYearSpan);
	var currentYearSpan = document.createElement('span');
	currentYearSpan.classList.add('current_year');
	currentYearSpan.appendChild(document.createTextNode(currentYr));
	browseMonthsYearNavigation.appendChild(browseMonthPrevYearA);
	browseMonthsYearNavigation.appendChild(currentYearSpan);
	browseMonthsYearNavigation.appendChild(browseMonthNextYearA);
	browseMonthsYear.appendChild(browseMonthsYearNavigation);
	browseMonthsPopInner.appendChild(browseMonthsYear);
	var clear1 = document.createElement('div');
	clear1.classList.add('clear');
	browseMonthsYearNavigation.appendChild(clear1);
	var browseMonths = document.createElement('div');
	browseMonths.classList.add('months');
	var browseMonthsUl = document.createElement('ul');
	var month = [
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
	var browseMonthsLi;
	var browseMonthsA;
	for (i = 0; i < 12; i++) {
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

var rewrite1 = function () {
	// <= outside of plugin scope
	// Tumblr was animating with
	// JQuery DOM manipulation instead of CSS3 >:P
	window.way_too_big_to_animate = true;
	window.neueCorrectionIndex = 0;
	// Tumblr was written with prototype.js in 2014 and
	// it used a lot of clumsy intervals as listeners
	// which were passed down the the jQuery Tumbr MPE
	// in 2016 and are still being used...
	for (var i = 500; i > 0; i--) {
		clearInterval(i); // their intervals have no var names
	}
	// but we use intervals too because it's still Tumblr in 2014 :)
	var href = document.location.href.split(/[\/\?&#=]+/g);
	if (
		(href[3] === 'published' && href[5] === 'follows') ||
		href[5] === 'followers' ||
		href[5] === 'fans'
	) {
		window.insert_tag = function () {};
		window.render_tag_editor = function () {};
	}
	window.cleanCssAnimate = setInterval(function () {
		if (href[5] === 'photos') {
			clearInterval(window.cleanCssAnimate);
			return;
		}
		var l = document.getElementsByClassName('l-content')[0];
		var data = document.getElementById('mass_post_features-plugin_data');
		if (typeof l === 'undefined') {
			return;
		}
		if (typeof l !== 'undefined' && !l.classList.contains('albino')) {
			l.innerHTML = '';
			return;
		}
		var pause = document.getElementById('pause_button');
		var canvas = document.getElementById('status');
		var ctx = canvas.getContext('2d');
		if (
			canvas !== null &&
			typeof canvas !== 'undefined' &&
			data.classList.contains('fetching-from-tumblr-api') &&
			pause !== null &&
			typeof pause !== 'undefined' &&
			pause.classList.contains('playing')
		) {
			var toSeconds = parseFloat(data.getAttribute('data-to-seconds'));
			toSeconds++;
			if (toSeconds > 30) {
				toSeconds = 0;
			}
			ctx.fillStyle = '#9da6af';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			var width = (canvas.width - 16) * (toSeconds / 30);
			ctx.fillStyle = '#74797e';
			ctx.fillRect(
				0,
				canvas.height / 2 + 2,
				canvas.width - 16,
				canvas.height / 2
			);
			ctx.fillStyle = 'turquoise';
			ctx.fillRect(0, canvas.height / 2 + 2, width, canvas.height / 2);
			ctx.fillStyle = '#9da6af';
			for (
				var i = canvas.width / 11;
				i < canvas.width;
				i += canvas.width / 11
			) {
				ctx.fillRect(
					i - 3,
					canvas.height / 2 + 2,
					2,
					canvas.height / 2
				);
			}
			ctx.font = 'bold 10px Arial, sans-serif';
			ctx.fillStyle = '#fff';
			ctx.fillText(
				'Posts Loaded',
				canvas.width / 2 -
					ctx.measureText('Posts Loaded').width / 2 -
					3,
				canvas.height / 2
			);
			data.setAttribute('data-to-seconds', toSeconds);
		} else if (
			pause !== null &&
			canvas !== null &&
			typeof pause !== 'undefined' &&
			pause.classList.contains('paused')
		) {
			ctx = canvas.getContext('2d');
			ctx.font = 'bold 10px Arial, sans-serif';
			ctx.fillStyle = '#9da6af';
			ctx.fillRect(0, 0, canvas.width, canvas.height / 2);
			ctx.fillStyle = '#fff';
			ctx.fillText(
				'Paused',
				canvas.width / 2 - ctx.measureText('Paused').width / 2 - 6,
				canvas.height / 2
			);
		}
		var fChild = l.querySelectorAll(':scope > :not(.laid)');
		if (fChild.length !== 0) {
			fChild[0].classList.add('laid');
		} else if (data.classList.contains('next_page_false')) {
			clearInterval(window.cleanCssAnimate);
			// see ^ we clear our own animate interval, Tumblr!
			// (Tumblr doens't clear theirs...)
			var p = l.querySelectorAll(':scope > a');
			document.getElementById('p_loaded').innerHTML = 'x' + p.length;
			pause.classList.add('done');
			pause.classList.remove('playing');
			pause.classList.remove('paused');
			var allDone =
				href[5] !== 'followers' && href[5] !== 'follows'
					? 'All posts loaded.'
					: 'All blogs loaded.';
			pause.setAttribute('title', allDone);
			document
				.getElementById('ajax-info_button')
				.setAttribute('title', allDone);
			var smi = new Image();
			smi.addEventListener('load', function () {
				var canvas = document.getElementById('status');
				var ctx = canvas.getContext('2d');
				ctx.font = 'bold 10px Arial, sans-serif';
				ctx.fillStyle = '#9da6af';
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				ctx.fillStyle = '#fff';
				ctx.fillText(
					href[5] === 'fans' ||
						href[5] === 'followers' ||
						href[5] === 'follows'
						? 'All Blogs'
						: 'All Posts',
					14,
					7
				);
				ctx.fillText('Loaded', 17, 15);
				ctx.drawImage(this, 1, 1);
			});
			smi.src =
				'data:image/gif;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyu' +
				'AP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOa' +
				'GcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7';
		}
	}, 25);
	// we will need to rebuild on show only too
	(function (alias) {
		window.columns_need_rebuilding = function () {
			var data = document.getElementById(
				'mass_post_features-plugin_data'
			);
			if (document.getElementById('p_loaded') !== null) {
				var lcontent = document.getElementsByClassName('l-content');
				var p = lcontent[0].querySelectorAll(':scope > a');
				document.getElementById('p_loaded').innerHTML = 'x' + p.length;
			}
			var rebuildAnyway = data.classList.contains('rebuild_anyway');
			window.column_gutter = parseInt(
				data.getAttribute('data-column_gutter')
			);
			window.column_full_width =
				window.column_width + window.column_gutter;
			if (
				rebuildAnyway ||
				document.documentElement.scrollWidth >
					document.documentElement.clientWidth
			) {
				data.classList.remove('rebuild_anyway');
				return true;
			}
			return alias.apply(this, arguments);
		};
	})(window.columns_need_rebuilding);
	(function (alias) {
		// this fires after a delete to rebuild columns...
		window.get_selected_post_ids = function () {
			var data = document.getElementById(
				'mass_post_features-plugin_data'
			);
			data.classList.add('rebuild_anyway');
			var masonry = new CustomEvent('resize');
			window.dispatchEvent(masonry);
			return alias.apply(this, arguments);
		};
	})(window.get_selected_post_ids);
	// this ^ the pro way to alias
	clearInterval(window.timerid_auto_paginator);
	window.fetch_next_page = function () {};
	window.auto_paginator = function () {};
	// pagination? where we are going, we do not need pagination
};
var rewrite2 = function () {
	// my batch photos doesn't need certain functions :0
	var href = document.location.href.split(/[\/\?&#=]+/g);
	(function (alias) {
		// don't fear. these window scope references are
		// NOT unSafeWindow breaches from the plugin scope.
		// these rewrites are going into the DOM, and then
		// the plugin can no longer touch them.
		window.add_tags_to_selected_posts = function () {
			var data = document.getElementById(
				'mass_post_features-plugin_data'
			);
			// we must remove the tag from our own custom data first
			var tagsAllArr = JSON.parse(data.getAttribute('data-tags_all_arr'));
			var tagToIds = JSON.parse(data.getAttribute('data-tag_to_ids'));
			var idToTags = JSON.parse(data.getAttribute('data-id_to_tags'));
			var hl = document.getElementsByClassName('highlighted');
			var tokens = document.getElementById('tokens');
			var tags = tokens.getElementsByClassName('tag');
			var tag;
			var id;
			var tc;
			for (var i = 0; i < tags.length; i++) {
				tag = tags[i].innerHTML;
				if (tagsAllArr.indexOf(tag) === -1) {
					tagsAllArr.push(tag); // new Tag
				}
				for (var l = 0; l < hl.length; l++) {
					id = hl[l].getAttribute('data-id');
					if (typeof idToTags[id] === 'undefined') {
						idToTags[id] = [tags];
					}
					if (idToTags[id].indexOf(tag) === -1) {
						idToTags[id].push(tag);
					}
					if (typeof tagToIds[tag] === 'undefined') {
						tagToIds[tag] = [id];
					}
					if (tagToIds[tag].indexOf(id) === -1) {
						tagToIds[tag].push(id);
					}
					tc = hl[l].getElementsByClassName('tag-container')[0];
					if (
						typeof idToTags[id] !== 'undefined' ||
						idToTags[id].length !== 0
					) {
						// this will happen always
						tc.innerHTML = '#' + idToTags[id].join(' #');
					} else {
						tc.innerHTML = ''; // < this might not happen
					}
				}
			}
			data.setAttribute('data-tags_all_arr', JSON.stringify(tagsAllArr));
			data.setAttribute('data-tag_to_ids', JSON.stringify(tagToIds));
			data.setAttribute('data-id_to_tags', JSON.stringify(idToTags));
			return alias.apply(this, arguments);
		};
	})(window.add_tags_to_selected_posts);
	// this takes tags out of elements when removed...
	// pry easier/better than reloading each post
	(function (alias) {
		window.remove_tags_from_selected_posts = function () {
			var data = document.getElementById(
				'mass_post_features-plugin_data'
			);
			// we must remove the tag from our own custom data first
			var tagsAllArr = JSON.parse(data.getAttribute('data-tags_all_arr'));
			var tagToIds = JSON.parse(data.getAttribute('data-tag_to_ids'));
			var idToTags = JSON.parse(data.getAttribute('data-id_to_tags'));
			// you can take the w3c out of the jQuery,
			// but you can't take the jQuery out of w3c
			var tags2remove = document.querySelectorAll('#tags input:checked');
			// I love these new querySelector ^ things :)
			var hl = document.getElementsByClassName('highlighted');
			var id;
			var alt;
			var index;
			var tc;
			for (var i = 0; i < hl.length; i++) {
				id = hl[i].getAttribute('data-id');
				for (var l = 0; l < tags2remove.length; l++) {
					alt = tags2remove[l].getAttribute('alt');
					index = idToTags[id].indexOf(alt);
					idToTags[id].splice(index, 1);
					tc = hl[i].getElementsByClassName('tag-container')[0];
					if (
						typeof idToTags[id] !== 'undefined' ||
						idToTags[id].length !== 0
					) {
						tc.innerHTML = '#' + idToTags[id].join(' #');
					} else {
						tc.innerHTML = '';
					}
					index = tagToIds[alt].indexOf(id);
					tagToIds[alt].splice(index, 1);
					// remove when last tag removed
					if (
						typeof tagToIds[alt] === 'undefined' ||
						tagToIds[alt].length === 0 // it could become undefined on shift
					) {
						index = tagsAllArr.indexOf(alt);
						tagsAllArr.splice(index, 1);
					}
				}
			}
			data.setAttribute('data-tags_all_arr', JSON.stringify(tagsAllArr));
			data.setAttribute('data-tag_to_ids', JSON.stringify(tagToIds));
			data.setAttribute('data-id_to_tags', JSON.stringify(idToTags));
			return alias.apply(this, arguments);
		};
	})(window.remove_tags_from_selected_posts);
	// I've been told: this is the best way to alias a function
	(function (alias) {
		window.get_selected_post_ids = function () {
			window.postCountMake();
			return alias.apply(this, arguments);
		};
	})(window.get_selected_post_ids);
};
// some rewrites ^ to Tumblr's default code,  to use later...
// this function is plugin scope
var appendRichButtons = function (pbe, rich, brick) {
	// pbe meanse photo brick edit, but I recycled this
	// to make buttons for the caption adder thing too :)
	var addTextFormatting = function (e) {
		e.preventDefault();
		e.stopPropagation();
		var sel = window.getSelection();
		if (typeof sel.rangeCount !== 'undefined' && sel.rangeCount === 0) {
			return;
		}
		var rng = sel.getRangeAt(0);
		var preRange = 0;
		var postRange = 0;
		var nod;
		var frag;
		var ancestor;
		var ancClone;
		var middle;
		var isNode = this.getAttribute('data-node') !== 'none';
		if (isNode) {
			nod = document.createElement(this.getAttribute('data-node'));
			nod.appendChild(document.createTextNode(sel.toString()));
			if (this.getAttribute('data-class') !== 'none') {
				nod.classList.add(this.getAttribute('data-class'));
			}
			if (
				this.getAttribute('data-node') === 'a' &&
				this.getAttribute('data-attr') === 'href'
			) {
				nod.href =
					pbe.getElementsByClassName('a_button_input')[0].value;
			}
		} else {
			nod = document.createTextNode(sel.toString());
		}
		rng.deleteContents();
		// data-parent is like ul li || ol li...
		if (this.getAttribute('data-parent') !== 'none') {
			var pnt = document.createElement(this.getAttribute('data-parent'));
			pnt.appendChild(nod);
			rng.insertNode(pnt);
		} else {
			rng.insertNode(nod);
		}
		if (!isNode) {
			if (rng.commonAncestorContainer !== rich) {
				frag = document.createDocumentFragment();
				ancestor = rng.commonAncestorContainer.cloneNode(true);
				ancClone = ancestor.cloneNode(true);
				middle = document.createDocumentFragment();
				middle.appendChild(document.createTextNode(sel.toString()));
				ancestor.innerText = ancestor.innerText.substring(
					0,
					sel.anchorOffset
				);
				ancClone.innerText = ancClone.innerText.substring(
					sel.anchorOffset + sel.toString().length,
					ancClone.innerText.length
				);
				if (ancestor.innerHTML.length > 0) {
					frag.appendChild(ancestor);
				}
				frag.appendChild(middle);
				if (ancClone.innerHTML.length > 0) {
					frag.appendChild(ancClone);
				}
				rng.commonAncestorContainer.parentNode.replaceChild(
					frag,
					rng.commonAncestorContainer
				);
			}
		}
		brick.classList.remove('visible-colors');
		brick.classList.remove('visible-url');
		window.getSelection().removeAllRanges();
	};
	var xb = butt('X');
	xb.classList.add(xb.id);
	xb.setAttribute('data-node', 'none');
	xb.setAttribute('data-class', 'none');
	xb.setAttribute('data-attr', 'none');
	xb.setAttribute('data-parent', 'none');
	xb.removeAttribute('id');
	xb.setAttribute('title', 'Remove Formatting');
	xb.addEventListener('click', addTextFormatting);
	var hb = butt('H');
	hb.classList.add(hb.id);
	hb.setAttribute('data-node', 'h2');
	hb.setAttribute('data-class', 'none');
	hb.setAttribute('data-attr', 'none');
	hb.setAttribute('data-parent', 'none');
	hb.removeAttribute('id');
	hb.setAttribute('title', 'Heading');
	hb.addEventListener('click', addTextFormatting);
	var bb = butt('B');
	bb.classList.add(bb.id);
	bb.setAttribute('data-node', 'b');
	bb.setAttribute('data-class', 'none');
	bb.setAttribute('data-attr', 'none');
	bb.setAttribute('data-parent', 'none');
	bb.removeAttribute('id');
	bb.setAttribute('title', 'Bold');
	bb.addEventListener('click', addTextFormatting);
	var ib = butt('i');
	ib.classList.add(ib.id);
	ib.setAttribute('data-node', 'i');
	ib.setAttribute('data-class', 'none');
	ib.setAttribute('data-attr', 'none');
	ib.setAttribute('data-parent', 'none');
	ib.removeAttribute('id');
	ib.setAttribute('title', 'Italic');
	ib.addEventListener('click', addTextFormatting);
	var so = butt('S');
	so.classList.add(so.id);
	so.removeAttribute('id');
	so.setAttribute('data-node', 'strike');
	so.setAttribute('data-class', 'none');
	so.setAttribute('data-attr', 'none');
	so.setAttribute('data-parent', 'none');
	so.setAttribute('title', 'Strike');
	so.addEventListener('click', addTextFormatting);
	var ab = butt('a');
	ab.classList.add(ab.id);
	ab.removeAttribute('id');
	var ok = butt('ok');
	ok.classList.add(ok.id);
	ok.removeAttribute('id');
	var urlInput = document.createElement('input');
	urlInput.type = 'text';
	urlInput.addEventListener('focus', function () {
		this.select();
	});
	urlInput.classList.add('a_button_input');
	urlInput.value = 'https://';
	ok.setAttribute('data-node', 'a');
	ok.setAttribute('data-class', 'none');
	ok.setAttribute('data-attr', 'href');
	ok.setAttribute('data-parent', 'none');
	ab.setAttribute('title', 'Link');
	ok.addEventListener('click', addTextFormatting);
	ab.addEventListener('click', function () {
		brick.classList.add('visible-url');
	});
	var ol = butt('ol');
	ol.classList.add(ol.id);
	ol.removeAttribute('id');
	ol.setAttribute('data-node', 'li');
	ol.setAttribute('data-class', 'none');
	ol.setAttribute('data-attr', 'none');
	ol.setAttribute('data-parent', 'ol');
	ol.firstChild.innerHTML = '1.';
	ol.setAttribute('title', 'Ordered List');
	ol.addEventListener('click', addTextFormatting);
	var ul = butt('ul');
	ul.classList.add(ul.id);
	ul.removeAttribute('id');
	ul.setAttribute('data-node', 'li');
	ul.setAttribute('data-class', 'none');
	ul.setAttribute('data-attr', 'none');
	ul.setAttribute('data-parent', 'ul');
	ul.firstChild.innerHTML = '&#x26AB;';
	ul.setAttribute('title', 'Unordered List (Bullet Point)');
	ul.addEventListener('click', addTextFormatting);
	var bq = butt('bq');
	bq.classList.add(bq.id);
	bq.removeAttribute('id');
	bq.setAttribute('data-node', 'blockquote');
	bq.setAttribute('data-class', 'none');
	bq.setAttribute('data-attr', 'none');
	bq.setAttribute('data-parent', 'none');
	bq.firstChild.innerHTML = '&#x2590;';
	bq.setAttribute('title', 'Blockquote');
	bq.addEventListener('click', addTextFormatting);
	var colorB = butt('colors');
	colorB.classList.add(colorB.id);
	colorB.removeAttribute('id');
	var color = document.createElement('div');
	color.classList.add('color');
	colorB.firstChild.innerHTML = color.outerHTML;
	colorB.setAttribute('title', 'Text Color');
	colorB.addEventListener('click', function () {
		brick.classList.add('visible-colors');
	});
	var colors = [
		['Pink', '#ff62ce', 'niles'],
		['Red', '#ff492f', 'joey'],
		['Orange', '#ff8a00', 'monica'],
		['Yellow', '#e8d73a', 'phoebe'],
		['Green', '#00cf35', 'ross'],
		['Cerulean', '#00b8ff', 'rachel'],
		['Blue', '#7c5cff', 'chandler']
	];
	var cb;
	for (i = 0; i < colors.length; i++) {
		cb = butt(colors[i][0]);
		cb.classList.add(cb.id);
		cb.removeAttribute('id');
		cb.setAttribute(
			'title',
			colors[i][0] +
				' ' +
				colors[i][2].charAt(0).toUpperCase() +
				colors[i][2].slice(1)
		);
		cb.classList.add('colors_buttons');
		cb.firstChild.innerHTML = '';
		cb.style.backgroundColor = colors[i][1];
		cb.setAttribute('data-node', 'span');
		cb.setAttribute('data-class', 'npf_color_' + colors[i][2]);
		cb.setAttribute('data-attr', 'none');
		cb.setAttribute('data-parent', 'none');
		cb.addEventListener('click', addTextFormatting);
		pbe.appendChild(cb);
	}
	var fb = butt('Q');
	fb.classList.add(fb.id);
	fb.removeAttribute('id');
	fb.setAttribute('title', 'Quirky/Fancy');
	fb.setAttribute('data-node', 'p');
	fb.setAttribute('data-class', 'npf_quirky');
	fb.setAttribute('data-attr', 'none');
	fb.setAttribute('data-parent', 'none');
	fb.addEventListener('click', addTextFormatting);
	pbe.appendChild(xb);
	pbe.appendChild(bb);
	pbe.appendChild(ib);
	pbe.appendChild(so);
	pbe.appendChild(ab);
	pbe.appendChild(hb);
	pbe.appendChild(ol);
	pbe.appendChild(ul);
	pbe.appendChild(bq);
	pbe.appendChild(colorB);
	pbe.appendChild(fb);
	pbe.appendChild(urlInput);
	pbe.appendChild(ok);
};
var pluginBuildColumns = function () {
	var data = document.getElementById('mass_post_features-plugin_data');
	data.classList.add('rebuild_anyway');
	// we'll dispatch a masonry event, with window resize
	// because I don't want to appendChild script xMany
	// times, to communicate to window wrapper/scope...
	var masonry = new CustomEvent('resize');
	window.dispatchEvent(masonry);
};
// here are some button making things
var butt = function (nam) {
	// buttons for widgets
	var sel = document.createElement('button');
	sel.id = nam.toLowerCase().replace(/\s+/, '_') + '_button';
	sel.classList.add('chrome');
	sel.classList.add('big_dark');
	var div = document.createElement('div');
	div.classList.add('chrome_button'); // numbers for same name buttons
	div.appendChild(document.createTextNode(nam.replace(/\d+$/, '')));
	sel.appendChild(div);
	return sel;
};
var newChromeButton = function (id, text, withWidget) {
	var container = document.createElement('span');
	container.classList.add('header_button');
	var button = document.createElement('button');
	button.id = id + '_button';
	button.classList.add('chrome');
	button.classList.add('big_dark');
	var cb;
	cb = document.createElement('div');
	cb.classList.add('chrome_button');
	if (typeof text === 'string') {
		cb.innerHTML = text;
	} else {
		// assumed element/fragment
		cb.appendChild(text);
		var sv = cb.getElementsByTagName('svg');
		for (var i = 0; i < sv.length; i++) {
			sv[i].setAttribute('fill', '#fff');
			sv[i].setAttribute('width', '15');
			sv[i].setAttribute('height', '15');
		}
	}
	if (withWidget) {
		var arrow = document.createElement('div');
		arrow.classList.add('arrow');
		cb.appendChild(arrow);
		var input = document.createElement('input');
		input.type = 'checkbox';
		input.id = id;
		button.addEventListener('click', function () {
			input.checked = !input.checked;
			input.dispatchEvent(new Event('change'));
		});
		button.appendChild(cb);
		container.appendChild(button);
		container.appendChild(input);
		var widget = document.createElement('div');
		widget.classList.add('widget');
		widget.id = id + '_widget';
		container.appendChild(widget);
	} else {
		button.appendChild(cb);
	}
	container.appendChild(button);
	return container;
};

var postCountMake = function () {
	var hl = document.getElementsByClassName('highlighted');
	var x = hl.length;
	var i;
	var privateButton = document.getElementById('private_button');
	var privateCount = 0;
	for (i = 0; i < x; i++) {
		if (hl[i].classList.contains('private')) {
			privateCount++;
		}
	}
	if (
		privateButton !== null &&
		typeof privateButton !== 'undefined' &&
		privateCount === hl.length &&
		hl.length !== 0 &&
		privateButton.getElementsByTagName('span')[0].innerText !== '(Public)'
	) {
		privateButton.getElementsByTagName('span')[0].innerText = '(Public)';
		privateButton.setAttribute('data-edit_action', '{"post[state]":"0"}'); // "0" is public usually
	} else if (
		privateButton !== null &&
		typeof privateButton !== 'undefined' &&
		privateButton.getElementsByTagName('span')[0].innerText !== 'Private'
	) {
		privateButton.getElementsByTagName('span')[0].innerText = 'Private';
		privateButton.setAttribute(
			'data-edit_action',
			'{"post[state]":"private"}'
		);
	}
	// make follow or unfollow
	var href = document.location.href.split(/[\/\?&#=]+/g);
	// make public if mostly private selected
	if (
		href[5] === 'followers' ||
		href[5] === 'following' ||
		href[5] === 'fans'
	) {
		var followButton = document.getElementById('unfollow_button');
		var followCount = 0;
		for (i = 0; i < x; i++) {
			if (hl[i].classList.contains('unfollowed')) {
				followCount++;
			}
		}
	}
	if (
		followButton !== null &&
		typeof followButton !== 'undefined' &&
		followCount === hl.length &&
		hl.length !== 0 &&
		followButton.getElementsByTagName('span')[0].innerText !== 'Follow'
	) {
		followButton.getElementsByTagName('span')[0].innerText = 'Follow';
		followButton.setAttribute('data-follow', 'true');
		followButton.setAttribute('title', 'follow selected');
		followButton
			.getElementsByTagName('svg')[0]
			.parentNode.replaceChild(
				svgForType.happy.cloneNode(true),
				followButton.getElementsByTagName('svg')[0]
			);
	} else if (
		followButton !== null &&
		typeof followButton !== 'undefined' &&
		followButton.getElementsByTagName('span')[0].innerText !== 'UnFollow'
	) {
		followButton.setAttribute('title', 'unfollow selected');
		followButton.getElementsByTagName('span')[0].innerText = 'UnFollow';
		followButton.setAttribute('data-follow', 'false');
		followButton
			.getElementsByTagName('svg')[0]
			.parentNode.replaceChild(
				svgForType.sad.cloneNode(true),
				followButton.getElementsByTagName('svg')[0]
			);
	}
	var unsel = document.getElementById('unselect');
	var count = unsel.getElementsByClassName('chrome_button_right')[0];
	var data = document.getElementById('mass_post_features-plugin_data');
	var del = document.getElementById('delete_posts');
	if (data.getAttribute('data-highlight-count') !== x.toString()) {
		data.setAttribute('data-select-all_needle', '0');
		data.setAttribute('data-select-by_needle', '0');
		document
			.getElementById('select-all_button')
			.getElementsByTagName('span')[0].innerHTML = 'Select 100';
		data.setAttribute('data-highlight-count', x);
		document.title = data.getAttribute('doc-title') + ' (' + x + ')';
		count.innerHTML = '&nbsp;(' + x + ')';
		if (del !== null) {
			del.getElementsByClassName('chrome_button_right')[0].innerHTML =
				'&nbsp;(' + x + ')';
		}
		var en = document.getElementsByClassName('editor_navigation');
		var enable = en[0].getElementsByClassName('disable-when-none-selected');
		// disable certain edit buttons, when 0 selected posts
		if (x === 0) {
			for (i = 0; i < enable.length; i++) {
				if (enable[i].id === 'select-by_button') {
					continue;
				}
				enable[i].disabled = true;
			}
			count.innerHTML = '';
			if (del !== null) {
				del.getElementsByClassName('chrome_button_right')[0].innerHTML =
					'';
			}
			document.title = data.getAttribute('doc-title');
			data.classList.add('disable-temp');
		} else if (data.classList.contains('disable-temp')) {
			for (var l = 0; l < enable.length; l++) {
				enable[l].disabled = false;
			}
			data.classList.remove('disable-temp');
		}
	}
	// populate remove_tags widget...
	// sans ajax && sans%20escaped%20labels && sans jQuery
	var idToTags = JSON.parse(data.getAttribute('data-id_to_tags'));
	var createTagThing = function (i, tag) {
		var div = document.createElement('div');
		var input = document.createElement('input');
		input.type = 'checkbox';
		input.id = 'tag_checkbox_' + i;
		input.setAttribute('alt', tag);
		var label = document.createElement('label');
		label.setAttribute('for', 'tag_checkbox_' + i);
		label.appendChild(document.createTextNode(tag));
		div.appendChild(input);
		div.appendChild(label);
		return div;
	};
	var id;
	var tag;
	var tags;
	var tagsAdded = [];
	var tagsWidget = document.getElementById('tags');
	if (
		window
			.getComputedStyle(tagsWidget.parentNode)
			.getPropertyValue('display') !== 'block'
	) {
		tagsWidget.innerHTML = '';
		for (i = 0; i < hl.length; i++) {
			id = hl[i].getAttribute('data-id');
			tags = idToTags[id];
			if (typeof tags !== 'undefined') {
				for (l = 0; l < tags.length; l++) {
					tag = tags[l];
					if (tagsAdded.indexOf(tag) === -1) {
						tagsAdded.push(tag);
						tagsWidget.appendChild(
							createTagThing(tagsAdded.length, tag)
						);
					}
				}
			}
		}
	}
	return x;
};
// end dual wrapper functions

// these are pluginScope, but all DOM, so regardless
var precountTheSelection = function () {
	var pick = document.getElementsByClassName('picked');
	while (pick.length > 0) {
		pick[0].classList.remove('picked');
	}
	var data = document.getElementById('mass_post_features-plugin_data');
	var allToSelect = JSON.parse(data.getAttribute('data-all-to-select'));
	var typeToIds = JSON.parse(data.getAttribute('data-type_to_ids'));
	var tagToIds = JSON.parse(data.getAttribute('data-tag_to_ids'));
	var idToTags = JSON.parse(data.getAttribute('data-id_to_tags'));
	var idToTypes = JSON.parse(data.getAttribute('data-id_to_types'));
	var idToOrigin = JSON.parse(data.getAttribute('data-id_to_origin'));
	var idToState = JSON.parse(data.getAttribute('data-id_to_state'));
	var gt2select = JSON.parse(data.getAttribute('data-gt-to-select'));
	var lt2select = JSON.parse(data.getAttribute('data-lt-to-select'));
	// less than notes, the ID is the generated java shortcode thing
	var ltIs = data.classList.contains(
		// not more
		'istype-1902356151'
	);
	var gtIs = data.classList.contains(
		// more than notes
		'istype-454920947' // not less :)
	);
	var type;
	var id;
	var post;
	var tag;
	var ltgt;
	var toSelect = [];
	// contains tag
	for (var l = 0; l < allToSelect.istag.length; l++) {
		tag = allToSelect.istag[l];
		for (var i = 0; i < tagToIds[tag].length; i++) {
			id = tagToIds[tag][i];
			if (toSelect.indexOf(id) === -1) {
				toSelect.push(id);
			}
		}
	}
	var index;
	var spliceAfter;
	var originType;
	var origin = ['original', 'reblog-self', 'reblog-other'];
	var stateType;
	if (toSelect.length === 0) {
		// contains type, go from 0, capture all
		for (l = 0; l < allToSelect.istype.length; l++) {
			type = allToSelect.istype[l];
			if (type === 'notes-more-than' || type === 'notes-less-than') {
				continue;
			}
			for (i = 0; i < typeToIds[type].length; i++) {
				id = typeToIds[type][i];
				if (
					allToSelect.istype.length > 1 && // capture some
					allToSelect.istype.indexOf(idToOrigin[id]) === -1 &&
					allToSelect.istype.indexOf(idToState[id]) === -1
				) {
					continue; // has type1, but not type2
				} else {
					if (toSelect.indexOf(id) === -1) {
						toSelect.push(id);
					}
				}
			}
		}
	}
	if (toSelect.length !== 0) {
		// go twice, for 2 or 3 typeTypes
		// if doesn't contain type, remove  from selection
		for (l = 0; l < allToSelect.istype.length; l++) {
			type = allToSelect.istype[l];
			if (type === 'notes-more-than' || type === 'notes-less-than') {
				continue;
			}
			originType = origin.indexOf(type) !== -1;
			stateType = type === 'private';
			for (i = 0; i < toSelect.length; i++) {
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
			for (i = 0; i < toSelect.length; i++) {
				id = toSelect[i];
				if (lt2select.indexOf(id) === -1) {
					toSelect.splice(i, 1);
					i--;
				}
			}
		} else {
			for (i = 0; i < lt2select.length; i++) {
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
			for (i = 0; i < toSelect.length; i++) {
				id = toSelect[i];
				if (gt2select.indexOf(id) === -1) {
					toSelect.splice(i, 1);
					i--;
				}
			}
		} else {
			for (i = 0; i < gt2select.length; i++) {
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
		for (l = 0; l < allToSelect.nottag.length; l++) {
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
		for (l = 0; l < allToSelect.nottag.length; l++) {
			tag = allToSelect.nottag[l];
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
		for (l = 0; l < allToSelect.nottype.length; l++) {
			type = allToSelect.nottype[l];
			if (type === 'notes-more-than' || type === 'notes-less-than') {
				continue;
			}
			originType = origin.indexOf(type) !== -1;
			stateType = type === 'private';
			for (i = 0; i < toSelect.length; i++) {
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
		for (l = 0; l < allToSelect.nottype.length; l++) {
			type = allToSelect.nottype[l];
			if (type === 'notes-more-than' || type === 'notes-less-than') {
				continue;
			}
			for (var type2 in typeToIds) {
				if (type === type2) {
					continue;
				}
				for (i = 0; i < typeToIds[type2].length; i++) {
					id = typeToIds[type2][i];
					if (
						typeToIds[type].indexOf(id) !== -1 ||
						(allToSelect.nottype.length > 1 && // capture some
							allToSelect.nottype.indexOf(idToOrigin[id]) !==
								-1 &&
							allToSelect.nottype.indexOf(idToState[id]) === -1)
					) {
						continue; // has type1, but not type2
					} else {
						if (toSelect.indexOf(id) === -1) {
							toSelect.push(id);
						}
					}
				}
			}
		}
	}
	// proudly show the posts select count
	var titleD = document.getElementById('select-by-widget_title');
	var countEl = titleD.getElementsByClassName('preselect-count')[0];
	countEl.classList.add('noanim');
	setTimeout(function () {
		countEl.classList.remove('noanim');
		countEl.innerHTML = ' (x' + toSelect.length + ')';
	}, 1);
	var sb = document.getElementById('select_button');
	if (toSelect.length === 0) {
		if (!data.classList.contains('show-only')) {
			sb.disabled = true;
		}
	} else {
		sb.disabled = false;
		var sel;
		for (i = 0; i < toSelect.length; i++) {
			id = toSelect[i];
			sel = document.getElementById('post_' + id);
			if (sel !== null) {
				sel.classList.add('picked');
			}
		}
		data.setAttribute('data-to-select', JSON.stringify(toSelect));
	} // to be continued @ var selecto
};
var highlightBrick = function (brick, sel) {
	var x = postCountMake();
	var visible = !brick.classList.contains('display-none');
	var hilite = brick.classList.contains('highlighted');
	if (!hilite && sel && x < 100 && visible) {
		brick.classList.remove('prevent-anim');
		brick.classList.add('highlighted');
	}
	if (hilite && !sel) {
		brick.classList.add('prevent-anim');
		brick.classList.remove('highlighted');
		brick.classList.remove('edit-reblog-queue');
	}
	postCountMake();
};
var SVG = function (width, height, fill, viewBox, d) {
	var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	path.setAttribute('d', d);
	svg.setAttribute('viewBox', viewBox);
	svg.setAttribute('width', width);
	svg.setAttribute('height', height);
	svg.setAttribute('fill', fill);
	svg.appendChild(path);
	return svg;
};
var populateSelectByWidget = function () {
	if (!document.getElementById('select-by').checked) {
		return;
	}
	var data = document.getElementById('mass_post_features-plugin_data');
	// these are large JSON attributes DOM, but it should run ok
	// as long as no mutation events/observers on Tumblr's side
	var tagsAllArr = JSON.parse(data.getAttribute('data-tags_all_arr'));
	var typesAllArr = JSON.parse(data.getAttribute('data-types_all_arr'));
	var idsAllArr = JSON.parse(data.getAttribute('data-ids_all_arr'));
	var idToTags = JSON.parse(data.getAttribute('data-id_to_tags'));
	var idToTypes = JSON.parse(data.getAttribute('data-id_to_types'));
	var idToOrigin = JSON.parse(data.getAttribute('data-id_to_origin'));
	var idToState = JSON.parse(data.getAttribute('data-id_to_state'));
	var idToNotes = JSON.parse(data.getAttribute('data-id_to_notes'));
	var tagToIds = JSON.parse(data.getAttribute('data-tag_to_ids'));
	var typeToIds = JSON.parse(data.getAttribute('data-type_to_ids'));
	var widgetFirstFocus = data.getAttribute('widget_first-focus');
	var rowsLength = 0;
	var anti = function () {
		// is and not checkboxes
		var ante = document.getElementById(this.getAttribute('anti'));
		var data = document.getElementById('mass_post_features-plugin_data');
		var allToSelect = JSON.parse(data.getAttribute('data-all-to-select'));
		var tp = document.getElementsByClassName('type');
		var tg;
		var tg2;
		var tgi;
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
		var tag = this.getAttribute('data-tag');
		var is = this.getAttribute('data-is');
		var i = allToSelect[is].indexOf(tag);
		var originSelected = false;
		if (this.checked) {
			this.parentNode.classList.add('ch');
			data.classList.add(this.id);
			var origin = ['original', 'reblog-self', 'reblog-other'];
			if (i === -1) {
				if (this.classList.contains('type')) {
					for (i = 0; i < tp.length; i++) {
						if (tp[i] !== this) {
							tg = tp[i].getAttribute('data-is');
							tg2 = tp[i].getAttribute('data-tag');
							if (tg2 === null) {
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
		//istag, nottag, istype, nottype
		// step 1 ^ gain the checkBoxes
		// step 2 v preCount the selection
		precountTheSelection();
	};
	var notesLtGt = function () {
		var row = this.parentNode;
		var recount = row.getElementsByClassName('input_is')[0];
		var data = document.getElementById('mass_post_features-plugin_data');
		var idToNotes = JSON.parse(data.getAttribute('data-id_to_notes'));
		var alreadyHidden = data.classList.contains(
			'some-posts-already-hidden'
		);
		var visibleIdsAllArr = JSON.parse(
			data.getAttribute('data-visible_ids_all_arr')
		);
		var op = this.getAttribute('data-operator');
		var ltb = op === 'lt';
		var gtb = op === 'gt';
		var count = 0;
		var ids = [];
		var nh; // not hidden
		var countEl = row.getElementsByClassName('count')[0];
		for (var id in idToNotes) {
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
	var widgetRow = function (tag, count, isType, tagIcon) {
		var row = document.createElement('div');
		var rowId = (isType ? 'type' : 'tag') + shortCode(tag);
		row.id = rowId;
		row.setAttribute('data-row', rowsLength);
		row.classList.add('row');
		if (isType) {
			row.classList.add('type');
			row.classList.add(tag);
		} else {
			row.classList.add('tag');
		}
		var countColumn = document.createElement('div');
		countColumn.classList.add('count');
		countColumn.appendChild(
			document.createTextNode(
				count.toLocaleString('en', { useGrouping: true })
			)
		);
		var label1 = document.createElement('label');
		var label2 = document.createElement('label');
		var input1 = document.createElement('input');
		var input2 = document.createElement('input');
		input1.setAttribute('data-tag', tag);
		input2.setAttribute('data-tag', tag);
		var lb = isType ? 'type' : 'tag';
		input1.setAttribute('data-is', 'is' + lb);
		input2.setAttribute('data-is', 'not' + lb);
		input1.classList.add(lb);
		input2.classList.add(lb);
		input1.classList.add('yes');
		input2.classList.add('no');
		input1.setAttribute('data-yn', 'yes');
		input2.setAttribute('data-yn', 'no');
		var id1 = 'is' + rowId;
		var id2 = 'not' + rowId;
		input1.setAttribute('anti', 'not' + rowId);
		input1.classList.add('input_is');
		input2.setAttribute('anti', 'is' + rowId);
		input2.classList.add('input_not');
		input1.id = id1;
		input2.id = id2;
		input1.addEventListener('change', anti);
		input2.addEventListener('change', anti);
		input1.type = 'checkbox';
		input2.type = 'checkbox';
		label1.setAttribute('for', id1);
		label2.setAttribute('for', id2);
		var div = document.createElement('div');
		div.classList.add('row-child');
		row.setAttribute('title', tag);
		label1.appendChild(countColumn);
		// we use html instead of textNode for emoji :(
		if (isType) {
			div.innerHTML = tag
				.replace(/-/g, ' ')
				.replace(/^.|\s./g, function (m) {
					return m.toUpperCase();
				})
				.replace('Original', 'Original (op)');
		} else {
			div.innerHTML = tag;
		}
		tagIcon.classList.add('tag-icon');
		label1.appendChild(tagIcon);
		label1.appendChild(div);
		var is = document.createElement('span');
		is.appendChild(document.createTextNode('is: '));
		is.appendChild(input1);
		label2.appendChild(document.createTextNode('not: '));
		label2.appendChild(input2);
		label1.classList.add('is');
		label2.classList.add('not');
		if (data.classList.contains('is' + rowId)) {
			input1.checked = true;
			is.classList.add('ch');
		} else if (data.classList.contains('not' + rowId)) {
			label2.classList.add('ch');
			input2.checked = true;
		}
		label1.appendChild(is);
		row.appendChild(label2);
		row.appendChild(label1);
		rowsLength++;
		return row;
	};
	var tag;
	var type;
	var widget = document.getElementById('select-by_widget');
	widget.innerHTML = '';
	var topPart = document.createElement('div');
	topPart.id = 'widget-top-buttons';
	var abcSort = document.createElement('div');
	abcSort.classList.add('sort');
	abcSort.classList.add('abc');
	abcSort.appendChild(document.createTextNode('abc'));
	var numSort = document.createElement('div');
	numSort.classList.add('sort');
	numSort.classList.add('num');
	numSort.appendChild(document.createTextNode('123'));
	var dateSort = document.createElement('div');
	dateSort.classList.add('sort');
	dateSort.classList.add('date');
	dateSort.appendChild(document.createTextNode('date'));
	var redSort = document.createElement('div');
	redSort.classList.add('red');
	// the sorting method gets the arrow
	var arrow = document.createElement('div');
	arrow.classList.add('arrow');
	var widgetSortBy = data.getAttribute('widget_sort-by');
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
	var sortByCounts = function () {
		var typeArr = [];
		for (var type in typeToIds) {
			typeArr.push([typeToIds[type].length, type]);
		}
		typeArr.sort(function (a, b) {
			return parseFloat(b[0]) - parseFloat(a[0]);
		});
		for (var i = 0; i < typeArr.length; i++) {
			typesAllArr[i] = typeArr[i][1];
		}
		var tagArr = [];
		for (var tag in tagToIds) {
			tagArr.push([tagToIds[tag].length, tag]);
		}
		tagArr.sort(function (a, b) {
			return parseFloat(b[0]) - parseFloat(a[0]);
		});
		for (i = 0; i < tagArr.length; i++) {
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
	var sortBy = function () {
		var data = document.getElementById('mass_post_features-plugin_data');
		data.setAttribute(
			'widget_sort-by',
			this.getAttribute('widget_sort-by')
		);
		populateSelectByWidget();
	};
	var reSte = typesAllArr.indexOf('private');
	if (reSte !== -1) {
		typesAllArr.splice(reSte, 1);
		typesAllArr.unshift('private');
	}
	var reOthr = typesAllArr.indexOf('reblog-other');
	if (reOthr !== -1) {
		typesAllArr.splice(reOthr, 1);
		typesAllArr.unshift('reblog-other');
	}
	var reSelf = typesAllArr.indexOf('reblog-self');
	if (reSelf !== -1) {
		typesAllArr.splice(reSelf, 1);
		typesAllArr.unshift('reblog-self');
	}
	var reOrgi = typesAllArr.indexOf('original');
	if (reOrgi !== -1) {
		typesAllArr.splice(reOrgi, 1);
		typesAllArr.unshift('original');
	}
	// ^ the last shall be first
	var inputFocus = function () {
		var data = document.getElementById('mass_post_features-plugin_data');
		data.setAttribute('widget_first-focus', this.id);
	};
	var memValue = function () {
		var data = document.getElementById('mass_post_features-plugin_data');
		var alreadyHidden = data.classList.contains(
			'some-posts-already-hidden'
		);
		var sb;
		var s;
		if (this.id === 'uncheck') {
			s = document.getElementById('select_button');
			sb = s.firstChild;
			sb.innerHTML = this.checked ? 'UnSelect' : 'Select';
		}
		if (this.id === 'show-only') {
			s = document.getElementById('select_button');
			sb = s.firstChild;
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
	var memAndRePopulate = function () {
		var ante = document.getElementById(this.getAttribute('anti'));
		var data = document.getElementById('mass_post_features-plugin_data');
		var href = document.location.href.split(/[\/\?&#=]+/g);
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
	var scrollingPart = document.createElement('div');
	scrollingPart.classList.add('overflow-auto');
	scrollingPart.id = 'widget_scrolling_part';
	widget.appendChild(scrollingPart);
	// the types / tags rows begin
	var div1 = document.createElement('div');
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
	var wsp = document.getElementById('widget_scrolling_part');
	wsp.appendChild(div1);
	// firstly, add some integral buttons that need to go first
	var ltgtInput = document.createElement('input');
	ltgtInput.addEventListener('focus', inputFocus);
	ltgtInput.id = 'hide-ltgt-than-tags';
	ltgtInput.type = 'number';
	ltgtInput.addEventListener('change', function () {
		var data = document.getElementById('mass_post_features-plugin_data');
		data.setAttribute('hide-ltgt-than-tags', this.value);
		var gtl = document.getElementById('gt_input');
		var ltl = document.getElementById('lt_input');
	});
	ltgtInput.value = parseFloat(data.getAttribute('hide-ltgt-than-tags'));
	var lt = document.createElement('input');
	lt.type = 'checkbox';
	lt.id = 'lt_input';
	lt.setAttribute('anti', 'gt_input');
	var ltlabel = document.createElement('label');
	ltlabel.setAttribute('for', 'lt_input');
	ltlabel.appendChild(document.createTextNode('Less Than'));
	var gt = document.createElement('input');
	gt.type = 'checkbox';
	gt.id = 'gt_input';
	gt.setAttribute('anti', 'lt_input');
	var gtlabel = document.createElement('label');
	gtlabel.setAttribute('for', 'gt_input');
	gtlabel.appendChild(document.createTextNode('More Than'));
	lt.checked = data.classList.contains('lt_input');
	gt.checked = data.classList.contains('gt_input');
	var hider = butt('Hide');
	hider.setAttribute('title', 'Hide/Show');
	hider.addEventListener('click', function () {
		populateSelectByWidget();
	});
	var acheck = butt('Clear');
	acheck.firstChild.innerHTML = 'UnCheck';
	acheck.setAttribute('title', 'Uncheck All');
	acheck.addEventListener('click', function () {
		var ch = new CustomEvent('change');
		var wgt = document.getElementById('select-by_widget');
		var check = wgt.getElementsByTagName('input');
		for (var i = 0; i < check.length; i++) {
			if (
				check[i].getAttribute('type') === 'checkbox' &&
				check[i].checked
			) {
				check[i].checked = false;
				check[i].dispatchEvent(ch);
			} //else {
			//TODO ??
			//}
		}
		populateSelectByWidget();
	});
	var ltgtContainer = document.createElement('div');
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
	var count;
	var countOver = document.getElementById('hide-ltgt-than-tags').value;
	// this boolean says to check post counts, to hide
	var lti = document.getElementById('lt_input');
	var gti = document.getElementById('gt_input');
	var postTypeTagHiddenCount = 0;
	var alreadyHidden = data.classList.contains('some-posts-already-hidden');
	var visibleIdsAllArr = JSON.parse(
		data.getAttribute('data-visible_ids_all_arr')
	);
	// start the types with note count rows
	var ltrow = widgetRow(
		'notes-less-than',
		'0',
		1,
		svgForType.notes.cloneNode(true)
	);
	ltrow.getElementsByClassName('input_not')[0].disabled = true;
	ltrow.getElementsByClassName('not')[0].classList.add('disabled');
	var gtrow = widgetRow(
		'notes-more-than',
		'0',
		1,
		svgForType.notes.cloneNode(true)
	);
	gtrow.getElementsByClassName('input_not')[0].disabled = true;
	gtrow.getElementsByClassName('not')[0].classList.add('disabled');
	var ltnumber = document.createElement('input');
	ltnumber.type = 'number';
	// input focus, remembers focus, for constant DOM rebuild
	ltnumber.addEventListener('focus', inputFocus);
	var gtnumber = document.createElement('input');
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
	var quickInput = new CustomEvent('input');
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
	var div2 = document.createElement('div');
	div2.classList.add('tags_title');
	var newCount;
	var id;
	var l;
	for (var i = 0; i < typesAllArr.length; i++) {
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
	for (i = 0; i < tagsAllArr.length; i++) {
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
	var wigTB = document.getElementById('widget-top-buttons');
	var redTB = wigTB.getElementsByClassName('red')[0];
	if (postTypeTagHiddenCount !== 0) {
		redTB.innerHTML = postTypeTagHiddenCount + ' rows hidden';
	} else {
		wigTB.removeChild(redTB);
	}
	var re = butt('List');
	re.setAttribute('title', 'Refresh Tags/Type List...');
	re.firstChild.innerHTML = 'Refresh';
	re.addEventListener('click', function () {
		var data = document.getElementById('mass_post_features-plugin_data');
		var wsp = document.getElementById('widget_scrolling_part');
		data.setAttribute('widget_scroll-top', wsp.scrollTop);
		// refresh the tag select by widget
		document.getElementById('lt_input').checked = false;
		document.getElementById('gt_input').checked = false;
		data.classList.remove('lt_input');
		data.classList.remove('gt_input');
		populateSelectByWidget();
	});
	var cancel = butt('Cancel1');
	cancel.firstChild.innerHTML = '&#x274C;';
	cancel.setAttribute('title', 'Cancel and Close Widget...');
	cancel.addEventListener('click', function () {
		var data = document.getElementById('mass_post_features-plugin_data');
		var pick = document.getElementsByClassName('picked');
		while (pick.length > 0) {
			pick[0].classList.remove('picked');
		}
		var wsp = document.getElementById('widget_scrolling_part');
		data.setAttribute('widget_scroll-top', wsp.scrollTop);
		document.getElementById('select-by').checked = false;
	});
	var needle = parseFloat(data.getAttribute('data-select-by_needle'));
	var selecto = butt('Select'); // this is the select-by/show-by button
	if (data.classList.contains('show-only')) {
		selecto.firstChild.innerHTML = alreadyHidden ? 'ShowAll' : 'Hide=!X';
	} else if (needle > 0 && !data.classList.contains('uncheck')) {
		selecto.firstChild.innerHTML = '100more';
	}
	// "select by tag" "select by type"
	selecto.addEventListener('click', function () {
		var data = document.getElementById('mass_post_features-plugin_data');
		var limit = 100; // tumblr limit, for classic mass tag api
		var needle = parseFloat(data.getAttribute('data-select-by_needle'));
		var s = document.getElementById('select_button');
		var sb = s.firstChild;
		// Mass Post Features v3 by benign-mx (me) Jake Jilg
		// oh wait. I don't need this^ anymore... :) sorry...
		precountTheSelection();
		// continued from this^ function @ var precountTheSelection
		var toSelect = JSON.parse(data.getAttribute('data-to-select'));
		var idsAllArr = JSON.parse(data.getAttribute('data-ids_all_arr'));
		var alreadyHidden = data.classList.contains(
			'some-posts-already-hidden'
		);
		var visibleIdsAllArr = JSON.parse(
			data.getAttribute('data-visible_ids_all_arr')
		);
		var hl;
		var un = data.classList.contains('uncheck');
		var regularSelect = !data.classList.contains('show-only');
		// and finally select some posts
		var i = 0;
		var id;
		var hlBrick;
		hl = document.getElementsByClassName('highlighted');
		var needleBefore = needle;
		var selectedCount = 0;
		if (regularSelect) {
			while (hl.length > 0 && needle !== 0) {
				highlightBrick(hl[0], 0);
			}
			for (i = needle; i < toSelect.length; i++) {
				hlBrick = document.getElementById('post_' + toSelect[i]);
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
			var needRebuild = false;
			var brick;
			if (!alreadyHidden) {
				sb.innerHTML = 'ShowAll';
				s.disabled = false;
				data.classList.add('some-posts-already-hidden');
				for (i = 0; i < idsAllArr.length; i++) {
					id = idsAllArr[i];
					brick = document.getElementById('post_' + id);
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
				var dn = document.getElementsByClassName('display-none');
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
	var unlabel = document.createElement('label');
	var uncheck = document.createElement('input');
	uncheck.type = 'checkbox';
	uncheck.id = 'uncheck';
	uncheck.addEventListener('change', memValue);
	if (data.classList.contains('uncheck')) {
		uncheck.checked = true;
	}
	unlabel.setAttribute('for', 'uncheck');
	unlabel.appendChild(document.createTextNode('Un'));
	var h1 = document.createElement('div');
	var shoLabel = document.createElement('label');
	var shoInput = document.createElement('input');
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
	var innerSpan = document.createElement('span');
	innerSpan.appendChild(document.createTextNode('Select'));
	var countSpan = document.createElement('span');
	countSpan.classList.add('preselect-count');
	countSpan.appendChild(document.createTextNode('(x0)'));
	countSpan.setAttribute('title', 'Selecting X Many...');
	innerSpan.appendChild(countSpan);
	h1.appendChild(innerSpan);
	// refocus number inputs
	var ff = document.getElementById(widgetFirstFocus);
	ff.focus();
	// all elements added, go back down/up scrollTop
	wsp.scrollTo(0, parseFloat(data.getAttribute('widget_scroll-top')));
	// lastly, the title element textNode
	widget.appendChild(h1);
	precountTheSelection();
};
var getResponseText = function (url, read, header) {
	var post = undefined;
	if (typeof url === 'object') {
		post = url.post;
		url = url.url;
		// this ^ twist, maybe not elegant?
	}
	var get = 'GET';
	if (
		// special URLs, make POST
		'/svc/secure_form_key' === url ||
		'/svc/post/update' === url.split(/\?/)[0] ||
		'/svc/post/upload_photo' === url.split(/\?/)[0] ||
		'/svc/post/upload_text_image' === url.split(/\?/)[0] ||
		('customize_api' === url.split('/')[1] && typeof post !== 'undefined')
	) {
		get = 'POST';
	}
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (
			this.readyState == 4 &&
			this.status == 200 &&
			typeof this.responseText !== 'undefined'
		) {
			read(
				'/svc/secure_form_key' === url
					? {
							// we need the puppies, to make a new post
							puppies: this.getResponseHeader(
								'x-tumblr-secure-form-key'
							),
							kittens: /* this.getAllResponseHeaders() */ 0
					  } // Idk what kittens is, but it happens after success
					: this.responseText
			);
		}
		if (this.readyState == 4 && this.status != 200) {
			if (typeof responseText !== 'undefined') {
				read('{"response":{"is_friend":false}}');
			} else {
				read(400);
			}
		}
	};
	xhttp.open(get, url, true);
	xhttp.onerror = function () {
		read(400);
	};
	// headers only after open and only before send
	if (typeof header !== 'undefined') {
		for (var i = 0; i < header.length; i++) {
			xhttp.setRequestHeader(header[i][0], header[i][1]);
		}
	}
	if (get === 'GET') {
		xhttp.send();
	} else {
		xhttp.send(post);
	}
};

// add a bouncey reblog or heart
var reblogAnimation = function (id) {
	var cb = document.getElementById('post_' + id);
	var bigReblog = svgForType['reblog-self'].cloneNode(true);
	bigReblog.setAttribute('fill', '#7EFF29');
	bigReblog.setAttribute('width', '125');
	bigReblog.setAttribute('height', '125');
	bigReblog.classList.add('big-reblog');
	bigReblog.addEventListener('mousedown', function () {
		this.parentNode.removeChild(this);
	});
	setTimeout(function () {
		bigReblog.parentNode.removeChild(bigReblog);
	}, 1700);
	cb.appendChild(bigReblog);
};
var newPostNameDrop = function () {
	if (blogDropping) {
		return;
	}
	blogDropping = true;
	var highlighted = document.getElementsByClassName('highlighted');
	var portraits = document.createElement('canvas');
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	var pCtx = portraits.getContext('2d');
	var img;
	var l = 0;
	var t = 0;
	var w = 5;
	var d;
	portraits.width = w * 128;
	portraits.height = Math.ceil(highlighted.length / w) * 128;
	var blogList = [];
	for (var i = 0; i < highlighted.length; i++) {
		img = highlighted[i].getElementsByClassName('follower-avatar')[0];
		blogList.push(highlighted[i].getAttribute('data-name'));
		ctx.drawImage(img, 0, 0);
		pCtx.drawImage(canvas, l * 128, t * 128);
		l++;
		if (l >= w) {
			l = 0;
			t++;
		}
	}
	portraits.toBlob(function (blob) {
		var formData = new FormData();
		formData.append('image', blob, 'image' + new Date().getTime() + '.png');
		var apiKey = data.getAttribute('data-x-tumblr-form-key');
		getResponseText(
			{
				url:
					'/svc/post/upload_text_image?post_id=undefined&channel=' +
					name,
				post: formData
			},
			function (re) {
				api = JSON.parse(re);
				var img = new Image();
				var rawWidth = portraits.width;
				var rawHeight = portraits.height;
				if (
					typeof api !== 'undefined' &&
					typeof api[0] !== 'undefined' &&
					typeof api[0].url !== 'undefined'
				) {
					img.src = api[0].url;
					rawWidth = api[0].raw_width;
					rawHeight = api[0].raw_height;
				} else {
					img.src = portraits.toDataURL();
				} // whether we get the URL or not, the show must go on
				var mediaHolder = document.createElement('div');
				mediaHolder.classList.add('media-holder');
				mediaHolder.classList.add('media-holder-draggable');
				mediaHolder.classList.add('media-holder-figure');
				mediaHolder.setAttribute('contenteditable', 'false');
				mediaHolder.setAttribute('draggable', 'true');
				mediaHolder.style.display = 'block';
				var mediaFigure = document.createElement('figure');
				mediaFigure.setAttribute('data-orig-width', rawWidth);
				mediaFigure.setAttribute('data-orig-height', rawHeight);
				img.setAttribute('data-orig-width', rawWidth);
				img.setAttribute('data-orig-height', rawHeight);
				var mediaRemove = document.createElement('div');
				mediaRemove.classList.add('media-button');
				mediaRemove.classList.add('icon_close');
				mediaRemove.classList.add('media-killer');
				mediaFigure.appendChild(img);
				mediaHolder.appendChild(mediaFigure);
				mediaHolder.appendChild(mediaRemove);
				var iframe2 = document.createElement('iframe');
				iframe2.id = 'neue_post_form-iframe';
				iframe2.addEventListener('load', function () {
					blogDropping = false;
					var posterPending = true;
					var titlePending = true;
					// this checks if done editing/closed
					var reminisce2 = setInterval(function () {
						var w = document.getElementById(
							'neue_post_form-iframe'
						).contentWindow;
						var p =
							w.document.getElementsByClassName(
								'post-forms-modal'
							)[0];
						var span;
						var ul;
						var br;
						var a;
						var editor =
							w.document.getElementsByClassName(
								'editor-richtext'
							);
						var title =
							w.document.getElementsByClassName(
								'editor-plaintext'
							);
						if (editor.length > 0 && posterPending) {
							span = document.createElement('p'); // it was going to be a span
							span.appendChild(
								document.createTextNode(
									'I want to give a shout out to these awesome blags!'
								)
							);
							ul = document.createElement('p'); // and a ul, but the links
							for (var i = 0; i < blogList.length; i++) {
								br = document.createElement('br');
								ul.appendChild(
									document.createTextNode(
										' @' + blogList[i] + ' '
									)
								);
								ul.appendChild(br); // didn't refer popovers for some reason
							}
							posterPending = false;
							editor[0].appendChild(span);
							editor[0].appendChild(mediaHolder);
							editor[0].appendChild(ul);
							editor[0].focus();
							editor[0].dispatchEvent(new Event('input'));
						}
						if (editor.length > 0 && titlePending) {
							titlePending = false;
							span = document.createElement('span');
							span.appendChild(
								document.createTextNode('Blog Name Drop')
							);
							title[0].appendChild(span);
						}
						if (
							typeof p === 'undefined' ||
							(typeof p !== 'undefined' && p.length === 0) ||
							(typeof p !== 'undefined' &&
								(w
									.getComputedStyle(p)
									.getPropertyValue('display') === 'none' ||
									w
										.getComputedStyle(p)
										.getPropertyValue('opacity')
										.toString() === '0'))
						) {
							clearInterval(reminisce2);
							document.body.removeChild(
								document.getElementById('neue_post_form-iframe')
							);
						}
					}, 500);
				});
				iframe2.src =
					'https://www.tumblr.com/neue_web/iframe/blog/' +
					name +
					'/new/text';
				iframe2.setAttribute('scrolling', 'no');
				iframe2.setAttribute('frameborder', '0');
				iframe2.setAttribute('title', 'Post forms');
				document.body.appendChild(iframe2);
			},
			[
				['X-tumblr-form-key', apiKey],
				['X-Requested-With', 'XMLHttpRequest']
			]
		);
	});
};
// this ^ creates a post template with selected blogs

// this function follows and unfollows
var followOrUnFollow = function (liked, info, button, repeat) {
	var data = document.getElementById('mass_post_features-plugin_data');
	var typeToIds = JSON.parse(data.getAttribute('data-type_to_ids'));
	var idToTypes = JSON.parse(data.getAttribute('data-id_to_types'));
	var apiKey = data.getAttribute('data-x-tumblr-form-key');
	var v2url = liked ? '/svc/unfollow' : '/svc/follow';
	var xhttp = new XMLHttpRequest();
	var whiteHeart;
	xhttp.onreadystatechange = function () {
		var href = document.location.href.split(/[\/\?&#=]+/g);
		if (this.readyState == 4 && this.status == 200) {
			data.setAttribute(
				'data-unstable-next-href',
				parseInt(data.getAttribute('data-unstable-next-href')) +
					(liked ? -1 : 1)
			);
			button.innerHTML = '';
			var cb = document.getElementById(
				'post_' + button.getAttribute('data-id')
			);
			if (liked) {
				if (button.classList.contains('return-to-secondary')) {
					whiteHeart = svgForType.secondary.cloneNode(true);
					whiteHeart.setAttribute('fill', '#fff');
					button.setAttribute(
						'title',
						'UnFollowed Secondary. ' +
							'It will be gone after you leave.'
					);
				} else {
					whiteHeart = svgForType.notes.cloneNode(true);
					whiteHeart.setAttribute('fill', '#fff');
					button.setAttribute(
						'title',
						href[5] === 'follows'
							? 'You no longer follow this blog.' +
									'It will be gone after you leave.'
							: 'Click to Follow this Follower back :)'
					);
				}
				button.classList.remove('liked');
				button.classList.add('not-liked');
				cb.classList.remove('fellow');
				idToTypes[button.getAttribute('data-id')] = 'friendly';
				typeToIds['mutual'].splice(
					typeToIds['mutual'].indexOf(button.getAttribute('data-id')),
					1
				);
				typeToIds['friendly'].push(button.getAttribute('data-id'));
			} else {
				idToTypes[button.getAttribute('data-id')] = 'mutual';
				typeToIds['friendly'].splice(
					typeToIds['friendly'].indexOf(
						button.getAttribute('data-id')
					),
					1
				);
				typeToIds['mutual'].push(button.getAttribute('data-id'));
				if (button.classList.contains('return-to-secondary')) {
					whiteHeart = svgForType.secondary.cloneNode(true);
					whiteHeart.setAttribute('fill', '#9af');
					button.setAttribute(
						'title',
						'Secondary Blog:\n' +
							'Only primaries can follow you back.' +
							'\n(click to unfollow)'
					);
				} else {
					whiteHeart = svgForType.liked.cloneNode(true);
					whiteHeart.setAttribute('fill', '#56f');
					button.setAttribute('title', 'Mutual (Click to UnFollow)');
				}
				button.classList.add('liked');
				button.classList.remove('not-liked');
				// graphical aftertaste for reblog/follow
				var bigHeart = svgForType.liked.cloneNode(true);
				bigHeart.setAttribute('fill', '#56f');
				bigHeart.setAttribute('width', '125');
				bigHeart.setAttribute('height', '125');
				bigHeart.classList.add('big-heart');
				setTimeout(function () {
					bigHeart.parentNode.removeChild(bigHeart);
				}, 1700);
				cb.appendChild(bigHeart);
				button.classList.add('new-liked');
			} // liked means followed here; this saves css space
			button.appendChild(whiteHeart);
			button.classList.remove('clicked');
			var erq = document.getElementsByClassName('edit-reblog-queue');
			if (typeof repeat !== 'undefined' && erq.length > 0) {
				erq[erq.length - 1].classList.remove('edit-reblog-queue');
				repeat();
			}
			data.setAttribute('data-id_to_types', JSON.stringify(idToTypes));
			data.setAttribute('data-type_to_ids', JSON.stringify(typeToIds));
		}
	};
	xhttp.open('POST', v2url, true);
	// headers only after open and only before send
	xhttp.setRequestHeader('X-tumblr-form-key', apiKey);
	xhttp.setRequestHeader(
		'Content-Type',
		'application/x-www-form-urlencoded; charset=UTF-8'
	);
	xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhttp.send(info);
};
var followOrUnfollowSelected = function () {
	var erq = document.getElementsByClassName('edit-reblog-queue');
	var hl = document.getElementsByClassName('highlighted');
	while (erq.length < hl.length) {
		hl[erq.length].classList.add('edit-reblog-queue');
	}
	var repeat = function () {
		var erq = document.getElementsByClassName('edit-reblog-queue');
		var key = erq[erq.length - 1].getAttribute('data-follower-key');
		var button = document.getElementById('follow_heart_' + key);
		var info = button.getAttribute('data-like-info');
		var liked =
			document
				.getElementById('unfollow_button')
				.getAttribute('data-follow') !== 'true';
		followOrUnFollow(liked, info, button, repeat);
	};
	repeat(); // and follow/unfollow
};
// this v runs on a button ^ this runs 1 or many buttons
var followOrUnFollowButton = function (e) {
	e.cancelBubble = true;
	e.stopPropagation();
	e.preventDefault();
	if (this.classList.contains('clicked')) {
		return;
	}
	this.classList.remove('new-liked');
	this.classList.add('clicked');
	var button = this;
	var liked = this.classList.contains('liked');
	var info = this.getAttribute('data-like-info');
	followOrUnFollow(liked, info, button);
};
// fun :)
var stopToFindMutuals = function (
	me,
	them,
	url,
	key,
	link3,
	followerBrick,
	finished
) {
	// since the following API has no followback property...
	// the followers API has a followback propery tho; I guess
	// it's only because we know they already follow you...
	followerBrick.classList.add('following');
	// also ^ since these are your follows/following
	var data = document.getElementById('mass_post_features-plugin_data');
	var tblg = JSON.parse(data.getAttribute('data-tumblelogs'));
	var typeToIds = JSON.parse(data.getAttribute('data-type_to_ids'));
	var idToTypes = JSON.parse(data.getAttribute('data-id_to_types'));
	if (typeof typeToIds['friendly'] === 'undefined') {
		typeToIds['friendly'] = [];
	}
	if (typeof typeToIds['mutual'] === 'undefined') {
		typeToIds['mutual'] = [];
	}
	if (typeof typeToIds['secondary'] === 'undefined') {
		typeToIds['secondary'] = [];
	}
	var apiKey = data.getAttribute('data-x-tumblr-form-key');
	var primary = data.getAttribute('data-primary-blog');
	getResponseText(
		'/svc/blog/followed_by?tumblelog=' + tblg[me] + '&query=' + them,
		function (re) {
			link3.classList.add('liked');
			// this ^ comes in for all blogs on this page, because we already follow
			var whiteHeart;
			if (re === 400) {
				// these fill the error console with
				// ajax err messages, but this is the Tumblr server's own
				// throw; I don't know how to stop it... try catch, doesn't
				// work for asynchronous...
				// regardless, it still works :D
				console.log(
					'/svc/blog/followed_by?tumblelog=' +
						tblg[me] +
						'&query=' +
						them +
						"\nSecondary blogs can't follow blogs. Error 400 is thrown when" +
						'\nthose do not exist in the mutual followers database.'
				);
				typeToIds['secondary'].push(key);
				idToTypes[key] = 'secondary';
				whiteHeart = svgForType.friendly.cloneNode(true);
				whiteHeart.setAttribute('fill', '#9af');
				link3.href = url;
				link3.setAttribute(
					'title',
					'Secondary Blog:\n' +
						'Only primaries can follow you back.' +
						'\n(click to unfollow)'
				);
				link3.classList.add('not-liked');
				link3.appendChild(whiteHeart);
				link3.classList.add('return-to-secondary');
				data.setAttribute(
					'data-id_to_types',
					JSON.stringify(idToTypes)
				);
				data.setAttribute(
					'data-type_to_ids',
					JSON.stringify(typeToIds)
				);
				link3.addEventListener('click', followOrUnFollowButton);
				followerBrick.classList.remove('missing-follows-info');
				setTimeout(finished, 40);
				return;
				// I use timeouts to slow it down on the repeat
				// checkIfFollowing seeIfFollowing etc. stuff
				// because when I leave the connection open too long
				// it makes more error 400s which are false errs
				// not to be confused with the true error 400s which
				// come from secondary blogs that can't follow you
			}
			var api = JSON.parse(re);
			if (
				typeof api !== 'undefined' &&
				typeof api.response !== 'undefined' &&
				typeof api.response.is_friend !== 'undefined'
			) {
				if (api.response.is_friend) {
					typeToIds['mutual'].push(key);
					followerBrick.classList.add('mutual');
					idToTypes[key] = 'mutual';
					whiteHeart = svgForType.liked.cloneNode(true);
					whiteHeart.setAttribute('fill', '#56f');
					link3.href = url + '#unfollow:' + tblg[me];
					link3.setAttribute(
						'title',
						'Mutual of ' +
							tblg[me] +
							' and more...' +
							'\n(Click to UnFollow)'
					);
					link3.appendChild(whiteHeart);
					data.setAttribute(
						'data-id_to_types',
						JSON.stringify(idToTypes)
					);
					data.setAttribute(
						'data-type_to_ids',
						JSON.stringify(typeToIds)
					);
					link3.addEventListener('click', followOrUnFollowButton);
					followerBrick.classList.remove('missing-follows-info');
					setTimeout(finished, 40);
					// mutual doesn't need to be retested again...
					// a friend is a friend, if they follow any
					// of your blogs
					return;
				} else {
					// not a 2ndary, but not a follower
					// see if following other blogs instead...?
					if (me >= tblg.length - 1) {
						// not following anyone; df just a friendly
						typeToIds['friendly'].push(key);
						idToTypes[key] = 'friendly';
						whiteHeart = svgForType.liked.cloneNode(true);
						whiteHeart.setAttribute('fill', '#56f');
						link3.href = url + '#unfollow:' + them;
						link3.setAttribute('title', 'Click to UnFollow');
						// these will all be unfollow buttons, because
						// we are following everybody on this page
						link3.classList.add('not-liked');
						link3.appendChild(whiteHeart);
						data.setAttribute(
							'data-id_to_types',
							JSON.stringify(idToTypes)
						);
						data.setAttribute(
							'data-type_to_ids',
							JSON.stringify(typeToIds)
						);
						link3.addEventListener('click', followOrUnFollowButton);
						followerBrick.classList.remove('missing-follows-info');
						setTimeout(finished, 40);
					} else {
						// we have more blogs to check
						setTimeout(function () {
							stopToFindMutuals(
								me + 1,
								them,
								url,
								key,
								link3,
								followerBrick,
								finished
							);
						}, 40);
					}
				}
			}
		}
	);
};
// this ^ checks if blogs you follow, follow back

// this v makes the snapshot saves to a theme page
var makeSnap = function (cat) {
	var href = document.location.href.split(/[\/\?&#=]+/g);
	var data = document.getElementById('mass_post_features-plugin_data');
	var fblg = JSON.parse(data.getAttribute('data-follow-blogs-all'));
	var mblg = JSON.parse(data.getAttribute('data-missing-blogs-all'));
	var nblg = JSON.parse(data.getAttribute('data-new-blogs-all'));
	var fblgTimestamp = JSON.parse(
		data.getAttribute('data-follow-blogs-all-updated')
	);
	var mblgTimestamp = JSON.parse(
		data.getAttribute('data-missing-blogs-all-updated')
	);
	var nblgTimestamp = JSON.parse(
		data.getAttribute('data-new-blogs-all-updated')
	);
	if (nblgTimestamp === 0) {
		nblgTimestamp = new Date().getTime();
	}
	if (mblgTimestamp === 0) {
		mblgTimestamp = new Date().getTime();
	}
	if (fblgTimestamp === 0) {
		fblgTimestamp = new Date().getTime();
	}
	var body = {
		missing: mblg,
		new: nblg,
		all: fblg,
		'all-ch': fblgTimestamp, // followers
		'new-ch': nblgTimestamp, // new followers
		'missing-ch': mblgTimestamp // missing followers
	};
	getResponseText(
		// this is SnapShot thing step #1
		'/customize/' + href[4],
		function (re2) {
			var div = document.createElement('div');
			div.innerHTML = re2 // parse the dom
				.replace(/<(\/?)script[^>]*>/g, '<$1flurb>') // no eval
				.replace(/<img/g, '<space'); // do not onload img tags
			var flurb = div.getElementsByTagName('flurb');
			var userFormKey = false;
			var secureFormKey = false;
			var i;
			var reg1 = /Tumblr._init.user_form_key\s?=\s?['"]([^'"]+)['"]/;
			var reg2 = /Tumblr._init.secure_form_key\s?=\s?['"]([^'"]+)['"]/;
			for (i = 0; i < flurb.length; i++) {
				if (flurb[i].innerHTML.match(reg1) !== null) {
					userFormKey = flurb[i].innerHTML.match(reg1)[1];
				}
				if (flurb[i].innerHTML.match(reg2) !== null) {
					secureFormKey = flurb[i].innerHTML.match(reg2)[1];
				}
			}
			if (secureFormKey === false || userFormKey === false) {
				return;
			}
			var dogTreat = {
				type: 'custom_layout',
				request_uri: '/mass-post-editor-snapshot-' + cat + '-data',
				native_uri: false,
				label: '',
				show_link: false,
				title: '',
				body: JSON.stringify(body),
				redirect_to: '',
				user_form_key: userFormKey, // kittens
				secure_form_key: secureFormKey // puppies
			};
			getResponseText(
				{
					// this is SnapShot thing step #2
					url: '/customize_api/blog/' + href[4] + '/pages',
					post: JSON.stringify(dogTreat)
				},
				function (re3) {
					// success
				},
				[
					// the prev request brought us some puppies :)
					['X-Requested-With', 'XMLHttpRequest'],
					['Content-Type', 'application/json'],
					['Accept', 'application/json, text/javascript, */*; q=0.01']
				]
			);
		},
		[['X-Requested-With', 'XMLHttpRequest']]
	);
};
// this ^ makes a snapshot

// this v reads the snapshot saves of a theme page
var readSnap = function (cat, old) {
	var href = document.location.href.split(/[\/\?&#=]+/g);
	var data = document.getElementById('mass_post_features-plugin_data');
	var fblg = JSON.parse(data.getAttribute('data-follow-blogs-all'));
	var mblg = JSON.parse(data.getAttribute('data-missing-blogs-all'));
	var nblg = JSON.parse(data.getAttribute('data-new-blogs-all'));
	var fblgTimestamp = JSON.parse(
		data.getAttribute('data-follow-blogs-all-updated')
	);
	var mblgTimestamp = JSON.parse(
		data.getAttribute('data-missing-blogs-all-updated')
	);
	var nblgTimestamp = JSON.parse(
		data.getAttribute('data-new-blogs-all-updated')
	);
	var snapBody = document.getElementById('snapshot-info_body');
	var bodyNew = {
		missing: mblg,
		new: nblg,
		all: fblg,
		'all-ch': fblgTimestamp, // followers
		'new-ch': nblgTimestamp, // new followers
		'missing-ch': mblgTimestamp // missing followers
	};
	getResponseText(
		{
			url: '/customize_api/blog/' + href[4] + '/pages',
			post: 'method=read&uri=/mass-post-editor-snapshot-' + cat + '-data'
		},
		function (re) {
			if (re === 400) {
				var h2 = document.createElement('h2');
				h2.appendChild(
					document.createTextNode(
						'There is no recorded snapshot prior, ' +
							'but one was just now made for future.'
					)
				);
				snapBody.appendChild(h2);
				// normally data changes would go here,
				// but there is no old data to compare to
				if (!old) {
					makeSnap(cat);
				}
				// ^ blank new snapshot
			} else if (typeof re === 'string') {
				var bodyOld = JSON.parse(JSON.parse(re).body);
				// 1 parse for object, +1 parse for its property
				var i;
				var blog;
				if (!old) {
					// first find new followers
					for (i = 0; i < bodyNew.all.length; i++) {
						blog = bodyNew.all[i];
						if (bodyOld.all.indexOf(blog) === -1) {
							bodyNew.new.push(blog);
						}
					}
					// then find missing followers
					for (i = 0; i < bodyOld.all.length; i++) {
						blog = bodyOld.all[i];
						if (bodyNew.all.indexOf(blog) === -1) {
							bodyNew.missing.push(blog);
						}
					}
					// now mind the new timestamps if any
					if (bodyNew.new.length > 0) {
						nblgTimestamp = new Date().getTime(); // new
						fblgTimestamp = new Date().getTime(); // all
					}
					if (bodyNew.missing.length > 0) {
						mblgTimestamp = new Date().getTime(); // missing
						fblgTimestamp = new Date().getTime(); // all
					}
					// tally the old with the new for record purposes
					for (i = 0; i < bodyNew.new.length; i++) {
						blog = bodyNew.new[i];
						if (bodyOld.new.indexOf(blog) === -1) {
							bodyOld.new.push(blog);
						}
					}
					for (i = 0; i < bodyNew.missing.length; i++) {
						blog = bodyNew.missing[i];
						if (bodyOld.missing.indexOf(blog) === -1) {
							bodyOld.missing.push(blog);
						}
					}
				}
				// sit down and show the results
				var snapCell1 = document.createElement('div');
				var snapCell2 = document.createElement('div');
				snapCell1.id = 'missing-blogs';
				snapCell2.id = 'new-blogs';
				var title1 = document.createElement('h2');
				var title2 = document.createElement('h2');
				title1.appendChild(document.createTextNode('Missing Blogs'));
				title2.appendChild(document.createTextNode('New Blogs'));
				snapBody.appendChild(title1);
				snapBody.appendChild(title2);
				// I'm running out of dexterity for making variable names
				var toTheBuns = function () {
					data.setAttribute(
						this.getAttribute('data-representing'),
						JSON.stringify([]) // this clears only
					);
					var a = document.getElementById(
						this.getAttribute('data-links-id')
					).children;
					while (a.length > 0) {
						a[0].parentNode.removeChild(a[0]);
					}
					// "this parent node remove child this" :)
					this.parentNode.removeChild(this);
					// ^ what I said to my parents when I realized the
					// meaning of life is only a constructed meaning....
					makeSnap(cat);
				};
				var a;
				var leftBuns = butt('Forget1');
				leftBuns.setAttribute(
					'title',
					'Forget/Clear missing blogs from database.'
				);
				leftBuns.setAttribute(
					'data-representing',
					'data-missing-blogs-all'
				);
				leftBuns.setAttribute('data-links-id', 'missing-blogs');
				leftBuns.addEventListener('click', toTheBuns);
				var rightBuns = butt('Forget2');
				rightBuns.setAttribute(
					'title',
					'Forget/Clear new blogs from database.'
				);
				rightBuns.setAttribute(
					'data-representing',
					'data-new-blogs-all'
				);
				rightBuns.setAttribute('data-links-id', 'new-blogs');
				rightBuns.addEventListener('click', toTheBuns);
				for (i = 0; i < bodyOld.new.length; i++) {
					a = document.createElement('a');
					a.href =
						'https://www.tumblr.com/dashboard/blog/' +
						bodyOld.new[i];
					a.appendChild(document.createTextNode(bodyOld.new[i]));
					a.target = '_blank';
					a.setAttribute(
						'title',
						bodyOld.new[i] + ' is a new blag :)'
					);
					snapCell2.appendChild(a);
				}
				for (i = 0; i < bodyOld.missing.length; i++) {
					a = document.createElement('a');
					a.href = 'https://' + bodyOld.missing[i] + '.tumblr.com/';
					a.appendChild(document.createTextNode(bodyOld.missing[i]));
					a.target = '_blank';
					a.setAttribute(
						'title',
						bodyOld.missing[i] +
							' is missing, but mayhaps changed their name'
					);
					snapCell1.appendChild(a);
				}
				snapBody.appendChild(snapCell1);
				snapBody.appendChild(snapCell2);
				// but only if there is any news when compared to the past
				if (bodyOld.missing.length > 0 && !old) {
					snapBody.appendChild(leftBuns);
				}
				if (bodyOld.new.length > 0 && !old) {
					snapBody.appendChild(rightBuns);
				}
				if (!old) {
					data.setAttribute(
						'data-follow-blogs-all',
						JSON.stringify(bodyNew.all) // this adds or subtracts
					);
					data.setAttribute(
						'data-new-blogs-all',
						JSON.stringify(bodyOld.new) // this adds only
					);
					data.setAttribute(
						'data-missing-blogs-all',
						JSON.stringify(bodyOld.missing) // this adds only
					);
					data.setAttribute(
						'data-follow-blogs-all-updated',
						JSON.stringify(fblgTimestamp)
					);
					data.setAttribute(
						'data-new-blogs-all-updated',
						JSON.stringify(nblgTimestamp)
					);
					data.setAttribute(
						'data-missing-blogs-all-updated',
						JSON.stringify(mblgTimestamp)
					);
					// all this ^ data
					// goes v into this database
					makeSnap(cat);
				}
			}
		},
		[
			['Accept', 'application/json, text/javascript, */*; q=0.01'],
			['X-Requested-With', 'XMLHttpRequest'],
			['Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8']
		]
	);
};
// this ^ reads the snapshot saves of a theme page

// this processes the snapshots
var snapShotFollowers = function (cat) {
	if (document.getElementsByClassName('im-ready').length === 0) {
		if (document.getElementById('snapshot-info') !== null) {
			document
				.getElementById('snapshot-info')
				.parentNode.classList.add('im-ready');
			document
				.getElementById('snapshot-load-gif')
				.parentNode.removeChild(
					document.getElementById('snapshot-load-gif')
				);
		}
		document.getElementById('snapshot-info_body').innerHTML = '';
		readSnap(cat, false);
	}
};
var loadFollowers = function (nextHref) {
	var data = document.getElementById('mass_post_features-plugin_data');
	var href = document.location.href.split(/[\/\?&#=]+/g);
	var unstableOffset = data.getAttribute('data-unstable-next-href');
	if (
		href[5] === 'follows' &&
		unstableOffset !== '0' &&
		typeof nextHref !== 'undefined' &&
		nextHref.match(/offset=\d+/) !== null
	) {
		nextHref = nextHref.replace(/offset=\d+/, function (m) {
			return (
				'offset=' +
				(parseInt(m.replace(/\D+/g, '')) + parseInt(unstableOffset))
			);
		});
	}
	if (document.getElementById('followers-css') === null) {
		var flrCss = document.createElement('style');
		flrCss.type = 'text/css';
		flrCss.id = 'followers-css';
		flrCss.appendChild(
			document.createTextNode(
				function () {
					/*
#select-by_widget {
height: 190px;
}
*/
				}
					.toString()
					.slice(16, -3)
			)
		);
		document.head.appendChild(flrCss);
		var npfrag = document.createDocumentFragment();
		npfrag.appendChild(svgForType.happy.cloneNode(true));
		npfrag.appendChild(document.createTextNode('Name Drop'));
		var nameDrop_chrome = newChromeButton('namedrop', npfrag, false);
		nameDrop_chrome.setAttribute(
			'title',
			'Give a shout out to your (selected) closest ' +
				'followers, to show your love. <3'
		);
		nameDrop_chrome
			.getElementsByTagName('button')[0]
			.addEventListener('click', newPostNameDrop);
		nameDrop_chrome
			.getElementsByTagName('button')[0]
			.classList.add('disable-when-none-selected');
		nameDrop_chrome.getElementsByTagName('button')[0].disabled = true;
		en.appendChild(nameDrop_chrome);
		var uffrag = document.createDocumentFragment();
		uffrag.appendChild(svgForType.sad.cloneNode(true));
		var unfollowSpan = document.createElement('span');
		unfollowSpan.appendChild(document.createTextNode('Unfollow'));
		uffrag.appendChild(unfollowSpan);
		var unfollow_chrome = newChromeButton('unfollow', uffrag, false);
		unfollow_chrome.setAttribute('title', 'Unfollow :(');
		unfollow_chrome
			.getElementsByTagName('button')[0]
			.addEventListener('click', followOrUnfollowSelected);
		unfollow_chrome
			.getElementsByTagName('button')[0]
			.classList.add('disable-when-none-selected');
		unfollow_chrome.getElementsByTagName('button')[0].disabled = true;
		en.appendChild(unfollow_chrome);
		var snapshotInfo_frag = document.createDocumentFragment();
		snapshotInfo_frag.appendChild(svgForType.image.cloneNode(true));
		snapshotInfo_frag.appendChild(document.createTextNode('Snapshot Info'));
		var snapshotInfo_chrome = newChromeButton(
			'snapshot-info',
			snapshotInfo_frag,
			true
		);
		var snapshotInfo_widget =
			snapshotInfo_chrome.getElementsByClassName('widget')[0];
		var snapshotInfo_input =
			snapshotInfo_chrome.getElementsByTagName('input')[0];
		snapshotInfo_widget.style.top = '50px';
		snapshotInfo_widget.style.right = '90px';
		var snapshotInfo_body = document.createElement('div');
		snapshotInfo_body.id = 'snapshot-info_body';
		var snapshot_h2 = document.createElement('h1'); // I changes the nodeName
		snapshot_h2.appendChild(document.createTextNode('Snapshot Info'));
		var snapShotLoadGif = new Image();
		snapShotLoadGif.src =
			'https://assets.tumblr.com/images/loading_ddd.gif';
		var snapshotInfo_info = document.createElement('div');
		snapshotInfo_info.id = 'snapshot-load-gif';
		snapshot_h2.appendChild(snapShotLoadGif);
		snapshotInfo_body.appendChild(snapshot_h2);
		snapshotInfo_info.appendChild(document.createTextNode('loading...'));
		snapshotInfo_info.setAttribute(
			'title',
			'This feature is might not be possible for super huge blog lists.'
		);
		snapshotInfo_body.appendChild(snapshotInfo_info);
		snapshotInfo_widget.appendChild(snapshotInfo_body);
		snapshotInfo_chrome.setAttribute('title', 'SnapShot Options');
		en.appendChild(snapshotInfo_chrome);
		readSnap(href[5], true);
	}
	var idsAllArr = JSON.parse(data.getAttribute('data-ids_all_arr'));
	var typesAllArr = JSON.parse(data.getAttribute('data-types_all_arr'));
	var typeToIds = JSON.parse(data.getAttribute('data-type_to_ids'));
	var idToTypes = JSON.parse(data.getAttribute('data-id_to_types'));
	var tblg = JSON.parse(data.getAttribute('data-tumblelogs'));
	var fblg = JSON.parse(data.getAttribute('data-follow-blogs-all'));
	if (typeof typeToIds['friendly'] === 'undefined') {
		typeToIds['friendly'] = [];
	}
	if (typeof typeToIds['mutual'] === 'undefined') {
		typeToIds['mutual'] = [];
	}
	if (typeof typeToIds['secondary'] === 'undefined') {
		typeToIds['secondary'] = [];
	}
	if (typesAllArr.indexOf('mutual') === -1) {
		typesAllArr.push('mutual');
	}
	if (typesAllArr.indexOf('friendly') === -1) {
		typesAllArr.push('friendly');
	}
	if (typesAllArr.indexOf('secondary') === -1 && href[5] === 'follows') {
		typesAllArr.push('secondary');
	}
	var ritpm = document.getElementsByClassName('remove-in-third-party-mode');
	while (ritpm.length > 0) {
		ritpm[0].parentNode.removeChild(ritpm[0]);
	}
	var csrfToken = data.getAttribute('data-csrf-token');
	var token = data.getAttribute('data-api-token');
	var apiKey = data.getAttribute('data-x-tumblr-form-key');
	var hasPrimary = JSON.parse(data.getAttribute('data-primary-known'));
	var followersLoading = JSON.parse(
		data.getAttribute('data-followers-loading')
	);
	if (
		// this was firing twice, because I have to
		// check for two x headers twice...
		followersLoading
	) {
		return;
	}
	if (token === '0' || !hasPrimary) {
		return;
	}
	data.setAttribute('data-followers-loading', 'true');
	var primary = data.getAttribute('data-primary-blog');
	var isFollowersPage = href[5] === 'followers';
	var isFollowsPage = href[5] === 'follows';
	data.classList.add('fetching-from-tumblr-api');
	var mo = [
		'Jan ',
		'Feb ',
		'Mar ',
		'Apr ',
		'May ',
		'Jun ',
		'Jul ',
		'Aug ',
		'Sep ',
		'Oct ',
		'Nov ',
		'Dec '
	];
	getResponseText(
		typeof nextHref !== 'undefined'
			? '/api' + nextHref
			: isFollowersPage
			? '/api/v2/blog/' + name + '/followers?limit=50'
			: isFollowsPage
			? '/api/v2/blog/' + primary + '/following?limit=5'
			: '/api/v2/blog/' + name + '/following?limit=5',
		function (re) {
			data.classList.remove('fetching-from-tumblr-api');
			var api = re;
			var ing = isFollowsPage;
			if (typeof api === 'string') {
				api = JSON.parse(re);
			}
			if (
				(!ing &&
					typeof api !== 'undefined' &&
					typeof api.response !== 'undefined' &&
					typeof api.response.users !== 'undefined') ||
				(ing &&
					typeof api !== 'undefined' &&
					typeof api.response !== 'undefined' &&
					typeof api.response.blogs !== 'undefined')
			) {
				if (!lcontent.classList.contains('albino')) {
					lcontent.classList.add('albino');
				} // this ^ is to clear away the vanilla editor posts,
				// which do not have our extra buttons,
				// but it seems to run on my other things too :/ oops
				if (lcontent.children.length === 0) {
					var followerHeader = document.createElement('div');
					var dt = new Date();
					followerHeader.id = 'who-follows-who';
					dt.setYear(dt.getFullYear() + 1);
					if (isFollowersPage) {
						followerHeader.classList.add('heading');
						followerHeader.appendChild(
							document.createTextNode(
								'Blogs following your blogs, \u201C' +
									name +
									'\u201D'
							)
						);
						followerHeader.setAttribute(
							'data-timestamp',
							dt.getTime()
						);
						lcontent.appendChild(followerHeader);
					}
					if (!isFollowersPage) {
						followerHeader.classList.add('heading');
						followerHeader.appendChild(
							document.createTextNode(
								'Blogs followed by your primary, \u201C' +
									primary +
									'\u201D'
							)
						);
						followerHeader.setAttribute(
							'data-timestamp',
							dt.getTime()
						);
						lcontent.appendChild(followerHeader);
					}
				}
				var user = ing ? api.response.blogs : api.response.users;
				var followerBrick;
				var firstChild;
				var cm;
				var nm;
				var nc;
				var tc;
				var middleChild;
				var middleChildT;
				var middleChildTR;
				var middleChildTD;
				var middleChildIB;
				var lastChild;
				var avatar;
				var date;
				var px;
				var b;
				var d;
				var date;
				var jz;
				var dt;
				var nextPage;
				var groupName;
				var group;
				var hding = document.getElementsByClassName('heading');
				var dt1 = new Date();
				var dt2 = new Date();
				var link1;
				var link2;
				var link3;
				var link4;
				var whiteHeart;
				var key;
				var uuid;
				var url;
				var descript;
				var title;
				var theme;
				var cancelProp = function (e) {
					e.cancelBubble = true;
					e.stopProgagation();
				};
				for (var i = 0; i < user.length; i++) {
					dt1 = new Date(
						parseInt(
							hding[hding.length - 1].getAttribute(
								'data-timestamp'
							)
						)
					);
					dt2 = new Date(
						ing
							? user[i].resources[0].updated * 1000
							: user[i].blog.updated * 1000
					);
					groupName =
						dt2.getFullYear() === new Date().getFullYear()
							? 'group_' +
							  dt2.getMonth() +
							  '_' +
							  dt2.getFullYear()
							: 'group_yesterdays_' + dt2.getFullYear();
					group = document.getElementsByClassName(groupName);
					followerBrick = document.createElement('a');
					followerBrick.classList.add(groupName);
					if (
						group.length === 0 &&
						((dt2.getFullYear() === new Date().getFullYear() &&
							(dt2.getMonth() !== dt1.getMonth() ||
								dt2.getFullYear() !== dt1.getFullYear())) ||
							dt2.getFullYear() !== dt1.getFullYear())
					) {
						followerHeader = document.createElement('div');
						followerHeader.classList.add('heading');
						followerHeader.appendChild(
							document.createTextNode(
								dt2.getFullYear() === new Date().getFullYear()
									? 'updated in ' +
											mo[dt2.getMonth()] +
											dt2.getFullYear()
									: 'updated in ' + dt2.getFullYear()
							)
						);
						followerHeader.setAttribute(
							'data-timestamp',
							dt2.getTime()
						);
						lcontent.appendChild(followerHeader);
					}
					followerBrick.style.width = '125px';
					followerBrick.style.height = '125px';
					followerBrick.classList.add('brick');
					followerBrick.classList.add('follow');
					followerBrick.classList.add('photo');
					followerBrick.addEventListener('click', function (e) {
						e.stopPropagation();
						e.preventDefault();
						e.cancelBubble = true;
						highlightBrick(
							this,
							!this.classList.contains('highlighted')
						);
					});
					key = ing ? user[i].resources[0].key : user[i].blog.key;
					uuid = ing ? user[i].resources[0].uuid : user[i].blog.uuid;
					url = ing ? user[i].resources[0].url : user[i].blog.url;
					title = ing
						? user[i].resources[0].title
						: user[i].blog.title;
					descript = ing
						? user[i].resources[0].description
						: user[i].blog.description;
					theme = ing
						? user[i].resources[0].theme
						: user[i].blog.theme;
					followerBrick.id = 'post_' + key;
					followerBrick.setAttribute('target', '_blank');
					followerBrick.setAttribute('data-id', key);
					followerBrick.setAttribute('data-follower-key', key);
					followerBrick.setAttribute('data-follower-uuid', uuid);
					firstChild = document.createElement('div');
					firstChild.classList.add('highlight');
					cm = new Image();
					cm.src =
						'https://assets.tumblr.com/images/' +
						'small_white_checkmark.png';
					cm.classList.add('checkmark');
					nm = ing ? user[i].resources[0].name : user[i].name;
					fblg.push(nm); // <= this array is for the snapshot later
					followerBrick.setAttribute('title', nm);
					followerBrick.setAttribute('href', url);
					idsAllArr.push(key);
					firstChild.appendChild(cm);
					tc = document.createElement('div');
					tc.classList.add('tag_count');
					tc.id = 'tag_count_' + key;
					tc.appendChild(document.createTextNode(nm));
					firstChild.appendChild(tc);
					nc = document.createElement('div');
					nc.classList.add('note_count');
					firstChild.appendChild(nc);
					followerBrick.appendChild(firstChild);
					// meat & tators middle child (repeat)
					middleChild = document.createElement('div');
					middleChildT = document.createElement('div');
					middleChildTR = document.createElement('div');
					middleChildTD = document.createElement('div');
					middleChildIB = document.createElement('div');
					middleChild.classList.add('overflow-hidden');
					middleChildT.classList.add('links-layer');
					middleChildTR.classList.add('trow');
					middleChildTD.classList.add('tags-layer');
					middleChildIB.classList.add('tag-container');
					middleChildIB.innerHTML =
						'<h2>' + title + '</h2>' + descript;
					avatar = new Image();
					avatar.setAttribute('crossorigin', 'anonymous');
					avatar.width = 125;
					avatar.height = 125;
					avatar.style.width = avatar.width + 'px';
					avatar.style.height = avatar.height + 'px';
					followerBrick.setAttribute('data-name', nm);
					avatar.src =
						'https://api.tumblr.com/v2/blog/' + nm + '/avatar/128';
					avatar.classList.add('follower-avatar');
					// some followers links
					link1 = document.createElement('a');
					link1.setAttribute('target', '_blank');
					link1.classList.add('link-edit');
					link1.href = '/dashboard/blog/' + nm;
					link1.setAttribute('title', 'Peepr.');
					link1.appendChild(svgForType.view.cloneNode(true));
					link1.addEventListener('click', cancelProp);
					middleChildTD.appendChild(link1);
					link4 = document.createElement('a');
					link4.setAttribute('target', '_blank');
					link4.classList.add('link-reblog');
					link4.href = '/dashboard/blog/' + nm + '#avatar';
					link4.setAttribute('title', 'Large Avatar.');
					link4.setAttribute('data-name', nm);
					link4.setAttribute('data-font', theme.title_font);
					link4.setAttribute('data-weight', theme.title_font_weight);
					link4.setAttribute('data-color', theme.title_color);
					link4.setAttribute('data-bg', theme.background_color);
					link4.setAttribute('data-title', title);
					link4.appendChild(svgForType.see.cloneNode(true));
					link4.addEventListener('click', function (e) {
						e.preventDefault();
						e.stopPropagation();
						e.cancelBubble = true;
						var popoverT = document.createElement('div');
						popoverT.addEventListener('click', function () {
							this.parentNode.removeChild(this);
						});
						popoverT.classList.add('follower-pop-t');
						var popoverTR = document.createElement('div');
						popoverTR.classList.add('follower-pop-tr');
						var popoverTD = document.createElement('div');
						popoverTD.classList.add('follower-pop-td');
						var popoverAv = document.createElement('div');
						popoverAv.classList.add('follower-pop-av');
						var popoverInner = document.createElement('div');
						popoverInner.classList.add('follower-pop-inner');
						var popoverImg = new Image();
						popoverImg.classList.add('follower-pop-img');
						popoverImg.src =
							'https://api.tumblr.com/v2/blog/' +
							this.getAttribute('data-name') +
							'/avatar/512';
						var popoverTitle = document.createElement('h1');
						popoverTitle.style.fontFamily =
							this.getAttribute('data-font');
						popoverTitle.style.color =
							this.getAttribute('data-color');
						popoverInner.style.backgroundColor =
							this.getAttribute('data-bg');
						popoverTitle.classList.add('follower-pop-title');
						popoverTitle.innerHTML =
							this.getAttribute('data-title');
						popoverAv.appendChild(popoverImg);
						popoverInner.appendChild(popoverAv);
						popoverInner.appendChild(popoverTitle);
						popoverTD.appendChild(popoverInner);
						popoverTR.appendChild(popoverTD);
						popoverT.appendChild(popoverTR);
						document.body.appendChild(popoverT);
					});
					// this ^ is neat. I'm proud of this ^ :)
					middleChildTD.appendChild(link4);
					link2 = document.createElement('a');
					link2.setAttribute('target', '_blank');
					link2.classList.add('link-view');
					link2.setAttribute('title', 'Visit.');
					link2.appendChild(svgForType.symlink.cloneNode(true));
					link2.addEventListener('click', cancelProp);
					middleChildTD.appendChild(link2);
					link3 = document.createElement('a');
					link3.setAttribute('target', '_blank');
					link3.classList.add('link-like');
					link3.setAttribute('data-id', key);
					link3.setAttribute(
						'data-like-info',
						'data[tumblelog]=' + nm
					);
					link3.id = 'follow_heart_' + key;
					link3.setAttribute('target', '_blank');
					// link3: start of the giant link3 follow button
					if (href[5] === 'followers') {
						if (
							typeof user[i].following !== 'undefined' &&
							user[i].following
						) {
							// this only runs on ?followers...
							// it is absent on the ?follows (api/following)
							followerBrick.classList.add('following');
							// so if you follow, it's auto-mutuals
							typeToIds['mutual'].push(key);
							followerBrick.classList.add('mutual');
							idToTypes[key] = 'mutual';
							whiteHeart = svgForType.liked.cloneNode(true);
							whiteHeart.setAttribute('fill', '#56f');
							link3.href = url + '#unfollow:' + nm;
							link3.setAttribute(
								'title',
								'(Mutual) Click to UnFollow'
							);
							link3.classList.add('liked');
							link3.appendChild(whiteHeart);
						} else if (
							typeof user[i].following !== 'undefined' &&
							!user[i].following
						) {
							typeToIds['friendly'].push(key);
							idToTypes[key] = 'friendly';
							followerBrick.classList.add('unfollowed');
							whiteHeart = svgForType.notes.cloneNode(true);
							whiteHeart.setAttribute('fill', '#fff');
							link3.href = url + '#follow:' + nm;
							link3.setAttribute('title', 'Click to Follow');
							link3.classList.add('not-liked');
							link3.appendChild(whiteHeart);
						}
						link3.addEventListener('click', followOrUnFollowButton);
					} else {
						followerBrick.classList.add('missing-follows-info');
					}
					// end 1 of link3 ^ giant follow button, but there is more of it
					// to be added below/later for the ?follows api/following part
					// because Tumblr doesn't include a property for follows/mutuals
					middleChildTD.appendChild(link3);
					// end followersBricks links... Woot! finally
					middleChild.appendChild(avatar);
					middleChildTD.appendChild(middleChildIB);
					middleChildTR.appendChild(middleChildTD);
					middleChildT.appendChild(middleChildTR);
					middleChild.appendChild(middleChildT);
					followerBrick.appendChild(middleChild); // < don't forget KEVIN!
					// close off the brick and return below     (home alone)
					lastChild = document.createElement('div');
					lastChild.classList.add('overlay');
					jz = document.createElement('div');
					jz.classList.add('inner');
					dt = document.createElement('div');
					d = new Date(
						ing
							? user[i].resources[0].updated * 1000
							: user[i].blog.updated * 1000
					);
					b = d.getDate();
					px = [
						'th ',
						'st ',
						'nd ',
						'rd ',
						'th ',
						'th ',
						'th ',
						'th ',
						'th ',
						'th ',
						'th '
					][b % 10];
					if (b === 12 || b === 11) {
						px = 'th ';
					}
					date =
						[
							'Sun - ',
							'Mon - ',
							'Tue - ',
							'Wed - ',
							'Thu - ',
							'Fri - ',
							'Sat - '
						][d.getDay()] +
						mo[d.getMonth()] +
						b +
						px +
						d.getFullYear();
					dt.classList.add('date');
					dt.appendChild(document.createTextNode(date));
					jz.appendChild(dt);
					lastChild.appendChild(jz);
					followerBrick.appendChild(lastChild);
					if (group.length > 0) {
						lcontent.insertBefore(
							followerBrick,
							group[group.length - 1].nextSibling
						);
					} else {
						lcontent.appendChild(followerBrick);
					}
				}
				data.setAttribute(
					'data-id_to_types',
					JSON.stringify(idToTypes)
				);
				data.setAttribute(
					'data-type_to_ids',
					JSON.stringify(typeToIds)
				);
				data.setAttribute(
					'data-types_all_arr',
					JSON.stringify(typesAllArr)
				);
				data.setAttribute(
					'data-ids_all_arr',
					JSON.stringify(idsAllArr)
				);
				data.setAttribute(
					'data-follow-blogs-all',
					JSON.stringify(fblg)
				);
				data.setAttribute('data-unstable-next-href', '0');
				pluginBuildColumns();
				nextPage = false; // maybe? find out later...
				data.setAttribute(
					'data-id_to_types',
					JSON.stringify(idToTypes)
				);
				data.setAttribute(
					'data-type_to_ids',
					JSON.stringify(typeToIds)
				);
				data.setAttribute(
					'data-types_all_arr',
					JSON.stringify(typesAllArr)
				);
				var repeatedTimeOut2;
				var nextPageOfFollowers = function () {
					data.setAttribute('data-page-repeat', nextPage); // loop much?
					// this delays pagination slightly, but it may be better...
					// it's steadier, non-bot-ish, and is easier to process :)
					var tagAlongDiff =
						document.getElementsByClassName('brick').length -
						document.getElementsByClassName('laid').length;
					if (
						document
							.getElementById('pause_button')
							.classList.contains('paused') ||
						tagAlongDiff > 10 // < this :)
					) {
						// the CSS3 animation thing is also crash prevention :)
						return;
					}
					clearInterval(repeatedTimeOut2);
					data.setAttribute('data-followers-loading', 'false');
					loadFollowers(nextPage);
				};
				var pauseBeforeNext = function () {
					// f stands for first followed
					var fBrick = document.getElementsByClassName(
						'missing-follows-info'
					);
					if (typeof fBrick !== 'undefined' && fBrick.length > 0) {
						var fName = fBrick[0].getAttribute('data-name');
						var fKey = fBrick[0].getAttribute('data-follower-key');
						var fLink3 = document.getElementById(
							'follow_heart_' + fKey
						);
						var fUrl = fBrick[0].getAttribute('href');
						stopToFindMutuals(
							0 /* primary 1st and down the line */,
							fName,
							fUrl,
							fKey,
							fLink3,
							fBrick[0],
							pauseBeforeNext
						);
					} else if (!data.classList.contains('next_page_false')) {
						// stop fetching mutual info and goto next page
						repeatedTimeOut2 = setInterval(
							nextPageOfFollowers,
							500
						);
					}
				};
				if (
					typeof api !== 'undefined' &&
					typeof api.response !== 'undefined' &&
					typeof api.response._links !== 'undefined' &&
					typeof api.response._links.next !== 'undefined' &&
					typeof api.response._links.next.href !== 'undefined'
				) {
					nextPage = api.response._links.next.href;
					var fBrick = document.getElementsByClassName(
						'missing-follows-info'
					);
					if (
						href[5] === 'followers' &&
						nextPage !== false &&
						nextPage !== data.getAttribute('data-page-repeat')
					) {
						// walk, don't run :)
						repeatedTimeOut2 = setInterval(
							nextPageOfFollowers,
							500
						);
					} else if (
						href[5] === 'follows' &&
						nextPage !== false &&
						nextPage !== data.getAttribute('data-page-repeat')
					) {
						// this is unique, because if we unfollow any blogs
						// during pagination, we must step back the offset,
						// by -1, or else the blogs will be off by 1
						// &&
						// if we re-follow blog during pagination, we must
						// jostle back +1... it's very unstable, but solid
						data.setAttribute(
							'data-id_to_types',
							JSON.stringify(idToTypes)
						);
						data.setAttribute(
							'data-type_to_ids',
							JSON.stringify(typeToIds)
						);
						pauseBeforeNext();
					}
				} else {
					data.classList.add('next_page_false');
					if (
						href[5] === 'follows' &&
						typeof fBrick !== 'undefined' &&
						fBrick.length > 0
					) {
						pauseBeforeNext();
					}
					snapShotFollowers(href[5]);
				}
			} else {
				snapShotFollowers(href[5]);
				// this ^ would run on an api fetch with 0 results
				data.classList.add('next_page_false');
				// but so far, that never happens...
			}
		},
		[['Authorization', 'Bearer ' + token]]
	);
};
// load followers ^ followers mode follow mode

// load fans v
var loadFans = function (notesList) {
	var firstRun = typeof notesList === 'undefined';
	var href = document.location.href.split(/[\/\?&#=]+/g);
	var data = document.getElementById('mass_post_features-plugin_data');
	var idsAllArr = JSON.parse(data.getAttribute('data-ids_all_arr'));
	var typesAllArr = JSON.parse(data.getAttribute('data-types_all_arr'));
	var typeToIds = JSON.parse(data.getAttribute('data-type_to_ids'));
	var idToTypes = JSON.parse(data.getAttribute('data-id_to_types'));
	if (typeof typeToIds['friendly'] === 'undefined') {
		typeToIds['friendly'] = [];
	}
	if (typeof typeToIds['mutual'] === 'undefined') {
		typeToIds['mutual'] = [];
	}
	if (typeof typeToIds['secondary'] === 'undefined') {
		typeToIds['secondary'] = [];
	}
	var token = data.getAttribute('data-api-token');
	getResponseText(
		firstRun
			? '/activity/' + name
			: '/activity/' +
					notesList.channel + // name
					'/2/' +
					notesList.first +
					'?last_timestamp=' +
					notesList.last +
					'&c=' +
					notesList.c,
		function (re) {
			if (!firstRun) {
				re = JSON.parse(re).html;
			}
			var div = document.createElement('div');
			div.innerHTML = re // parse the dom
				.replace(/<(\/?)script[^>]*>/g, '<$1flurb>') // no eval
				.replace(/<img/g, '<space'); // do not onload img tags
			var flurb = div.getElementsByTagName('flurb');
			var notesListReg = /Tumblr\.NotesList\((\{[\s\S]*?\})\);/;
			var notesList = {}; // reset
			var i;
			for (i = 0; i < flurb.length; i++) {
				if (flurb[i].innerText.match(notesListReg) !== null) {
					eval(
						'notesList = ' +
							flurb[i].innerText.match(notesListReg)[1]
					);
					// eval('JSON.stringify...')... {bad: 'structure'}...
				}
			}
			var an = div.getElementsByClassName('activity-notification');
			var isFollower = an[0].classList.contains('is_follower');
			var isLike = an[0].classList.contains('is_like');
			var isReblog = an[0].classList.contains('is_reblog');
			var loopFirstBrick = function (an0) {
				var anName = an0
					.getElementsByClassName('ui_avatar_tumblelog_name')[0]
					.innerText.replace(/\s+/g, '');
				var fanBrick = document.getElementById('post_' + anName);
				if (fanBrick === null) {
					// create fan brick
					getResponseText(
						'/api/v2/blog/' + anName + '/info',
						function (re2) {
							var api = JSON.parse(re2);
							if (
								typeof api !== 'undefined' &&
								typeof api.response !== 'undefined' &&
								typeof api.response.blog !== 'undefined'
							) {
								// ...---***---... LOAD FANS ...---***---...
								// with much casual copy over from load fans
								if (!lcontent.classList.contains('albino')) {
									lcontent.classList.add('albino');
								}
								if (lcontent.children.length === 0) {
									var fanHeader =
										document.createElement('div');
									var dt = new Date();
									fanHeader.id = 'who-follows-who';
									dt.setYear(dt.getFullYear() + 1);
									fanHeader.classList.add('heading');
									fanHeader.appendChild(
										document.createTextNode(
											'Fans of \u201C' + name + '\u201D'
										)
									);
									fanHeader.setAttribute(
										'data-timestamp',
										dt.getTime()
									);
									lcontent.appendChild(fanHeader);
								}
								var isFollower =
									an0.classList.contains('is_follower');
								var isLike = an0.classList.contains('is_like');
								var isReblog =
									an0.classList.contains('is_note');
								var mo = [
									'Jan ',
									'Feb ',
									'Mar ',
									'Apr ',
									'May ',
									'Jun ',
									'Jul ',
									'Aug ',
									'Sep ',
									'Oct ',
									'Nov ',
									'Dec '
								];
								var hding =
									document.getElementsByClassName('heading');
								var blog = api.response.blog;
								var dt1 = new Date(
									parseInt(
										hding[hding.length - 1].getAttribute(
											'data-timestamp'
										)
									)
								);
								var dt2 = new Date(blog.updated * 1000);
								var groupName =
									dt2.getFullYear() ===
									new Date().getFullYear()
										? 'group_' +
										  dt2.getMonth() +
										  '_' +
										  dt2.getFullYear()
										: 'group_yesterdays_' +
										  dt2.getFullYear();
								var group =
									document.getElementsByClassName(groupName);
								var fanBrick = document.createElement('a');
								fanBrick.classList.add(groupName);
								if (
									group.length === 0 &&
									((dt2.getFullYear() ===
										new Date().getFullYear() &&
										(dt2.getMonth() !== dt1.getMonth() ||
											dt2.getFullYear() !==
												dt1.getFullYear())) ||
										dt2.getFullYear() !== dt1.getFullYear())
								) {
									var fanHeader =
										document.createElement('div');
									fanHeader.classList.add('heading');
									fanHeader.appendChild(
										document.createTextNode(
											dt2.getFullYear() ===
												new Date().getFullYear()
												? 'updated in ' +
														mo[dt2.getMonth()] +
														dt2.getFullYear()
												: 'updated in ' +
														dt2.getFullYear()
										)
									);
									fanHeader.setAttribute(
										'data-timestamp',
										dt2.getTime()
									);
									lcontent.appendChild(fanHeader);
								}
								fanBrick.style.width = '125px';
								fanBrick.style.height = '125px';
								fanBrick.classList.add('brick');
								fanBrick.classList.add('follow');
								fanBrick.classList.add('photo');
								fanBrick.addEventListener(
									'click',
									function (e) {
										e.stopPropagation();
										e.preventDefault();
										e.cancelBubble = true;
										highlightBrick(
											this,
											!this.classList.contains(
												'highlighted'
											)
										);
									}
								);
								var nm = blog.name;
								var key = blog.key;
								var uuid = blog.uuid;
								var url = blog.url;
								var title = blog.title;
								var descript = blog.description;
								var theme = blog.theme;
								fanBrick.id = 'post_' + nm;
								fanBrick.setAttribute('target', '_blank');
								fanBrick.setAttribute('data-id', nm);
								fanBrick.setAttribute('data-fan-key', key);
								fanBrick.setAttribute('data-fan-uuid', uuid);
								var firstChild = document.createElement('div');
								firstChild.classList.add('highlight');
								var cm = new Image();
								cm.src =
									'https://assets.tumblr.com/images/' +
									'small_white_checkmark.png';
								cm.classList.add('checkmark');
								fanBrick.setAttribute('title', nm);
								fanBrick.setAttribute('href', url);
								idsAllArr.push(key);
								firstChild.appendChild(cm);
								var tc = document.createElement('div');
								tc.classList.add('tag_count');
								tc.id = 'tag_count_' + key;
								tc.appendChild(
									document.createTextNode('0 Likes')
								);
								firstChild.appendChild(tc);
								var nc = document.createElement('div');
								nc.classList.add('note_count');
								firstChild.appendChild(nc);
								nc.appendChild(
									document.createTextNode('0 Reblog')
								);
								if (isReblog) {
									nc.innerText =
										parseInt(
											nc.innerText.replace(/\D+/g, '')
										) +
										1 +
										' Notes';
								}
								if (isLike) {
									tc.innerText =
										parseInt(
											tc.innerText.replace(/\D+/g, '')
										) +
										1 +
										' Likes';
								}
								fanBrick.appendChild(firstChild);
								// meat & tators middle child (repeat)
								var middleChild = document.createElement('div');
								var middleChildT =
									document.createElement('div');
								var middleChildTR =
									document.createElement('div');
								var middleChildTD =
									document.createElement('div');
								var middleChildIB =
									document.createElement('div');
								middleChild.classList.add('overflow-hidden');
								middleChildT.classList.add('links-layer');
								middleChildTR.classList.add('trow');
								middleChildTD.classList.add('tags-layer');
								middleChildIB.classList.add('tag-container');
								middleChildIB.innerHTML =
									'<h2>' + title + '</h2>' + descript;
								var avatar = new Image();
								avatar.setAttribute('crossorigin', 'anonymous');
								avatar.width = 125;
								avatar.height = 125;
								avatar.style.width = avatar.width + 'px';
								avatar.style.height = avatar.height + 'px';
								fanBrick.setAttribute('data-name', nm);
								avatar.src =
									'https://api.tumblr.com/v2/blog/' +
									nm +
									'/avatar/128';
								avatar.classList.add('fan-avatar');
								// some fans links
								var cancelProp = function (e) {
									e.cancelBubble = true;
									e.stopProgagation();
								};
								var link1 = document.createElement('a');
								link1.setAttribute('target', '_blank');
								link1.classList.add('link-edit');
								link1.href = '/dashboard/blog/' + nm;
								link1.setAttribute('title', 'Peepr.');
								link1.appendChild(
									svgForType.view.cloneNode(true)
								);
								link1.addEventListener('click', cancelProp);
								middleChildTD.appendChild(link1);
								var link4 = document.createElement('a');
								link4.setAttribute('target', '_blank');
								link4.classList.add('link-reblog');
								link4.href =
									'/dashboard/blog/' + nm + '#avatar';
								link4.setAttribute('title', 'Large Avatar.');
								link4.setAttribute('data-name', nm);
								link4.setAttribute(
									'data-font',
									theme.title_font
								);
								link4.setAttribute(
									'data-weight',
									theme.title_font_weight
								);
								link4.setAttribute(
									'data-color',
									theme.title_color
								);
								link4.setAttribute(
									'data-bg',
									theme.background_color
								);
								link4.setAttribute('data-title', title);
								link4.appendChild(
									svgForType.see.cloneNode(true)
								);
								link4.addEventListener('click', function (e) {
									e.preventDefault();
									e.stopPropagation();
									e.cancelBubble = true;
									var popoverT =
										document.createElement('div');
									popoverT.addEventListener(
										'click',
										function () {
											this.parentNode.removeChild(this);
										}
									);
									popoverT.classList.add('fan-pop-t');
									var popoverTR =
										document.createElement('div');
									popoverTR.classList.add('fan-pop-tr');
									var popoverTD =
										document.createElement('div');
									popoverTD.classList.add('fan-pop-td');
									var popoverAv =
										document.createElement('div');
									popoverAv.classList.add('fan-pop-av');
									var popoverInner =
										document.createElement('div');
									popoverInner.classList.add('fan-pop-inner');
									var popoverImg = new Image();
									popoverImg.classList.add('fan-pop-img');
									popoverImg.src =
										'https://api.tumblr.com/v2/blog/' +
										this.getAttribute('data-name') +
										'/avatar/512';
									var popoverTitle =
										document.createElement('h1');
									popoverTitle.style.fontFamily =
										this.getAttribute('data-font');
									popoverTitle.style.color =
										this.getAttribute('data-color');
									popoverInner.style.backgroundColor =
										this.getAttribute('data-bg');
									popoverTitle.classList.add('fan-pop-title');
									popoverTitle.innerHTML =
										this.getAttribute('data-title');
									popoverAv.appendChild(popoverImg);
									popoverInner.appendChild(popoverAv);
									popoverInner.appendChild(popoverTitle);
									popoverTD.appendChild(popoverInner);
									popoverTR.appendChild(popoverTD);
									popoverT.appendChild(popoverTR);
									document.body.appendChild(popoverT);
								});
								// this ^ is neat. I'm proud of this ^ :)
								middleChildTD.appendChild(link4);
								var link2 = document.createElement('a');
								link2.setAttribute('target', '_blank');
								link2.classList.add('link-view');
								link2.setAttribute('title', 'Visit.');
								link2.appendChild(
									svgForType.symlink.cloneNode(true)
								);
								link2.addEventListener('click', cancelProp);
								middleChildTD.appendChild(link2);
								var link3 = document.createElement('a');
								link3.setAttribute('target', '_blank');
								link3.classList.add('link-like');
								link3.setAttribute('data-id', key);
								link3.setAttribute(
									'data-like-info',
									'data[tumblelog]=' + nm
								);
								link3.id = 'follow_heart_' + key;
								link3.setAttribute('target', '_blank');
								// link3: start of the giant link3 follow button
								var whiteHeart;
								if (
									typeof blog.followed !== 'undefined' &&
									blog.followed
								) {
									// this only runs on ?fans...
									fanBrick.classList.add('following');
									// so if you follow, it's auto-mutual
									typeToIds['mutual'].push(key);
									fanBrick.classList.add('mutual');
									idToTypes[key] = 'mutual';
									whiteHeart =
										svgForType.liked.cloneNode(true);
									whiteHeart.setAttribute('fill', '#56f');
									link3.href = url + '#unfollow:' + nm;
									link3.setAttribute(
										'title',
										'(Mutual) Click to UnFollow'
									);
									link3.classList.add('liked');
									link3.appendChild(whiteHeart);
								} else if (
									typeof blog.followed !== 'undefined' &&
									!blog.followed
								) {
									typeToIds['friendly'].push(key);
									idToTypes[key] = 'friendly';
									fanBrick.classList.add('unfollowed');
									whiteHeart =
										svgForType.notes.cloneNode(true);
									whiteHeart.setAttribute('fill', '#fff');
									link3.href = url + '#follow:' + nm;
									link3.setAttribute(
										'title',
										'Click to Follow'
									);
									link3.classList.add('not-liked');
									link3.appendChild(whiteHeart);
								}
								link3.addEventListener(
									'click',
									followOrUnFollowButton
								);
								// end 1 of link3 ^ giant follow button, but there is more of it
								// to be added below/later for the ?follows api/following part
								// because Tumblr doesn't include a property for follows/mutuals
								middleChildTD.appendChild(link3);
								// end fansBricks links... Woot! finally
								middleChild.appendChild(avatar);
								middleChildTD.appendChild(middleChildIB);
								middleChildTR.appendChild(middleChildTD);
								middleChildT.appendChild(middleChildTR);
								middleChild.appendChild(middleChildT);
								fanBrick.appendChild(middleChild); // < don't forget KEVIN!
								// close off the brick and return below     (home alone)
								var lastChild = document.createElement('div');
								lastChild.classList.add('overlay');
								var jz = document.createElement('div');
								jz.classList.add('inner');
								var dt = document.createElement('div');
								var d = new Date(blog.updated * 1000);
								var b = d.getDate();
								var px = [
									'th ',
									'st ',
									'nd ',
									'rd ',
									'th ',
									'th ',
									'th ',
									'th ',
									'th ',
									'th ',
									'th '
								][b % 10];
								if (b === 12 || b === 11) {
									px = 'th ';
								}
								var date =
									[
										'Sun - ',
										'Mon - ',
										'Tue - ',
										'Wed - ',
										'Thu - ',
										'Fri - ',
										'Sat - '
									][d.getDay()] +
									mo[d.getMonth()] +
									b +
									px +
									d.getFullYear();
								dt.classList.add('date');
								dt.appendChild(document.createTextNode(nm));
								jz.appendChild(dt);
								lastChild.appendChild(jz);
								fanBrick.setAttribute('title', nm + ' ' + date);
								fanBrick.appendChild(lastChild);
								if (group.length > 0) {
									lcontent.insertBefore(
										fanBrick,
										group[group.length - 1].nextSibling
									);
								} else {
									lcontent.appendChild(fanBrick);
								}
							}
							data.setAttribute(
								'data-id_to_types',
								JSON.stringify(idToTypes)
							);
							data.setAttribute(
								'data-type_to_ids',
								JSON.stringify(typeToIds)
							);
							data.setAttribute(
								'data-types_all_arr',
								JSON.stringify(typesAllArr)
							);
							data.setAttribute(
								'data-ids_all_arr',
								JSON.stringify(idsAllArr)
							);
							data.setAttribute('data-unstable-next-href', '0');
							pluginBuildColumns();
							var nextPage = false; // maybe? find out later...
							data.setAttribute(
								'data-id_to_types',
								JSON.stringify(idToTypes)
							);
							data.setAttribute(
								'data-type_to_ids',
								JSON.stringify(typeToIds)
							);
							data.setAttribute(
								'data-types_all_arr',
								JSON.stringify(typesAllArr)
							);
							an0.classList.remove('activity-notification');
							if (an.length > 0) {
								loopFirstBrick(an[0]);
							} else {
								loadFans(notesList);
							}
						},
						[['Authorization', 'Bearer ' + token]]
					);
				} else {
					var nc = fanBrick.getElementsByClassName('note_count')[0]; // reblog
					var tc = fanBrick.getElementsByClassName('tag_count')[0]; // like count
					if (isReblog) {
						nc.innerText =
							parseInt(nc.innerText.replace(/\D+/g, '')) +
							1 +
							' Notes';
					}
					if (isLike) {
						tc.innerText =
							parseInt(tc.innerText.replace(/\D+/g, '')) +
							1 +
							' Likes';
					}
				}
			};
			loopFirstBrick(an[0]);
			notesList.last = an[an.length - 1].getAttribute('data-timestamp');
			if (notesList.has_more) {
				setTimeout(function () {
					loadFans(notesList);
				}, 500);
			}
		},
		[
			// I don't want to parse HTML data
			['X-Requested-With', 'XMLHttpRequest']
			// accept text/html    (-.-)_o  -BOO!
		]
	);
};
// load fans ^

// we'll need our own masonry for batch photo bricks
var rebuildPhotoColumn = function () {
	// this fires once for each image
	var data = document.getElementById('mass_post_features-plugin_data');
	var column = 150;
	var brk = document.getElementsByClassName('photo-brick');
	var rect;
	var iRct;
	var img;
	var mt; // margin Top
	var brkHeight = 0;
	var tallH;
	for (var i = 0; i < brk.length; i++) {
		img = brk[i].getElementsByClassName('photo-brick-img');
		if (
			img.length === 0 ||
			(img.length === 1 &&
				typeof img[0] !== 'undefined' &&
				typeof img[0].children !== 'undefined' &&
				img[0].children.length === 0)
		) {
			brk[i].parentNode.removeChild(brk[i]);
			i--;
			if (i > 0 && typeof brk[i] === 'undefined') {
				break;
			}
		} else {
			brkHeight = 0;
			for (var l = 0; l < img.length; l++) {
				if (
					img[l].classList.contains('row-with-two-img') &&
					img[l].classList.contains('data-photoset-a') &&
					typeof img[l + 1] !== 'undefined' // nextSibling
				) {
					// neat row...? row same height #1
					tallH = Math.round(
						Math.min(
							img[l].children[0].clientHeight *
								(60 / img[l].children[0].clientWidth),
							img[l + 1].children[0].clientHeight *
								(60 / img[l + 1].children[0].clientWidth)
						)
					); //2
					img[l].style.height = tallH + 'px';
					img[l + 1].style.height = tallH + 'px';
				}
				if (
					img[l].classList.contains('row-with-three-img') &&
					img[l].classList.contains('data-photoset-a') &&
					typeof img[l + 1] !== 'undefined' && // nextSibling
					typeof img[l + 2] !== 'undefined' // nextSibling&nextSibling
				) {
					// neat row...? row same height #1
					tallH = Math.round(
						Math.min(
							img[l].children[0].clientHeight *
								(38 / img[l].children[0].clientWidth),
							img[l + 1].children[0].clientHeight *
								(38 / img[l + 1].children[0].clientWidth),
							img[l + 2].children[0].clientHeight *
								(38 / img[l + 2].children[0].clientWidth)
						)
					); //3
					img[l].style.height = tallH + 'px';
					img[l + 1].style.height = tallH + 'px';
					img[l + 2].style.height = tallH + 'px';
				}
				if (
					typeof img[l] !== 'undefined' &&
					typeof img[l].children[0] !== 'undefined'
				) {
					rect = img[l].getBoundingClientRect();
					iRct = img[l].children[0].getBoundingClientRect();
					mt = Math.round((rect.height - iRct.height) / 2);
					img[l].children[0].style.marginTop = mt + 'px';
					if (
						img[l].classList.contains('row-with-one-img') ||
						(img[l].classList.contains('data-photoset-a') &&
							!img[l].classList.contains('brick-dragging'))
					) {
						brkHeight += rect.height + 6;
					}
				}
			}
			if (brkHeight !== 0) {
				brk[i].style.height = Math.round(brkHeight) + 'px';
				brk[i].getElementsByClassName('rich')[0].style.maxHeight =
					Math.round(brkHeight - 42) > 100
						? Math.round(brkHeight - 42) + 'px'
						: '100px';
			}
		}
	}
	for (i = 0; i < brk.length; i++) {
		brk[i].style.top = column + 'px';
		brk[i].style.left = '420px'; // :P
		column += brk[i].getBoundingClientRect().height + 6;
	}
	data.setAttribute('data-photos_height', column);
	lcontent.style.height = column + 'px';
};
var loadPhotoIntoDOM = function (reloadedImg) {
	var data = document.getElementById('mass_post_features-plugin_data');
	// new photo-brick
	var bricks = document.getElementsByClassName('photo-brick');
	var brick = document.createElement('div');
	var brickInner = document.createElement('div');
	brickInner.classList.add('photo-inner');
	brick.classList.add('photo-brick');
	brick.style.top = '-150px';
	brick.style.left = '420px';
	brick.setAttribute('onclick', 'window.just_clicked_add_tags = true;');
	brick.id = 'photo-brick_' + brickIndex;
	var img = new Image();
	if (
		typeof reloadedImg !== 'undefined' &&
		typeof reloadedImg.target !== 'undefined' &&
		typeof reloadedImg.target.imgCode !== 'undefined'
	) {
		img.setAttribute('img-code', reloadedImg.target.imgCode);
	}
	img.style.visibility = 'hidden';
	img.setAttribute('data-id', brick.id);
	var pbi = document.createElement('div');
	pbi.setAttribute('data-id', brick.id);
	pbi.classList.add('row-with-one-img');
	pbi.classList.add('photo-brick-img');
	var pbic = document.createElement('div');
	pbic.classList.add('photo-brick-img-cell');
	var observer = document.createElement('div');
	observer.classList.add('resize-observer');
	// rebuildColumn after single photo dragged / resized
	new ResizeObserver(rebuildPhotoColumn).observe(observer);
	// these ^ are cool :)
	// editor portion
	var pbe = document.createElement('div');
	pbe.classList.add('photo-brick-edit');
	var rich = document.createElement('div');
	rich.setAttribute('title', 'caption');
	rich.id = 'rich_text_' + brickIndex;
	rich.setAttribute('data-id', brickIndex);
	var tags = document.createElement('div');
	tags.setAttribute('data-id', brickIndex);
	tags.classList.add('photo-tags');
	tags.addEventListener('click', function () {
		if (!brick.classList.contains('focused-rich')) {
			rich.focus();
		}
	});
	tags.id = 'photo_tags_' + brickIndex;
	rich.contentEditable = true;
	rich.designMode = 'on';
	rich.classList.add('rich');
	rich.addEventListener('focus', function () {
		if (data.classList.contains('photo-upload-in-progress')) {
			return;
		}
		if (!brick.classList.contains('focused-rich')) {
			var fr = document.getElementsByClassName('focused-rich');
			while (fr.length > 0) {
				fr[0].classList.remove('focused-rich');
			}
			var addTagsWidget = document.getElementById('add_tags_widget');
			addTagsWidget.style.display = 'block';
			brick.classList.add('focused-rich');
		}
	});
	pbe.appendChild(rich);
	pbe.appendChild(tags);
	var stripe = document.createElement('div');
	stripe.classList.add('stripe');
	var clone = butt('Clone ABC');
	clone.classList.add(clone.id);
	clone.removeAttribute('id');
	clone.addEventListener('click', function () {
		var otherRich = document.getElementsByClassName('rich');
		for (var i = 0; i < otherRich.length; i++) {
			if (otherRich[i] === rich) {
				continue;
			}
			otherRich[i].innerHTML = rich.innerHTML;
		}
	});
	clone.setAttribute('title', 'Copy this caption, to all photo captions.');
	pbe.appendChild(clone);
	appendRichButtons(pbe, rich, brick);
	pbe.appendChild(stripe);
	// end editor portion
	img.addEventListener('load', function () {
		var brick = document.getElementById(this.getAttribute('data-id'));
		var column = parseInt(data.getAttribute('data-photos_height'));
		var minBrickHeight = 120;
		this.removeAttribute('style');
		column +=
			(this.height > minBrickHeight ? this.height : minBrickHeight) + 6;
		data.setAttribute('data-photos_height', column);
		lcontent.style.height = column + 'px';
	});
	img.src =
		typeof reloadedImg.nodeName === 'undefined'
			? this.result
			: reloadedImg.src;
	pbi.appendChild(img);
	observer.appendChild(pbi);
	pbic.appendChild(observer);
	brickInner.appendChild(pbic); // mayo?
	brickInner.appendChild(pbe); // lettuce?
	brick.appendChild(brickInner);
	if (typeof reading !== 'undefined' && reading.length > 0) {
		reading.pop();
	}
	if (typeof reading !== 'undefined' && reading.length > 0) {
		reading[reading.length - 1].read();
	}
	if (typeof reloadedImg.nodeName !== 'undefined') {
		var hlb = document.getElementsByClassName('hl-bottom');
		var hlt = document.getElementsByClassName('hl-top');
		reloadedImg.parentNode.removeChild(reloadedImg);
		document.body.insertBefore(
			brick,
			hlb.length > 0
				? hlb[0].nextSibling
				: hlt.length > 0
				? hlt[0]
				: document.body.firstChild // < but not this usually
		);
	} else {
		document.body.appendChild(brick);
	}
	brickIndex++;
};
// end the batch photo brick maker thing

// tampermonkey say this needs to be defined first Catch22
// our own DOM builder for the Dash/Archive/Tagged API; end at return brick
var makeBrickFromApiPost = function (post, type, content, index) {
	if (type === 'undefined') {
		return false;
	}
	var i;
	var tp = {
		chat: 'conversation',
		ask: 'note',
		image: 'photo',
		text: 'regular',
		link: 'link',
		video: 'video',
		audio: 'audio',
		quote: 'quote'
	}; // tumblr 2014 post type names (archive.js)
	var smallestMedia = function (media) {
		var url = media[0].url;
		var width = 100000;
		var height = 125;
		for (var i = 0; i < media.length; i++) {
			if (typeof media[i].width === 'undefined') {
				continue;
			}
			if (media[i].width === media[i].height) {
				width = media[i].width;
				height = media[i].height;
				url = media[i].url;
				break;
			}
			if (media[i].width < width && media[i].width >= 125) {
				width = media[i].width;
				height = media[i].height;
				url = media[i].url;
			}
		}
		if (width === 100000) {
			width = 125;
		}
		var img = new Image();
		img.src = url;
		img.width = 125;
		img.height = (125 / width) * height;
		img.style.width = img.width + 'px';
		img.style.height = img.height + 'px';
		return img;
	};
	var formatText = function (text, f, q) {
		if (typeof f === 'undefined') {
			f = [];
		}
		if (typeof q === 'undefined') {
			q = 'nothing';
		}
		if (typeof text === 'undefined') {
			text = '';
		}
		var chars = text.split('');
		chars.push('');
		var open;
		var close = '</span>';
		for (var i = 0; i < f.length; i++) {
			open = {
				mention: '<span style="text-decoration:underline;">',
				link: '<span style="text-decoration:underline;">',
				bold: '<span style="font-weight:bold;">',
				color: '<span style="color:' + f[i].hex + ';">',
				italic: '<span style="font-style:italic;">'
			}[f[i].type];
			chars[f[i].start] = open + chars[f[i].start];
			chars[f[i].end] = chars[f[i].end] + close;
		}
		if (q === 'quirky') {
			chars.unshift('<p class="quirky">');
			chars.push('</p>');
		}
		if (q === 'heading1') {
			chars.unshift('<p class="h1">');
			chars.push('</p>');
		}
		if (q === 'heading2') {
			chars.unshift('<p class="h2">');
			chars.push('</p>');
		}
		if (q === 'link') {
			chars.unshift(
				'<div class="rq">&#x2192;</div>' + '<p class="link">'
			);
			chars.push('</p>');
		}
		if (q === 'chat') {
			chars.unshift('<p class="monospace">');
			chars.push('</p>');
		}
		if (q === 'ordered-list-item') {
			chars.unshift('<p class="ol">');
			chars.push('</p>');
		}
		if (q === 'unordered-list-item') {
			chars.unshift('<p class="ul">');
			chars.push('</p>');
		}
		if (q === 'quote') {
			chars.unshift(
				'<div class="rq">&rdquo;</div>' + '<p class="quote">'
			);
			chars.push('</p>');
		}
		if (q === 'note') {
			chars.unshift('<div class="rq">?</div>' + '<p class="quote">');
			chars.push('</p>');
		}
		return chars.join('');
	}; // format text
	var brick = document.createElement('a');
	brick.setAttribute('data-index', index);
	brick.classList.add('brick');
	brick.classList.add(tp[type]);
	brick.classList.add('timestamp_' + post.timestamp);
	brick.setAttribute('data-id', post.id);
	brick.setAttribute('data-timestamp', post.timestamp);
	brick.setAttribute('data-reblog_key', post.reblog_key);
	brick.id = 'post_' + post.id;
	var firstChild = document.createElement('div');
	firstChild.classList.add('highlight');
	var cm = new Image();
	cm.src = 'https://assets.tumblr.com/images/' + 'small_white_checkmark.png';
	cm.classList.add('checkmark');
	firstChild.appendChild(cm);
	var tc = document.createElement('div');
	tc.classList.add('tag_count');
	tc.id = 'tag_count_' + post.id;
	tc.appendChild(
		document.createTextNode(
			typeof post.tags === 'undefined'
				? '0 tags'
				: post.tags.length === 1
				? '1 tag'
				: post.tags.length + ' tags'
		)
	);
	firstChild.appendChild(tc);
	var nc = document.createElement('div');
	nc.classList.add('note_count');
	nc.id = 'note_count_' + post.id;
	nc.appendChild(
		document.createTextNode(
			typeof post.note_count === 'undefined'
				? '0 notes'
				: post.note_count === 1
				? '1 note'
				: post.note_count.toLocaleString('en', {
						useGrouping: true
				  }) + ' notes'
		)
	);
	firstChild.appendChild(nc);
	brick.appendChild(firstChild);
	// meat & tators middle child (again)
	var middleChild = document.createElement('div');
	var middleChildT = document.createElement('div');
	var middleChildTR = document.createElement('div');
	var middleChildTD = document.createElement('div');
	var middleChildIB = document.createElement('div');
	var fade = document.createElement('div');
	fade.classList.add('fade');
	var childTitle;
	var imgs;
	var h;
	var url;
	var av;
	var nm;
	var orly;
	var line;
	var op;
	var l;
	middleChild.classList.add('overflow-hidden');
	middleChildT.classList.add('overflow-table');
	middleChildTR.classList.add('overflow-row');
	middleChildTD.classList.add('overflow-cell');
	middleChildIB.classList.add('overflow-inline');
	if (
		type === 'text' ||
		type === 'chat' ||
		type === 'quote' ||
		type === 'ask' ||
		type === 'link'
	) {
		childTitle = document.createElement('div');
		childTitle.classList.add('title');
		if (
			typeof content[0] !== 'undefined' &&
			typeof content[0].text !== 'undefined'
		) {
			childTitle.innerHTML = formatText(
				content[0].text,
				content[0].formatting,
				content[0].subtype
			);
		}
		if (type === 'ask') {
			nm =
				typeof post.trail[0].layout[0].attribution !== 'undefined'
					? post.trail[0].layout[0].attribution.blog.name
					: post.trail[0].blog.name;
			url = 'https://api.tumblr.com/v2/blog/' + nm + '/avatar/64';
			av = new Image();
			av.width = 24;
			av.height = 24;
			av.style.width = av.width + 'px';
			av.style.height = av.height + 'px';
			av.src = url;
			av.classList.add('ask-av');
			childTitle.appendChild(av);
			if (
				typeof post.trail[0] !== 'undefined' &&
				typeof post.trail[0].content[0] !== 'undefined' &&
				typeof post.trail[0].content[0].text !== 'undefined'
			) {
				childTitle.innerHTML +=
					'<div class="rq">?</div>' +
					'<div class="asker">' +
					formatText(
						post.trail[0].content[0].text,
						post.trail[0].content[0].formatting,
						post.trail[0].content[0].subtype
					) +
					'</div>';
			}
		}
		if (
			type === 'ask' &&
			typeof post.trail[0] !== 'undefined' &&
			typeof post.trail[0].content[1] !== 'undefined' &&
			(typeof post.trail[0].content[1].text !== 'undefined' ||
				typeof post.trail[0].content[1].media !== 'undefined')
		) {
			if (typeof post.trail[0].content[1].text !== 'undefined') {
				childTitle.innerHTML +=
					'<div class="answer">' +
					formatText(
						post.trail[0].content[1].text,
						post.trail[0].content[1].formatting,
						post.trail[0].content[1].subtype
					) +
					'</div>';
			} else {
				imgs = post.trail[0].content[1].media;
				brick.classList.add('has-img');
				line = smallestMedia(imgs);
				h = line.height;
				childTitle.innerHTML += line.outerHTML;
				childTitle.appendChild(fade);
			}
		}
		middleChildIB.appendChild(childTitle);
		if (
			typeof content[1] !== 'undefined' &&
			typeof content[1].text !== 'undefined'
		) {
			op = document.createElement('div');
			op.classList.add('overprint');
			var alt = true;
			if (type === 'chat') {
				for (i = 1; i < content.length; i++) {
					if (typeof content[i].text === 'undefined') {
						continue;
					}
					line = document.createElement('div');
					line.classList = 'line';
					if (alt) {
						line.classList.add('alt');
					}
					alt = !alt;
					line.innerHTML = formatText(
						content[i].text,
						content[i].formatting,
						content[i].subtype
					);
					op.appendChild(line);
				}
				middleChildIB.appendChild(op);
			}
			if (
				type === 'text' ||
				type === 'quote' ||
				type === 'ask' ||
				type === 'link'
			) {
				if (
					typeof content === 'undefined' ||
					(typeof content !== 'undefined' && content.length === 0)
				) {
					if (
						typeof post.trail !== 'undefined' &&
						typeof post.trail[0] !== 'undefined' &&
						typeof post.trail[0].content !== 'undefined' &&
						post.trail[0].content.length > 0
					) {
						content = post.trail[0].content;
					}
				}
				for (i = 1; i < content.length; i++) {
					if (typeof content[i].text !== 'undefined') {
						line = document.createElement('div');
						line.innerHTML = formatText(
							content[i].text,
							content[i].formatting,
							content[i].subtype
						);
						op.appendChild(line);
					}
					if (
						(typeof content[i].media !== 'undefined' &&
							content[i].media.length > 0) ||
						(typeof content[i].poster !== 'undefined' &&
							content[i].poster.length > 0)
					) {
						imgs =
							typeof content[i].poster === 'undefined'
								? content[i].media
								: content[i].poster;
						brick.classList.add('has-img');
						line = smallestMedia(imgs);
						h = line.height;
						op.appendChild(line);
						op.appendChild(fade);
					}
				}
				middleChildIB.appendChild(op);
			}
		}
	} // photo images, audio, video
	if (
		!(
			(typeof content !== 'undefined' &&
				typeof content[0] !== 'undefined' &&
				typeof content[0].media !== 'undefined' &&
				content[0].media.length > 0) ||
			(typeof content !== 'undefined' &&
				typeof content[0] !== 'undefined' &&
				typeof content[0].poster !== 'undefined' &&
				content[0].poster.length > 0)
		)
	) {
		if (
			typeof content !== 'undefined' &&
			typeof post.content !== 'undefined'
		) {
			content = post.content; // another backflip :)
			// I'm done with ^ NPF neue posts here :)
		}
	}
	if (
		type === 'link' &&
		typeof content !== 'undefined' &&
		typeof content[0] !== 'undefined' &&
		typeof content[0].title !== 'undefined'
	) {
		line = document.createElement('div');
		line.innerHTML = formatText(
			content[0].title,
			content[0].formatting,
			'link'
		);
		if (typeof content[0].description !== 'undefined') {
			line.innerHTML += formatText(
				content[0].description,
				content[0].formatting,
				'normal'
			);
		}
		middleChildIB.appendChild(line);
	}
	if (
		(typeof content !== 'undefined' &&
			typeof content[0] !== 'undefined' &&
			typeof content[0].media !== 'undefined' &&
			content[0].media.length > 0) ||
		(typeof content !== 'undefined' &&
			typeof content[0] !== 'undefined' &&
			typeof content[0].poster !== 'undefined' &&
			content[0].poster.length > 0)
	) {
		imgs =
			typeof content[0].poster === 'undefined'
				? content[0].media
				: content[0].poster;
		line = smallestMedia(imgs);
		brick.classList.add('has-img');
		h = line.height;
		middleChildIB.appendChild(line);
		if (type === 'text') {
			middleChildIB.appendChild(fade);
		}
	} else if (
		(typeof content[1] !== 'undefined' &&
			typeof content[1].media !== 'undefined' &&
			content[1].media.length > 0) ||
		(typeof content[1] !== 'undefined' &&
			typeof content[1].poster !== 'undefined' &&
			content[1].poster.length > 0)
	) {
		imgs =
			typeof content[1].poster === 'undefined'
				? content[1].media
				: content[1].poster;
		line = smallestMedia(imgs);
		brick.classList.add('has-img');
		h = line.height;
		middleChildIB.appendChild(line);
		if (type === 'text') {
			middleChildIB.appendChild(fade);
		}
	}
	if (type === 'image' || (h < 125 && type !== 'text' && type !== 'ask')) {
		brick.style.height = Math.round(h) + 'px';
	} else {
		brick.style.height = '125px';
	}
	if (type === 'image' || type === 'video' || type === 'audio') {
		// I discovered this looks nice, so I'm doing some design
		var captionInlineBlock = document.createElement('div');
		captionInlineBlock.classList.add('caption-inline-block');
		var captionTR = document.createElement('div');
		captionTR.classList.add('caption-tr');
		var captionTD = document.createElement('div');
		captionTD.classList.add('caption-td');
		var caption = document.createElement('div');
		caption.classList.add('caption');
		var capContent;
		if (typeof post.trail !== 'undefined' && post.trail.length > 0) {
			for (i = 0; i < post.trail.length; i++) {
				if (
					typeof post.trail[i].content !== 'undefined' &&
					post.trail[i].content.length > 0
				) {
					capContent = post.trail[i].content;
					for (l = 0; l < capContent.length; l++) {
						if (typeof capContent[l].text !== 'undefined') {
							captionInlineBlock.innerHTML +=
								'<div>' +
								formatText(
									capContent[l].text,
									capContent[l].formatting,
									capContent[l].subtype
								) +
								'</div>';
						}
					}
				}
			}
		}
		if (captionInlineBlock.innerHTML.length === 0) {
			capContent =
				typeof post.content !== 'undefined' && post.content.length > 0
					? post.content
					: content;
			for (i = 0; i < capContent.length; i++) {
				if (typeof capContent[i].text !== 'undefined') {
					captionInlineBlock.innerHTML +=
						'<div>' +
						formatText(
							capContent[i].text,
							capContent[i].formatting,
							capContent[i].subtype
						) +
						'</div>';
				}
			}
		}
		captionTD.appendChild(captionInlineBlock);
		captionTR.appendChild(captionTD);
		caption.appendChild(captionTR);
		brick.appendChild(caption);
	}
	if (type === 'image') {
		var imgCount = -1;
		for (i = 1; i < content.length; i++) {
			if (typeof content[i].media !== 'undefined') {
				++imgCount;
			}
		}
		if (imgCount > 0) {
			var imgCountDiv = document.createElement('div');
			imgCountDiv.classList.add('img-count');
			imgCountDiv.appendChild(
				document.createTextNode('+' + imgCount + ' more')
			);
			brick.appendChild(imgCountDiv);
		}
	}
	if (type === 'video') {
		orly = document.createElement('div');
		orly.classList.add('play_overlay');
		brick.appendChild(orly);
	}
	if (type === 'audio') {
		orly = document.createElement('div');
		orly.classList.add('listen_overlay');
		brick.appendChild(orly);
	}
	if (post.state === 'private') {
		orly = document.createElement('div');
		orly.classList.add('private_overlay');
		brick.classList.add('private');
		brick.appendChild(orly);
	}
	// this is the tags and links thingy
	brick.href = post.post_url;
	brick.setAttribute('target', '_blank');
	var linksLayer = document.createElement('div');
	linksLayer.classList.add('links-layer');
	var linksTrow = document.createElement('div');
	linksTrow.classList.add('trow');
	var tagsLayer = document.createElement('div');
	tagsLayer.classList.add('tags-layer');
	if (typeof post.tags !== 'undefined') {
		var tagsLayerContainer = document.createElement('div');
		tagsLayerContainer.classList.add('tag-container');
		post.tags.sort(function (a, b) {
			return a.length - b.length;
		});
		for (i = 0; i < post.tags.length; i++) {
			tagsLayerContainer.appendChild(
				document.createTextNode('#' + post.tags[i] + ' ')
			);
		}
		tagsLayer.appendChild(tagsLayerContainer);
	}
	var href = document.location.href.split(/[\/\?&#=]+/g);
	var noEdit =
		typeof href[5] !== 'undefined' &&
		(href[5] === 'dashboard' ||
			href[5] === 'archive' ||
			href[5] === 'tagged' ||
			href[5] === 'likes' ||
			href[5] === 'search');
	// post bricks edit button
	var link1 = document.createElement('a');
	link1.setAttribute('target', '_blank');
	link1.classList.add('link-edit');
	link1.href = noEdit
		? '/dashboard/blog/' + post.blog_name + '/' + post.id
		: '/edit/' + post.id;
	link1.setAttribute('title', noEdit ? 'Peepr' : 'Edit');
	link1.appendChild(
		noEdit
			? svgForType.view.cloneNode(true)
			: svgForType.edit.cloneNode(true)
	);
	link1.setAttribute('data-id', post.id);
	// only add like/reblog buttons if posts are visible
	if (!noEdit) {
		link1.addEventListener('click', function (e) {
			e.preventDefault();
			e.stopPropagation();
			e.cancelBubble = true;
			var iframe = document.createElement('iframe');
			iframe.setAttribute('data-id', this.getAttribute('data-id'));
			document
				.getElementById('post_' + this.getAttribute('data-id'))
				.classList.remove('prevent-anim');
			iframe.id = 'neue_post_form-iframe';
			var reminisce = 0;
			iframe.addEventListener('load', function () {
				var replaceAfterEdit = this;
				var id = this.getAttribute('data-id');
				// this checks if done editing/closed
				clearInterval(reminisce);
				reminisce = setInterval(function () {
					var w = document.getElementById(
						'neue_post_form-iframe'
					).contentWindow;
					var p =
						w.document.getElementsByClassName(
							'post-forms-modal'
						)[0];
					if (
						typeof p === 'undefined' ||
						(typeof p !== 'undefined' && p.length === 0) ||
						(typeof p !== 'undefined' &&
							(w
								.getComputedStyle(p)
								.getPropertyValue('display') === 'none' ||
								w
									.getComputedStyle(p)
									.getPropertyValue('opacity')
									.toString() === '0'))
					) {
						clearInterval(reminisce);
						document.body.removeChild(
							document.getElementById('neue_post_form-iframe')
						);
						reloadBrick(replaceAfterEdit);
					}
				}, 500);
			});
			iframe.src =
				'https://www.tumblr.com/neue_web/iframe/edit/' + post.id;
			iframe.setAttribute('scrolling', 'no');
			iframe.setAttribute('frameborder', '0');
			iframe.setAttribute('title', 'Post forms');
			document.body.appendChild(iframe);
		});
	} else {
		link1.addEventListener('click', function (e) {
			e.cancelBubble = true;
			e.stopProgagation();
		});
	}
	// post bricks view post link
	var link2 = document.createElement('a');
	link2.setAttribute('target', '_blank');
	link2.addEventListener('click', function (e) {
		e.cancelBubble = true;
		e.stopProgagation();
	});
	link2.classList.add('link-view');
	link2.href = post.post_url;
	link2.setAttribute('target', '_blank');
	link2.setAttribute('title', 'View Post');
	link2.appendChild(svgForType.see.cloneNode(true));
	// post bricks like button
	var isReblogable = href[3] !== 'draft' && href[3] !== 'queued';
	if (isReblogable) {
		var link3 = document.createElement('a');
		link3.setAttribute('target', '_blank');
		link3.classList.add('link-like');
		link3.setAttribute('data-id', post.id);
		link3.href = post.post_url + '#like' + post.reblog_key;
		link3.setAttribute(
			'data-like-info',
			JSON.stringify({ id: post.id, reblog_key: post.reblog_key })
		);
		link3.setAttribute('target', '_blank');
		link3.setAttribute('title', 'Like Post');
		var whiteHeart = post.liked
			? svgForType.liked.cloneNode(true)
			: svgForType.notes.cloneNode(true);
		whiteHeart.setAttribute('fill', post.liked ? '#f56' : '#fff');
		link3.appendChild(whiteHeart);
		link3.classList.add(post.liked ? 'liked' : 'not-liked');
		link3.addEventListener('click', function (e) {
			e.cancelBubble = true;
			e.stopPropagation();
			e.preventDefault();
			if (this.classList.contains('clicked')) {
				return;
			}
			var data = document.getElementById(
				'mass_post_features-plugin_data'
			);
			this.classList.remove('new-liked');
			this.classList.add('clicked');
			var button = this;
			var liked = this.classList.contains('liked');
			var info = this.getAttribute('data-like-info');
			var v2url = liked ? '/api/v2/user/unlike' : '/api/v2/user/like';
			var token = data.getAttribute('data-api-token');
			var href = document.location.href.split(/[\/\?&#=]+/g);
			var name = href[4];
			var csrfToken = data.getAttribute('data-csrf-token');
			if (csrfToken !== '0') {
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function () {
					if (this.readyState == 4 && this.status == 200) {
						button.innerHTML = '';
						var cb = document.getElementById(
							'post_' + button.getAttribute('data-id')
						);
						if (liked) {
							whiteHeart = svgForType.notes.cloneNode(true);
							whiteHeart.setAttribute('fill', '#fff');
							button.classList.remove('liked');
							button.classList.add('not-liked');
							cb.classList.remove('liked');
						} else {
							whiteHeart = svgForType.liked.cloneNode(true);
							whiteHeart.setAttribute('fill', '#f56');
							button.classList.add('liked');
							button.classList.remove('not-liked');
							cb.classList.add('liked');
							// graphical aftertaste for reblog
							var bigHeart = svgForType.liked.cloneNode(true);
							bigHeart.setAttribute('fill', '#f56');
							bigHeart.setAttribute('width', '125');
							bigHeart.setAttribute('height', '125');
							bigHeart.classList.add('big-heart');
							setTimeout(function () {
								bigHeart.parentNode.removeChild(bigHeart);
							}, 1700);
							cb.appendChild(bigHeart);
							button.classList.add('new-liked');
						}
						button.appendChild(whiteHeart);
						button.classList.remove('clicked');
					}
				};
				xhttp.open('POST', v2url, true);
				// headers only after open and only before send
				xhttp.setRequestHeader(
					'Accept',
					'application/json;format=camelcase'
				);
				xhttp.setRequestHeader('Authorization', 'Bearer ' + token);
				xhttp.setRequestHeader('X-CSRF', csrfToken);
				xhttp.setRequestHeader(
					'Content-Type',
					'application/json; charset=utf8'
				);
				xhttp.setRequestHeader('X-Version', 'redpop/3/0//redpop/');
				xhttp.send(info);
			} // else {
			// TODO, (just in case) get a new CSRF token here?
			// this may not be needed...?
			// the token seems to stay ok, so far :)
			//}
		});
		// posts bricks reblog button
		var link4 = document.createElement('a');
		link4.setAttribute('target', '_blank');
		link4.classList.add('link-reblog');
		link4.href = post.post_url + '#like' + post.reblog_key;
		link4.setAttribute('data-id', post.id);
		link4.setAttribute('data-reblog_key', post.reblog_key);
		link4.setAttribute('target', '_blank');
		link4.setAttribute('title', 'Reblog Post');
		var whiteReblog = svgForType['reblog-self'].cloneNode(true);
		whiteReblog.setAttribute('fill', '#fff');
		link4.appendChild(whiteReblog);
		link4.addEventListener('click', function (e) {
			e.cancelBubble = true;
			e.stopPropagation();
			e.preventDefault();
			if (
				this.classList.contains('clicked') ||
				this.classList.contains('reblogged')
			) {
				return;
			}
			var id = this.getAttribute('data-id');
			var key = this.getAttribute('data-reblog_key');
			var button = this;
			this.classList.remove('new-liked');
			this.classList.add('clicked');
			data.setAttribute('data-single_edit_id', id);
			data.setAttribute('data-current_edit_index', '-1');
			data.setAttribute('data-current_edit_action', 'reblog');
			// negative index for outside of queue single reblogs
			fetchEditSubmit(function () {
				var cb = document.getElementById(
					'post_' + button.getAttribute('data-id')
				);
				button.children[0].setAttribute('fill', '#7EFF29');
				button.classList.remove('clicked');
				button.classList.add('reblogged');
				cb.classList.add('reblogged');
				reblogAnimation(button.getAttribute('data-id'));
			});
		});
	}
	tagsLayer.addEventListener('click', function (e) {
		e.cancelBubble = true;
		e.stopPropagation();
		e.preventDefault();
		var clickParentBrick = new Event('click');
		this.parentNode.parentNode.parentNode.dispatchEvent(clickParentBrick);
	});
	tagsLayer.appendChild(link1);
	tagsLayer.appendChild(link2);
	if (isReblogable) {
		tagsLayer.appendChild(link3);
		tagsLayer.appendChild(link4);
	}
	linksTrow.appendChild(tagsLayer);
	linksLayer.appendChild(linksTrow);
	brick.appendChild(linksLayer);
	// sandwich, yum
	middleChildTD.appendChild(middleChildIB);
	middleChildTR.appendChild(middleChildTD);
	middleChildT.appendChild(middleChildTR);
	middleChild.appendChild(middleChildT);
	brick.appendChild(middleChild);
	// close off the brick and return below
	var lastChild = document.createElement('div');
	lastChild.classList.add('overlay');
	var jz = document.createElement('div');
	jz.classList.add('inner');
	var dt = document.createElement('div');
	var d = new Date(post.timestamp * 1000);
	var b = d.getDate();
	var px = [
		'th ',
		'st ',
		'nd ',
		'rd ',
		'th ',
		'th ',
		'th ',
		'th ',
		'th ',
		'th ',
		'th '
	][b % 10];
	if (b === 12 || b === 11) {
		px = 'th ';
	}
	var date =
		['Sun - ', 'Mon - ', 'Tue - ', 'Wed - ', 'Thu - ', 'Fri - ', 'Sat - '][
			d.getDay()
		] +
		[
			'Jan ',
			'Feb ',
			'Mar ',
			'Apr ',
			'May ',
			'Jun ',
			'Jul ',
			'Aug ',
			'Sep ',
			'Oct ',
			'Nov ',
			'Dec '
		][d.getMonth()] +
		b +
		px +
		d.getFullYear();
	dt.classList.add('date');
	dt.appendChild(document.createTextNode(date));
	jz.appendChild(dt);
	lastChild.appendChild(jz);
	brick.appendChild(lastChild);
	if (
		typeof content !== 'undefined' &&
		typeof content[0] !== 'undefined' &&
		typeof content[0].attribution !== 'undefined' &&
		typeof content[0].attribution.url !== 'undefined'
	) {
		var sourceLabel2 = document.createElement('div');
		sourceLabel2.setAttribute(
			'title',
			'link: ' + content[0].attribution.url
		);
		var symlink1 = svgForType.symlink.cloneNode(true); //:D
		symlink1.setAttribute('fill', 'rgba(100,110,255,1)');
		sourceLabel2.appendChild(symlink1);
		sourceLabel2.classList.add('source-label2');
		brick.appendChild(sourceLabel2);
	}
	if (
		typeof post.source_url_raw !== 'undefined' &&
		post.source_url_raw !== '' &&
		post.source_url_raw !== false
	) {
		var sourceLabel1 = document.createElement('div');
		sourceLabel1.setAttribute('title', 'source: ' + post.source_url_raw);
		var symlink2 = svgForType.symlink.cloneNode(true); //:D
		symlink2.setAttribute('fill', '#eee');
		sourceLabel1.appendChild(symlink2);
		sourceLabel1.classList.add('source-label1');
		brick.appendChild(sourceLabel1);
	}
	// lastly create the event to highlight single stuff
	brick.addEventListener('click', function (e) {
		e.stopPropagation();
		e.preventDefault();
		e.cancelBubble = true;
		highlightBrick(this, !this.classList.contains('highlighted'));
	});
	return brick; // end from var makeBrickFromAPIPost
};
// end giant makeBrick brick building function

// since tumblr put a somewhat api/v2 on the main domain,
// instead of api.tumblr.com ect...
// greasemonkey can use an api
// without registering an oauth key (_-.-)shh
var asyncRepeatApiRead = function (api) {
	if (typeof api === 'string') {
		api = JSON.parse(api);
	}
	var lcontent = document.getElementsByClassName('l-content')[0];
	var href = document.location.href.split(/[\/\?&#=]+/g);
	var name = href[4];
	var endHeader;
	var data = document.getElementById('mass_post_features-plugin_data');
	data.classList.add('fetching-from-tumblr-api');
	if (
		// this is the liked/by page if any JSON
		href[5] === 'likes' &&
		typeof api.response.liked_posts !== 'undefined' &&
		api.response.liked_posts.length > 0
	) {
		api.response.posts = api.response.liked_posts;
	}
	if (
		// this is the dashboards JSON
		typeof api.response.posts === 'undefined' &&
		typeof api.response.timeline !== 'undefined' &&
		typeof api.response.timeline.elements !== 'undefined'
	) {
		api.response.posts = api.response.timeline.elements;
	}
	if (
		// tagged & search JSON
		typeof api.response.posts !== 'undefined' &&
		typeof api.response.posts.data !== 'undefined'
	) {
		api.response.posts = api.response.posts.data;
		if (
			typeof api.response._links === 'undefined' &&
			api.response.posts.length - 1 > 0
		) {
			api.response._links = {
				next: {
					href:
						data.getAttribute('data-ajax-first-subpage') +
						'&post_offset=' +
						api.response.posts[api.response.posts.length - 1]
							.timestamp
				}
			};
		}
		// I know, these ^ are endless
		// idea: [pause button]
	}
	if (typeof api.response.posts !== 'undefined') {
		if (api.response.posts.length === 0) {
			endHeader = document.createElement('div');
			endHeader.classList.add('heading');
			endHeader.id = 'heading_solum'; // end latin
			endHeader.appendChild(
				document.createTextNode('END') // idky... :)
			);
			lcontent.appendChild(endHeader);
			// done here too, should be
			data.classList.add('next_page_false');
			return;
		}
		var tagsAllArr = JSON.parse(data.getAttribute('data-tags_all_arr'));
		var idsAllArr = JSON.parse(data.getAttribute('data-ids_all_arr'));
		var typesAllArr = JSON.parse(data.getAttribute('data-types_all_arr'));
		var typeToIds = JSON.parse(data.getAttribute('data-type_to_ids'));
		var idToTags = JSON.parse(data.getAttribute('data-id_to_tags'));
		var idToTypes = JSON.parse(data.getAttribute('data-id_to_types'));
		var lastMonthTimestamp = parseFloat(
			data.getAttribute('data-last_month_timestamp')
		);
		var lastYearTimestamp = parseFloat(
			data.getAttribute('data-last_year_timestamp')
		);
		var idToOrigin = JSON.parse(data.getAttribute('data-id_to_origin'));
		var idToState = JSON.parse(data.getAttribute('data-id_to_state'));
		var idToTimestamp = JSON.parse(
			data.getAttribute('data-id_to_timestamp')
		);
		var idToNotes = JSON.parse(data.getAttribute('data-id_to_notes'));
		var tagToIds = JSON.parse(data.getAttribute('data-tag_to_ids'));
		var post = api.response.posts;
		var tag;
		var id;
		var type;
		var url;
		var reblog;
		var me;
		var media;
		var j;
		var newBrick;
		var monthHeader;
		var lastTimestamp;
		var lastYearstamp;
		if (!lcontent.classList.contains('albino')) {
			lcontent.classList.add('albino');
		}
		var t = [
			'text',
			'image',
			'chat',
			'ask',
			'video',
			'audio',
			'link',
			'quote'
		];
		for (var i = 0; i < post.length; i++) {
			id = post[i].id;
			if (idsAllArr.indexOf(id) !== -1) {
				continue;
			}
			type = post[i].type;
			me = post[i];
			media = me.media;
			if (t.indexOf(type) === -1) {
				// neue type blocks???
				if (
					typeof post[i].trail != 'undefined' &&
					typeof post[i].trail[0] !== 'undefined' &&
					typeof post[i].trail[0].layout !== 'undefined' &&
					typeof post[i].trail[0].layout[0] !== 'undefined'
				) {
					me = post[i].trail[0].layout;
					type = me[0].type;
				}
				if (
					t.indexOf(type) === -1 &&
					typeof post[i].trail != 'undefined' &&
					typeof post[i].trail[0] !== 'undefined' &&
					typeof post[i].trail[0].content !== 'undefined' &&
					typeof post[i].trail[0].content[0] !== 'undefined'
				) {
					me = post[i].trail[0].content;
					type = me[0].type;
				}
				if (
					t.indexOf(type) === -1 &&
					typeof post[i].content !== 'undefined' &&
					typeof post[i].content[0] === 'undefined' &&
					typeof post[i].trail !== 'undefined' &&
					typeof post[i].trail[0] !== 'undefined' &&
					typeof post[i].trail[0].content !== 'undefined'
				) {
					me = post[i].trail[0].content;
					type = me[0].type;
				}
				if (
					t.indexOf(type) === -1 &&
					typeof post[i].content !== 'undefined' &&
					typeof post[i].content[1] !== 'undefined' &&
					typeof post[i].content[1].subtype !== 'undefined'
				) {
					me = post[i].content;
					type = me[1].subtype; // chat, maybe
				}
				if (
					t.indexOf(type) === -1 &&
					typeof post[i].content !== 'undefined' &&
					typeof post[i].content[0] !== 'undefined'
				) {
					me = post[i].content;
					type = me[0].type;
				}
				if (
					typeof me !== 'undefined' &&
					typeof me[0] !== 'undefined' &&
					typeof me[0].subtype !== 'undefined' &&
					type !== me[0].subtype &&
					t.indexOf(me[0].subtype) !== -1
				) {
					type = me[0].subtype;
				}
			}
			if (typeof post[i].timestamp === 'undefined') {
				continue;
			}
			lastTimestamp = new Date(post[i].timestamp * 1000).getMonth();
			lastYearstamp = new Date(post[i].timestamp * 1000).getFullYear();
			if (
				lastTimestamp !== lastMonthTimestamp ||
				lastYearstamp !== lastYearTimestamp
			) {
				lastMonthTimestamp = lastTimestamp;
				lastYearTimestamp = lastYearstamp;
				data.setAttribute(
					'data-last_month_timestamp',
					lastMonthTimestamp
				);
				data.setAttribute(
					'data-last_year_timestamp',
					lastYearTimestamp
				);
				monthHeader = document.createElement('div');
				monthHeader.classList.add('heading');
				monthHeader.id = 'heading_' + post[i].timestamp;
				monthHeader.appendChild(
					document.createTextNode(
						[
							'Jan ',
							'Feb ',
							'Mar ',
							'Apr ',
							'May ',
							'Jun ',
							'Jul ',
							'Aug ',
							'Sep ',
							'Oct ',
							'Nov ',
							'Dec '
						][lastTimestamp] + lastYearstamp
					)
				);
				lcontent.appendChild(monthHeader);
			}
			// this replaces everything Tumblr wrote inside the bricks
			// with our own flavor, of brick, new brick
			newBrick = makeBrickFromApiPost(
				post[i],
				type,
				me,
				i + parseInt(data.getAttribute('data-last-post-index'))
			);
			if (newBrick !== false) {
				lcontent.appendChild(newBrick);
			}
			idsAllArr.push(id);
			if (typesAllArr.indexOf(type) === -1) {
				typesAllArr.push(type);
				typeToIds[type] = [];
			}
			typeToIds[type].push(id);
			if (typeof post[i].reblogged_from_name !== 'undefined') {
				reblog = post[i].reblogged_from_name;
				if (reblog === name) {
					if (typesAllArr.indexOf('reblog-self') === -1) {
						typesAllArr.push('reblog-self');
						typeToIds['reblog-self'] = [];
					}
					typeToIds['reblog-self'].push(id);
					idToOrigin[id] = 'reblog-self';
				} else {
					if (typesAllArr.indexOf('reblog-other') === -1) {
						typesAllArr.push('reblog-other');
						typeToIds['reblog-other'] = [];
					}
					typeToIds['reblog-other'].push(id);
					idToOrigin[id] = 'reblog-other';
				}
			} else {
				if (typesAllArr.indexOf('original') === -1) {
					typesAllArr.push('original');
					typeToIds.original = [];
				}
				typeToIds.original.push(id);
				idToOrigin[id] = 'original';
			}
			if (post[i].state === 'private') {
				if (typesAllArr.indexOf('private') === -1) {
					typesAllArr.push('private');
					typeToIds.private = [];
				}
				idToState[id] = 'private';
				typeToIds.private.push(id);
			} else {
				idToState[id] = 'public';
			}
			idToNotes[id] = post[i].note_count;
			idToTimestamp[id] = post[i].timestamp;
			idToTypes[id] = type;
			if (typeof post[i].tags !== 'undefined') {
				for (var l = 0; l < post[i].tags.length; l++) {
					tag = post[i].tags[l];
					if (tagsAllArr.indexOf(tag) === -1) {
						tagsAllArr.push(tag);
						tagToIds[tag] = [];
					}
					tagToIds[tag].push(id);
					if (typeof idToTags[id] === 'undefined') {
						idToTags[id] = [];
					}
					if (idToTags[id].indexOf(tag) === -1) {
						idToTags[id].push(tag);
					}
				}
			}
			if (i + 1 > post.length) {
				data.setAttribute(
					'data-last-post-index',
					parseInt(data.getAttribute('data-last-post-index')) + i
				);
			}
		}
		pluginBuildColumns();
		// the later onclick event to select-by runs outside of plugin scope
		// so we use the DOM for var memory
		data.setAttribute('data-tags_all_arr', JSON.stringify(tagsAllArr));
		data.setAttribute('data-ids_all_arr', JSON.stringify(idsAllArr));
		data.setAttribute('data-types_all_arr', JSON.stringify(typesAllArr));
		data.setAttribute('data-id_to_tags', JSON.stringify(idToTags));
		data.setAttribute('data-id_to_types', JSON.stringify(idToTypes));
		data.setAttribute('data-id_to_origin', JSON.stringify(idToOrigin));
		data.setAttribute('data-id_to_state', JSON.stringify(idToState));
		data.setAttribute(
			'data-id_to_timestamp',
			JSON.stringify(idToTimestamp)
		);
		data.setAttribute('data-id_to_notes', JSON.stringify(idToNotes));
		data.setAttribute('data-tag_to_ids', JSON.stringify(tagToIds));
		data.setAttribute('data-type_to_ids', JSON.stringify(typeToIds));
	}
	var token = data.getAttribute('data-api-token');
	var nextPage = false;
	if (
		typeof api.response !== 'undefined' &&
		typeof api.response._links !== 'undefined' &&
		typeof api.response._links.next !== 'undefined' &&
		typeof api.response._links.next.href !== 'undefined'
	) {
		nextPage = api.response._links.next.href;
	} else if (
		typeof api.response !== 'undefined' &&
		typeof api.response.timeline !== 'undefined' &&
		typeof api.response.timeline._links.next !== 'undefined' &&
		typeof api.response.timeline._links.next.href !== 'undefined'
	) {
		nextPage = api.response.timeline._links.next.href;
	}
	if (
		nextPage !== false &&
		nextPage !== data.getAttribute('data-page-repeat')
	) {
		data.setAttribute('data-page-repeat', nextPage); // loop much?
		// walk, don't run :)
		data.classList.add('fetching-from-tumblr-api');
		var repeatedTimeOut = setInterval(function () {
			// this delays pagination slightly, but it may be better...
			// it's steadier, non-bot-ish, and is easier to process :)
			var tagAlongDiff =
				document.getElementsByClassName('brick').length -
				document.getElementsByClassName('laid').length;
			if (
				document
					.getElementById('pause_button')
					.classList.contains('paused') ||
				tagAlongDiff > 10 // < this :)
			) {
				// the CSS3 animation thing is also crash prevention :)
				return;
			}
			clearInterval(repeatedTimeOut);
			getResponseText('/api' + nextPage, asyncRepeatApiRead, [
				['Authorization', 'Bearer ' + token]
			]);
		}, 500);
	} else {
		endHeader = document.createElement('div');
		endHeader.classList.add('heading');
		endHeader.id = 'heading_solum'; // end latin
		endHeader.appendChild(document.createTextNode('END'));
		lcontent.appendChild(endHeader);
		// this is where it usually ends, mostly
		data.classList.add('next_page_false');
	}
};
// end var asyncRepeatApiRead

// re the brick building for edits replaceBrick
var reloadBrick = function (replaceAfterEdit) {
	if (
		typeof replaceAfterEdit === 'undefined' || // what is this?
		replaceAfterEdit.classList.contains('reload-in-progress')
	) {
		return;
	}
	var data = document.getElementById('mass_post_features-plugin_data');
	var idsAllArr = JSON.parse(data.getAttribute('data-ids_all_arr'));
	replaceAfterEdit.classList.add('reload-in-progress');
	var highlightAfterReload =
		replaceAfterEdit.classList.contains('highlighted');
	var preloadContainer = document.createElement('div');
	preloadContainer.classList.add('edited-gif');
	var preloadTrow = document.createElement('div');
	preloadTrow.classList.add('trow');
	var preloadInner = document.createElement('div');
	preloadInner.classList.add('edited-center');
	// show spinner until post re-caches/updates
	var preLoad = new Image();
	preLoad.src = loderGifSrc;
	preLoad.style.width = '32px;';
	preLoad.style.height = '32px';
	preLoad.classList.add('bm_load_img');
	preloadInner.appendChild(preLoad);
	preloadTrow.appendChild(preloadInner);
	preloadContainer.appendChild(preloadTrow);
	replaceAfterEdit.appendChild(preloadContainer);
	setTimeout(function () {
		// this reloads the brick DOM after edit/close
		var href = document.location.href.split(/[\/\?&#=]+/g);
		var isDraft = href[3] === 'draft';
		var isQueue = href[3] === 'queued';
		var draftQueue = isQueue
			? '/posts/queue'
			: isDraft
			? '/posts/draft'
			: '/posts';
		var id = replaceAfterEdit.getAttribute('data-id');
		var idBefore =
			idsAllArr.indexOf(id) - 1 > -1
				? idsAllArr[idsAllArr.indexOf(id) - 1]
				: -1;
		var index = idsAllArr.indexOf(id);
		getResponseText(
			'/api/v2/blog/' +
				name +
				draftQueue +
				'?limit=1&reblog_info=1&npf=1&' +
				(isDraft
					? idBefore !== -1
						? 'before_id=' + idBefore
						: ''
					: // sloppy ^ yet functional :)
					isQueue // thanks oddly Tumblr draft and queue API
					? index !== -1
						? 'offset=' + index
						: ''
					: 'id=' + id),
			function (api) {
				// post to replace
				if (typeof api === 'string') {
					api = JSON.parse(api);
				}
				var t = [
					'text',
					'image',
					'chat',
					'ask',
					'video',
					'audio',
					'link',
					'quote'
				];
				var p2r = document.getElementById('post_' + id);
				var me;
				var type;
				// TODO, delete the superflous content/me argument
				// and put this inside the makeBrick function...
				// but only if it breaks...
				// not broken; don't fix it :)
				if (
					typeof api.response !== 'undefined' &&
					typeof api.response.posts !== 'undefined'
				) {
					var post = api.response.posts;
					if (
						typeof post[0].trail != 'undefined' &&
						typeof post[0].trail[0] !== 'undefined' &&
						typeof post[0].trail[0].layout !== 'undefined' &&
						typeof post[0].trail[0].layout[0] !== 'undefined'
					) {
						me = post[0].trail[0].layout;
						type = me[0].type;
					}
					if (
						t.indexOf(type) === -1 &&
						typeof post[0].trail != 'undefined' &&
						typeof post[0].trail[0] !== 'undefined' &&
						typeof post[0].trail[0].content !== 'undefined' &&
						typeof post[0].trail[0].content[0] !== 'undefined'
					) {
						me = post[0].trail[0].content;
						type = me[0].type;
					}
					if (
						t.indexOf(type) === -1 &&
						typeof post[0].content !== 'undefined' &&
						typeof post[0].content[0] === 'undefined' &&
						typeof post[0].trail !== 'undefined' &&
						typeof post[0].trail[0] !== 'undefined' &&
						typeof post[0].trail[0].content !== 'undefined'
					) {
						me = post[0].trail[0].content;
						type = me[0].type;
					}
					if (
						t.indexOf(type) === -1 &&
						typeof post[0].content !== 'undefined' &&
						typeof post[0].content[1] !== 'undefined' &&
						typeof post[0].content[1].subtype !== 'undefined'
					) {
						me = post[0].content;
						type = me[1].subtype; // chat, maybe
					}
					if (
						t.indexOf(type) === -1 &&
						typeof post[0].content !== 'undefined' &&
						typeof post[0].content[0] !== 'undefined'
					) {
						me = post[0].content;
						type = me[0].type;
					}
					if (
						typeof me !== 'undefined' &&
						typeof me[0] !== 'undefined' &&
						typeof me[0].subtype !== 'undefined' &&
						type !== me[0].subtype &&
						t.indexOf(me[0].subtype) !== -1
					) {
						type = me[0].subtype;
					}
					var newBrick = makeBrickFromApiPost(
						post[0],
						type,
						me,
						p2r.getAttribute('data-index')
					); // this third ^ me argument could be expunged
					newBrick.classList.add('laid');
					var lcontent =
						document.getElementsByClassName('l-content')[0];
					lcontent.replaceChild(newBrick, p2r);
					if (highlightAfterReload) {
						highlightBrick(
							document.getElementById('post_' + id),
							true
						);
					}
					pluginBuildColumns();
				}
			},
			[['Authorization', 'Bearer ' + data.getAttribute('data-api-token')]]
		);
	}, 1000); // delay 1 secode for cache update, perhaps?
};
// end the brick reload function

// this is how we upload photos/images
var photoUploadAndSubmit = function () {
	// and repeat asynchronously
	var data = document.getElementById('mass_post_features-plugin_data');
	var asDraftCheck = document.getElementById('photos_as_draft');
	var papb = document.getElementById('post_all_photos_button');
	if (!data.classList.contains('photo-upload-in-progress')) {
		data.classList.add('photo-upload-in-progress');
		asDraftCheck.disabled = true;
		papb.disabled = true;
	}
	var asDraft = asDraftCheck.checked;
	var apiKey = data.getAttribute('data-x-tumblr-form-key');
	var brk = document.getElementsByClassName('photo-brick');
	var brick = brk[brk.length - 1];
	brick.classList.add('upload-working');
	brick.scrollIntoView({ behavior: 'smooth' });
	var i;
	var rich = brick.getElementsByClassName('rich')[0];
	var img = brick.getElementsByClassName('photo-brick-img');
	var uploaded = brick.getElementsByClassName('uploaded');
	var squeakyToy = {};
	var code;
	var formData;
	var upImg;
	var api;
	// upload first or return or repeat
	if (uploaded.length !== img.length) {
		code = img[uploaded.length].firstChild.getAttribute('img-code');
		formData = new FormData();
		formData.append('photo', unreadFile[code]);
		getResponseText(
			{
				url: '/svc/post/upload_photo?source=post_type_form',
				post: formData
			},
			function (re) {
				api = JSON.parse(re);
				if (
					typeof api !== 'undefined' &&
					typeof api.response !== 'undefined' &&
					typeof api.response[0] !== 'undefined' &&
					typeof api.response[0].url !== 'undefined'
				) {
					img[uploaded.length].firstChild.src = api.response[0].url;
				} // whether we get the URL or not, the show must go on
				img[uploaded.length].classList.add('uploaded');
				photoUploadAndSubmit();
				// the fallback is to post a straight data url and let
				// Tumblr backend convert it to image/png etc on post
				// but that shouldn't have to happen
			},
			[
				['X-tumblr-form-key', apiKey],
				['X-Requested-With', 'XMLHttpRequest']
			]
		);
		return;
	}
	// AFTER THE UPLOAD, SUMMER HAS GONE...
	brick.style.top = 0 - brick.clientHeight + 'px';
	// this v runs after that ^ runs for each photo to upload
	squeakyToy['post[two]'] = rich.innerHTML;
	squeakyToy['post[three]'] = '';
	// this post is an edit
	squeakyToy.channel_id = name;
	squeakyToy['post[type]'] = 'photo';
	squeakyToy['post[state]'] = asDraft ? '1' : '0';
	squeakyToy['post[slug]'] = '';
	squeakyToy['post[date]'] = '';
	squeakyToy['post[publish_on]'] = '';
	if (img.length > 0) {
		var order = [];
		var oneone = '';
		var one = 0;
		for (i = 0; i < img.length; i++) {
			order.push('o' + (i + 1));
			if (img[i].classList.contains('row-with-one-img')) {
				oneone += '1'; // new photoset order
				one = 0;
			}
			if (img[i].classList.contains('row-with-two-img')) {
				if (one === 0) {
					oneone += '2'; // new photoset order
				}
				++one;
				if (one >= 2) {
					one = 0;
				}
			}
			if (img[i].classList.contains('row-with-three-img')) {
				if (one === 0) {
					oneone += '3'; // new photoset order
				}
				++one;
				if (one >= 3) {
					one = 0;
				}
			}
			squeakyToy['images[o' + (i + 1) + ']'] = img[i].firstChild.src;
			squeakyToy['caption[o' + (i + 1) + ']'] = '';
		}
		squeakyToy['post[photoset_order]'] = order.join(',');
		squeakyToy['post[photoset_layout]'] = oneone;
	}
	squeakyToy['post[tags]'] = '';
	var tag = brick.getElementsByClassName('tag');
	var tags = [];
	if (tag.length > 0) {
		for (i = 0; i < tag.length; i++) {
			tags.push(tag[i].innerHTML);
		}
		squeakyToy['post[tags]'] = tags.join(',');
	}
	getResponseText(
		// this is step #2
		'/svc/secure_form_key',
		function (re2) {
			getResponseText(
				{
					// this is step #3
					url: '/svc/post/update',
					post: JSON.stringify(squeakyToy)
				},
				function (re3) {
					if (!JSON.parse(re3).errors) {
						// success image posted!
						if (brk.length > 0) {
							brick.parentNode.removeChild(brick);
						}
						if (brk.length > 0) {
							photoUploadAndSubmit();
						} else {
							var blogLink = document.createElement('a');
							var bigHome = svgForType.home.cloneNode(true);
							bigHome.setAttribute('width', '40');
							bigHome.setAttribute('height', '40');
							bigHome.setAttribute('fill', '#555');
							blogLink.appendChild(bigHome);
							blogLink.appendChild(
								document.createTextNode(
									'Visit your new posts...'
								)
							);
							blogLink.id = 'return_to_dash_link';
							blogLink.href =
								'/blog/' + name + (asDraft ? '/drafts' : '');
							data.classList.remove('photo-upload-in-progress');
							asDraftCheck.disabled = false;
							papb.disabled = false;
							document.body.appendChild(blogLink);
						}
					}
				},
				[
					// the prev request brought us some puppies :)
					['X-tumblr-puppies', re2.puppies],
					['X-tumblr-form-key', apiKey],
					['X-Requested-With', 'XMLHttpRequest'],
					['Content-Type', 'application/json'],
					['Accept', 'application/json, text/javascript, */*; q=0.01']
				]
			);
		},
		[
			['Accept', 'application/json, text/javascript, */*; q=0.01'],
			['X-tumblr-form-key', apiKey],
			['X-Requested-With', 'XMLHttpRequest']
		]
	);
};
// end photoUploadAndSubmit

// this edits posts and reblogs posts,
// and it can even clone posts accidentally :P
var fetchEditSubmit = function (success) {
	var data = document.getElementById('mass_post_features-plugin_data');
	var isDraft = document.getElementById('re-as-draft').checked;
	var action = data.getAttribute('data-current_edit_action');
	var isReblog = action === 'reblog';
	var href = document.location.href.split(/[\/\?&#=]+/g);
	var name = href[4];
	var reblogger = data.getAttribute('data-reblog-to-here'); // if any
	var apiKey = data.getAttribute('data-x-tumblr-form-key');
	var id;
	var key;
	var changes;
	var change;
	var brick;
	var editQueue = document.getElementsByClassName('edit-reblog-queue');
	// editReblog queue index
	var qIndex = parseInt(data.getAttribute('data-current_edit_index'));
	if (qIndex === -1) {
		id = data.getAttribute('data-single_edit_id');
		brick = document.getElementById('post_' + id);
		brick.classList.add('edit-reblog-queue');
		if (id === '0') {
			return; // just in case
		}
	} else {
		// batch  reblogEdit v / ^ single reblogEdit
		id = editQueue[qIndex].getAttribute('data-id');
		brick = document.getElementById('post_' + id);
	}
	var postInEdit = document.getElementById('post_' + id);
	key = postInEdit.getAttribute('data-reblog_key');
	if (apiKey !== '0') {
		getResponseText(
			// A Reblog/Edit Takes 4 AJAX Steps
			'/svc/post/fetch?' +
				(isReblog
					? 'reblog_id=' + id + '&reblog_key=' + key
					: 'post_id=' + id),
			// this is step #1
			function (re1) {
				var fetch = JSON.parse(re1).post;
				var bone = {}; // puppies / fetch / bone :)
				var reblog_post_id =
					typeof fetch.parent_id !== 'undefined'
						? fetch.parent_id
						: typeof fetch.root_id !== 'undefined'
						? fetch.root_id
						: id; // this is step #2// this is step #2
				// text chat quote
				if (typeof fetch.one !== 'undefined') {
					bone['post[one]'] = fetch.one;
				}
				if (typeof fetch.two !== 'undefined') {
					bone['post[two]'] = fetch.two;
				}
				if (typeof fetch.three !== 'undefined') {
					bone['post[three]'] = fetch.three;
				}
				if (typeof fetch.source_url !== 'undefined') {
					bone['post[source_url]'] = fetch.source_url;
				}
				if (typeof fetch['post[state]'] !== 'undefined') {
					bone['post[state]'] = fetch['post[state]'];
				}
				bone['post[type]'] = fetch.type;
				if (isReblog) {
					// this post is a reblog
					bone.channel_id = reblogger;
					bone.reblog = true;
					bone.reblog_key = key;
					bone.reblog_post_id = reblog_post_id;
					bone.context_id = reblogger;
					bone['post[state]'] = isDraft ? '1' : '0';
					bone['post[slug]'] = ''; // bone, slug, and harmony :);
					bone['post[tags]'] = '';
					bone['post[date]'] = '';
					bone['post[publish_on]'] = '';
				} else {
					// this post is an edit
					bone.channel_id = name;
					bone.post_id = id;
					bone.edit_post_id = id;
					bone.reblog = false;
					bone['post[state]'] = fetch.state.toString();
					bone['post[slug]'] = fetch.slug; // lol what? :);
					bone['post[tags]'] = fetch.tags;
					bone['post[date]'] = fetch.date;
					bone['post[publish_on]'] = '';
					if (action !== 'caption' && action !== 'backdate') {
						// simple edits, less dynamic and easy
						changes = JSON.parse(action);
						if (Array.isArray(changes)) {
							change = changes[qIndex];
						} else {
							change = changes; // turn and face the strange :)
						}
						for (var ch in change) {
							bone[ch] = change[ch];
						}
						var removeWhenDone =
							(typeof changes['post[state]'] !== 'undefined' &&
								changes['post[state]'] === '1') ||
							(changes['post[state]'] === '0' &&
								href['3'] === 'queued') ||
							(changes['post[state]'] === '0' &&
								href['3'] === 'draft') ||
							changes['post[state]'] === 'on.2' ||
							changes['post[state]'] === '2';
					} else if (action === 'caption') {
						var rich2 =
							document.getElementById('rich_text_caption');
						var b4 = document.getElementById(
							'prepend-caption-option'
						).checked;
						var ow = document.getElementById(
							'overwrite-caption-option'
						).checked;
						var af = document.getElementById(
							'append-caption-option'
						).checked;
						bone['post[two]'] = af
							? bone['post[two]'] + rich2.innerHTML
							: ow
							? rich2.innerHTML
							: b4
							? rich2.innerHTML + bone['post[two]']
							: bone['post[two]'] + rich2.innerHTML; //""?
					} else if (action === 'backdate') {
						var isOneDay =
							document.getElementById('bd-one-day').checked;
						var isTwoDay =
							document.getElementById('bd-two-day').checked;
						var isNoDay =
							document.getElementById('bd-no-day').checked;
						var isOneTime =
							document.getElementById('bt-one-time').checked;
						var isTwoTime =
							document.getElementById('bt-two-time').checked;
						var isNoTime =
							document.getElementById('bt-no-time').checked;
						var mo1 = document.getElementById('moleft').value - 1;
						var mo2 = document.getElementById('moright').value - 1;
						var dt1 = document.getElementById('dtleft').value;
						var dt2 = document.getElementById('dtright').value;
						var yr1 = document.getElementById('yrleft').value;
						var yr2 = document.getElementById('yrright').value;
						var ho1 = document.getElementById('holeft').value;
						var ho2 = document.getElementById('horight').value;
						var mt1 = document.getElementById('mtleft').value;
						var mt2 = document.getElementById('mtright').value;
						var pm1 = document.getElementById('pmleft').checked;
						var pm2 = document.getElementById('pmright').checked;
						// 1000 because seconds to miliseconds...
						var ts = parseInt(
							editQueue[qIndex].getAttribute('data-timestamp')
						);
						var d1 = new Date();
						var d2 = new Date();
						if (isOneDay || isTwoDay) {
							d1.setMonth(mo1);
							d1.setDate(dt1);
							d1.setYear(yr1);
						}
						if (isOneTime || isTwoTime) {
							d1.setMinutes(mt1);
							d1.setHours(ho1 + pm1 ? 12 : 0);
						}
						if (isTwoDay) {
							d2.setMonth(mo2);
							d2.setDate(dt2);
							d2.setYear(yr2);
						}
						if (isTwoTime) {
							d2.setMinutes(mt2);
							d2.setHours(ho2 + pm2 ? 12 : 0);
						}
						var df =
							(d1.getTime() - d2.getTime()) /
							(editQueue.length + 1);
						var b = new Date();
						b.setTime(d1.getTime() - df * qIndex);
						var dt =
							[
								'Jan ',
								'Feb ',
								'Mar ',
								'Apr ',
								'May ',
								'Jun ',
								'Jul ',
								'Aug ',
								'Sep ',
								'Oct ',
								'Nov ',
								'Dec '
							][b.getMonth()] +
							b.getDate() +
							', ' +
							b.getFullYear();
						var h =
							b.getHours() < 12
								? b.getHours()
								: b.getHours() - 12;
						if (h === 0) {
							h = 12;
						}
						var time =
							' ' +
							h +
							':' +
							(b.getMinutes() / 100).toFixed(2).split('.')[1] +
							':' +
							(b.getSeconds() / 100).toFixed(2).split('.')[1] +
							(b.getHours() < 12 ? 'am' : 'pm');
						if (href[3] === 'draft') {
							bone['post[publish_on]'] = dt + time;
							bone['post[state]'] = 'on.2';
						} else {
							bone['post[date]'] = dt + time;
						}
					}
				}
				// photo posts
				if (typeof fetch.photos !== 'undefined') {
					var order = [];
					var oneone = '';
					var photo;
					for (var i = 0; i < fetch.photos.length; i++) {
						photo = fetch.photos[i];
						order.push(photo.id);
						oneone += '1'; // backup photoset order
						bone['images[' + photo.id + ']'] = '';
						bone['caption[' + photo.id + ']'] = '';
					}
					bone['post[photoset_order]'] = order.join(',');
					bone['post[photoset_layout]'] =
						typeof fetch.photoset_layout !== 'undefined'
							? fetch.photoset_layout
							: oneone;
				}
				getResponseText(
					// this is step #3
					'/svc/secure_form_key',
					function (re2) {
						getResponseText(
							{
								// this is step #4
								url: '/svc/post/update',
								post: JSON.stringify(bone)
							},
							function (re3) {
								if (!JSON.parse(re3).errors) {
									// success reblogged!
									brick.classList.remove('edit-reblog-queue');
									if (!isReblog) {
										// assume edited appearance
										if (removeWhenDone) {
											brick.parentNode.removeChild(brick);
											pluginBuildColumns();
										} else {
											reloadBrick(brick);
										}
									} else {
										reblogAnimation(id);
									}
									success(success);
								} else {
									brick.classList.remove('edit-reblog-queue');
									success(success); // repeat for next
								}
							},
							[
								// the prev request brought us some puppies :)
								['X-tumblr-puppies', re2.puppies],
								['X-tumblr-form-key', apiKey],
								['X-Requested-With', 'XMLHttpRequest'],
								['Content-Type', 'application/json'],
								[
									'Accept',
									'application/json, text/javascript, */*; q=0.01'
								]
							]
						);
					},
					[
						[
							'Accept',
							'application/json, text/javascript, */*; q=0.01'
						],
						['X-tumblr-form-key', apiKey],
						['X-Requested-With', 'XMLHttpRequest']
					]
				);
			},
			[
				['Accept', 'application/json, text/javascript, */*; q=0.01'],
				['X-tumblr-form-key', apiKey],
				['X-Requested-With', 'XMLHttpRequest']
			]
		);
	}
};
// end the single fetchEdit reblog/edit

// this function runs once v ^ then this goes repeatedly
var fetchEditSubmitMulti = function () {
	var data = document.getElementById('mass_post_features-plugin_data');
	var highlighted = document.getElementsByClassName('highlighted');
	var qIndex = -1;
	for (var i = 0; i < highlighted.length; i++) {
		if (
			this.getAttribute('data-edit_action') === 'reblog' &&
			highlighted[i].classList.contains('private')
		) {
			continue;
		}
		qIndex++;
		highlighted[i].classList.add('edit-reblog-queue');
	}
	data.setAttribute('data-current_edit_index', qIndex);
	data.setAttribute(
		'data-current_edit_action',
		this.getAttribute('data-edit_action')
	);
	fetchEditSubmit(function (success) {
		var data = document.getElementById('mass_post_features-plugin_data');
		var qIndex = parseInt(data.getAttribute('data-current_edit_index'));
		qIndex--;
		if (qIndex >= 0) {
			data.setAttribute('data-current_edit_index', qIndex);
			fetchEditSubmit(success);
			// repeat
		}
	});
};
var setURLValues = function () {
	var changes = {
		'post[three]': urlInput2.value,
		'post[source_url]': urlInput1.value,
		'post[slug]': urlInput3.value
	};
	addURL.setAttribute('data-edit_action', JSON.stringify(changes));
};
var loadpSubmit = function () {
	var wGinput = document.getElementById('reblog-widget_input');
	var url = wGinput.getAttribute('data-url') + wGinput.value;
	if (wGinput.getAttribute('data-member-input') !== null) {
		setCookie(wGinput.getAttribute('data-member-input'), wGinput.value, 99);
	}
	document.location.href = url.replace(/\s+/g, '+');
};
var dateByNumbers = function (id) {
	// I'm old fashioned like Safari
	var d = new Date();
	var container = document.createElement('div');
	container.classList.add('date-input-bunch');
	var day = document.createElement('label');
	var thday = ['Sun ', 'Mon ', 'Tue ', 'Wed ', 'Thu ', 'Fri ', 'Sat '];
	day.innerText = thday[d.getDay()];
	var mo = document.createElement('input');
	mo.type = 'number';
	mo.value = d.getMonth() + 1;
	mo.id = 'mo' + id;
	mo.classList.add('linput');
	var moLabel = document.createElement('label');
	moLabel.classList.add('rlabel');
	moLabel.setAttribute('for', 'mo' + id);
	var month = [
		0,
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];
	moLabel.innerText = month[d.getMonth() + 1];
	var dt = document.createElement('input');
	dt.type = 'number';
	dt.value = d.getDate();
	dt.id = 'dt' + id;
	var dtLabel = document.createElement('label');
	dtLabel.setAttribute('for', 'dt' + id);
	dtLabel.classList.add('narrow');
	dt.classList.add('linput');
	dtLabel.classList.add('rlabel');
	var px = function (b) {
		var px = [
			'th',
			'st',
			'nd',
			'rd',
			'th',
			'th',
			'th',
			'th',
			'th',
			'th',
			'th'
		][b % 10];
		if (b === 12 || b === 11) {
			px = 'th ';
		}
		return px;
	};
	var yr = document.createElement('input');
	yr.type = 'number';
	yr.id = 'yr' + id;
	yr.value = d.getFullYear();
	dtLabel.innerText = px(d.getDate());
	var inputs = function () {
		if (this === mo && mo.value < 1) {
			mo.value = 12;
		}
		if (this === mo && mo.value > 12) {
			mo.value = 1;
		}
		var s = mo.value.toString();
		if (
			this === mo &&
			((s.length >= 2 && s.charAt(0) === '1') ||
				(s.length >= 1 && s.charAt(0) !== '1'))
		) {
			dt.focus();
		}
		s = dt.value.toString();
		if (
			this === dt &&
			((s.length >= 2 && s.charAt(0) === '1') ||
				(s.length >= 1 &&
					s.charAt(0) !== '1' &&
					s.charAt(0) !== '2' &&
					s.charAt(0) !== '3'))
		) {
			yr.focus();
		}
		var newD = new Date(yr.value, mo.value, 0);
		if (this === dt && dt.value <= 0) {
			dt.value = newD.getDate();
		}
		if (this === dt && dt.value > newD.getDate()) {
			dt.value = 1;
		}
		if (this === yr && dt.value < 0) {
			dt.value = 1;
		}
		if (this === yr && dt.value > newD.getDate()) {
			dt.value = newD.getDate();
		}
		newD = new Date(yr.value, mo.value - 1, dt.value);
		day.innerText = thday[newD.getDay()];
		moLabel.innerText = month[mo.value];
		dtLabel.innerText = px(dt.value);
	};
	mo.addEventListener('input', inputs);
	dt.addEventListener('input', inputs);
	yr.addEventListener('input', inputs);
	var thisSelect = function () {
		this.select();
	};
	mo.addEventListener('focus', thisSelect);
	dt.addEventListener('focus', thisSelect);
	yr.addEventListener('focus', thisSelect);
	container.appendChild(mo);
	container.appendChild(moLabel);
	container.appendChild(dt);
	container.appendChild(dtLabel);
	container.appendChild(yr);
	container.appendChild(day);
	return container;
};
var timeByNumbers = function (id) {
	var d = new Date();
	var container = document.createElement('div');
	container.classList.add('date-input-bunch');
	var ho = document.createElement('input');
	ho.type = 'number';
	ho.value = d.getHours();
	ho.id = 'ho' + id;
	ho.classList.add('linput');
	var hoLabel = document.createElement('label');
	hoLabel.classList.add('rlabel');
	hoLabel.setAttribute('for', 'ho' + id);
	hoLabel.innerText = ':';
	hoLabel.classList.add('narrow');
	var mt = document.createElement('input');
	mt.type = 'number';
	mt.value = d.getMinutes();
	mt.id = 'mt' + id;
	mt.classList.add('linput');
	var pm = document.createElement('input');
	pm.type = 'checkbox';
	pm.id = 'pm' + id;
	var pmLabel = document.createElement('label');
	pmLabel.checked = d.getHours() >= 12;
	pmLabel.setAttribute('for', 'pm' + id);
	pmLabel.classList.add('rlabel');
	var inputs = function () {
		if (ho.value >= 12) {
			ho.value = 1;
		}
		if (ho.value <= 0) {
			ho.value = 12;
		}
		if (mt.value > 60) {
			mt.value = 1;
		}
		if (mt.value < 0) {
			mt.value = 60;
		}
		var s = ho.value.toString();
		if (
			this === ho &&
			((s.length >= 2 && s.charAt(0) === '1') ||
				(s.length >= 1 && s.charAt(0) !== '1'))
		) {
			mt.focus();
		}
		if (mt.value <= 9) {
			mt.value = '0' + mt.value;
		}
	};
	inputs();
	ho.addEventListener('input', inputs);
	mt.addEventListener('input', inputs);
	var thisSelect = function () {
		this.select();
	};
	ho.addEventListener('focus', thisSelect);
	mt.addEventListener('focus', thisSelect);
	container.appendChild(ho);
	container.appendChild(hoLabel);
	container.appendChild(mt);
	container.appendChild(pm);
	container.appendChild(pmLabel);
	return container;
};
var openReblogsWidget = function (e) {
	e.preventDefault();
	e.cancelBubble = true;
	e.stopPropagation();
	var navLinks = document.getElementsByClassName('post-state-nav-item');
	var nav = navLinks[0].parentNode;
	if (nav.classList.contains('open')) {
		nav.classList.remove('open');
	} else {
		var data = document.getElementById('mass_post_features-plugin_data');
		data.classList.add('open-blog_menu');
		var wGinput = document.getElementById('reblog-widget_input');
		wGinput.value = this.getAttribute('data-default-input');
		wGinput.setAttribute(
			'data-member-input',
			this.getAttribute('data-member-input')
		);
		wGinput.disabled = this.getAttribute('data-default-disabled') === '1';
		wGinput.setAttribute('data-url', this.getAttribute('data-default-url'));
		document.getElementById('reblog-widget_description').innerHTML =
			'Reblogging from the "' +
			this.getAttribute('data-default-description') +
			'"...';
		nav.classList.add('open');
	}
};
var reblogMenuButton = function (name) {
	var button = document.createElement('button');
	button.setAttribute(
		'title',
		'Batch reblog selected posts to "' + name + '"'
	);
	var svg = svgForType['reblog-self'].cloneNode(true);
	svg.setAttribute('width', '11');
	svg.setAttribute('height', '11');
	svg.setAttribute('fill', '#fff');
	button.appendChild(svg);
	button.appendChild(document.createTextNode(' BATCH REBLOG SELECTED'));
	button.setAttribute('data-edit_action', 'reblog');
	button.setAttribute('data-name', name);
	button.addEventListener('click', function () {
		var data = document.getElementById('mass_post_features-plugin_data');
		data.setAttribute(
			'data-reblog-to-here',
			this.getAttribute('data-name')
		);
		var rb = document.getElementsByClassName('reblog-to-here');
		while (rb.length > 0) {
			rb[0].classList.remove('reblog-to-here');
		}
		document
			.getElementById('reblog-to_' + this.getAttribute('data-name'))
			.classList.add('reblog-to-here');
		data.setAttribute(
			'data-reblog-to-here',
			this.getAttribute('data-name')
		);
		fetchEditSubmitMulti.apply(this, arguments);
	});
	return button;
};
var dragEnter = function (e) {
	e.preventDefault();
	if (document.getElementsByClassName('brick-dragging').length > 0) {
		return;
	}
	var pdz = document.getElementById('photos-drop-zone');
	pdz.classList.add('full');
};
var dragLeave = function (e) {
	e.preventDefault();
	var pdz = document.getElementById('photos-drop-zone');
	pdz.classList.remove('full');
};
var drop = function (e) {
	e.preventDefault();
	var papb = document.getElementById('post_all_photos_button');
	if (papb.getAttribute('disabled') !== null) {
		papb.removeAttribute('disabled');
	}
	var pdz = document.getElementById('photos-drop-zone');
	pdz.classList.remove('full');
	var files;
	if (typeof e.dataTransfer !== 'undefined') {
		files = e.dataTransfer.files;
	} else if (typeof this.files !== 'undefined') {
		files = this.files;
	}
	var r;
	for (var i = 0; i < files.length; i++) {
		if (files[i].type.toString().split(/\//)[0] !== 'image') {
			continue;
		}
		r = new FileReader();
		r.imgCode = 'img' + shortCode(files[i].name);
		r.addEventListener('load', loadPhotoIntoDOM);
		reading.push({
			read: function () {
				reading[reading.length - 1].reader.readAsDataURL(
					reading[reading.length - 1].file
				);
			},
			file: files[i],
			reader: r
		});
		unreadFile['img' + shortCode(files[i].name)] = files[i];
	}
	reading[reading.length - 1].read();
};
