const rebuildPhotoColumn = () => {
	const lcontent = document.getElementsByClassName('l-content')[0];
	const data = document.getElementById('mass_post_features-plugin_data');
	let column = 150;
	const brk = document.getElementsByClassName('photo-brick');
	let rect;
	let iRct;
	let img;
	let mt; // margin Top
	let brkHeight = 0;
	let tallH;
	for (let i = 0; i < brk.length; i++) {
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
			for (let l = 0; l < img.length; l++) {
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
					); // 2
					img[l].style.height = `${tallH}px`;
					img[l + 1].style.height = `${tallH}px`;
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
					); // 3
					img[l].style.height = `${tallH}px`;
					img[l + 1].style.height = `${tallH}px`;
					img[l + 2].style.height = `${tallH}px`;
				}
				if (
					typeof img[l] !== 'undefined' &&
					typeof img[l].children[0] !== 'undefined'
				) {
					rect = img[l].getBoundingClientRect();
					iRct = img[l].children[0].getBoundingClientRect();
					mt = Math.round((rect.height - iRct.height) / 2);
					img[l].children[0].style.marginTop = `${mt}px`;
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
				brk[i].style.height = `${Math.round(brkHeight)}px`;
				brk[i].getElementsByClassName('rich')[0].style.maxHeight =
					Math.round(brkHeight - 42) > 100
						? `${Math.round(brkHeight - 42)}px`
						: '100px';
			}
		}
	}
	for (let i = 0; i < brk.length; i++) {
		brk[i].style.top = `${column}px`;
		brk[i].style.left = '420px'; // :P
		column += brk[i].getBoundingClientRect().height + 6;
	}
	data.setAttribute('data-photos_height', column);
	lcontent.style.height = `${column}px`;
};
export default rebuildPhotoColumn;
