const getResponseText = (url, read, header) => {
	let post;
	if (typeof url === 'object') {
		post = url.post;
		url = url.url;
		// this ^ twist, maybe not elegant?
	}
	let get = 'GET';
	if (
		// special URLs, make POST
		url === '/svc/secure_form_key' ||
		url.split(/\?/)[0] === '/svc/post/update' ||
		url.split(/\?/)[0] === '/svc/post/upload_photo' ||
		url.split(/\?/)[0] === '/svc/post/upload_text_image' ||
		(url.split('/')[1] === 'customize_api' && typeof post !== 'undefined')
	) {
		get = 'POST';
	}
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function onReadyStateChange() {
		if (this.readyState === 4 && this.status === 200 && typeof this.responseText !== 'undefined') {
			read(
				url === '/svc/secure_form_key'
					? {
							// we need the puppies, to make a new post
							puppies: this.getResponseHeader('x-tumblr-secure-form-key'),
							kittens: /* this.getAllResponseHeaders() */ 0
					  } // Idk what kittens is, but it happens after success
					: this.responseText
			);
		}
		if (this.readyState === 4 && this.status !== 200) {
			if (typeof responseText !== 'undefined') {
				read('{"response":{"is_friend":false}}');
			} else {
				read(400);
			}
		}
	};
	xhttp.open(get, url, true);
	xhttp.onerror = () => {
		read(400);
	};
	// headers only after open and only before send
	if (typeof header !== 'undefined') {
		for (let i = 0; i < header.length; i++) {
			xhttp.setRequestHeader(header[i][0], header[i][1]);
		}
	}
	if (get === 'GET') {
		xhttp.send();
	} else {
		xhttp.send(post);
	}
};
export default getResponseText;
