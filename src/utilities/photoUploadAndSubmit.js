import getResponseText from './getResponseText';
import svgForType from './svgForType';

const photoUploadAndSubmit = (unreadFile, username) => {
	// and repeat asynchronously
	const data = document.getElementById('mass_post_features-plugin_data');
	const asDraftCheck = document.getElementById('photos_as_draft');
	const papb = document.getElementById('post_all_photos_button');
	if (!data.classList.contains('photo-upload-in-progress')) {
		data.classList.add('photo-upload-in-progress');
		asDraftCheck.disabled = true;
		papb.disabled = true;
	}
	const asDraft = asDraftCheck.checked;
	const apiKey = data.getAttribute('data-x-tumblr-form-key');
	const brk = document.getElementsByClassName('photo-brick');
	const brick = brk[brk.length - 1];
	brick.classList.add('upload-working');
	brick.scrollIntoView({ behavior: 'smooth' });
	let i;
	const rich = brick.getElementsByClassName('rich')[0];
	const img = brick.getElementsByClassName('photo-brick-img');
	const uploaded = brick.getElementsByClassName('uploaded');
	const squeakyToy = {};
	let code;
	let formData;
	let api;
	// upload first or return or repeat
	console.log({ uploaded, img });
	if (uploaded.length !== img.length) {
		code = img[uploaded.length].firstChild.getAttribute('img-code');
		formData = new FormData();
		formData.append('photo', unreadFile[code]);
		getResponseText(
			{
				url: '/svc/post/upload_photo?source=post_type_form',
				post: formData
			},
			(re) => {
				api = JSON.parse(re);
				if (
					typeof api !== 'undefined' &&
					typeof api.response !== 'undefined' &&
					typeof api.response[0] !== 'undefined' &&
					typeof api.response[0].url !== 'undefined'
				) {
					img[uploaded.length].firstChild.src = api.response[0].url;
				} // whether we get the URL or not, the show must go on
				img[uploaded.length].classList.add('uploaded');
				photoUploadAndSubmit();
				// the fallback is to post a straight data url and let
				// Tumblr backend convert it to image/png etc on post
				// but that shouldn't have to happen
			},
			[
				['X-tumblr-form-key', apiKey],
				['X-Requested-With', 'XMLHttpRequest']
			]
		);
		return;
	}
	// AFTER THE UPLOAD, SUMMER HAS GONE...
	brick.style.top = `${0 - brick.clientHeight}px`;
	// this v runs after that ^ runs for each photo to upload
	squeakyToy['post[two]'] = rich.innerHTML;
	squeakyToy['post[three]'] = '';
	// this post is an edit
	squeakyToy.channel_id = username;
	squeakyToy['post[type]'] = 'photo';
	squeakyToy['post[state]'] = asDraft ? '1' : '0';
	squeakyToy['post[slug]'] = '';
	squeakyToy['post[date]'] = '';
	squeakyToy['post[publish_on]'] = '';
	if (img.length > 0) {
		const order = [];
		let oneone = '';
		let one = 0;
		for (i = 0; i < img.length; i++) {
			order.push(`o${i + 1}`);
			if (img[i].classList.contains('row-with-one-img')) {
				oneone += '1'; // new photoset order
				one = 0;
			}
			if (img[i].classList.contains('row-with-two-img')) {
				if (one === 0) {
					oneone += '2'; // new photoset order
				}
				++one;
				if (one >= 2) {
					one = 0;
				}
			}
			if (img[i].classList.contains('row-with-three-img')) {
				if (one === 0) {
					oneone += '3'; // new photoset order
				}
				++one;
				if (one >= 3) {
					one = 0;
				}
			}
			squeakyToy[`images[o${i + 1}]`] = img[i].firstChild.src;
			squeakyToy[`caption[o${i + 1}]`] = '';
		}
		squeakyToy['post[photoset_order]'] = order.join(',');
		squeakyToy['post[photoset_layout]'] = oneone;
	}
	squeakyToy['post[tags]'] = '';
	const tag = brick.getElementsByClassName('tag');
	const tags = [];
	if (tag.length > 0) {
		for (i = 0; i < tag.length; i++) {
			tags.push(tag[i].innerHTML);
		}
		squeakyToy['post[tags]'] = tags.join(',');
	}
	getResponseText(
		// this is step #2
		'/svc/secure_form_key',
		(re2) => {
			getResponseText(
				{
					// this is step #3
					url: '/svc/post/update',
					post: JSON.stringify(squeakyToy)
				},
				(re3) => {
					if (!JSON.parse(re3).errors) {
						// success image posted!
						if (brk.length > 0) {
							brick.parentNode.removeChild(brick);
						}
						if (brk.length > 0) {
							photoUploadAndSubmit();
						} else {
							const blogLink = document.createElement('a');
							const bigHome = svgForType.home.cloneNode(true);
							bigHome.setAttribute('width', '40');
							bigHome.setAttribute('height', '40');
							bigHome.setAttribute('fill', '#555');
							blogLink.appendChild(bigHome);
							blogLink.appendChild(document.createTextNode('Visit your new posts...'));
							blogLink.id = 'return_to_dash_link';
							blogLink.href = `/blog/${username}${asDraft ? '/drafts' : ''}`;
							data.classList.remove('photo-upload-in-progress');
							asDraftCheck.disabled = false;
							papb.disabled = false;
							document.body.appendChild(blogLink);
						}
					}
				},
				[
					// the prev request brought us some puppies :)
					['X-tumblr-puppies', re2.puppies],
					['X-tumblr-form-key', apiKey],
					['X-Requested-With', 'XMLHttpRequest'],
					['Content-Type', 'application/json'],
					['Accept', 'application/json, text/javascript, */*; q=0.01']
				]
			);
		},
		[
			['Accept', 'application/json, text/javascript, */*; q=0.01'],
			['X-tumblr-form-key', apiKey],
			['X-Requested-With', 'XMLHttpRequest']
		]
	);
};
export default photoUploadAndSubmit;
