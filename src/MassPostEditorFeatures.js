/* eslint-disable no-continue */
import svgForType from './utilities/svgForType';
import appendRichButtons from './utilities/appendRichButtons';
import getShortCodeForString from './utilities/getShortCodeForString';
import rebuildPhotoColumn from './utilities/rebuildPhotoColumn';
import butt from './utilities/butt';
import photoUploadAndSubmit from './utilities/photoUploadAndSubmit';

class MassPostEditorFeatures {
	constructor() {
		this.href = document.location.href.split(/[/?&#=]+/g);
		[, , , , this.username] = this.href;
		this.editorNavigation = document.getElementsByClassName('editor_navigation');
		this.reading = [];
		this.initLContent();
		this.initPluginData();
		this.addBatchPhotosPageLink();
		this.initBatchPhotosPage();
	}

	initLContent() {
		if (typeof l === 'undefined') {
			const lcontentDiv = document.createElement('div');
			lcontentDiv.classList.add('l-content');
			lcontentDiv.classList.add('albino');
			document.body.appendChild(lcontentDiv);
		}
		[this.lcontent] = document.getElementsByClassName('l-content');
	}

	initPluginData() {
		const pluginData = document.createElement('div');
		pluginData.id = 'mass_post_features-plugin_data';
		pluginData.classList.add('blog-menu-preload');
		pluginData.classList.add('month-menu-preload');
		pluginData.setAttribute('widget_sort-by', 'date-down');
		pluginData.setAttribute('data-last-post-index', '0');
		pluginData.setAttribute('data-select-all_needle', '0');
		pluginData.setAttribute('data-select-by_needle', '0');
		pluginData.setAttribute('data-last_month_timestamp', '0');
		pluginData.setAttribute('data-last_year_timestamp', '0');
		pluginData.setAttribute('widget_scroll-top', '0');
		pluginData.setAttribute('widget_first-focus', 'hide-ltgt-than-tags');
		pluginData.setAttribute('select-by-note_lt', '10');
		pluginData.setAttribute('select-by-note_gt', '5');
		pluginData.setAttribute('hide-ltgt-than-tags', '5');
		pluginData.setAttribute('data-to-seconds', '0');
		pluginData.setAttribute('data-unstable-next-href', '0');
		pluginData.setAttribute('data-lt-to-select', '[]');
		pluginData.setAttribute('data-gt-to-select', '[]');
		pluginData.setAttribute('data-all-to-select', '{"istag":[],"nottag":[],"istype":[],"nottype":[]}'); // this ^ has the 4 dimensions of the select-by widget
		pluginData.setAttribute('data-to-select', '[]');
		pluginData.setAttribute('data-tags_all_arr', '[]');
		pluginData.setAttribute('data-ids_all_arr', '[]');
		pluginData.setAttribute('data-visible_ids_all_arr', '[]');
		pluginData.setAttribute('data-types_all_arr', '[]');
		pluginData.setAttribute('data-follow-blogs-all', '[]');
		pluginData.setAttribute('data-new-blogs-all', '[]');
		pluginData.setAttribute('data-missing-blogs-all', '[]');
		pluginData.setAttribute('data-follow-blogs-all-updated', '0');
		pluginData.setAttribute('data-new-blogs-all-updated', '0');
		pluginData.setAttribute('data-missing-blogs-all-updated', '0');
		pluginData.setAttribute('data-id_to_tags', '{}');
		pluginData.setAttribute('data-id_to_types', '{}');
		pluginData.setAttribute('data-id_to_image', '{}');
		pluginData.setAttribute('data-id_to_origin', '{}');
		pluginData.setAttribute('data-id_to_state', '{}');
		pluginData.setAttribute('data-id_to_timestamp', '{}');
		pluginData.setAttribute('data-id_to_notes', '{}');
		pluginData.setAttribute('data-tag_to_ids', '{}');
		pluginData.setAttribute('data-type_to_ids', '{}');
		pluginData.setAttribute('data-csrf-token', '0');
		pluginData.setAttribute('data-reblog-to-here', this.username);
		pluginData.setAttribute('data-primary-blog', this.username); // correct guess later
		pluginData.setAttribute('data-tumblelogs', '[]'); // all blogss
		pluginData.setAttribute('data-primary-known', 'false');
		pluginData.setAttribute('data-followers-loading', 'false');
		pluginData.setAttribute('data-x-tumblr-form-key', '0');
		pluginData.setAttribute('data-column_gutter', '6');
		pluginData.setAttribute('data-current_edit_index', '-1');
		pluginData.setAttribute('data-single_edit_id', '0');
		pluginData.setAttribute('data-current_edit_action', 'reblog');
		pluginData.setAttribute('data-photos_height', '150');
		const pluginDataShell = document.createElement('div');
		pluginDataShell.appendChild(pluginData);
		document.body.insertBefore(pluginDataShell, document.body.firstChild);
		this.pluginData = document.getElementById('mass_post_features-plugin_data');
	}

	initPluginStyles() {
		const pluginStyle = document.createElement('style');
		pluginStyle.id = 'mass_post_features-plugin_style';
		pluginStyle.type = 'text/css';
		let css = `

h2 {
  display: block;
  font-weight: 600;
}

a {
  text-decoration: underline;
}

b, strong {
  font-weight: 700;
}

h2 b, h2 strong {
  font-weight: 900;
}

em, i {
  font-style: italic;
}

ol, ul {
  list-style: none;
}

blockquote, q {
  quotes: none;
}

blockquote {
  border-left: 3px solid #000;
  padding-left: 4px;
}

blockquote:after,
blockquote:before,
q:after,
q:before {
  content: none;
}

ol, ul {
  margin-bottom: .75em;
  padding-left: 2.8em;
}

ol ol,
ol ul,
ul ol,
ul ul {
  margin: 0;
  padding-left: 1.1em;
}

ul li {
  list-style-type: disc;
}

ul li li {
  list-style-type: circle;
}

ol li {
  list-style-type: decimal;
  font-feature-settings: "tnum";
}

blockquote, p,
pre {
  margin-bottom: .75em;
}

p.npf_quirky {
  font-family: Fairwater, serif;
  font-size: 24px;
  line-height: 1.3em;
}

p.npf_chat {
  font-family: Source Code Pro, monospace;
}

p.npf_color_joey,
span.npf_color_joey {
  color: #ff492f;
}

p.npf_color_monica,
span.npf_color_monica {
  color: #ff8a00;
}

p.npf_color_phoebe,
span.npf_color_phoebe {
  color: #e8d73a;
}

p.npf_color_ross,
span.npf_color_ross {
  color: #00cf35;
}

p.npf_color_rachel,
span.npf_color_rachel {
  color: #00b8ff;
}

p.npf_color_chandler,
span.npf_color_chandler {
  color: #7c5cff;
}

p.npf_color_niles,
span.npf_color_niles {
  color: #ff62ce;
}

p.npf_color_frasier,
span.npf_color_frasier {
  color: #001935;
}

p.npf_color_mr_big,
span.npf_color_mr_big {
  color: #000c1a;
}

@font-face {
  font-family: Gibson;
  src: url(https://assets.tumblr.com/pop/fonts/gibson/gibson-light-0db5d248.woff) format("woff");
  font-weight: 100;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Gibson;
  src: url(https://assets.tumblr.com/pop/fonts/gibson/gibson-regular-d83b428c.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Gibson;
  src: url(https://assets.tumblr.com/pop/fonts/gibson/gibson-semibold-b0fc2672.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Gibson;
  src: url(https://assets.tumblr.com/pop/fonts/gibson/gibson-bold-c6132b6e.woff) format("woff");
  font-weight: 900;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Gibson;
  src: url(https://assets.tumblr.com/pop/fonts/gibson/gibson-light-italic-ed49facd.woff) format("woff");
  font-weight: 100;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Gibson;
  src: url(https://assets.tumblr.com/pop/fonts/gibson/gibson-italic-e1dcd616.woff) format("woff");
  font-weight: 400;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Gibson;
  src: url(https://assets.tumblr.com/pop/fonts/gibson/gibson-semibold-italic-ae8d9810.woff) format("woff");
  font-weight: 700;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Bold;
  src: url(https://assets.tumblr.com/pop/fonts/gibson/gibson-bold-italic-94b05ba2.woff) format("woff");
  font-weight: 900;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Franklin Gothic Medium;
  src: url(https://assets.tumblr.com/pop/fonts/franklingothic/franklingothic-medium-1beb5103.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-stretch: normal;
  font-display: swap
}

@font-face {
  font-family: Franklin Gothic Medium Condensed;
  src: url(https://assets.tumblr.com/pop/fonts/franklingothic/franklingothic-medium-compressed-58222bfb.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Franklin Gothic Compressed;
  src: url(https://assets.tumblr.com/pop/fonts/franklingothic/franklingothic-compressed-02ac5e26.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Walsheim;
  src: url(https://assets.tumblr.com/pop/fonts/walsheim/walsheim-medium-40fd0505.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Fairwater;
  src: url(https://assets.tumblr.com/pop/fonts/fairwater/fairwater-regular-b7ab7a58.woff2) format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Favorit;
  src: url(https://assets.tumblr.com/pop/fonts/favorit/favorit-85-8ff1c986.woff2) format("woff2");
  font-style: normal;
  font-weight: 400;
  font-display: swap
}

@font-face {
  font-family: Favorit;
  src: url(https://assets.tumblr.com/pop/fonts/favorit/favorit-85-italic-a883bce7.woff2) format("woff2");
  font-style: italic;
  font-weight: 400;
  font-display: swap
}

@font-face {
  font-family: Favorit;
  src: url(https://assets.tumblr.com/pop/fonts/favorit/favorit-medium-be005cc5.woff2) format("woff2");
  font-style: normal;
  font-weight: 700;
  font-display: swap
}

@font-face {
  font-family: Favorit;
  src: url(https://assets.tumblr.com/pop/fonts/favorit/favorit-medium-italic-4d1adc26.woff2) format("woff2");
  font-style: italic;
  font-weight: 700;
  font-display: swap
}

@font-face {
  font-family: "1785 GLC Baskerville";
  src: url(https://assets.tumblr.com/pop/fonts/1785glcbaskerville/1785glcbaskerville-regular-2c131a72.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: "1785 GLC Baskerville";
  src: url(https://assets.tumblr.com/pop/fonts/1785glcbaskerville/1785glcbaskerville-italic-1a724410.woff) format("woff");
  font-weight: 400;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Alternate Gothic;
  src: url(https://assets.tumblr.com/pop/fonts/alternategothic/alternategothic-regular-d11d1e96.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Arquitecta;
  src: url(https://assets.tumblr.com/pop/fonts/arquitecta/arquitecta-book-cee560b5.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Arquitecta;
  src: url(https://assets.tumblr.com/pop/fonts/arquitecta/arquitecta-bold-5ec6543e.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Avalon;
  src: url(https://assets.tumblr.com/pop/fonts/avalon/avalon-book-de1d38eb.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Avalon;
  src: url(https://assets.tumblr.com/pop/fonts/avalon/avalon-bold-26f8ad53.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Bodoni Recut FS;
  src: url(https://assets.tumblr.com/pop/fonts/bodonirecutfs/bodonirecutfs-regular-283bd6c9.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Bodoni Recut FS;
  src: url(https://assets.tumblr.com/pop/fonts/bodonirecutfs/bodonirecutfs-demi-1c2ff649.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Bodoni Recut FS;
  src: url(https://assets.tumblr.com/pop/fonts/bodonirecutfs/bodonirecutfs-italic-54315813.woff) format("woff");
  font-weight: 400;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Bodoni Recut FS;
  src: url(https://assets.tumblr.com/pop/fonts/bodonirecutfs/bodonirecutfs-demi-italic-b5e01932.woff) format("woff");
  font-weight: 700;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Bookmania;
  src: url(https://assets.tumblr.com/pop/fonts/bookmania/bookmania-regular-271d947c.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Bookmania;
  src: url(https://assets.tumblr.com/pop/fonts/bookmania/bookmania-bold-5e09e821.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Brutal Type;
  src: url(https://assets.tumblr.com/pop/fonts/brutaltype/brutaltype-regular-ef623c78.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Brutal Type;
  src: url(https://assets.tumblr.com/pop/fonts/brutaltype/brutaltype-bold-a5e007f4.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Calluna;
  src: url(https://assets.tumblr.com/pop/fonts/calluna/calluna-regular-60172bcd.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Calluna;
  src: url(https://assets.tumblr.com/pop/fonts/calluna/calluna-black-cfbfc0fb.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Calluna;
  src: url(https://assets.tumblr.com/pop/fonts/calluna/calluna-italic-405661eb.woff) format("woff");
  font-weight: 400;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Calluna;
  src: url(https://assets.tumblr.com/pop/fonts/calluna/calluna-bold-italic-760a50f4.woff) format("woff");
  font-weight: 700;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Calluna Sans;
  src: url(https://assets.tumblr.com/pop/fonts/callunasans/callunasans-regular-4c9b1de7.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Calluna Sans;
  src: url(https://assets.tumblr.com/pop/fonts/callunasans/callunasans-black-9c48542e.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Calluna Sans;
  src: url(https://assets.tumblr.com/pop/fonts/callunasans/callunasans-italic-83d2e0f0.woff) format("woff");
  font-weight: 400;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Calluna Sans;
  src: url(https://assets.tumblr.com/pop/fonts/callunasans/callunasans-black-italic-55e41442.woff) format("woff");
  font-weight: 700;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Capita;
  src: url(https://assets.tumblr.com/pop/fonts/capita/capita-regular-b20fa714.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Capita;
  src: url(https://assets.tumblr.com/pop/fonts/capita/capita-bold-16bd5c46.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Caslon FS;
  src: url(https://assets.tumblr.com/pop/fonts/caslonfs/caslonfs-book-b1f3d7b2.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Caslon FS;
  src: url(https://assets.tumblr.com/pop/fonts/caslonfs/caslonfs-bold-c9f15be5.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Clarendon Text Pro;
  src: url(https://assets.tumblr.com/pop/fonts/clarendontextpro/clarendontextpro-regular-8665c534.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Clarendon Text Pro;
  src: url(https://assets.tumblr.com/pop/fonts/clarendontextpro/clarendontextpro-bold-f0e91a3c.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Clarendon Text Pro;
  src: url(https://assets.tumblr.com/pop/fonts/clarendontextpro/clarendontextpro-italic-f50fadcc.woff) format("woff");
  font-weight: 400;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Clarendon Text Pro;
  src: url(https://assets.tumblr.com/pop/fonts/clarendontextpro/clarendontextpro-bold-italic-0b93f3fe.woff) format("woff");
  font-weight: 700;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Clearface FS;
  src: url(https://assets.tumblr.com/pop/fonts/clearface/clearface-regular-0877705c.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Clearface FS;
  src: url(https://assets.tumblr.com/pop/fonts/clearface/clearface-black-7307513a.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Clearface FS;
  src: url(https://assets.tumblr.com/pop/fonts/clearface/clearface-italic-12dd08d2.woff) format("woff");
  font-weight: 400;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Clearface FS;
  src: url(https://assets.tumblr.com/pop/fonts/clearface/clearface-black-italic-95e89c47.woff) format("woff");
  font-weight: 700;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Garamond Classic FS;
  src: url(https://assets.tumblr.com/pop/fonts/garamondclassicfs/garamondclassicfs-regular-37325adf.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Garamond Classic FS;
  src: url(https://assets.tumblr.com/pop/fonts/garamondclassicfs/garamondclassicfs-heavy-d6b7cb51.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Garamond Classic FS;
  src: url(https://assets.tumblr.com/pop/fonts/garamondclassicfs/garamondclassicfs-italic-a9e735d6.woff) format("woff");
  font-weight: 400;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Garamond Classic FS;
  src: url(https://assets.tumblr.com/pop/fonts/garamondclassicfs/garamondclassicfs-bold-italic-73da3cdb.woff) format("woff");
  font-weight: 700;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Grumpy Black\ 48;
  src: url(https://assets.tumblr.com/pop/fonts/grumpyblack48/grumpyblack48-60ad3944.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Grumpy Black\ 48;
  src: url(https://assets.tumblr.com/pop/fonts/grumpyblack48/grumpyblack48-60ad3944.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Lorimer No\ 2;
  src: url(https://assets.tumblr.com/pop/fonts/lorimerno2/lorimerno2-medium-5ed17651.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Lorimer No\ 2;
  src: url(https://assets.tumblr.com/pop/fonts/lorimerno2/lorimerno2-semibold-c615f79e.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Lorimer No\ 2;
  src: url(https://assets.tumblr.com/pop/fonts/lorimerno2/lorimerno2-medium-italic-a7cb2829.woff) format("woff");
  font-weight: 400;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Lorimer No\ 2;
  src: url(https://assets.tumblr.com/pop/fonts/lorimerno2/lorimerno2-semibold-italic-803dc0f4.woff) format("woff");
  font-weight: 700;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: News Gothic FS;
  src: url(https://assets.tumblr.com/pop/fonts/newsgothicfs/newsgothicfs-book-b71e5c48.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: News Gothic FS;
  src: url(https://assets.tumblr.com/pop/fonts/newsgothicfs/newsgothicfs-bold-dad27eb5.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: News Gothic FS;
  src: url(https://assets.tumblr.com/pop/fonts/newsgothicfs/newsgothicfs-book-oblique-0a0ccd73.woff) format("woff");
  font-weight: 400;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: News Gothic FS;
  src: url(https://assets.tumblr.com/pop/fonts/newsgothicfs/newsgothicfs-bold-oblique-4767b553.woff) format("woff");
  font-weight: 700;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Pratt Pro;
  src: url(https://assets.tumblr.com/pop/fonts/prattpro/prattpro-regular-27555c58.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Pratt Pro;
  src: url(https://assets.tumblr.com/pop/fonts/prattpro/prattpro-bold-f978900f.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Quadrat;
  src: url(https://assets.tumblr.com/pop/fonts/quadrat/quadrat-regular-eade9dc0.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Quadrat;
  src: url(https://assets.tumblr.com/pop/fonts/quadrat/quadrat-serial-f6e71145.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Sofia Pro;
  src: url(https://assets.tumblr.com/pop/fonts/sofiapro/sofiapro-regular-f2aae9ec.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Sofia Pro;
  src: url(https://assets.tumblr.com/pop/fonts/sofiapro/sofiapro-bold-cdb403a0.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Spade;
  src: url(https://assets.tumblr.com/pop/fonts/spade/spade-6085b923.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Spade;
  src: url(https://assets.tumblr.com/pop/fonts/spade/spade-6085b923.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Square Serif;
  src: url(https://assets.tumblr.com/pop/fonts/squareserif/squareserif-book-0a547297.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Square Serif;
  src: url(https://assets.tumblr.com/pop/fonts/squareserif/squareserif-demi-1bdcd0c8.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Square Serif;
  src: url(https://assets.tumblr.com/pop/fonts/squareserif/squareserif-book-italic-0ecc7c19.woff) format("woff");
  font-weight: 400;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Square Serif;
  src: url(https://assets.tumblr.com/pop/fonts/squareserif/squareserif-demi-italic-b4286785.woff) format("woff");
  font-weight: 700;
  font-style: italic;
  font-display: swap
}

@font-face {
  font-family: Streetscript;
  src: url(https://assets.tumblr.com/pop/fonts/streetscript/streetscript-e1665af6.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Streetscript;
  src: url(https://assets.tumblr.com/pop/fonts/streetscript/streetscript-e1665af6.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Typewriter FS;
  src: url(https://assets.tumblr.com/pop/fonts/typewriterfs/typewriterfs-regular-c0a07f03.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Typewriter FS;
  src: url(https://assets.tumblr.com/pop/fonts/typewriterfs/typewriterfs-bold-d4592705.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Ziclets;
  src: url(https://assets.tumblr.com/pop/fonts/ziclets/ziclets-b6989e95.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap
}

@font-face {
  font-family: Ziclets;
  src: url(https://assets.tumblr.com/pop/fonts/ziclets/ziclets-b6989e95.woff) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap
}

@keyframes happy-bounce {
  0% {
    opacity: 0;
    transform: rotate(40deg) translateY(0);
  }

  10% {
    transform: rotate(0deg) translateY(-50px);
    opacity: 1;
  }

  20% {
    transform: rotate(-40deg) translateY(0);
  }

  30% {
    transform: rotate(0deg) translateY(-40px);
  }

  40% {
    transform: rotate(40deg) translateY(0);
  }

  50% {
    transform: rotate(0deg) translateY(-30px);
  }

  60% {
    transform: rotate(-40deg) translateY(0);
  }

  70% {
    transform: rotate(0deg) translateY(-20px);
  }

  80% {
    transform: rotate(40deg) translateY(0);
  }

  90% {
    opacity: 1;
    transform: rotate(0deg) translateY(-10px);
  }

  100% {
    opacity: 0;
    transform: rotate(-40deg) translateY(0);
  }
}

@keyframes blinking {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes updown {
  100% {
    margin-top: 0;
  }

  50% {
    margin-top: -15px;
  }

  0% {
    margin-top: 0;
  }
}

@keyframes flip {
  100% {
    transform: rotateX(0);
    opacity: 1;
  }

  0% {
    transform: rotateX(-180deg);
    opacity: 0;
  }
}

.l-content {
  min-height: calc(100vh - 177px);
}

.l-content>* {
  opacity: 0;
  transition: all 0.4s ease-out;
}

.l-content>*.display-none {
  display: none;
}

#select-by-widget_title .preselect-count,
#select-by_widget .row,
.l-content>*.laid {
  opacity: 1;
  animation: flip 0.25s ease-in-out both;
}

#select-by-widget_title .preselect-count.noanim,
#select-by_widget .row:active {
  animation: none;
  opacity: 1;
}

#mass_post_features-plugin_data {
  display: none;
}

#mass_post_features-plugin_selection_box {
  position: absolute;
  background-color: rgba(50, 90, 250, 0.4);
  box-shadow: inset 0 0 0 1px rgba(50, 90, 250, 1);
  z-index: 100;
  cursor: pointer;
}

a.blog_title {
  cursor: pointer;
}

#delete_posts {
  background-color: #c00;
}

#unselect .chrome_button_right {
  display: inline-block;
}

.blue_bar .editor_navigation {
  text-align: center;
  float: none;
  display: block;
}

.blue_bar .editor_navigation .header_button {
  display: inline-block;
  vertical-align: top;
}

#status {
  margin: 0px 0px -3px 0px;
}

#pause_button .play,
#pause_button .pause {
  color: #fff;
  font-size: 10px;
  padding: 0 2px;
}

#pause_button.playing .play,
#pause_button.paused .pause,
#pause_button.done .play,
#pause_button.done .pause {
  color: rgba(255, 255, 255, 0.3);
}

.chrome h2 {
  display: inline-block;
  font-size: 25px;
  vertical-align: top;
  color: inherit;
  font-weight: bold;
}


.chrome_button h2 {
  vertical-align: sub;
  font-family: monospace;
  position: relative;
}

#add_tag_button,
#cancel_add_tag_button,
#cancel_remove_tag_button,
#remove_tag_button {
  margin-bottom: -30px;
}

#tag_editor,
#tags {
  font: normal 11px 'Lucida Grande', Verdana, sans-serif;
  width: 326px;
  position: absolute;
  left: 20px;
  top: 19px;
  text-align: left;
  height: 170px;
  overflow: auto;
  color: #555;
  background-color: rgba(255, 255, 255, 0.7);
}

#unselect.chrome,
#select-all_button.chrome,
#select-by_button.chrome,
#view-links_button.chrome,
#view-captions_button.chrome {
  background: #7D99FF none;
}

.blue_bar .editor_navigation .header_button button.chrome {
  padding: 0 4px 0 0;
  margin: 1px 0 0 2px;
}

#gutter_button input[type="number"] {
  width: 40px;
  height: 18px;
  padding: 0 3px;
  background-color: #ccc;
  border: 0 none;
  box-shadow: inset 0 2px 2px 0px #000;
  top: -2px;
  position: relative;
}

#cancel5_button,
#add_urls_button,
#post_all_photos_button,
#cancel2_button,
#cancel1_button,
#select_button,
#clear_button,
#hide_button,
#list_button {
  border: 0 none;
  padding: 0 5px;
}

#select_button {
  position: absolute;
  bottom: 13px;
  left: 10px;
  width: 68px;
}

#reblog_widget .robot-warning {
  width: 190px;
  margin: 10px 10px 11px 10px;
}

#cancel2_button {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

#cancel1_button {
  position: absolute;
  top: 10px;
  right: 10px;
}

#clear_button {
  position: absolute;
  bottom: 13px;
  right: 10px;
}

#hide_button {
  position: absolute;
  bottom: 7px;
  right: 6px;
  height: 24px;
}

#list_button {
  position: absolute;
  bottom: 13px;
  right: 307px;
  height: 24px;
}

#photos-drop-zone *,
#photos-drop-zone,
.blog_title,
#jump_to_month,
#mpe_title,
.post-state-nav-item,
.l-content>*,
button,
label {
  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

.l-content .brick.photo {
    min-height: 50px;
    vertical-align: ;
}

.l-content .heading {
  padding-top: 20px;
}

.l-content .brick .overprint {
  width: 120px;
  top: 0px;
  left: 5px;
}

.l-content .brick.video .play_overlay,
.l-content .brick.audio .listen_overlay {
  z-index: 9;
}

.l-content .brick {
  overflow: visible;
  background: linear-gradient(135deg,
      rgba(242, 242, 242, 1) 0%,
      rgba(209, 209, 209, 1) 44%,
      rgba(209, 209, 209, 1) 100%,
      rgba(226, 226, 226, 1) 100%);
}

.l-content .brick .overflow-hidden {
  position: absolute;
  height: 100%;
  overflow: hidden;
  width: 125px;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
}

.l-content .brick .monospace *,
.l-content .brick .monospace {
  font-family: "Courier", monospace;
}

.l-content .brick .ol {
  display: list-item;
  list-style: decimal inside;
}

.l-content .brick .ul {
  display: list-item;
  list-style: disc inside;
}

.l-content .brick .h1 {
  font-size: 115%;
  text-align: center;
}

.l-content .brick .quote {
  font-size: 125%;
  font-family: "Times", "Times New Roman", serif;
}

.l-content .brick .rq {
  font-size: 140px;
  font-weight: bold;
  font-family: "Times", "Times New Roman", "Times", serif;
  color: rgba(0, 0, 0, 0.15);
  position: absolute;
  top: 0px;
  right: 0;
  line-height: 110px;
}

.l-content .brick.link .rq {
  bottom: -20px;
}

.l-content .brick.note .ask-av {
  display: inline-block;
  vertical-align: middle;
  border-radius: 20px;
}

.l-content .brick.has-img .fade {
  width: 125px;
  height: 90px;
  position: absolute;
  left: 0;
  bottom: 0;
  background: linear-gradient(to bottom,
      rgba(206, 206, 206, 0) 0%,
      rgba(208, 208, 208, 0) 73%,
      rgba(209, 209, 209, 1) 100%);
}

.l-content .brick .asker {
  display: inline-block;
  vertical-align: middle;
}

.l-content .brick .answer {
  font-weight: normal;
  padding-top: 30px;
}

.l-content .brick .h2 {
  font-size: 105%;
}

.l-content .brick .link {
  text-decoration: underline;
}

.l-content .brick .quirky {
  font-family: Fairwater, serif;
  font-size: 112%;
}

.l-content .brick.highlighted .overlay {
  background: none;
  border: 0 none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  color: #fff;
  opacity: 1;
  filter: none;
  z-index: 999;
  display: block;
}

.l-content .brick.highlighted .overlay .inner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin-top: 0;
  height: 100%;
}

.l-content .brick.highlighted .overlay .inner .date {
  color: #fff;
  position: absolute;
  left: 0px;
  right: 0px;
  padding: 2px 6px 0px 2px;
  background-color: #73bae7;
  height: 13px;
  font-size: 10px;
  line-height: 11px;
}

.l-content .brick.highlighted .highlight .tag_count {
  display: block !important;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 115px;
}

.tag_count[style]:after {
    content: " tags";
}

.l-content .brick.highlighted .highlight .note_count {
  color: #fff;
  position: absolute;
  right: 0px;
  bottom: 0px;
  padding: 2px 6px 0px 2px;
  background-color: #73bae7;
  background-color: rgba(115,186,231,0.8);
  height: 11px;
  font-size: 10px;
  line-height: 11px;
  border-top-left-radius: 5px;
  display: block !important;
}

.l-content .brick.highlighted .overlay .inner .notes {
  margin-top: 5px;
  position: absolute;
  bottom: 0px;
  right: 0px;
  padding: 3px 6px 0px 5px;
  background-color: #73bae7;
  height: 13px;
  font-size: 10px;
  line-height: 10px;
  border-top-left-radius: 5px;
  display: block !important;
}

#widget-top-buttons .red {
  border: 1px rgba(255, 0, 0, 0.4) solid;
  background-color: rgba(255, 0, 0, 0.1);
  color: rgba(255, 0, 0, 0.6);
  position: absolute;
  right: 7px;
  top: 30px;
  font-size: 10px;
  padding: 1px 6px;
  font-weight: bold;
}

#widget-top-buttons .arrow,
.blue_bar .arrow {
  display: inline-block;
  position: relative;
  top: -1px;
  width: 0;
  height: 0;
  margin-left: 4px;
  border-top: 6px solid;
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
}
#widget-top-buttons .arrow {
  border-top-color: #555;
}
#widget-top-buttons .arrow.reverse {
  border-bottom: 6px solid;
  border-bottom-color: #99a3ae;
  border-top: 0;
}

.blue_bar .chrome {
  cursor: pointer;
}

.blue_bar .chrome label .arrow {
  border-top-color: #fff;
}

.blue_bar .small_text {
  width: 280px;
  position: relative;
  margin: 0;
  padding: 0;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
  left: 10px;
  text-align: center;
}

.blue_bar .title .blog_title {
  color: #99a3ae;
  text-decoration: none;
  top: -3px;
}

#blog_menu {
  display: none;
}

#blog_menu .avatar_img,
#blog_menu .avatar {
  display: inline-block;
  float: left;
  width: 36px;
  height: 36px;
  margin: 3px 0px 0px 3px;
  vertical-align: bottom;
}

#blog_menu .avatar_img {
  border: 1px solid #000;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.9);
}

#blog_menu .avatar {
  position: relative;
  top: 0;
  left: 0;
}

#blog_menu .avatar svg {
  display: none;
}

#blog_menu .avatar.reblog-to-here svg {
  display: block;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  box-shadow: 0 0 0 2px #7D99FF;
  border-radius: 2px;
  top: 4px;
  left: 4px;
  width: 26px;
  height: 26px;
  padding: 5px;
}

.blog_menu_child {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.13);
  padding: 2px 0px 4px 0px;
}

.subt {
  text-align: center;
  height: 40px;
  width: 300px;
  top: 5px;
  position: relative;
  margin: 0px 0px 0px 48px;
}

.subt a {
  padding: 2px;
  color: #7D99FF;
  margin: 2px;
}

.subt button,
.subt a {
  cursor: pointer;
}

.subt .blank-space,
.subt button,
.subt a {
  height: 24px;
  font-family: "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 10px;
  line-height: 14px;
  font-weight: bold;
  text-decoration: none;
}

.subt .blank-space,
.subt button {
  display: inline-block;
  min-height: 52px;
  position: relative;
  margin: 0;
}

.subt button {
  width: 82px;
  min-height: 52px;
  white-space: normal;
  top: -17px;
  padding: 3px 8px 3px 8px;
  border-color: #000;
  border-radius: 2px;
  background-color: #444;
  border-width: 1px;
  border-style: solid;
  color: #fff;
  position: relative;
  left: 5px;
}

.subt .blank-space {
  width: 60px;
  height: 30px;
  top: -19px;
  vertical-align: middle;
}

.subt a:active {
  text-decoration: underline;
}

.subt button:active {
  background-color: #969696;
  border-color: #8a8f96;
  border-color: rgba(0, 0, 0, 0.2);
  box-shadow: none
}

.open #blog_menu {
  display: block;
  position: fixed;
  text-align: center;
  left: 0;
  width: 400px;
  height: auto;
  max-height: calc(100vh - 50px);
  padding: 0;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #001935;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.13);
  z-index: 100;
  top: 0;
  padding-bottom: 10px;
}

a.open {
  cursor: normal;
}

#blog_menu::-webkit-scrollbar,
#widget_scrolling_part::-webkit-scrollbar {
  width: 8px;
  height: 10px;
}

#blog_menu::-webkit-scrollbar-thumb,
#widget_scrolling_part::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background: #c2c9d2;
}

.editor_navigation span input+.widget {
  display: none;
}

.editor_navigation span input:checked+.widget {
  display: block;
}

#urlstuff_widget {
  padding: 30px;
}

#urlstuff_widget .chrome {
  margin: 14px;
}

.row label.not.disabled {
  background-color: rgba(0, 0, 0, 0.1);
  opacity: 0.3;
}

.row label.not.ch {
  background-color: rgba(250, 170, 100, 0.2);
}

#snapshot-info_widget,
#backdate_widget,
#urlstuff_widget,
#add-caption_widget,
#reblog_widget,
#remove_tags_widget,
#add_tags_widget,
#select-by_widget {
  cursor: grab !important;
}

#select-by,
#backdate,
#snapshot-info,
#urlstuff,
#add-caption {
  opacity: 0;
  width: 0;
  height: 0;
}

#urlstuff_body,
#backdate-body,
#reblog_widget button,
#reblog_widget input,
#tags {
  cursor: auto;
}

.brick-dragging *,
.brick-dragging,
#snapshot-info_widget.widget-dragging *,
#snapshot-info_widget.widget-dragging,
#backdate_widget.widget-dragging *,
#backdate_widget.widget-dragging,
#urlstuff_widget.widget-dragging *,
#urlstuff_widget.widget-dragging,
#add-caption_widget.widget-dragging *,
#add-caption_widget.widget-dragging,
#reblog_widget.widget-dragging *,
#reblog_widget.widget-dragging,
#remove_tags_widget.widget-dragging *,
#remove_tags_widget.widget-dragging,
#add_tags_widget.widget-dragging *,
#add_tags_widget.widget-dragging,
#select-by_widget.widget-dragging *,
#select-by_widget.widget-dragging {
  cursor: grabbing !important;
}

#reblog_widget h2,
#reblog_widget div,
#reblog_widget span,
#remove_tags_widget div,
#add-caption_widget div,
#add-caption_widget h2,
#backdate_widget h2,
#backdate_widget span,
#backdate_widget div,
#snapshot-info_widget h2,
#snapshot-info_widget span,
#snapshot-info_widget div,
#urlstuff_widget h2,
#urlstuff_widget span,
#urlstuff_widget div,
#add-caption_widget span,
#select-by_widget span,
#select-by_widget div {
  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

#backdate-body {
  top: 20px;
  position: relative;
}

#select-by_widget .row span.ch {
  background-color: rgba(100, 170, 250, 0.2);
}

#select-by_widget .row label.is {
  position: absolute;
  left: 0;
  top: 0;
  right: 50px;
  height: 20px;
}

#select-by_widget .row svg {
  position: absolute;
  left: 78px;
  top: 0;
  width: 20px;
  height: 20px;
}

#select-by_widget .row label.is .row-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  width: 255px;
  font-size: 11px;
  line-height: 19px;
  left: 102px;
  top: 0;
  position: absolute;
  height: 20px;
}

#select-by_widget .row .is span {
  height: 20px;
  line-height: 25px;
  font-size: 10px;
  position: absolute;
  width: 40px;
  right: 0px;
  text-align: center;
  top: 0;
}

#select-by_widget .row .not {
  height: 20px;
  line-height: 25px;
  font-size: 10px;
  position: absolute;
  width: 44px;
  right: 0;
  top: 0;
  text-align: center;
}

#select-by_widget .row label {
  cursor: pointer;
}

#select-by_widget .row div.count {
  width: 72px;
  background-color: rgba(50, 50, 50, 0.1);
  height: 20px;
  text-align: right;
  text-overflow: unset;
  padding-right: 4px;
  position: absolute;
  overflow: hidden;
  left: 0;
  top: 0;
}

#select-by_widget .row {
  height: 20px;
  position: relative;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.6);
}

#select-by_widget .row,
#select-by_widget .tags_title {
  border-bottom: 1px solid #ccc;
}

#select-by_widget .tags_title {
  color: #555;
  height: 15px;
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  background-color: rgba(50, 50, 50, 0.1);
}

#select-by_widget {
  height: 480px;
}

.widget,
#remove_tags_widget,
#add_tags_widget,
#reblog_widget,
#backdate_widget,
#snapshot-info_widget,
#urlstuff_widget,
#add-caption_widget,
#select-by_widget {
  background: rgba(235, 235, 235, 0.9) none !important;
  box-shadow: inset 0 0 4px 5px #fff,
    inset 0 0 5px 2px #000,
    0 0 8px 1px #000;
  border-radius: 9px;
  position: fixed;
}

#select-by_widget {
  font: normal 12px 'Lucida Grande', Verdana, sans-serif;
  padding: 9px;
  width: 440px;
  text-align: left;
  z-index: 10;
}

#tag_editor * {
  font: normal 14px/1.4 "Helvetica Neue",
    "HelveticaNeue", Helvetica, Arial, sans-serif;
}

#tags,
#tag_editor,
#widget_scrolling_part {
  box-shadow: inset 0 0 0 1px #ccc,
    inset 0px 3px 6px 0px #ccc;
}

#tag_editor {
  background: none rgba(255, 255, 255, 0.7);
}

#widget_scrolling_part {
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 48px;
  left: 4px;
  right: 4px;
  bottom: 48px;
  cursor: default;
}

#widget-top-buttons,
#widget-top-buttons .sort {
  position: absolute;
}

#widget-top-buttons {
  top: 0;
  left: 0;
  right: 0;
}

#widget-top-buttons .sort {
  top: 30px;
  font-size: 12px;
  font-weight: bold;
  color: #555;
  cursor: pointer;
}

#widget-top-buttons .sort.num {
  left: 15px;
}

#widget-top-buttons .sort.abc {
  left: 90px;
}

#widget-top-buttons .sort.date {
  left: 185px;
}

.row .tag-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 5px;
  margin-left: 1px;
  opacity: 0.6;
}

.row.type.notes-more-than .number-input,
.row.type.notes-less-than .number-input {
  border: 1px solid #555;
  width: 90px;
  position: absolute;
  right: 88px;
  height: 18px;
  top: 0;
  border: 1px solid #555;
  box-shadow: inset 0 1px 2px 0px #ccc;
}

#urlstuff_widget input {
  width: 180px;
  height: 22px;
  border: 1px solid #999;
  padding: 2px;
  box-shadow: inset 0 1px 2px 0px #555;
}

#select-by-widget_title {
  font-size: 17px;
  font-weight: bold;
  color: #555;
}

#select-by-widget_title .preselect-count {
  color: rgba(0, 130, 0, 0.6);
  font-size: 12px;
  background-color: #fff;
  height: 21px;
  min-width: 60px;
  border-radius: 12px;
  box-shadow: inset 0 1px 2px 0px #555;
  margin-left: 12px;
  position: absolute;
  top: 8px;
  left: 160px;
  text-align: center;
  line-height: 21px;
  transform: translateX(-505%);
}

#uncheck+label {
  color: #999;
}

#show-only:checked+label+#uncheck+label+span,
#show-only+label {
  color: #999;
}

#show-only:checked+label,
#uncheck:checked+label {
  color: #555;
}

#show-only:checked+label+#uncheck+label,
#show-only:checked+label+#uncheck {
  visibility: hidden;
}

#show-only {
  margin-top: 5px;
  margin-right: 60px;
}

#show-only,
#show-only+label {
  float: right;
}

#select-by_widget .select-by_ltgt {
  position: absolute;
  bottom: 5px;
  right: 90px;
  border: 1px solid #888;
  width: 203px;
  height: 39px;
}

#gt_input,
#lt_input {
  position: absolute;
  left: 78px;
}

#lt_input,
#lt_input+label {
  top: 4px;
}

#gt_input,
#gt_input+label {
  top: 22px;
}

#gt_input+label,
#lt_input+label {
  left: 0px;
  width: 72px;
  position: absolute;
  color: #999;
  text-align: right;
  cursor: pointer;
}

#gt_input:checked+label,
#lt_input:checked+label {
  color: #555;
}

#lt_input+label+#gt_input+label+#hide-ltgt-than-tags {
  opacity: 0.5;
  width: 55px;
  position: absolute;
  top: 8px;
  left: 97px;
  border: 1px solid #555;
  box-shadow: inset 0 1px 2px 0px #ccc;
  height: 23px;
}

#lt_input+label+#gt_input:checked+label+#hide-ltgt-than-tags,
#lt_input:checked+label+#gt_input+label+#hide-ltgt-than-tags {
  opacity: 1;
}

.l-content .brick .title {
  margin: 0;
  padding: 0;
  background-color: rgba(255, 255, 255, 0.1);
  overflow: hidden;
  width: 110px;
}

.l-content .brick>* {
  max-width: 125px;
}

.l-content .brick.picked {
  overflow: visible;
  box-shadow: 0 0 12px 2px rgba(14, 19, 84, 0.5);
  z-index: 60;
}

.l-content .brick.highlighted {
  animation: updown 0.1s ease-in both;
}

.l-content .brick.highlighted.picked {
  overflow: visible;
  box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.5);
  z-index: 60;
}

.l-content .brick.prevent-anim,
.l-content .brick.highlighted.picked {
  animation: none;
}`;

		css +=
			'.l-content .brick.picked:before { content: ""; top: -35px;\n' +
			'width: 50px; height: 50px; position: absolute;left: 25px;\n' +
			'animation: updown 0.5s infinite ease-out both;\n' + // bounces up&down :)
			'background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iM' +
			'S4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM' +
			'6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0ia' +
			'HR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly9' +
			'3d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0ia' +
			'HR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9' +
			'yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY' +
			'2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR' +
			'0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgd2lkdGg9I' +
			'jI0IgogICBoZWlnaHQ9IjI0IgogICB2aWV3Qm94PSIwIDAgMjQgMjQiCiAgIHZlcnNpb24' +
			'9IjEuMSIKICAgaWQ9InN2ZzQiCiAgIHNvZGlwb2RpOmRvY25hbWU9ImI2NC5zdmciCiAgI' +
			'Glua3NjYXBlOnZlcnNpb249IjAuOS41ICgyMDYwZWMxZjlmLCAyMDIwLTA0LTA4KSI+CiA' +
			'gPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhMTAiPgogICAgPHJkZjpSREY+CiAgICAgI' +
			'DxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0Pml' +
			'tYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgI' +
			'HJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2U' +
			'iIC8+CiAgICAgICAgPGRjOnRpdGxlPjwvZGM6dGl0bGU+CiAgICAgIDwvY2M6V29yaz4KI' +
			'CAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxkZWZzCiAgICAgaWQ9ImRlZnM4IiA' +
			'vPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgI' +
			'CAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMSIKICAgICB' +
			'vYmplY3R0b2xlcmFuY2U9IjEwIgogICAgIGdyaWR0b2xlcmFuY2U9IjEwIgogICAgIGd1a' +
			'WRldG9sZXJhbmNlPSIxMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMCIKICAgICB' +
			'pbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iN' +
			'zMyIgogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjQ4MCIKICAgICBpZD0ibmFtZWR' +
			'2aWV3NiIKICAgICBzaG93Z3JpZD0iZmFsc2UiCiAgICAgaW5rc2NhcGU6em9vbT0iOS44I' +
			'gogICAgIGlua3NjYXBlOmN4PSIxMiIKICAgICBpbmtzY2FwZTpjeT0iMTIiCiAgICAgaW5' +
			'rc2NhcGU6d2luZG93LXg9IjAiCiAgICAgaW5rc2NhcGU6d2luZG93LXk9IjAiCiAgICAga' +
			'W5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMCIKICAgICBpbmtzY2FwZTpjdXJyZW50LWx' +
			'heWVyPSJzdmc0IiAvPgogIDxwYXRoCiAgICAgZD0ibSA1LjQsMTYuNCBjIDEuMSwwLjIgN' +
			'C42LDAuOSA1LjUsMS4wIHYgMy41IGMgMCwxLjYgMS4zLDIuOSAzLDIuOSAxLjYsMCAzLC0' +
			'xLjMgMywtMi45IHYgLTcuNCBjIDAuNSwwLjMgMS4xLDAuNiAxLjgsMC43IEMgMjAuNiwxN' +
			'C41IDIyLDEzLjMgMjIsMTEuOCAyMiwxMSAyMS42LDEwLjEgMjAuOSw5LjUgMTcuMCw1LjU' +
			'gMTUuMiw0LjQgMTQuOSwwIEggNSB2IDEuNyBjIDAsNS4xIC0zLDYuMCAtMywxMC4wIDAsM' +
			'i40IDEuMCw0LjEgMy40LDQuNiB6IgogICAgIGlkPSJwYXRoMTQiIC8+CiAgPHBhdGgKICA' +
			'gICBkPSJNIDUuMSw4LjQgQyA1LjksNi45IDYuOSw1LjEgNi45LDIgaCA2LjEgYyAwLjcsM' +
			'y44IDMuOCw2LjMgNi40LDguOSAwLjYsMC42IDAuMywxLjMgLTAuNCwxLjMgQyAxNy44LDE' +
			'yLjMgMTYuMCwxMC40IDE1LDkuMSBWIDIxLjAgQyAxNSwyMS41IDE0LjUsMjIgMTQsMjIgM' +
			'TMuNCwyMiAxMywyMS41IDEzLDIxLjAgdiAtNi45IGMgMCwtMC4zIC0wLjIsLTAuNSAtMC4' +
			'1LC0wLjUgLTAuMywwIC0wLjUsMC4yIC0wLjUsMC41IHYgMC41IGMgMCwwLjUgLTAuNCwwL' +
			'jkgLTEuMCwwLjggLTAuMywtMC4wIC0wLjYsLTAuNCAtMC42LC0wLjggdiAtMS4yIGMgMCw' +
			'tMC4zIC0wLjIsLTAuNSAtMC41LC0wLjUgLTAuMywwIC0wLjUsMC4yIC0wLjUsMC41IHYgM' +
			'C44IGMgMCwwLjUgLTAuNCwwLjkgLTEuMCwwLjggQyA3LjYsMTQuOSA3LjMsMTQuNiA3LjM' +
			'sMTQuMiB2IC0xLjUgYyAwLC0wLjMgLTAuMiwtMC41IC0wLjUsLTAuNSAtMC4zLDAgLTAuN' +
			'SwwLjIgLTAuNSwwLjUgdiAwLjkgYyAwLDAuNSAtMC41LDAuOCAtMS4wLDAuNiBDIDQuNSw' +
			'xMy45IDQsMTMuMyA0LDExLjcgNCwxMC40IDQuNCw5LjUgNS4xLDguNCBaIgogICAgIGlkP' +
			'SJwYXRoMiIKICAgICBzdHlsZT0iZmlsbDojZmZmZmZmIiAvPgo8L3N2Zz4K") 0 0 ' +
			'no-repeat transparent;\nbackground-size: 50px 50px; z-index: 1001;}' +
			// this ^ is a hand pointing pointer graphic
			// this v is a tiny robot head icon
			'.robot-warning { padding: 8px 9px 8px 21px;' + // :) tampermonkey tells
			'background: 4px 2px no-repeat url("' + //  me it's superfluous to combine
			'data:image/png;base64,iVBORw0KGgoAAAANSU' + //  string literals with the
			'hEUgAAABAAAAAYBAMAAAABjmA/AAAAElBMVEUAAA' + // + operator! but it's
			'ABBABHSEajnp28trX8//tPIl81AAAAAXRSTlMAQO' + // also not lint to
			'bYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAALiMAAC' + // go above 80 characters
			'4jAXilP3YAAAAHdElNRQfkBQgSLgK2/ku1AAAAa0' + // in width...
			'lEQVQI123O2w3AIAgFUNygoAxANzBxAasL+OH+qx' + // dear StackExchange...
			'R8tGnS+3USLgEAAIQZ148J7m0jr9G1Rk8Z3Be4An' +
			'SOCIQ6khWp1mKIkgp5BfeQe/tFxFTQOsW2k4KIRM' + // kumate!
			'Q6zK1ZxxuiQuwk5ffWfuMG6yMYLhjK67sAAAAASU' +
			'VORK5CYII=") rgba(255,190,170,1);' +
			'box-shadow: 0 0 0 1px red;font-size: 12px;font-weight: normal;' +
			'color: red; width: 172px;overflow-wrap: normal;' +
			'white-space: normal;margin: 9px;display:block;}';
		css += `
.l-content .brick .private_overlay {
  z-index: 9;
}

.robot-warning strong {
  font-size: 13px;
  font-weight: bold;
  display: block;
}

.blue_bar .editor_navigation .notice {
  color: rgba(150, 150, 150, 1);
  margin: 0;
  padding: 5px 0px 0px 5px;
  float: right;
}

.l-content .brick .caption {
  display: none;
}

.l-content.with-captions.hoverless .brick .caption,
.l-content.with-captions .brick:hover .caption {
  display: table;
  background: rgba(40, 50, 60, 0.6);
  box-shadow: inset 0 0 0 4px rgba(40, 50, 60, 0.6);
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  text-align: left;
  width: 125px;
  height: 100%;
  animation: fadein 0.5s ease-in-out both;
}

.overflow-table {
  display: table;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 125px;
  height: 100%;
}

.overflow-row,
.caption-tr {
  display: table-row;
}

.overflow-cell,
.caption-td {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}

.overflow-inline {
  display: inline-block;
  text-align: left;
}

.caption-inline-block {
  display: inline-block;
  text-align: left;
  max-width: 115px;
  max-height: 115px;
  overflow: hidden;
}

.header_button > input[disabled]+.widget+.chrome svg,
.header_button > input[disabled]+.widget+.chrome .arrow,
.chrome.big_dark[disabled] svg {
  opacity: 0.5;
}

.blue_bar .editor_navigation .header_button .chrome .chrome_button {
  padding: 1px 0px 0px 2px;
  font-family: Franklin Gothic Medium Compressed, Arial, Helvetica, sans-serif;
  font-size: 13px;
  line-height: 14px;
  font-weight: normal;
}

.chrome.big_dark svg, .chrome_button svg {
  opacity: 1;
  margin-right: 1px;
  vertical-align: baseline;
  max-width: 13px;
  max-height: 13px;
  margin-left: 4px;
  position: relative;
}

#neue_post_form-iframe {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(0, 10, 30, 0.9);
  animation: fadein 0.5s ease-in-out both;
}

.l-content .links-layer {
  display: none;
}

.l-content .brick .edited-gif,
.l-content.with-links .brick:hover .links-layer,
.l-content.with-links.hoverless .brick .links-layer {
  background-color: rgba(40, 50, 60, 0.6);
  box-shadow: inset 0 0 0 4px rgba(40, 50, 60, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: #fff;
  z-index: 100;
  display: table;
  width: 125px;
  height: 100%;
  animation: fadein 0.5s ease-in-out both;
}

.tags-layer h2, .tags-layer a {
  color: inherit;
}

.follow .tag-container {
  max-width: 89px;
  overflow: hidden;
  max-height: 100px;
}

.l-content.with-links .brick:hover .tags-layer,
.l-content.with-links .brick:hover .links-layer,
.l-content.with-links.hoverless .brick .tags-layer,
.l-content.with-links.hoverless .brick .links-layer {
  transition: all 0.2s ease-out;
}

.l-content.with-links.hoverless .brick:hover .links-layer,
.l-content.with-links.hoverless .brick:hover .tags-layer {
  color: rgba(255, 255, 255, 0);
  background-color: rgba(0, 0, 0, 0);
}

.l-content.with-links .brick.highlighted:hover .links-laye
.l-content.with-links.hoverless .brick.highlighted .links-layer {
  z-index: 1000;
  background-color: rgba(0, 80, 255, 0.5);
  box-shadow: inset 0 0 0 4px rgba(115, 186, 231, 1);
}

.l-content.with-links.hoverless .brick.highlighted:hover .links-layer {
  background-color: rgba(0, 80, 255, 0.05);
}

.brick.highlighted a.link-reblog,
.brick.highlighted a.link-like,
.brick.highlighted a.link-edit,
.brick.highlighted a.link-view {
  background: rgba(115, 186, 231, 1);
}

.l-content .brick .edited-gif .trow,
.l-content.with-links .brick:hover .links-layer .trow,
.l-content.with-links.hoverless .brick .links-layer .trow {
  display: table-row;
  vertical-align: middle;
  text-align: center;
}

.l-content .brick .tags-layer,
.l-content .brick .edited-center {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  padding: 0px 18px 0 18px;
}

.links-layer a.link-view {
  position: absolute;
  right: 4px;
  top: 4px;
  border-bottom-left-radius: 5px
}

.links-layer a.link-edit {
  position: absolute;
  left: 4px;
  bottom: 4px;
  border-top-right-radius: 5px;
}

.links-layer a.link-like {
  right: 4px;
  bottom: 4px;
  border-top-left-radius: 5px;
}

.links-layer a.link-reblog {
  left: 4px;
  top: 4px;
  border-bottom-right-radius: 5px;
}

.links-layer a.link-reblog,
.links-layer a.link-like,
.links-layer a.link-edit,
.links-layer a.link-view {
  background-color: rgba(40, 50, 60, 0.6);
  padding: 3px;
  width: 20px;
  height: 20px;
  text-align: center;
  position: absolute;
}

svg.big-heart,
svg.big-reblog {
  position: absolute;
  left:0;
  bottom:0;
  width: 125px;
  height: 125px;
  z-index: 999;
  animation: happy-bounce 1.7s ease-out both;
}

.links-layer a.link-reblog.clicked svg,
.links-layer a.link-like.clicked svg {
  animation: flip 0.75s infinite ease-out both;
  position: relative;
}

.links-layer a.link-reblog.reblogged {
  cursor: default;
}

#view-links_button svg {
  margin: 0;
}

#mpe_title {
  position: relative;
  display: inline-block;
}

.post-state-nav-item {
  display: inline-block;
  text-decoration: none;
}

.post-state-nav-item svg {
  opacity: 0.5;
  display: inline-block;
  vertical-align: text-top;
}

.post-state-nav-item.active svg {
  opacity: 1;
}

.blue_bar .post-state-nav .post-state-nav-item {
  color: #99a3ae;
  font-weight: bold;
  padding: 3px 6px;
  top: -3px;
  left: 0;
  z-index: 9;
  position: relative;
  background: #001935 none;
}

#re-as-draft:checked+label+.robot-warning {
  display: none;
}

#re-as-draft+label {
  color: #7D99FF;
  padding-left: 5px;
  font-size: 20px;
}

#reblog_widget {
  display: none;
}

.open #reblog_widget {
  width: 300px;
  height: 200px;
  z-index: 999;
  left: 340px;
  display: table;
}

#urlstuff_widget,
#backdate_widget,
#snapshot-info_widget,
#add-caption_widget {
  z-index: 9;
}

#reblog_widget .trow {
  display: table-row;
}

#reblog_widget .inner {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

#reblog_widget h2 {
  color: #555;
  font-size: 17px;
}

#reblog-widget_input {
  width: 190px;
  padding: 6px;
  box-shadow: inset 0 2px 3px 0px rgba(0, 0, 0, 0.5);
  margin: 0;
  border: 0 none;
}

.header_button > input[disabled]+.widget+.chrome,
#reblog-widget_input[disabled] {
  color: #ccc;
}

#browse_months {
  position: relative;
  top: -3px;
  left: 0;
}

iframe#browse_months_widget {
  height: 423px;
  width: 226px;
  border-radius: 5px;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
}

div#browse_months_widget {
  height: 422px;
  width: 225px;
  padding: 0px;
  top: 0px;
  left: 0px;
}

.post-state-nav,
#mpe_title,
#nav-photo {
  border-left: 1px solid #122943;
  padding-left: 20px;
}

#nav_archive {
    text-align: center;
    line-height: 18px;
}

.blue_bar .title, #browse_months {
    display: inline-block;
    flex-direction: unset;
    float: none;
}

.chrome_button_right, .chrome_button_left {
  display: inline;
}

#tags {
  padding: 5px;
}

#tags div {
  margin: 0px 5px 5px 0px;
  overflow: hidden;
  display: inline-block;
  border: solid 1px rgba(255,75,35,1);
  background-color: rgba(255,75,35,0.4);
  padding: 5px;
  border-radius: 2px;
  color: #111;
  max-width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#photos-drop-zone.full {
  cursor: copy;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(200,255,200,0.5);
  z-index: 1000;
}

#photos-drop-zone {
  top: 90px;
  left: 20px;
  width: 300px;
  height: 190px;
  transition: all 0.4s ease-out;
  background-color: rgb(220, 220, 220);
  position: fixed;
  display: block;
  text-align: center;
  border-radius: 14px;
  box-shadow: inset 0 0 0 5px #f4f4f4, 0 0 0 4px rgb(220, 220, 220);
  z-index: 9;
}

#photos-drop-zone h2 {
  color: #f4f4f4;
  display: inline;
  font-size: 25px;
  font-weight: bold;
  top: 20px;
  position: relative;
  text-align: center;
  display: block;
}

#photos-drop-zone input {
  position: relative;
  top: 210px;
}

#drop_images_here {
  position: fixed;
  top: 168px;
  left: 70px;
  z-index: 12;
  font-size: 23px;
}

#photo_file_input {
  position: fixed;
  bottom: 40px;
  left: 40px;
}

#post_all_photos_button {
  position:fixed;
  top: 300px;
  cursor: pointer;
  color: #fff;
  font-family: "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 14px;
  line-height: 14px;
  left: 40px;
}

#post_all_photos_button[disabled] {
  color: #ccc;
}

.photo-brick.upload-working {
  animation: updown 0.3s infinite linear;
}

span.im-ready {
  animation: updown 0.25s 5 ease-out;
  position: relative;
  display: inline-block;
  z-index: 9;
}

.photo-brick-img,
.photo-brick {
  transition: all 0.4s ease-out;
}
.photo-brick {
  position: absolute;
  width: 500px;
  background-color: rgb(220, 220, 220);
  cursor: grab;
  display: table;
  min-height: 150px;
}

.img-count {
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 21px;
  color: rgba(255,255,255,0.9);
  z-index: 9;
  font-weight: bold;
  background-color: rgba(0,0,0,0.65);
  padding: 6px 9px;
  border-top-left-radius: 9px;
}

.photo-inner {
  display: table-row;
  height: 100%;
  width: 100%;
}

.photo-brick-img.brick-dragging,
.photo-brick.brick-dragging {
  z-index: 1000;
  opacity: 0.3;
  box-shadow: 0 0 5px 2px #000;
  transition: none;
  postion: absolute;
}

.photo-brick.hl-top {
  border-top: 3px dashed #0cf;
  margin-top: 5px;
}

.photo-brick.hl-bottom {
  margin-top: -5px;
  border-bottom: 3px dashed #0cf;
}

.hl-up {
  border-top: 3px dashed #0cf;
  margin-top: 5px;
}

.hl-down {
  border-bottom: 3px dashed #0cf;
  margin-bottom: 5px;
}

.hl-left {
  border-left: 3px dashed #0cf;
  margin-left: 5px;
}

.hl-right {
  border-right: 3px dashed #0cf;
  margin-right: 5px;
}

.photo-brick-edit {
  display: table-cell;
}

.photo-brick-img-cell {
  position: relative;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  top: 0;
  left: 0;
  width: 137px;
  background-color: #001935;
}

.pre-photoset .photo-brick-img-cell {
  background-color: #405975;
  box-shadow: inset 0 0 8px 1px #fff;
}

.photo-brick-img:first-child {
  margin-top: 5px;
}

.photo-brick-img {
  display: inline-block;
  position: relative;
  top: 0;
  left: 0;
  margin-bottom: 5px;
}

.photo-brick-img.brick-dragging,
.photo-brick-img.brick-dragging img,
.row-with-one-img,
.row-with-one-img img {
  width: 125px;
}

.row-with-two-img,
.row-with-two-img img {
  width: 60px;
}

.row-with-three-img,
.row-with-two-img {
  overflow: hidden;
}

.row-with-three-img img,
.row-with-two-img img {
  width: 100%;
  height: auto;
  max-width: 125px;
}

.row-with-two-img.data-photoset-a {
  margin-right: 5px;
}

.row-with-three-img,
.row-with-three-img img {
  width: 38px;
}

.row-with-three-img.data-photoset-a,
.row-with-three-img.data-photoset-b {
  margin-right: 5px;
}

.photo-brick img {
  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

.photo-brick-edit .rich {
  background-color: rgba(255,255,255,0.8);
  margin: 34px 6px 0px 6px;
  box-shadow: inset 0 2px 3px 0 #999;
  padding: 5px;
  cursor: auto;
  overflow-y: scroll;
  overflow-x: hidden;
  text-align: left;
  display: block;
  width: 340px;
  height: calc(100% - 42px);
}

#add-caption_widget .rich {
  background-color: rgba(255,255,255,0.8);
  margin: 30px 7px 0px 7px;
  box-shadow: inset 0 2px 3px 0 #999;
  padding: 5px;
  cursor: auto;
  overflow-y: scroll;
  overflow-x: hidden;
  display: block;
  width: 340px;
  height: 150px;
  text-align: left;
}

#add-caption_widget.visible-url .chrome,
#add-caption_widget .chrome,
.focused-rich.visible-url .photo-brick-edit .chrome,
.photo-brick-edit .chrome {
  font-family: "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 14px;
  display: none;
  position: absolute;
  cursor: pointer;
  min-width: 30px;
}

#add-caption_widget {
  height: 300px;
  width: 365px;
}

#snapshot-info_body {
  cursor: auto;
}

#snapshot-info_widget {
  padding: 20px;
  width: 400px;
  height: 320px;
}

#snapshot-info_body {
  position: relative;
  top: 0;
  left: 0;
  height: 360px;
}

#new-blogs {
  right: 10px;
  bottom: 55px;
}

#missing-blogs {
  left: 10px;
  bottom: 55px;
}

#snapshot-info_body h2 {
  display: inline-block;
  width: 190px;
  text-align: center;
}

#missing-blogs, #new-blogs {
  border: 1px solid #555;
  height: 240px;
  width: 169px;
  padding: 8px;
  position: absolute;
  overflow-x: hidden;
  text-overflow: ellipsis;
  overflow-y: auto;
  font: normal 11px 'Lucida Grande', Verdana, sans-serif;
  color: #555;
  background-color: rgba(255, 255, 255, 0.7);
}

#backdate_widget {
  height: 260px;
  width: 540px;
  font-family: "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 14px;
}

#backdate_widget .chrome{
  margin: 5px;
  float: right;
  padding: 0 8px;
}

#snapshot-info_widget .chrome,
#backdate_widget .chrome,
#add-caption_widget .chrome {
  border: 0 none;
}

.focused-rich.visible-url .photo-brick-edit .chrome,
.photo-brick-edit .chrome {
  top: 3px;
}

#add-caption_widget .chrome {
  top: 45px;
}

.photo-brick.focused-rich {
  z-index: 100;
  box-shadow: 0 0 5px 1px #03f;
  margin: -2px 0px 0px 5px;
}

.photo-brick-edit .photo-tags {
  max-height: 135px;
  display: inline-block;
  position: absolute;
  right: 0;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  top: 0;
  transform: translateX(100%);
}

.focused-rich .photo-tags {
  overflow: auto;
  background-color: rgba(0, 33, 255, 0.5);
  padding: 4px 0px 0px 6px;
}

#add-caption_widget.visible-url .chrome,
#add-caption_widget .chrome,
.focused-rich .photo-brick-edit .chrome {
  display: block;
}

.stripe {
  position: absolute;
  top: 7px;
  left: 143px;
  border-top: 5px solid #BBB;
  height: 10px;
  width: calc(100% - 150px);
  display: block;
  border-bottom: 5px solid #BBB;
}

.focused-rich .photo-brick-edit .stripe {
  display: none;
}

.focused-rich .photo-brick-edit .photo-tags .token {
  float: left;
  padding: 3px 5px;
  border: solid 1px #b7c963;
  background-color: #C7DA76;
  color: #111;
  margin: 0px 5px 5px 0px;
  border-radius: 2px;
  font: normal 14px/1.4 "Helvetica Neue",
    "HelveticaNeue", Helvetica, Arial, sans-serif;
  text-decoration: none;
  cursor: auto;
}

.photo-brick-edit .photo-tags .token .tag:before {
  content: "#";
  display: inline-block;
}

.focused-rich .photo-brick-edit .photo-tags .token .tag:before {
  content: "";
  display: none;
}

.photo-brick-edit .token a {
  display: none;
}

#add-caption_widget a,
.focused-rich .photo-brick-edit .token a {
  font-weight: bold;
  margin-left: 7px;
  text-decoration: none;
  color: #749440;
  display: inline-block;
}

.photo-brick-edit .photo-tags .token {
  float: left;
  padding: 3px 5px;
  color: #999;
  font-weight: bold;
  margin: 0px 5px 5px 0px;
  font: normal 14px/1.4 "Helvetica Neue",
    "HelveticaNeue", Helvetica, Arial, sans-serif;
  text-decoration: underline;
  display: inline-block;
  cursor: auto;
}

.photo-brick-edit .clone_abc_button {
  right: 265px;
  width: 94px;
  line-height: 11px;
  top: -31px;
  box-shadow: 0 1px 0 3px rgb(220, 220, 220),
              0 0 5px 3px #03f;
}

#add-caption_widget .pink_button,
#add-caption_widget .x_button,
.photo-brick-edit .pink_button,
.photo-brick-edit .x_button {
  right: 327px;
  font-weight: 900;
  color: #f00;
}

#add-caption_widget .red_button,
#add-caption_widget .b_button,
.photo-brick-edit .red_button,
.photo-brick-edit .b_button {
  right: 295px;
  font-weight: 900;
}

#add-caption_widget .orange_button,
#add-caption_widget .i_button,
.photo-brick-edit .orange_button,
.photo-brick-edit .i_button {
  right: 263px;
  font-style: italic;
}

#add-caption_widget .yellow_button,
#add-caption_widget .s_button,
.photo-brick-edit .yellow_button,
.photo-brick-edit .s_button {
  right: 231px;
  font-style: italic;
  text-decoration-line: line-through;
}

#add-caption_widget .green_button,
#add-caption_widget .a_button,
.photo-brick-edit .green_button,
.photo-brick-edit .a_button {
  right: 199px;
  color: #009;
  text-decoration-line: underline;
}

#add-caption_widget .ok_button,
.focused-rich .photo-brick-edit .ok_button {
  right: 7px;
  display: none;
}

#add-caption_widget.visible-url .chrome,
#add-caption_widget.visible-colors .chrome,
#add-caption_widget .colors_buttons,
.focused-rich.visible-colors .photo-brick-edit .chrome,
.photo-brick-edit .colors_buttons,
.focused-rich .photo-brick-edit .colors_buttons {
  display: none;
}

#add-caption_widget .a_button_input,
.photo-brick-edit .a_button_input,
.focused-rich .photo-brick-edit .a_button_input {
  display: none;
  right: 199px;
  color: #009;
  text-decoration-line: underline;
  position: absolute;
  top: 3px;
  height: 30px;
  width: 318px;
  padding: 0 3px;
  left: 143px;
  background-color: #fff;
  box-shadow: 0 0 0 1px #eee, inset 0 2px 2px 0 #000;
}

#add-caption_widget.visible-url .a_button_input,
#add-caption_widget.visible-url .ok_button,
.focused-rich.visible-url .photo-brick-edit .a_button_input,
.focused-rich.visible-url .photo-brick-edit .ok_button {
  display: block;
}

#add-caption_widget.visible-colors .colors_buttons,
.focused-rich.visible-colors .photo-brick-edit .colors_buttons {
  display: block;
}

#add-caption_widget .cerulean_button,
#add-caption_widget .h_button,
.photo-brick-edit .cerulean_button,
.photo-brick-edit .h_button {
  right: 167px;
  font-weight: 900;
}

#add-caption_widget .blue_button,
#add-caption_widget .ol_button,
.photo-brick-edit .blue_button,
.photo-brick-edit .ol_button {
  right: 135px;
}

#add-caption_widget .ul_button,
.photo-brick-edit .ul_button {
  right: 103px;
}

#add-caption_widget .bq_button,
.photo-brick-edit .bq_button {
  right: 71px;
}

#add-caption_widget .colors_button,
.photo-brick-edit .colors_button {
  right: 39px;
}

#add-caption_widget .q_button,
.photo-brick-edit .q_button {
  right: 7px;
  font-family: Fairwater, serif;
  font-size: 17px;
  line-height: 26px;
}

#add-caption_widget .colors_button .color,
.photo-brick-edit .colors_button .color {
  width: 14px;
  height: 17px;
  border-radius: 6px;
  box-shadow: inset 0 0 0 1px #fff;
  background: linear-gradient(
    to bottom,
    rgba(255,0,0,1) 0%,
    rgba(255,85,0,1) 20%,
    rgba(255,255,0,1) 40%,
    rgba(0,255,0,1) 60%,
    rgba(0,0,255,1) 80%,
    rgba(255,0,255,1) 100%
  );
}

#photos_as_draft_container {
    position: fixed;
    top: 340px;
    left: 50px;
}

#photos_as_draft + label + .robot-warning {
  display: block;
}

#photos_as_draft:checked + label + .robot-warning {
  display: none;
}

#return_to_dash_link {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #555;
  font-size: 45px;
}

#add-caption_widget .robot-warning {
  display: inline-block;
}

.pend-container {
  text-align: left;
}

.pend-container div {
  height: 20px;
}

.pend-container label {
  cursor: pointer;
}

#overwrite-caption-option + label +.robot-warning {
  position: absolute;
  left: 70px;
  bottom: -11px;
  width: 136px;
  display: none;
  height: 50px;
}

#overwrite-caption-option:checked + label +.robot-warning {
  display: block;
}

.pend-container {
  position: relative;
  left: 6px;
  bottom: -6px;
}

#bt-no-time + label,
#bt-one-time + label,
#bt-two-time + label,
#bd-no-day + label,
#bd-one-day + label,
#bd-two-day + label {
  width: 130px;
  text-align: left;
  height: 19px;
  background-color: rgba(14,20,25,0.5);
  border-radius: 10px;
  color: #fff;
  padding: 5px 20px;
}

#bt-no-time:checked + label,
#bt-one-time:checked + label,
#bt-two-time:checked + label,
#bd-no-day:checked + label,
#bd-one-day:checked + label,
#bd-two-day:checked + label {
  background-color: #0ae;
}

#bt-no-time,
#bt-one-time,
#bt-two-time,
#bd-no-day,
#bd-one-day,
#bd-two-day {
  position: relative;
  left: 18px;
}

.date-input-bunch * {
  float: left;
  line-height: 17px;
}

.date-input-bunch {
  display: inline-block;
  background-color: rgba(30,85,125,1);
  color: #fff;
  margin: 0px 3px;
  width: 245px;
  height: 22px;
  top: 9px;
  position: relative;
  padding: 3px 0px 3px 5px;
}

.date-input-bunch input[type="number"] {
  margin-left: 3px;
  max-width: 50px;
  box-shadow: inset 0px 1px 3px 0px #000;
}

.date-input-bunch label {
  text-align: center;
  color: #0ae;
  width: 40px;
  font-size: 14px;
  font-weight: bold;
  line-height: 22px;
}

.date-input-bunch label.rlabel {
  background-color: #3bc;
  color: #fff;
  border-bottom-right-radius: 9px;
  border-top-right-radius: 9px;
  height: 21px;
}

.date-input-bunch label.rlabel.narrow {
  width: 20px;
}

.date-input-bunch .linput {
 width: 40px;
}

#bt-no-time:checked+label+.date-input-bunch+.date-input-bunch,
#bt-no-time:checked+label+.date-input-bunch,
#bd-no-day:checked+label+.date-input-bunch+.date-input-bunch,
#bd-no-day:checked+label+.date-input-bunch {
  opacity: 0.3;
}

#bt-one-time:checked+label+input+label+input+label+
.date-input-bunch+.date-input-bunch,
#bd-one-day:checked+label+input+label+input+label+
.date-input-bunch+.date-input-bunch {
  opacity: 0.3;
}

#backdate_widget div {
  margin-bottom: 7px;
}

#pmright+label:before,
#pmleft+label:before {
  position: relative;
  content: "am";
  display: inline-block;
}

#pmright:checked+label:before,
#pmleft:checked+label:before {
  content: "pm";
}

.source-label1 {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 9;
  background-color: rgba(0,0,0,0.5);
  border-radius: 30px;
}

.source-label2 {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 9;
  background-color: rgba(100,110,255,0.4);
  border-radius: 30px;
}

.follower-pop-t {
  display: table;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.8);
  z-index: 1000;
}

.follower-pop-tr {
  display: table-row;
  width: 100%;
  height: 100%;
}

.follower-pop-td {
  display: table-cell;
  width: 100%;
  height: 100%;
  text-align: center;
  vertical-align: middle;
}

.follower-pop-inner {
  display: inline-block;
  width: 512px;
}

.follower-pop-av,
.follower-pop-img {
  display: inline-block;
  width: 512px;
  height: 512px;
}

.follower-pop-title {
  font-size: 45px;
  padding: 9px;
  line-height: 45px;
}

.l-content .brick.follow.missing-follows-info .overlay {
  opacity: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url(https://assets.tumblr.com/images/loading_ddd.gif)
              50% 20px no-repeat rgba(255,255,255,0.9);
  width: 125px;
  height: 125px;
  border: 0 none;
}
.l-content .brick.edit-reblog-queue .highlight {
  background: url(https://assets.tumblr.com/images/loading_ddd.gif)
              50% 20px no-repeat rgba(225,185,35,0.9);
  display: block;
  border-color: rgba(225,95,35,1);
}

.l-content .brick.edit-reblog-queue .highlight .note_count,
.l-content .brick.edit-reblog-queue .highlight .tag_count,
.l-content .brick.edit-reblog-queue .highlight .tag_count:after,
.l-content .brick.edit-reblog-queue .overlay .inner .date {
  background-color: rgba(225,95,35,1);
}

#hover-only {
  margin-left: 3px;
}

#hover-only,
#hover-only+label svg {
  vertical-align: text-bottom;
}

#hover-only+label svg {
  width: 10px;
  height: 10px;
}

#hover-only+label {
  font-weight: bold;
  color: #fff;
  opacity: 0.5;
  font-size: 10px;
}

#hover-only:checked+label {
  opacity: 1;
}

#hover-only, #hover-only+label {
  top: 3px;
  position: relative;
}

#who-follows-who {
    font-size: 24px;
}

#snapshot-info_body * {
  font-family: "Helvetica Neue",
    "HelveticaNeue", Helvetica, Arial, sans-serif;
}

#forget1_button, #forget2_button {
  position: absolute;
  bottom: 29px;
  padding: 0 9px;
}

#snapshot-info_body a {
  display: block;
  text-align: left;
  margin: 4px;
  font-size: 14px;
}

#forget1_button {
  left: 65px;
}

#forget2_button {
  right: 65px;
}

#snapshot-info_body h1 {
  color: #555;
  font-size: 20px;
  display: block;
  font-weight: bold;
}

#snapshot-load-gif {
  position: absolute;
  top: 0;
  left: 0;
}

#new-blogs a {
  color: #59f;
}

#missing-blogs a {
  color: #f00;
}

.l-content~.l-content {
  display: none;
}`;
		// all of my extra css are in this ^ inline style
		document.head.appendChild(pluginStyle);
		pluginStyle.appendChild(document.createTextNode(css));
	}

	addBatchPhotosPageLink() {
		const navPhoto = document.createElement('a');
		const navLinks = document.getElementsByClassName('post-state-nav-item');
		navPhoto.appendChild(svgForType.image.cloneNode(true));
		navPhoto.appendChild(document.createTextNode('Batch'));
		navPhoto.id = 'nav-photo';
		navPhoto.getElementsByTagName('svg')[0].setAttribute('width', 15);
		navPhoto.getElementsByTagName('svg')[0].setAttribute('height', 15);
		navPhoto.getElementsByTagName('svg')[0].setAttribute('fill', '#fff');
		navPhoto.classList.add('post-state-nav-item');
		navPhoto.setAttribute('href', `/mega-editor/published/${this.username}?photos`);
		navLinks[0].parentNode.appendChild(navPhoto);
	}

	removeTumblrViewLogic() {
		const removeS = document.getElementsByTagName('script');
		for (let i = 0; i < removeS.length; i++) {
			if (
				typeof removeS[i].src.split(/\/+/g)[1] === 'undefined' ||
				removeS[i].src.split(/\/+/g)[1] !== 'assets.tumblr.com'
			) {
				removeS[i].parentNode.removeChild(removeS[i]);
			}
		}
		if (typeof this.lcontent !== 'undefined') {
			this.lcontent.innerHTML = '';
		}
		const pagination = document.getElementById('pagination');
		if (typeof pagination !== 'undefined') {
			pagination.remove();
		}
	}

	initBatchPhotosPage() {
		const { href, username, pluginData, lcontent, editorNavigation } = this;
		const unreadFile = {};
		this.reading = [
			{
				read: rebuildPhotoColumn
			}
		];
		if (!(href[3] === 'published') || !(href[5] === 'photos')) {
			return;
		}
		this.initPluginStyles();
		this.removeTumblrViewLogic();
		const navArchive = document.getElementById('nav_archive');
		navArchive.style.zIndex = '1000';
		const addTagsWidget = document.getElementById('add_tags_widget');
		navArchive.appendChild(addTagsWidget);
		const addTagButton = document.getElementById('add_tag_button');
		addTagButton.removeAttribute('onclick');
		const addTagButton2 = addTagButton.cloneNode(true);
		addTagButton.firstChild.innerHTML = 'Add Tags (single)';
		addTagButton2.firstChild.innerHTML = 'Add Tags to All';
		addTagButton2.id += '2';
		addTagButton2.style.position = 'absolute';
		addTagButton2.style.bottom = '8px';
		addTagButton2.style.left = '161px';
		addTagButton2.addEventListener('click', () => {
			const token = document.getElementById('tokens').children;
			const pb = document.getElementsByClassName('photo-brick');
			let phTags;
			let aToken;
			let child;
			let a;
			let addToken = true;
			for (let j = 0; j < pb.length; j++) {
				// pb & j :)
				[phTags] = pb[j].getElementsByClassName('photo-tags');
				aToken = phTags.children;
				for (let i = 0; i < token.length; i++) {
					addToken = true;
					for (let l = 0; l < aToken.length; l++) {
						if (token[i].innerHTML === aToken[l].innerHTML) {
							addToken = false;
							break;
						}
					}
					if (addToken) {
						child = token[i].cloneNode(true);
						a = child.getElementsByTagName('a');
						a[0].removeAttribute('onclick');
						phTags.appendChild(child);
					}
				}
			}
		});
		addTagButton.addEventListener('click', () => {
			const fr = document.getElementsByClassName('focused-rich');
			if (fr.length === 0) {
				return;
			}
			const token = document.getElementById('tokens').children;
			const phTags = fr[0].getElementsByClassName('photo-tags')[0];
			const aToken = phTags.children;
			let addToken = true;
			for (let i = 0; i < token.length; i++) {
				addToken = true;
				for (let l = 0; l < aToken.length; l++) {
					if (token[i].innerHTML === aToken[l].innerHTML) {
						addToken = false;
						break;
					}
				}
				if (addToken) {
					phTags.appendChild(token[i].cloneNode(true));
				}
			}
		});
		addTagButton.parentNode.parentNode.appendChild(addTagButton2);
		addTagsWidget.style.top = '83px';
		addTagsWidget.style.left = '15px';
		addTagsWidget.style.removeProperty('right');
		lcontent.classList.add('albino');
		lcontent.classList.add('hoverless');
		lcontent.classList.add('photo-page');
		pluginData.classList.add('is-uploading-photos');
		const dragEnter = (e) => {
			e.preventDefault();
			if (document.getElementsByClassName('brick-dragging').length > 0) {
				return;
			}
			const pdz = document.getElementById('photos-drop-zone');
			pdz.classList.add('full');
		};
		const dragLeave = (e) => {
			e.preventDefault();
			const pdz = document.getElementById('photos-drop-zone');
			pdz.classList.remove('full');
		};
		const drop = (e) => {
			e.preventDefault();
			const papb = document.getElementById('post_all_photos_button');
			if (papb.getAttribute('disabled') !== null) {
				papb.removeAttribute('disabled');
			}
			const pdz = document.getElementById('photos-drop-zone');
			pdz.classList.remove('full');
			let files;
			if (typeof e.dataTransfer !== 'undefined') {
				files = e.dataTransfer.files;
			} else if (typeof this.files !== 'undefined') {
				files = this.files;
			}
			let r;
			for (let i = 0; i < files.length; i++) {
				if (files[i].type.toString().split(/\//)[0] !== 'image') {
					continue;
				}
				r = new FileReader();
				r.imgCode = `img${getShortCodeForString(files[i].name)}`;
				r.addEventListener('load', this.loadPhotoIntoDOM);
				this.reading.push({
					read: () => {
						this.reading[this.reading.length - 1].reader.readAsDataURL(
							this.reading[this.reading.length - 1].file
						);
					},
					file: files[i],
					reader: r
				});
				unreadFile[`img${getShortCodeForString(files[i].name)}`] = files[i];
			}
			this.reading[this.reading.length - 1].read();
		};
		// remove all navigation buttons, editor widgets, and start anew
		editorNavigation[0].parentNode.removeChild(editorNavigation[0]);
		const dropZone = document.createElement('div');
		dropZone.id = 'photos-drop-zone';
		const dropTitle = document.createElement('h2');
		dropTitle.appendChild(document.createTextNode('Drop Photos Here'));
		dropTitle.id = 'drop_images_here';
		const inputBackup = document.createElement('input');
		inputBackup.type = 'file';
		inputBackup.accept = 'image/x-png,image/gif,image/jpeg,image/png';
		inputBackup.multiple = true;
		inputBackup.addEventListener('change', drop);
		inputBackup.id = 'photo_file_input';
		const postPhotos = butt('Post Photos');
		postPhotos.disabled = true;
		postPhotos.id = 'post_all_photos_button';
		postPhotos.setAttribute('title', 'Post All Photos');
		postPhotos.addEventListener('click', () => photoUploadAndSubmit(unreadFile, username));
		const photosAsDraft = document.createElement('input');
		photosAsDraft.id = 'photos_as_draft';
		photosAsDraft.type = 'checkbox';
		photosAsDraft.checked = true;
		const photosAsDraftLabel = document.createElement('label');
		photosAsDraftLabel.setAttribute('for', 'photos_as_draft');
		photosAsDraftLabel.appendChild(document.createTextNode('New Photo/Photoset Posts'));
		const asB = document.createElement('strong');
		asB.appendChild(document.createTextNode(' as Draft'));
		photosAsDraftLabel.appendChild(asB);
		const photosAsDraftContainer = document.createElement('div');
		photosAsDraftContainer.id = 'photos_as_draft_container';
		photosAsDraftContainer.appendChild(photosAsDraft);
		photosAsDraftContainer.appendChild(photosAsDraftLabel);
		const photosRobotWarning = document.createElement('div');
		photosRobotWarning.classList.add('robot-warning');
		const robotTitlePhotos = document.createElement('strong');
		robotTitlePhotos.appendChild(document.createTextNode('Friendly Robot Warning'));
		photosRobotWarning.appendChild(robotTitlePhotos);
		photosRobotWarning.appendChild(
			document.createTextNode(
				'Dash flooding might make you lose followers. ' + 'Perhaps "check" post "as draft" instead?'
			)
		);
		photosAsDraftContainer.appendChild(photosRobotWarning);
		document.body.appendChild(photosAsDraftContainer);
		document.body.appendChild(inputBackup);
		document.body.appendChild(postPhotos);
		document.body.appendChild(dropTitle);
		document.body.appendChild(dropZone);
		document.documentElement.addEventListener('dragenter', dragEnter, false);
		document.documentElement.addEventListener('dragover', dragEnter, false);
		document.documentElement.addEventListener('dragleave', dragLeave, false);
		document.documentElement.addEventListener('drop', drop, false);
	}

	loadPhotoIntoDOM(reloadedImg) {
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
			column += (this.height > minBrickHeight ? this.height : minBrickHeight) + 6;
			data.setAttribute('data-photos_height', column);
			lcontent.style.height = `${column}px`;
		});
		img.src = typeof reloadedImg.nodeName === 'undefined' ? this.result : reloadedImg.src;
		pbi.appendChild(img);
		observer.appendChild(pbi);
		pbic.appendChild(observer);
		brickInner.appendChild(pbic); // mayo?
		brickInner.appendChild(pbe); // lettuce?
		brick.appendChild(brickInner);
		if (typeof this.reading !== 'undefined' && this.reading.length > 0) {
			this.reading.pop();
		}
		if (typeof this.reading !== 'undefined' && this.reading.length > 0) {
			this.reading[this.reading.length - 1].read();
		}
		if (typeof reloadedImg.nodeName !== 'undefined') {
			const hlb = document.getElementsByClassName('hl-bottom');
			const hlt = document.getElementsByClassName('hl-top');
			reloadedImg.parentNode.removeChild(reloadedImg);
			document.body.insertBefore(
				brick,
				// eslint-disable-next-line no-nested-ternary
				hlb.length > 0 ? hlb[0].nextSibling : hlt.length > 0 ? hlt[0] : document.body.firstChild
			);
		} else {
			document.body.appendChild(brick);
		}
		brickIndex++;
	}
}
export default MassPostEditorFeatures;
