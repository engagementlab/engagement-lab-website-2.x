"use strict";(self.webpackChunkelab_web=self.webpackChunkelab_web||[]).push([[226],{84226:(K,u,l)=>{l.r(u),l.d(u,{EventsModule:()=>W});var a=l(57725),m=l(64762),g=l(16390),n=l(83668),r=l(57443),s=l(86019);function _(e,o){1&e&&(n.TgZ(0,"h3"),n._uU(1," No upcoming events. Check back soon! "),n.qZA())}function h(e,o){if(1&e&&(n.TgZ(0,"div",5,6),n.TgZ(2,"a",7),n._UZ(3,"hr"),n.TgZ(4,"div",8),n.TgZ(5,"h1",9),n._uU(6),n.ALo(7,"date"),n.TgZ(8,"div",10),n._uU(9),n.ALo(10,"date"),n.qZA(),n.qZA(),n.TgZ(11,"h1",11),n._uU(12),n.ALo(13,"date"),n.TgZ(14,"div",10),n._uU(15),n.ALo(16,"date"),n.qZA(),n.qZA(),n.TgZ(17,"div",12),n.TgZ(18,"h2"),n._uU(19),n.O4$(),n.TgZ(20,"svg",13),n._UZ(21,"path",14),n.qZA(),n.qZA(),n.kcU(),n.TgZ(22,"div",15),n._uU(23),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA()),2&e){const t=o.$implicit;n.xp6(2),n.MGl("routerLink","/events/",t.key,""),n.xp6(4),n.hij(" ",n.xi3(7,7,t.date,"MMMM dd")," "),n.xp6(3),n.Oqu(n.xi3(10,10,t.date,"yyyy")),n.xp6(3),n.hij(" ",n.xi3(13,13,t.date,"MMM dd")," "),n.xp6(3),n.Oqu(n.xi3(16,16,t.date,"yy")),n.xp6(4),n.hij(" ",t.name,"\xa0 "),n.xp6(4),n.Oqu(t.shortDescription)}}function x(e,o){1&e&&n._UZ(0,"hr")}function y(e,o){if(1&e&&(n.TgZ(0,"div",5),n.TgZ(1,"a",7),n.TgZ(2,"div",8),n.TgZ(3,"h4",9),n._uU(4),n.ALo(5,"date"),n.TgZ(6,"div",10),n._uU(7),n.ALo(8,"date"),n.qZA(),n.qZA(),n.TgZ(9,"h4",11),n._uU(10),n.ALo(11,"date"),n._UZ(12,"br"),n._uU(13),n.ALo(14,"date"),n.TgZ(15,"div",10),n._uU(16),n.ALo(17,"date"),n.qZA(),n.qZA(),n.TgZ(18,"div",12),n.TgZ(19,"h3",18),n._uU(20),n.O4$(),n.TgZ(21,"svg",19),n._UZ(22,"path",20),n.qZA(),n.qZA(),n.kcU(),n.TgZ(23,"div",15),n._uU(24),n.qZA(),n.qZA(),n.qZA(),n.YNc(25,x,1,0,"hr",2),n.qZA(),n.qZA()),2&e){const t=o.$implicit,i=o.last;n.xp6(1),n.MGl("routerLink","/events/",t.key,""),n.xp6(3),n.hij(" ",n.xi3(5,9,t.date,"MMMM dd")," "),n.xp6(3),n.Oqu(n.xi3(8,12,t.date,"yyyy")),n.xp6(3),n.hij(" ",n.xi3(11,15,t.date,"MMM"),""),n.xp6(3),n.hij("",n.xi3(14,18,t.date,"dd")," "),n.xp6(3),n.Oqu(n.xi3(17,21,t.date,"yy")),n.xp6(4),n.hij(" ",t.name,"\xa0 "),n.xp6(4),n.Oqu(t.shortDescription),n.xp6(1),n.Q6J("ngIf",!i)}}function Z(e,o){if(1&e&&(n.TgZ(0,"section",16),n.TgZ(1,"h1",17),n._uU(2,"past events"),n.qZA(),n.YNc(3,y,26,24,"div",3),n.qZA()),2&e){const t=n.oxw();n.xp6(3),n.Q6J("ngForOf",t.pastEvents)}}let C=(()=>{class e{constructor(t){this._dataSvc=t}ngOnInit(){return(0,m.mG)(this,void 0,void 0,function*(){const i=yield this._dataSvc.getSet("events","\n            {\n                allEvents {\n                    name\n                    key\n                    date\n                }\n            }\n        ");this.groupDates(i.allEvents)})}groupDates(t){Object.keys(t).forEach(i=>{let c=t[i];c.future=new Date(c.date).getTime()>(new Date).getTime()}),this.events=g.ar(t,{future:!0}),this.pastEvents=g.ar(t,{future:!1})}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(r.D))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-index"]],decls:6,vars:3,consts:[[1,"column","is-half","no-pad"],["id","events",1,"listing"],[4,"ngIf"],["class","event column is-full",4,"ngFor","ngForOf"],["id","pastevents",4,"ngIf"],[1,"event","column","is-full"],["eventList",""],[3,"routerLink"],[1,"columns","is-mobile"],[1,"date","column","is-one-fifth","hidden-mobile"],[1,"year"],[1,"date","column","is-one-fifth","hidden-tablet-plus"],[1,"name","column","no-margin"],["width","32","height","23","fill","none","viewBox","0 0 32 23"],["stroke","#000","d","M.5 11.309h29.788M19.968 1L30.5 11.5 19.968 22"],[1,"description"],["id","pastevents"],[1,"uppercase"],[1,"blurb"],["width","32","height","23","fill","none","viewBox","0 0 32 23",1,"hidden-mobile"],["stroke","#fff","d","M.5 11.309h29.788M19.968 1L30.5 11.5 19.968 22"]],template:function(t,i){1&t&&(n.TgZ(0,"h2",0),n._uU(1,"Events"),n.qZA(),n.TgZ(2,"section",1),n.YNc(3,_,2,0,"h3",2),n.YNc(4,h,24,19,"div",3),n.qZA(),n.YNc(5,Z,4,1,"section",4)),2&t&&(n.xp6(3),n.Q6J("ngIf",i.events&&0===i.events.length||!i.events),n.xp6(1),n.Q6J("ngForOf",i.events),n.xp6(1),n.Q6J("ngIf",void 0!==i.pastEvents))},directives:[s.O5,s.sg,a.yS],pipes:[s.uU],styles:['@import"https://fonts.googleapis.com/css?family=Overpass:400,600,900&display=swap";@font-face{font-family:"LunchtypeRegular";font-display:swap;src:url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943334/homepage-2.0/fonts/lunchtype22-regular-webfont.woff2) format("woff2"),url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943334/homepage-2.0/fonts/lunchtype22-regular-webfont.woff) format("woff"),url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943478/homepage-2.0/fonts/Lunchtype22-Regular.ttf) format("truetype")}@font-face{font-family:"LunchtypeMedium";font-display:swap;src:url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943334/homepage-2.0/fonts/lunchtype22-medium-webfont.woff2) format("woff2"),url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943334/homepage-2.0/fonts/lunchtype22-medium-webfont.woff) format("woff"),url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943478/homepage-2.0/fonts/Lunchtype22-Medium.ttf) format("truetype")}.small[_ngcontent-%COMP%]{font-size:small}.large[_ngcontent-%COMP%]{font-size:large}.xx-large[_ngcontent-%COMP%]{font-size:xx-large}.uppercase[_ngcontent-%COMP%]{text-transform:uppercase}.center[_ngcontent-%COMP%]{text-align:center}.hidden[_ngcontent-%COMP%]{display:none}@media (min-width: 64em){.hidden-desktop[_ngcontent-%COMP%]{display:none}}@media (min-width: 48em){.hidden-tablet-plus[_ngcontent-%COMP%]{display:none}}@media (max-width: 47.99em){.hidden-mobile[_ngcontent-%COMP%]{display:none}}@media (min-width: 26.5625em){.hidden-not-mobile[_ngcontent-%COMP%]{display:none}}.no-margin[_ngcontent-%COMP%]{margin:0}.no-pad[_ngcontent-%COMP%]{padding:0}#events[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{text-transform:uppercase;line-height:1.33;letter-spacing:1.5px;margin-top:0}#events[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]   .year[_ngcontent-%COMP%]{font-size:2.1em;font-weight:800;letter-spacing:1.3px;color:#000;-webkit-text-stroke:black 1px;-webkit-text-fill-color:white}#events[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin-top:0}#events[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover   .year[_ngcontent-%COMP%]{-webkit-text-stroke:#f72923 1px}#events[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]{font-size:1.1em}#pastevents[_ngcontent-%COMP%]{background-color:#000;color:#fff;margin-top:10%;margin-left:-3%;margin-right:-3%;padding:3%}#pastevents[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], #pastevents[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], #pastevents[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#fff}#pastevents[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:1.1em}#pastevents[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:1.05em;text-transform:uppercase}#pastevents[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]   .year[_ngcontent-%COMP%]{font-size:1.4em}@media (max-width: 47.99em){#pastevents[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], #pastevents[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin-top:0}}#pastevents[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{transition:transform .2s ease-in-out}#pastevents[_ngcontent-%COMP%]   hr[_ngcontent-%COMP%]{border-bottom:solid 1px rgba(255,255,255,.3)}#pastevents[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover   svg[_ngcontent-%COMP%]{transform:translate(15%)}#pastevents[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]{color:#fff;font-size:.9em;line-height:1.29}']}),e})();var p=l(6144),M=l(35427),b=l(64514),O=l(66620),T=l(40817);const w=["backgroundEnd"];function P(e,o){if(1&e&&(n.TgZ(0,"div",18),n.TgZ(1,"h4"),n._uU(2,"Website"),n.qZA(),n.TgZ(3,"a",19),n._uU(4),n.ALo(5,"prettyUrl"),n.qZA(),n.qZA()),2&e){const t=n.oxw(2);n.xp6(3),n.s9C("href",null==t.content?null:t.content.eventUrl,n.LSH),n.xp6(1),n.Oqu(n.lcZ(5,2,null==t.content?null:t.content.eventUrl))}}function I(e,o){if(1&e&&n._UZ(0,"app-button",20),2&e){const t=n.oxw(2);n.s9C("label",null==t.content?null:t.content.buttonTxt),n.s9C("href",null==t.content?null:t.content.eventUrl),n.Q6J("ariaLabel","Go to "+(null==t.content?null:t.content.name)+" website")}}function A(e,o){1&e&&n._UZ(0,"div",2)}function q(e,o){if(1&e&&n._UZ(0,"cdn-image",30),2&e){const t=n.oxw(4);n.s9C("cloudinaryId",null==t.content?null:t.content.videoThumbnail.public_id),n.Q6J("alt","Preview thumbnail image for "+(null==t.content?null:t.content.name)+" video.")}}function U(e,o){1&e&&n._UZ(0,"img",31)}function E(e,o){if(1&e){const t=n.EpF();n.TgZ(0,"a",24),n.NdJ("click",function(){return n.CHM(t),n.oxw(3).embedVideo()}),n.YNc(1,q,1,2,"cdn-image",25),n.YNc(2,U,1,0,"img",26),n.TgZ(3,"span",27),n.O4$(),n.TgZ(4,"svg",28),n._UZ(5,"path",29),n.qZA(),n.qZA(),n.qZA()}if(2&e){const t=n.oxw(3);n.xp6(1),n.Q6J("ngIf",(null==t.content?null:t.content.videoThumbnail.public_id.length)>0),n.xp6(1),n.Q6J("ngIf",0===(null==t.content?null:t.content.videoThumbnail.public_id.length))}}function k(e,o){if(1&e&&(n.TgZ(0,"div",32),n.TgZ(1,"div",33),n._UZ(2,"iframe",34),n.qZA(),n.qZA()),2&e){const t=n.oxw(3);n.xp6(2),n.Q6J("src",t.videoUrl,n.uOi)}}function L(e,o){if(1&e&&(n.TgZ(0,"div",21),n.YNc(1,E,6,2,"a",22),n.YNc(2,k,3,1,"div",23),n.qZA()),2&e){const t=n.oxw(2);n.xp6(1),n.Q6J("ngIf",!t.videoDisplayToggle&&(null==t.content?null:t.content.videoThumbnail)),n.xp6(1),n.Q6J("ngIf",!0===t.videoDisplayToggle)}}function J(e,o){if(1&e&&n._UZ(0,"cdn-image",43),2&e){const t=n.oxw(3);n.s9C("cloudinaryId",null==t.content?null:t.content.images[0].public_id),n.MGl("alt","Image for '",null==t.content?null:t.content.name,"' event")}}function N(e,o){if(1&e&&n._UZ(0,"cdn-image",44),2&e){const t=n.oxw(3);n.s9C("cloudinaryId",null==t.content?null:t.content.images[1].public_id),n.MGl("alt","Image for '",null==t.content?null:t.content.name,"' event")}}function Q(e,o){if(1&e&&n._UZ(0,"cdn-image",45),2&e){const t=n.oxw(3);n.s9C("cloudinaryId",void 0!==(null==t.content?null:t.content.images)&&(null==t.content?null:t.content.images[2].public_id)),n.MGl("alt","Image for '",null==t.content?null:t.content.name,"' event")}}function Y(e,o){if(1&e&&n._UZ(0,"cdn-image",46),2&e){const t=n.oxw(3);n.s9C("cloudinaryId",t.thirdImgId),n.MGl("alt","Image for '",null==t.content?null:t.content.name,"' event")}}function z(e,o){if(1&e&&(n.TgZ(0,"div",35),n.TgZ(1,"div",36),n.YNc(2,J,1,2,"cdn-image",37),n.qZA(),n.TgZ(3,"div",36),n.YNc(4,N,1,2,"cdn-image",38),n.qZA(),n.TgZ(5,"div",39),n.YNc(6,Q,1,2,"cdn-image",40),n.qZA(),n.TgZ(7,"div",41),n.YNc(8,Y,1,2,"cdn-image",42),n.qZA(),n.qZA()),2&e){const t=n.oxw(2);n.xp6(2),n.Q6J("ngIf",void 0!==(null==t.content?null:t.content.images[0])),n.xp6(2),n.Q6J("ngIf",void 0!==(null==t.content?null:t.content.images[1])),n.xp6(2),n.Q6J("ngIf",void 0!==(null==t.content?null:t.content.images)&&void 0!==(null==t.content?null:t.content.images[2])),n.xp6(2),n.Q6J("ngIf",t.thirdImgId)}}function G(e,o){if(1&e&&n._UZ(0,"cdn-image",43),2&e){const t=n.oxw(3);n.s9C("cloudinaryId",null==t.content?null:t.content.images[0].public_id),n.MGl("alt","Image for '",null==t.content?null:t.content.name,"' event")}}function B(e,o){if(1&e&&n._UZ(0,"cdn-image",44),2&e){const t=n.oxw(3);n.s9C("cloudinaryId",null==t.content?null:t.content.images[1].public_id),n.MGl("alt","Image for '",null==t.content?null:t.content.name,"' event")}}function D(e,o){if(1&e&&n._UZ(0,"cdn-image",45),2&e){const t=n.oxw(3);n.s9C("cloudinaryId",void 0!==(null==t.content?null:t.content.images)&&(null==t.content?null:t.content.images[2].public_id)),n.MGl("alt","Image for '",null==t.content?null:t.content.name,"' event")}}function S(e,o){if(1&e&&n._UZ(0,"cdn-image",46),2&e){const t=n.oxw(3);n.s9C("cloudinaryId",void 0!==(null==t.content?null:t.content.images)&&(null==t.content?null:t.content.images[3].public_id)),n.MGl("alt","Image for '",null==t.content?null:t.content.name,"' event")}}function j(e,o){if(1&e&&(n.TgZ(0,"div",35),n.TgZ(1,"div",36),n.YNc(2,G,1,2,"cdn-image",37),n.qZA(),n.TgZ(3,"div",36),n.YNc(4,B,1,2,"cdn-image",38),n.qZA(),n.TgZ(5,"div",39),n.YNc(6,D,1,2,"cdn-image",40),n.qZA(),n.TgZ(7,"div",41),n.YNc(8,S,1,2,"cdn-image",42),n.qZA(),n.qZA()),2&e){const t=n.oxw(2);n.xp6(2),n.Q6J("ngIf",void 0!==(null==t.content?null:t.content.images[0])),n.xp6(2),n.Q6J("ngIf",(null==t.content?null:t.content.images.length)>0&&void 0!==(null==t.content?null:t.content.images)&&void 0!==(null==t.content?null:t.content.images[1])),n.xp6(2),n.Q6J("ngIf",void 0!==(null==t.content?null:t.content.images)&&void 0!==(null==t.content?null:t.content.images[2])),n.xp6(2),n.Q6J("ngIf",void 0!==(null==t.content?null:t.content.images)&&void 0!==(null==t.content?null:t.content.images[3]))}}function F(e,o){if(1&e&&(n.TgZ(0,"a",47),n._UZ(1,"hr",48),n.TgZ(2,"div"),n.TgZ(3,"h1",49),n._uU(4," previous event "),n.qZA(),n.TgZ(5,"h2"),n._uU(6),n.qZA(),n.O4$(),n.TgZ(7,"svg",50),n._UZ(8,"path",51),n.qZA(),n.qZA(),n.qZA()),2&e){const t=n.oxw(2);n.MGl("routerLink","/events/",t.previous.key,""),n.xp6(6),n.Oqu(t.previous.name)}}function R(e,o){if(1&e&&(n.TgZ(0,"div",15),n.TgZ(1,"a",52),n._UZ(2,"hr",48),n.TgZ(3,"div"),n.TgZ(4,"h1",49),n._uU(5," next event "),n.qZA(),n.TgZ(6,"h2"),n._uU(7),n.qZA(),n.O4$(),n.TgZ(8,"svg",50),n._UZ(9,"path",51),n.qZA(),n.qZA(),n.qZA(),n.qZA()),2&e){const t=n.oxw(2);n.xp6(1),n.MGl("routerLink","/events/",t.next.key,""),n.xp6(6),n.Oqu(t.next.name)}}function $(e,o){if(1&e&&(n.TgZ(0,"div"),n.TgZ(1,"div",1),n.TgZ(2,"h2",2),n._uU(3),n.qZA(),n.qZA(),n.TgZ(4,"div",3),n.TgZ(5,"div",4),n._uU(6),n.ALo(7,"date"),n.qZA(),n.YNc(8,P,6,4,"div",5),n.YNc(9,I,1,3,"app-button",6),n.YNc(10,A,1,0,"div",7),n.YNc(11,L,3,2,"div",8),n.TgZ(12,"div",9,10),n.TgZ(14,"div",11),n._uU(15),n.qZA(),n._UZ(16,"div",12),n.YNc(17,z,9,4,"div",13),n.qZA(),n.YNc(18,j,9,4,"div",13),n.qZA(),n.TgZ(19,"section",14),n.TgZ(20,"div",15),n.YNc(21,F,9,2,"a",16),n.qZA(),n.YNc(22,R,10,2,"div",17),n.qZA(),n.qZA()),2&e){const t=n.oxw();n.xp6(3),n.Oqu(null==t.content?null:t.content.name),n.xp6(3),n.hij(" ",n.xi3(7,14,null==t.content?null:t.content.date,"MMMM dd, yyyy")," "),n.xp6(2),n.Q6J("ngIf",(null==t.content?null:t.content.eventUrl)&&(null==t.content?null:t.content.eventUrl.length)>0&&!(null!=t.content&&t.content.showButton)),n.xp6(1),n.Q6J("ngIf",null==t.content?null:t.content.showButton),n.xp6(1),n.Q6J("ngIf",null==t.content?null:t.content.videoId),n.xp6(1),n.Q6J("ngIf",null==t.content?null:t.content.videoId),n.xp6(1),n.ekj("is-full",!(null!=t.content&&t.content.videoId)),n.xp6(3),n.hij(" ",null==t.content?null:t.content.shortDescription," "),n.xp6(1),n.Q6J("innerHtml",null==t.content?null:t.content.description.html,n.oJD),n.xp6(1),n.Q6J("ngIf",!(null!=t.content&&t.content.videoId)&&void 0!==(null==t.content?null:t.content.images)&&(null==t.content?null:t.content.images.length)>0),n.xp6(1),n.Q6J("ngIf",(null==t.content?null:t.content.videoId)&&void 0!==(null==t.content?null:t.content.images)&&(null==t.content?null:t.content.images.length)>0),n.xp6(3),n.Q6J("ngIf",t.previous),n.xp6(1),n.Q6J("ngIf",t.next)}}const H=[{path:"",component:C},{path:":key",component:(()=>{class e{constructor(t,i,c,d){this.dataSvc=t,this.route=i,this.router=c,this.sanitizer=d,this.subscriber=c.events.subscribe(V=>(0,m.mG)(this,void 0,void 0,function*(){if(!(V instanceof a.m2))return;const{key:f}=this.route.snapshot.params;this.content=void 0;const X=`\n            {\n                getEvent(key: "${f}") {\n                    event {\n                        name\n                        key\n                        date\n                        shortDescription \n                        eventUrl\n                        description\n                        {\n                            html\n                        }\n                        showButton\n                        buttonTxt\n                        images {\n                            public_id\n                        }\n                        videoId\n                        videoThumbnail {\n                            public_id\n                        }\n                    }\n                    prev {\n                        name\n                        key\n                    }\n                    next {\n                        name\n                        key\n                    }\n                }\n            }\n        `,v=yield this.dataSvc.getSetWithKey("events",f,X);v&&this.setContent(v.getEvent)}))}ngOnDestroy(){this.subscriber.unsubscribe()}setContent(t){this.content=t.event,this.next=t.next,this.previous=t.prev[0],this.videoUrl=this.sanitizer.bypassSecurityTrustResourceUrl(`https://player.vimeo.com/video/${this.content.videoId}?autoplay=1&color=00ab9e&byline=0&portrait=0`),this.content.images&&this.content.images.length>=4&&(this.thirdImgId=this.content.images[3].public_id)}embedVideo(){this.videoDisplayToggle=!0}keyEvent(t){t.keyCode===p.S.RIGHT_ARROW&&this.router.navigateByUrl(`/events/${this.next.key}`),t.keyCode===p.S.LEFT_ARROW&&this.router.navigateByUrl(`/events/${this.previous.key}`)}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(r.D),n.Y36(a.gz),n.Y36(a.F0),n.Y36(M.H7))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-event"]],viewQuery:function(t,i){if(1&t&&n.Gf(w,5),2&t){let c;n.iGM(c=n.CRH())&&(i.backgroundEnd=c.first)}},hostBindings:function(t,i){1&t&&n.NdJ("keyup",function(d){return i.keyEvent(d)},!1,n.Jf7)},decls:1,vars:1,consts:[[4,"ngIf"],["id","name",1,"columns","is-multiline"],[1,"column","is-full"],[1,"columns","is-mobile","is-multiline"],["id","date",1,"column","is-full-tablet","is-11-mobile"],["class","column",4,"ngIf"],["class","column is-4-tablet",3,"label","href","ariaLabel",4,"ngIf"],["class","column is-full",4,"ngIf"],["id","video","class","column is-full-mobile is-full-tablet is-half-desktop",4,"ngIf"],[1,"description","column"],["description",""],["id","short",1,"column","is-11-mobile","is-three-quarters-tablet"],[1,"column","is-11-mobile","is-three-quarters-tablet",3,"innerHtml"],["class","columns is-mobile is-multiline is-centered",4,"ngIf"],["id","nextprev",1,"columns","is-mobile","is-multiline","listing","no-margin"],[1,"item","column","is-11-mobile","is-half-tablet"],["id","prev","class","prev",3,"routerLink",4,"ngIf"],["class","item column  is-11-mobile is-half-tablet",4,"ngIf"],[1,"column"],["role","link",3,"href"],[1,"column","is-4-tablet",3,"label","href","ariaLabel"],["id","video",1,"column","is-full-mobile","is-full-tablet","is-half-desktop"],["id","video-thumb",3,"routerLink","click",4,"ngIf"],["id","video-embed","class","embed",4,"ngIf"],["id","video-thumb",3,"routerLink","click"],["cloudinaryPrefix","/","autoFormat","true",3,"cloudinaryId","alt",4,"ngIf"],["src","https://dummyimage.com/500x300/cfcfcf/ff0000.png&text=Needs+thumbnail","alt","Preview image thumbnail for video with text saying 'Needs thumbnail'",4,"ngIf"],[1,"icon"],["width","80","height","80","fill","none","viewBox","0 0 80 80"],["fill","#fff","d","M40 0C17.92 0 0 17.92 0 40s17.92 40 40 40 40-17.92 40-40S62.08 0 40 0zM29.44 55.84V24.16L56.96 40 29.44 55.84z"],["cloudinaryPrefix","/","autoFormat","true",3,"cloudinaryId","alt"],["src","https://dummyimage.com/500x300/cfcfcf/ff0000.png&text=Needs+thumbnail","alt","Preview image thumbnail for video with text saying 'Needs thumbnail'"],["id","video-embed",1,"embed"],[1,"frame"],["frameborder","0","allow","autoplay; fullscreen; picture-in-picture","allowfullscreen","",3,"src"],[1,"columns","is-mobile","is-multiline","is-centered"],[1,"column","is-11-mobile","is-one-third-tablet"],["cloudinaryPrefix","/","height","450",3,"cloudinaryId","alt",4,"ngIf"],["cloudinaryPrefix","/","height","700",3,"cloudinaryId","alt",4,"ngIf"],[1,"column","is-11-mobile","is-5-tablet"],["cloudinaryPrefix","/","height","725",3,"cloudinaryId","alt",4,"ngIf"],[1,"column","is-11-mobile","is-7-tablet"],["cloudinaryPrefix","/","width","700",3,"cloudinaryId","alt",4,"ngIf"],["cloudinaryPrefix","/","height","450",3,"cloudinaryId","alt"],["cloudinaryPrefix","/","height","700",3,"cloudinaryId","alt"],["cloudinaryPrefix","/","height","725",3,"cloudinaryId","alt"],["cloudinaryPrefix","/","width","700",3,"cloudinaryId","alt"],["id","prev",1,"prev",3,"routerLink"],[1,"hidden-mobile"],[1,"uppercase"],["width","32","height","23","fill","none","viewBox","0 0 32 23"],["stroke","#000","d","M.5 11.309h29.788M19.968 1L30.5 11.5 19.968 22"],["id","next",3,"routerLink"]],template:function(t,i){1&t&&n.YNc(0,$,23,17,"div",0),2&t&&n.Q6J("ngIf",i.content)},directives:[s.O5,b.r,a.yS,O._],pipes:[s.uU,T.n],styles:['@import"https://fonts.googleapis.com/css?family=Overpass:400,600,900&display=swap";@font-face{font-family:"LunchtypeRegular";font-display:swap;src:url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943334/homepage-2.0/fonts/lunchtype22-regular-webfont.woff2) format("woff2"),url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943334/homepage-2.0/fonts/lunchtype22-regular-webfont.woff) format("woff"),url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943478/homepage-2.0/fonts/Lunchtype22-Regular.ttf) format("truetype")}@font-face{font-family:"LunchtypeMedium";font-display:swap;src:url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943334/homepage-2.0/fonts/lunchtype22-medium-webfont.woff2) format("woff2"),url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943334/homepage-2.0/fonts/lunchtype22-medium-webfont.woff) format("woff"),url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943478/homepage-2.0/fonts/Lunchtype22-Medium.ttf) format("truetype")}.small[_ngcontent-%COMP%]{font-size:small}.large[_ngcontent-%COMP%]{font-size:large}.xx-large[_ngcontent-%COMP%]{font-size:xx-large}.uppercase[_ngcontent-%COMP%]{text-transform:uppercase}.center[_ngcontent-%COMP%]{text-align:center}.hidden[_ngcontent-%COMP%]{display:none}@media (min-width: 64em){.hidden-desktop[_ngcontent-%COMP%]{display:none}}@media (min-width: 48em){.hidden-tablet-plus[_ngcontent-%COMP%]{display:none}}@media (max-width: 47.99em){.hidden-mobile[_ngcontent-%COMP%]{display:none}}@media (min-width: 26.5625em){.hidden-not-mobile[_ngcontent-%COMP%]{display:none}}.no-margin[_ngcontent-%COMP%]{margin:0}.no-pad[_ngcontent-%COMP%]{padding:0}@media (max-width: 47.99em){#name[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin-top:40%;margin-bottom:13%}}#date[_ngcontent-%COMP%]{font-family:"Overpass",sans-serif;font-size:.9em;font-weight:600;line-height:1.29;letter-spacing:.8px}#short[_ngcontent-%COMP%]{font-size:1.1em;line-height:1.11;letter-spacing:.3px;margin-top:10%}@media (min-width: 48em){#short[_ngcontent-%COMP%]{font-size:1.5em}}#video[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:block;position:relative}#video[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{transition:transform .15s ease-in-out;position:absolute;left:calc(50% - 40px);top:calc(50% - 40px)}@media (max-width: 47.99em){#video[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{left:calc(50% - 12px);top:calc(50% - 12px)}}#video[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover   .icon[_ngcontent-%COMP%]{transform:scale(1.2)}#video[_ngcontent-%COMP%]   #video-embed[_ngcontent-%COMP%]   .frame[_ngcontent-%COMP%]{position:relative;padding:56.25% 0 0}#video[_ngcontent-%COMP%]   #video-embed[_ngcontent-%COMP%]   iframe[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%}#prev[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{transform:rotate(-180deg)}#prev[_ngcontent-%COMP%]:hover   svg[_ngcontent-%COMP%]{transform:rotate(-180deg) translate(15%)}@media (min-width: 48em){#next[_ngcontent-%COMP%]{text-align:end}}']}),e})()}];let W=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[[a.Bz.forChild(H)],a.Bz]}),e})()}}]);