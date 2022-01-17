/* eslint-disable no-nested-ternary */
/* eslint-disable no-continue */
import appendRichButtons from './appendRichButtons';
import butt from './butt';
import rebuildPhotoColumn from './rebuildPhotoColumn';

const loadPhotoIntoDOM = (reloadedImg, reading) => {
	const lcontent = document.getElementsByClassName('l-content')[0];
	const data = document.getElementById('mass_post_features-plugin_data');
	let brickIndex = 0;
	// new photo-brick
	const brick = document.createElement('div');
	const brickInner = document.createElement('div');
	brickInner.classList.add('photo-inner');
	brick.classList.add('photo-brick');
	brick.style.top = '-150px';
	brick.style.left = '420px';
	brick.setAttribute('onclick', 'window.just_clicked_add_tags = true;');
	brick.id = `photo-brick_${brickIndex}`;
	const img = new Image();
	if (
		typeof reloadedImg !== 'undefined' &&
		typeof reloadedImg.target !== 'undefined' &&
		typeof reloadedImg.target.imgCode !== 'undefined'
	) {
		img.setAttribute('img-code', reloadedImg.target.imgCode);
	}
	img.style.visibility = 'hidden';
	img.setAttribute('data-id', brick.id);
	const pbi = document.createElement('div');
	pbi.setAttribute('data-id', brick.id);
	pbi.classList.add('row-with-one-img');
	pbi.classList.add('photo-brick-img');
	const pbic = document.createElement('div');
	pbic.classList.add('photo-brick-img-cell');
	const observer = document.createElement('div');
	observer.classList.add('resize-observer');
	// rebuildColumn after single photo dragged / resized
	new ResizeObserver(rebuildPhotoColumn).observe(observer);
	// these ^ are cool :)
	// editor portion
	const pbe = document.createElement('div');
	pbe.classList.add('photo-brick-edit');
	const rich = document.createElement('div');
	rich.setAttribute('title', 'caption');
	rich.id = `rich_text_${brickIndex}`;
	rich.setAttribute('data-id', brickIndex);
	const tags = document.createElement('div');
	tags.setAttribute('data-id', brickIndex);
	tags.classList.add('photo-tags');
	tags.addEventListener('click', () => {
		if (!brick.classList.contains('focused-rich')) {
			rich.focus();
		}
	});
	tags.id = `photo_tags_${brickIndex}`;
	rich.contentEditable = true;
	rich.designMode = 'on';
	rich.classList.add('rich');
	rich.addEventListener('focus', () => {
		if (data.classList.contains('photo-upload-in-progress')) {
			return;
		}
		if (!brick.classList.contains('focused-rich')) {
			const fr = document.getElementsByClassName('focused-rich');
			while (fr.length > 0) {
				fr[0].classList.remove('focused-rich');
			}
			const addTagsWidget = document.getElementById('add_tags_widget');
			addTagsWidget.style.display = 'block';
			brick.classList.add('focused-rich');
		}
	});
	pbe.appendChild(rich);
	pbe.appendChild(tags);
	const stripe = document.createElement('div');
	stripe.classList.add('stripe');
	const clone = butt('Clone ABC');
	clone.classList.add(clone.id);
	clone.removeAttribute('id');
	clone.addEventListener('click', () => {
		const otherRich = document.getElementsByClassName('rich');
		for (let i = 0; i < otherRich.length; i++) {
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
	img.addEventListener('load', () => {
		let column = parseInt(data.getAttribute('data-photos_height'), 10);
		const minBrickHeight = 120;
		this.removeAttribute('style');
		column +=
			(this.height > minBrickHeight ? this.height : minBrickHeight) + 6;
		data.setAttribute('data-photos_height', column);
		lcontent.style.height = `${column}px`;
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
		const hlb = document.getElementsByClassName('hl-bottom');
		const hlt = document.getElementsByClassName('hl-top');
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
export default loadPhotoIntoDOM;
