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
		for (let i = 0; i < 10; i++) {
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

		// Add form to panel
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
		form.appendChild(submitButton);
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
}

export default BulkPhotosetQueuePanelManager;
