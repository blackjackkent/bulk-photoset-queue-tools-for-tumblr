import BulkPhotosetQueuePanelManager from './BulkPhotosetQueuePanelManager';

let cssMap = {};
let blogShortname = null;
let blogUuid = null;
let bulkButton = null;
let panelManager = null;

const fetchBlogId = async () => {
	const buttonBar = document.querySelector(cssMap.bar.map((c) => `.${c}`).join(', '));
	const avatar = buttonBar.querySelector(cssMap.avatar.map((c) => `.${c} a`).join(', '));
	blogShortname = avatar.getAttribute('title');
	const blogInfoResponse = await window.tumblr.apiFetch(`/v2/blog/${blogShortname}.tumblr.com/info`, {
		method: 'GET'
	});
	blogUuid = blogInfoResponse.response.blog.uuid;
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
	panelManager = new BulkPhotosetQueuePanelManager(onFormSubmit);
	await fetchBlogId();
	initMenuButton();
	initUploadPanel();
};
export default { init };
