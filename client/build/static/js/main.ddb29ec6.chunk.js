(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{84:function(e,t,n){},85:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),i=n(22),o=n.n(i),s=n(2),r=n(8),d=n(0),u=function(e){var t=e.searchInfo,n=e.onChangedSearchInfo,c=e.setMenuState,a=Object(r.g)();return Object(d.jsxs)("div",{className:"header",children:[Object(d.jsxs)("div",{className:"header__open-menu-and-logo",children:[Object(d.jsx)("button",{className:"header__open-menu",onClick:function(){c(!0)}}),Object(d.jsx)("h1",{className:"header__logo",onClick:function(){return a.push("/")},children:"Fidtube"})]}),Object(d.jsx)("div",{className:"header__search-parent",children:Object(d.jsx)("input",{className:"header__search",placeholder:"Search",type:"text",value:t,onChange:function(e){return n(e.target.value)}})})]})},l=n.p+"static/media/user-avatar.16774924.svg",b=n(6),j=n(4),_=n(41),m=n.n(_);var v=function(e){return Object(d.jsx)(m.a,Object(j.a)(Object(j.a)({},e),{},{autoHide:!0,autoHideDuration:200,autoHideTimeout:200,renderThumbVertical:function(){return Object(d.jsx)("div",{className:"thumb"})},children:e.children}))},O=n(3),h=n(17),f=n.n(h),p=n(25),g=n(14),x=n(7),k=n.n(x),N=Object(g.c)(),S=Object(g.b)("fetchAccounts",Object(p.a)(f.a.mark((function e(){var t,n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=localStorage.getItem("token"),e.next=3,k.a.get("/accounts",{headers:{Authorization:t?"Bearer ".concat(t):""}});case 3:return n=e.sent,e.abrupt("return",n.data);case 5:case"end":return e.stop()}}),e)})))),y=N.getInitialState({status:"idle"}),w=Object(g.d)({name:"accounts",initialState:y,reducers:{setAccounts:N.setMany,subscribe:function(e,t){var n=localStorage.getItem("token");if(n){var c=t.payload.subscribtionAccountId,a=e.ids.find((function(t){return e.entities[t].self}));k.a.post("/subscribe",{currentUserId:a,subscribtionAccountId:c},{headers:{Authorization:n?"Bearer ".concat(n):""}}),e.entities[c].subscribed=!0}},unsubscribe:function(e,t){var n=localStorage.getItem("token");if(n){var c=t.payload.subscribtionAccountId,a=e.ids.find((function(t){return e.entities[t].self}));k.a.post("/unsubscribe",{currentUserId:a,subscribtionAccountId:c},{headers:{Authorization:n?"Bearer ".concat(n):""}}),e.entities[c].subscribed=!1}},removeAccount:function(e,t){e.ids.forEach((function(t){e.entities[t].self=!1,e.entities[t].subscribed=!1})),N.removeOne(e,t.payload.id)}},extraReducers:function(e){e.addCase(S.fulfilled,(function(e,t){e.status="succeeded",N.setMany(e,t.payload)})).addCase(S.pending,(function(e,t){e.status="loading"})).addCase(S.rejected,(function(e,t){e.status="error"}))}}),C=w.reducer,I=w.actions,A=I.setAccounts,E=I.subscribe,P=I.unsubscribe,z=I.removeAccount,R=Object(g.c)(),L=Object(g.b)("fetchVideos",Object(p.a)(f.a.mark((function e(){var t,n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=localStorage.getItem("token"),e.next=3,k.a.get("/videos",{headers:{Authorization:t?"Bearer ".concat(t):""}});case 3:return n=e.sent,e.abrupt("return",n.data);case 5:case"end":return e.stop()}}),e)})))),M=R.getInitialState({status:"idle"}),F=Object(g.d)({name:"videos",initialState:M,reducers:{setVideo:R.setOne,removeAccountsVideos:function(e,t){var n=t.payload.id,c=[];e.ids.forEach((function(t){e.entities[t].author===n&&c.push(t)})),R.removeMany(e,c)},removeVideo:R.removeOne},extraReducers:function(e){e.addCase(L.fulfilled,(function(e,t){e.status="succeeded",R.setMany(e,t.payload)})).addCase(L.pending,(function(e,t){e.status="loading"})).addCase(L.rejected,(function(e,t){e.status="error"}))}}),B=F.reducer,T=F.actions,D=T.setVideo,V=T.removeAccountsVideos,U=T.removeVideo,H=function(e){var t=e.account,n=t.id,c=t.name,a=t.avatar;return Object(d.jsxs)(b.b,{to:"/account/".concat(n),className:"menu__user-info",children:[Object(d.jsx)("img",{src:a?"avatar/".concat(a):l,alt:"User avatar"}),Object(d.jsx)("div",{children:c})]})},q=function(e){var t=e.opened,n=e.setMenuState,a=t?0:-300,i=t?"block":"none",o=Object(O.c)((function(e){return e.accounts})),r=[],u={},j=localStorage.getItem("token");o&&(u=o.entities[o.ids.find((function(e){return!!o.entities[e].self}))],r=o.ids.map((function(e){return o.entities[e]})).filter((function(e){return!!e.subscribed})));var _=Object(c.useState)(!1),m=Object(s.a)(_,2),h=m[0],f=m[1],p=Object(O.b)();return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("div",{className:"modal-background",style:{display:i}}),Object(d.jsxs)("div",{className:"menu",style:{left:"".concat(a,"px")},children:[Object(d.jsx)("button",{className:"menu__close-menu",onClick:function(){n(!1)}}),u?Object(d.jsxs)(d.Fragment,{children:[Object(d.jsxs)(b.b,{to:"/account/".concat(u?u.id:""),className:"menu__current-user-info",children:[Object(d.jsx)("div",{className:"menu__current-user-info__avatar",style:{background:"url(".concat(u.avatar?"/avatar/".concat(u.avatar):l,")"),backgroundSize:"cover",backgroundPosition:"center"}}),Object(d.jsx)("h1",{children:u.name})]}),Object(d.jsx)("button",{className:"menu__account",onClick:function(){localStorage.removeItem("token"),p(S()),p(L())},children:"Sign out"}),Object(d.jsx)("button",{disabled:h,className:"menu__account delete".concat(h?"_pressed":""),onClick:function(){j&&(f(!0),k.a.delete("/account/".concat(u.id),{headers:{Authorization:"Bearer ".concat(j)}}).then((function(){localStorage.removeItem("token"),p(z({id:u.id})),p(V({id:u.id}))})),localStorage.removeItem("token"))},children:"Delete"}),r.length>0&&Object(d.jsx)(v,{children:Object(d.jsxs)("div",{className:"menu__subscriptions",children:[Object(d.jsx)("h1",{children:"Subscriptions"}),r.map((function(e){return Object(d.jsx)(H,{account:e},e.id)}))]})})]}):Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(b.b,{className:"menu__account",to:"/sign-in",children:"Sign in"}),Object(d.jsx)(b.b,{className:"menu__account",to:"/create-account",children:"Create account"})]})]})]})},W=n.p+"static/media/preview.c5cdbc78.svg",J=function(e){var t=e.accountPage,n=e.title,c=e.preview,a=e.author,i=e.self,o=e.id,s=e.videoWidth,r=e.previewHeight,u=e.margins,j=e.setRightMargin,_=Object(O.b)(),m=Object(O.c)((function(e){return e.accounts.entities[a]})),v="".concat(u,"px");return Object(d.jsxs)(b.b,{onClick:function(e){"videos__video__delete"!==e.target.className||e.preventDefault()},to:"/video/".concat(o),className:"videos__video",style:{width:"".concat(s,"px"),height:"".concat(s,"px"),marginLeft:v,marginRight:j?v:"0px``"},children:[Object(d.jsx)("div",{className:"videos__video__preview",style:{height:"".concat(r,"px"),backgroundImage:"url(".concat(c?"/preview/".concat(c):W,")"),backgroundRepeat:"no-repeat",backgroundSize:c?"cover":"contain",backgroundPosition:"center"}}),t?Object(d.jsxs)("div",{className:"videos__video__title-and-delete",children:[Object(d.jsx)("h1",{className:"videos__video__title",children:n}),i&&Object(d.jsx)("button",{onClick:function(e){var t=localStorage.getItem("token");k.a.delete("/video/".concat(o),{headers:{Authorization:"Bearer ".concat(t)}}).then((function(){_(U(o))}))},className:"videos__video__delete"})]}):Object(d.jsx)("h1",{className:"videos__video__title",children:n}),!t&&Object(d.jsxs)("div",{className:"videos__video__author",children:[Object(d.jsx)("div",{className:"videos__video__author__avatar",style:{background:"url(".concat(m&&m.avatar?"/avatar/".concat(m.avatar):l,")"),backgroundSize:"cover",backgroundPosition:"center"}}),Object(d.jsx)("div",{className:"videos__video__author",children:m?m.name:"Video author"})]})]})},X=function(){var e=Object(c.useState)(document.documentElement.clientWidth),t=Object(s.a)(e,2),n=t[0],a=t[1];return Object(c.useEffect)((function(){var e=function(){a(document.documentElement.clientWidth)};return window.addEventListener("resize",e),function(){window.removeEventListener("resize",e)}}),[]),n},G=function(e){var t=e.searchInfo,n=e.author,c=e.self,a=e.accountPage,i=Object(O.c)((function(e){return e.videos})),o=i.ids.map((function(e){return i.entities[e]})),s=[];s=a?o.filter((function(e){return e.author===n&&(e.title.includes(t)||e.description.includes(t))})):o.filter((function(e){return e.title.includes(t)||e.description.includes(t)||e.author.includes(t)}));var r=X(),u=320,l=Math.floor(r/u),b=r>640?(r-u*l)/(l+1):0;b>10&&(b=10);var j=r/l-2*b;j<u&&(j=u),1===l&&j>500&&(j=500);var _=j/3.5*2;return Object(d.jsx)("div",{className:"videos",children:s.map((function(e,t){var n=++t%l===0;return Object(d.jsx)(J,{margins:b,title:e.title,accountPage:a,self:c,id:e.id,preview:e.preview,author:e.author,videoWidth:j,previewHeight:_,setRightMargin:n},e.id)}))})},K=function(e){return Object(d.jsx)("div",{className:"wrapper",children:Object(d.jsx)(v,{children:e.children})})},Q=function(e){var t=e.id,n=e.name,c=e.description,a=e.avatar,i=e.subscribed,o=e.self,s=a?"/avatar/".concat(a):l,r=Object(O.b)(),u=o?"Add video":i?"Subscribed":"Subscribe",j=i?"account__avatar-and-subscribe__subscribed":"account__avatar-and-subscribe__subscribe";return Object(d.jsxs)("div",{className:"account",children:[Object(d.jsxs)("div",{className:"account__avatar-and-subscribe",children:[Object(d.jsx)("div",{className:"account__avatar-and-subscribe__avatar",style:{background:"url(".concat(s,")"),backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center"}}),o?Object(d.jsx)(b.b,{to:"/add-video",className:"account__avatar-and-subscribe__add-video",children:u}):Object(d.jsx)("button",{onClick:function(){r(i?P({subscribtionAccountId:t}):E({subscribtionAccountId:t}))},className:j,children:u})]}),Object(d.jsxs)("div",{className:"account__name-and-description",children:[Object(d.jsx)("h1",{children:n}),Object(d.jsx)("p",{children:c})]})]})},Y=function(e){var t=e.searchInfo,n=Object(r.h)().id,c=Object(O.c)((function(e){return e.accounts.entities[n]})),a=Object(O.c)((function(e){return e.accounts.status}));if(!c&&"succeeded"===a)return Object(d.jsx)(r.a,{to:"/"});if(!c)return null;var i=c.name,o=c.description,s=c.avatar,u=c.subscribed,l=c.self;return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(Q,{id:n,name:i,description:o,avatar:s,subscribed:u,self:l}),Object(d.jsx)(G,{searchInfo:t,author:n,accountPage:!0,self:l})]})},Z=function(e,t,n,c){var a=e.pageX-t.getBoundingClientRect().left;return a<0&&(a=0),a>c&&(a=c),a/c*n},$=function(e){var t=e.videoProgress,n=e.volume,a=e.paused,i=e.setVideoPlaying,o=e.setSliderUsing,r=e.buffered,u=e.onChange,l=e.disabled,b=e.value,j=e.min,_=e.max,m=e.tipFormatter,v=Object(c.useRef)(null),O=Object(c.useState)(0),h=Object(s.a)(O,2),f=h[0],p=h[1],g=Object(c.useState)(!1),x=Object(s.a)(g,2),k=x[0],N=x[1],S=Object(c.useState)(!1),y=Object(s.a)(S,2),w=y[0],C=y[1],I=Object(c.useState)(0),A=Object(s.a)(I,2),E=A[0],P=A[1];j||(j=0),_||(_=100),b||0===b||(b=n?50:0);var z=_-j,R=b/z*100,L=w||k,M=r/z*100,F=function(e){var t=e.pageX;if(v.current){var n=v.current.getBoundingClientRect(),c=n.left,a=n.left+n.width;t<c&&(t=c),t>a&&(t=a);var i=(t-c)/n.width*z+j;return p(i),t}};return Object(d.jsx)("div",{style:{display:l?"none":"block"},ref:v,className:"slider".concat(n?"_volume":""),onPointerDown:function(e){a||i(!1),o(!0);var t=v.current.offsetWidth;u(Z(e,v.current,z,t)),F(e),N(!0);var n=function(e){u(Z(e,v.current,z,t)),L&&P(F(e))};window.addEventListener("pointermove",n),window.addEventListener("pointerup",(function e(){w||o(!1),N(!1),a||i(!0),window.removeEventListener("pointermove",n),window.removeEventListener("pointerup",e)}))},onPointerOver:function(e){F(e),o(!0),C(!0);var t=function(e){P(F(e))};window.addEventListener("pointermove",t),v.current.addEventListener("pointerout",(function e(){k||o(!1),C(!1),window.removeEventListener("pointermove",t),v.current.removeEventListener("pointerout",e)}))},children:Object(d.jsxs)("div",{className:"slider__rail",children:[L&&Object(d.jsx)("div",{style:{left:"".concat(E,"px"),top:"".concat(v.current.getBoundingClientRect().top-28,"px")},className:"slider__tooltip",children:m?m(f):Math.floor(f)}),Object(d.jsx)("div",{style:{width:"".concat(R,"%")},className:"slider__track"}),t&&Object(d.jsx)("div",{className:"slider__downloaded-data",style:{width:M?"".concat(M,"%"):"unset"}}),Object(d.jsx)("div",{style:{left:"".concat(R,"%")},className:"slider__handle"})]})})},ee=function(e){if(0===e)return"00:00";var t=Math.floor(e/60),n=Math.floor(e-60*t);if(t>=60){var c=Math.floor(t/60),a=Math.floor(t-60*c);return String(c).length<2&&(c="0".concat(c)),String(a).length<2&&(a="0".concat(a)),String(n).length<2&&(n="0".concat(n)),"".concat(c,":").concat(a,":").concat(n)}return String(t).length<2&&(t="0".concat(t)),String(n).length<2&&(n="0".concat(n)),"".concat(t,":").concat(n)},te=function(e){var t=e.src,n=Object(c.useRef)(null),a=Object(c.useRef)(null),i=Object(c.useState)(!1),o=Object(s.a)(i,2),r=o[0],u=o[1],l=Object(c.useState)(!0),b=Object(s.a)(l,2),j=b[0],_=b[1],m=Object(c.useState)(!1),v=Object(s.a)(m,2),O=v[0],h=v[1],f=Object(c.useState)(!1),p=Object(s.a)(f,2),g=p[0],x=p[1],k=Object(c.useState)(50),N=Object(s.a)(k,2),S=N[0],y=N[1],w=Object(c.useState)(!0),C=Object(s.a)(w,2),I=C[0],A=C[1],E=Object(c.useState)(!1),P=Object(s.a)(E,2),z=P[0],R=P[1],L=Object(c.useState)(!1),M=Object(s.a)(L,2),F=M[0],B=M[1],T=Object(c.useState)(0),D=Object(s.a)(T,2),V=D[0],U=D[1];n.current&&(O&&!I?n.current.play():n.current.pause()),Object(c.useEffect)((function(){return document.onfullscreenchange=function(){R(!z),window.screen.orientation.type.includes("portrait")&&(F?window.screen.orientation.unlock?window.screen.orientation.unlock():console.log("unlock is not supported"):window.screen.orientation.lock("landscape"),B(!F))},function(){document.onfullscreenchange=null}}),[z,F]);var H=Object(c.useRef)(null);Object(c.useEffect)((function(){return H.current=setTimeout((function(){r||O&&_(!1)}),3e3),function(){clearTimeout(H.current)}}),[j,O,g,S,z,r]);var q=Object(c.useState)(0),W=Object(s.a)(q,2),J=W[0],X=W[1],G=Object(c.useState)(0),K=Object(s.a)(G,2),Q=K[0],Y=K[1];return Object(d.jsxs)("div",{onPointerOver:function(){_(!0);var e=function(){_(!0)};window.addEventListener("pointermove",e),a.current.addEventListener("pointerout",(function t(){window.removeEventListener("pointermove",e),a.current.removeEventListener("pointerout",t)}))},ref:a,className:"video__videoplayer",children:[Object(d.jsx)("video",{onProgress:function(e){var t=e.target;if(Q>0)for(var n=0;n<t.buffered.length;n++)if(t.buffered.start(t.buffered.length-1-n)<t.currentTime){U(t.buffered.end(t.buffered.length-1-n));break}},src:"/videofile/".concat(t),preload:"metadata",onDurationChange:function(e){Y(e.target.duration)},onTimeUpdate:function(){return X(n.current.currentTime)},loop:!1,className:"video__videoplayer__file",ref:n}),Object(d.jsxs)("div",{style:{opacity:j?1:0,cursor:z?j?"pointer":"none":"pointer"},onClick:function(e){"video__videoplayer__controls"===e.target.className&&_(!0)},className:"video__videoplayer__controls",children:[Object(d.jsxs)("div",{className:"video__videoplayer__controls__progress",children:[Object(d.jsx)("div",{className:"video__videoplayer__controls__progress__currentTime",children:n.current&&ee(J)}),Object(d.jsx)($,{videoProgress:!0,videoPlaying:O,buffered:V,className:"video__videoplayer__controls__progress__slider",max:n.current?Q:0,tipFormatter:ee,setVideoPlaying:h,value:J,video:n.current,paused:I,setSliderUsing:u,onChange:function(e){X(e),n.current.currentTime=e}}),Object(d.jsx)("div",{className:"video__videoplayer__controls__progress__duration",children:n.current&&ee(Q)})]}),Object(d.jsxs)("div",{className:"video__videoplayer__controls__other",children:[Object(d.jsxs)("div",{className:"video__videoplayer__controls__other__wrapper",children:[Object(d.jsx)("button",{className:"video__videoplayer__controls__other__".concat(O?"pause":"play"),onClick:function(){_(!0),h(!O),A(!I)}}),Object(d.jsx)("button",{className:"video__videoplayer__controls__other__".concat(g?"volume-off":"volume"),onClick:function(){g&&(n.current.muted=!1,x(!g)),g||(n.current.muted=!0,x(!g))}}),Object(d.jsx)($,{setVideoPlaying:h,volume:!0,className:"video__videoplayer__controls__other__volumeSlider",value:S,disabled:g,videoPlaying:O,video:n.current,paused:I,setSliderUsing:u,onChange:function(e){y(e),n.current.volume=e/100}})]}),Object(d.jsx)("button",{className:"video__videoplayer__controls__other__".concat(z?"fullscreen-exit":"fullscreen"),onClick:function(){z?document.exitFullscreen():a.current.requestFullscreen({navigationUI:"hide"})}})]})]})]})},ne=localStorage.getItem("token"),ce=function(e,t,n,c,a){ne&&k.a.post("/vote-video/".concat(e),{liked:t,disliked:n,likePressed:c,dislikePressed:a},{headers:{Authorization:"Bearer ".concat(ne)}})},ae=function(e){var t=e.videoEntity,n=t.title,a=t.description,i=t.author,o=t.likes,r=t.dislikes,u=t.liked,_=t.disliked,m=t.id,v=Object(O.b)(),h=Object(O.c)((function(e){return e.accounts.entities[i]})),f=Object(O.c)((function(e){return e.accounts.ids.find((function(t){return e.accounts.entities[t].self}))})),p=Object(c.useState)(!1),g=Object(s.a)(p,2),x=g[0],k=g[1];return Object(d.jsxs)("div",{className:"video__information",children:[Object(d.jsxs)("div",{className:"video__information__title-and-description",children:[Object(d.jsx)("h1",{className:"video__information__title-and-description__title",children:n}),a&&Object(d.jsxs)("div",{className:"video__information__title-and-description__description",children:[Object(d.jsxs)("div",{onClick:function(){return k(!x)},className:"video__information__title-and-description__description__close-description",children:[Object(d.jsx)("h3",{children:"Description"}),Object(d.jsx)("div",{className:"arrow".concat(x?"_opened":"")})]}),Object(d.jsx)("p",{className:"video__information__title-and-description__description__info".concat(x?"":"_closed"),children:a})]})]}),f&&Object(d.jsxs)("div",{className:"video__information__like-and-dislike",children:[Object(d.jsxs)("div",{onClick:function(){if(u)return ce(m,u,_,!1,!1),void v(D(Object(j.a)(Object(j.a)({},t),{},{liked:!1,likes:o-1})));ce(m,u,_,!0,!1),v(D(Object(j.a)(Object(j.a)({},t),{},{liked:!0,disliked:!1,likes:o+1,dislikes:_?r-1:r})))},className:"video__information__like-and-dislike__item",children:[Object(d.jsx)("div",{className:"video__information__like-and-dislike__item__like".concat(u?"_pressed":"")}),o]}),Object(d.jsxs)("div",{onClick:function(){if(_)return ce(m,u,_,!1,!1),void v(D(Object(j.a)(Object(j.a)({},t),{},{disliked:!1,dislikes:r-1})));ce(m,u,_,!1,!0),v(D(Object(j.a)(Object(j.a)({},t),{},{disliked:!0,liked:!1,dislikes:r+1,likes:u?o-1:o})))},className:"video__information__like-and-dislike__item",children:[Object(d.jsx)("div",{className:"video__information__like-and-dislike__item__dislike".concat(_?"_pressed":"")}),r]})]}),Object(d.jsxs)("div",{className:"video__information__author",children:[Object(d.jsxs)(b.b,{className:"video__information__author__avatar-and-name",to:"/account/".concat(i),children:[Object(d.jsx)("div",{className:"video__information__author__avatar-and-name__avatar",style:{backgroundImage:"url(".concat(h&&h.avatar?"/avatar/".concat(h.avatar):l,")"),backgroundSize:"cover",backgroundPosition:"center"}}),Object(d.jsx)("div",{className:"video__information__author__avatar-and-name__name",children:h?h.name:"Username"})]}),f&&h&&!h.self&&Object(d.jsx)("button",{onClick:function(){v(h.subscribed?P({subscribtionAccountId:i}):E({subscribtionAccountId:i}))},className:"video__information__author__".concat(h.subscribed?"subscribed":"subscribe"),children:h.subscribed?"Subscribed":"Subscribe"})]})]})},ie=n(16),oe=function(e){var t=Object(c.useState)(60),n=Object(s.a)(t,2),a=n[0],i=n[1],o=a<=60?60:a>=130?130:a;return Object(d.jsx)("div",{className:"textarea-wrapper",style:{height:o},children:Object(d.jsx)(v,{children:Object(d.jsx)("textarea",{placeholder:e.placeholder,className:"textarea",value:e.value,onChange:function(t){t.target.style.height="auto",t.target.style.height="".concat(t.target.scrollHeight,"px"),i(t.target.scrollHeight),e.onChange(t)}})})})},se=function(e){var t=e.comment,n=e.commentIndex,c=e.videoEntity,a=localStorage.getItem("token"),i=Object(O.b)(),o=t.self,s=t.text,r=t.author,u=t.liked,_=t.disliked,m=t.likes,v=t.dislikes,h=Object(O.c)((function(e){return e.accounts.ids.find((function(t){return e.accounts.entities[t].self}))})),f=Object(O.c)((function(e){var t=e.accounts.ids.find((function(t){return e.accounts.entities[t].name===r}));return e.accounts.entities[t]})),p=f&&f.avatar?"/avatar/".concat(f.avatar):l,g=function(e,t,i,o){a&&k.a.post("/vote-comment/".concat(c.id,"/").concat(n),{liked:e,disliked:t,likePressed:i,dislikePressed:o},{headers:{Authorization:"Bearer ".concat(a)}}).then((function(e){return console.log(e.data)}))};return Object(d.jsxs)("div",{className:"video__comments__comment",children:[Object(d.jsxs)("div",{className:"video__comments__comment__comment-author-and-delete-comment",children:[Object(d.jsxs)(b.b,{className:"video__comments__comment__comment-author-and-delete-comment__author",to:"/account/".concat(null===f||void 0===f?void 0:f.id),children:[Object(d.jsx)("div",{className:"video__comments__comment__comment-author-and-delete-comment__author__avatar",style:{background:"url(".concat(p,")"),backgroundSize:"contain",backgroundPosition:"center",backgroundRepeat:"no-repeat"}}),Object(d.jsx)("div",{className:"video__comments__comment__comment-author-and-delete-comment__author__name",children:null===f||void 0===f?void 0:f.name})]}),o&&Object(d.jsx)("button",{onClick:function(){for(var e=[],t=0;t<c.comments.length;t++)t!==n&&e.push(c.comments[t]);i(D(Object(j.a)(Object(j.a)({},c),{},{comments:e}))),k.a.delete("/comment",{data:{videoId:c.id,commentIndex:n},headers:{Authorization:"Bearer ".concat(a)}})},className:"video__comments__comment__comment-author-and-delete-comment__delete",children:"Delete"})]}),Object(d.jsx)("p",{className:"video__comments__comment__text",children:s}),h&&Object(d.jsxs)("div",{className:"video__comments__comment__like-and-dislike",children:[Object(d.jsxs)("div",{onClick:function(){if(u){g(u,_,!1,!1);var e=Object(j.a)(Object(j.a)({},t),{},{liked:!1,likes:m-1}),a=Object(ie.a)(c.comments);return a[n]=e,void i(D(Object(j.a)(Object(j.a)({},c),{},{comments:a})))}g(u,_,!0,!1);var o=Object(j.a)(Object(j.a)({},t),{},{liked:!0,likes:m+1,disliked:!1,dislikes:_?v-1:v}),s=Object(ie.a)(c.comments);s[n]=o,i(D(Object(j.a)(Object(j.a)({},c),{},{comments:s})))},className:"video__comments__comment__like-and-dislike__item",children:[Object(d.jsx)("div",{className:"video__comments__comment__like-and-dislike__item__like".concat(u?"_pressed":"")}),m]}),Object(d.jsxs)("div",{onClick:function(){if(_){g(u,_,!1,!1);var e=Object(j.a)(Object(j.a)({},t),{},{disliked:!1,dislikes:v-1}),a=Object(ie.a)(c.comments);return a[n]=e,void i(D(Object(j.a)(Object(j.a)({},c),{},{comments:a})))}g(u,_,!1,!0);var o=Object(j.a)(Object(j.a)({},t),{},{liked:!1,likes:u?m-1:m,disliked:!0,dislikes:v+1}),s=Object(ie.a)(c.comments);s[n]=o,i(D(Object(j.a)(Object(j.a)({},c),{},{comments:s})))},className:"video__comments__comment__like-and-dislike__item",children:[Object(d.jsx)("div",{className:"video__comments__comment__like-and-dislike__item__dislike".concat(_?"_pressed":"")}),v]})]})]})},re=function(e){var t=e.videoEntity,n=Object(O.b)(),a=t.comments,i=Object(c.useState)(!1),o=Object(s.a)(i,2),r=o[0],u=o[1],l=Object(c.useState)(""),b=Object(s.a)(l,2),_=b[0],m=b[1],v=""===_.trim(),h=localStorage.getItem("token"),f=Object(O.c)((function(e){return e.accounts.ids.find((function(t){return e.accounts.entities[t].self}))}));return Object(d.jsxs)("div",{className:"video__comments",children:[f&&Object(d.jsxs)("div",{className:"video__comments__leave-comment",children:[Object(d.jsx)(oe,{placeholder:"Type your comment",className:"video__comments__leave-comment__textarea",value:_,onChange:function(e){return m(e.target.value)}}),Object(d.jsx)("button",{className:"video__comments__leave-comment__send".concat(r?"_submitted":v?"_disabled":""),disabled:r||v,onClick:function(){var e;e=_,u(!0),k.a.post("/add-comment/".concat(t.id),{text:e},{headers:{Authorization:"Bearer ".concat(h)}}).then((function(e){u(!1),n(D(Object(j.a)(Object(j.a)({},t),{},{comments:[].concat(Object(ie.a)(t.comments),[e.data])})))})),m("")},children:"Leave comment"})]}),a&&a.length>0&&Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("h1",{className:"video__comments__title",children:"Comments"}),a.map((function(e,n){return Object(d.jsx)(se,{commentIndex:n,videoEntity:t,comment:e},n)})).reverse()]})]})},de=function(){var e=Object(r.h)().id,t=Object(O.c)((function(e){return e.videos.status})),n=Object(O.c)((function(t){return t.videos.entities[e]}));return n||"succeeded"!==t?n?Object(d.jsxs)("div",{className:"video",children:[Object(d.jsx)(te,{src:n.source}),Object(d.jsx)(ae,{videoEntity:n}),Object(d.jsx)(re,{videoEntity:n})]}):null:Object(d.jsx)(r.a,{to:"/"})},ue=function(e){var t,n=e.createAccount,a=Object(O.b)(),i=Object(r.g)(),o=Object(c.useState)(""),u=Object(s.a)(o,2),l=u[0],j=u[1],_=Object(c.useState)(""),m=Object(s.a)(_,2),v=m[0],h=m[1],f=Object(c.useState)(""),p=Object(s.a)(f,2),g=p[0],x=p[1],N=Object(c.useState)(!1),S=Object(s.a)(N,2),y=S[0],w=S[1],C=Object(c.useState)(null),I=Object(s.a)(C,2),E=I[0],P=I[1],z=Object(c.useState)(null),R=Object(s.a)(z,2),M=R[0],F=R[1],B=Object(c.useState)(!0),T=Object(s.a)(B,2),D=T[0],V=T[1],U=Object(c.useState)(!1),H=Object(s.a)(U,2),q=H[0],W=H[1];t=!y&&(""!==l&&(!(l.length<4)&&(!(l.length>25)&&(!!D&&(""!==v&&(!(v.length<4)&&!(v.length>25)))))));var J=function(e){var t=e.data;a(A(t.map((function(e){var t=e.name,n=e.avatar,c=e.description,a=e.id,i=e.self,o=e.subscribed,s=e.token;return s&&localStorage.setItem("token",s),{name:t,avatar:n,description:c,id:a,self:i,subscribed:o}}))))};return Object(d.jsxs)("form",{className:"sign-in",onSubmit:function(e){if(e.preventDefault(),w(!0),n){var c=new FormData;return c.append("login",l),c.append("password",v),""!==g.trim()&&c.append("description",g.trim()),E&&c.append("avatar",E),void function(e){k.a.post("/create-account",e,{headers:{type:"x-www-form-urlencoded"}}).then((function(e){J(e),i.push("/"),a(L())})).catch((function(e){console.log(e)}))}(c)}k.a.post("/login-user",{login:l,password:v}).then((function(e){J(e),i.push("/"),a(L())})).catch((function(e){if(405===e.response.status)return t=!0,w(!1),void W(!0);console.log(e.toJSON())}))},children:[Object(d.jsx)("h1",{className:"sign-in__title",children:n?"Create account":"Sign in"}),n&&Object(d.jsxs)("div",{className:"sign-in__choose-avatar",children:[Object(d.jsx)("label",{htmlFor:"photo",style:M?{backgroundImage:"url(".concat(M,")"),backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center"}:{background:"#1a1a1b",color:"#fff"},children:M?null:"Add avatar"}),Object(d.jsx)("input",{name:"avatar",multiple:!1,id:"photo",type:"file",accept:"image/*",onChange:function(e){if(e.target.files[0]){var t=new FileReader;t.readAsDataURL(e.target.files[0]),P(e.target.files[0]),t.onload=function(){F(t.result)}}}})]}),n&&Object(d.jsx)("p",{className:"sign-in__info",children:"Login and password fields should contain from 4 to 25 characters"}),Object(d.jsx)("input",{name:"login",required:!0,placeholder:"Type your login",className:"sign-in__login",value:l,onChange:function(e){W(!1),j(e.target.value.trim()),""!==e.target.value.trim()?n&&""!==e.target.value.trim()&&k.a.get("/is-login-unique/".concat(e.target.value.trim())).then((function(e){V(e.data)})):V(!0)}}),n&&!D&&Object(d.jsxs)("p",{className:"sign-in__error",children:[l," is already taken"]}),n&&Object(d.jsx)(oe,{placeholder:"Type your account description",value:g,onChange:function(e){return x(e.target.value)}}),Object(d.jsx)("input",{name:"password",required:!0,placeholder:"Type your password",className:"sign-in__password",type:"password",value:v,onChange:function(e){W(!1),h(e.target.value.trim())}}),q&&Object(d.jsx)("p",{className:"sign-in__error",children:"Wrong password or login"}),Object(d.jsx)("button",{type:"submit",className:"sign-in__submit".concat(y?"_submitted":t?"":"_disabled"),disabled:!t,children:"Submit"}),Object(d.jsx)(b.b,{className:"sign-in__link",to:n?"/sign-in":"/create-account",children:n?"Sign in":"Create account"})]})},le=D,be=function(){var e=Object(O.b)(),t=Object(r.g)(),n=Object(c.useState)(null),a=Object(s.a)(n,2),i=a[0],o=a[1],u=Object(c.useState)(null),l=Object(s.a)(u,2),b=l[0],j=l[1],_=Object(c.useState)(null),m=Object(s.a)(_,2),v=m[0],h=m[1],f=Object(c.useState)(""),p=Object(s.a)(f,2),g=p[0],x=p[1],N=Object(c.useState)(""),S=Object(s.a)(N,2),y=S[0],w=S[1],C=Object(c.useState)(!1),I=Object(s.a)(C,2),A=I[0],E=I[1],P=.9*X();P>700&&(P=700);var z=P/3.5*2,R=!1;return v&&g&&(R=!0),Object(d.jsxs)("form",{onSubmit:function(n){n.preventDefault(),E(!0);var c=new FormData;c.append("video",v),c.append("title",g),i&&c.append("preview",i),y&&c.append("description",y);var a=localStorage.getItem("token");k.a.post("/add-video",c,{headers:{Authorization:"Bearer ".concat(a)}}).then((function(n){e(le(n.data)),t.push("/")}))},className:"add-video",children:[Object(d.jsx)("h1",{className:"add-video__title",children:"Add video"}),Object(d.jsxs)("div",{className:"add-video__choose-preview",style:{width:"".concat(P,"px"),height:"".concat(z,"px")},children:[Object(d.jsx)("label",{htmlFor:"photo",style:b?{backgroundImage:"url(".concat(b,")"),backgroundRepeat:"no-repeat",backgroundSize:"contain",backgroundPosition:"center"}:{background:"#1a1a1b",color:"#fff"},children:b?null:"Add preview"}),Object(d.jsx)("input",{multiple:!1,id:"photo",type:"file",accept:"image/*",onChange:function(e){if(e.target.files[0]){var t=new FileReader;t.readAsDataURL(e.target.files[0]),o(e.target.files[0]),t.onload=function(){j(t.result)}}}})]}),Object(d.jsxs)("div",{className:"add-video__choose-video",children:[Object(d.jsx)("label",{htmlFor:"video",children:v?v.name:"Add video (MP4 only)"}),Object(d.jsx)("input",{required:!0,multiple:!1,id:"video",type:"file",accept:"video/MP4",onChange:function(e){if(e.target.files[0]){var t=e.target.files[0];h(t)}}})]}),Object(d.jsx)("input",{required:!0,placeholder:"Enter your video's title",className:"add-video__set-title",type:"text",value:g,onChange:function(e){return x(e.target.value)}}),Object(d.jsx)(oe,{placeholder:"Type your video's decription",onChange:function(e){return w(e.target.value)},className:"add-video__set-description",value:y}),Object(d.jsx)("button",{type:"submit",className:"add-video__submit".concat(A?"_submitted":R?"":"_disabled"),disabled:!R,children:"Submit"})]})},je=function(){var e=Object(r.g)();return Object(d.jsx)("div",{className:"go-to-main-page",children:Object(d.jsx)("button",{onClick:function(){return e.push("/")},className:"go-to-main-page__button"})})},_e=function(){return Object(d.jsxs)("div",{className:"lds-roller",children:[Object(d.jsx)("div",{}),Object(d.jsx)("div",{}),Object(d.jsx)("div",{}),Object(d.jsx)("div",{}),Object(d.jsx)("div",{}),Object(d.jsx)("div",{}),Object(d.jsx)("div",{}),Object(d.jsx)("div",{})]})},me=function(){return Object(d.jsx)("div",{className:"error",children:"Some error occured :("})};var ve=function(){var e=Object(O.c)((function(e){return e.accounts.status})),t=Object(O.c)((function(e){return e.videos.status})),n=Object(O.b)();Object(c.useEffect)((function(){"idle"!==e&&"idle"!==t||(n(S()),n(L()))}),[n,e,t]);var a=Object(c.useState)(""),i=Object(s.a)(a,2),o=i[0],l=i[1],b=Object(c.useState)(!1),j=Object(s.a)(b,2),_=j[0],m=j[1];return"loading"===e||"loading"===t?Object(d.jsx)(_e,{}):"error"===e||"error"===t?Object(d.jsx)(me,{}):Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(u,{setMenuState:m,searchInfo:o,onChangedSearchInfo:l}),Object(d.jsx)(q,{opened:_,setMenuState:m}),Object(d.jsx)(K,{children:Object(d.jsxs)(r.d,{children:[Object(d.jsx)(r.b,{path:"/",exact:!0,children:Object(d.jsx)(G,{searchInfo:o})}),Object(d.jsxs)(r.b,{path:"/account/:id",exact:!0,children:[Object(d.jsx)(je,{}),Object(d.jsx)(Y,{searchInfo:o})]}),Object(d.jsxs)(r.b,{path:"/video/:id",exact:!0,children:[Object(d.jsx)(je,{}),Object(d.jsx)(de,{})]}),Object(d.jsxs)(r.b,{path:"/sign-in",exact:!0,children:[Object(d.jsx)(je,{}),Object(d.jsx)(ue,{})]}),Object(d.jsxs)(r.b,{path:"/create-account",exact:!0,children:[Object(d.jsx)(je,{}),Object(d.jsx)(ue,{createAccount:!0})]}),Object(d.jsxs)(r.b,{path:"/add-video",exact:!0,children:[Object(d.jsx)(je,{}),Object(d.jsx)(be,{})]}),Object(d.jsx)(r.a,{to:"/"})]})})]})},Oe=Object(g.a)({reducer:{accounts:C,videos:B}});n(84);o.a.render(Object(d.jsx)(a.a.StrictMode,{children:Object(d.jsx)(b.a,{children:Object(d.jsx)(O.a,{store:Oe,children:Object(d.jsx)(ve,{})})})}),document.getElementById("root"))}},[[85,1,2]]]);
//# sourceMappingURL=main.ddb29ec6.chunk.js.map