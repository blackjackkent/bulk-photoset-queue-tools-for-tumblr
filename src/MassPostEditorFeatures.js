import doubleCheckDisabledMonths from './utilities/datetime/doubleCheckDisabledMonths';
import makeBrowseMonthsWidget from './utilities/datetime/makeBrowseMonthsWidget';
import svgForType from './utilities/ui/svgForType';
import newChromeButton from './utilities/ui/newChromeButton';
import populateSelectByWidget from './utilities/ui/populateSelectByWidget';

class MassPostEditorFeatures {
	constructor() {
		this.init();
	}

	init() {
		if (typeof l === 'undefined') {
			const lcontentDiv = document.createElement('div');
			lcontentDiv.classList.add('l-content');
			lcontentDiv.classList.add('albino');
			document.body.appendChild(lcontentDiv);
		}
		// @TODO - is this necessary at all? not sure if first_post_timestamp path is necessary
		// with current month selection behavior.
		if (
			document.location.href.match(
				// really big RegEx
				/\/archive\?fetch=first_post_timestamp&jump=[^&]+&name=[^&]+&to=[^&]+&year=\d+/i
			) !== null
		) {
			const megaCss = document.createElement('link');
			megaCss.setAttribute('rel', 'stylesheet');
			megaCss.setAttribute('type', 'text/css');
			megaCss.setAttribute(
				'href',
				'https://assets.tumblr.com/assets/styles/mega-editor.css'
			);
			const glbCss = document.createElement('link');
			glbCss.setAttribute('rel', 'stylesheet');
			glbCss.setAttribute('type', 'text/css');
			glbCss.setAttribute(
				'href',
				'https://assets.tumblr.com/client/prod/app/global.build.css'
			);
			const iCss = document.createElement('style');
			iCss.setAttribute('type', 'text/css');
			iCss.appendChild(
				document.createTextNode(
					function cssTextNode() {
						/*
body {
  background: none transparent;
}
#browse_months_widget {
  height: 422px;
  width: 225px;
  padding: 0px;
  top: 0px;
  left: 0px;
}
*/
					}
						.toString()
						.slice(16, -3)
				)
			);
			// this browMoWidget ^ is inside the iframe
			const newH = document.createElement('html');
			const head = document.createElement('head');
			head.appendChild(glbCss);
			head.appendChild(megaCss);
			head.appendChild(iCss);
			newH.appendChild(head);
			const body = document.createElement('body');
			const currentYr = document.location.href.match(/year=(\d+)/i)[1];
			const [, name] = document.location.href.match(/&name=([^&]+)/i)[1];
			const jump = document.location.href.match(/jump=([^&]+)/i)[1];
			const jumpTo = document.location.href.match(/to=([^&]+)/i)[1];
			const html = document.documentElement.innerHTML;
			const fTs =
				parseInt(html.match(/"firstPostTimestamp":(\d+)/)[1], 10) *
				1000;
			const lTs = parseInt(html.match(/"updated":(\d+)/)[1], 10) * 1000;
			body.appendChild(
				makeBrowseMonthsWidget(currentYr, lTs, fTs, jump, jumpTo, name)
			);
			newH.appendChild(body);
			document
				.getElementsByTagName('html')[0]
				.parentNode.replaceChild(
					newH,
					document.getElementsByTagName('html')[0]
				);
			doubleCheckDisabledMonths(currentYr, lTs, fTs, jump, jumpTo, name);
		}

		const removeS = document.getElementsByTagName('script');
		for (let i = 0; i < removeS.length; i++) {
			if (
				typeof removeS[i].src.split(/\/+/g)[1] === 'undefined' ||
				removeS[i].src.split(/\/+/g)[1] !== 'assets.tumblr.com'
			) {
				removeS[i].parentNode.removeChild(removeS[i]);
			}
		}

		const lcontent = document.getElementsByClassName('l-content')[0];
		if (typeof lcontent !== 'undefined') {
			lcontent.innerHTML = '';
		}
		let en = document.getElementsByClassName('editor_navigation');
		const enable = en[0].getElementsByTagName('button');
		for (let i = 0; i < enable.length; i++) {
			enable[i].classList.add('disable-when-none-selected');
		}

		document.getElementById('unselect').parentNode.setAttribute(
			'onclick',
			function onUnselectClick() {
				const hl = document.getElementsByClassName('highlighted');
				while (hl.length > 0) {
					hl[0].classList.add('prevent-anim');
					hl[0].classList.remove('edit-reblog-queue');
					hl[0].classList.remove('highlighted');
				}
				window.postCountMake();
				return false;
			}
				.toString()
				.slice(13, -1)
		);
		document
			.getElementById('tags_loading')
			.parentNode.removeChild(document.getElementById('tags_loading'));
		document.getElementById('remove_tags').parentNode.setAttribute(
			'onclick',
			function onRemoveTagsClick() {
				window.just_clicked_remove_tags = !0;
				const hl = document.getElementsByClassName('highlighted');
				if (hl.length === 0) {
					document.getElementById('no_tags_message').style.display =
						'block';
					document.getElementById('remove_tag_button').style.display =
						'none';
				} else {
					document.getElementById('remove_tag_button').style.display =
						'block';
					document.getElementById('no_tags_message').style.display =
						'none';
				}
				document.getElementById('remove_tags_widget').style.display =
					'block';
				return false;
			}
				.toString()
				.slice(13, -1)
		);
		const mpe = document.createElement('div');
		const mpeIcon = new Image();
		mpeIcon.width = 18;
		mpeIcon.height = 16;
		mpeIcon.src = // PNG is the monkey emoji from windows 8.1
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC' +
			'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' +
			'nvxY2Pj+AwAAAAAElFTkSuQmCC';
		mpe.id = 'mpe_title';
		mpe.appendChild(mpeIcon);
		mpe.setAttribute('title', 'Mass Post Editor Features 4');
		[en] = document.getElementsByClassName('editor_navigation');
		const selectAllFrag = document.createDocumentFragment();
		selectAllFrag.appendChild(svgForType.select.cloneNode(true));
		const selectAllSpan = document.createElement('span');
		selectAllSpan.appendChild(document.createTextNode('Select 100'));
		selectAllFrag.appendChild(selectAllSpan);
		const selectAll_chrome = newChromeButton(
			'select-all',
			selectAllFrag,
			false
		);
		const selectByFrag = document.createDocumentFragment();
		selectByFrag.appendChild(svgForType.select.cloneNode(true));
		selectByFrag.appendChild(document.createTextNode('Select By'));
		const selectBy_chrome = newChromeButton(
			'select-by',
			selectByFrag,
			true
		);
		const selectBy_widget =
			selectBy_chrome.getElementsByClassName('widget')[0];
		selectBy_widget.style.top = '50px';
		selectBy_widget.style.right = '90px';
		// this shows the select-by widget and populates it with tags/types
		selectBy_chrome
			.getElementsByTagName('input')[0]
			.addEventListener('change', populateSelectByWidget);
		console.log('running3');
	}
}
export default MassPostEditorFeatures;
