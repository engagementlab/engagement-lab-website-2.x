(()=>{"use strict";var e,v={},h={};function r(e){var i=h[e];if(void 0!==i)return i.exports;var t=h[e]={id:e,loaded:!1,exports:{}};return v[e].call(t.exports,t,t.exports,r),t.loaded=!0,t.exports}r.m=v,e=[],r.O=(i,t,f,d)=>{if(!t){var a=1/0;for(n=0;n<e.length;n++){for(var[t,f,d]=e[n],l=!0,o=0;o<t.length;o++)(!1&d||a>=d)&&Object.keys(r.O).every(p=>r.O[p](t[o]))?t.splice(o--,1):(l=!1,d<a&&(a=d));if(l){e.splice(n--,1);var s=f();void 0!==s&&(i=s)}}return i}d=d||0;for(var n=e.length;n>0&&e[n-1][2]>d;n--)e[n]=e[n-1];e[n]=[t,f,d]},r.n=e=>{var i=e&&e.__esModule?()=>e.default:()=>e;return r.d(i,{a:i}),i},r.d=(e,i)=>{for(var t in i)r.o(i,t)&&!r.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:i[t]})},r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce((i,t)=>(r.f[t](e,i),i),[])),r.u=e=>e+"."+{144:"d2699a7fedea441a",226:"dd5b6c7f5c14d125",333:"1326cb37f5d90a06",372:"0ebe13f5d675d157",390:"cb1015579ca3599e",469:"278701cce1ce4956",495:"c41d81a4bab5ec07",564:"1b6125d7f9615014",608:"ba328c8d006560f9",798:"a9cff29f79c1fad4",907:"0ad2117065e447fb"}[e]+".js",r.miniCssF=e=>"styles.d1d12ab530355e9f.css",r.hmd=e=>((e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e),r.o=(e,i)=>Object.prototype.hasOwnProperty.call(e,i),(()=>{var e={},i="elab-web:";r.l=(t,f,d,n)=>{if(e[t])e[t].push(f);else{var a,l;if(void 0!==d)for(var o=document.getElementsByTagName("script"),s=0;s<o.length;s++){var c=o[s];if(c.getAttribute("src")==t||c.getAttribute("data-webpack")==i+d){a=c;break}}a||(l=!0,(a=document.createElement("script")).type="module",a.charset="utf-8",a.timeout=120,r.nc&&a.setAttribute("nonce",r.nc),a.setAttribute("data-webpack",i+d),a.src=r.tu(t)),e[t]=[f];var u=(g,p)=>{a.onerror=a.onload=null,clearTimeout(b);var y=e[t];if(delete e[t],a.parentNode&&a.parentNode.removeChild(a),y&&y.forEach(_=>_(p)),g)return g(p)},b=setTimeout(u.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=u.bind(null,a.onerror),a.onload=u.bind(null,a.onload),l&&document.head.appendChild(a)}}})(),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e;r.tu=i=>(void 0===e&&(e={createScriptURL:t=>t},"undefined"!=typeof trustedTypes&&trustedTypes.createPolicy&&(e=trustedTypes.createPolicy("angular#bundler",e))),e.createScriptURL(i))})(),r.p="",(()=>{var e={666:0};r.f.j=(f,d)=>{var n=r.o(e,f)?e[f]:void 0;if(0!==n)if(n)d.push(n[2]);else if(666!=f){var a=new Promise((c,u)=>n=e[f]=[c,u]);d.push(n[2]=a);var l=r.p+r.u(f),o=new Error;r.l(l,c=>{if(r.o(e,f)&&(0!==(n=e[f])&&(e[f]=void 0),n)){var u=c&&("load"===c.type?"missing":c.type),b=c&&c.target&&c.target.src;o.message="Loading chunk "+f+" failed.\n("+u+": "+b+")",o.name="ChunkLoadError",o.type=u,o.request=b,n[1](o)}},"chunk-"+f,f)}else e[f]=0},r.O.j=f=>0===e[f];var i=(f,d)=>{var o,s,[n,a,l]=d,c=0;if(n.some(b=>0!==e[b])){for(o in a)r.o(a,o)&&(r.m[o]=a[o]);if(l)var u=l(r)}for(f&&f(d);c<n.length;c++)r.o(e,s=n[c])&&e[s]&&e[s][0](),e[n[c]]=0;return r.O(u)},t=self.webpackChunkelab_web=self.webpackChunkelab_web||[];t.forEach(i.bind(null,0)),t.push=i.bind(null,t.push.bind(t))})()})();