// ==UserScript==
// @name        Bulk Photoset Queue Tools for Tumblr
// @namespace   https://github.com/blackjackkent
// @description A tool for facilitating bulk repeated queueing of image photosets on Tumblr.
// @author      Rosalind Wills (@blackjackkent)
// @website     https://www.patreon.com/blackjacksoftware
// @include     https://www.tumblr.com/blog/*/queue
// @downloadURL https://raw.githubusercontent.com/blackjackkent/bulk-photoset-queue-tools-for-tumblr/production/dist/bulk-photoset-queue-tools.user.js
// @updateURL   https://raw.githubusercontent.com/blackjackkent/bulk-photoset-queue-tools-for-tumblr/production/dist/bulk-photoset-queue-tools.user.js
// @version     1.2.7
// @grant       none
// @run-at      document-end
// ==/UserScript==
			
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/utility.js
function addStyle(rules) {
	const style =
		document.getElementById('AddStyleBulkPhotosetQueue') ||
		(function () {
			const newStyle = document.createElement('style');
			newStyle.id = 'AddStyleBulkPhotosetQueue';
			document.head.appendChild(newStyle);
			return newStyle;
		})();
	const { sheet } = style;
	rules.forEach((rule) => {
		sheet.insertRule(rule, (sheet.rules || sheet.cssRules || []).length);
	});
}

// eslint-disable-next-line import/prefer-default-export


;// CONCATENATED MODULE: ./src/BulkPhotosetQueuePanelManager.js

class BulkPhotosetQueuePanelManager {
	constructor(onSubmitHandler) {
		this.onSubmitHandler = onSubmitHandler;
	}

	build() {
		this.buildPanel();
		this.buildHeading();
		this.buildDescription();
		this.buildInputs();
		this.buildDescription2();
		return this.uploadPanel;
	}

	buildPanel() {
		const uploadPanel = document.createElement('div');
		uploadPanel.setAttribute(
			'style',
			`
				width: 100%;
				background-color: #fff;
				color: #000;
				border-radius: 3px;
				margin-bottom: 20px;
				padding: 0;
				padding-bottom: 20px;
				display: none;
			`
		);
		this.uploadPanel = uploadPanel;
	}

	buildHeading() {
		const heading = document.createElement('h2');
		heading.setAttribute(
			'style',
			`
				font-weight: bold;
				padding: 20px;
			`
		);
		heading.innerText = 'Bulk Post Queue';
		this.uploadPanel.appendChild(heading);
	}

	buildDescription() {
		const description = document.createElement('p');
		description.innerText =
			'Enter the post ID of a post on your blog that you would like to requeue multiple times.';
		description.setAttribute(
			'style',
			`
				padding: 0 20px 20px;
				margin: 0;
			`
		);
		this.uploadPanel.appendChild(description);
	}

	buildInputs() {
		const form = document.createElement('form');
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			const postIdInput = document.getElementsByName('bulkQueuePostId')[0];
			const queueCountInput = document.getElementsByName('bulkQueueCount')[0];
			this.onSubmitHandler(postIdInput.value, queueCountInput.value);
		});

		// Post ID input
		const input1Wrapper = document.createElement('p');
		const postIdLabel = document.createElement('label');
		postIdLabel.setAttribute('for', 'bulkQueuePostId');
		postIdLabel.innerText = 'Post ID: ';
		const postIdInput = document.createElement('input');
		postIdInput.setAttribute('type', 'text');
		postIdInput.setAttribute('name', 'bulkQueuePostId');
		postIdInput.setAttribute('placeholder', 'Post ID');
		input1Wrapper.appendChild(postIdLabel);
		input1Wrapper.appendChild(postIdInput);
		input1Wrapper.setAttribute(
			'style',
			`
				padding: 0 20px 20px;
				margin: 0;
			`
		);
		form.appendChild(input1Wrapper);

		// Queue Count input
		const input2Wrapper = document.createElement('p');
		const queueCountLabel = document.createElement('label');
		queueCountLabel.setAttribute('for', 'bulkQueueCount');
		queueCountLabel.innerText = 'Number of times to queue: ';
		const queueCountInput = document.createElement('select');
		queueCountInput.setAttribute('name', 'bulkQueueCount');
		for (let i = 0; i < 20; i++) {
			const option = document.createElement('option');
			option.value = i + 1;
			option.text = i + 1;
			queueCountInput.appendChild(option);
		}
		input2Wrapper.appendChild(queueCountLabel);
		input2Wrapper.appendChild(queueCountInput);
		input2Wrapper.setAttribute(
			'style',
			`
				padding: 0 20px 20px;
				margin: 0;
			`
		);
		form.appendChild(input2Wrapper);

		const submitWrapper = document.createElement('div');
		submitWrapper.classList.add('bpqt-submit-wrapper');
		const submitButton = document.createElement('button');
		submitButton.setAttribute('type', 'submit');
		submitButton.innerText = 'Submit';
		submitButton.setAttribute(
			'style',
			`
				margin: 0 20px 20px;
				background: #001935;
				color: #fff;
				padding: 10px;
				border-radius: 4px;
			`
		);
		submitWrapper.appendChild(submitButton);
		addStyle([
			`.bpqt_loader {
				width: 24px;
				height: 24px;
				border: 5px solid #001935;
				border-bottom-color: transparent;
				border-radius: 50%;
				display: inline-block;
				box-sizing: border-box;
				animation: rotation 1s linear infinite;
				vertical-align: middle;
				}`,
			`.bpqt_loader.hidden {
					display: none;
				}`,
			`@keyframes rotation {
				0% {
					transform: rotate(0deg);
				}
				100% {
					transform: rotate(360deg);
				}
				}`
		]);
		const loadingIcon = document.createElement('span');
		loadingIcon.classList.add('bpqt_loader');
		loadingIcon.classList.add('hidden');
		this.loadingIcon = loadingIcon;
		submitWrapper.appendChild(loadingIcon);
		form.appendChild(submitWrapper);
		this.uploadPanel.appendChild(form);
	}

	buildDescription2() {
		const description2 = document.createElement('p');
		description2.innerHTML =
			'The Post ID must reference a post from your blog. The post ID is the part of the URL after ".tumblr.com/post/". For instance, if the post is at the URL <strong>http://myawesomeblog.tumblr.com/post/12345</strong>, you would enter <strong>12345</strong> in the Post ID field.';
		description2.setAttribute(
			'style',
			`
				background: #ccc;
				font-style: italic;
				margin: 0 20px;
				padding: 20px;
			`
		);
		this.uploadPanel.appendChild(description2);
	}

	toggle() {
		if (this.uploadPanel.style.display === 'none') {
			this.uploadPanel.style.display = 'block';
		} else {
			this.uploadPanel.style.display = 'none';
		}
	}

	showLoader() {
		this.loadingIcon.classList.remove('hidden');
	}

	hideLoader() {
		this.loadingIcon.classList.add('hidden');
	}

	showCompletionMessage(successCount, errorCount) {
		const submitWrapper = document.getElementsByClassName('bpqt-submit-wrapper')[0];
		const message = document.createElement('p');
		message.classList.add('bpqt-completion-message');
		message.innerHTML = `Complete! <strong>${successCount}</strong> queued successfully and <strong>${errorCount}</strong> failed.`;
		message.setAttribute(
			'style',
			`
				padding: 0 20px 20px;
				margin: 0;
			`
		);
		submitWrapper.after(message);
	}

	hideCompletionMessage() {
		const elements = document.getElementsByClassName('bpqt-completion-message');
		while (elements.length > 0) {
			elements[0].parentNode.removeChild(elements[0]);
		}
	}
}

/* harmony default export */ const src_BulkPhotosetQueuePanelManager = (BulkPhotosetQueuePanelManager);

;// CONCATENATED MODULE: ./src/BulkPhotosetQueueTools.js


let cssMap = {};
let blogShortname = null;
let bulkButton = null;
let panelManager = null;

const fetchBlogId = async () => {
	const buttonBar = document.querySelector(cssMap.bar.map((c) => `.${c}`).join(', '));
	const avatar = buttonBar.querySelector(cssMap.avatar.map((c) => `.${c} a`).join(', '));
	blogShortname = avatar.getAttribute('title');
};

const queuePost = async (parentPost) => {
	try {
		const response = await window.tumblr.apiFetch(`/v2/blog/${blogShortname}.tumblr.com/posts`, {
			method: 'POST',
			body: {
				state: 'queue',
				content: parentPost.content,
				layout: parentPost.layout,
				tags: parentPost.tags.join(',')
			}
		});
		return response;
	} catch (e) {
		return null;
	}
};

const getParentPost = async (postId) => {
	try {
		const response = await window.tumblr.apiFetch(`/v2/blog/${blogShortname}.tumblr.com/posts?id=${postId}`);
		if (!response?.response?.posts || response.response.posts.length !== 1) {
			alert(
				'You have entered an invalid post ID. Please try again and ensure you are using only the numeric post ID of the post you wish to re-queue.'
			);
		}
		return response.response.posts[0];
	} catch (e) {
		alert(
			'There was an error fetching information about your post. Please try again later or verify that you are using the correct numeric post ID of a post on your blog.'
		);
		return null;
	}
};

const onFormSubmit = async (postId, queueCount) => {
	panelManager.hideCompletionMessage();
	const parentPost = await getParentPost(postId);
	if (!parentPost) {
		return;
	}
	panelManager.showLoader();
	let errorCount = 0;
	let successCount = 0;
	for (let i = 0; i < queueCount; i++) {
		const result = await queuePost(parentPost);
		if (result === null) {
			errorCount++;
		} else {
			successCount++;
		}
	}
	panelManager.hideLoader();
	panelManager.showCompletionMessage(successCount, errorCount);
};

const initMenuButton = () => {
	const postTypeButtonClasses = cssMap.postTypeButton;
	const buttonIconClasses = cssMap.icon;
	const liElement = document.createElement('li');
	const buttonElement = document.createElement('button');
	postTypeButtonClasses.forEach((c) => {
		buttonElement.classList.add(c);
	});
	const iconSpan = document.createElement('span');
	buttonIconClasses.forEach((c) => {
		iconSpan.classList.add(c);
	});
	iconSpan.innerHTML =
		'<svg width="40" height="35" viewBox="0 0 15 15" fill="yellow" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 3.5L14.8536 3.85355C15.0488 3.65829 15.0488 3.34171 14.8536 3.14645L14.5 3.5ZM0.5 11.5L0.146447 11.1464C-0.0488153 11.3417 -0.0488153 11.6583 0.146447 11.8536L0.5 11.5ZM11.1464 0.853553L14.1464 3.85355L14.8536 3.14645L11.8536 0.146447L11.1464 0.853553ZM14.1464 3.14645L11.1464 6.14645L11.8536 6.85355L14.8536 3.85355L14.1464 3.14645ZM3.85355 14.1464L0.853554 11.1464L0.146447 11.8536L3.14644 14.8536L3.85355 14.1464ZM0.853554 11.8536L3.85355 8.85355L3.14645 8.14645L0.146447 11.1464L0.853554 11.8536ZM0.5 12H11.5V11H0.5V12ZM15 8.5V7H14V8.5H15ZM11.5 12C13.433 12 15 10.433 15 8.5H14C14 9.88071 12.8807 11 11.5 11V12ZM14.5 3H3.5V4H14.5V3ZM0 6.5V8H1V6.5H0ZM3.5 3C1.567 3 0 4.567 0 6.5H1C1 5.11929 2.11929 4 3.5 4V3Z" fill="black"/></svg>';
	const textSpan = document.createElement('span');
	textSpan.innerText = 'Bulk';
	buttonElement.appendChild(iconSpan);
	buttonElement.appendChild(textSpan);
	liElement.appendChild(buttonElement);
	const buttonBarUl = document.querySelector(cssMap.bar.map((c) => `.${c} > ul`).join(', '));
	buttonBarUl.appendChild(liElement);
	bulkButton = liElement;
};

const initUploadPanel = () => {
	const uploadPanel = panelManager.build();
	const buttonBar = document.querySelector(cssMap.bar.map((c) => `.${c}`).join(', '));
	buttonBar.after(uploadPanel);
	bulkButton.addEventListener('click', () => {
		panelManager.toggle();
	});
};

const init = async () => {
	cssMap = await window.tumblr.getCssMap();
	panelManager = new src_BulkPhotosetQueuePanelManager(onFormSubmit);
	await fetchBlogId();
	initMenuButton();
	initUploadPanel();
};
/* harmony default export */ const BulkPhotosetQueueTools = ({ init });

;// CONCATENATED MODULE: ./src/index.js


window.addEventListener('load', async () => {
	console.log('test');
	await BulkPhotosetQueueTools.init();
});

/******/ })()
;