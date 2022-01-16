// ==UserScript==
// @name        Tumblr - Mass Post Editor Features
// @namespace   https://jakejilg.com/mass_post_features
// @description MassReblog ArchiveDashTaggedLikes SelectShowBy:TagType MouseMultiSelect BackdateSchedule CaptionLink BatchPhotoset FollowersFollowees +more
// @include     https://www.tumblr.com/mega-editor
// @include     https://www.tumblr.com/mega-editor/*
// @include     https://www.tumblr.com/mega-editor/*/*/*
// @include     https://*/archive?fetch=first_post_timestamp&jump=*&name=*&to=*&year=*
// @version     4.01
// @grant       none
// @run-at      document-start
// ==/UserScript==

// May 2020, Mass Post Editor Features 4 (from scratch) by Jake Jilg (benign-mx)

// this month widget stuff for both includes pages
var MassPostEditorFeatures4 = function () {
	var pauseFrag1 = document.createDocumentFragment();
	var playSpan = document.createElement('span');
	playSpan.classList.add('play');
	playSpan.innerHTML = '&#x25B6;';
	var pauseSpan = document.createElement('span');
	pauseSpan.classList.add('pause');
	pauseSpan.innerHTML = '&#x2590;&#x2590;';
	pauseFrag1.appendChild(playSpan);
	pauseFrag1.appendChild(pauseSpan);
	var pause_chrome = newChromeButton('pause', pauseFrag1, false);
	var pauseFrag2 = document.createDocumentFragment();
	var canvas = document.createElement('canvas');
	canvas.id = 'status';
	canvas.width = 72;
	canvas.height = 15;
	var pLoaded = document.createElement('span');
	pLoaded.id = 'p_loaded';
	pLoaded.appendChild(document.createTextNode('x0'));
	pauseFrag2.appendChild(canvas);
	pauseFrag2.appendChild(pLoaded);
	var ajaxInfo_chrome = newChromeButton('ajax-info', pauseFrag2, false);
	// gutter control (easy)
	var gutterFrag = document.createDocumentFragment();
	var gutterInputCheck = document.createElement('input');
	gutterInputCheck.type = 'checkbox';
	gutterInputCheck.checked = false;
	var gutterInputNumber = document.createElement('input');
	gutterInputNumber.type = 'number';
	gutterInputNumber.value = 6;
	gutterInputCheck.id = 'gutter-checkbox';
	var gutterLabel = document.createTextNode('Gutter');
	var newGutterChange = function () {
		var data = document.getElementById('mass_post_features-plugin_data');
		var newGutter = gutterInputNumber.value;
		if (gutterInputCheck.checked) {
			data.setAttribute('data-column_gutter', newGutter);
		} else {
			data.setAttribute('data-column_gutter', '6');
		}
		pluginBuildColumns();
	};
	gutterInputCheck.addEventListener('change', newGutterChange);
	gutterInputNumber.addEventListener('change', newGutterChange);
	gutterFrag.appendChild(gutterInputCheck);
	gutterFrag.appendChild(gutterLabel);
	gutterFrag.appendChild(gutterInputNumber);
	gutterInputNumber.addEventListener('click', function (e) {
		e.stopPropagation();
		e.preventDefault();
		e.cancelBubble = true;
	});
	gutterInputCheck.addEventListener('click', function (e) {
		this.checked = !this.checked;
	});
	var gutter_chrome = newChromeButton('gutter', gutterFrag, false);
	gutter_chrome
		.getElementsByTagName('button')[0]
		.addEventListener('click', function () {
			var b = this.getElementsByTagName('input')[0];
			b.checked = !b.checked;
			newGutterChange();
		});
	// view captions
	var hoverSpan = document.createElement('span');
	var hoverLabel = document.createElement('label');
	var hoverCheck = document.createElement('input');
	hoverCheck.type = 'checkbox';
	hoverCheck.id = 'hover-only';
	hoverCheck.addEventListener('change', function () {
		var lcontent = document.getElementsByClassName('l-content')[0];
		if (this.checked) {
			lcontent.classList.remove('hoverless');
			setCookie('view_hover', 'on', 99);
		} else {
			lcontent.classList.add('hoverless');
			setCookie('view_hover', '', -1);
		}
	});
	hoverLabel.appendChild(svgForType.see.cloneNode(true));
	hoverLabel.appendChild(document.createTextNode('+Hover'));
	hoverLabel.setAttribute('for', 'hover-only');
	hoverSpan.appendChild(hoverCheck);
	hoverSpan.appendChild(hoverLabel);
	var captionsFrag = document.createDocumentFragment();
	captionsFrag.appendChild(svgForType.see.cloneNode(true));
	captionsFrag.appendChild(svgForType.caption.cloneNode(true));
	var captions_chrome = newChromeButton('view-captions', captionsFrag, false);
	captions_chrome
		.getElementsByTagName('button')[0]
		.addEventListener('click', function () {
			var lcontent = document.getElementsByClassName('l-content')[0];
			if (lcontent.classList.contains('with-captions')) {
				lcontent.classList.remove('with-captions');
				setCookie('view_captions', '', -1);
				this.removeAttribute('style');
				for (i = 0; i < 2; i++) {
					this.getElementsByTagName('svg')[i].setAttribute(
						'fill',
						'#fff'
					);
				}
			} else {
				lcontent.classList.add('with-captions');
				setCookie('view_captions', 'on', 99);
				this.style.color = 'rgba(0,65,100,1)';
				this.children[0].setAttribute('fill', 'rgba(0,65,100,1');
				this.style.boxShadow = 'inset 0 3px 2px 2px rgba(0,0,0,0.4)';
				for (i = 0; i < 2; i++) {
					this.getElementsByTagName('svg')[i].setAttribute(
						'fill',
						'rgba(0,65,100,1)'
					);
				}
			}
		});
	// editlinksReblogLikeButton
	var linksFrag = document.createDocumentFragment();
	linksFrag.appendChild(svgForType.see.cloneNode(true));
	linksFrag.appendChild(svgForType.notes.cloneNode(true));
	linksFrag.appendChild(svgForType['reblog-self'].cloneNode(true));
	linksFrag.appendChild(svgForType.edit.cloneNode(true));
	var links_chrome = newChromeButton('view-links', linksFrag, false);
	links_chrome
		.getElementsByTagName('button')[0]
		.addEventListener('click', function () {
			var i;
			var lcontent = document.getElementsByClassName('l-content')[0];
			if (lcontent.classList.contains('with-links')) {
				for (i = 0; i < 4; i++) {
					this.getElementsByTagName('svg')[i].setAttribute(
						'fill',
						'#fff'
					);
				}
				this.removeAttribute('style');
				lcontent.classList.remove('with-links');
				setCookie('view_links', '', -1);
			} else {
				for (i = 0; i < 4; i++) {
					this.getElementsByTagName('svg')[i].setAttribute(
						'fill',
						'rgba(0,65,100,1)'
					);
				}
				this.style.boxShadow = 'inset 0 3px 2px 2px rgba(0,0,0,0.4)';
				lcontent.classList.add('with-links');
				setCookie('view_links', 'on', 99);
			}
		});
	// pause buttons
	pause_chrome.getElementsByTagName('button')[0].classList.add('playing');
	pause_chrome
		.getElementsByTagName('button')[0]
		.addEventListener('click', function () {
			if (this.classList.contains('done')) {
				return;
			}
			var b = this.classList.contains('playing');
			this.classList.add(b ? 'paused' : 'playing');
			this.classList.remove(!b ? 'paused' : 'playing');
		});
	ajaxInfo_chrome
		.getElementsByTagName('button')[0]
		.addEventListener('click', function () {
			var pause = document.getElementById('pause_button');
			if (pause.classList.contains('done')) {
				return;
			}
			var b = pause.classList.contains('playing');
			pause.classList.add(b ? 'paused' : 'playing');
			pause.classList.remove(!b ? 'paused' : 'playing');
		});
	ajaxInfo_chrome.setAttribute('title', 'Time Till Next Page - Posts Loaded');
	pause_chrome.setAttribute('title', 'Pause Page Loading');
	selectAll_chrome
		.getElementsByTagName('button')[0]
		.addEventListener('click', function () {
			var data = document.getElementById(
				'mass_post_features-plugin_data'
			);
			var idsAllArr = JSON.parse(data.getAttribute('data-ids_all_arr'));
			var alreadyHidden = data.classList.contains(
				'some-posts-already-hidden'
			);
			var visibleIdsAllArr = JSON.parse(
				data.getAttribute('data-visible_ids_all_arr')
			);
			var needle = parseFloat(
				data.getAttribute('data-select-all_needle')
			);
			var id;
			var hlBrick;
			var unSelctBrick;
			var firstNeedle = needle;
			var i;
			var limit = 100; // tumblr limit; not mine
			var selectedCount = 0;
			unSelctBrick = document.getElementsByClassName('highlighted');
			while (unSelctBrick.length > 0) {
				highlightBrick(unSelctBrick[0], 0);
			}
			if (alreadyHidden) {
				// select from visible
				while (
					needle < visibleIdsAllArr.length &&
					needle < firstNeedle + limit
				) {
					id = visibleIdsAllArr[needle];
					hlBrick = document.getElementById('post_' + id);
					if (hlBrick !== null) {
						highlightBrick(hlBrick, 1);
						selectedCount++;
					}
					needle++;
				}
			} else {
				// select from all
				while (
					needle < idsAllArr.length &&
					needle < firstNeedle + limit
				) {
					id = idsAllArr[needle];
					hlBrick = document.getElementById('post_' + id);
					if (hlBrick !== null) {
						highlightBrick(hlBrick, 1);
						selectedCount++;
					}
					needle++;
				}
			}
			this.getElementsByTagName('span')[0].innerHTML = '100 More';
			if (selectedCount < limit) {
				needle = 0;
				this.getElementsByTagName('span')[0].innerHTML = 'Select 100';
			}
			data.setAttribute('data-select-all_needle', needle);
		});
	document
		.getElementById('delete_posts')
		.parentNode.classList.add('remove-in-third-party-mode');
	document.getElementById('delete_posts');
	document
		.getElementById('remove_tags')
		.parentNode.classList.add('remove-in-third-party-mode');
	document
		.getElementById('add_tags')
		.parentNode.classList.add('remove-in-third-party-mode');
	var href = document.location.href.split(/[\/\?&#=]+/g);
	var name = href[4];
	links_chrome.setAttribute(
		'title',
		href[5] !== 'follows' && href[5] !== 'following'
			? 'Links: See tags. View Posts. Edit posts.'
			: 'Links: Follow/Unfollow URL Peepr ect.'
	);
	captions_chrome.setAttribute('title', 'See photo captions.');
	selectBy_chrome.setAttribute('title', 'Select posts by tag.');
	ajaxInfo_chrome.setAttribute('title', 'Pause posts loading.');
	selectBy_chrome.setAttribute('title', 'Pause posts loading.');
	selectAll_chrome.setAttribute('title', 'Select all posts.');
	gutter_chrome.setAttribute('title', 'Create bigger gutters.');
	// this is the make private button
	var privateFrag = document.createDocumentFragment();
	privateFrag.appendChild(svgForType.private.cloneNode(true));
	var privateSpan = document.createElement('span');
	privateSpan.appendChild(document.createTextNode('Private'));
	privateFrag.appendChild(privateSpan);
	var private_chrome = newChromeButton('private', privateFrag, false);
	private_chrome.classList.add('remove-in-third-party-mode');
	private_chrome
		.getElementsByTagName('button')[0]
		.addEventListener('click', fetchEditSubmitMulti);
	private_chrome.getElementsByTagName('button')[0].disabled = true;
	private_chrome
		.getElementsByTagName('button')[0]
		.classList.add('disable-when-none-selected');
	private_chrome.classList.add('remove-in-third-party-mode');
	private_chrome.classList.add('remove-in-drafts-queue-mode');
	private_chrome.setAttribute('title', 'Make selected private/unprivate.');
	// append chromeButtons
	var unselectFrag = document.createDocumentFragment();
	var unselectIcon = svgForType.unselect.cloneNode(true);
	unselectIcon.setAttribute('width', '15');
	unselectIcon.setAttribute('height', '15');
	unselectFrag.appendChild(unselectIcon);
	var unselectSpan = document.createElement('span');
	unselectSpan.classList.add('chrome_button');
	unselectSpan.appendChild(document.createTextNode('UnSelect'));
	unselectFrag.appendChild(unselectSpan);
	var cbr = document.createElement('span');
	cbr.classList.add('chrome_button_right');
	unselectFrag.appendChild(cbr);
	var unslect = document.getElementById('unselect');
	unslect.innerHTML = '';
	unslect.appendChild(unselectFrag);
	var unPnt = unslect.parentNode;
	var rtPnt = document.getElementById('remove_tags').parentNode;
	var dlPnt = document.getElementById('delete_posts').parentNode;
	// editor navigation
	var remTag = document.getElementById('remove_tags').children[0];
	remTag.innerHTML = '';
	var remFrag = document.createDocumentFragment();
	var remSymbol = document.createElement('h2');
	remSymbol.appendChild(document.createTextNode('-'));
	var addTag = document.getElementById('add_tags').children[0];
	addTag.innerHTML = '';
	remFrag.appendChild(remSymbol);
	remFrag.appendChild(document.createTextNode('Tags'));
	var addSymbol = document.createElement('h2');
	var addFrag = document.createDocumentFragment();
	addSymbol.appendChild(document.createTextNode('+'));
	addFrag.appendChild(addSymbol);
	var captionFrag = document.createDocumentFragment();
	captionFrag.appendChild(addSymbol.cloneNode(true));
	captionFrag.appendChild(document.createTextNode('Caption'));
	var caption_chrome = newChromeButton('add-caption', captionFrag, true);
	caption_chrome.classList.add('remove-in-third-party-mode');
	var caption_widget = caption_chrome.getElementsByClassName('widget')[0];
	var caption_check = caption_chrome.getElementsByTagName('input')[0];
	caption_check.classList.add('disable-when-none-selected');
	caption_check.disabled = true;
	caption_chrome.setAttribute('title', 'Caption selected posts.');
	// this part is all add caption widget
	var rich2 = document.createElement('div');
	rich2.setAttribute('title', 'caption');
	rich2.id = 'rich_text_caption';
	rich2.contentEditable = true;
	rich2.designMode = 'on';
	rich2.classList.add('rich');
	appendRichButtons(caption_widget, rich2, caption_widget);
	var captionTitle = document.createElement('h2');
	captionTitle.appendChild(document.createTextNode('Caption Posts'));
	var captionSubtitle = document.createElement('div');
	captionSubtitle.appendChild(
		document.createTextNode('Image,Video,Audio,Quote,Link,Chat, and Text')
	);
	caption_widget.appendChild(captionTitle);
	caption_widget.appendChild(captionSubtitle);
	caption_widget.appendChild(rich2);
	var pendContainer = document.createElement('div');
	pendContainer.classList.add('pend-container');
	var pend1 = document.createElement('div');
	var pend2 = document.createElement('div');
	var pend3 = document.createElement('div');
	var b4Radio = document.createElement('input');
	b4Radio.id = 'prepend-caption-option';
	var b4Label = document.createElement('label');
	b4Label.setAttribute('for', 'prepend-caption-option');
	b4Label.appendChild(document.createTextNode('Prepend'));
	var owRadio = document.createElement('input');
	owRadio.id = 'overwrite-caption-option';
	var owLabel = document.createElement('label');
	owLabel.setAttribute('for', 'overwrite-caption-option');
	owLabel.appendChild(document.createTextNode('Overwrite'));
	var owWarn = document.createElement('span');
	owWarn.classList.add('robot-warning');
	owWarn.appendChild(
		document.createTextNode(
			'This will erase and replace the whole text body of any post.'
		)
	);
	var afRadio = document.createElement('input');
	afRadio.id = 'append-caption-option';
	var afLabel = document.createElement('label');
	afLabel.setAttribute('for', 'append-caption-option');
	afLabel.appendChild(document.createTextNode('Append'));
	b4Radio.type = 'radio';
	b4Radio.name = 'pend';
	b4Radio.classList.add('pend');
	pend1.appendChild(b4Radio);
	pend1.appendChild(b4Label);
	owRadio.type = 'radio';
	owRadio.name = 'pend';
	owRadio.classList.add('pend');
	pend2.appendChild(owRadio);
	pend2.appendChild(owLabel);
	pend2.appendChild(owWarn);
	afRadio.type = 'radio';
	afRadio.name = 'pend';
	afRadio.classList.add('pend');
	afRadio.checked = true;
	pend3.appendChild(afRadio);
	pend3.appendChild(afLabel);
	pendContainer.appendChild(pend1);
	pendContainer.appendChild(pend2);
	pendContainer.appendChild(pend3);
	caption_widget.appendChild(pendContainer);
	var capButt = butt('Add Caption');
	capButt.id = 'add-caption_button2';
	capButt.setAttribute('data-edit_action', 'caption');
	capButt.style.top = '268px';
	capButt.style.right = '9px';
	capButt.style.padding = '0 7px';
	capButt.addEventListener('click', fetchEditSubmitMulti);
	caption_widget.appendChild(capButt);
	var cancelCaption = butt('Cancel3');
	cancelCaption.addEventListener('click', function () {
		document.getElementById('add-caption').checked = false;
	});
	cancelCaption.style.top = '238px';
	cancelCaption.style.right = '9px';
	cancelCaption.style.padding = '0 7px';
	cancelCaption.setAttribute('title', 'Close widget');
	caption_widget.appendChild(cancelCaption);
	// this part is backdate widget
	var scheduleInstead = href[3] === 'draft';
	var backdateFrag = document.createDocumentFragment();
	backdateFrag.appendChild(svgForType.clock.cloneNode(true));
	backdateFrag.appendChild(
		document.createTextNode(scheduleInstead ? 'Schedule' : 'BackDate')
	);
	var backdate_chrome = newChromeButton('backdate', backdateFrag, true);
	backdate_chrome.classList.add('remove-in-third-party-mode');
	var backdate_widget = backdate_chrome.getElementsByClassName('widget')[0];
	var backdate_check = backdate_chrome.getElementsByTagName('input')[0];
	backdate_check.addEventListener('change', function () {
		if (!this.checked) {
			return;
		}
		var hl = document.getElementsByClassName('highlighted');
		var d1 = new Date(
			parseInt(hl[0].getAttribute('data-timestamp')) * 1000
		);
		var d2 = new Date(
			parseInt(hl[hl.length - 1].getAttribute('data-timestamp')) * 1000
		);
		var inp = new Event('input');
		document.getElementById('moleft').value = d1.getMonth() + 1;
		document.getElementById('moright').value = d2.getMonth() + 1;
		document.getElementById('dtleft').value = d1.getDate();
		document.getElementById('dtright').value = d2.getDate();
		document.getElementById('yrleft').value = d1.getFullYear();
		document.getElementById('yrright').value = d2.getFullYear();
		document.getElementById('holeft').value =
			d1.getHours() >= 12 ? d1.getHours() - 12 : d1.getHours();
		document.getElementById('horight').value =
			d2.getHours() >= 12 ? d2.getHours() - 12 : d2.getHours();
		document.getElementById('mtleft').value = d1.getMinutes();
		document.getElementById('mtright').value = d2.getMinutes();
		document.getElementById('pmleft').checked = d1.getHours() >= 12;
		document.getElementById('pmright').checked = d2.getHours() >= 12;
		document.getElementById('moleft').dispatchEvent(inp);
		document.getElementById('moright').dispatchEvent(inp);
		document.getElementById('mtleft').dispatchEvent(inp);
		document.getElementById('mtright').dispatchEvent(inp);
	});
	backdate_check.classList.add('disable-when-none-selected');
	backdate_check.disabled = true;
	backdate_chrome.setAttribute(
		'title',
		scheduleInstead
			? 'Schedule up to 200 posts.'
			: 'Backdate selected posts.'
	);
	var bdBody = document.createElement('div');
	bdBody.id = 'backdate-body';
	var backdateTitle = document.createElement('h2');
	var backdateRules = document.createElement('div');
	backdateTitle.appendChild(
		document.createTextNode(
			scheduleInstead
				? 'Schedule Month/Date/Year'
				: 'BackDate Month/Date/Year'
		)
	);
	backdateRules.appendChild(document.createTextNode(' '));
	bdBody.appendChild(backdateTitle);
	bdBody.appendChild(backdateRules);
	// I don't like new-fangled type="date" inputs that throw NaN sometimes

	var bddate1 = dateByNumbers('left');
	var bddate2 = dateByNumbers('right');
	var bdrowDate = document.createElement('div');
	var bdinput1 = document.createElement('input');
	var bdinput2 = document.createElement('input');
	var bdinput3 = document.createElement('input');
	var bdlabel1 = document.createElement('label');
	var bdlabel2 = document.createElement('label');
	var bdlabel3 = document.createElement('label');
	bdinput1.id = 'bd-no-day';
	bdinput2.id = 'bd-one-day';
	bdinput3.id = 'bd-two-day';
	bdinput2.checked = true;
	bdinput1.name = 'bd-date-option';
	bdinput2.name = 'bd-date-option';
	bdinput3.name = 'bd-date-option';
	bdlabel1.setAttribute('for', 'bd-no-day');
	bdlabel2.setAttribute('for', 'bd-one-day');
	bdlabel3.setAttribute('for', 'bd-two-day');
	bdlabel1.appendChild(document.createTextNode('Keep Same Date'));
	bdlabel2.appendChild(document.createTextNode('All Same Date'));
	bdlabel3.appendChild(document.createTextNode('Between Dates'));
	bdinput1.type = 'radio';
	bdinput2.type = 'radio';
	bdinput3.type = 'radio';
	bdrowDate.appendChild(bdinput2);
	bdrowDate.appendChild(bdlabel2);
	bdrowDate.appendChild(bdinput3);
	bdrowDate.appendChild(bdlabel3);
	bdrowDate.appendChild(bdinput1);
	bdrowDate.appendChild(bdlabel1);
	bdrowDate.appendChild(bddate1);
	bdrowDate.appendChild(bddate2);
	bdBody.appendChild(bdrowDate);
	backdateTitle = document.createElement('h2');
	backdateRules = document.createElement('div');
	backdateTitle.appendChild(
		document.createTextNode(
			scheduleInstead ? 'Schedule Hour:Minute' : 'BackDate Hour:Minute'
		)
	);
	backdateRules.appendChild(document.createTextNode(' '));
	bdBody.appendChild(backdateTitle);
	bdBody.appendChild(backdateRules);
	var btrowTime = document.createElement('div');
	var btinput1 = document.createElement('input');
	var btinput2 = document.createElement('input');
	var btinput3 = document.createElement('input');
	var btlabel1 = document.createElement('label');
	var btlabel2 = document.createElement('label');
	var btlabel3 = document.createElement('label');
	btinput1.id = 'bt-no-time';
	btinput2.id = 'bt-one-time';
	btinput3.id = 'bt-two-time';
	btinput1.checked = true;
	btinput1.name = 'bt-time-option';
	btinput2.name = 'bt-time-option';
	btinput3.name = 'bt-time-option';
	btlabel1.setAttribute('for', 'bt-no-time');
	btlabel2.setAttribute('for', 'bt-one-time');
	btlabel3.setAttribute('for', 'bt-two-time');
	btlabel1.appendChild(document.createTextNode('Keep Same Time'));
	btlabel2.appendChild(document.createTextNode('All Same Time'));
	btlabel3.appendChild(document.createTextNode('Between Times'));
	btinput1.type = 'radio';
	btinput2.type = 'radio';
	btinput3.type = 'radio';
	btrowTime.appendChild(btinput2);
	btrowTime.appendChild(btlabel2);
	btrowTime.appendChild(btinput3);
	btrowTime.appendChild(btlabel3);
	btrowTime.appendChild(btinput1);
	btrowTime.appendChild(btlabel1);

	var btTime1 = timeByNumbers('left');
	var btTime2 = timeByNumbers('right');
	btrowTime.appendChild(btTime1);
	btrowTime.appendChild(btTime2);
	bdBody.appendChild(btrowTime);
	backdateRules = document.createElement('i');
	backdateRules.appendChild(
		document.createTextNode(
			'Visual Post-Brick-Re-Order Happens After Reload'
		)
	);
	var backdate2 = butt('Backdate2');
	if (scheduleInstead) {
		backdate2.children[0].innerHTML = 'Schedule';
	}
	backdate2.setAttribute('data-edit_action', 'backdate');
	var cancelBackdate = butt('Cancel4');
	cancelBackdate.addEventListener('click', function () {
		document.getElementById('backdate').checked = false;
	});
	backdate2.addEventListener('click', fetchEditSubmitMulti);
	bdBody.appendChild(backdateRules);
	bdBody.appendChild(backdate2);
	bdBody.appendChild(cancelBackdate);
	backdate_widget.appendChild(bdBody);
	// this is the other stuff that squeezes into a widget/button
	var urlFrag = document.createDocumentFragment();
	var urlSVG = svgForType.symlink.cloneNode(true);
	urlSVG.setAttribute('viewBox', '2 2 13 13');
	urlFrag.appendChild(urlSVG); // :D
	urlFrag.appendChild(document.createTextNode('URLs'));
	var url_chrome = newChromeButton('urlstuff', urlFrag, true);
	url_chrome.classList.add('remove-in-third-party-mode');
	var url_widget = url_chrome.getElementsByClassName('widget')[0];
	var url_check = url_chrome.getElementsByTagName('input')[0];
	url_check.disabled = true;
	url_check.classList.add('disable-when-none-selected');
	var urlRow1 = document.createElement('div');
	var urlTitle1 = document.createElement('h2');
	urlTitle1.appendChild(document.createTextNode('Source URL'));
	urlRow1.appendChild(urlTitle1);
	var urlInput1 = document.createElement('input'); // source URL
	urlInput1.type = 'text';
	urlInput1.id = 'source_url';
	var urlRow2 = document.createElement('div');
	var urlTitle2 = document.createElement('h2');
	urlTitle2.appendChild(document.createTextNode('ClickThrough Link'));
	var urlInput2 = document.createElement('input'); // clickthrough
	urlInput2.type = 'text';
	urlInput2.id = 'clickthrough';
	var urlRow3 = document.createElement('div');
	var urlTitle3 = document.createElement('h2');
	urlTitle3.innerHTML = '.../URL/<b>slug</b>';
	var urlInput3 = document.createElement('input'); // slug
	urlInput3.type = 'text';
	urlInput3.id = 'slug';
	var urlThing = document.createElement('div');
	urlThing.id = 'urlstuff_body';
	var addURL = butt('Add URLs');
	addURL.addEventListener('click', fetchEditSubmitMulti);

	setURLValues();
	urlInput1.addEventListener('input', setURLValues);
	urlInput2.addEventListener('input', setURLValues);
	urlInput3.addEventListener('input', setURLValues);
	var urlRules1 = document.createElement('div');
	urlRules1.appendChild(document.createTextNode('(Original Posts Only)'));
	var urlRules2 = document.createElement('div');
	urlRules2.appendChild(document.createTextNode('Leave Blank to Remove'));
	var urlRules3 = document.createElement('div');
	urlRules3.appendChild(document.createTextNode('Media/Image Posts Only'));
	urlRow1.appendChild(urlTitle1);
	urlRow1.appendChild(urlInput1);
	urlRow2.appendChild(urlTitle2);
	urlRow2.appendChild(urlInput2);
	urlRow3.appendChild(urlTitle3);
	urlRow3.appendChild(urlInput3);
	urlThing.appendChild(urlRules2);
	urlThing.appendChild(urlRow3);
	urlThing.appendChild(urlRow1);
	urlThing.appendChild(urlRules1);
	urlThing.appendChild(urlRow2);
	urlThing.appendChild(urlRules3);
	var cancelURL = butt('Cancel5');
	cancelURL.addEventListener('click', function () {
		document.getElementById('urlstuff').checked = false;
	});
	urlThing.appendChild(cancelURL);
	urlThing.appendChild(addURL);
	url_widget.appendChild(urlThing);
	// this part is mixing the editor nav panel a bit
	addFrag.appendChild(document.createTextNode('Tags'));
	addTag.appendChild(addFrag);
	addTag.setAttribute('title', 'Add tags, from selected posts...');
	remTag.appendChild(remFrag);
	remTag.setAttribute('title', 'Remove tags, from selected posts...');
	// get rid of oddly inline style attributes
	document.getElementById('tags').removeAttribute('style');
	// append all our new buttons "buttoned"
	en.insertBefore(pause_chrome, rtPnt);
	en.insertBefore(ajaxInfo_chrome, rtPnt);
	en.insertBefore(gutter_chrome, rtPnt);
	en.insertBefore(links_chrome, rtPnt);
	en.insertBefore(captions_chrome, rtPnt);
	en.insertBefore(hoverSpan, rtPnt);
	en.insertBefore(caption_chrome, rtPnt);
	en.insertBefore(backdate_chrome, rtPnt);
	en.insertBefore(url_chrome, rtPnt);
	en.insertBefore(private_chrome, rtPnt);
	en.appendChild(dlPnt);
	// turn links on by default
	if (getCookie('view_links') === 'on') {
		document
			.getElementById('view-links_button')
			.dispatchEvent(new Event('click'));
	}
	if (getCookie('view_captions') === 'on') {
		document
			.getElementById('view-captions_button')
			.dispatchEvent(new Event('click'));
	}
	if (getCookie('view_hover') === 'on') {
		document.getElementById('hover-only').checked = true;
		document
			.getElementById('hover-only')
			.dispatchEvent(new Event('change'));
	} else {
		lcontent.classList.add('hoverless');
	}
	// extra buttons for queue/drafts
	if (href[3] === 'draft' || href[3] === 'queued') {
		var publish_chrome = newChromeButton('publish', 'Publish', false);
		publish_chrome
			.getElementsByTagName('button')[0]
			.setAttribute('data-edit_action', '{"post[state]":"0"}');
		publish_chrome
			.getElementsByTagName('button')[0]
			.addEventListener('click', fetchEditSubmitMulti);
		en.insertBefore(publish_chrome, rtPnt);
	}
	if (href[3] === 'draft') {
		var queue_chrome = newChromeButton('queue', 'Queue Drafts', false);
		queue_chrome
			.getElementsByTagName('button')[0]
			.setAttribute('data-edit_action', '{"post[state]":"2"}');
		queue_chrome
			.getElementsByTagName('button')[0]
			.addEventListener('click', fetchEditSubmitMulti);
		en.insertBefore(queue_chrome, rtPnt);
	}
	if (href[3] === 'queued') {
		var makeDraft_chrome = newChromeButton('make-draft', 'ReDraft', false);
		makeDraft_chrome
			.getElementsByTagName('button')[0]
			.setAttribute('data-edit_action', '{"post[state]":"1"}');
		makeDraft_chrome
			.getElementsByTagName('button')[0]
			.addEventListener('click', fetchEditSubmitMulti);
		en.insertBefore(makeDraft_chrome, rtPnt);
	}
	en.insertBefore(selectBy_chrome, unPnt);
	en.insertBefore(selectAll_chrome, dlPnt);
	var navLinks = document.getElementsByClassName('post-state-nav-item');
	var navDash = document.createElement('a');
	var navInputContainer = document.createElement('div');
	navInputContainer.classList.add('widget');
	navInputContainer.id = 'reblog_widget';
	var navWidgetTrow = document.createElement('div');
	navWidgetTrow.classList.add('trow');
	var navWidgetInner = document.createElement('div');
	navWidgetInner.classList.add('inner');
	var navWidgetH2 = document.createElement('h2');
	navWidgetH2.appendChild(
		document.createTextNode('Load From Page for ReBlog')
	);
	navWidgetH2.id = 'reblog-widget_h2';
	navWidgetInner.appendChild(navWidgetH2);
	var reblogDescription = document.createElement('div');
	reblogDescription.innerHTML = 'Reblogging from the "dashboard"...';
	reblogDescription.id = 'reblog-widget_description';
	var reblogInputText = document.createElement('input');
	reblogInputText.type = 'text';
	reblogInputText.addEventListener('focus', function () {
		this.select();
	});
	reblogInputText.disabled = true;
	reblogInputText.id = 'reblog-widget_input';
	reblogInputText.value = 'dashboard';
	var loadp = butt('Load Page');

	reblogInputText.addEventListener('keyup', function (e) {
		if (e.keyCode === 13) {
			loadpSubmit();
		}
	});
	loadp.addEventListener('click', loadpSubmit);
	var cancelp = butt('Cancel2');
	cancelp.setAttribute(
		// so these aren't "undefined"
		'data-default-input',
		'null'
	);
	cancelp.setAttribute('data-default-disabled', 'null');
	cancelp.setAttribute('data-default-description', 'null');
	cancelp.setAttribute('data-default-url', 'null');

	cancelp.addEventListener('click', openReblogsWidget);
	navWidgetInner.appendChild(reblogInputText);
	navWidgetInner.appendChild(loadp);
	navWidgetInner.appendChild(cancelp);
	var robotWarningReblogs = document.createElement('div');
	var robotTitleReblogs = document.createElement('strong');
	robotTitleReblogs.appendChild(
		document.createTextNode('Friendly Robot Warning')
	);
	robotWarningReblogs.classList.add('robot-warning');
	robotWarningReblogs.appendChild(robotTitleReblogs);
	robotWarningReblogs.appendChild(
		document.createTextNode(
			'Please: utilize "Pause Button" for extra long feeds. ' +
				'Please: Reblog responsibly!'
		)
	);
	navWidgetInner.appendChild(reblogDescription);
	navWidgetInner.appendChild(robotWarningReblogs);
	navWidgetTrow.appendChild(navWidgetInner);
	navInputContainer.appendChild(navWidgetTrow);
	navLinks[0].parentNode.appendChild(navInputContainer);
	navDash.appendChild(svgForType['reblog-self'].cloneNode(true));
	navDash.appendChild(document.createTextNode('Dashboard'));
	navDash.getElementsByTagName('svg')[0].setAttribute('width', 15);
	navDash.getElementsByTagName('svg')[0].setAttribute('height', 15);
	navDash.getElementsByTagName('svg')[0].setAttribute('fill', '#fff');
	var navChive = document.createElement('a');
	navChive.appendChild(svgForType['reblog-self'].cloneNode(true));
	navChive.appendChild(document.createTextNode('Archive'));
	navChive.getElementsByTagName('svg')[0].setAttribute('width', 15);
	navChive.getElementsByTagName('svg')[0].setAttribute('height', 15);
	navChive.getElementsByTagName('svg')[0].setAttribute('fill', '#fff');
	var navTagged = document.createElement('a');
	navTagged.appendChild(svgForType['reblog-self'].cloneNode(true));
	navTagged.appendChild(document.createTextNode('Tagged'));
	navTagged.id = 'nav-tagged';
	navTagged.getElementsByTagName('svg')[0].setAttribute('width', 15);
	navTagged.getElementsByTagName('svg')[0].setAttribute('height', 15);
	navTagged.getElementsByTagName('svg')[0].setAttribute('fill', '#fff');
	var navSearch = document.createElement('a');
	navSearch.appendChild(svgForType['reblog-self'].cloneNode(true));
	navSearch.appendChild(document.createTextNode('Search'));
	navSearch.getElementsByTagName('svg')[0].setAttribute('width', 15);
	navSearch.getElementsByTagName('svg')[0].setAttribute('height', 15);
	navSearch.getElementsByTagName('svg')[0].setAttribute('fill', '#fff');
	var navLikes = document.createElement('a');
	navLikes.id = 'nav-likes';
	navLikes.appendChild(svgForType['reblog-self'].cloneNode(true));
	navLikes.appendChild(document.createTextNode('Likes'));
	navLikes.getElementsByTagName('svg')[0].setAttribute('width', 15);
	navLikes.getElementsByTagName('svg')[0].setAttribute('height', 15);
	navLikes.getElementsByTagName('svg')[0].setAttribute('fill', '#fff');
	var navPhoto = document.createElement('a');
	navPhoto.appendChild(svgForType.image.cloneNode(true));
	navPhoto.appendChild(document.createTextNode('Batch'));
	navPhoto.id = 'nav-photo';
	navPhoto.getElementsByTagName('svg')[0].setAttribute('width', 15);
	navPhoto.getElementsByTagName('svg')[0].setAttribute('height', 15);
	navPhoto.getElementsByTagName('svg')[0].setAttribute('fill', '#fff');
	navPhoto.classList.add('post-state-nav-item');
	navPhoto.setAttribute('href', '/mega-editor/published/' + name + '?photos');
	navLinks[0].parentNode.appendChild(mpe);
	var navFollows = document.createElement('a');
	navFollows.appendChild(svgForType.friendly.cloneNode(true));
	navFollows.appendChild(document.createTextNode('I Follow'));
	navFollows.id = 'nav-follows';
	navFollows.getElementsByTagName('svg')[0].setAttribute('width', 15);
	navFollows.getElementsByTagName('svg')[0].setAttribute('height', 15);
	navFollows.getElementsByTagName('svg')[0].setAttribute('fill', '#fff');
	navFollows.classList.add('post-state-nav-item');
	navFollows.setAttribute(
		'href',
		'/mega-editor/published/' + name + '?follows'
	);
	var navFollowers = document.createElement('a');
	navFollowers.appendChild(svgForType.friendly.cloneNode(true));
	navFollowers.appendChild(document.createTextNode('Followers'));
	navFollowers.id = 'nav-followers';
	navFollowers.getElementsByTagName('svg')[0].setAttribute('width', 15);
	navFollowers.getElementsByTagName('svg')[0].setAttribute('height', 15);
	navFollowers.getElementsByTagName('svg')[0].setAttribute('fill', '#fff');
	navFollowers.classList.add('post-state-nav-item');
	navFollowers.setAttribute(
		'href',
		'/mega-editor/published/' + name + '?followers'
	);
	var navFans = document.createElement('a');
	navFans.appendChild(svgForType.mutual.cloneNode(true));
	navFans.appendChild(document.createTextNode('Fans'));
	navFans.id = 'nav-fans';
	navFans.getElementsByTagName('svg')[0].setAttribute('width', 15);
	navFans.getElementsByTagName('svg')[0].setAttribute('height', 15);
	navFans.getElementsByTagName('svg')[0].setAttribute('fill', '#fff');
	navFans.classList.add('post-state-nav-item');
	navFans.setAttribute('href', '/mega-editor/published/' + name + '?fans');
	var four = [
		// < there were only 4 when I named this...
		'dashboard',
		'archive',
		'tagged',
		'search',
		'likes', // reblogging pages
		'photos',
		'follows',
		'followers',
		'fans' //special features
	];
	if (typeof href[5] !== 'undefined' && four.indexOf(href[5]) !== -1) {
		document.getElementsByClassName('active')[0].classList.remove('active');
		if (href[5] === 'dashboard') {
			navDash.classList.add('active');
		}
		if (href[5] === 'archive') {
			navChive.classList.add('active');
		}
		if (href[5] === 'tagged') {
			navTagged.classList.add('active');
		}
		if (href[5] === 'search') {
			navSearch.classList.add('active');
		}
		if (href[5] === 'likes') {
			navLikes.classList.add('active');
		}
		if (href[5] === 'photos') {
			navPhoto.classList.add('active');
		}
		if (href[5] === 'follows') {
			navFollows.classList.add('active');
		}
		if (href[5] === 'followers') {
			navFollowers.classList.add('active');
		}
		if (href[5] === 'fans') {
			navFans.classList.add('active');
		}
	}
	navTagged.setAttribute(
		'data-default-input',
		getCookie('cats') !== '' ? getCookie('cats') : 'cats'
	);
	navTagged.setAttribute('data-member-input', 'cats');
	navTagged.setAttribute('data-default-description', 'Tagged Page');
	navTagged.setAttribute(
		'data-default-url',
		'/mega-editor/published/' + name + '?tagged&'
	);
	navTagged.addEventListener('click', openReblogsWidget);
	navTagged.href =
		'/mega-editor/published/' +
		name +
		'?tagged&' +
		(getCookie('cats') !== '' ? getCookie('cats') : 'cats');
	navTagged.classList.add('post-state-nav-item');
	navLinks[0].parentNode.appendChild(navTagged);
	navLikes.setAttribute('data-default-input', name);
	navLikes.setAttribute('data-default-description', 'Liked/By Page');
	navLikes.setAttribute(
		'data-default-url',
		'/mega-editor/published/' + name + '?likes&'
	);
	navLikes.addEventListener('click', openReblogsWidget);
	navLikes.href = '/mega-editor/published/' + name + '?likes&' + name;
	navLikes.classList.add('post-state-nav-item');
	navLikes.setAttribute('data-member-input', 'name1');
	navLinks[0].parentNode.appendChild(navLikes);
	navSearch.setAttribute(
		'data-default-input',
		getCookie('cats2') !== '' ? getCookie('cats2') : 'cats'
	);
	navSearch.setAttribute('data-default-disabled', '0');
	navSearch.setAttribute('data-default-description', 'Search Page');
	navSearch.setAttribute(
		'data-default-url',
		'/mega-editor/published/' + name + '?search&'
	);
	navSearch.addEventListener('click', openReblogsWidget);
	navSearch.href =
		'/mega-editor/published/' +
		name +
		'?search&' +
		(getCookie('cats2') !== '' ? getCookie('cats2') : 'cats');
	navSearch.setAttribute('data-member-input', 'cats2');
	navSearch.classList.add('post-state-nav-item');
	navLinks[0].parentNode.appendChild(navSearch);
	navChive.setAttribute(
		'data-default-input',
		getCookie('david') !== '' ? getCookie('david') : 'david'
	);
	navChive.setAttribute('data-member-input', 'david');
	navChive.setAttribute('data-default-disabled', '0');
	navChive.setAttribute('data-default-description', 'Archive Page');
	navChive.setAttribute(
		'data-default-url',
		'/mega-editor/published/' + name + '?archive&'
	);
	navChive.addEventListener('click', openReblogsWidget);
	navChive.href =
		'/mega-editor/published/' +
		name +
		'?archive&' +
		(getCookie('david') !== '' ? getCookie('david') : 'david');
	navChive.classList.add('post-state-nav-item');
	navLinks[0].parentNode.appendChild(navChive);
	navDash.setAttribute('data-default-input', 'dashboard');
	navDash.setAttribute('data-default-disabled', '1');
	navDash.setAttribute('data-default-description', 'Dashboard');
	navDash.setAttribute(
		'data-default-url',
		'/mega-editor/published/' + name + '?dashboard&'
	);
	navDash.addEventListener('click', openReblogsWidget);
	navDash.href = '/mega-editor/published/' + name + '?dashboard';
	navDash.classList.add('post-state-nav-item');
	navLinks[0].parentNode.appendChild(navDash);
	navLinks[0].parentNode.appendChild(navPhoto);
	navLinks[0].parentNode.appendChild(navFollows);
	navLinks[0].parentNode.appendChild(navFollowers);
	// navLinks[0].parentNode.appendChild(navFans); // html api, too unstable...
	navLinks[0].insertBefore(
		svgForType.edit.cloneNode(true),
		navLinks[0].firstChild
	);
	navLinks[1].insertBefore(
		svgForType.edit.cloneNode(true),
		navLinks[1].firstChild
	);
	navLinks[2].insertBefore(
		svgForType.edit.cloneNode(true),
		navLinks[2].firstChild
	);
	navLinks[0].getElementsByTagName('svg')[0].setAttribute('width', 15);
	navLinks[0].getElementsByTagName('svg')[0].setAttribute('height', 15);
	navLinks[1].getElementsByTagName('svg')[0].setAttribute('width', 15);
	navLinks[1].getElementsByTagName('svg')[0].setAttribute('height', 15);
	navLinks[2].getElementsByTagName('svg')[0].setAttribute('width', 15);
	navLinks[2].getElementsByTagName('svg')[0].setAttribute('height', 15);
	// end extra chrome buttons and widgets, and nav-links

	// the replace/alias some of the default functions
	var rewriterScript = document.createElement('script');
	rewriterScript.type = 'text/javascript';
	rewriterScript.id = 'mass_post_features-plugin_functions';
	rewriterScript.appendChild(
		document.createTextNode(rewrite1.toString().slice(13, -1))
	);
	rewriterScript.appendChild(
		document.createTextNode(
			'// The doc_title (#) is superfluous; use a visible (#)\n' +
				'window.postCountMake = ' +
				postCountMake.toString() +
				';\n'
		)
	);
	rewriterScript.appendChild(
		document.createTextNode(rewrite2.toString().slice(13, -1))
	);
	document.head.appendChild(rewriterScript);
	// end the default script replacements/aliases

	// begin the plugin css below
	// (I tweaked this CSS for hours upon days to be utmost pretty)
	var pluginStyle = document.createElement('style');
	pluginStyle.id = 'mass_post_features-plugin_style';
	pluginStyle.type = 'text/css';
	pluginStyle.appendChild(
		document.createTextNode(
			function () {
				/*

h2 {
  display: block;
  font-weight: 600;
}

a {
  text-decoration: underline;
}

b, strong {
  font-weight: 700;
}

h2 b, h2 strong {
  font-weight: 900;
}

em, i {
  font-style: italic;
}

ol, ul {
  list-style: none;
}

blockquote, q {
  quotes: none;
}

blockquote {
  border-left: 3px solid #000;
  padding-left: 4px;
}

blockquote:after,
blockquote:before,
q:after,
q:before {
  content: none;
}

ol, ul {
  margin-bottom: .75em;
  padding-left: 2.8em;
}

ol ol,
ol ul,
ul ol,
ul ul {
  margin: 0;
  padding-left: 1.1em;
}

ul li {
  list-style-type: disc;
}

ul li li {
  list-style-type: circle;
}

ol li {
  list-style-type: decimal;
  font-feature-settings: "tnum";
}

blockquote, p,
pre {
  margin-bottom: .75em;
}

p.npf_quirky {
  font-family: Fairwater, serif;
  font-size: 24px;
  line-height: 1.3em;
}

p.npf_chat {
  font-family: Source Code Pro, monospace;
}

p.npf_color_joey,
span.npf_color_joey {
  color: #ff492f;
}

p.npf_color_monica,
span.npf_color_monica {
  color: #ff8a00;
}

p.npf_color_phoebe,
span.npf_color_phoebe {
  color: #e8d73a;
}

p.npf_color_ross,
span.npf_color_ross {
  color: #00cf35;
}

p.npf_color_rachel,
span.npf_color_rachel {
  color: #00b8ff;
}

p.npf_color_chandler,
span.npf_color_chandler {
  color: #7c5cff;
}

p.npf_color_niles,
span.npf_color_niles {
  color: #ff62ce;
}

p.npf_color_frasier,
span.npf_color_frasier {
  color: #001935;
}

p.npf_color_mr_big,
span.npf_color_mr_big {
  color: #000c1a;
}

@font-face {
  font-family: Gibson;
  src: url(https://assets.tumblr.com/pop/fonts/gibson/gibson-light-0db5d248.woff) format("woff");
  font-weight: 100;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Gibson;
  src: url(https://assets.tumblr.com/pop/fonts/gibson/gibson-regular-d83b428c.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Gibson;
  src: url(https://assets.tumblr.com/pop/fonts/gibson/gibson-semibold-b0fc2672.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Gibson;
  src: url(https://assets.tumblr.com/pop/fonts/gibson/gibson-bold-c6132b6e.woff) format("woff");
  font-weight: 900;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Gibson;
  src: url(https://assets.tumblr.com/pop/fonts/gibson/gibson-light-italic-ed49facd.woff) format("woff");
  font-weight: 100;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Gibson;
  src: url(https://assets.tumblr.com/pop/fonts/gibson/gibson-italic-e1dcd616.woff) format("woff");
  font-weight: 400;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Gibson;
  src: url(https://assets.tumblr.com/pop/fonts/gibson/gibson-semibold-italic-ae8d9810.woff) format("woff");
  font-weight: 700;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Bold;
  src: url(https://assets.tumblr.com/pop/fonts/gibson/gibson-bold-italic-94b05ba2.woff) format("woff");
  font-weight: 900;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Franklin Gothic Medium;
  src: url(https://assets.tumblr.com/pop/fonts/franklingothic/franklingothic-medium-1beb5103.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-stretch: normal;
  font-display: swap
}

@font-face {
  font-family: Franklin Gothic Medium Condensed;
  src: url(https://assets.tumblr.com/pop/fonts/franklingothic/franklingothic-medium-compressed-58222bfb.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Franklin Gothic Compressed;
  src: url(https://assets.tumblr.com/pop/fonts/franklingothic/franklingothic-compressed-02ac5e26.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Walsheim;
  src: url(https://assets.tumblr.com/pop/fonts/walsheim/walsheim-medium-40fd0505.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Fairwater;
  src: url(https://assets.tumblr.com/pop/fonts/fairwater/fairwater-regular-b7ab7a58.woff2) format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Favorit;
  src: url(https://assets.tumblr.com/pop/fonts/favorit/favorit-85-8ff1c986.woff2) format("woff2");
  font-style: normal;
  font-weight: 400;
  font-display: swap
}

@font-face {
  font-family: Favorit;
  src: url(https://assets.tumblr.com/pop/fonts/favorit/favorit-85-italic-a883bce7.woff2) format("woff2");
  font-style: italic;
  font-weight: 400;
  font-display: swap
}

@font-face {
  font-family: Favorit;
  src: url(https://assets.tumblr.com/pop/fonts/favorit/favorit-medium-be005cc5.woff2) format("woff2");
  font-style: normal;
  font-weight: 700;
  font-display: swap
}

@font-face {
  font-family: Favorit;
  src: url(https://assets.tumblr.com/pop/fonts/favorit/favorit-medium-italic-4d1adc26.woff2) format("woff2");
  font-style: italic;
  font-weight: 700;
  font-display: swap
}

@font-face {
  font-family: "1785 GLC Baskerville";
  src: url(https://assets.tumblr.com/pop/fonts/1785glcbaskerville/1785glcbaskerville-regular-2c131a72.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: "1785 GLC Baskerville";
  src: url(https://assets.tumblr.com/pop/fonts/1785glcbaskerville/1785glcbaskerville-italic-1a724410.woff) format("woff");
  font-weight: 400;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Alternate Gothic;
  src: url(https://assets.tumblr.com/pop/fonts/alternategothic/alternategothic-regular-d11d1e96.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Arquitecta;
  src: url(https://assets.tumblr.com/pop/fonts/arquitecta/arquitecta-book-cee560b5.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Arquitecta;
  src: url(https://assets.tumblr.com/pop/fonts/arquitecta/arquitecta-bold-5ec6543e.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Avalon;
  src: url(https://assets.tumblr.com/pop/fonts/avalon/avalon-book-de1d38eb.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Avalon;
  src: url(https://assets.tumblr.com/pop/fonts/avalon/avalon-bold-26f8ad53.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Bodoni Recut FS;
  src: url(https://assets.tumblr.com/pop/fonts/bodonirecutfs/bodonirecutfs-regular-283bd6c9.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Bodoni Recut FS;
  src: url(https://assets.tumblr.com/pop/fonts/bodonirecutfs/bodonirecutfs-demi-1c2ff649.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Bodoni Recut FS;
  src: url(https://assets.tumblr.com/pop/fonts/bodonirecutfs/bodonirecutfs-italic-54315813.woff) format("woff");
  font-weight: 400;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Bodoni Recut FS;
  src: url(https://assets.tumblr.com/pop/fonts/bodonirecutfs/bodonirecutfs-demi-italic-b5e01932.woff) format("woff");
  font-weight: 700;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Bookmania;
  src: url(https://assets.tumblr.com/pop/fonts/bookmania/bookmania-regular-271d947c.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Bookmania;
  src: url(https://assets.tumblr.com/pop/fonts/bookmania/bookmania-bold-5e09e821.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Brutal Type;
  src: url(https://assets.tumblr.com/pop/fonts/brutaltype/brutaltype-regular-ef623c78.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Brutal Type;
  src: url(https://assets.tumblr.com/pop/fonts/brutaltype/brutaltype-bold-a5e007f4.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Calluna;
  src: url(https://assets.tumblr.com/pop/fonts/calluna/calluna-regular-60172bcd.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Calluna;
  src: url(https://assets.tumblr.com/pop/fonts/calluna/calluna-black-cfbfc0fb.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Calluna;
  src: url(https://assets.tumblr.com/pop/fonts/calluna/calluna-italic-405661eb.woff) format("woff");
  font-weight: 400;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Calluna;
  src: url(https://assets.tumblr.com/pop/fonts/calluna/calluna-bold-italic-760a50f4.woff) format("woff");
  font-weight: 700;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Calluna Sans;
  src: url(https://assets.tumblr.com/pop/fonts/callunasans/callunasans-regular-4c9b1de7.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Calluna Sans;
  src: url(https://assets.tumblr.com/pop/fonts/callunasans/callunasans-black-9c48542e.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Calluna Sans;
  src: url(https://assets.tumblr.com/pop/fonts/callunasans/callunasans-italic-83d2e0f0.woff) format("woff");
  font-weight: 400;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Calluna Sans;
  src: url(https://assets.tumblr.com/pop/fonts/callunasans/callunasans-black-italic-55e41442.woff) format("woff");
  font-weight: 700;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Capita;
  src: url(https://assets.tumblr.com/pop/fonts/capita/capita-regular-b20fa714.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Capita;
  src: url(https://assets.tumblr.com/pop/fonts/capita/capita-bold-16bd5c46.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Caslon FS;
  src: url(https://assets.tumblr.com/pop/fonts/caslonfs/caslonfs-book-b1f3d7b2.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Caslon FS;
  src: url(https://assets.tumblr.com/pop/fonts/caslonfs/caslonfs-bold-c9f15be5.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Clarendon Text Pro;
  src: url(https://assets.tumblr.com/pop/fonts/clarendontextpro/clarendontextpro-regular-8665c534.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Clarendon Text Pro;
  src: url(https://assets.tumblr.com/pop/fonts/clarendontextpro/clarendontextpro-bold-f0e91a3c.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Clarendon Text Pro;
  src: url(https://assets.tumblr.com/pop/fonts/clarendontextpro/clarendontextpro-italic-f50fadcc.woff) format("woff");
  font-weight: 400;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Clarendon Text Pro;
  src: url(https://assets.tumblr.com/pop/fonts/clarendontextpro/clarendontextpro-bold-italic-0b93f3fe.woff) format("woff");
  font-weight: 700;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Clearface FS;
  src: url(https://assets.tumblr.com/pop/fonts/clearface/clearface-regular-0877705c.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Clearface FS;
  src: url(https://assets.tumblr.com/pop/fonts/clearface/clearface-black-7307513a.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Clearface FS;
  src: url(https://assets.tumblr.com/pop/fonts/clearface/clearface-italic-12dd08d2.woff) format("woff");
  font-weight: 400;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Clearface FS;
  src: url(https://assets.tumblr.com/pop/fonts/clearface/clearface-black-italic-95e89c47.woff) format("woff");
  font-weight: 700;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Garamond Classic FS;
  src: url(https://assets.tumblr.com/pop/fonts/garamondclassicfs/garamondclassicfs-regular-37325adf.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Garamond Classic FS;
  src: url(https://assets.tumblr.com/pop/fonts/garamondclassicfs/garamondclassicfs-heavy-d6b7cb51.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Garamond Classic FS;
  src: url(https://assets.tumblr.com/pop/fonts/garamondclassicfs/garamondclassicfs-italic-a9e735d6.woff) format("woff");
  font-weight: 400;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Garamond Classic FS;
  src: url(https://assets.tumblr.com/pop/fonts/garamondclassicfs/garamondclassicfs-bold-italic-73da3cdb.woff) format("woff");
  font-weight: 700;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Grumpy Black\ 48;
  src: url(https://assets.tumblr.com/pop/fonts/grumpyblack48/grumpyblack48-60ad3944.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Grumpy Black\ 48;
  src: url(https://assets.tumblr.com/pop/fonts/grumpyblack48/grumpyblack48-60ad3944.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Lorimer No\ 2;
  src: url(https://assets.tumblr.com/pop/fonts/lorimerno2/lorimerno2-medium-5ed17651.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Lorimer No\ 2;
  src: url(https://assets.tumblr.com/pop/fonts/lorimerno2/lorimerno2-semibold-c615f79e.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Lorimer No\ 2;
  src: url(https://assets.tumblr.com/pop/fonts/lorimerno2/lorimerno2-medium-italic-a7cb2829.woff) format("woff");
  font-weight: 400;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Lorimer No\ 2;
  src: url(https://assets.tumblr.com/pop/fonts/lorimerno2/lorimerno2-semibold-italic-803dc0f4.woff) format("woff");
  font-weight: 700;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: News Gothic FS;
  src: url(https://assets.tumblr.com/pop/fonts/newsgothicfs/newsgothicfs-book-b71e5c48.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: News Gothic FS;
  src: url(https://assets.tumblr.com/pop/fonts/newsgothicfs/newsgothicfs-bold-dad27eb5.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: News Gothic FS;
  src: url(https://assets.tumblr.com/pop/fonts/newsgothicfs/newsgothicfs-book-oblique-0a0ccd73.woff) format("woff");
  font-weight: 400;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: News Gothic FS;
  src: url(https://assets.tumblr.com/pop/fonts/newsgothicfs/newsgothicfs-bold-oblique-4767b553.woff) format("woff");
  font-weight: 700;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Pratt Pro;
  src: url(https://assets.tumblr.com/pop/fonts/prattpro/prattpro-regular-27555c58.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Pratt Pro;
  src: url(https://assets.tumblr.com/pop/fonts/prattpro/prattpro-bold-f978900f.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Quadrat;
  src: url(https://assets.tumblr.com/pop/fonts/quadrat/quadrat-regular-eade9dc0.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Quadrat;
  src: url(https://assets.tumblr.com/pop/fonts/quadrat/quadrat-serial-f6e71145.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Sofia Pro;
  src: url(https://assets.tumblr.com/pop/fonts/sofiapro/sofiapro-regular-f2aae9ec.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Sofia Pro;
  src: url(https://assets.tumblr.com/pop/fonts/sofiapro/sofiapro-bold-cdb403a0.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Spade;
  src: url(https://assets.tumblr.com/pop/fonts/spade/spade-6085b923.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Spade;
  src: url(https://assets.tumblr.com/pop/fonts/spade/spade-6085b923.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Square Serif;
  src: url(https://assets.tumblr.com/pop/fonts/squareserif/squareserif-book-0a547297.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Square Serif;
  src: url(https://assets.tumblr.com/pop/fonts/squareserif/squareserif-demi-1bdcd0c8.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Square Serif;
  src: url(https://assets.tumblr.com/pop/fonts/squareserif/squareserif-book-italic-0ecc7c19.woff) format("woff");
  font-weight: 400;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Square Serif;
  src: url(https://assets.tumblr.com/pop/fonts/squareserif/squareserif-demi-italic-b4286785.woff) format("woff");
  font-weight: 700;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Streetscript;
  src: url(https://assets.tumblr.com/pop/fonts/streetscript/streetscript-e1665af6.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Streetscript;
  src: url(https://assets.tumblr.com/pop/fonts/streetscript/streetscript-e1665af6.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Typewriter FS;
  src: url(https://assets.tumblr.com/pop/fonts/typewriterfs/typewriterfs-regular-c0a07f03.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Typewriter FS;
  src: url(https://assets.tumblr.com/pop/fonts/typewriterfs/typewriterfs-bold-d4592705.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Ziclets;
  src: url(https://assets.tumblr.com/pop/fonts/ziclets/ziclets-b6989e95.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Ziclets;
  src: url(https://assets.tumblr.com/pop/fonts/ziclets/ziclets-b6989e95.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@keyframes happy-bounce {
  0% {
    opacity: 0;
    transform: rotate(40deg) translateY(0);
  }

  10% {
    transform: rotate(0deg) translateY(-50px);
    opacity: 1;
  }

  20% {
    transform: rotate(-40deg) translateY(0);
  }

  30% {
    transform: rotate(0deg) translateY(-40px);
  }

  40% {
    transform: rotate(40deg) translateY(0);
  }

  50% {
    transform: rotate(0deg) translateY(-30px);
  }

  60% {
    transform: rotate(-40deg) translateY(0);
  }

  70% {
    transform: rotate(0deg) translateY(-20px);
  }

  80% {
    transform: rotate(40deg) translateY(0);
  }

  90% {
    opacity: 1;
    transform: rotate(0deg) translateY(-10px);
  }

  100% {
    opacity: 0;
    transform: rotate(-40deg) translateY(0);
  }
}

@keyframes blinking {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes updown {
  100% {
    margin-top: 0;
  }

  50% {
    margin-top: -15px;
  }

  0% {
    margin-top: 0;
  }
}

@keyframes flip {
  100% {
    transform: rotateX(0);
    opacity: 1;
  }

  0% {
    transform: rotateX(-180deg);
    opacity: 0;
  }
}

.l-content {
  min-height: calc(100vh - 177px);
}

.l-content>* {
  opacity: 0;
  transition: all 0.4s ease-out;
}

.l-content>*.display-none {
  display: none;
}

#select-by-widget_title .preselect-count,
#select-by_widget .row,
.l-content>*.laid {
  opacity: 1;
  animation: flip 0.25s ease-in-out both;
}

#select-by-widget_title .preselect-count.noanim,
#select-by_widget .row:active {
  animation: none;
  opacity: 1;
}

#mass_post_features-plugin_data {
  display: none;
}

#mass_post_features-plugin_selection_box {
  position: absolute;
  background-color: rgba(50, 90, 250, 0.4);
  box-shadow: inset 0 0 0 1px rgba(50, 90, 250, 1);
  z-index: 100;
  cursor: pointer;
}

a.blog_title {
  cursor: pointer;
}

#delete_posts {
  background-color: #c00;
}

#unselect .chrome_button_right {
  display: inline-block;
}

.blue_bar .editor_navigation {
  text-align: center;
  float: none;
  display: block;
}

.blue_bar .editor_navigation .header_button {
  display: inline-block;
  vertical-align: top;
}

#status {
  margin: 0px 0px -3px 0px;
}

#pause_button .play,
#pause_button .pause {
  color: #fff;
  font-size: 10px;
  padding: 0 2px;
}

#pause_button.playing .play,
#pause_button.paused .pause,
#pause_button.done .play,
#pause_button.done .pause {
  color: rgba(255, 255, 255, 0.3);
}

.chrome h2 {
  display: inline-block;
  font-size: 25px;
  vertical-align: top;
  color: inherit;
  font-weight: bold;
}


.chrome_button h2 {
  vertical-align: sub;
  font-family: monospace;
  position: relative;
}

#add_tag_button,
#cancel_add_tag_button,
#cancel_remove_tag_button,
#remove_tag_button {
  margin-bottom: -30px;
}

#tag_editor,
#tags {
  font: normal 11px 'Lucida Grande', Verdana, sans-serif;
  width: 326px;
  position: absolute;
  left: 20px;
  top: 19px;
  text-align: left;
  height: 170px;
  overflow: auto;
  color: #555;
  background-color: rgba(255, 255, 255, 0.7);
}

#unselect.chrome,
#select-all_button.chrome,
#select-by_button.chrome,
#view-links_button.chrome,
#view-captions_button.chrome {
  background: #7D99FF none;
}

.blue_bar .editor_navigation .header_button button.chrome {
  padding: 0 4px 0 0;
  margin: 1px 0 0 2px;
}

#gutter_button input[type="number"] {
  width: 40px;
  height: 18px;
  padding: 0 3px;
  background-color: #ccc;
  border: 0 none;
  box-shadow: inset 0 2px 2px 0px #000;
  top: -2px;
  position: relative;
}

#cancel5_button,
#add_urls_button,
#post_all_photos_button,
#cancel2_button,
#cancel1_button,
#select_button,
#clear_button,
#hide_button,
#list_button {
  border: 0 none;
  padding: 0 5px;
}

#select_button {
  position: absolute;
  bottom: 13px;
  left: 10px;
  width: 68px;
}

#reblog_widget .robot-warning {
  width: 190px;
  margin: 10px 10px 11px 10px;
}

#cancel2_button {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

#cancel1_button {
  position: absolute;
  top: 10px;
  right: 10px;
}

#clear_button {
  position: absolute;
  bottom: 13px;
  right: 10px;
}

#hide_button {
  position: absolute;
  bottom: 7px;
  right: 6px;
  height: 24px;
}

#list_button {
  position: absolute;
  bottom: 13px;
  right: 307px;
  height: 24px;
}

#photos-drop-zone *,
#photos-drop-zone,
.blog_title,
#jump_to_month,
#mpe_title,
.post-state-nav-item,
.l-content>*,
button,
label {
  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

.l-content .brick.photo {
    min-height: 50px;
    vertical-align: ;
}

.l-content .heading {
  padding-top: 20px;
}

.l-content .brick .overprint {
  width: 120px;
  top: 0px;
  left: 5px;
}

.l-content .brick.video .play_overlay,
.l-content .brick.audio .listen_overlay {
  z-index: 9;
}

.l-content .brick {
  overflow: visible;
  background: linear-gradient(135deg,
      rgba(242, 242, 242, 1) 0%,
      rgba(209, 209, 209, 1) 44%,
      rgba(209, 209, 209, 1) 100%,
      rgba(226, 226, 226, 1) 100%);
}

.l-content .brick .overflow-hidden {
  position: absolute;
  height: 100%;
  overflow: hidden;
  width: 125px;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
}

.l-content .brick .monospace *,
.l-content .brick .monospace {
  font-family: "Courier", monospace;
}

.l-content .brick .ol {
  display: list-item;
  list-style: decimal inside;
}

.l-content .brick .ul {
  display: list-item;
  list-style: disc inside;
}

.l-content .brick .h1 {
  font-size: 115%;
  text-align: center;
}

.l-content .brick .quote {
  font-size: 125%;
  font-family: "Times", "Times New Roman", serif;
}

.l-content .brick .rq {
  font-size: 140px;
  font-weight: bold;
  font-family: "Times", "Times New Roman", "Times", serif;
  color: rgba(0, 0, 0, 0.15);
  position: absolute;
  top: 0px;
  right: 0;
  line-height: 110px;
}

.l-content .brick.link .rq {
  bottom: -20px;
}

.l-content .brick.note .ask-av {
  display: inline-block;
  vertical-align: middle;
  border-radius: 20px;
}

.l-content .brick.has-img .fade {
  width: 125px;
  height: 90px;
  position: absolute;
  left: 0;
  bottom: 0;
  background: linear-gradient(to bottom,
      rgba(206, 206, 206, 0) 0%,
      rgba(208, 208, 208, 0) 73%,
      rgba(209, 209, 209, 1) 100%);
}

.l-content .brick .asker {
  display: inline-block;
  vertical-align: middle;
}

.l-content .brick .answer {
  font-weight: normal;
  padding-top: 30px;
}

.l-content .brick .h2 {
  font-size: 105%;
}

.l-content .brick .link {
  text-decoration: underline;
}

.l-content .brick .quirky {
  font-family: Fairwater, serif;
  font-size: 112%;
}

.l-content .brick.highlighted .overlay {
  background: none;
  border: 0 none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  color: #fff;
  opacity: 1;
  filter: none;
  z-index: 999;
  display: block;
}

.l-content .brick.highlighted .overlay .inner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin-top: 0;
  height: 100%;
}

.l-content .brick.highlighted .overlay .inner .date {
  color: #fff;
  position: absolute;
  left: 0px;
  right: 0px;
  padding: 2px 6px 0px 2px;
  background-color: #73bae7;
  height: 13px;
  font-size: 10px;
  line-height: 11px;
}

.l-content .brick.highlighted .highlight .tag_count {
  display: block !important;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 115px;
}

.tag_count[style]:after {
    content: " tags";
}

.l-content .brick.highlighted .highlight .note_count {
  color: #fff;
  position: absolute;
  right: 0px;
  bottom: 0px;
  padding: 2px 6px 0px 2px;
  background-color: #73bae7;
  background-color: rgba(115,186,231,0.8);
  height: 11px;
  font-size: 10px;
  line-height: 11px;
  border-top-left-radius: 5px;
  display: block !important;
}

.l-content .brick.highlighted .overlay .inner .notes {
  margin-top: 5px;
  position: absolute;
  bottom: 0px;
  right: 0px;
  padding: 3px 6px 0px 5px;
  background-color: #73bae7;
  height: 13px;
  font-size: 10px;
  line-height: 10px;
  border-top-left-radius: 5px;
  display: block !important;
}

#widget-top-buttons .red {
  border: 1px rgba(255, 0, 0, 0.4) solid;
  background-color: rgba(255, 0, 0, 0.1);
  color: rgba(255, 0, 0, 0.6);
  position: absolute;
  right: 7px;
  top: 30px;
  font-size: 10px;
  padding: 1px 6px;
  font-weight: bold;
}

#widget-top-buttons .arrow,
.blue_bar .arrow {
  display: inline-block;
  position: relative;
  top: -1px;
  width: 0;
  height: 0;
  margin-left: 4px;
  border-top: 6px solid;
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
}
#widget-top-buttons .arrow {
  border-top-color: #555;
}
#widget-top-buttons .arrow.reverse {
  border-bottom: 6px solid;
  border-bottom-color: #99a3ae;
  border-top: 0;
}

.blue_bar .chrome {
  cursor: pointer;
}

.blue_bar .chrome label .arrow {
  border-top-color: #fff;
}

.blue_bar .small_text {
  width: 280px;
  position: relative;
  margin: 0;
  padding: 0;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
  left: 10px;
  text-align: center;
}

.blue_bar .title .blog_title {
  color: #99a3ae;
  text-decoration: none;
  top: -3px;
}

#blog_menu {
  display: none;
}

#blog_menu .avatar_img,
#blog_menu .avatar {
  display: inline-block;
  float: left;
  width: 36px;
  height: 36px;
  margin: 3px 0px 0px 3px;
  vertical-align: bottom;
}

#blog_menu .avatar_img {
  border: 1px solid #000;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.9);
}

#blog_menu .avatar {
  position: relative;
  top: 0;
  left: 0;
}

#blog_menu .avatar svg {
  display: none;
}

#blog_menu .avatar.reblog-to-here svg {
  display: block;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  box-shadow: 0 0 0 2px #7D99FF;
  border-radius: 2px;
  top: 4px;
  left: 4px;
  width: 26px;
  height: 26px;
  padding: 5px;
}

.blog_menu_child {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.13);
  padding: 2px 0px 4px 0px;
}

.subt {
  text-align: center;
  height: 40px;
  width: 300px;
  top: 5px;
  position: relative;
  margin: 0px 0px 0px 48px;
}

.subt a {
  padding: 2px;
  color: #7D99FF;
  margin: 2px;
}

.subt button,
.subt a {
  cursor: pointer;
}

.subt .blank-space,
.subt button,
.subt a {
  height: 24px;
  font-family: "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 10px;
  line-height: 14px;
  font-weight: bold;
  text-decoration: none;
}

.subt .blank-space,
.subt button {
  display: inline-block;
  min-height: 52px;
  position: relative;
  margin: 0;
}

.subt button {
  width: 82px;
  min-height: 52px;
  white-space: normal;
  top: -17px;
  padding: 3px 8px 3px 8px;
  border-color: #000;
  border-radius: 2px;
  background-color: #444;
  border-width: 1px;
  border-style: solid;
  color: #fff;
  position: relative;
  left: 5px;
}

.subt .blank-space {
  width: 60px;
  height: 30px;
  top: -19px;
  vertical-align: middle;
}

.subt a:active {
  text-decoration: underline;
}

.subt button:active {
  background-color: #969696;
  border-color: #8a8f96;
  border-color: rgba(0, 0, 0, 0.2);
  box-shadow: none
}

.open #blog_menu {
  display: block;
  position: fixed;
  text-align: center;
  left: 0;
  width: 400px;
  height: auto;
  max-height: calc(100vh - 50px);
  padding: 0;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #001935;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.13);
  z-index: 100;
  top: 0;
  padding-bottom: 10px;
}

a.open {
  cursor: normal;
}

#blog_menu::-webkit-scrollbar,
#widget_scrolling_part::-webkit-scrollbar {
  width: 8px;
  height: 10px;
}

#blog_menu::-webkit-scrollbar-thumb,
#widget_scrolling_part::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background: #c2c9d2;
}

.editor_navigation span input+.widget {
  display: none;
}

.editor_navigation span input:checked+.widget {
  display: block;
}

#urlstuff_widget {
  padding: 30px;
}

#urlstuff_widget .chrome {
  margin: 14px;
}

.row label.not.disabled {
  background-color: rgba(0, 0, 0, 0.1);
  opacity: 0.3;
}

.row label.not.ch {
  background-color: rgba(250, 170, 100, 0.2);
}

#snapshot-info_widget,
#backdate_widget,
#urlstuff_widget,
#add-caption_widget,
#reblog_widget,
#remove_tags_widget,
#add_tags_widget,
#select-by_widget {
  cursor: grab !important;
}

#select-by,
#backdate,
#snapshot-info,
#urlstuff,
#add-caption {
  opacity: 0;
  width: 0;
  height: 0;
}

#urlstuff_body,
#backdate-body,
#reblog_widget button,
#reblog_widget input,
#tags {
  cursor: auto;
}

.brick-dragging *,
.brick-dragging,
#snapshot-info_widget.widget-dragging *,
#snapshot-info_widget.widget-dragging,
#backdate_widget.widget-dragging *,
#backdate_widget.widget-dragging,
#urlstuff_widget.widget-dragging *,
#urlstuff_widget.widget-dragging,
#add-caption_widget.widget-dragging *,
#add-caption_widget.widget-dragging,
#reblog_widget.widget-dragging *,
#reblog_widget.widget-dragging,
#remove_tags_widget.widget-dragging *,
#remove_tags_widget.widget-dragging,
#add_tags_widget.widget-dragging *,
#add_tags_widget.widget-dragging,
#select-by_widget.widget-dragging *,
#select-by_widget.widget-dragging {
  cursor: grabbing !important;
}

#reblog_widget h2,
#reblog_widget div,
#reblog_widget span,
#remove_tags_widget div,
#add-caption_widget div,
#add-caption_widget h2,
#backdate_widget h2,
#backdate_widget span,
#backdate_widget div,
#snapshot-info_widget h2,
#snapshot-info_widget span,
#snapshot-info_widget div,
#urlstuff_widget h2,
#urlstuff_widget span,
#urlstuff_widget div,
#add-caption_widget span,
#select-by_widget span,
#select-by_widget div {
  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

#backdate-body {
  top: 20px;
  position: relative;
}

#select-by_widget .row span.ch {
  background-color: rgba(100, 170, 250, 0.2);
}

#select-by_widget .row label.is {
  position: absolute;
  left: 0;
  top: 0;
  right: 50px;
  height: 20px;
}

#select-by_widget .row svg {
  position: absolute;
  left: 78px;
  top: 0;
  width: 20px;
  height: 20px;
}

#select-by_widget .row label.is .row-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  width: 255px;
  font-size: 11px;
  line-height: 19px;
  left: 102px;
  top: 0;
  position: absolute;
  height: 20px;
}

#select-by_widget .row .is span {
  height: 20px;
  line-height: 25px;
  font-size: 10px;
  position: absolute;
  width: 40px;
  right: 0px;
  text-align: center;
  top: 0;
}

#select-by_widget .row .not {
  height: 20px;
  line-height: 25px;
  font-size: 10px;
  position: absolute;
  width: 44px;
  right: 0;
  top: 0;
  text-align: center;
}

#select-by_widget .row label {
  cursor: pointer;
}

#select-by_widget .row div.count {
  width: 72px;
  background-color: rgba(50, 50, 50, 0.1);
  height: 20px;
  text-align: right;
  text-overflow: unset;
  padding-right: 4px;
  position: absolute;
  overflow: hidden;
  left: 0;
  top: 0;
}

#select-by_widget .row {
  height: 20px;
  position: relative;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.6);
}

#select-by_widget .row,
#select-by_widget .tags_title {
  border-bottom: 1px solid #ccc;
}

#select-by_widget .tags_title {
  color: #555;
  height: 15px;
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  background-color: rgba(50, 50, 50, 0.1);
}

#select-by_widget {
  height: 480px;
}

.widget,
#remove_tags_widget,
#add_tags_widget,
#reblog_widget,
#backdate_widget,
#snapshot-info_widget,
#urlstuff_widget,
#add-caption_widget,
#select-by_widget {
  background: rgba(235, 235, 235, 0.9) none !important;
  box-shadow: inset 0 0 4px 5px #fff,
    inset 0 0 5px 2px #000,
    0 0 8px 1px #000;
  border-radius: 9px;
  position: fixed;
}

#select-by_widget {
  font: normal 12px 'Lucida Grande', Verdana, sans-serif;
  padding: 9px;
  width: 440px;
  text-align: left;
  z-index: 10;
}

#tag_editor * {
  font: normal 14px/1.4 "Helvetica Neue",
    "HelveticaNeue", Helvetica, Arial, sans-serif;
}

#tags,
#tag_editor,
#widget_scrolling_part {
  box-shadow: inset 0 0 0 1px #ccc,
    inset 0px 3px 6px 0px #ccc;
}

#tag_editor {
  background: none rgba(255, 255, 255, 0.7);
}

#widget_scrolling_part {
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 48px;
  left: 4px;
  right: 4px;
  bottom: 48px;
  cursor: default;
}

#widget-top-buttons,
#widget-top-buttons .sort {
  position: absolute;
}

#widget-top-buttons {
  top: 0;
  left: 0;
  right: 0;
}

#widget-top-buttons .sort {
  top: 30px;
  font-size: 12px;
  font-weight: bold;
  color: #555;
  cursor: pointer;
}

#widget-top-buttons .sort.num {
  left: 15px;
}

#widget-top-buttons .sort.abc {
  left: 90px;
}

#widget-top-buttons .sort.date {
  left: 185px;
}

.row .tag-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 5px;
  margin-left: 1px;
  opacity: 0.6;
}

.row.type.notes-more-than .number-input,
.row.type.notes-less-than .number-input {
  border: 1px solid #555;
  width: 90px;
  position: absolute;
  right: 88px;
  height: 18px;
  top: 0;
  border: 1px solid #555;
  box-shadow: inset 0 1px 2px 0px #ccc;
}

#urlstuff_widget input {
  width: 180px;
  height: 22px;
  border: 1px solid #999;
  padding: 2px;
  box-shadow: inset 0 1px 2px 0px #555;
}

#select-by-widget_title {
  font-size: 17px;
  font-weight: bold;
  color: #555;
}

#select-by-widget_title .preselect-count {
  color: rgba(0, 130, 0, 0.6);
  font-size: 12px;
  background-color: #fff;
  height: 21px;
  min-width: 60px;
  border-radius: 12px;
  box-shadow: inset 0 1px 2px 0px #555;
  margin-left: 12px;
  position: absolute;
  top: 8px;
  left: 160px;
  text-align: center;
  line-height: 21px;
  transform: translateX(-505%);
}

#uncheck+label {
  color: #999;
}

#show-only:checked+label+#uncheck+label+span,
#show-only+label {
  color: #999;
}

#show-only:checked+label,
#uncheck:checked+label {
  color: #555;
}

#show-only:checked+label+#uncheck+label,
#show-only:checked+label+#uncheck {
  visibility: hidden;
}

#show-only {
  margin-top: 5px;
  margin-right: 60px;
}

#show-only,
#show-only+label {
  float: right;
}

#select-by_widget .select-by_ltgt {
  position: absolute;
  bottom: 5px;
  right: 90px;
  border: 1px solid #888;
  width: 203px;
  height: 39px;
}

#gt_input,
#lt_input {
  position: absolute;
  left: 78px;
}

#lt_input,
#lt_input+label {
  top: 4px;
}

#gt_input,
#gt_input+label {
  top: 22px;
}

#gt_input+label,
#lt_input+label {
  left: 0px;
  width: 72px;
  position: absolute;
  color: #999;
  text-align: right;
  cursor: pointer;
}

#gt_input:checked+label,
#lt_input:checked+label {
  color: #555;
}

#lt_input+label+#gt_input+label+#hide-ltgt-than-tags {
  opacity: 0.5;
  width: 55px;
  position: absolute;
  top: 8px;
  left: 97px;
  border: 1px solid #555;
  box-shadow: inset 0 1px 2px 0px #ccc;
  height: 23px;
}

#lt_input+label+#gt_input:checked+label+#hide-ltgt-than-tags,
#lt_input:checked+label+#gt_input+label+#hide-ltgt-than-tags {
  opacity: 1;
}

.l-content .brick .title {
  margin: 0;
  padding: 0;
  background-color: rgba(255, 255, 255, 0.1);
  overflow: hidden;
  width: 110px;
}

.l-content .brick>* {
  max-width: 125px;
}

.l-content .brick.picked {
  overflow: visible;
  box-shadow: 0 0 12px 2px rgba(14, 19, 84, 0.5);
  z-index: 60;
}

.l-content .brick.highlighted {
  animation: updown 0.1s ease-in both;
}

.l-content .brick.highlighted.picked {
  overflow: visible;
  box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.5);
  z-index: 60;
}

.l-content .brick.prevent-anim,
.l-content .brick.highlighted.picked {
  animation: none;
}
*/
			}
				.toString()
				.slice(15, -3) + // this is a pointing hand graphic
				'.l-content .brick.picked:before { content: ""; top: -35px;\n' +
				'width: 50px; height: 50px; position: absolute;left: 25px;\n' +
				'animation: updown 0.5s infinite ease-out both;\n' + // bounces up&down :)
				'background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iM' +
				'S4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM' +
				'6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0ia' +
				'HR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly9' +
				'3d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0ia' +
				'HR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9' +
				'yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY' +
				'2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR' +
				'0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgd2lkdGg9I' +
				'jI0IgogICBoZWlnaHQ9IjI0IgogICB2aWV3Qm94PSIwIDAgMjQgMjQiCiAgIHZlcnNpb24' +
				'9IjEuMSIKICAgaWQ9InN2ZzQiCiAgIHNvZGlwb2RpOmRvY25hbWU9ImI2NC5zdmciCiAgI' +
				'Glua3NjYXBlOnZlcnNpb249IjAuOS41ICgyMDYwZWMxZjlmLCAyMDIwLTA0LTA4KSI+CiA' +
				'gPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhMTAiPgogICAgPHJkZjpSREY+CiAgICAgI' +
				'DxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0Pml' +
				'tYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgI' +
				'HJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2U' +
				'iIC8+CiAgICAgICAgPGRjOnRpdGxlPjwvZGM6dGl0bGU+CiAgICAgIDwvY2M6V29yaz4KI' +
				'CAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxkZWZzCiAgICAgaWQ9ImRlZnM4IiA' +
				'vPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgI' +
				'CAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMSIKICAgICB' +
				'vYmplY3R0b2xlcmFuY2U9IjEwIgogICAgIGdyaWR0b2xlcmFuY2U9IjEwIgogICAgIGd1a' +
				'WRldG9sZXJhbmNlPSIxMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMCIKICAgICB' +
				'pbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iN' +
				'zMyIgogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjQ4MCIKICAgICBpZD0ibmFtZWR' +
				'2aWV3NiIKICAgICBzaG93Z3JpZD0iZmFsc2UiCiAgICAgaW5rc2NhcGU6em9vbT0iOS44I' +
				'gogICAgIGlua3NjYXBlOmN4PSIxMiIKICAgICBpbmtzY2FwZTpjeT0iMTIiCiAgICAgaW5' +
				'rc2NhcGU6d2luZG93LXg9IjAiCiAgICAgaW5rc2NhcGU6d2luZG93LXk9IjAiCiAgICAga' +
				'W5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMCIKICAgICBpbmtzY2FwZTpjdXJyZW50LWx' +
				'heWVyPSJzdmc0IiAvPgogIDxwYXRoCiAgICAgZD0ibSA1LjQsMTYuNCBjIDEuMSwwLjIgN' +
				'C42LDAuOSA1LjUsMS4wIHYgMy41IGMgMCwxLjYgMS4zLDIuOSAzLDIuOSAxLjYsMCAzLC0' +
				'xLjMgMywtMi45IHYgLTcuNCBjIDAuNSwwLjMgMS4xLDAuNiAxLjgsMC43IEMgMjAuNiwxN' +
				'C41IDIyLDEzLjMgMjIsMTEuOCAyMiwxMSAyMS42LDEwLjEgMjAuOSw5LjUgMTcuMCw1LjU' +
				'gMTUuMiw0LjQgMTQuOSwwIEggNSB2IDEuNyBjIDAsNS4xIC0zLDYuMCAtMywxMC4wIDAsM' +
				'i40IDEuMCw0LjEgMy40LDQuNiB6IgogICAgIGlkPSJwYXRoMTQiIC8+CiAgPHBhdGgKICA' +
				'gICBkPSJNIDUuMSw4LjQgQyA1LjksNi45IDYuOSw1LjEgNi45LDIgaCA2LjEgYyAwLjcsM' +
				'y44IDMuOCw2LjMgNi40LDguOSAwLjYsMC42IDAuMywxLjMgLTAuNCwxLjMgQyAxNy44LDE' +
				'yLjMgMTYuMCwxMC40IDE1LDkuMSBWIDIxLjAgQyAxNSwyMS41IDE0LjUsMjIgMTQsMjIgM' +
				'TMuNCwyMiAxMywyMS41IDEzLDIxLjAgdiAtNi45IGMgMCwtMC4zIC0wLjIsLTAuNSAtMC4' +
				'1LC0wLjUgLTAuMywwIC0wLjUsMC4yIC0wLjUsMC41IHYgMC41IGMgMCwwLjUgLTAuNCwwL' +
				'jkgLTEuMCwwLjggLTAuMywtMC4wIC0wLjYsLTAuNCAtMC42LC0wLjggdiAtMS4yIGMgMCw' +
				'tMC4zIC0wLjIsLTAuNSAtMC41LC0wLjUgLTAuMywwIC0wLjUsMC4yIC0wLjUsMC41IHYgM' +
				'C44IGMgMCwwLjUgLTAuNCwwLjkgLTEuMCwwLjggQyA3LjYsMTQuOSA3LjMsMTQuNiA3LjM' +
				'sMTQuMiB2IC0xLjUgYyAwLC0wLjMgLTAuMiwtMC41IC0wLjUsLTAuNSAtMC4zLDAgLTAuN' +
				'SwwLjIgLTAuNSwwLjUgdiAwLjkgYyAwLDAuNSAtMC41LDAuOCAtMS4wLDAuNiBDIDQuNSw' +
				'xMy45IDQsMTMuMyA0LDExLjcgNCwxMC40IDQuNCw5LjUgNS4xLDguNCBaIgogICAgIGlkP' +
				'SJwYXRoMiIKICAgICBzdHlsZT0iZmlsbDojZmZmZmZmIiAvPgo8L3N2Zz4K") 0 0 ' +
				'no-repeat transparent;\nbackground-size: 50px 50px; z-index: 1001;}' +
				// this ^ is a hand pointing pointer graphic
				// this v is a tiny robot head icon
				'.robot-warning { padding: 8px 9px 8px 21px;' + // :) tampermonkey tells
				'background: 4px 2px no-repeat url("' + //  me it's superfluous to combine
				'data:image/png;base64,iVBORw0KGgoAAAANSU' + //  string literals with the
				'hEUgAAABAAAAAYBAMAAAABjmA/AAAAElBMVEUAAA' + // + operator! but it's
				'ABBABHSEajnp28trX8//tPIl81AAAAAXRSTlMAQO' + // also not lint to
				'bYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAALiMAAC' + // go above 80 characters
				'4jAXilP3YAAAAHdElNRQfkBQgSLgK2/ku1AAAAa0' + // in width...
				'lEQVQI123O2w3AIAgFUNygoAxANzBxAasL+OH+qx' + // dear StackExchange...
				'R8tGnS+3USLgEAAIQZ148J7m0jr9G1Rk8Z3Be4An' +
				'SOCIQ6khWp1mKIkgp5BfeQe/tFxFTQOsW2k4KIRM' + // kumate!
				'Q6zK1ZxxuiQuwk5ffWfuMG6yMYLhjK67sAAAAASU' +
				'VORK5CYII=") rgba(255,190,170,1);' +
				'box-shadow: 0 0 0 1px red;font-size: 12px;font-weight: normal;' +
				'color: red; width: 172px;overflow-wrap: normal;' +
				'white-space: normal;margin: 9px;display:block;}' +
				function () {
					/*
.l-content .brick .private_overlay {
  z-index: 9;
}

.robot-warning strong {
  font-size: 13px;
  font-weight: bold;
  display: block;
}

.blue_bar .editor_navigation .notice {
  color: rgba(150, 150, 150, 1);
  margin: 0;
  padding: 5px 0px 0px 5px;
  float: right;
}

.l-content .brick .caption {
  display: none;
}

.l-content.with-captions.hoverless .brick .caption,
.l-content.with-captions .brick:hover .caption {
  display: table;
  background: rgba(40, 50, 60, 0.6);
  box-shadow: inset 0 0 0 4px rgba(40, 50, 60, 0.6);
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  text-align: left;
  width: 125px;
  height: 100%;
  animation: fadein 0.5s ease-in-out both;
}

.overflow-table {
  display: table;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 125px;
  height: 100%;
}

.overflow-row,
.caption-tr {
  display: table-row;
}

.overflow-cell,
.caption-td {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}

.overflow-inline {
  display: inline-block;
  text-align: left;
}

.caption-inline-block {
  display: inline-block;
  text-align: left;
  max-width: 115px;
  max-height: 115px;
  overflow: hidden;
}

.header_button > input[disabled]+.widget+.chrome svg,
.header_button > input[disabled]+.widget+.chrome .arrow,
.chrome.big_dark[disabled] svg {
  opacity: 0.5;
}

.blue_bar .editor_navigation .header_button .chrome .chrome_button {
  padding: 1px 0px 0px 2px;
  font-family: Franklin Gothic Medium Compressed, Arial, Helvetica, sans-serif;
  font-size: 13px;
  line-height: 14px;
  font-weight: normal;
}

.chrome.big_dark svg, .chrome_button svg {
  opacity: 1;
  margin-right: 1px;
  vertical-align: baseline;
  max-width: 13px;
  max-height: 13px;
  margin-left: 4px;
  position: relative;
}

#neue_post_form-iframe {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(0, 10, 30, 0.9);
  animation: fadein 0.5s ease-in-out both;
}

.l-content .links-layer {
  display: none;
}

.l-content .brick .edited-gif,
.l-content.with-links .brick:hover .links-layer,
.l-content.with-links.hoverless .brick .links-layer {
  background-color: rgba(40, 50, 60, 0.6);
  box-shadow: inset 0 0 0 4px rgba(40, 50, 60, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: #fff;
  z-index: 100;
  display: table;
  width: 125px;
  height: 100%;
  animation: fadein 0.5s ease-in-out both;
}

.tags-layer h2, .tags-layer a {
  color: inherit;
}

.follow .tag-container {
  max-width: 89px;
  overflow: hidden;
  max-height: 100px;
}

.l-content.with-links .brick:hover .tags-layer,
.l-content.with-links .brick:hover .links-layer,
.l-content.with-links.hoverless .brick .tags-layer,
.l-content.with-links.hoverless .brick .links-layer {
  transition: all 0.2s ease-out;
}

.l-content.with-links.hoverless .brick:hover .links-layer,
.l-content.with-links.hoverless .brick:hover .tags-layer {
  color: rgba(255, 255, 255, 0);
  background-color: rgba(0, 0, 0, 0);
}

.l-content.with-links .brick.highlighted:hover .links-laye
.l-content.with-links.hoverless .brick.highlighted .links-layer {
  z-index: 1000;
  background-color: rgba(0, 80, 255, 0.5);
  box-shadow: inset 0 0 0 4px rgba(115, 186, 231, 1);
}

.l-content.with-links.hoverless .brick.highlighted:hover .links-layer {
  background-color: rgba(0, 80, 255, 0.05);
}

.brick.highlighted a.link-reblog,
.brick.highlighted a.link-like,
.brick.highlighted a.link-edit,
.brick.highlighted a.link-view {
  background: rgba(115, 186, 231, 1);
}

.l-content .brick .edited-gif .trow,
.l-content.with-links .brick:hover .links-layer .trow,
.l-content.with-links.hoverless .brick .links-layer .trow {
  display: table-row;
  vertical-align: middle;
  text-align: center;
}

.l-content .brick .tags-layer,
.l-content .brick .edited-center {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  padding: 0px 18px 0 18px;
}

.links-layer a.link-view {
  position: absolute;
  right: 4px;
  top: 4px;
  border-bottom-left-radius: 5px
}

.links-layer a.link-edit {
  position: absolute;
  left: 4px;
  bottom: 4px;
  border-top-right-radius: 5px;
}

.links-layer a.link-like {
  right: 4px;
  bottom: 4px;
  border-top-left-radius: 5px;
}

.links-layer a.link-reblog {
  left: 4px;
  top: 4px;
  border-bottom-right-radius: 5px;
}

.links-layer a.link-reblog,
.links-layer a.link-like,
.links-layer a.link-edit,
.links-layer a.link-view {
  background-color: rgba(40, 50, 60, 0.6);
  padding: 3px;
  width: 20px;
  height: 20px;
  text-align: center;
  position: absolute;
}

svg.big-heart,
svg.big-reblog {
  position: absolute;
  left:0;
  bottom:0;
  width: 125px;
  height: 125px;
  z-index: 999;
  animation: happy-bounce 1.7s ease-out both;
}

.links-layer a.link-reblog.clicked svg,
.links-layer a.link-like.clicked svg {
  animation: flip 0.75s infinite ease-out both;
  position: relative;
}

.links-layer a.link-reblog.reblogged {
  cursor: default;
}

#view-links_button svg {
  margin: 0;
}

#mpe_title {
  position: relative;
  display: inline-block;
}

.post-state-nav-item {
  display: inline-block;
  text-decoration: none;
}

.post-state-nav-item svg {
  opacity: 0.5;
  display: inline-block;
  vertical-align: text-top;
}

.post-state-nav-item.active svg {
  opacity: 1;
}

.blue_bar .post-state-nav .post-state-nav-item {
  color: #99a3ae;
  font-weight: bold;
  padding: 3px 6px;
  top: -3px;
  left: 0;
  z-index: 9;
  position: relative;
  background: #001935 none;
}

#re-as-draft:checked+label+.robot-warning {
  display: none;
}

#re-as-draft+label {
  color: #7D99FF;
  padding-left: 5px;
  font-size: 20px;
}

#reblog_widget {
  display: none;
}

.open #reblog_widget {
  width: 300px;
  height: 200px;
  z-index: 999;
  left: 340px;
  display: table;
}

#urlstuff_widget,
#backdate_widget,
#snapshot-info_widget,
#add-caption_widget {
  z-index: 9;
}

#reblog_widget .trow {
  display: table-row;
}

#reblog_widget .inner {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

#reblog_widget h2 {
  color: #555;
  font-size: 17px;
}

#reblog-widget_input {
  width: 190px;
  padding: 6px;
  box-shadow: inset 0 2px 3px 0px rgba(0, 0, 0, 0.5);
  margin: 0;
  border: 0 none;
}

.header_button > input[disabled]+.widget+.chrome,
#reblog-widget_input[disabled] {
  color: #ccc;
}

#browse_months {
  position: relative;
  top: -3px;
  left: 0;
}

iframe#browse_months_widget {
  height: 423px;
  width: 226px;
  border-radius: 5px;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
}

div#browse_months_widget {
  height: 422px;
  width: 225px;
  padding: 0px;
  top: 0px;
  left: 0px;
}

.post-state-nav,
#mpe_title,
#nav-photo {
  border-left: 1px solid #122943;
  padding-left: 20px;
}

#nav_archive {
    text-align: center;
    line-height: 18px;
}

.blue_bar .title, #browse_months {
    display: inline-block;
    flex-direction: unset;
    float: none;
}

.chrome_button_right, .chrome_button_left {
  display: inline;
}

#tags {
  padding: 5px;
}

#tags div {
  margin: 0px 5px 5px 0px;
  overflow: hidden;
  display: inline-block;
  border: solid 1px rgba(255,75,35,1);
  background-color: rgba(255,75,35,0.4);
  padding: 5px;
  border-radius: 2px;
  color: #111;
  max-width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#photos-drop-zone.full {
  cursor: copy;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(200,255,200,0.5);
  z-index: 1000;
}

#photos-drop-zone {
  top: 90px;
  left: 20px;
  width: 300px;
  height: 190px;
  transition: all 0.4s ease-out;
  background-color: rgb(220, 220, 220);
  position: fixed;
  display: block;
  text-align: center;
  border-radius: 14px;
  box-shadow: inset 0 0 0 5px #f4f4f4, 0 0 0 4px rgb(220, 220, 220);
  z-index: 9;
}

#photos-drop-zone h2 {
  color: #f4f4f4;
  display: inline;
  font-size: 25px;
  font-weight: bold;
  top: 20px;
  position: relative;
  text-align: center;
  display: block;
}

#photos-drop-zone input {
  position: relative;
  top: 210px;
}

#drop_images_here {
  position: fixed;
  top: 168px;
  left: 70px;
  z-index: 12;
  font-size: 23px;
}

#photo_file_input {
  position: fixed;
  bottom: 40px;
  left: 40px;
}

#post_all_photos_button {
  position:fixed;
  top: 300px;
  cursor: pointer;
  color: #fff;
  font-family: "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 14px;
  line-height: 14px;
  left: 40px;
}

#post_all_photos_button[disabled] {
  color: #ccc;
}

.photo-brick.upload-working {
  animation: updown 0.3s infinite linear;
}

span.im-ready {
  animation: updown 0.25s 5 ease-out;
  position: relative;
  display: inline-block;
  z-index: 9;
}

.photo-brick-img,
.photo-brick {
  transition: all 0.4s ease-out;
}
.photo-brick {
  position: absolute;
  width: 500px;
  background-color: rgb(220, 220, 220);
  cursor: grab;
  display: table;
  min-height: 150px;
}

.img-count {
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 21px;
  color: rgba(255,255,255,0.9);
  z-index: 9;
  font-weight: bold;
  background-color: rgba(0,0,0,0.65);
  padding: 6px 9px;
  border-top-left-radius: 9px;
}

.photo-inner {
  display: table-row;
  height: 100%;
  width: 100%;
}

.photo-brick-img.brick-dragging,
.photo-brick.brick-dragging {
  z-index: 1000;
  opacity: 0.3;
  box-shadow: 0 0 5px 2px #000;
  transition: none;
  postion: absolute;
}

.photo-brick.hl-top {
  border-top: 3px dashed #0cf;
  margin-top: 5px;
}

.photo-brick.hl-bottom {
  margin-top: -5px;
  border-bottom: 3px dashed #0cf;
}

.hl-up {
  border-top: 3px dashed #0cf;
  margin-top: 5px;
}

.hl-down {
  border-bottom: 3px dashed #0cf;
  margin-bottom: 5px;
}

.hl-left {
  border-left: 3px dashed #0cf;
  margin-left: 5px;
}

.hl-right {
  border-right: 3px dashed #0cf;
  margin-right: 5px;
}

.photo-brick-edit {
  display: table-cell;
}

.photo-brick-img-cell {
  position: relative;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  top: 0;
  left: 0;
  width: 137px;
  background-color: #001935;
}

.pre-photoset .photo-brick-img-cell {
  background-color: #405975;
  box-shadow: inset 0 0 8px 1px #fff;
}

.photo-brick-img:first-child {
  margin-top: 5px;
}

.photo-brick-img {
  display: inline-block;
  position: relative;
  top: 0;
  left: 0;
  margin-bottom: 5px;
}

.photo-brick-img.brick-dragging,
.photo-brick-img.brick-dragging img,
.row-with-one-img,
.row-with-one-img img {
  width: 125px;
}

.row-with-two-img,
.row-with-two-img img {
  width: 60px;
}

.row-with-three-img,
.row-with-two-img {
  overflow: hidden;
}

.row-with-three-img img,
.row-with-two-img img {
  width: 100%;
  height: auto;
  max-width: 125px;
}

.row-with-two-img.data-photoset-a {
  margin-right: 5px;
}

.row-with-three-img,
.row-with-three-img img {
  width: 38px;
}

.row-with-three-img.data-photoset-a,
.row-with-three-img.data-photoset-b {
  margin-right: 5px;
}

.photo-brick img {
  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

.photo-brick-edit .rich {
  background-color: rgba(255,255,255,0.8);
  margin: 34px 6px 0px 6px;
  box-shadow: inset 0 2px 3px 0 #999;
  padding: 5px;
  cursor: auto;
  overflow-y: scroll;
  overflow-x: hidden;
  text-align: left;
  display: block;
  width: 340px;
  height: calc(100% - 42px);
}

#add-caption_widget .rich {
  background-color: rgba(255,255,255,0.8);
  margin: 30px 7px 0px 7px;
  box-shadow: inset 0 2px 3px 0 #999;
  padding: 5px;
  cursor: auto;
  overflow-y: scroll;
  overflow-x: hidden;
  display: block;
  width: 340px;
  height: 150px;
  text-align: left;
}

#add-caption_widget.visible-url .chrome,
#add-caption_widget .chrome,
.focused-rich.visible-url .photo-brick-edit .chrome,
.photo-brick-edit .chrome {
  font-family: "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 14px;
  display: none;
  position: absolute;
  cursor: pointer;
  min-width: 30px;
}

#add-caption_widget {
  height: 300px;
  width: 365px;
}

#snapshot-info_body {
  cursor: auto;
}

#snapshot-info_widget {
  padding: 20px;
  width: 400px;
  height: 320px;
}

#snapshot-info_body {
  position: relative;
  top: 0;
  left: 0;
  height: 360px;
}

#new-blogs {
  right: 10px;
  bottom: 55px;
}

#missing-blogs {
  left: 10px;
  bottom: 55px;
}

#snapshot-info_body h2 {
  display: inline-block;
  width: 190px;
  text-align: center;
}

#missing-blogs, #new-blogs {
  border: 1px solid #555;
  height: 240px;
  width: 169px;
  padding: 8px;
  position: absolute;
  overflow-x: hidden;
  text-overflow: ellipsis;
  overflow-y: auto;
  font: normal 11px 'Lucida Grande', Verdana, sans-serif;
  color: #555;
  background-color: rgba(255, 255, 255, 0.7);
}

#backdate_widget {
  height: 260px;
  width: 540px;
  font-family: "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 14px;
}

#backdate_widget .chrome{
  margin: 5px;
  float: right;
  padding: 0 8px;
}

#snapshot-info_widget .chrome,
#backdate_widget .chrome,
#add-caption_widget .chrome {
  border: 0 none;
}

.focused-rich.visible-url .photo-brick-edit .chrome,
.photo-brick-edit .chrome {
  top: 3px;
}

#add-caption_widget .chrome {
  top: 45px;
}

.photo-brick.focused-rich {
  z-index: 100;
  box-shadow: 0 0 5px 1px #03f;
  margin: -2px 0px 0px 5px;
}

.photo-brick-edit .photo-tags {
  max-height: 135px;
  display: inline-block;
  position: absolute;
  right: 0;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  top: 0;
  transform: translateX(100%);
}

.focused-rich .photo-tags {
  overflow: auto;
  background-color: rgba(0, 33, 255, 0.5);
  padding: 4px 0px 0px 6px;
}

#add-caption_widget.visible-url .chrome,
#add-caption_widget .chrome,
.focused-rich .photo-brick-edit .chrome {
  display: block;
}

.stripe {
  position: absolute;
  top: 7px;
  left: 143px;
  border-top: 5px solid #BBB;
  height: 10px;
  width: calc(100% - 150px);
  display: block;
  border-bottom: 5px solid #BBB;
}

.focused-rich .photo-brick-edit .stripe {
  display: none;
}

.focused-rich .photo-brick-edit .photo-tags .token {
  float: left;
  padding: 3px 5px;
  border: solid 1px #b7c963;
  background-color: #C7DA76;
  color: #111;
  margin: 0px 5px 5px 0px;
  border-radius: 2px;
  font: normal 14px/1.4 "Helvetica Neue",
    "HelveticaNeue", Helvetica, Arial, sans-serif;
  text-decoration: none;
  cursor: auto;
}

.photo-brick-edit .photo-tags .token .tag:before {
  content: "#";
  display: inline-block;
}

.focused-rich .photo-brick-edit .photo-tags .token .tag:before {
  content: "";
  display: none;
}

.photo-brick-edit .token a {
  display: none;
}

#add-caption_widget a,
.focused-rich .photo-brick-edit .token a {
  font-weight: bold;
  margin-left: 7px;
  text-decoration: none;
  color: #749440;
  display: inline-block;
}

.photo-brick-edit .photo-tags .token {
  float: left;
  padding: 3px 5px;
  color: #999;
  font-weight: bold;
  margin: 0px 5px 5px 0px;
  font: normal 14px/1.4 "Helvetica Neue",
    "HelveticaNeue", Helvetica, Arial, sans-serif;
  text-decoration: underline;
  display: inline-block;
  cursor: auto;
}

.photo-brick-edit .clone_abc_button {
  right: 265px;
  width: 94px;
  line-height: 11px;
  top: -31px;
  box-shadow: 0 1px 0 3px rgb(220, 220, 220),
              0 0 5px 3px #03f;
}

#add-caption_widget .pink_button,
#add-caption_widget .x_button,
.photo-brick-edit .pink_button,
.photo-brick-edit .x_button {
  right: 327px;
  font-weight: 900;
  color: #f00;
}

#add-caption_widget .red_button,
#add-caption_widget .b_button,
.photo-brick-edit .red_button,
.photo-brick-edit .b_button {
  right: 295px;
  font-weight: 900;
}

#add-caption_widget .orange_button,
#add-caption_widget .i_button,
.photo-brick-edit .orange_button,
.photo-brick-edit .i_button {
  right: 263px;
  font-style: italic;
}

#add-caption_widget .yellow_button,
#add-caption_widget .s_button,
.photo-brick-edit .yellow_button,
.photo-brick-edit .s_button {
  right: 231px;
  font-style: italic;
  text-decoration-line: line-through;
}

#add-caption_widget .green_button,
#add-caption_widget .a_button,
.photo-brick-edit .green_button,
.photo-brick-edit .a_button {
  right: 199px;
  color: #009;
  text-decoration-line: underline;
}

#add-caption_widget .ok_button,
.focused-rich .photo-brick-edit .ok_button {
  right: 7px;
  display: none;
}

#add-caption_widget.visible-url .chrome,
#add-caption_widget.visible-colors .chrome,
#add-caption_widget .colors_buttons,
.focused-rich.visible-colors .photo-brick-edit .chrome,
.photo-brick-edit .colors_buttons,
.focused-rich .photo-brick-edit .colors_buttons {
  display: none;
}

#add-caption_widget .a_button_input,
.photo-brick-edit .a_button_input,
.focused-rich .photo-brick-edit .a_button_input {
  display: none;
  right: 199px;
  color: #009;
  text-decoration-line: underline;
  position: absolute;
  top: 3px;
  height: 30px;
  width: 318px;
  padding: 0 3px;
  left: 143px;
  background-color: #fff;
  box-shadow: 0 0 0 1px #eee, inset 0 2px 2px 0 #000;
}

#add-caption_widget.visible-url .a_button_input,
#add-caption_widget.visible-url .ok_button,
.focused-rich.visible-url .photo-brick-edit .a_button_input,
.focused-rich.visible-url .photo-brick-edit .ok_button {
  display: block;
}

#add-caption_widget.visible-colors .colors_buttons,
.focused-rich.visible-colors .photo-brick-edit .colors_buttons {
  display: block;
}

#add-caption_widget .cerulean_button,
#add-caption_widget .h_button,
.photo-brick-edit .cerulean_button,
.photo-brick-edit .h_button {
  right: 167px;
  font-weight: 900;
}

#add-caption_widget .blue_button,
#add-caption_widget .ol_button,
.photo-brick-edit .blue_button,
.photo-brick-edit .ol_button {
  right: 135px;
}

#add-caption_widget .ul_button,
.photo-brick-edit .ul_button {
  right: 103px;
}

#add-caption_widget .bq_button,
.photo-brick-edit .bq_button {
  right: 71px;
}

#add-caption_widget .colors_button,
.photo-brick-edit .colors_button {
  right: 39px;
}

#add-caption_widget .q_button,
.photo-brick-edit .q_button {
  right: 7px;
  font-family: Fairwater, serif;
  font-size: 17px;
  line-height: 26px;
}

#add-caption_widget .colors_button .color,
.photo-brick-edit .colors_button .color {
  width: 14px;
  height: 17px;
  border-radius: 6px;
  box-shadow: inset 0 0 0 1px #fff;
  background: linear-gradient(
    to bottom,
    rgba(255,0,0,1) 0%,
    rgba(255,85,0,1) 20%,
    rgba(255,255,0,1) 40%,
    rgba(0,255,0,1) 60%,
    rgba(0,0,255,1) 80%,
    rgba(255,0,255,1) 100%
  );
}

#photos_as_draft_container {
    position: fixed;
    top: 340px;
    left: 50px;
}

#photos_as_draft + label + .robot-warning {
  display: block;
}

#photos_as_draft:checked + label + .robot-warning {
  display: none;
}

#return_to_dash_link {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #555;
  font-size: 45px;
}

#add-caption_widget .robot-warning {
  display: inline-block;
}

.pend-container {
  text-align: left;
}

.pend-container div {
  height: 20px;
}

.pend-container label {
  cursor: pointer;
}

#overwrite-caption-option + label +.robot-warning {
  position: absolute;
  left: 70px;
  bottom: -11px;
  width: 136px;
  display: none;
  height: 50px;
}

#overwrite-caption-option:checked + label +.robot-warning {
  display: block;
}

.pend-container {
  position: relative;
  left: 6px;
  bottom: -6px;
}

#bt-no-time + label,
#bt-one-time + label,
#bt-two-time + label,
#bd-no-day + label,
#bd-one-day + label,
#bd-two-day + label {
  width: 130px;
  text-align: left;
  height: 19px;
  background-color: rgba(14,20,25,0.5);
  border-radius: 10px;
  color: #fff;
  padding: 5px 20px;
}

#bt-no-time:checked + label,
#bt-one-time:checked + label,
#bt-two-time:checked + label,
#bd-no-day:checked + label,
#bd-one-day:checked + label,
#bd-two-day:checked + label {
  background-color: #0ae;
}

#bt-no-time,
#bt-one-time,
#bt-two-time,
#bd-no-day,
#bd-one-day,
#bd-two-day {
  position: relative;
  left: 18px;
}

.date-input-bunch * {
  float: left;
  line-height: 17px;
}

.date-input-bunch {
  display: inline-block;
  background-color: rgba(30,85,125,1);
  color: #fff;
  margin: 0px 3px;
  width: 245px;
  height: 22px;
  top: 9px;
  position: relative;
  padding: 3px 0px 3px 5px;
}

.date-input-bunch input[type="number"] {
  margin-left: 3px;
  max-width: 50px;
  box-shadow: inset 0px 1px 3px 0px #000;
}

.date-input-bunch label {
  text-align: center;
  color: #0ae;
  width: 40px;
  font-size: 14px;
  font-weight: bold;
  line-height: 22px;
}

.date-input-bunch label.rlabel {
  background-color: #3bc;
  color: #fff;
  border-bottom-right-radius: 9px;
  border-top-right-radius: 9px;
  height: 21px;
}

.date-input-bunch label.rlabel.narrow {
  width: 20px;
}

.date-input-bunch .linput {
 width: 40px;
}

#bt-no-time:checked+label+.date-input-bunch+.date-input-bunch,
#bt-no-time:checked+label+.date-input-bunch,
#bd-no-day:checked+label+.date-input-bunch+.date-input-bunch,
#bd-no-day:checked+label+.date-input-bunch {
  opacity: 0.3;
}

#bt-one-time:checked+label+input+label+input+label+
.date-input-bunch+.date-input-bunch,
#bd-one-day:checked+label+input+label+input+label+
.date-input-bunch+.date-input-bunch {
  opacity: 0.3;
}

#backdate_widget div {
  margin-bottom: 7px;
}

#pmright+label:before,
#pmleft+label:before {
  position: relative;
  content: "am";
  display: inline-block;
}

#pmright:checked+label:before,
#pmleft:checked+label:before {
  content: "pm";
}

.source-label1 {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 9;
  background-color: rgba(0,0,0,0.5);
  border-radius: 30px;
}

.source-label2 {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 9;
  background-color: rgba(100,110,255,0.4);
  border-radius: 30px;
}

.follower-pop-t {
  display: table;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.8);
  z-index: 1000;
}

.follower-pop-tr {
  display: table-row;
  width: 100%;
  height: 100%;
}

.follower-pop-td {
  display: table-cell;
  width: 100%;
  height: 100%;
  text-align: center;
  vertical-align: middle;
}

.follower-pop-inner {
  display: inline-block;
  width: 512px;
}

.follower-pop-av,
.follower-pop-img {
  display: inline-block;
  width: 512px;
  height: 512px;
}

.follower-pop-title {
  font-size: 45px;
  padding: 9px;
  line-height: 45px;
}

.l-content .brick.follow.missing-follows-info .overlay {
  opacity: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url(https://assets.tumblr.com/images/loading_ddd.gif)
              50% 20px no-repeat rgba(255,255,255,0.9);
  width: 125px;
  height: 125px;
  border: 0 none;
}
.l-content .brick.edit-reblog-queue .highlight {
  background: url(https://assets.tumblr.com/images/loading_ddd.gif)
              50% 20px no-repeat rgba(225,185,35,0.9);
  display: block;
  border-color: rgba(225,95,35,1);
}

.l-content .brick.edit-reblog-queue .highlight .note_count,
.l-content .brick.edit-reblog-queue .highlight .tag_count,
.l-content .brick.edit-reblog-queue .highlight .tag_count:after,
.l-content .brick.edit-reblog-queue .overlay .inner .date {
  background-color: rgba(225,95,35,1);
}

#hover-only {
  margin-left: 3px;
}

#hover-only,
#hover-only+label svg {
  vertical-align: text-bottom;
}

#hover-only+label svg {
  width: 10px;
  height: 10px;
}

#hover-only+label {
  font-weight: bold;
  color: #fff;
  opacity: 0.5;
  font-size: 10px;
}

#hover-only:checked+label {
  opacity: 1;
}

#hover-only, #hover-only+label {
  top: 3px;
  position: relative;
}

#who-follows-who {
    font-size: 24px;
}

#snapshot-info_body * {
  font-family: "Helvetica Neue",
    "HelveticaNeue", Helvetica, Arial, sans-serif;
}

#forget1_button, #forget2_button {
  position: absolute;
  bottom: 29px;
  padding: 0 9px;
}

#snapshot-info_body a {
  display: block;
  text-align: left;
  margin: 4px;
  font-size: 14px;
}

#forget1_button {
  left: 65px;
}

#forget2_button {
  right: 65px;
}

#snapshot-info_body h1 {
  color: #555;
  font-size: 20px;
  display: block;
  font-weight: bold;
}

#snapshot-load-gif {
  position: absolute;
  top: 0;
  left: 0;
}

#new-blogs a {
  color: #59f;
}

#missing-blogs a {
  color: #f00;
}

.l-content~.l-content {
  display: none;
}
*/
				}
					.toString()
					.slice(15, -3)
		)
	);
	// all of my extra css are in this ^ inline style
	document.head.appendChild(pluginStyle);
	// end extra CSS

	// my plugin will not use unSafeWindow, so instead
	// this v, is how I shall use fake window scope wrapper variables
	// for asynchronous window functions, the plugin data must be in the DOM
	// the DOM can be accessed by both wrapper scopes
	// it's like a 4 dimensional being :)
	var pluginData = document.createElement('div');
	pluginData.id = 'mass_post_features-plugin_data';
	pluginData.classList.add('blog-menu-preload');
	pluginData.classList.add('month-menu-preload');
	pluginData.setAttribute('widget_sort-by', 'date-down');
	pluginData.setAttribute('data-last-post-index', '0');
	pluginData.setAttribute('data-select-all_needle', '0');
	pluginData.setAttribute('data-select-by_needle', '0');
	pluginData.setAttribute('data-last_month_timestamp', '0');
	pluginData.setAttribute('data-last_year_timestamp', '0');
	pluginData.setAttribute('widget_scroll-top', '0');
	pluginData.setAttribute('widget_first-focus', 'hide-ltgt-than-tags');
	pluginData.setAttribute('select-by-note_lt', '10');
	pluginData.setAttribute('select-by-note_gt', '5');
	pluginData.setAttribute('hide-ltgt-than-tags', '5');
	pluginData.setAttribute('data-to-seconds', '0');
	pluginData.setAttribute('data-unstable-next-href', '0');
	pluginData.setAttribute('data-lt-to-select', '[]');
	pluginData.setAttribute('data-gt-to-select', '[]');
	pluginData.setAttribute(
		'data-all-to-select',
		'{"istag":[],"nottag":[],"istype":[],"nottype":[]}'
	); // this ^ has the 4 dimensions of the select-by widget
	pluginData.setAttribute('data-to-select', '[]');
	pluginData.setAttribute('data-tags_all_arr', '[]');
	pluginData.setAttribute('data-ids_all_arr', '[]');
	pluginData.setAttribute('data-visible_ids_all_arr', '[]');
	pluginData.setAttribute('data-types_all_arr', '[]');
	pluginData.setAttribute('data-follow-blogs-all', '[]');
	pluginData.setAttribute('data-new-blogs-all', '[]');
	pluginData.setAttribute('data-missing-blogs-all', '[]');
	pluginData.setAttribute('data-follow-blogs-all-updated', '0');
	pluginData.setAttribute('data-new-blogs-all-updated', '0');
	pluginData.setAttribute('data-missing-blogs-all-updated', '0');
	pluginData.setAttribute('data-id_to_tags', '{}');
	pluginData.setAttribute('data-id_to_types', '{}');
	pluginData.setAttribute('data-id_to_image', '{}');
	pluginData.setAttribute('data-id_to_origin', '{}');
	pluginData.setAttribute('data-id_to_state', '{}');
	pluginData.setAttribute('data-id_to_timestamp', '{}');
	pluginData.setAttribute('data-id_to_notes', '{}');
	pluginData.setAttribute('data-tag_to_ids', '{}');
	pluginData.setAttribute('data-type_to_ids', '{}');
	pluginData.setAttribute('data-csrf-token', '0');
	pluginData.setAttribute('data-reblog-to-here', name);
	pluginData.setAttribute('data-primary-blog', name); // correct guess later
	pluginData.setAttribute('data-tumblelogs', '[]'); // all blogss
	pluginData.setAttribute('data-primary-known', 'false');
	pluginData.setAttribute('data-followers-loading', 'false');
	pluginData.setAttribute('data-x-tumblr-form-key', '0');
	pluginData.setAttribute('data-column_gutter', '6');
	pluginData.setAttribute('data-current_edit_index', '-1');
	pluginData.setAttribute('data-single_edit_id', '0');
	pluginData.setAttribute('data-current_edit_action', 'reblog');
	pluginData.setAttribute('data-photos_height', '150');
	var pluginDataShell = document.createElement('div');
	pluginDataShell.appendChild(pluginData);
	document.body.insertBefore(pluginDataShell, document.body.firstChild);
	// this ^, per classList booleans and data-attributes, etc.
	// one giant DOM element attribute tree,
	// like every post on the Tumblr dashboard 2016

	// this v, is how I shall draw a selection box
	var data = document.getElementById('mass_post_features-plugin_data');
	data.setAttribute('doc-title', document.title);

	// the mousedown contains a variety of things for other functions
	window.addEventListener('mousedown', function (e) {
		if (e.which !== 1) {
			return true;
		}
		var data = document.getElementById('mass_post_features-plugin_data');
		var selectionBox = document.getElementById(
			'mass_post_features-plugin_selection_box'
		);
		var targ = e.target;
		var cont = targ; // container(parent)
		// this only runs on the photos page
		if (data.classList.contains('is-uploading-photos')) {
			// batch photos dragging
			while (
				cont.parentNode !== null &&
				typeof cont.parentNode !== 'undefined' &&
				cont.nodeName !== 'BODY' &&
				cont.id !== 'add_tags_widget' &&
				cont.nodeName !== 'A' &&
				cont.nodeName !== 'BUTTON' &&
				!cont.classList.contains('photo-tags') &&
				!cont.classList.contains('photo-brick') &&
				!cont.classList.contains('photo-brick-img') &&
				!cont.classList.contains('rich') // edit
			) {
				cont = cont.parentNode;
			}
			if (
				!data.classList.contains('photo-upload-in-progress') &&
				typeof cont !== 'undefined' &&
				typeof cont.nodeName !== 'undefined' &&
				(cont.nodeName === 'A' || cont.nodeName === 'BUTTON')
			) {
				if (cont.parentNode.classList.contains('token')) {
					cont.parentNode.parentNode.removeChild(cont.parentNode);
				}
				e.preventDefault();
				e.stopPropagation();
				e.cancelBubble = true;
				return true;
			}
			if (
				!data.classList.contains('photo-upload-in-progress') &&
				typeof cont !== 'undefined' &&
				typeof cont.classList !== 'undefined' &&
				(cont.classList.contains('photo-brick') ||
					cont.classList.contains('photo-brick-img'))
			) {
				if (cont.classList.contains('focused-rich')) {
					var addTagsWidget =
						document.getElementById('add_tags_widget');
					addTagsWidget.style.display = 'block';
				}
				var bcr = cont.getBoundingClientRect();
				cont.setAttribute('original-x', bcr.left);
				cont.setAttribute('original-y', bcr.top);
				var bmx = bcr.left - e.clientX;
				var bmy = bcr.top - e.clientY;
				if (cont.classList.contains('photo-brick-img')) {
					bmx -= 360;
					bmy -=
						cont.parentNode.getBoundingClientRect().top +
						document.documentElement.scrollTop;
				}
				cont.setAttribute('mouse-x-from-left', bmx);
				cont.setAttribute('mouse-y-from-top', bmy - cont.clientHeight);
				cont.classList.add('brick-dragging');
				cont.style.marginBottom = '-' + cont.clientHeight + 'px';
			} else if (
				typeof cont !== 'undefined' &&
				typeof cont.classList !== 'undefined' &&
				!cont.classList.contains('rich') &&
				cont.id !== 'add_tags_widget'
			) {
				var fr = document.getElementsByClassName('focused-rich');
				while (fr.length > 0) {
					fr[0].classList.remove('focused-rich');
				}
			}
		}
		targ = e.target;
		cont = targ;
		var initialMouseX = e.pageX;
		var initialMouseY = e.pageY;
		while (
			cont.parentNode !== null &&
			typeof cont.parentNode !== 'undefined' &&
			cont.nodeName !== 'BODY' &&
			cont.id !== 'nav_archive' &&
			cont.id !== 'blog_menu' &&
			cont.id !== 'select-by_widget' &&
			cont.id !== 'add-caption_widget' &&
			cont.id !== 'backdate_widget' &&
			cont.id !== 'snapshot-info_widget' &&
			cont.id !== 'snapshot-info_body' &&
			cont.id !== 'urlstuff_widget' &&
			cont.id !== 'urlstuff_body' &&
			cont.id !== 'backdate-body' &&
			cont.id !== 'reblog_widget' &&
			cont.id !== 'select-by-widget_title' &&
			cont.id !== 'remove_tags_widget' &&
			cont.id !== 'add_tags_widget' &&
			cont.id !== 'tags' &&
			cont.id !== 'tags_to_add' &&
			cont.id !== 'tag_editor' &&
			cont.id !== 'widget_scrolling_part' &&
			cont.id !== 'reblog-widget_input' &&
			cont.id !== 'rich_text_caption'
		) {
			cont = cont.parentNode;
		}
		if (
			cont.id === 'select-by_widget' ||
			cont.id === 'select-by-widget_title' ||
			cont.id === 'remove_tags_widget' ||
			cont.id === 'add_tags_widget' ||
			cont.id === 'reblog_widget' ||
			cont.id === 'add-caption_widget' ||
			cont.id === 'backdate_widget' ||
			cont.id === 'snapshot-info_widget' ||
			cont.id === 'urlstuff_widget'
		) {
			var sbw = document.getElementById(
				cont.id === 'select-by-widget_title'
					? 'select-by_widget'
					: cont.id
			);
			// grabbing and dragging step #1
			var mx = sbw.getBoundingClientRect().left - e.clientX;
			var my = sbw.getBoundingClientRect().top - e.clientY;
			sbw.setAttribute('mouse-x-from-left', mx);
			sbw.setAttribute('mouse-y-from-top', my);
			sbw.classList.add('widget-dragging');
		}
		// close snapshot-info_widget
		var snapshotInfo = document.getElementById('snapshot-info');
		if (
			cont.id !== 'snapshot-info_widget' &&
			cont.id !== 'snapshot-info_body' &&
			snapshotInfo !== null &&
			snapshotInfo.checked
		) {
			snapshotInfo.checked = false;
		}
		// close urlstuff_widget
		var urlstuff = document.getElementById('urlstuff');
		if (
			cont.id !== 'urlstuff_widget' &&
			cont.id !== 'urlstuff_body' &&
			urlstuff !== null &&
			urlstuff.checked
		) {
			urlstuff.checked = false;
		}
		// close backdate_widget
		var backdate = document.getElementById('backdate');
		if (
			cont.id !== 'backdate_widget' &&
			cont.id !== 'backdate-body' &&
			backdate !== null &&
			backdate.checked
		) {
			backdate.checked = false;
		}
		// close add-caption_widget
		var addCaption = document.getElementById('add-caption');
		if (
			cont.id !== 'add-caption_widget' &&
			cont.id !== 'rich_text_caption' &&
			addCaption !== null &&
			addCaption.checked
		) {
			addCaption.checked = false;
		}
		// close select-by_widget
		var selectBy = document.getElementById('select-by');
		if (
			cont.id !== 'select-by_widget' &&
			cont.id !== 'select-by-widget_title' &&
			cont.id !== 'widget_scrolling_part' &&
			selectBy !== null &&
			selectBy.checked
		) {
			var wsp = document.getElementById('widget_scrolling_part');
			data.setAttribute('widget_scroll-top', wsp.scrollTop);
			var pick = document.getElementsByClassName('picked');
			while (pick.length > 0) {
				pick[0].classList.remove('picked');
			}
			selectBy.checked = false;
		}
		// close blog menu, close reblog widget
		if (
			cont.id !== 'blog_menu' &&
			cont.id !== 'reblog_widget' &&
			cont.id !== 'reblog-widget_input' &&
			data.classList.contains('open-blog_menu') &&
			!data.classList.contains('closing-blog_menu')
		) {
			var o = document.getElementsByClassName('open');
			while (o.length > 0) {
				o[0].classList.remove('open');
			}
			data.classList.remove('open-blog_menu');
			e.cancelBubble = true;
			e.stopPropagation();
			data.classList.add('closing-blog_menu');
			data.classList.remove('open-blog_menu');
			return false;
		}
		if (data.classList.contains('closing-blog_menu')) {
			data.classList.remove('closing-blog_menu');
		}
		if (data.classList.contains('is-uploading-photos')) {
			return true;
			// we return here, because all this other thing
			// stuff is for other editor modes...
		}
		// draw selection box
		if (e.shiftKey && !data.classList.contains('shift_key')) {
			data.classList.add('shift_key');
		}
		if (
			!data.classList.contains('mousedown') &&
			cont !== null &&
			typeof cont === 'object' &&
			cont.nodeName === 'BODY' &&
			cont.id !== 'nav_archive'
		) {
			data.classList.add('mousedown');
			data.setAttribute('data-initial_mouse_x', initialMouseX);
			data.setAttribute('data-initial_mouse_y', initialMouseY);
		}
	});
	window.addEventListener('mouseup', function (e) {
		var drg = document.getElementsByClassName('widget-dragging');
		while (drg.length > 0) {
			drg[0].classList.remove('widget-dragging');
		}
		var pre = document.getElementsByClassName('pre-photoset');
		var hu;
		var hd;
		var hl;
		var hr;
		var hlb = document.getElementsByClassName('hl-bottom');
		var hlt = document.getElementsByClassName('hl-top');
		var bd = document.getElementsByClassName('brick-dragging');
		if (bd.length > 0 && bd[0].classList.contains('photo-brick')) {
			// drop row inbetween rows
			if (hlb.length + hlt.length === 0) {
				bd[0].style.left = bd[0].getAttribute('original-x') + 'px';
				bd[0].style.top = bd[0].getAttribute('original-y') + 'px';
			} else if (hlt.length > 0) {
				document.body.insertBefore(bd[0], hlt[0]);
			} else if (hlb.length > 0) {
				document.body.insertBefore(bd[0], hlb[0].nextSibling);
			}
			while (hlb.length > 0) {
				hlb[0].classList.remove('hl-bottom');
			}
			while (hlt.length > 0) {
				hlt[0].classList.remove('hl-top');
			}
			while (bd.length > 0) {
				bd[0].style.removeProperty('margin-bottom');
				bd[0].classList.remove('brick-dragging');
			}
			// rebuildColumn after row dragged
			rebuildPhotoColumn();
		} else if (
			bd.length > 0 &&
			bd[0].classList.contains('photo-brick-img')
		) {
			// drop into photoset instead...
			hu = document.getElementsByClassName('hl-up');
			hd = document.getElementsByClassName('hl-down');
			hl = document.getElementsByClassName('hl-left');
			hr = document.getElementsByClassName('hl-right');
			if (
				hlb.length + hlt.length > 0 &&
				hu.length + hd.length + hl.length + hr.length === 0
			) {
				// drop into new Editor row thing, instead...
				bd[0].style.left = '0px';
				bd[0].style.top = '0px';
				loadPhotoIntoDOM(bd[0].children[0]);
			} else if (hu.length + hd.length + hl.length + hr.length > 0) {
				if (hu.length > 0) {
					// insert photo above, above (clap, clap, clap)
					if (
						hu[0].classList.contains('row-with-one-img') ||
						(hu[0].classList.contains('row-with-two-img') &&
							hu[0].classList.contains('data-photoset-a')) ||
						(hu[0].classList.contains('row-with-three-img') &&
							hu[0].classList.contains('data-photoset-a'))
					) {
						// insertBefore... :P
						hu[0].parentNode.insertBefore(bd[0], hu[0]);
					} else if (
						(hu[0].classList.contains('row-with-two-img') &&
							hu[0].classList.contains('data-photoset-b')) ||
						(hu[0].classList.contains('row-with-three-img') &&
							hu[0].classList.contains('data-photoset-b'))
					) {
						// insertBefore&Before
						hu[0].parentNode.insertBefore(
							bd[0],
							hu[0].previousSibling
						);
					} else if (
						hu[0].classList.contains('row-with-three-img') &&
						hu[0].classList.contains('data-photoset-c')
					) {
						// insertAfter&Before&Before
						hu[0].parentNode.insertBefore(
							bd[0], // weird: siblings ARE always there and !== undefined
							hu[0].previousSibling.previousSibling
						); // because everything is correct :P
					} else {
						hu[0].parentNode.insertBefore(bd[0], hu[0]);
					}
					bd[0].classList.add('row-with-one-img');
					bd[0].classList.remove('data-photoset-a');
					bd[0].classList.remove('data-photoset-b');
					bd[0].classList.remove('data-photoset-c'); // abc...
					bd[0].classList.remove('row-with-two-img');
					bd[0].classList.remove('row-with-three-img');
				} else if (hd.length > 0) {
					// insert photo below, below photo (clap, clap, clap)
					if (
						hd[0].classList.contains('row-with-one-img') ||
						(hd[0].classList.contains('row-with-two-img') &&
							hd[0].classList.contains('data-photoset-b')) ||
						(hd[0].classList.contains('row-with-three-img') &&
							hd[0].classList.contains('data-photoset-c'))
					) {
						// insertAfter... :P
						hd[0].parentNode.insertBefore(bd[0], hd[0].nextSibling);
					} else if (
						(hd[0].classList.contains('row-with-two-img') &&
							hd[0].classList.contains('data-photoset-a')) ||
						(hd[0].classList.contains('row-with-three-img') &&
							hd[0].classList.contains('data-photoset-b'))
					) {
						// insertAfter&After
						hd[0].parentNode.insertBefore(
							bd[0],
							hd[0].nextSibling.nextSibling
						);
					} else if (
						hd[0].classList.contains('row-with-three-img') &&
						hd[0].classList.contains('data-photoset-a')
					) {
						// insertAfter&After&After
						hd[0].parentNode.insertBefore(
							bd[0], // assumed: my siblings ARE there and !== undefined
							hd[0].nextSibling.nextSibling.nextSibling
						); // because everything is correct :P
					}
					bd[0].classList.add('row-with-one-img');
					bd[0].classList.remove('row-with-two-img');
					bd[0].classList.remove('row-with-three-img');
					// insert to the left, to the left... (clap, clap, clap)
				} else if (hl.length > 0) {
					// START: these next few chucks are: long and similar; don't get lost
					if (hl[0].classList.contains('row-with-one-img')) {
						bd[0].classList.add('data-photoset-a');
						hl[0].classList.add('data-photoset-b');
						// 123...
						bd[0].classList.remove('data-photoset-c');
						bd[0].classList.remove('data-photoset-b');
						hl[0].classList.remove('data-photoset-a');
						hl[0].classList.remove('data-photoset-c');
						// abc...
						hl[0].classList.remove('row-with-one-img');
						hl[0].classList.add('row-with-two-img');
						bd[0].classList.remove('row-with-one-img');
						bd[0].classList.add('row-with-two-img');
						bd[0].classList.remove('row-with-three-img');
					} else if (hl[0].classList.contains('row-with-two-img')) {
						// left of an "a" goes to the left
						if (hl[0].classList.contains('data-photoset-a')) {
							bd[0].classList.add('data-photoset-a');
							hl[0].classList.add('data-photoset-b');
							hl[0].nextSibling.classList.add('data-photoset-c');
							// 123...
							hl[0].nextSibling.classList.remove(
								'data-photoset-b'
							);
							hl[0].nextSibling.classList.remove(
								'data-photoset-a'
							);
							bd[0].classList.remove('data-photoset-c');
							bd[0].classList.remove('data-photoset-b');
							hl[0].classList.remove('data-photoset-a');
							hl[0].classList.remove('data-photoset-c');
							// abc...
							hl[0].classList.remove('row-with-two-img');
							hl[0].classList.add('row-with-three-img');
							hl[0].nextSibling.classList.remove(
								'row-with-two-img'
							);
							hl[0].nextSibling.classList.add(
								'row-with-three-img'
							);
							// left of a "b" goes in-between
						} else if (
							hl[0].classList.contains('data-photoset-b')
						) {
							hl[0].classList.add('data-photoset-c');
							bd[0].classList.add('data-photoset-b');
							hl[0].previousSibling.classList.add(
								'data-photoset-a'
							);
							// 123...
							hl[0].previousSibling.classList.remove(
								'data-photoset-b'
							);
							hl[0].previousSibling.classList.remove(
								'data-photoset-c'
							);
							bd[0].classList.remove('data-photoset-c');
							bd[0].classList.remove('data-photoset-a');
							hl[0].classList.remove('data-photoset-b');
							hl[0].classList.remove('data-photoset-a');
							// abc...
							hl[0].classList.remove('row-with-two-img');
							hl[0].classList.add('row-with-three-img');
							hl[0].previousSibling.classList.remove(
								'row-with-two-img'
							);
							hl[0].previousSibling.classList.add(
								'row-with-three-img'
							);
						}
						bd[0].classList.remove('row-with-one-img');
						bd[0].classList.remove('row-with-two-img');
						bd[0].classList.add('row-with-three-img');
					}
					// regardless, it's to the left...
					hl[0].parentNode.insertBefore(bd[0], hl[0]);
				} else if (hr.length > 0) {
					// insert to the right, to the right... (clap, clap, clap)
					if (hr[0].classList.contains('row-with-one-img')) {
						hr[0].classList.add('data-photoset-a');
						bd[0].classList.add('data-photoset-b');
						// 123...
						bd[0].classList.remove('data-photoset-c');
						bd[0].classList.remove('data-photoset-a');
						hr[0].classList.remove('data-photoset-b');
						hr[0].classList.remove('data-photoset-c');
						// abc...
						hr[0].classList.remove('row-with-one-img');
						hr[0].classList.add('row-with-two-img');
						bd[0].classList.remove('row-with-one-img');
						bd[0].classList.add('row-with-two-img');
						bd[0].classList.remove('row-with-three-img');
					} else if (hr[0].classList.contains('row-with-two-img')) {
						// right of an "a" goes to the in-between
						if (hr[0].classList.contains('data-photoset-a')) {
							hr[0].classList.add('data-photoset-a');
							bd[0].classList.add('data-photoset-b');
							hr[0].nextSibling.classList.add('data-photoset-c');
							// 123...
							hr[0].nextSibling.classList.remove(
								'data-photoset-b'
							);
							hr[0].nextSibling.classList.remove(
								'data-photoset-a'
							);
							bd[0].classList.remove('data-photoset-c');
							bd[0].classList.remove('data-photoset-a');
							hr[0].classList.remove('data-photoset-b');
							hr[0].classList.remove('data-photoset-c');
							// abc...
							hr[0].classList.remove('row-with-two-img');
							hr[0].classList.add('row-with-three-img');
							hr[0].nextSibling.classList.remove(
								'row-with-two-img'
							);
							hr[0].nextSibling.classList.add(
								'row-with-three-img'
							);
							// right of a "b" goes to the right
						} else if (
							hr[0].classList.contains('data-photoset-b')
						) {
							hr[0].previousSibling.classList.add(
								'data-photoset-a'
							);
							hr[0].classList.add('data-photoset-b');
							bd[0].classList.add('data-photoset-c');
							// 123...
							hr[0].previousSibling.classList.remove(
								'data-photoset-b'
							);
							hr[0].previousSibling.classList.remove(
								'data-photoset-c'
							);
							bd[0].classList.remove('data-photoset-a');
							bd[0].classList.remove('data-photoset-b');
							hr[0].classList.remove('data-photoset-a');
							hr[0].classList.remove('data-photoset-c');
							// abc...
							hr[0].classList.remove('row-with-two-img');
							hr[0].classList.add('row-with-three-img');
							hr[0].previousSibling.classList.remove(
								'row-with-two-img'
							);
							hr[0].previousSibling.classList.add(
								'row-with-three-img'
							);
						}
						bd[0].classList.remove('row-with-one-img');
						bd[0].classList.remove('row-with-two-img');
						bd[0].classList.add('row-with-three-img');
					}
					// regardless, it's to the right...
					hr[0].parentNode.insertBefore(bd[0], hr[0].nextSibling);
				}
			}
			if (
				!bd[0].classList.contains('row-with-one-img') &&
				!bd[0].classList.contains('row-with-two-img') &&
				!bd[0].classList.contains('row-with-three-img')
			) {
				bd[0].classList.add('row-with-one-img');
			}
			// END: thanks for bearing with me.
			pre = document.getElementsByClassName('pre-photoset');
			hu = document.getElementsByClassName('hl-up');
			hd = document.getElementsByClassName('hl-down');
			hl = document.getElementsByClassName('hl-left');
			hr = document.getElementsByClassName('hl-right');
			hlb = document.getElementsByClassName('hl-bottom');
			hlt = document.getElementsByClassName('hl-top');
			while (hlt.length > 0) {
				hlt[0].classList.remove('hl-top');
			}
			while (hlb.length > 0) {
				hlb[0].classList.remove('hl-bottom');
			}
			while (pre.length > 0) {
				pre[0].classList.remove('pre-photoset');
			}
			while (bd.length > 0) {
				bd[0].style.left = '0px';
				bd[0].style.top = '0px';
				bd[0].style.removeProperty('margin-bottom');
				bd[0].classList.remove('brick-dragging');
			}
			while (hu.length > 0) {
				hu[0].classList.remove('hl-up');
			}
			while (hd.length > 0) {
				hd[0].classList.remove('hl-down');
			}
			while (hl.length > 0) {
				hl[0].classList.remove('hl-left');
			}
			while (hr.length > 0) {
				hr[0].classList.remove('hl-right');
			}
			// observers should rebuildPhotoColumn
			setTimeout(rebuildPhotoColumn, 800);
			// but here goes one more time just in case :P
			// I thinks my pretty transition is delaying
			// the top/left/height... or something IDK...
		}
		var data = document.getElementById('mass_post_features-plugin_data');
		var selectionBox = document.getElementById(
			'mass_post_features-plugin_selection_box'
		);
		if (data.classList.contains('mousedown')) {
			data.classList.remove('mousedown');
		}
		if (data.classList.contains('shift_key')) {
			data.classList.remove('shift_key');
		}
		if (selectionBox !== null) {
			selectionBox.parentNode.removeChild(selectionBox);
		}
		var ts = document.getElementsByClassName('temp-select');
		while (ts.length > 0) {
			ts[0].classList.remove('temp-select');
		}
	});
	var blueUp = 0;
	// resize the selection box and stuff :)
	window.addEventListener('mousemove', function (e) {
		var data = document.getElementById('mass_post_features-plugin_data');
		var i;
		if (document.getElementsByClassName('brick-dragging').length === 1) {
			var bdrg = document.getElementsByClassName('brick-dragging')[0]; // being dragged
			var brk = document.getElementsByClassName('photo-brick');
			var img = document.getElementsByClassName('photo-brick-img-cell');
			var bmx = parseFloat(bdrg.getAttribute('mouse-x-from-left'));
			var bmy = parseFloat(bdrg.getAttribute('mouse-y-from-top'));
			var pre = document.getElementsByClassName('pre-photoset');
			var st = document.documentElement.scrollTop;
			var bx = e.clientX + bmx;
			var by = e.clientY + bmy + st;
			bdrg.style.left = bx + 'px';
			bdrg.style.top = by + 'px';
			var t;
			var b;
			var l;
			var pbi;
			var pr;
			var hlb = document.getElementsByClassName('hl-bottom');
			var hlt = document.getElementsByClassName('hl-top');
			if (
				!data.classList.contains('blueup-drag-scroll') &&
				e.clientY < 90 &&
				typeof bdrg !== 'undefined'
			) {
				data.classList.add('blueup-drag-scroll');
				clearInterval(blueUp);
				blueUp = setInterval(function () {
					var doc = document.documentElement;
					window.scrollTo(doc.scrollLeft, doc.scrollTop - 10);
				}, 10);
			} else if (
				!data.classList.contains('blueup-drag-scroll') &&
				e.clientY > window.innerHeight - 90 &&
				typeof bdrg !== 'undefined'
			) {
				data.classList.add('blueup-drag-scroll');
				clearInterval(blueUp);
				blueUp = setInterval(function () {
					var doc = document.documentElement;
					window.scrollTo(doc.scrollLeft, doc.scrollTop + 10);
				}, 10);
			} else {
				data.classList.remove('blueup-drag-scroll');
				clearInterval(blueUp);
			}
			if (bdrg.classList.contains('photo-brick')) {
				for (i = 0; i < brk.length; i++) {
					b = brk[i].getBoundingClientRect();
					t = b.top + st; // dragging photo-brick over <this
					if (
						(by > t && by < t + b.height) ||
						(i === 0 && by < t) ||
						(i === brk.length - 1 && by > t)
					) {
						if (
							by + b.height / 2 > t ||
							(i === brk.length - 1 && by > t)
						) {
							// highlight bottom
							brk[i].classList.add('hl-bottom');
							brk[i].classList.remove('hl-top');
						} else if (
							by - b.height / 2 < t ||
							(i === 0 && by < t)
						) {
							// highlight top
							brk[i].classList.add('hl-top');
							brk[i].classList.remove('hl-bottom');
						}
					} else {
						brk[i].classList.remove('hl-bottom');
						brk[i].classList.remove('hl-top');
					}
				}
			} else if (bdrg.classList.contains('photo-brick-img')) {
				while (hlb.length > 0) {
					hlb[0].classList.remove('hl-bottom');
				}
				while (hlt.length > 0) {
					hlt[0].classList.remove('hl-top');
				}
				// this part withdraws the dragged image bdrg from current row
				if (
					// this may seem repetative...
					bdrg.classList.contains('row-with-two-img') &&
					bdrg.classList.contains('data-photoset-a') &&
					bdrg.nextSibling.classList.contains('data-photoset-b')
				) {
					bdrg.style.removeProperty('height');
					bdrg.nextSibling.style.removeProperty('height');
					// 2
					bdrg.classList.remove('row-with-two-img');
					bdrg.nextSibling.classList.remove('row-with-two-img');
					// 1
					bdrg.nextSibling.classList.add('row-with-one-img');
					// and shift pop around
					bdrg.nextSibling.classList.remove('data-photoset-b');
					// remove remnant
					bdrg.classList.remove('data-photoset-a');
				} else if (
					bdrg.classList.contains('row-with-two-img') &&
					bdrg.classList.contains('data-photoset-b') &&
					bdrg.previousSibling.classList.contains('data-photoset-a')
				) {
					bdrg.style.removeProperty('height');
					bdrg.previousSibling.style.removeProperty('height');
					// 2
					bdrg.classList.remove('row-with-two-img');
					bdrg.previousSibling.classList.remove('row-with-two-img');
					// 1
					bdrg.previousSibling.classList.add('row-with-one-img');
					// and shift pop around
					bdrg.previousSibling.classList.remove('data-photoset-a');
					// remove remnant
					bdrg.classList.remove('data-photoset-b');
				} else if (
					bdrg.classList.contains('row-with-three-img') &&
					bdrg.classList.contains('data-photoset-a') &&
					bdrg.nextSibling.classList.contains('data-photoset-b')
				) {
					bdrg.style.removeProperty('height');
					bdrg.nextSibling.style.removeProperty('height');
					bdrg.nextSibling.nextSibling.style.removeProperty('height');
					// 3
					bdrg.classList.remove('row-with-three-img');
					bdrg.nextSibling.classList.remove('row-with-three-img');
					bdrg.nextSibling.nextSibling.classList.remove(
						'row-with-three-img'
					);
					// 2
					bdrg.nextSibling.classList.add('row-with-two-img');
					bdrg.nextSibling.nextSibling.classList.add(
						'row-with-two-img'
					);
					// and shift pop around
					bdrg.nextSibling.classList.add('data-photoset-a');
					bdrg.nextSibling.classList.remove('data-photoset-b');
					bdrg.nextSibling.nextSibling.classList.add(
						'data-photoset-b'
					);
					bdrg.nextSibling.nextSibling.classList.remove(
						'data-photoset-c'
					);
					// remove remnant
					bdrg.classList.remove('data-photoset-a');
				} else if (
					bdrg.classList.contains('row-with-three-img') &&
					bdrg.classList.contains('data-photoset-b') &&
					bdrg.nextSibling.classList.contains('data-photoset-c')
				) {
					bdrg.style.removeProperty('height');
					bdrg.nextSibling.style.removeProperty('height');
					bdrg.previousSibling.style.removeProperty('height');
					// 3
					bdrg.classList.remove('row-with-three-img');
					bdrg.nextSibling.classList.remove('row-with-three-img');
					bdrg.previousSibling.classList.remove('row-with-three-img');
					// 2
					bdrg.nextSibling.classList.add('row-with-two-img');
					bdrg.previousSibling.classList.add('row-with-two-img');
					// and shift pop around
					bdrg.nextSibling.classList.add('data-photoset-b');
					bdrg.nextSibling.classList.remove('data-photoset-c');
					// this is a rare chance flip around
					bdrg.parentNode.insertBefore(bdrg.nextSibling, bdrg);
					// remove remnant
					bdrg.classList.remove('data-photoset-b');
				} else if (
					bdrg.classList.contains('row-with-three-img') &&
					bdrg.classList.contains('data-photoset-c') &&
					bdrg.previousSibling.classList.contains(
						'row-with-three-img'
					)
				) {
					bdrg.style.removeProperty('height');
					bdrg.previousSibling.style.removeProperty('height');
					bdrg.previousSibling.previousSibling.style.removeProperty(
						'height'
					);
					// 3
					bdrg.classList.remove('row-with-three-img');
					bdrg.previousSibling.classList.remove('row-with-three-img');
					bdrg.previousSibling.previousSibling.classList.remove(
						'row-with-three-img'
					);
					// 2
					bdrg.previousSibling.classList.add('row-with-two-img');
					bdrg.previousSibling.previousSibling.classList.add(
						'row-with-two-img'
					);
					// and shift pop around
					// b stays b, a stays a
					// remove remnant
					bdrg.classList.remove('data-photoset-c');
				} // last one ^
				bdrg.classList.remove('hl-up');
				bdrg.classList.remove('hl-down');
				bdrg.classList.remove('hl-left');
				bdrg.classList.remove('hl-right');
				rebuildPhotoColumn();
				for (i = 0; i < brk.length; i++) {
					// dragging image
					b = brk[i].getBoundingClientRect();
					if (
						e.clientX > b.left &&
						e.clientX < b.left + 137 &&
						e.clientY > b.top &&
						e.clientY < b.bottom
					) {
						brk[i].classList.add('pre-photoset');
						pbi = brk[i].getElementsByClassName('photo-brick-img');
						for (l = 0; l < pbi.length; l++) {
							if (
								typeof pbi[l] === 'undefined' ||
								pbi[l] === bdrg
							) {
								continue;
							}
							if (
								pbi.length >= 10 &&
								brk[i].getElementsByClassName('brick-dragging')
									.length === 0
							) {
								break;
							}
							pr = pbi[l].getBoundingClientRect();
							if (
								e.clientX > pr.left &&
								e.clientX < pr.right &&
								e.clientY > pr.top &&
								e.clientY < pr.bottom &&
								brk[i].classList.contains('pre-photoset')
							) {
								// I should use dragover, but this is (sophisticated :p)
								if (e.clientY < pr.top + pr.height / 3) {
									pbi[l].classList.add('hl-up');
									// sliding to the above
									pbi[l].classList.remove('hl-down');
									pbi[l].classList.remove('hl-left');
									pbi[l].classList.remove('hl-right');
									// sliding to the under
								} else if (
									e.clientY >
									pr.top + pr.height * 0.75
								) {
									pbi[l].classList.add('hl-down');
									pbi[l].classList.remove('hl-up');
									pbi[l].classList.remove('hl-left');
									pbi[l].classList.remove('hl-right');
									// sliding to the right
								} else if (e.clientX > pr.left + pr.width / 2) {
									if (
										!pbi[l].classList.contains(
											'row-with-three-img'
										)
									) {
										pbi[l].classList.remove('hl-up');
										pbi[l].classList.remove('hl-down');
										pbi[l].classList.remove('hl-left');
										pbi[l].classList.add('hl-right');
									}
									// sliding to the left
								} else if (e.clientX < pr.left + pr.width / 2) {
									if (
										!pbi[l].classList.contains(
											'row-with-three-img'
										)
									) {
										pbi[l].classList.remove('hl-up');
										pbi[l].classList.remove('hl-down');
										pbi[l].classList.add('hl-left');
										pbi[l].classList.remove('hl-right');
									}
								}
							} else {
								pbi[l].classList.remove('hl-up');
								pbi[l].classList.remove('hl-down');
								pbi[l].classList.remove('hl-left');
								pbi[l].classList.remove('hl-right');
							}
						}
					} else {
						// dragging out of a photoset into new row
						brk[i].classList.remove('pre-photoset');
						if (
							e.clientX > b.left + 177 &&
							e.clientX < b.left + b.width &&
							e.clientY > b.top &&
							e.clientY < b.bottom
						) {
							if (
								e.clientY + b.height / 2 > b.top ||
								(i === brk.length - 1 && e.clientY > b.bottom)
							) {
								// highlight bottom
								brk[i].classList.add('hl-bottom');
								brk[i].classList.remove('hl-top');
							} else if (
								e.clientY - b.height / 2 < b.top ||
								(i === 0 && e.clientY < b.top)
							) {
								// highlight top
								brk[i].classList.add('hl-top');
								brk[i].classList.remove('hl-bottom');
							}
						} else {
							brk[i].classList.remove('hl-bottom');
							brk[i].classList.remove('hl-top');
						}
					}
				}
			}
		}
		if (document.getElementsByClassName('widget-dragging').length === 1) {
			var drg = document.getElementsByClassName('widget-dragging')[0];
			// grabbing and dragging step #2
			var mx = parseFloat(drg.getAttribute('mouse-x-from-left'));
			var my = parseFloat(drg.getAttribute('mouse-y-from-top'));
			if (document.getElementById('reblog_widget') !== null) {
				document.getElementById('reblog_widget').style.left =
					e.clientX + mx + 'px';
				document.getElementById('reblog_widget').style.top =
					e.clientY + my + 'px';
			}
			if (document.getElementById('select-by_widget') !== null) {
				document.getElementById('select-by_widget').style.left =
					e.clientX + mx + 'px';
				document.getElementById('select-by_widget').style.top =
					e.clientY + my + 'px';
			}
			if (document.getElementById('remove_tags_widget') !== null) {
				document.getElementById('remove_tags_widget').style.left =
					e.clientX + mx + 'px';
				document.getElementById('remove_tags_widget').style.top =
					e.clientY + my + 'px';
			}
			if (document.getElementById('add_tags_widget') !== null) {
				document.getElementById('add_tags_widget').style.left =
					e.clientX + mx + 'px';
				document.getElementById('add_tags_widget').style.top =
					e.clientY + my + 'px';
			}
			if (document.getElementById('add-caption_widget') !== null) {
				document.getElementById('add-caption_widget').style.left =
					e.clientX + mx + 'px';
				document.getElementById('add-caption_widget').style.top =
					e.clientY + my + 'px';
			}
			if (document.getElementById('backdate_widget') !== null) {
				document.getElementById('backdate_widget').style.left =
					e.clientX + mx + 'px';
				document.getElementById('backdate_widget').style.top =
					e.clientY + my + 'px';
			}
			if (document.getElementById('urlstuff_widget') !== null) {
				document.getElementById('urlstuff_widget').style.left =
					e.clientX + mx + 'px';
				document.getElementById('urlstuff_widget').style.top =
					e.clientY + my + 'px';
			}
			if (document.getElementById('snapshot-info_widget') !== null) {
				document.getElementById('snapshot-info_widget').style.left =
					e.clientX + mx + 'px';
				document.getElementById('snapshot-info_widget').style.top =
					e.clientY + my + 'px';
			}
		}
		var targ = e.target;
		var cont = targ;
		var initialMouseX = parseFloat(
			data.getAttribute('data-initial_mouse_x')
		);
		var initialMouseY = parseFloat(
			data.getAttribute('data-initial_mouse_y')
		);
		var newMouseX = e.pageX;
		var newMouseY = e.pageY;
		var mouseWidth = Math.abs(initialMouseX - newMouseX);
		var mouseHeight = Math.abs(initialMouseY - newMouseY);
		var mouseDiff = Math.hypot(mouseWidth, mouseHeight);
		var selectionBox = document.getElementById(
			'mass_post_features-plugin_selection_box'
		);
		if (
			mouseDiff > 6 &&
			data.classList.contains('mousedown') &&
			selectionBox === null
		) {
			var pluginSelectionBox = document.createElement('div');
			pluginSelectionBox.id =
				'mass_post_features-' + 'plugin_selection_box';
			document.body.appendChild(pluginSelectionBox);
			selectionBox = document.getElementById(
				'mass_post_features-plugin_selection_box'
			);
			if (!data.classList.contains('shift_key')) {
				var hl = document.getElementsByClassName('highlighted');
				while (hl.length > 0) {
					highlightBrick(hl[0], 0);
				}
			}
		}
		if (
			mouseDiff > 6 &&
			data.classList.contains('mousedown') &&
			selectionBox !== null
		) {
			var selLeft;
			var selTop;
			if (initialMouseX < newMouseX) {
				selectionBox.style.left = initialMouseX + 'px';
				selLeft = initialMouseX;
			}
			if (initialMouseY < newMouseY) {
				selectionBox.style.top = initialMouseY + 'px';
				selTop = initialMouseY;
			}
			if (initialMouseX > newMouseX) {
				selectionBox.style.left = initialMouseX - mouseWidth + 'px';
				selLeft = initialMouseX - mouseWidth;
			}
			if (initialMouseY > newMouseY) {
				selectionBox.style.top = initialMouseY - mouseHeight + 'px';
				selTop = initialMouseY - mouseHeight;
			}
			selectionBox.style.width = mouseWidth + 'px';
			selectionBox.style.height = mouseHeight + 'px';
			var brick = document.getElementsByClassName('brick');
			var rec;
			var sT = document.documentElement.scrollTop;
			var sL = document.documentElement.scrollLeft; // 0
			for (i = 0; i < brick.length; i++) {
				rec = brick[i].getBoundingClientRect();
				if (
					!brick[i].classList.contains('highlighted') &&
					!brick[i].classList.contains('temp-select') &&
					rec.right + sL > selLeft &&
					rec.left + sL < selLeft + mouseWidth &&
					rec.bottom + sT > selTop &&
					rec.top + sT < selTop + mouseHeight
				) {
					brick[i].classList.add('temp-select');
					highlightBrick(brick[i], 1);
				} else if (
					brick[i].classList.contains('temp-select') &&
					brick[i].classList.contains('highlighted') &&
					(rec.right + sL < selLeft ||
						rec.left + sL > selLeft + mouseWidth ||
						rec.bottom + sT < selTop ||
						rec.top + sT > selTop + mouseHeight)
				) {
					brick[i].classList.remove('temp-select');
					highlightBrick(brick[i], 0);
				}
			}
		}
	});
	// end of selection box feature

	// begin blogs menu / blog menu dropdown
	var loderGifSrc =
		'data:image/gif;base64,R0lGODlhIAAgAPUZAA' +
		'QEBDo6OhYWFg4ODi4uLoCAgAgICBgYGAICAmxsbH' +
		'h4eBwcHF5eXsDAwLS0tJKSkvLy8v///xISEhAQEE' +
		'ZGRqioqGRkZFBQUCIiIiYmJjY2Np6enk5OTuDg4D' +
		'AwMNLS0lZWVoKCgqCgoLKysgAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAA' +
		'Ah/hlPcHRpbWl6ZWQgdXNpbmcgZXpnaWYuY29tAC' +
		'H5BAUKABkALAAAAAAgACAAAAbkwIxwSCQOIJBFcc' +
		'k0GoiBSCRQBDSZl8YGKqUOB4fnFdpoUIbR6Tc8GB' +
		'crZXHamwEf3EVCOSGcCwFseEUhcRl+dWFuBARVZQ' +
		'+GXYiJTl8FlkpDDGUYAwEBdpN/EoF1FpYFDG2ljF' +
		'UTCKJsqmgKp5+CoKNMABSnIHi4bgMMBZhjCKS/gn' +
		'VNgLhgyojNzZ7U1ALK07EH1dV3t9rgztjS0szY0A' +
		'ahV82/o+rMsfDa7fNO8aJL7JLI+/bkx+rSBUznrx' +
		'+oVsEClZMEDZaYhQKtoAu1kOE4isgqJpxQcI3Ehh' +
		'4/glz37koQACH5BAkKABIALAAAAAAZABgAAAaVQI' +
		'lwSCQaHA5BcWkEEAmNBqEYYEo0BcszOh2KIg8moV' +
		'DoXrnDQARsTZCdZ+nwsx5YF2SKECqXMNYFVkIgb3' +
		'FTAxARHU1FA3mGEgVrVUIGAZd2aW+WBAYLaw1GHp' +
		'eYlSALS1CojaQBCwiCsQgYrbG2AASutrsGu00AwM' +
		'GwvpUHxsfGxMXIx8oSCMLCztPU1dbX2NfDgkEAIf' +
		'kECQoAFgAsAAAAAB8AGAAABr9Ai3BIJAIUikFxyR' +
		'waEMZCYVEkNJeHgCc6JSoaiatRK3BKqUJCAywmas' +
		'jp83CzNrSdcMtCbqGsGXducHtdBg5rYgAARQBaVo' +
		'RUDGtWXmEWCAeZi3gBTwufAmsPbh0REZQTmgNQlx' +
		'lKVRtleg2mEQ1GqnZ3AyK1HYBYqncjtV1NmJl3BB' +
		'EiaG2sykyYitSKgUKbuKqa19aM29yB3rjV1N3Zz9' +
		'3n6MfJiRLh7wdXyMLPq+32rcGs7Hju2HI9qXclCA' +
		'Ah+QQJCgAZACwAAAAAIAAYAAAGvcCMcEgkIgIBQH' +
		'HJNBYHyMGzyTQcJsYokVOgUJ9XpRCaHC4K3S/4YN' +
		'YKLWixehweuwnowHyNyJClAApoagBydFd+WgFxRR' +
		'cXQwhhhlaSA5FoDFsVDQ0YZpWQhmMWUn4PnA0PfI' +
		'hzBgqoFV5VknMhqAwGX5GsXxgNCgJ7fsKes4XHhc' +
		'RIy1FhzrxqARHT1NPPtHvS1dSRyMfKzG5LfXvk5d' +
		'BN34QSdevt45bYuvHvh+8Ton749tDy+pW7+rULAg' +
		'Ah+QQJCgAUACwAAAAAIAAZAAAGwECKcEgsHo7FpJ' +
		'KIMB4BxqXSgBwCnsRMACN1VinX72Cb6XqtWKGHbG' +
		'amw1Awu+1GwuVb89U7AGMXc0MaGmhpQlR2UACBFB' +
		'kJBQUChYYDcUwecQIMkAUMfF9di5wJBEuIoEsgnA' +
		'GWU5Wtpp19dE20ple4uHR4BL2+T8CoUgQNxcbFwc' +
		'C7xMfGCLm5y7+/psu7frBKARGRehKGUh8R456uwW' +
		'0LDeMRHwGflhPZuo0d6w91BvjPVM+gBRDjru0a0E' +
		'lIEAAh+QQJCgAWACwAAAAAIAAeAAAG2ECLcEgsHo' +
		'7FpJKIMB4BxqXSgBwCnsyq1IoVXrXfwdZ54IK1Y2' +
		'83rEanLQMsG+5OXsliNtV97rabdwh+cBoBAQZmfn' +
		'F2E02EhoZ4dVMZkBoCS3uTRpALjplxUGMGhqJpn6' +
		'OgV6t3b2ELsLFPs6ajBbe4t7O7b3C5uYKsq71xsr' +
		'GZxL10tUsEDQyIW69pGw3WFKqzpw/WDRsEkqaNSQ' +
		'EfC0LO3QlZaJrBghERIkQMDtZZqO/LUCLxAUwMLi' +
		'izAyHCh4FvCsRjgDBNh3hiGkoJsFDilgYROCgJAg' +
		'Ah+QQJCgAYACwAAAAAIAAgAAAF4CAmjmR5nGWqko' +
		'h5AuaqGugIvGwt27h467/BznXgAXVDXy+oRCYxAx' +
		'wT6kzdiEImzUkzSmBeKhUZbDV7YpcZEUWfq6u2Oz' +
		'efvQxDNhz7hPbNVjeCgn9ybUEvdXEBjI2MiZB/jo' +
		'56g1dPZYdxf31jSQsFAWAyiEkWBagEcYaApAyoBR' +
		'YLWF88KQQbAj4JsBR0eF6gBQsCDQ0KJAEKqDmtlR' +
		'gBEREBGArGqjaMeTjR01AODRudZyLd1BgM1+NfRe' +
		'XS5xgVxsCfaOYjBMYXhRPJ7yQPGsAb584bwR0DIE' +
		'CY9SQEACH5BAkKABQALAAAAAAgACAAAAXmICWOZH' +
		'mcZaqSiHkC5qoa6Ai8bC3buHjrv8HOdeABdUNfL6' +
		'hEJikDHBPqTN2IQibNSTNKYF4qFRlsNXtilxkRRZ' +
		'+rq7Y7N5+9DEM2HPuE9s1WN4KCfVSDZS91cYmMjX' +
		'uBjnqHgHmTVzN/hVtJAwELlHaKJgGkAouMnASkpV' +
		'hfPh8BVhZCUBqrGHR4Iw8REQQCDAwCAwUFHCQLqz' +
		'mUC70NFAQNDQQUHMULdEMNvdjR01AKxoUiAb0F5N' +
		'LU0NfjHdzo3yIJxWBJDL0MI97q6+JPHBE+IEtHgk' +
		'GBDONMEEy4w4ADB6aehAAAIfkECQoAFgAsAAAAAC' +
		'AAIAAABeCgJY5keZxlqpKIeQLmqhroCLxsLdu4eO' +
		'u/wc514AF1Q18vqEQmLQMcE+pM3YhCJs1JM0pgXi' +
		'oVGWw1e2KXGRFFn6urtjs3n70MQzYc+4T2zVY3go' +
		'J9VINlL3VxiYyNe4GOeoeAeZNXM39/BRABSYRDDB' +
		'0RER2eiSsEDaMRDQSmjCUPqx0cPhuuRG94I6sFQi' +
		'IJDa0DAQFtxXRFIwkPCyzCD1AFvlDFvzxDD8IC0t' +
		'QIxR6FIqkNDLbU1cbiFdvnzuPWfRTCFDbT7+nKSQ' +
		'ENGyQL9/6pE/cvIMEdABQouDYkBAAh+QQJCgAaAC' +
		'wAAAAAIAAgAAAF2aAmjmR5nGWqkoh5AuaqGugIvG' +
		'wt27h467/BznXgAXVDXy+oRCY1AxwT6kzdiEImzU' +
		'kzSmBeKhUZbDV7YpcZEUWfq6u2OzefvQxDNhz7hP' +
		'bNVgGCgwELfVQ3iRoQEY2OEQx/L5MHjI+NkU9BlA' +
		'uEg4aaiaKAMZp/DA4ESYpDFBUNsKuTcQ+wDQ8Ysp' +
		'QlCbYVAT4WoHRveCO2DMYaFAUFAmVuW0UjFwkCLM' +
		'2RA4JZc107DM1Z3E2HPs3AUORjYH0J4j7rY4cE6D' +
		'byU0kZBRYs8vPm/BUKmOffjhAAIfkECQoAFQAsAA' +
		'AAACAAIAAABujAinBILB6OxaSSiDAeAcal0oAcAp' +
		'7MqtSKFV6138HWeeCCtWNvN6xGpysDLBvuTjIYZD' +
		'Gb6qYOCRERHQFZSFd0aGFNcB+BESMLXEkIE4uUT2' +
		'JEDBCOBZljcZhTD44jaaF1Rg0RhKBdaQRvcEsCBL' +
		'a3trJ0V7wVDg3AwQ0UsmGYB7/CwMRvxse4uMW804' +
		'uTxcUBCpGuBrAJBeCnolMM4AUMAuLHRRTmCRltk5' +
		'VtrxXmAVBCGAH4l/6fiMr8oQAQAL9Ye+rRGRNtjs' +
		'JTB+lJ1KWBn6VXElLRijgxIDYPhfLF05WHZDONSY' +
		'IAACH5BAUKABYALAAAAAAgACAAAAbuQItwSCwejs' +
		'WkkkgYEAFHgHGpTEQ+z2jWQC0yIhHGEIoUkp1dYg' +
		'eMPo/L6WEA/DBrLe44scHG3+9UFBRGYA1+SAaAdn' +
		'INjQREBWCPUIdodn8bjQ0hAmYjAUkIEwiXihYUDp' +
		'oMXHEDURJSoQmaIa2vaQIPDY+4plQYenhLrgvFxp' +
		'a2UMoWCgXOzwW8ya9HzdDO0r3U28fIXaLK4cPBpH' +
		'qiAd5Ky7gaAe7TsaEE7u6s38SmGPQaE2+ho6XgnK' +
		'pXrhI4cAITJcQQr5JDfEbsDdOSx5c2VhUt/oKT51' +
		'Awh6XeCLzXT2RDYh//jUw5sWCaIAA7';
	var navArchive = document.getElementById('nav_archive');
	var blogMenu = document.createElement('div');
	blogMenu.id = 'blog_menu';
	var blogMenuLink = navArchive
		.getElementsByClassName('title')[0]
		.getElementsByTagName('a')[0];
	blogMenuLink.innerHTML = 'Blogs';
	blogMenuLink.insertBefore(blogMenu, blogMenuLink.firstChild);
	var arrow = document.createElement('div');
	arrow.classList.add('arrow');
	blogMenuLink.removeAttribute('href');
	blogMenuLink.insertBefore(arrow, blogMenuLink.firstChild);
	// this makes a batch reblog button

	// this loads the secondaries for menu and data
	if (
		document.getElementById('bm_load_img') === null &&
		data.classList.contains('blog-menu-preload')
	) {
		data.classList.remove('blog-menu-preload');
		// first time open, fetch the blogs, if any
		var xhttp = new XMLHttpRequest();
		var preLoad = new Image();
		preLoad.src = loderGifSrc;
		preLoad.style.width = '32px;';
		preLoad.style.height = '32px';
		preLoad.id = 'bm_load_img';
		document.getElementById('blog_menu').appendChild(preLoad);
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				var data = document.getElementById(
					'mass_post_features-plugin_data'
				);
				var div = document.createElement('div');
				div.innerHTML = this.responseText // parse the dom
					.replace(/<(\/?)script[^>]*>/g, '<$1flurb>') // no eval
					.replace(/<img/g, '<space'); // do not onload img tags
				var apiKey = div
					.querySelectorAll('meta[name=tumblr-form-key]')[0]
					.getAttribute('content');
				data.setAttribute('data-x-tumblr-form-key', apiKey);
				var l = div.getElementsByClassName('l-container')[0];
				var li = l.getElementsByClassName('is_tumblelog');
				var tumblelogs = [];
				var st;
				var a;
				var av;
				var ho;
				var tray;
				var subt;
				var name1;
				var link0;
				var link1;
				var link2;
				var link3;
				var link4;
				var edIcon;
				var visIcon;
				var reIcon;
				var primIcon;
				var frIcon;
				var phIcon;
				var href = document.location.href.split(/[\/\?&#=]+/g);
				var name = href[4];
				var reAsDraftContainer = document.createElement('div');
				reAsDraftContainer.classList.add('blog_menu_child');
				var reAsDraft = document.createElement('input');
				reAsDraft.type = 'checkbox';
				reAsDraft.id = 're-as-draft';
				reAsDraft.checked = true;
				reAsDraftContainer.appendChild(reAsDraft);
				var reAsDraftLabel = document.createElement('label');
				reAsDraftLabel.setAttribute('for', 're-as-draft');
				reAsDraftLabel.appendChild(
					document.createTextNode('Reblog Posts as Draft')
				);
				var navFollows1;
				var robotWarning = document.createElement('div');
				var robotTitle = document.createElement('strong');
				robotTitle.appendChild(
					document.createTextNode('Friendly Robot Warning')
				);
				robotWarning.classList.add('robot-warning');
				robotWarning.appendChild(robotTitle);
				robotWarning.appendChild(
					document.createTextNode(
						'Dash flooding might make you lose followers!'
					)
				);
				reAsDraftContainer.appendChild(reAsDraftLabel);
				reAsDraftContainer.appendChild(robotWarning);
				document
					.getElementById('blog_menu')
					.appendChild(reAsDraftContainer);
				for (var i = 0; i < li.length; i++) {
					a = li[i].getElementsByTagName('a')[0];
					av = a.getElementsByClassName('avatar')[0];
					av.removeAttribute('style');
					av.innerHTML = av.innerHTML.replace(/<space/g, '<img');
					st = a.getElementsByClassName('small_text')[0];
					ho = a.getElementsByClassName('hide_overflow')[0];
					tray = document.createElement('div');
					tray.classList.add('blog_menu_child');
					name1 = ho.innerHTML.replace(/\s+/g, '');
					tray.setAttribute('data-name', name1);
					tumblelogs.push(name1);
					if (i === 0) {
						// assuming primary is first blog :)
						data.setAttribute('data-primary-blog', name1);
						navFollows1 = document.getElementById('nav-follows');
						navFollows1.setAttribute(
							'href',
							'/mega-editor/published/' + name1 + '?follows'
						);
						data.setAttribute('data-primary-known', 'true');
						// this is the follows and followers
						if (
							href[3] === 'published' &&
							(href[5] === 'follows' || href[5] === 'followers')
						) {
							loadFollowers();
						}
						var navLikes = document.getElementById('nav-likes');
						navLikes.setAttribute(
							'data-default-input',
							getCookie('name1') !== ''
								? getCookie('name1')
								: name1
						);
						primIcon = svgForType.original.cloneNode(true);
						primIcon.setAttribute('width', 20);
						primIcon.setAttribute('height', 20);
						primIcon.setAttribute('title', 'Primary Blog');
						primIcon.setAttribute('fill', 'rgba(0,65,100,1)');
						st.insertBefore(primIcon, st.firstChild);
					}
					reIcon = svgForType['reblog-self'].cloneNode(true);
					reIcon.setAttribute('width', '26');
					reIcon.setAttribute('height', '26');
					reIcon.setAttribute('fill', '#7D99FF');
					av.appendChild(reIcon);
					av.setAttribute('title', 'Select Avatar for Quick-Reblogs');
					av.setAttribute('data-name', name1);
					av.id = 'reblog-to_' + name1;
					av.addEventListener('click', function () {
						var data = document.getElementById(
							'mass_post_features-plugin_data'
						);
						var rb =
							document.getElementsByClassName('reblog-to-here');
						while (rb.length > 0) {
							rb[0].classList.remove('reblog-to-here');
						}
						this.classList.add('reblog-to-here');
						data.setAttribute(
							'data-reblog-to-here',
							this.getAttribute('data-name')
						);
					});
					if (name.toLowerCase() === name1.toLowerCase()) {
						av.classList.add('reblog-to-here');
						data.setAttribute('data-reblog-to-here', name);
					}
					tray.appendChild(av);
					tray.appendChild(st);
					link0 = document.createElement('a');
					link1 = document.createElement('a');
					link2 = document.createElement('a');
					link3 = document.createElement('a');
					link4 = document.createElement('a');
					subt = document.createElement('div');
					link0.setAttribute('title', 'edit "' + name1 + '" drafts');
					link0.setAttribute(
						'href',
						'https://www.tumblr.com/mega-editor/draft/' + name1
					);
					link1.setAttribute('title', 'visit "' + name1 + '"');
					link1.setAttribute(
						'href',
						'https://www.tumblr.com/blog/' + name1
					);
					link1.setAttribute('target', '_blank');
					link3.setAttribute(
						'title',
						'batch photo upload to "' + name1 + '"'
					);
					link4.setAttribute('title', '"' + name1 + '" followers');
					link2.setAttribute(
						'href',
						'https://www.tumblr.com/mega-editor/published/' + name1
					);
					link3.setAttribute(
						'href',
						'https://www.tumblr.com/mega-editor/publish/' +
							name1 +
							'?photos'
					);
					link4.setAttribute(
						'href',
						'https://www.tumblr.com/mega-editor/published/' +
							name1 +
							'?followers'
					);
					link0.appendChild(document.createTextNode('Drafts'));
					link1.appendChild(document.createTextNode('Visit'));
					link2.appendChild(document.createTextNode('Editor'));
					link3.appendChild(document.createTextNode('Photos'));
					link4.appendChild(document.createTextNode('Followers'));
					edIcon = svgForType.edit.cloneNode(true);
					edIcon.setAttribute('width', 12);
					edIcon.setAttribute('height', 12);
					edIcon.setAttribute('fill', '#7D99FF');
					frIcon = svgForType.mutual.cloneNode(true);
					frIcon.setAttribute('width', 12);
					frIcon.setAttribute('height', 12);
					frIcon.setAttribute('fill', '#7D99FF');
					phIcon = svgForType.image.cloneNode(true);
					phIcon.setAttribute('width', 12);
					phIcon.setAttribute('height', 12);
					phIcon.setAttribute('fill', '#7D99FF');
					visIcon = svgForType.home.cloneNode(true);
					visIcon.setAttribute('width', 12);
					visIcon.setAttribute('height', 12);
					visIcon.setAttribute('fill', '#7D99FF');
					link0.appendChild(edIcon.cloneNode(true));
					link1.appendChild(visIcon.cloneNode(true));
					link2.appendChild(edIcon.cloneNode(true));
					link3.appendChild(phIcon.cloneNode(true));
					link4.appendChild(frIcon.cloneNode(true));
					subt.appendChild(link2);
					subt.appendChild(link0);
					subt.appendChild(link3);
					subt.appendChild(link4);
					subt.appendChild(link1);
					if (
						!data.classList.contains('is-uploading-photos') &&
						href[5] !== 'followers' &&
						href[5] !== 'follows'
					) {
						subt.appendChild(reblogMenuButton(name1));
					} else {
						var blankSpace = document.createElement('div');
						blankSpace.classList.add('blank-space');
						subt.appendChild(blankSpace);
					}
					subt.classList.add('subt');
					tray.appendChild(subt);
					document.getElementById('blog_menu').appendChild(tray);
				}
				data.setAttribute(
					'data-tumblelogs',
					JSON.stringify(tumblelogs)
				);
				document
					.getElementById('blog_menu')
					.removeChild(document.getElementById('bm_load_img'));
			}
		};
		xhttp.open('GET', '/settings', true);
		xhttp.send();
	} // this loads the blog menu

	// this opens the blog menu
	blogMenuLink.addEventListener('click', function (e) {
		var data = document.getElementById('mass_post_features-plugin_data');
		// any other time, just open menu
		if (
			!this.classList.contains('open') &&
			!data.classList.contains('open-blog_menu') &&
			!data.classList.contains('closing-blog_menu')
		) {
			data.classList.add('open-blog_menu');
			this.classList.add('open');
			e.cancelBubble = true;
			e.preventDefault();
			e.stopPropagation();
		}
		e.cancelBubble = true;
		e.stopPropagation();
	});
	// end of blogs menu blog dropdown...

	// tumblr now has its own default queue/drafts pages
	// so we'll fake a query with userscript booleans
	if (
		href[3] === 'published' ||
		href[3] === 'draft' ||
		href[3] === 'queued'
	) {
		getResponseText('/blog/' + name, function (re) {
			var div = document.createElement('div');
			div.innerHTML = re // parse the dom
				.replace(/<(\/?)script[^>]*>/g, '<$1flurb>') // no eval
				.replace(/<img/g, '<space'); // do not onload img tags
			var flurb = div.getElementsByTagName('flurb');
			var keyReg = /"API_TOKEN"[^:]*:[^"]*"([^"]+)"/i;
			var csrfReg = /"CSRFTOKEN"[^:]*:[^"]*"([^"]+)"/i;
			// find the flurb :) not joking
			var apiToken = 0;
			var csrfToken = 0;
			var primary = name;
			for (var i = 0; i < flurb.length; i++) {
				if (flurb[i].innerText.match(keyReg) !== null) {
					apiToken = flurb[i].innerText.match(keyReg)[1];
					break;
				}
			}
			for (i = 0; i < flurb.length; i++) {
				if (flurb[i].innerText.match(csrfReg) !== null) {
					csrfToken = flurb[i].innerText.match(csrfReg)[1];
					break;
				}
			}
			if (apiToken !== 0) {
				// this is Tumblr's own API key! (0_0)
				data.setAttribute('data-api-token', apiToken);
				data.setAttribute('data-csrf-token', csrfToken);
				// please use this ^ responsibly! (O.O)
				if (href[3] === 'published' && href[5] === 'fans') {
					var token = data.getAttribute('data-api-token');
				}
				if (
					href[3] === 'published' &&
					(href[5] === 'dashboard' ||
						href[5] === 'archive' ||
						href[5] === 'tagged' ||
						href[5] === 'likes' ||
						href[5] === 'search')
				) {
					// hide editor functions for archive view / reblog mode
					var ritpm = document.getElementsByClassName(
						'remove-in-third-party-mode'
					); // edit buttons don't work in reblog mode... I tried :)
					while (ritpm.length > 0) {
						ritpm[0].parentNode.removeChild(ritpm[0]);
					}
					var notice = document.createElement('div');
					notice.classList.add('notice');
					notice.appendChild(
						document.createTextNode(
							'Page may be endless; Utilize pause button.'
						)
					);
					document
						.getElementsByClassName('editor_navigation')[0]
						.appendChild(notice);
					if (href[5] === 'dashboard') {
						i = 'dash';
					}
					if (href[5] === 'archive') {
						i = 'archive';
					}
					if (href[5] === 'tagged') {
						i = 'tagged';
					}
					if (href[5] === 'likes') {
						i = 'likes';
					}
					if (href[5] === 'search') {
						i = 'search';
					}
				} else {
					i = href[3];
					// this is the fans
					if (href[3] === 'published' && href[5] === 'fans') {
						// loadFans(); // html api; too unstable
					}
				}
				if (
					(href[3] === 'published' && href[5] === 'archive') ||
					(href[3] === 'published' && href[5] === 'likes') ||
					(href[3] === 'published' && href[5] === 'dashboard') ||
					(href[3] === 'published' && href[5] === 'tagged') ||
					(href[3] === 'published' && href[5] === 'search') ||
					(i === 'published' &&
						href[5] !== 'photos' &&
						i === 'published' &&
						href[5] !== 'follows' &&
						i === 'published' &&
						href[5] !== 'followers' &&
						i === 'published' &&
						href[5] !== 'fans') ||
					i === 'queued' ||
					i === 'draft'
				) {
					var q = typeof href[6] !== 'undefined' ? href[6] : 'cats';
					var o =
						typeof href[7] !== 'undefined' && !isNaN(href[7])
							? '&before=' + href[7]
							: '';
					if (q === name) {
						q = data.getAttribute('data-primary-blog');
						// all secondaries goto the blog that likes, for likes :)
					}
					var subpage = {
						published:
							'/v2/blog/' +
							name +
							'/posts?limit=50&reblog_info=1&npf=1&page=1' +
							o,
						likes:
							'/v2/blog/' +
							q +
							'/likes?limit=50&reblog_info=1&npf=1&page=1' +
							o,
						draft:
							'/v2/blog/' +
							name +
							'/posts/draft?limit=50&reblog_info=1&npf=1&page=1' +
							o,
						queued:
							'/v2/blog/' +
							name +
							'/posts/queue?limit=50&reblog_info=1&npf=1&page=1' +
							o,
						archive:
							'/v2/blog/' +
							q +
							'/posts?limit=50&reblog_info=1&npf=1&page=1' +
							o,
						dash: '/v2/timeline/dashboard',
						search:
							'/v2/mobile/search/posts?blog_limit=0&post_limit=50&query=' +
							q +
							'&mode=top' +
							o,
						// why is these mobile? I'm not quite sure...
						tagged:
							'/v2/mobile/search/posts?blog_limit=0&post_limit=50m&query=' +
							q +
							'&mode=top&mode=recent' +
							o
					}[i];
					data.setAttribute('data-ajax-first-subpage', subpage);
					asyncRepeatApiRead({
						response: {
							// we wil use all neue npf format, because
							_links: {
								// some posts are neue npf, no matter what
								next: {
									// (if you can't beat 'em, join 'em)
									href: subpage
								}
							}
						}
					}); // this thing paginates itself
				}
				// this is the follows and followers
				if (
					href[3] === 'published' &&
					(href[5] === 'follows' || href[5] === 'followers')
				) {
					loadFollowers();
				}
			}
		});
	}

	// the month widget must be modified to accomidate Archives
	var broMo = document.createElement('div');
	broMo.id = 'browse_months';
	broMo.setAttribute('onclick', 'just_clicked_browse_months = true;');
	var jum2mo = document.createElement('div');
	jum2mo.id = 'jump_to_month';
	var aro2 = document.createElement('span');
	aro2.classList.add('arrow');
	jum2mo.appendChild(aro2);
	broMo.addEventListener('click', function () {
		var bmw = document.getElementById('browse_months_widget');
		if (
			window.getComputedStyle(bmw).getPropertyValue('display') === 'none'
		) {
			bmw.style.display = 'block';
		} else {
			bmw.style.display = 'none';
		}
	});
	var mo2;
	var jum = typeof href[5] !== 'undefined' ? href[5] : 'jump';
	var jumto = typeof href[6] !== 'undefined' ? href[6] : name;
	var year =
		typeof href[7] !== 'undefined' && !isNaN(href[7])
			? new Date(parseInt(href[7]) * 1000).getFullYear()
			: new Date().getFullYear();
	if (href[3] === 'queued' || href[3] === 'draft') {
		var ridqm = document.getElementsByClassName(
			'remove-in-drafts-queue-mode'
		);
		while (ridqm.length > 0) {
			ridqm[0].parentNode.removeChild(ridqm[0]);
		}
	}
	if (
		href[3] === 'published' &&
		(typeof href[5] === 'undefined' ||
			href[5] === 'jump' ||
			href[5] === 'archive')
	) {
		mo2 = document.createElement('span');
		mo2.classList.add('month');
		mo2.appendChild(document.createTextNode('Month'));
		jum2mo.appendChild(mo2);
		// this is a sneaky trick to get that elusive "firstPostTimeStamp"
		var monthIframe = document.createElement('iframe');
		monthIframe.style.display = 'none';
		monthIframe.id = 'browse_months_widget';
		monthIframe.setAttribute('scrolling', 'no');
		monthIframe.setAttribute('frameborder', '0');
		monthIframe.setAttribute('title', 'Post forms');
		monthIframe.src =
			'https://' +
			jumto +
			'.tumblr.com/' +
			'archive?fetch=first_post_timestamp' +
			'&jump=' +
			jum +
			'&name=' +
			name +
			'&to=' +
			jumto +
			'&year=' +
			year;
		// these ^ url parameters need to be in alphabetical order
		jum2mo.appendChild(monthIframe);
		broMo.appendChild(jum2mo);
		document
			.getElementById('browse_months')
			.parentNode.replaceChild(
				broMo,
				document.getElementById('browse_months')
			);
	} else {
		mo2 = document.createElement('span');
		mo2.classList.add('month');
		mo2.appendChild(document.createTextNode('Month'));
		jum2mo.appendChild(mo2);
		// this is for getting before timestamps for other feeds
		jum = typeof href[5] !== 'undefined' ? href[5] : 'jump';
		jumto = typeof href[6] !== 'undefined' ? href[6] : name;
		year =
			typeof href[7] !== 'undefined' && !isNaN(href[7])
				? new Date(parseInt(href[7]) * 1000).getFullYear()
				: new Date().getFullYear();
		lTs = new Date().getTime();
		fTs = new Date(1970, 0, 1).getTime();
		var monthDiv = makeBrowseMonthsWidget(year, lTs, fTs, jum, jumto);
		monthDiv.style.display = 'none';
		jum2mo.appendChild(monthDiv);
		broMo.appendChild(jum2mo);
		document
			.getElementById('browse_months')
			.parentNode.replaceChild(
				broMo,
				document.getElementById('browse_months')
			);
		doubleCheckDisabledMonths(year, lTs, fTs, jum, jumto);
	}

	// this is the new batch photos page! BATCH PHOTOS PAGE
	if (href[3] === 'published' && href[5] === 'photos') {
		navArchive = document.getElementById('nav_archive');
		navArchive.style.zIndex = '1000';
		var addTagsWidget = document.getElementById('add_tags_widget');
		navArchive.appendChild(addTagsWidget);
		var addTagButton = document.getElementById('add_tag_button');
		addTagButton.removeAttribute('onclick');
		var addTagButton2 = addTagButton.cloneNode(true);
		addTagButton.firstChild.innerHTML = 'Add Tags (single)';
		addTagButton2.firstChild.innerHTML = 'Add Tags to All';
		addTagButton2.id += '2';
		addTagButton2.style.position = 'absolute';
		addTagButton2.style.bottom = '8px';
		addTagButton2.style.left = '161px';
		addTagButton2.addEventListener('click', function () {
			var token = document.getElementById('tokens').children;
			var pb = document.getElementsByClassName('photo-brick');
			var phTags;
			var aToken;
			var child;
			var a;
			var addToken = true;
			for (var j = 0; j < pb.length; j++) {
				//pb & j :)
				phTags = pb[j].getElementsByClassName('photo-tags')[0];
				aToken = phTags.children;
				for (var i = 0; i < token.length; i++) {
					addToken = true;
					for (var l = 0; l < aToken.length; l++) {
						if (token[i].innerHTML === aToken[l].innerHTML) {
							addToken = false;
							break;
						}
					}
					if (addToken) {
						child = token[i].cloneNode(true);
						a = child.getElementsByTagName('a');
						a[0].removeAttribute('onclick');
						phTags.appendChild(child);
					}
				}
			}
		});
		addTagButton.addEventListener('click', function () {
			var fr = document.getElementsByClassName('focused-rich');
			if (fr.length === 0) {
				return;
			}
			var token = document.getElementById('tokens').children;
			var phTags = fr[0].getElementsByClassName('photo-tags')[0];
			var aToken = phTags.children;
			var addToken = true;
			for (var i = 0; i < token.length; i++) {
				addToken = true;
				for (var l = 0; l < aToken.length; l++) {
					if (token[i].innerHTML === aToken[l].innerHTML) {
						addToken = false;
						break;
					}
				}
				if (addToken) {
					phTags.appendChild(token[i].cloneNode(true));
				}
			}
		});
		addTagButton.parentNode.parentNode.appendChild(addTagButton2);
		addTagsWidget.style.top = '83px';
		addTagsWidget.style.left = '15px';
		addTagsWidget.style.removeProperty('right');
		lcontent.classList.add('albino');
		lcontent.classList.add('hoverless');
		lcontent.classList.add('photo-page');
		data.classList.add('is-uploading-photos');

		en = document.getElementsByClassName('editor_navigation');
		// remove all navigation buttons, editor widgets, and start anew
		en[0].parentNode.removeChild(en[0]);
		var dropZone = document.createElement('div');
		dropZone.id = 'photos-drop-zone';
		var dropTitle = document.createElement('h2');
		dropTitle.appendChild(document.createTextNode('Drop Photos Here'));
		dropTitle.id = 'drop_images_here';
		var inputBackup = document.createElement('input');
		inputBackup.type = 'file';
		inputBackup.accept = 'image/x-png,image/gif,image/jpeg,image/png';
		inputBackup.multiple = true;
		inputBackup.addEventListener('change', drop);
		inputBackup.id = 'photo_file_input';
		var postPhotos = butt('Post Photos');
		postPhotos.disabled = true;
		postPhotos.id = 'post_all_photos_button';
		postPhotos.setAttribute('title', 'Post All Photos');
		postPhotos.addEventListener('click', photoUploadAndSubmit);
		var photosAsDraft = document.createElement('input');
		photosAsDraft.id = 'photos_as_draft';
		photosAsDraft.type = 'checkbox';
		photosAsDraft.checked = true;
		var photosAsDraftLabel = document.createElement('label');
		photosAsDraftLabel.setAttribute('for', 'photos_as_draft');
		photosAsDraftLabel.appendChild(
			document.createTextNode('New Photo/Photoset Posts')
		);
		var asB = document.createElement('strong');
		asB.appendChild(document.createTextNode(' as Draft'));
		photosAsDraftLabel.appendChild(asB);
		var photosAsDraftContainer = document.createElement('div');
		photosAsDraftContainer.id = 'photos_as_draft_container';
		photosAsDraftContainer.appendChild(photosAsDraft);
		photosAsDraftContainer.appendChild(photosAsDraftLabel);
		var photosRobotWarning = document.createElement('div');
		photosRobotWarning.classList.add('robot-warning');
		var robotTitlePhotos = document.createElement('strong');
		robotTitlePhotos.appendChild(
			document.createTextNode('Friendly Robot Warning')
		);
		photosRobotWarning.appendChild(robotTitlePhotos);
		photosRobotWarning.appendChild(
			document.createTextNode(
				'Dash flooding might make you lose followers. ' +
					'Perhaps "check" post "as draft" instead?'
			)
		);
		photosAsDraftContainer.appendChild(photosRobotWarning);
		document.body.appendChild(photosAsDraftContainer);
		document.body.appendChild(inputBackup);
		document.body.appendChild(postPhotos);
		document.body.appendChild(dropTitle);
		document.body.appendChild(dropZone);
		document.documentElement.addEventListener(
			'dragenter',
			dragEnter,
			false
		);
		document.documentElement.addEventListener('dragover', dragEnter, false);
		document.documentElement.addEventListener(
			'dragleave',
			dragLeave,
			false
		);
		document.documentElement.addEventListener('drop', drop, false);
	}
};
// May 2020, Mass Post Editor Features 4 (from scratch) by Jake Jilg (benign-mx)
document.onreadystatechange = function () {
	// Hello :)
	if (document.readyState === 'interactive') {
		MassPostEditorFeatures4();
	}
}; // Hello world!
