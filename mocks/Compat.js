function __loadCompat(n){n.Debug=function(){};n.Debug._fail=function(n){throw new Error(n);};n.Debug.writeln=function(n){window.console&&window.console.debug(n)};n.__getNonTextNode=function(n){try{while(n&&n.nodeType!=1)n=n.parentNode}catch(t){n=null}return n}}function _loadSafariCompat(){Node.prototype.__defineGetter__("text",function(){return this.textContent});Node.prototype.__defineSetter__("text",function(n){this.textContent=n});Node.prototype.selectNodes=function(n){var t=this.ownerDocument;return selectNodes(t,n,this)};Node.prototype.selectSingleNode=function(n){var t=this.ownerDocument;return selectSingleNode(t,n,this)};Document.prototype.selectNodes=function(n){return selectNodes(this,n,this.documentElement)};Document.prototype.selectSingleNode=function(n){return selectSingleNode(this,n,this.documentElement)}}function _loadMozillaCompat(n){n.navigate=function(n){window.setTimeout('window.location = "'+n+'";',0)};var t=function(n,t){t._mozillaEventHandler=function(n){return window.event=n,t(),n.returnValue};this.addEventListener(n.slice(2),t._mozillaEventHandler,!1)},i=function(n,t){if(t._mozillaEventHandler){var i=t._mozillaEventHandler;delete t._mozillaEventHandler;this.removeEventListener(n.slice(2),i,!1)}};n.attachEvent=t;n.detachEvent=i;n.HTMLDocument.prototype.attachEvent=t;n.HTMLDocument.prototype.detachEvent=i;n.HTMLElement.prototype.attachEvent=t;n.HTMLElement.prototype.detachEvent=i;n.Event.prototype.__defineGetter__("srcElement",function(){return __getNonTextNode(this.target)||this.currentTarget});n.Event.prototype.__defineGetter__("cancelBubble",function(){return this._bubblingCanceled||!1});n.Event.prototype.__defineSetter__("cancelBubble",function(n){n&&(this._bubblingCanceled=!0,this.stopPropagation())});n.Event.prototype.__defineGetter__("returnValue",function(){return!this._cancelDefault});n.Event.prototype.__defineSetter__("returnValue",function(n){n||(this._cancelDefault=!0,this.preventDefault())});n.Event.prototype.__defineGetter__("fromElement",function(){var n;return this.type=="mouseover"?n=this.relatedTarget:this.type=="mouseout"&&(n=this.target),__getNonTextNode(n)});n.Event.prototype.__defineGetter__("toElement",function(){var n;return this.type=="mouseout"?n=this.relatedTarget:this.type=="mouseover"&&(n=this.target),__getNonTextNode(n)});n.Event.prototype.__defineGetter__("button",function(){return this.which==1?1:this.which==3?2:0});n.HTMLElement.prototype.__defineGetter__("parentElement",function(){return this.parentNode});n.HTMLElement.prototype.__defineGetter__("children",function(){for(var t,i=[],r=this.childNodes.length,n=0;n<r;n++)t=this.childNodes[n],t.nodeType==1&&i.push(t);return i});n.HTMLElement.prototype.__defineGetter__("innerText",function(){var t,n;try{return this.textContent}catch(i){for(t="",n=0;n<this.childNodes.length;n++)this.childNodes[n].nodeType==3&&(t+=this.childNodes[n].textContent);return str}});n.HTMLElement.prototype.__defineSetter__("innerText",function(n){var t=document.createTextNode(n);this.innerHTML="";this.appendChild(t)});n.HTMLElement.prototype.__defineGetter__("currentStyle",function(){return window.getComputedStyle(this,null)});n.HTMLElement.prototype.__defineGetter__("runtimeStyle",function(){return window.getOverrideStyle(this,null)});n.HTMLElement.prototype.removeNode=function(){return this.parentNode.removeChild(this)};n.HTMLElement.prototype.contains=function(n){while(n!=null&&n!=this)n=n.parentNode;return n!=null};n.HTMLStyleElement.prototype.__defineGetter__("styleSheet",function(){return this.sheet});n.CSSStyleSheet.prototype.__defineSetter__("cssText",function(n){var t=this.ownerNode;if(t){while(t.firstChild)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}});n.CSSStyleSheet.prototype.__defineGetter__("rules",function(){return this.cssRules});n.CSSStyleSheet.prototype.addRule=function(n,t,i){this.insertRule(n+"{"+t+"}",i)};n.CSSStyleSheet.prototype.removeRule=function(n){this.deleteRule(n)};n.CSSStyleDeclaration.prototype.__defineGetter__("styleFloat",function(){return this.cssFloat});n.CSSStyleDeclaration.prototype.__defineSetter__("styleFloat",function(n){this.cssFloat=n});DocumentFragment.prototype.getElementById=function(n){for(var u=[],r=this.childNodes,t,i=0;i<r.length;i++)t=r[i],t.nodeType==1&&u.queue(t);while(u.length){if(t=u.dequeue(),t.id==n)return t;if(r=t.childNodes,r.length!=0)for(i=0;i<r.length;i++)t=r[i],t.nodeType==1&&u.queue(t)}return null};DocumentFragment.prototype.getElementsByTagName=function(n){for(var f=[],u=[],r=this.childNodes,t,i=0;i<r.length;i++)t=r[i],t.nodeType==1&&u.queue(t);while(u.length)if(t=u.dequeue(),t.tagName==n&&f.add(t),r=t.childNodes,r.length!=0)for(i=0;i<r.length;i++)t=r[i],t.nodeType==1&&u.queue(t);return f};DocumentFragment.prototype.createElement=function(n){return document.createElement(n)};n.XMLDocument.prototype.selectNodes=function(n,t){return selectNodes(this,n,t)};n.XMLDocument.prototype.selectSingleNode=function(n,t){return selectSingleNode(this,n,t)};Node.prototype.selectNodes=function(n){var t=this.ownerDocument;return t.selectNodes(n,this)};Node.prototype.selectSingleNode=function(n){var t=this.ownerDocument;return t.selectSingleNode(n,this)};Node.prototype.__defineGetter__("baseName",function(){return this.localName});Node.prototype.__defineGetter__("text",function(){return this.textContent});Node.prototype.__defineSetter__("text",function(n){this.textContent=n});Node.prototype.__defineGetter__("xml",function(){return(new XMLSerializer).serializeToString(this)})}var selectNodes=function(n,t,i){var r;i=i?i:n;var e=new XPathEvaluator,u=e.evaluate(t,i,n.createNSResolver(n.documentElement),XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),f=new Array(u.snapshotLength);for(r=0;r<u.snapshotLength;r++)f[r]=u.snapshotItem(r);return f},selectSingleNode=function(n,t,i){var r,u;if(t+="[1]",r=selectNodes(n,t,i),r.length!=0)for(u=0;u<r.length;u++)if(r[u])return r[u];return null};__loadCompat(window);window.navigator.userAgent.indexOf("Safari")<0?_loadMozillaCompat(window):_loadSafariCompat(window);