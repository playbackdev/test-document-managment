!function(e){function t(t){for(var r,a,u=t[0],s=t[1],c=t[2],d=0,p=[];d<u.length;d++)a=u[d],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&p.push(o[a][0]),o[a]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);for(l&&l(t);p.length;)p.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,a=1;a<n.length;a++){var s=n[a];0!==o[s]&&(r=!1)}r&&(i.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},a={0:0},o={0:0},i=[];function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[];a[e]?t.push(a[e]):0!==a[e]&&{3:1,4:1}[e]&&t.push(a[e]=new Promise((function(t,n){for(var r=({}[e]||e)+".ebdb3ef3d97fa3ad1ab3.css",o=u.p+r,i=document.getElementsByTagName("link"),s=0;s<i.length;s++){var c=(l=i[s]).getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(c===r||c===o))return t()}var d=document.getElementsByTagName("style");for(s=0;s<d.length;s++){var l;if((c=(l=d[s]).getAttribute("data-href"))===r||c===o)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var r=t&&t.target&&t.target.src||o,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete a[e],p.parentNode.removeChild(p),n(i)},p.href=o,document.getElementsByTagName("head")[0].appendChild(p)})).then((function(){a[e]=0})));var n=o[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,r){n=o[e]=[t,r]}));t.push(n[2]=r);var i,s=document.createElement("script");s.charset="utf-8",s.timeout=120,u.nc&&s.setAttribute("nonce",u.nc),s.src=function(e){return u.p+""+({}[e]||e)+".ebdb3ef3d97fa3ad1ab3.js"}(e);var c=new Error;i=function(t){s.onerror=s.onload=null,clearTimeout(d);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;c.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",c.name="ChunkLoadError",c.type=r,c.request=a,n[1](c)}o[e]=void 0}};var d=setTimeout((function(){i({type:"timeout",target:s})}),12e4);s.onerror=s.onload=i,document.head.appendChild(s)}return Promise.all(t)},u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="",u.oe=function(e){throw console.error(e),e};var s=window.webpackJsonp=window.webpackJsonp||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var d=0;d<s.length;d++)t(s[d]);var l=c;i.push([135,1]),n()}({130:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));n(322);var r=function(){var e=document.createElement("div");return e.classList.add("lds-ring"),e.insertAdjacentHTML("afterbegin","<div></div><div></div><div></div><div></div>"),e}},135:function(e,t,n){n(136),e.exports=n(324)},322:function(e,t,n){},323:function(e,t,n){},324:function(e,t,n){"use strict";n.r(t);var r=n(49),a=n(130),o=(n(323),n(28)),i=n.n(o),u=(n(129),n(132),{apiKey:"AIzaSyD0wqobh5dguv6meblOXcNr4Yy6Z8wpzzY",authDomain:"test-document-managment.firebaseapp.com",databaseURL:"https://test-document-managment.firebaseio.com",projectId:"test-document-managment",storageBucket:"test-document-managment.appspot.com",messagingSenderId:"709348268198",appId:"1:709348268198:web:4479964af9af7f5a10bc67"});({init:function(){var e=this;this.appElement=document.getElementById("app"),this.render(Object(a.a)()),i.a.initializeApp(u),i.a.auth().onAuthStateChanged((function(t){t&&r.c.authorize(t),e.renderPage(r.c.page)})),document.addEventListener("pagechanged",(function(t){e.renderPage(t.detail.page)}))},renderPage:function(e){var t=this;switch(e){case r.b:n.e(4).then(n.bind(null,342)).then((function(e){t.render(e.authPage.render())}));break;case r.a:Promise.all([n.e(2),n.e(3)]).then(n.bind(null,343)).then((function(e){t.render(e.tablePage.render())}))}},render:function(e){for(;this.appElement.firstChild;)this.appElement.removeChild(this.appElement.firstChild);this.appElement.insertAdjacentElement("afterbegin",e)}}).init()},49:function(e,t,n){"use strict";n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return u}));var r=n(28),a=n.n(r),o=(n(129),"cabinet"),i="login",u={user:{},users:[{login:"German",password:"123"},{login:"German1",password:"1234"},{login:"German2",password:"12345"},{login:"German3",password:"123456"}],page:i,authorize:function(e){this.user=e,this.page=o,document.dispatchEvent(new CustomEvent("pagechanged",{detail:{page:o}}))},login:function(e){var t=this,n=e.login,r=e.password;return n&&r?a.a.auth().signInWithEmailAndPassword(n,r).then((function(){return t.user=a.a.auth().currentUser,t.page=o,document.dispatchEvent(new CustomEvent("pagechanged",{detail:{page:o}})),new Promise((function(e){return e()}))})):new Promise((function(e,t){return t("Логин или пароль были введены неверно")}))},logout:function(){this.user={},a.a.auth().signOut(),this.page=i,document.dispatchEvent(new CustomEvent("pagechanged",{detail:{page:i}}))},register:function(e){var t=e.login,n=e.password;return t&&n?a.a.auth().createUserWithEmailAndPassword(t,n):new Promise((function(e,t){return t("Введите почту и пароль не менее 6 символов")}))}}}});