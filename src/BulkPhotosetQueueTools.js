import BulkPhotosetQueuePanelManager from './BulkPhotosetQueuePanelManager';

class BulkPhotosetQueueTools {
	constructor() {
		this.cssMap = {};
		this.blogShortname = null;
		this.blogUuid = null;
		this.bulkButton = null;
		this.panelManager = null;
	}

	async init() {
		this.cssMap = await window.tumblr.getCssMap();
		this.panelManager = new BulkPhotosetQueuePanelManager(this.onFormSubmit);
		await this.fetchBlogId();
		this.initMenuButton();
		this.initUploadPanel();
	}

	async fetchBlogId() {
		const buttonBar = document.querySelector(this.cssMap.bar.map((c) => `.${c}`).join(', '));
		const avatar = buttonBar.querySelector(this.cssMap.avatar.map((c) => `.${c} a`).join(', '));
		this.blogShortname = avatar.getAttribute('title');
		const blogInfoResponse = await window.tumblr.apiFetch(`/v2/blog/${this.blogShortname}.tumblr.com/info`, {
			method: 'GET'
		});
		this.blogUuid = blogInfoResponse.response.blog.uuid;
	}

	async queuePost(postId, reblogKey) {
		const response = await window.tumblr.apiFetch(`/v2/blog/${this.blogShortname}.tumblr.com/posts`, {
			method: 'POST',
			body: {
				state: 'queue',
				parent_tumblelog_uuid: this.blogUuid,
				parent_post_id: postId,
				reblog_key: reblogKey
			}
		});
	}

	async getReblogKey(postId) {
		const response = await window.tumblr.apiFetch(`/v2/blog/${this.blogShortname}.tumblr.com/posts?id=${postId}`);
		console.log(response);
		return response.response.posts[0].reblogKey;
	}

	async onFormSubmit(postId, queueCount) {
		console.log(this);
		const parsedUserInput = this.parseUserInput(postId, queueCount);
		if (!parsedUserInput) {
			return;
		}
		const reblogKey = await this.getReblogKey(postId);
	}

	parseUserInput(postId, queueCount) {
		let parsedPostId;
		let parsedQueueCount;
		try {
			parsedPostId = parseInt(postId, 10);
			parsedQueueCount = parseInt(queueCount, 10);
		} catch (e) {
			alert('Error - you must enter a valid post ID and queue count. (Both should be numeric.)');
			return null;
		}
		return {
			parsedPostId,
			parsedQueueCount
		};
	}

	initMenuButton() {
		const postTypeButtonClasses = this.cssMap.postTypeButton;
		const buttonIconClasses = this.cssMap.icon;
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
		const buttonBarUl = document.querySelector(this.cssMap.bar.map((c) => `.${c} > ul`).join(', '));
		buttonBarUl.appendChild(liElement);
		this.bulkButton = liElement;
	}

	initUploadPanel() {
		const uploadPanel = this.panelManager.build();
		const buttonBar = document.querySelector(this.cssMap.bar.map((c) => `.${c}`).join(', '));
		buttonBar.after(uploadPanel);
		this.bulkButton.addEventListener('click', () => {
			this.panelManager.toggle();
		});
	}
}
export default BulkPhotosetQueueTools;
