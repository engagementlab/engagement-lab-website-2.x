"use strict";(self.webpackChunkelab_web=self.webpackChunkelab_web||[]).push([[907],{8907:(dt,y,s)=>{s.r(y),s.d(y,{StudiosModule:()=>lt});var l=s(57725),p=s(64762),d=s(69814),t=s(83668),g=s(57443),f=s(35427),m=s(86019),_=s(66620);function b(e,o){if(1&e&&t._UZ(0,"cdn-image",14),2&e){const n=t.oxw(3);t.s9C("cloudinaryId",n.content.studiosIntro.videoThumbnail.public_id)}}function C(e,o){1&e&&t._UZ(0,"img",15)}function O(e,o){if(1&e){const n=t.EpF();t.TgZ(0,"a",8),t.NdJ("click",function(){return t.CHM(n),t.oxw(2).embedVideo()}),t.YNc(1,b,1,1,"cdn-image",9),t.YNc(2,C,1,0,"img",10),t.TgZ(3,"span",11),t.O4$(),t.TgZ(4,"svg",12),t._UZ(5,"path",13),t.qZA(),t.qZA(),t.qZA()}if(2&e){const n=t.oxw(2);t.xp6(1),t.Q6J("ngIf",n.content.studiosIntro.videoThumbnail),t.xp6(1),t.Q6J("ngIf",!n.content.studiosIntro.videoThumbnail)}}function M(e,o){if(1&e&&(t.TgZ(0,"div",16),t.TgZ(1,"div",17),t._UZ(2,"iframe",18),t.qZA(),t.qZA()),2&e){const n=t.oxw(2);t.xp6(2),t.Q6J("src",n.videoUrl,t.uOi)}}function Z(e,o){if(1&e&&(t.TgZ(0,"section",2),t.TgZ(1,"div",3),t.TgZ(2,"h2"),t._uU(3,"Social Impact Initiatives"),t.qZA(),t.TgZ(4,"h3",4),t._uU(5),t.qZA(),t.TgZ(6,"h4"),t._uU(7,"Intro Video"),t.qZA(),t.TgZ(8,"div",5),t.YNc(9,O,6,2,"a",6),t.YNc(10,M,3,1,"div",7),t.qZA(),t.qZA(),t.qZA()),2&e){const n=t.oxw();t.xp6(5),t.Oqu(n.content.studiosIntro.initiativesSummary),t.xp6(4),t.Q6J("ngIf",!n.videoDisplayToggle),t.xp6(1),t.Q6J("ngIf",n.videoDisplayToggle)}}function P(e,o){if(1&e&&(t.TgZ(0,"div"),t.TgZ(1,"a",23),t.TgZ(2,"h3"),t._uU(3),t.qZA(),t._UZ(4,"cdn-image",24),t.TgZ(5,"p"),t._uU(6),t.qZA(),t.qZA(),t.qZA()),2&e){const n=o.$implicit;t.xp6(1),t.MGl("routerLink","/initiatives/",n.key,""),t.xp6(2),t.hij(" ",n.name," "),t.xp6(1),t.s9C("cloudinaryId",n.thumb.public_id),t.Q6J("responsive",!0)("alt","Thumbnail image for initiative "+n.name),t.xp6(2),t.Oqu(n.description)}}function w(e,o){if(1&e&&(t.TgZ(0,"div",21),t.YNc(1,P,7,6,"div",22),t.qZA()),2&e){const n=t.oxw(2);t.xp6(1),t.Q6J("ngForOf",n.content.allStudioInitiatives)}}function T(e,o){if(1&e&&(t.TgZ(0,"section",19),t.YNc(1,w,2,1,"div",20),t.qZA()),2&e){const n=t.oxw();t.xp6(1),t.Q6J("ngIf",n.content)}}let I=(()=>{class e{constructor(n,i){this.dataSvc=n,this.sanitizer=i}ngOnInit(){return(0,p.mG)(this,void 0,void 0,function*(){const i=yield this.dataSvc.getSetWithKey("studios","intro","\n          {\n            studiosIntro {\n                  summary\n                  initiativesSummary\n                  video\n                  videoThumbnail {\n                    public_id\n                  }\n            }\n\n            allStudioInitiatives {\n              key\n              name\n              description\n              studios {\n                key\n              }\n              thumb { \n                  public_id\n              }\n            }\n          }\n      ");this.content=i,this.videoUrl=this.sanitizer.bypassSecurityTrustResourceUrl(`https://player.vimeo.com/video/${this.content.studiosIntro.video}?autoplay=1&color=00ab9e&byline=0&portrait=0`)})}embedVideo(){this.videoDisplayToggle=!0}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(g.D),t.Y36(f.H7))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-studios-index"]],decls:2,vars:2,consts:[["id","intro","class","columns is-mobile",4,"ngIf"],["id","types","class","columns is-mobile is-multiline no-margin",4,"ngIf"],["id","intro",1,"columns","is-mobile"],[1,"column","is-half-tablet","is-10-mobile"],[1,"blurb"],[1,"video"],["id","video-thumb",3,"routerLink","click",4,"ngIf"],["id","video-embed","class","embed",4,"ngIf"],["id","video-thumb",3,"routerLink","click"],["cloudinaryPrefix","/","autoFormat","true","alt","Preview thumbnail image for initiatives introduction video.",3,"cloudinaryId",4,"ngIf"],["src","https://dummyimage.com/500x300/cfcfcf/ff0000.png&text=Needs+thumbnail","alt","Preview image thumbnail for video with text saying 'Needs thumbnail'",4,"ngIf"],[1,"icon"],["width","80","height","80","fill","none","viewBox","0 0 80 80"],["fill","#fff","d","M40 0C17.92 0 0 17.92 0 40s17.92 40 40 40 40-17.92 40-40S62.08 0 40 0zM29.44 55.84V24.16L56.96 40 29.44 55.84z"],["cloudinaryPrefix","/","autoFormat","true","alt","Preview thumbnail image for initiatives introduction video.",3,"cloudinaryId"],["src","https://dummyimage.com/500x300/cfcfcf/ff0000.png&text=Needs+thumbnail","alt","Preview image thumbnail for video with text saying 'Needs thumbnail'"],["id","video-embed",1,"embed"],[1,"frame"],["frameborder","0","allow","autoplay; fullscreen; picture-in-picture","allowfullscreen","",3,"src"],["id","types",1,"columns","is-mobile","is-multiline","no-margin"],["class","column is-11-mobile is-6-tablet is-4-desktop",4,"ngIf"],[1,"column","is-11-mobile","is-6-tablet","is-4-desktop"],[4,"ngFor","ngForOf"],[3,"routerLink"],["cloudinaryPrefix","/","width","250","autoFormat","true",3,"cloudinaryId","responsive","alt"]],template:function(n,i){1&n&&(t.YNc(0,Z,11,3,"section",0),t.YNc(1,T,2,1,"section",1)),2&n&&(t.Q6J("ngIf",i.content),t.xp6(1),t.Q6J("ngIf",i.content))},directives:[m.O5,l.yS,_._,m.sg],styles:['@import"https://fonts.googleapis.com/css?family=Overpass:400,600,900&display=swap";@font-face{font-family:"LunchtypeRegular";font-display:swap;src:url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943334/homepage-2.0/fonts/lunchtype22-regular-webfont.woff2) format("woff2"),url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943334/homepage-2.0/fonts/lunchtype22-regular-webfont.woff) format("woff"),url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943478/homepage-2.0/fonts/Lunchtype22-Regular.ttf) format("truetype")}@font-face{font-family:"LunchtypeMedium";font-display:swap;src:url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943334/homepage-2.0/fonts/lunchtype22-medium-webfont.woff2) format("woff2"),url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943334/homepage-2.0/fonts/lunchtype22-medium-webfont.woff) format("woff"),url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943478/homepage-2.0/fonts/Lunchtype22-Medium.ttf) format("truetype")}.small[_ngcontent-%COMP%]{font-size:small}.large[_ngcontent-%COMP%]{font-size:large}.xx-large[_ngcontent-%COMP%]{font-size:xx-large}.uppercase[_ngcontent-%COMP%]{text-transform:uppercase}.center[_ngcontent-%COMP%]{text-align:center}.hidden[_ngcontent-%COMP%]{display:none}@media (min-width: 64em){.hidden-desktop[_ngcontent-%COMP%]{display:none}}@media (min-width: 48em){.hidden-tablet-plus[_ngcontent-%COMP%]{display:none}}@media (max-width: 47.99em){.hidden-mobile[_ngcontent-%COMP%]{display:none}}@media (min-width: 26.5625em){.hidden-not-mobile[_ngcontent-%COMP%]{display:none}}.no-margin[_ngcontent-%COMP%]{margin:0}.no-pad[_ngcontent-%COMP%]{padding:0}h3[_ngcontent-%COMP%]{font-family:"LunchtypeMedium",sans-serif}.video[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:block;position:relative}.video[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{transition:transform .15s ease-in-out;position:absolute;left:calc(50% - 40px);top:calc(50% - 40px)}@media (max-width: 47.99em){.video[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{left:calc(50% - 12px);top:calc(50% - 12px)}}.video[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover   .icon[_ngcontent-%COMP%]{transform:scale(1.2)}.video[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-family:"Overpass",sans-serif}.video[_ngcontent-%COMP%]   .embed[_ngcontent-%COMP%]   .frame[_ngcontent-%COMP%]{position:relative;padding:56.25% 0 0}.video[_ngcontent-%COMP%]   .embed[_ngcontent-%COMP%]   iframe[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%}#buttons[_ngcontent-%COMP%]{display:inline-flex;justify-content:space-around}@media (max-width: 47.99em){#buttons[_ngcontent-%COMP%]{flex-direction:column}}@media (max-width: 47.99em){#types[_ngcontent-%COMP%]{margin:0}}@media (max-width: 47.99em){#partners[_ngcontent-%COMP%]     img{width:100%!important}}#filters[_ngcontent-%COMP%]{font-family:"Overpass",sans-serif;width:100%}#filters[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{cursor:pointer}#filters[_ngcontent-%COMP%]   a.mixitup-control-active[_ngcontent-%COMP%]{text-decoration:underline}#filters[_ngcontent-%COMP%]   .bold[_ngcontent-%COMP%]{font-weight:900}@media (max-width: 47.99em){#filters[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]{display:flex;flex-direction:column}}#filters[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{margin-right:2%}#filters[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, #filters[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%]{border-bottom:1px solid black}.type[_ngcontent-%COMP%]{padding:0}.type[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:block;width:90%}.type[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]     img{padding:1%}.type[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:1.7em;margin-bottom:0}'],data:{animation:[(0,d.X$)("inOutAnimation",[(0,d.eR)(":enter",[(0,d.oB)({transform:"scale(0)"}),(0,d.jt)(".2s cubic-bezier(0.190, 1.000, 0.220, 1.000)",(0,d.oB)({transform:"scale(1)",opacity:1}))]),(0,d.eR)(":leave",[(0,d.oB)({transform:"scale(1)"}),(0,d.jt)(".2s cubic-bezier(0.190, 1.000, 0.220, 1.000)",(0,d.oB)({transform:"scale(0)",opacity:0}))])])]}}),e})();var S=s(51564);function A(e,o){1&e&&(t.TgZ(0,"h1",9),t._uU(1," Collaborators "),t.qZA())}function q(e,o){if(1&e&&t._UZ(0,"div",20),2&e){const n=t.oxw(2);t.Q6J("innerHtml",n.content.collaborators.html,t.oJD)}}function U(e,o){if(1&e&&(t.TgZ(0,"span"),t._uU(1),t.qZA()),2&e){const n=t.oxw(2);t.xp6(1),t.hij(" ",n.content.sponsorLabel," ")}}function J(e,o){1&e&&t._uU(0," Class Sponsor ")}function N(e,o){if(1&e&&(t.TgZ(0,"span"),t._uU(1),t.qZA()),2&e){const n=t.oxw(2);t.xp6(1),t.hij(" ",n.content.departmentLabel," ")}}function k(e,o){1&e&&t._uU(0," Department ")}function Y(e,o){if(1&e&&(t.TgZ(0,"span"),t.TgZ(1,"a",23),t._uU(2),t._UZ(3,"br"),t.qZA(),t.qZA()),2&e){const n=o.$implicit;t.xp6(1),t.s9C("href",n.file.url,t.LSH),t.xp6(1),t.Oqu(n.name)}}function Q(e,o){if(1&e&&(t.TgZ(0,"div",21),t.TgZ(1,"h1",9),t._uU(2," Related Links "),t.qZA(),t.YNc(3,Y,4,2,"span",22),t.qZA()),2&e){const n=t.oxw(2);t.xp6(3),t.Q6J("ngForOf",n.content.relatedLinks)}}function L(e,o){1&e&&(t.TgZ(0,"div",24),t._UZ(1,"hr"),t.TgZ(2,"h1"),t._uU(3,"Student Projects"),t.qZA(),t._UZ(4,"p",25),t.qZA())}function V(e,o){if(1&e&&(t.TgZ(0,"div",26),t._UZ(1,"cdn-image",27),t.TgZ(2,"div",28),t._uU(3),t.qZA(),t.TgZ(4,"p",29),t._uU(5),t.qZA(),t.qZA()),2&e){const n=t.oxw(2);t.xp6(1),t.s9C("cloudinaryId",n.content.primaryImage.public_id),t.Q6J("autoFormat",!0)("responsive",!0)("alt","Primary image for "+n.content.name+" thesis page.")("describedby","primary-caption"),t.xp6(2),t.Oqu(n.content.primaryImageCredit),t.xp6(2),t.Oqu(n.content.primaryImageDescription)}}function F(e,o){if(1&e&&t._UZ(0,"cdn-image",42),2&e){const n=t.oxw(2).index,i=t.oxw(3);t.s9C("cloudinaryId",i.content.galleryVideoThumbails[n].public_id),t.Q6J("alt","Preview thumbnail image for "+i.content.name+" video.")}}function z(e,o){1&e&&t._UZ(0,"img",43)}function D(e,o){if(1&e){const n=t.EpF();t.TgZ(0,"a",36),t.NdJ("click",function(){t.CHM(n);const c=t.oxw().index;return t.oxw(3).embedVideo(c)}),t.YNc(1,F,1,2,"cdn-image",37),t.YNc(2,z,1,0,"img",38),t.TgZ(3,"span",39),t.O4$(),t.TgZ(4,"svg",40),t._UZ(5,"path",41),t.qZA(),t.qZA(),t.qZA()}if(2&e){const n=t.oxw().index,i=t.oxw(3);t.MGl("id","video-thumb-",n,""),t.xp6(1),t.Q6J("ngIf",i.content.galleryVideoThumbails[n]),t.xp6(1),t.Q6J("ngIf",!i.content.galleryVideoThumbails[n])}}function j(e,o){if(1&e&&(t.TgZ(0,"div",44),t.TgZ(1,"div",45),t._UZ(2,"iframe",46),t.qZA(),t.qZA()),2&e){const n=t.oxw().index,i=t.oxw(3);t.MGl("id","video-embed-",n,""),t.xp6(2),t.Q6J("src",i.videoUrls[n],t.uOi)}}function H(e,o){if(1&e&&(t.TgZ(0,"div",32),t.YNc(1,D,6,3,"a",33),t.YNc(2,j,3,2,"div",34),t.TgZ(3,"p",35),t._uU(4),t.qZA(),t.TgZ(5,"p"),t._uU(6),t.qZA(),t.qZA()),2&e){const n=o.index,i=t.oxw(3);t.xp6(1),t.Q6J("ngIf",!i.videoDisplayToggle[n]),t.xp6(1),t.Q6J("ngIf",i.videoDisplayToggle[n]),t.xp6(2),t.hij(" ",i.content.galleryVideoTitles[n]," "),t.xp6(2),t.hij(" ",i.content.galleryVideoCaptions[n]," ")}}function R(e,o){if(1&e&&(t.TgZ(0,"div",30),t.YNc(1,H,7,4,"div",31),t.qZA()),2&e){const n=t.oxw(2);t.xp6(1),t.Q6J("ngForOf",n.content.galleryVideos)}}function $(e,o){1&e&&(t.TgZ(0,"div",3),t._UZ(1,"hr"),t._UZ(2,"slideshow",47),t.qZA())}function B(e,o){if(1&e&&(t.TgZ(0,"section",1),t.TgZ(1,"div",2),t.TgZ(2,"h2",3),t._uU(3),t.qZA(),t.TgZ(4,"div",4),t._uU(5),t.qZA(),t.TgZ(6,"div",5),t._UZ(7,"p",6),t.qZA(),t.TgZ(8,"div",3),t.YNc(9,A,2,0,"h1",7),t.YNc(10,q,1,1,"div",8),t.qZA(),t.TgZ(11,"div",3),t.TgZ(12,"h1",9),t.YNc(13,U,2,1,"span",10),t.YNc(14,J,1,0,"ng-template",null,11,t.W1O),t.qZA(),t._uU(16),t.qZA(),t.TgZ(17,"div",3),t.TgZ(18,"h1",9),t.YNc(19,N,2,1,"span",10),t.YNc(20,k,1,0,"ng-template",null,12,t.W1O),t.qZA(),t._uU(22),t.qZA(),t.TgZ(23,"div",3),t.TgZ(24,"h1",9),t._uU(25," Contact "),t.qZA(),t.TgZ(26,"span"),t._uU(27),t.qZA(),t.qZA(),t.YNc(28,Q,4,1,"div",13),t.qZA(),t._UZ(29,"hr"),t.TgZ(30,"div",2),t.TgZ(31,"div",14),t._UZ(32,"p",15),t.qZA(),t.YNc(33,L,5,0,"div",16),t.YNc(34,V,6,7,"div",17),t.YNc(35,R,2,1,"ng-template",null,18,t.W1O),t.YNc(37,$,3,0,"div",19),t.qZA(),t.qZA()),2&e){const n=t.MAs(15),i=t.MAs(21),c=t.MAs(36),a=t.oxw();t.xp6(3),t.Oqu(a.content.name),t.xp6(2),t.hij(" ",a.content.semester," "),t.xp6(2),t.Q6J("innerHtml",a.content.intro.html,t.oJD),t.xp6(2),t.Q6J("ngIf",a.content.collaborators&&a.content.collaborators.html),t.xp6(1),t.Q6J("ngIf",a.content.collaborators&&a.content.collaborators.html),t.xp6(3),t.Q6J("ngIf",a.content.sponsorLabel&&a.content.sponsorLabel.length>0)("ngIfElse",n),t.xp6(3),t.hij(" ",a.content.sponsor," "),t.xp6(3),t.Q6J("ngIf",a.content.departmentLabel&&a.content.departmentLabel.length>0)("ngIfElse",i),t.xp6(3),t.hij(" ",a.content.department," "),t.xp6(5),t.Oqu(a.content.contact),t.xp6(1),t.Q6J("ngIf",a.content.relatedLinks&&a.content.relatedLinks.length>0),t.xp6(4),t.Q6J("innerHtml",a.content.body.html,t.oJD),t.xp6(1),t.Q6J("ngIf",void 0!==a.content.studentProjects&&a.content.studentProjects.html),t.xp6(1),t.Q6J("ngIf",void 0===a.content.galleryVideos||0===a.content.galleryVideos.length)("ngIfElse",c),t.xp6(3),t.Q6J("ngIf",(null==a.content?null:a.content.galleryImages)&&(null==a.content?null:a.content.galleryImages.length)>0)}}let G=(()=>{class e{constructor(n,i,c,a){this.dataSvc=n,this.route=i,this.router=c,this.sanitizer=a,this.videoDisplayToggle=[!1],this.subscriber=c.events.subscribe(h=>(0,p.mG)(this,void 0,void 0,function*(){if(!(h instanceof l.m2))return;const{key:u}=this.route.snapshot.params;this.content=void 0;const v=`\n            {\n                getStudio(key: "${u}") {\n                  key\n                  name\n                  status\n                  semester\n                  department\n                  departmentLabel\n                  sponsor\n                  sponsorLabel\n                  relatedLinks {\n                      url\n                      name\n                      file {\n                          url\n                      }\n                  }\n                  collaborators {\n                      html\n                  }\n                  contact\n                  intro {\n                      html\n                  }\n                  body {\n                      html\n                  }\n                  studentProjects {\n                      html\n                  }\n                  introduction {\n                      html\n                  }\n                  impact {\n                      html\n                  }\n                  roles {\n                      html\n                  }\n                  bgImage {\n                      public_id\n                  }\n                  galleryImages {\n                      public_id\n                  }\n                  galleryImageCaptions\n                  primaryImage {\n                    public_id\n                  }\n                  primaryImageDescription\n                  primaryImageCredit\n                  galleryVideos\n                  galleryVideoTitles\n                  galleryVideoCaptions\n                  galleryVideoThumbails {\n                      public_id\n                  }\n                }\n            }\n        `,r=yield this.dataSvc.getSetWithKey("studios",u,v);r&&r.getStudio?this.setContent(r.getStudio):c.navigateByUrl("uh-oh")}))}ngOnDestroy(){this.subscriber.unsubscribe()}setContent(n){this.content=n,this.videoUrls=this.content.galleryVideos.map(i=>(this.videoDisplayToggle.push(!1),this.sanitizer.bypassSecurityTrustResourceUrl(`https://player.vimeo.com/video/${i}?autoplay=1&color=00ab9e&byline=0&portrait=0`)))}embedVideo(n){this.videoDisplayToggle[n]=!0}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(g.D),t.Y36(l.gz),t.Y36(l.F0),t.Y36(f.H7))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-studio"]],decls:1,vars:1,consts:[["id","bg",4,"ngIf"],["id","bg"],[1,"columns","is-multiline"],[1,"column","is-full"],[1,"blurb","column","is-four-fifths-desktop"],[1,"column","is-half"],[3,"innerHtml"],["class","uppercase sm",4,"ngIf"],["id","collaborators",3,"innerHtml",4,"ngIf"],[1,"uppercase","sm"],[4,"ngIf","ngIfElse"],["defaultLabel",""],["defaultDeptLabel",""],["class","column is-4",4,"ngIf"],[1,"column","is-8-tablet","is-11-mobile"],["id","body",3,"innerHtml"],["id","projects","class","column is-8-tablet is-11-mobile is-offset-4-tablet",4,"ngIf"],["class","column is-9",4,"ngIf","ngIfElse"],["showVideos",""],["class","column is-full",4,"ngIf"],["id","collaborators",3,"innerHtml"],[1,"column","is-4"],[4,"ngFor","ngForOf"],[3,"href"],["id","projects",1,"column","is-8-tablet","is-11-mobile","is-offset-4-tablet"],["id","projects","innerHtml",t.$cX`content?.studentProjects.html`],[1,"column","is-9"],["cloudinaryPrefix","/","width","1044",3,"cloudinaryId","autoFormat","responsive","alt","describedby"],["id","primary-credit"],["id","primary-caption"],[1,"column","columns","is-multiline","is-full","videos"],["class","video column is-11-mobile is-5-tablet",4,"ngFor","ngForOf"],[1,"video","column","is-11-mobile","is-5-tablet"],[3,"id","routerLink","click",4,"ngIf"],["class","embed",3,"id",4,"ngIf"],[1,"title","uppercase"],[3,"id","routerLink","click"],["cloudinaryPrefix","/","autoFormat","true",3,"cloudinaryId","alt",4,"ngIf"],["src","https://dummyimage.com/500x300/cfcfcf/ff0000.png&text=Needs+thumbnail","alt","Preview image thumbnail for video with text saying 'Needs thumbnail'",4,"ngIf"],[1,"icon"],["width","80","height","80","fill","none","viewBox","0 0 80 80"],["fill","#fff","d","M40 0C17.92 0 0 17.92 0 40s17.92 40 40 40 40-17.92 40-40S62.08 0 40 0zM29.44 55.84V24.16L56.96 40 29.44 55.84z"],["cloudinaryPrefix","/","autoFormat","true",3,"cloudinaryId","alt"],["src","https://dummyimage.com/500x300/cfcfcf/ff0000.png&text=Needs+thumbnail","alt","Preview image thumbnail for video with text saying 'Needs thumbnail'"],[1,"embed",3,"id"],[1,"frame"],["frameborder","0","allow","autoplay; fullscreen; picture-in-picture","allowfullscreen","",3,"src"],["images","content?.galleryImages","title","content?.name","captions","content?.galleryImageCaptions"]],template:function(n,i){1&n&&t.YNc(0,B,38,18,"section",0),2&n&&t.Q6J("ngIf",void 0!==i.content)},directives:[m.O5,m.sg,_._,l.yS,S.Y],styles:['@import"https://fonts.googleapis.com/css?family=Overpass:400,600,900&display=swap";@font-face{font-family:"LunchtypeRegular";font-display:swap;src:url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943334/homepage-2.0/fonts/lunchtype22-regular-webfont.woff2) format("woff2"),url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943334/homepage-2.0/fonts/lunchtype22-regular-webfont.woff) format("woff"),url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943478/homepage-2.0/fonts/Lunchtype22-Regular.ttf) format("truetype")}@font-face{font-family:"LunchtypeMedium";font-display:swap;src:url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943334/homepage-2.0/fonts/lunchtype22-medium-webfont.woff2) format("woff2"),url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943334/homepage-2.0/fonts/lunchtype22-medium-webfont.woff) format("woff"),url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943478/homepage-2.0/fonts/Lunchtype22-Medium.ttf) format("truetype")}.small[_ngcontent-%COMP%]{font-size:small}.large[_ngcontent-%COMP%]{font-size:large}.xx-large[_ngcontent-%COMP%]{font-size:xx-large}.uppercase[_ngcontent-%COMP%]{text-transform:uppercase}.center[_ngcontent-%COMP%]{text-align:center}.hidden[_ngcontent-%COMP%]{display:none}@media (min-width: 64em){.hidden-desktop[_ngcontent-%COMP%]{display:none}}@media (min-width: 48em){.hidden-tablet-plus[_ngcontent-%COMP%]{display:none}}@media (max-width: 47.99em){.hidden-mobile[_ngcontent-%COMP%]{display:none}}@media (min-width: 26.5625em){.hidden-not-mobile[_ngcontent-%COMP%]{display:none}}.no-margin[_ngcontent-%COMP%]{margin:0}.no-pad[_ngcontent-%COMP%]{padding:0}#bg[_ngcontent-%COMP%]{background-color:#fffffff2;padding:3%}h1.sm[_ngcontent-%COMP%]{font-size:1.05em}h3[_ngcontent-%COMP%]{font-family:"Overpass",sans-serif}.videos[_ngcontent-%COMP%]   .video[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:block;position:relative}.videos[_ngcontent-%COMP%]   .video[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{transition:transform .15s ease-in-out;position:absolute;left:calc(50% - 40px);top:calc(50% - 40px)}@media (max-width: 47.99em){.videos[_ngcontent-%COMP%]   .video[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{left:calc(50% - 12px);top:calc(50% - 12px)}}.videos[_ngcontent-%COMP%]   .video[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover   .icon[_ngcontent-%COMP%]{transform:scale(1.2)}.videos[_ngcontent-%COMP%]   .video[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-family:"Overpass",sans-serif}.videos[_ngcontent-%COMP%]   .video[_ngcontent-%COMP%]   .embed[_ngcontent-%COMP%]   .frame[_ngcontent-%COMP%]{position:relative;padding:56.25% 0 0}.videos[_ngcontent-%COMP%]   .video[_ngcontent-%COMP%]   .embed[_ngcontent-%COMP%]   iframe[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%}#body[_ngcontent-%COMP%]  h1{text-transform:uppercase}#body[_ngcontent-%COMP%]  a{color:#00e}#projects[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{text-transform:uppercase}#projects[_ngcontent-%COMP%]  em{display:block}#projects[_ngcontent-%COMP%]  a{color:#00e}#primary-credit[_ngcontent-%COMP%]{opacity:.6;font-size:smaller}#collaborators[_ngcontent-%COMP%]     h4{font-family:"LunchtypeRegular",sans-serif;font-weight:normal;font-size:1em}#collaborators[_ngcontent-%COMP%]     ul{margin-top:0;padding:0;list-style:none}#collaborators[_ngcontent-%COMP%]     p{margin:0}']}),e})();var E=s(64514);function W(e,o){if(1&e&&(t.TgZ(0,"div",3),t._UZ(1,"app-button",9),t.qZA()),2&e){const n=t.oxw(2);t.xp6(1),t.s9C("href",n.content.url),t.Q6J("ariaLabel","Go to "+n.content.name+" website")}}function X(e,o){if(1&e&&t._UZ(0,"cdn-image",23),2&e){const n=t.oxw(2).index,i=t.oxw(3);t.s9C("cloudinaryId",i.content.galleryVideoThumbails[n].public_id),t.Q6J("alt","Preview thumbnail image for "+i.content.name+" video.")}}function K(e,o){1&e&&t._UZ(0,"img",24)}function tt(e,o){if(1&e){const n=t.EpF();t.TgZ(0,"a",17),t.NdJ("click",function(){t.CHM(n);const c=t.oxw().index;return t.oxw(3).embedVideo(c)}),t.YNc(1,X,1,2,"cdn-image",18),t.YNc(2,K,1,0,"img",19),t.TgZ(3,"span",20),t.O4$(),t.TgZ(4,"svg",21),t._UZ(5,"path",22),t.qZA(),t.qZA(),t.qZA()}if(2&e){const n=t.oxw().index,i=t.oxw(3);t.MGl("id","video-thumb-",n,""),t.xp6(1),t.Q6J("ngIf",i.content.galleryVideoThumbails[n]),t.xp6(1),t.Q6J("ngIf",!i.content.galleryVideoThumbails[n])}}function nt(e,o){if(1&e&&(t.TgZ(0,"div",25),t.TgZ(1,"div",26),t._UZ(2,"iframe",27),t.qZA(),t.qZA()),2&e){const n=t.oxw().index,i=t.oxw(3);t.MGl("id","video-embed-",n,""),t.xp6(2),t.Q6J("src",i.videoUrls[n],t.uOi)}}function et(e,o){if(1&e&&(t.TgZ(0,"div",13),t.YNc(1,tt,6,3,"a",14),t.YNc(2,nt,3,2,"div",15),t.TgZ(3,"p",16),t._uU(4),t.qZA(),t.TgZ(5,"p"),t._uU(6),t.qZA(),t.qZA()),2&e){const n=o.index,i=t.oxw(3);t.xp6(1),t.Q6J("ngIf",!i.videoDisplayToggle[n]),t.xp6(1),t.Q6J("ngIf",i.videoDisplayToggle[n]),t.xp6(2),t.hij(" ",i.content.galleryVideoTitles[n]," "),t.xp6(2),t.hij(" ",i.content.galleryVideoCaptions[n]," ")}}function ot(e,o){if(1&e&&(t.TgZ(0,"div",10),t.TgZ(1,"h1",11),t._uU(2,"Videos"),t.qZA(),t.YNc(3,et,7,4,"div",12),t.qZA()),2&e){const n=t.oxw(2);t.xp6(3),t.Q6J("ngForOf",n.content.galleryVideos)}}function it(e,o){if(1&e&&(t.TgZ(0,"div",32),t.TgZ(1,"a",33),t._UZ(2,"cdn-image",34),t.TgZ(3,"h4"),t._uU(4),t.qZA(),t.qZA(),t.qZA()),2&e){const n=o.$implicit;t.xp6(1),t.MGl("routerLink","/studios/studio/",n.key,""),t.xp6(1),t.s9C("cloudinaryId",n.thumb.public_id),t.Q6J("responsive",!0)("alt","Thumbnail image for studio "+n.name),t.xp6(2),t.Oqu(n.name)}}function at(e,o){if(1&e&&(t.TgZ(0,"section",28),t.TgZ(1,"h1",29),t._uU(2,"Studios"),t.qZA(),t.TgZ(3,"div",30),t.YNc(4,it,5,5,"div",31),t.qZA(),t.qZA()),2&e){const n=t.oxw(2);t.xp6(4),t.Q6J("ngForOf",n.content.studios)}}function ct(e,o){if(1&e&&(t.TgZ(0,"section",1),t.TgZ(1,"div",2),t.TgZ(2,"h2",3),t._uU(3),t.qZA(),t.TgZ(4,"div",4),t.TgZ(5,"p"),t._uU(6),t.qZA(),t.qZA(),t.YNc(7,W,2,2,"div",5),t.qZA(),t._UZ(8,"hr"),t.TgZ(9,"div",2),t.TgZ(10,"div",3),t._UZ(11,"p",6),t.qZA(),t.YNc(12,ot,4,1,"div",7),t.qZA(),t.YNc(13,at,5,1,"section",8),t.qZA()),2&e){const n=t.oxw();t.xp6(3),t.Oqu(n.content.name),t.xp6(3),t.Oqu(n.content.longDescription),t.xp6(1),t.Q6J("ngIf",n.content.url),t.xp6(4),t.Q6J("innerHtml",n.content.body.html,t.oJD),t.xp6(1),t.Q6J("ngIf",n.videoUrls&&n.videoUrls.length>0),t.xp6(1),t.Q6J("ngIf",n.content)}}let x=(()=>{class e{constructor(n,i,c,a){this.dataSvc=n,this.route=i,this.router=c,this.sanitizer=a,this.videoDisplayToggle=[!1],this.subscriber=c.events.subscribe(h=>(0,p.mG)(this,void 0,void 0,function*(){if(!(h instanceof l.m2))return;const{key:u}=this.route.snapshot.params;this.content=void 0;const v=`\n            {\n                getStudioInitiative(key: "${u}") {\n                  key\n                  name \n                  longDescription\n                  body {\n                      html\n                  }\n                  url\n                  galleryVideos\n                  galleryVideoTitles\n                  galleryVideoCaptions\n                  galleryVideoThumbails {\n                      public_id\n                  }\n                  studios {\n                    name\n                    key\n                    thumb {\n                        public_id\n                    }\n                  }\n                }\n            }\n        `,r=yield this.dataSvc.getSetWithKey("studio-initiative",u,v);r&&r.getStudioInitiative?this.setContent(r.getStudioInitiative):c.navigateByUrl("uh-oh")}))}ngOnDestroy(){this.subscriber.unsubscribe()}setContent(n){n.body.html=n.body.html.replaceAll("<code>","<sup>").replaceAll("</code>","</sup>"),this.content=n,this.videoUrls=this.content.galleryVideos.map(i=>(this.videoDisplayToggle.push(!1),this.sanitizer.bypassSecurityTrustResourceUrl(`https://player.vimeo.com/video/${i}?autoplay=1&color=00ab9e&byline=0&portrait=0`)))}embedVideo(n){this.videoDisplayToggle[n]=!0}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(g.D),t.Y36(l.gz),t.Y36(l.F0),t.Y36(f.H7))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-initiative"]],decls:1,vars:1,consts:[["id","bg",4,"ngIf"],["id","bg"],[1,"columns","is-multiline"],[1,"column","is-full"],[1,"column","is-half"],["class","column is-full",4,"ngIf"],["id","body",3,"innerHtml"],["class","column columns is-multiline is-full videos",4,"ngIf"],["id","studios","class","columns is-multiline is-mobile no-margin",4,"ngIf"],["label","Go to website",1,"column","is-4-tablet",3,"href","ariaLabel"],[1,"column","columns","is-multiline","is-full","videos"],[1,"uppercase","column","is-full"],["class","video column is-11-mobile is-5-tablet",4,"ngFor","ngForOf"],[1,"video","column","is-11-mobile","is-5-tablet"],[3,"id","routerLink","click",4,"ngIf"],["class","embed",3,"id",4,"ngIf"],[1,"title","uppercase"],[3,"id","routerLink","click"],["cloudinaryPrefix","/","autoFormat","true",3,"cloudinaryId","alt",4,"ngIf"],["src","https://dummyimage.com/500x300/cfcfcf/ff0000.png&text=Needs+thumbnail","alt","Preview image thumbnail for video with text saying 'Needs thumbnail'",4,"ngIf"],[1,"icon"],["width","80","height","80","fill","none","viewBox","0 0 80 80"],["fill","#fff","d","M40 0C17.92 0 0 17.92 0 40s17.92 40 40 40 40-17.92 40-40S62.08 0 40 0zM29.44 55.84V24.16L56.96 40 29.44 55.84z"],["cloudinaryPrefix","/","autoFormat","true",3,"cloudinaryId","alt"],["src","https://dummyimage.com/500x300/cfcfcf/ff0000.png&text=Needs+thumbnail","alt","Preview image thumbnail for video with text saying 'Needs thumbnail'"],[1,"embed",3,"id"],[1,"frame"],["frameborder","0","allow","autoplay; fullscreen; picture-in-picture","allowfullscreen","",3,"src"],["id","studios",1,"columns","is-multiline","is-mobile","no-margin"],[1,"uppercase"],[1,"columns","column","is-multiline","is-mobile","is-full","no-margin"],["class","column is-4-tablet is-11-mobile type",4,"ngFor","ngForOf"],[1,"column","is-4-tablet","is-11-mobile","type"],[3,"routerLink"],["cloudinaryPrefix","/","width","301","autoFormat","true",3,"cloudinaryId","responsive","alt"]],template:function(n,i){1&n&&t.YNc(0,ct,14,6,"section",0),2&n&&t.Q6J("ngIf",void 0!==i.content)},directives:[m.O5,E.r,m.sg,l.yS,_._],styles:['@import"https://fonts.googleapis.com/css?family=Overpass:400,600,900&display=swap";@font-face{font-family:"LunchtypeRegular";font-display:swap;src:url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943334/homepage-2.0/fonts/lunchtype22-regular-webfont.woff2) format("woff2"),url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943334/homepage-2.0/fonts/lunchtype22-regular-webfont.woff) format("woff"),url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943478/homepage-2.0/fonts/Lunchtype22-Regular.ttf) format("truetype")}@font-face{font-family:"LunchtypeMedium";font-display:swap;src:url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943334/homepage-2.0/fonts/lunchtype22-medium-webfont.woff2) format("woff2"),url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943334/homepage-2.0/fonts/lunchtype22-medium-webfont.woff) format("woff"),url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943478/homepage-2.0/fonts/Lunchtype22-Medium.ttf) format("truetype")}.small[_ngcontent-%COMP%]{font-size:small}.large[_ngcontent-%COMP%]{font-size:large}.xx-large[_ngcontent-%COMP%]{font-size:xx-large}.uppercase[_ngcontent-%COMP%]{text-transform:uppercase}.center[_ngcontent-%COMP%]{text-align:center}.hidden[_ngcontent-%COMP%]{display:none}@media (min-width: 64em){.hidden-desktop[_ngcontent-%COMP%]{display:none}}@media (min-width: 48em){.hidden-tablet-plus[_ngcontent-%COMP%]{display:none}}@media (max-width: 47.99em){.hidden-mobile[_ngcontent-%COMP%]{display:none}}@media (min-width: 26.5625em){.hidden-not-mobile[_ngcontent-%COMP%]{display:none}}.no-margin[_ngcontent-%COMP%]{margin:0}.no-pad[_ngcontent-%COMP%]{padding:0}#bg[_ngcontent-%COMP%]{background-color:#fffffff2;padding:3%}h1.sm[_ngcontent-%COMP%]{font-size:1.05em}h3[_ngcontent-%COMP%]{font-family:"Overpass",sans-serif}#body[_ngcontent-%COMP%]  h1{text-transform:uppercase}#body[_ngcontent-%COMP%]  a{color:#00e}.videos[_ngcontent-%COMP%]   .video[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:block;position:relative}.videos[_ngcontent-%COMP%]   .video[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{transition:transform .15s ease-in-out;position:absolute;left:calc(50% - 40px);top:calc(50% - 40px)}@media (max-width: 47.99em){.videos[_ngcontent-%COMP%]   .video[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{left:calc(50% - 12px);top:calc(50% - 12px)}}.videos[_ngcontent-%COMP%]   .video[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover   .icon[_ngcontent-%COMP%]{transform:scale(1.2)}.videos[_ngcontent-%COMP%]   .video[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-family:"Overpass",sans-serif}.videos[_ngcontent-%COMP%]   .video[_ngcontent-%COMP%]   .embed[_ngcontent-%COMP%]   .frame[_ngcontent-%COMP%]{position:relative;padding:56.25% 0 0}.videos[_ngcontent-%COMP%]   .video[_ngcontent-%COMP%]   .embed[_ngcontent-%COMP%]   iframe[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%}']}),e})();const st=[{path:"",component:I},{path:"partnered",redirectTo:"",pathMatch:"full"},{path:"thesis",redirectTo:"",pathMatch:"full"},{path:"deprecated",redirectTo:"",pathMatch:"full"},{path:"studio/:key",component:G},{path:":key",component:x},{path:"initiative/:key",component:x}];let lt=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[l.Bz.forChild(st)],l.Bz]}),e})()}}]);