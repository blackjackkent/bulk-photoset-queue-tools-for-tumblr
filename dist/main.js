(()=>{"use strict";window.addEventListener("load",(async()=>{const t=new class{constructor(){this.cssMap={},this.blogShortname=null,this.blogUuid=null,this.bulkButton=null,this.panelManager=null}async init(){this.cssMap=await window.tumblr.getCssMap(),this.panelManager=new class{constructor(t){this.onSubmitHandler=t}build(){return this.buildPanel(),this.buildHeading(),this.buildDescription(),this.buildInputs(),this.buildDescription2(),this.uploadPanel}buildPanel(){const t=document.createElement("div");t.setAttribute("style","\n\t\t\t\twidth: 100%;\n\t\t\t\tbackground-color: #fff;\n\t\t\t\tcolor: #000;\n\t\t\t\tborder-radius: 3px;\n\t\t\t\tmargin-bottom: 20px;\n\t\t\t\tpadding: 0;\n\t\t\t\tpadding-bottom: 20px;\n\t\t\t\tdisplay: none;\n\t\t\t"),this.uploadPanel=t}buildHeading(){const t=document.createElement("h2");t.setAttribute("style","\n\t\t\t\tfont-weight: bold;\n\t\t\t\tpadding: 20px;\n\t\t\t"),t.innerText="Bulk Post Queue",this.uploadPanel.appendChild(t)}buildDescription(){const t=document.createElement("p");t.innerText="Enter the post ID of a post on your blog that you would like to requeue multiple times.",t.setAttribute("style","\n\t\t\t\tpadding: 0 20px 20px;\n\t\t\t\tmargin: 0;\n\t\t\t"),this.uploadPanel.appendChild(t)}buildInputs(){const t=document.createElement("form");t.addEventListener("submit",(t=>{t.preventDefault();const e=document.getElementsByName("bulkQueuePostId")[0],n=document.getElementsByName("bulkQueueCount")[0];this.onSubmitHandler(e.value,n.value)}));const e=document.createElement("p"),n=document.createElement("label");n.setAttribute("for","bulkQueuePostId"),n.innerText="Post ID: ";const o=document.createElement("input");o.setAttribute("type","text"),o.setAttribute("name","bulkQueuePostId"),o.setAttribute("placeholder","Post ID"),e.appendChild(n),e.appendChild(o),e.setAttribute("style","\n\t\t\t\tpadding: 0 20px 20px;\n\t\t\t\tmargin: 0;\n\t\t\t"),t.appendChild(e);const s=document.createElement("p"),i=document.createElement("label");i.setAttribute("for","bulkQueueCount"),i.innerText="Number of times to queue: ";const l=document.createElement("select");l.setAttribute("name","bulkQueueCount");for(let t=0;t<10;t++){const e=document.createElement("option");e.value=t+1,e.text=t+1,l.appendChild(e)}s.appendChild(i),s.appendChild(l),s.setAttribute("style","\n\t\t\t\tpadding: 0 20px 20px;\n\t\t\t\tmargin: 0;\n\t\t\t"),t.appendChild(s);const a=document.createElement("button");a.setAttribute("type","submit"),a.innerText="Submit",a.setAttribute("style","\n\t\t\t\tmargin: 0 20px 20px;\n\t\t\t\tbackground: #001935;\n\t\t\t\tcolor: #fff;\n\t\t\t\tpadding: 10px;\n\t\t\t\tborder-radius: 4px;\n\t\t\t"),t.appendChild(a),this.uploadPanel.appendChild(t)}buildDescription2(){const t=document.createElement("p");t.innerHTML='The Post ID must reference a post from your blog. The post ID is the part of the URL after ".tumblr.com/post/". For instance, if the post is at the URL <strong>http://myawesomeblog.tumblr.com/post/12345</strong>, you would enter <strong>12345</strong> in the Post ID field.',t.setAttribute("style","\n\t\t\t\tbackground: #ccc;\n\t\t\t\tfont-style: italic;\n\t\t\t\tmargin: 0 20px;\n\t\t\t\tpadding: 20px;\n\t\t\t"),this.uploadPanel.appendChild(t)}toggle(){"none"===this.uploadPanel.style.display?this.uploadPanel.style.display="block":this.uploadPanel.style.display="none"}}(this.onFormSubmit),await this.fetchBlogId(),this.initMenuButton(),this.initUploadPanel()}async fetchBlogId(){const t=document.querySelector(this.cssMap.bar.map((t=>`.${t}`)).join(", ")).querySelector(this.cssMap.avatar.map((t=>`.${t} a`)).join(", "));this.blogShortname=t.getAttribute("title");const e=await window.tumblr.apiFetch(`/v2/blog/${this.blogShortname}.tumblr.com/info`,{method:"GET"});this.blogUuid=e.response.blog.uuid}async queuePost(t,e){await window.tumblr.apiFetch(`/v2/blog/${this.blogShortname}.tumblr.com/posts`,{method:"POST",body:{state:"queue",parent_tumblelog_uuid:this.blogUuid,parent_post_id:t,reblog_key:e}})}async getReblogKey(t){const e=await window.tumblr.apiFetch(`/v2/blog/${this.blogShortname}.tumblr.com/posts?id=${t}`);return console.log(e),e.response.posts[0].reblogKey}async onFormSubmit(t,e){console.log(this),this.parseUserInput(t,e)&&await this.getReblogKey(t)}parseUserInput(t,e){let n,o;try{n=parseInt(t,10),o=parseInt(e,10)}catch(t){return alert("Error - you must enter a valid post ID and queue count. (Both should be numeric.)"),null}return{parsedPostId:n,parsedQueueCount:o}}initMenuButton(){const t=this.cssMap.postTypeButton,e=this.cssMap.icon,n=document.createElement("li"),o=document.createElement("button");t.forEach((t=>{o.classList.add(t)}));const s=document.createElement("span");e.forEach((t=>{s.classList.add(t)})),s.innerHTML='<svg width="40" height="35" viewBox="0 0 15 15" fill="yellow" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 3.5L14.8536 3.85355C15.0488 3.65829 15.0488 3.34171 14.8536 3.14645L14.5 3.5ZM0.5 11.5L0.146447 11.1464C-0.0488153 11.3417 -0.0488153 11.6583 0.146447 11.8536L0.5 11.5ZM11.1464 0.853553L14.1464 3.85355L14.8536 3.14645L11.8536 0.146447L11.1464 0.853553ZM14.1464 3.14645L11.1464 6.14645L11.8536 6.85355L14.8536 3.85355L14.1464 3.14645ZM3.85355 14.1464L0.853554 11.1464L0.146447 11.8536L3.14644 14.8536L3.85355 14.1464ZM0.853554 11.8536L3.85355 8.85355L3.14645 8.14645L0.146447 11.1464L0.853554 11.8536ZM0.5 12H11.5V11H0.5V12ZM15 8.5V7H14V8.5H15ZM11.5 12C13.433 12 15 10.433 15 8.5H14C14 9.88071 12.8807 11 11.5 11V12ZM14.5 3H3.5V4H14.5V3ZM0 6.5V8H1V6.5H0ZM3.5 3C1.567 3 0 4.567 0 6.5H1C1 5.11929 2.11929 4 3.5 4V3Z" fill="black"/></svg>';const i=document.createElement("span");i.innerText="Bulk",o.appendChild(s),o.appendChild(i),n.appendChild(o),document.querySelector(this.cssMap.bar.map((t=>`.${t} > ul`)).join(", ")).appendChild(n),this.bulkButton=n}initUploadPanel(){const t=this.panelManager.build();document.querySelector(this.cssMap.bar.map((t=>`.${t}`)).join(", ")).after(t),this.bulkButton.addEventListener("click",(()=>{this.panelManager.toggle()}))}};await t.init()}))})();