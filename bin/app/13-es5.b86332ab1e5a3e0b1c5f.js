!function(){function e(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function n(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{qebg:function(t,o,r){"use strict";r.r(o),r.d(o,"ResourcesModule",(function(){return M}));var c=r("iInd"),a=r("mrSG"),s=r("8Y7J"),i=r("Gqku"),u=r("SVse"),l=r("z304");function g(e,n){if(1&e&&s.Mb(0,"cdn-image",15),2&e){var t=s.bc().$implicit;s.ic("cloudinaryId",t.image.public_id),s.jc("alt","Thumbnail image for '",t.name,"' tool or resource"),s.hc("responsive",!0)}}function m(e,n){1&e&&(s.ac(),s.Qb(0,"svg",16),s.Mb(1,"path",17),s.Mb(2,"path",18),s.Pb())}function f(e,n){1&e&&(s.ac(),s.Qb(0,"svg",19),s.Qb(1,"g",20),s.Qb(2,"g"),s.Mb(3,"path",21),s.Mb(4,"path",22),s.Pb(),s.Pb(),s.Pb())}function p(e,n){1&e&&(s.Qb(0,"h4",23),s.wc(1,"Date Created"),s.Pb())}function d(e,n){if(1&e&&(s.Qb(0,"div",5,6),s.Qb(2,"a",7),s.vc(3,g,1,3,"cdn-image",8),s.Qb(4,"h4",9),s.Qb(5,"span"),s.wc(6),s.Pb(),s.vc(7,m,3,0,"svg",10),s.vc(8,f,5,0,"svg",11),s.Pb(),s.Qb(9,"h4",12),s.wc(10),s.Pb(),s.Qb(11,"p"),s.wc(12),s.Pb(),s.vc(13,p,2,0,"h4",13),s.Qb(14,"p",14),s.wc(15),s.cc(16,"date"),s.Pb(),s.Pb(),s.Pb()),2&e){var t=n.$implicit;s.xb(2),s.ic("href",t.url||t.file.url,s.rc),s.xb(1),s.hc("ngIf",void 0!==t.image),s.xb(3),s.xc(t.name),s.xb(1),s.hc("ngIf",t.file.url),s.xb(1),s.hc("ngIf",t.url&&t.url.length>0),s.xb(2),s.xc(t.project),s.xb(2),s.xc(t.summary),s.xb(1),s.hc("ngIf",t.date),s.xb(2),s.xc(s.ec(16,9,t.date,"mediumDate"))}}function h(e,n){if(1&e&&(s.Qb(0,"section",3),s.vc(1,d,17,12,"div",4),s.Pb()),2&e){var t=s.bc();s.xb(1),s.hc("ngForOf",t.content)}}var b,w,P=[{path:"",component:(b=function(){function t(n){e(this,t),this.dataSvc=n}var o,r,c;return o=t,(r=[{key:"ngOnInit",value:function(){return Object(a.b)(this,void 0,void 0,regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.dataSvc.getSet("tools","\n        {\n          \n          allTools {\n            name\n            project\n            summary\n            url\n            date\n            file {\n              url\n            }\n            image {\n              public_id\n            }\n          }\n        }\n    ");case 2:n=e.sent,this.content=n.allTools;case 4:case"end":return e.stop()}}),e,this)})))}}])&&n(o.prototype,r),c&&n(o,c),t}(),b.\u0275fac=function(e){return new(e||b)(s.Lb(i.a))},b.\u0275cmp=s.Fb({type:b,selectors:[["app-resources"]],decls:6,vars:1,consts:[["id","intro",1,"column","is-8","is-11-mobile"],[1,"blurb"],["id","resources",4,"ngIf"],["id","resources"],["class","resource",4,"ngFor","ngForOf"],[1,"resource"],["resourceList",""],[3,"href"],["cloudinaryPrefix","/",3,"cloudinaryId","responsive","alt",4,"ngIf"],[1,"name","no-margin"],["viewBox","0 0 29 29","width","29","height","29",4,"ngIf"],["viewBox","0 0 26 26","width","26","height","26",4,"ngIf"],[1,"uppercase","no-margin"],["class","uppercase",4,"ngIf"],[1,"no-margin"],["cloudinaryPrefix","/",3,"cloudinaryId","responsive","alt"],["viewBox","0 0 29 29","width","29","height","29"],["d","M 23.819 13.462 L 22.359 11.998 L 15.536 18.821 L 15.536 0 L 13.464 0 L 13.464 18.821 L 6.639 11.996 L 5.183 13.46 L 14.5 22.786 Z",1,"dl-arrow"],["d","M 0 26.929 L 29 26.929 L 29 29 L 0 29 Z"],["viewBox","0 0 26 26","width","26","height","26"],["transform","matrix(0.091574, 0, 0, 0.091574, 0, 0)"],["d","M266.422,0h-97.625c-9.65,0-17.5,7.851-17.5,17.5c0,9.649,7.85,17.5,17.5,17.5h55.377l-92.375,92.374   c-3.307,3.305-5.127,7.699-5.127,12.375c0,4.676,1.819,9.069,5.125,12.371c3.306,3.309,7.699,5.13,12.375,5.13   c4.674,0,9.069-1.82,12.376-5.127l92.374-92.375v55.377c0,9.649,7.851,17.5,17.5,17.5c9.649,0,17.5-7.851,17.5-17.5V17.5   C283.922,7.851,276.071,0,266.422,0z",1,"url-arrow"],["d","M201.137,253.922H30V82.785h128.711l30-30H15c-8.284,0-15,6.716-15,15v201.137c0,8.284,6.716,15,15,15h201.137   c8.284,0,15-6.716,15-15V95.211l-30,30V253.922z"],[1,"uppercase"]],template:function(e,n){1&e&&(s.Qb(0,"section",0),s.Qb(1,"h2"),s.wc(2,"Resources & Tools"),s.Pb(),s.Qb(3,"h3",1),s.wc(4," Many of our research projects result in tools, games, workshops, or processes that are free to use. Please browse our resources and use them for your projects. We ask only that you provide appropriate credit. "),s.Pb(),s.Pb(),s.vc(5,h,2,1,"section",2)),2&e&&(s.xb(5),s.hc("ngIf",n.content))},directives:[u.k,u.j,l.a],pipes:[u.d],styles:['@import url("https://fonts.googleapis.com/css?family=Overpass:400,600,900");@font-face{font-family:LunchtypeRegular;src:url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943334/homepage-2.0/fonts/lunchtype22-regular-webfont.woff2) format("woff2"),url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943334/homepage-2.0/fonts/lunchtype22-regular-webfont.woff) format("woff"),url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943478/homepage-2.0/fonts/Lunchtype22-Regular.ttf) format("truetype")}@font-face{font-family:LunchtypeMedium;src:url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943334/homepage-2.0/fonts/lunchtype22-medium-webfont.woff2) format("woff2"),url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943334/homepage-2.0/fonts/lunchtype22-medium-webfont.woff) format("woff"),url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943478/homepage-2.0/fonts/Lunchtype22-Medium.ttf) format("truetype")}.small[_ngcontent-%COMP%]{font-size:small}.large[_ngcontent-%COMP%]{font-size:large}.xx-large[_ngcontent-%COMP%]{font-size:xx-large}.uppercase[_ngcontent-%COMP%]{text-transform:uppercase}.center[_ngcontent-%COMP%]{text-align:center}.hidden[_ngcontent-%COMP%]{display:none}@media (min-width:64em){.hidden-desktop[_ngcontent-%COMP%]{display:none}}@media (min-width:48em){.hidden-tablet-plus[_ngcontent-%COMP%]{display:none}}@media (max-width:47.99em){.hidden-mobile[_ngcontent-%COMP%]{display:none}}@media (min-width:26.5625em){.hidden-not-mobile[_ngcontent-%COMP%]{display:none}}.no-margin[_ngcontent-%COMP%]{margin:0}.no-pad[_ngcontent-%COMP%]{padding:0}#resources[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(3,1fr);grid-column-gap:0;grid-row-gap:0}@media (max-width:47.99em){#resources[_ngcontent-%COMP%]{grid-template-columns:repeat(1,1fr)}}@media (min-width:26.5625em) and (max-width:63.99em){#resources[_ngcontent-%COMP%]{grid-template-columns:repeat(2,1fr)}}#resources[_ngcontent-%COMP%]   .resource[_ngcontent-%COMP%]{margin:20px}#resources[_ngcontent-%COMP%]   .resource[_ngcontent-%COMP%]     img{max-height:330px}#resources[_ngcontent-%COMP%]   .resource[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;font-size:1.7em}#resources[_ngcontent-%COMP%]   .resource[_ngcontent-%COMP%]   .uppercase[_ngcontent-%COMP%]{font-weight:900}#resources[_ngcontent-%COMP%]   .resource[_ngcontent-%COMP%]   .dl-arrow[_ngcontent-%COMP%], #resources[_ngcontent-%COMP%]   .resource[_ngcontent-%COMP%]   .url-arrow[_ngcontent-%COMP%]{transition:transform .2s ease-in-out}#resources[_ngcontent-%COMP%]   .resource[_ngcontent-%COMP%]   .url-arrow[_ngcontent-%COMP%]{transform:translate(-40%,40%)}#resources[_ngcontent-%COMP%]   .resource[_ngcontent-%COMP%]:hover   .dl-arrow[_ngcontent-%COMP%]{transform:translateY(13%)}#resources[_ngcontent-%COMP%]   .resource[_ngcontent-%COMP%]:hover   .url-arrow[_ngcontent-%COMP%]{transform:translate(0)}']}),b)}],M=((w=function n(){e(this,n)}).\u0275mod=s.Jb({type:w}),w.\u0275inj=s.Ib({factory:function(e){return new(e||w)},imports:[[c.g.forChild(P)],c.g]}),w)}}])}();