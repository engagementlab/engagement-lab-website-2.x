(()=>{"use strict";var e,v={},h={};function r(e){var i=h[e];if(void 0!==i)return i.exports;var t=h[e]={id:e,loaded:!1,exports:{}};return v[e].call(t.exports,t,t.exports,r),t.loaded=!0,t.exports}r.m=v,e=[],r.O=(i,t,f,o)=>{if(!t){var a=1/0;for(n=0;n<e.length;n++){for(var[t,f,o]=e[n],u=!0,d=0;d<t.length;d++)(!1&o||a>=o)&&Object.keys(r.O).every(p=>r.O[p](t[d]))?t.splice(d--,1):(u=!1,o<a&&(a=o));if(u){e.splice(n--,1);var l=f();void 0!==l&&(i=l)}}return i}o=o||0;for(var n=e.length;n>0&&e[n-1][2]>o;n--)e[n]=e[n-1];e[n]=[t,f,o]},r.n=e=>{var i=e&&e.__esModule?()=>e.default:()=>e;return r.d(i,{a:i}),i},r.d=(e,i)=>{for(var t in i)r.o(i,t)&&!r.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:i[t]})},r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce((i,t)=>(r.f[t](e,i),i),[])),r.u=e=>e+"."+{107:"0dd8b821b77e2593",226:"0c25e44d40719d7a",333:"1326cb37f5d90a06",469:"108481feaf28af5b",538:"a9836bb8c635b740",564:"1b6125d7f9615014",569:"0641d4e0b9505f3f",608:"ba328c8d006560f9",798:"aee4a4de687f58a3"}[e]+".js",r.miniCssF=e=>"styles.5c914619434f695a.css",r.hmd=e=>((e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e),r.o=(e,i)=>Object.prototype.hasOwnProperty.call(e,i),(()=>{var e={},i="elab-web:";r.l=(t,f,o,n)=>{if(e[t])e[t].push(f);else{var a,u;if(void 0!==o)for(var d=document.getElementsByTagName("script"),l=0;l<d.length;l++){var s=d[l];if(s.getAttribute("src")==t||s.getAttribute("data-webpack")==i+o){a=s;break}}a||(u=!0,(a=document.createElement("script")).type="module",a.charset="utf-8",a.timeout=120,r.nc&&a.setAttribute("nonce",r.nc),a.setAttribute("data-webpack",i+o),a.src=r.tu(t)),e[t]=[f];var c=(g,p)=>{a.onerror=a.onload=null,clearTimeout(b);var y=e[t];if(delete e[t],a.parentNode&&a.parentNode.removeChild(a),y&&y.forEach(_=>_(p)),g)return g(p)},b=setTimeout(c.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=c.bind(null,a.onerror),a.onload=c.bind(null,a.onload),u&&document.head.appendChild(a)}}})(),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e;r.tu=i=>(void 0===e&&(e={createScriptURL:t=>t},"undefined"!=typeof trustedTypes&&trustedTypes.createPolicy&&(e=trustedTypes.createPolicy("angular#bundler",e))),e.createScriptURL(i))})(),r.p="",(()=>{var e={666:0};r.f.j=(f,o)=>{var n=r.o(e,f)?e[f]:void 0;if(0!==n)if(n)o.push(n[2]);else if(666!=f){var a=new Promise((s,c)=>n=e[f]=[s,c]);o.push(n[2]=a);var u=r.p+r.u(f),d=new Error;r.l(u,s=>{if(r.o(e,f)&&(0!==(n=e[f])&&(e[f]=void 0),n)){var c=s&&("load"===s.type?"missing":s.type),b=s&&s.target&&s.target.src;d.message="Loading chunk "+f+" failed.\n("+c+": "+b+")",d.name="ChunkLoadError",d.type=c,d.request=b,n[1](d)}},"chunk-"+f,f)}else e[f]=0},r.O.j=f=>0===e[f];var i=(f,o)=>{var d,l,[n,a,u]=o,s=0;if(n.some(b=>0!==e[b])){for(d in a)r.o(a,d)&&(r.m[d]=a[d]);if(u)var c=u(r)}for(f&&f(o);s<n.length;s++)r.o(e,l=n[s])&&e[l]&&e[l][0](),e[n[s]]=0;return r.O(c)},t=self.webpackChunkelab_web=self.webpackChunkelab_web||[];t.forEach(i.bind(null,0)),t.push=i.bind(null,t.push.bind(t))})()})();