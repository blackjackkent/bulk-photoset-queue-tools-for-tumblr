import butt from './butt';

const appendRichButtons = (pbe, rich, brick) => {
	// pbe meanse photo brick edit, but I recycled this
	// to make buttons for the caption adder thing too :)
	const addTextFormatting = (event, element) => {
		console.log({
			event,
			element
		});
		event.preventDefault();
		event.stopPropagation();
		const sel = window.getSelection();
		if (typeof sel.rangeCount !== 'undefined' && sel.rangeCount === 0) {
			return;
		}
		const rng = sel.getRangeAt(0);
		let nod;
		let frag;
		let ancestor;
		let ancClone;
		let middle;
		const isNode = element.getAttribute('data-node') !== 'none';
		if (isNode) {
			nod = document.createElement(element.getAttribute('data-node'));
			nod.appendChild(document.createTextNode(sel.toString()));
			if (element.getAttribute('data-class') !== 'none') {
				nod.classList.add(element.getAttribute('data-class'));
			}
			if (element.getAttribute('data-node') === 'a' && element.getAttribute('data-attr') === 'href') {
				nod.href = pbe.getElementsByClassName('a_button_input')[0].value;
			}
		} else {
			nod = document.createTextNode(sel.toString());
		}
		rng.deleteContents();
		// data-parent is like ul li || ol li...
		if (element.getAttribute('data-parent') !== 'none') {
			const pnt = document.createElement(element.getAttribute('data-parent'));
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
				ancestor.innerText = ancestor.innerText.substring(0, sel.anchorOffset);
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
				rng.commonAncestorContainer.parentNode.replaceChild(frag, rng.commonAncestorContainer);
			}
		}
		brick.classList.remove('visible-colors');
		brick.classList.remove('visible-url');
		window.getSelection().removeAllRanges();
	};
	const xb = butt('X');
	xb.classList.add(xb.id);
	xb.setAttribute('data-node', 'none');
	xb.setAttribute('data-class', 'none');
	xb.setAttribute('data-attr', 'none');
	xb.setAttribute('data-parent', 'none');
	xb.removeAttribute('id');
	xb.setAttribute('title', 'Remove Formatting');
	xb.addEventListener('click', (e) => addTextFormatting(e, xb));
	const hb = butt('H');
	hb.classList.add(hb.id);
	hb.setAttribute('data-node', 'h2');
	hb.setAttribute('data-class', 'none');
	hb.setAttribute('data-attr', 'none');
	hb.setAttribute('data-parent', 'none');
	hb.removeAttribute('id');
	hb.setAttribute('title', 'Heading');
	hb.addEventListener('click', (e) => addTextFormatting(e, hb));
	const bb = butt('B');
	bb.classList.add(bb.id);
	bb.setAttribute('data-node', 'b');
	bb.setAttribute('data-class', 'none');
	bb.setAttribute('data-attr', 'none');
	bb.setAttribute('data-parent', 'none');
	bb.removeAttribute('id');
	bb.setAttribute('title', 'Bold');
	bb.addEventListener('click', (e) => addTextFormatting(e, bb));
	const ib = butt('i');
	ib.classList.add(ib.id);
	ib.setAttribute('data-node', 'i');
	ib.setAttribute('data-class', 'none');
	ib.setAttribute('data-attr', 'none');
	ib.setAttribute('data-parent', 'none');
	ib.removeAttribute('id');
	ib.setAttribute('title', 'Italic');
	ib.addEventListener('click', (e) => addTextFormatting(e, ib));
	const so = butt('S');
	so.classList.add(so.id);
	so.removeAttribute('id');
	so.setAttribute('data-node', 'strike');
	so.setAttribute('data-class', 'none');
	so.setAttribute('data-attr', 'none');
	so.setAttribute('data-parent', 'none');
	so.setAttribute('title', 'Strike');
	so.addEventListener('click', (e) => addTextFormatting(e, so));
	const ab = butt('a');
	ab.classList.add(ab.id);
	ab.removeAttribute('id');
	const ok = butt('ok');
	ok.classList.add(ok.id);
	ok.removeAttribute('id');
	const urlInput = document.createElement('input');
	urlInput.type = 'text';
	urlInput.addEventListener('focus', () => {
		this.select();
	});
	urlInput.classList.add('a_button_input');
	urlInput.value = 'https://';
	ok.setAttribute('data-node', 'a');
	ok.setAttribute('data-class', 'none');
	ok.setAttribute('data-attr', 'href');
	ok.setAttribute('data-parent', 'none');
	ab.setAttribute('title', 'Link');
	ok.addEventListener('click', (e) => addTextFormatting(e, ok));
	ab.addEventListener('click', () => {
		brick.classList.add('visible-url');
	});
	const ol = butt('ol');
	ol.classList.add(ol.id);
	ol.removeAttribute('id');
	ol.setAttribute('data-node', 'li');
	ol.setAttribute('data-class', 'none');
	ol.setAttribute('data-attr', 'none');
	ol.setAttribute('data-parent', 'ol');
	ol.firstChild.innerHTML = '1.';
	ol.setAttribute('title', 'Ordered List');
	ol.addEventListener('click', (e) => addTextFormatting(e, ol));
	const ul = butt('ul');
	ul.classList.add(ul.id);
	ul.removeAttribute('id');
	ul.setAttribute('data-node', 'li');
	ul.setAttribute('data-class', 'none');
	ul.setAttribute('data-attr', 'none');
	ul.setAttribute('data-parent', 'ul');
	ul.firstChild.innerHTML = '&#x26AB;';
	ul.setAttribute('title', 'Unordered List (Bullet Point)');
	ul.addEventListener('click', (e) => addTextFormatting(e, ul));
	const bq = butt('bq');
	bq.classList.add(bq.id);
	bq.removeAttribute('id');
	bq.setAttribute('data-node', 'blockquote');
	bq.setAttribute('data-class', 'none');
	bq.setAttribute('data-attr', 'none');
	bq.setAttribute('data-parent', 'none');
	bq.firstChild.innerHTML = '&#x2590;';
	bq.setAttribute('title', 'Blockquote');
	bq.addEventListener('click', (e) => addTextFormatting(e, bq));
	const colorB = butt('colors');
	colorB.classList.add(colorB.id);
	colorB.removeAttribute('id');
	const color = document.createElement('div');
	color.classList.add('color');
	colorB.firstChild.innerHTML = color.outerHTML;
	colorB.setAttribute('title', 'Text Color');
	colorB.addEventListener('click', () => {
		brick.classList.add('visible-colors');
	});
	const colors = [
		['Pink', '#ff62ce', 'niles'],
		['Red', '#ff492f', 'joey'],
		['Orange', '#ff8a00', 'monica'],
		['Yellow', '#e8d73a', 'phoebe'],
		['Green', '#00cf35', 'ross'],
		['Cerulean', '#00b8ff', 'rachel'],
		['Blue', '#7c5cff', 'chandler']
	];
	let cb;
	for (let i = 0; i < colors.length; i++) {
		cb = butt(colors[i][0]);
		cb.classList.add(cb.id);
		cb.removeAttribute('id');
		cb.setAttribute('title', `${colors[i][0]} ${colors[i][2].charAt(0).toUpperCase()}${colors[i][2].slice(1)}`);
		cb.classList.add('colors_buttons');
		cb.firstChild.innerHTML = '';
		[, cb.style.backgroundColor] = colors[i];
		cb.setAttribute('data-node', 'span');
		cb.setAttribute('data-class', `npf_color_${colors[i][2]}`);
		cb.setAttribute('data-attr', 'none');
		cb.setAttribute('data-parent', 'none');
		cb.addEventListener('click', (e) => addTextFormatting(e, cb));
		pbe.appendChild(cb);
	}
	const fb = butt('Q');
	fb.classList.add(fb.id);
	fb.removeAttribute('id');
	fb.setAttribute('title', 'Quirky/Fancy');
	fb.setAttribute('data-node', 'p');
	fb.setAttribute('data-class', 'npf_quirky');
	fb.setAttribute('data-attr', 'none');
	fb.setAttribute('data-parent', 'none');
	fb.addEventListener('click', (e) => addTextFormatting(e, fb));
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
export default appendRichButtons;
