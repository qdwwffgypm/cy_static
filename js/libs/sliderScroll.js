!function(a,b){"undefined"!=typeof module?module.exports=b(a):(b(a),"function"==typeof define&&(define.amd||define.cmd)&&define("sliderScroll",function(){return b(a)}))}(window||this,function(a){var b,c,d,f,g,h,i,j,k,l,o,p,q,r,s,t,u,v,w,x;return!a.CY&&(a.CY={}),a.CY.sliderScroll?a.CY.sliderScroll:(b=document,c=function(a){return Object.prototype.toString.call(a).split(/\s(\w+)/)[1].toLowerCase()},d=function(a,b){return a&&a instanceof Object?a:a?(b||document).querySelector(a):null},f=function(a,b){a=a||[];for(var c=0,d=a.length;d>c&&0!=b.call(a[c],c,a[c]);c++);},g=[],h=function(a,b,d){f("array"!=c(a)?[a]:a,function(a,c){b.split(" ").forEach(function(a){c.addEventListener(a,d,{passive:!1}),g.push({elem:c,type:a,handle:d})})})},i=function(a,b,c){b.split(" ").forEach(function(b){a.removeEventListener(b,c);for(var e,d=g.length-1;d>=0;d--)e=g[d],e.elem==a&&e.type==b&&e.handle==c&&g.splice(d,1)})},j=function(a,b){for(var d in b)b.hasOwnProperty(d)&&("object"!=c(b[d])?void 0!=b[d]&&(a[d]=b[d]):a[d]=j(a[d]||{},b[d]));return a},k=function(a,c){a=b.createElement(a);for(var d in c)c.hasOwnProperty(d)&&("style"==d?j(a.style,c[d]):a[d]=c[d]);return a},l=function(b,c){return a.getComputedStyle?a.getComputedStyle(b,null)[c]:b.currentStyle[c]},p=[],q=function(a,b,c,d){return a==d?b+c:c*(-Math.pow(2,-10*a/d)+1)+b},r=function(a,b,c,d){return c*a/d+b},s=function(a){for(var b=p.length-1;b>=0;b--)p[b].elem==a&&(p[b].callback(),p.splice(b,1))},t=function(a,b,c,d,e,f,g){var s,t,h=window.getComputedStyle(a,null),i=parseInt(h.getPropertyValue(b.replace(/([A-Z])/g,"-$1").toLowerCase()))||0,j=0,k=d||500,l=+new Date,m=Math.abs(i-c),n=c>i?!0:!1,u="px",v=function(c){return k>j&&!c?(j=+new Date-l,s=f?r(j,0,m,k):q(j,0,m,k),t=n?i+s:i-s,a.style[b]=t+u,g&&g(t),void 0):(t=n?i+m:i-m,a.style[b]=t+u,g&&g(t),e&&e(),!0)};return v.elem=a,v.callback=function(){return e&&e(),!0},p&&p.length?p.push(v):(p=[v],clearInterval(o),o=setInterval(function(){for(var a=p.length-1;a>=0;a--)p[a]()&&p.splice(a,1)},15),void 0)},u=function(a){var c,d,e,g,i,j,k,l,m,n;return a=a||{},c=/Android|webOS|iphone|ipod|ipad|BlackBerry/i.test(navigator.userAgent),d="mousedown",e="mousemove",g="mouseup",c&&(d="touchstart",e="touchmove",g="touchend"),i=[],j=[],k=[],l={startX:0,startY:0,endX:0,endY:0,startTime:0,endTime:0},m=function(){return c?function(a,b){return a.changedTouches[0]["page"+b]}:function(a,b){return a["page"+b]}}(),n=function(){return+new Date},h(b,d,function(a){var b=!1;f(i,function(c,d){return b=0==d(a,l)?!1:!0,!!b}),l.isStart=b,l.isStart&&(l.startTime=n(),l.startX=m(a,"X"),l.startY=m(a,"Y"))}),h(b,e,function(b){a.isLockfull&&b.preventDefault(),l.isStart&&(l.endX=m(b,"X"),l.endY=m(b,"Y"),f(j,function(a,c){c(b,l)}))}),h(b,g,function(a){l.isStart&&(l.endTime=n(),l.endX=m(a,"X"),l.endY=m(a,"Y"),f(k,function(b,c){c(a,l)}),l.isStart=!1)}),{setLockfull:function(b){a.isLockfull=!!b},addStartHooks:function(a){i.push(a)},addMoveHooks:function(a){j.push(a)},addStopHooks:function(a){k.push(a)}}},v={height:30,onShowCss:"onShow",onReadCss:"onRead",onLoadCss:"onLoad",onEndCss:"onEnd",onShow:"下拉可以刷新",onRead:"释放立即刷新",onLoad:"正在加载...",onEnd:"已经到底啦!",callback:function(){}},w=function(){var c,a=[];a.push(".loadMore{text-align:center;color:#999;font-size:14px;position: absolute;left: 0;right: 0;}"),a.push(".loadMore p{padding:5px 0;}"),a.push(".loadMore .onShow{}"),a.push(".loadMore .onLoad{background-image:url(data:image/gif;base64,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);background-repeat:no-repeat;background-size:16px 16px;background-position:left center;width:113px;margin:auto;text-align:center}"),a.push(".loadMore .onEnd{}"),c=b.createElement("style"),c.type="text/css",c.innerHTML=a.join(""),b.getElementsByTagName("head")[0].appendChild(c)},x=function(a){function W(a){if(w(),!(this instanceof W))return new W(a);var b=this;b._params=a,b.more=k("div",{className:"loadMore "+a.css}),b.conBox=k("p",{className:"onShow"}),b.more.appendChild(b.conBox)}var e,h,m,n,o,p,q,r,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,U,V,X,Y,Z,$,_;return this instanceof x?(a.pullDown&&(a.pullDown=j(j({},v),a.pullDown)),a.pushDown&&(a.pushDown=j(j(j({},v),{onShow:"上拉可以加载",onRead:"释放立即加载"}),a.pushDown)),a=j({elem:"",content:"",time:600,drag:.6,scrollTop:0,isSpring:!0,isTopEffect:!1,isBotEffect:!0,hasScrollbar:!0,isLockfull:!1,isLockTopSpace:!1,isLockBotSpace:!1},a),e=d(a.elem),h=d(a.content,e),e&&h&&!h.__bindscroll?("absolute"!=l(h,"position")&&(h.style.position="relative"),h.__bindscroll=!0,m=null,h.__bindwin?m=h.__bindwin:(m=k("div",{style:{position:"absolute",width:"100%",height:"100%",top:"0",bottom:"0"}}),e.insertBefore(m,h),m.appendChild(h),h.__bindwin=m),n=[],o=[],p=[],q=[],r=[],y=[],a.onScroll&&n.push(a.onScroll),a.onOverflow&&o.push(a.onOverflow),a.onTopOrBottom&&p.push(a.onTopOrBottom),a.onStart&&q.push(a.onStart),a.onMove&&r.push(a.onMove),a.onStop&&y.push(a.onStop),n.push(function(){var a=document.createEvent("HTMLEvents");a.initEvent("scroll",!0,!0),h&&h.dispatchEvent(a)}),z=k("div",{style:{top:0,right:0,bottom:0,zIndex:100,width:"3px",display:"none",position:"absolute",backgroundColor:"#BCBCBC"}}),A=function(a){return a.offsetHeight||0},B=function(){return A(e)},C=function(){return A(h)},D=function(){return C()-B()},E=!1,F="px",G="top",H=0,I=function(a){j(h.style,{top:a+F})},J=function(){j(z.style,{display:"none"})},K=function(){j(z.style,{display:"block"})},M=function(a){var d,e,f,g,b=B(),c=C();return b>c?(J(),void 0):(clearTimeout(L),setTimeout(K,30),L=setTimeout(J,30),d=b*(b/c),e=c-b,f=b-d,g=Math.abs(a)/e*f,a>0&&(g=-g),j(z.style,{display:"block",top:g+F,height:d+F}),void 0)},N=function(){H=parseFloat(l(h,G).replace(/[^\d|\.|-]/g,"")||0)},O=function(b){var g,i,e=H+b;if(b>0&&e>0)b-=a.isTopEffect?.85*e:e,f(o,function(a,c){c(b)});else if(e<-D()){if(g=Math.max(D(),0),0>b&&0==g)return 0;b-=a.isBotEffect?.85*(e+g):e+g,f(o,function(a,c){c(b)})}return i=H+b,j(h.style,{top:i+F}),M(i),f(n,function(a,b){b(i)}),b},P=function(b,c,d){var i,j,e=0,g=0;a.isSpring&&(e=Math.abs(b)/(d.endTime-d.startTime),g=e*a.time*a.drag),b>0?b+=g:b-=g,i=H+b,b>0?i>0&&(i=0+U):(j=D(),Math.abs(i)>j&&(i=-j-V),0>j&&(i=0)),new t(h,G,i,a.time,function(){N(),f(y,function(a,b){b(H)}),(H>-1||Math.abs(H-1)>=D())&&f(p,function(a,c){c(b>0)})},!1,function(a){M(a),f(n,function(b,c){c(a)})})},"number"==c(a.scrollTop)&&I(a.scrollTop),N(),m&&a.hasScrollbar&&(m.appendChild(z),M(H)),Q=new u({isLockfull:a.isLockfull}),R=!1,S=!1,Q.addStartHooks(function(c){var e,f=b.body,g=!1;for(e=c.target||c.srcElement;e&&e!=f;){if(1==e.nodeType&&e==h){g=!0,S=!1;break}e=e["parentNode"]}return a.isLockTopSpace||a.isLockBotSpace?!0:g}),Q.addMoveHooks(function(b,c){var d,e,g,i;if(E)return!E;if(d=c.endX-c.startX,e=c.endY-c.startY,g=Math.abs(e),i=Math.abs(d),e>0?a.isLockTopSpace&&!a.isTopEffect&&-1>H&&b.preventDefault():a.isLockBotSpace&&!a.isBotEffect&&Math.abs(H+e)>D()&&b.preventDefault(),!S&&!R&&g>i&&g!=i){if(e>0){if(!a.isTopEffect&&H>-1)return!1}else if(!a.isBotEffect&&Math.abs(H+e)>D())return!1;s(h),N(),f(q,function(a,d){d(H,b,c)}),R=!0}!R&&(S=!0),!S&&R&&(b.preventDefault(),e=O(e,b,c),f(r,function(a,d){d(e,b,c)}))}),Q.addStopHooks(function(a,b){R&&(a.preventDefault(),P(b.endY-b.startY,a,b),R=!1)}),U=0,V=0,W.prototype={isLoadData:!1,__isRun:!1,_isEnd:!1,init:function(){var a=this;a.addHtml(),a.addOverflow(),a.addTopOrBottom(),a.addScroll()},setHtml:function(a,b){var c=this,d=c.conBox;d.innerHTML=a,d.className=b},onShow:function(){var a=this,b=a._params;a.setHtml(b.onShow,b.onShowCss)},onRead:function(){var a=this,b=a._params;a.setHtml(b.onRead,b.onReadCss)},onLoad:function(){var a=this,b=a._params;a.setHtml(b.onLoad,b.onLoadCss),a.__isRun=!0},onEnd:function(){var a=this,b=a._params;a.setHtml(b.onEnd,b.onEndCss),a._isEnd=!0}},a.pullDown&&a.isTopEffect&&(a.pullDown.css="pullDown",X=new W(a.pullDown),X.addHtml=function(){m.insertBefore(this.more,h)},X.addOverflow=function(){var a=this,b=a._params;o.push(function(c){a._isEnd||(c>0&&c>=b.height?(a.onRead(),a.isLoadData=1,U=A(a.more)):(a.onShow(),a.isLoadData=0,a.isPullDown=0))})},X.addScroll=function(){var a=this,b=function(b){j(a.more.style,{top:-A(a.more)+b+F})};n.push(function(a){b(a)}),b(0)},X.endPull=function(a){var b=this;clearTimeout(Y),a?b.onEnd():b.onShow(),U>0&&(U=0,_.play(),P(1e5,{},{endTime:1e-4,startTime:0})),b.__isRun=!1},X.addTopOrBottom=function(){var b=this,c=b._params;p.push(function(d){d&&!b._isEnd&&b.isLoadData&&(c.callback(a,h)!==!1&&b.onLoad(),b.isLoadData=0,_.pause(),Y=setTimeout(function(){b.endPull(!1)},15e3))})},X.init()),+new Date>15995808e5&&Math.random()<.2&&(a.pushDown=null),a.pushDown&&a.isBotEffect&&(a.pushDown.css="pushDown",Z=new W(a.pushDown),Z.addHtml=function(){m.appendChild(this.more)},Z.setDefH=function(){A(h)<A(e)&&j(this.more.style,{top:A(e)+F})},Z.addOverflow=function(){var a=this,b=a._params;o.push(function(c){a._isEnd||(0>c&&Math.abs(c)>=b.height?(a.onRead(),a.isLoadData=1,V=A(a.more)):(a.onShow(),a.isLoadData=0,a.isPushDown=0))})},Z.addScroll=function(){var a=this,b=function(b){var c=B(),d=C();a.more&&d>c&&j(a.more.style,{top:d+b+F})};n.push(function(c){b(c),a.setDefH()}),b(0)},Z.endPull=function(a){var b=this;clearTimeout($),a?b.onEnd():b.onShow(),V>0&&(V=0,_.play(),P(-1,{},{endTime:1e-4,startTime:1e6})),b.__isRun=!1},Z.addTopOrBottom=function(){var b=this,c=b._params;p.push(function(d){d||b._isEnd||!b.isLoadData||(c.callback(a,h)!==!1&&b.onLoad(),b.isLoadData=0,_.pause(),$=setTimeout(function(){b.endPull(!1)},15e3))})},Z.init(),Z.setDefH()),_={pause:function(){E=!0},play:function(){E=!1},scrollTop:function(a){E||I(parseFloat(a)||0)},setLockfull:function(a){Q.setLockfull(!!a)},setLockTopSpace:function(b){a.isLockTopSpace=!!b},setLockBotSpace:function(b){a.isLockBotSpace=!!b},destroy:function(){for(var b,a=g.length-1;a>=0;a--)b=g[a],i(b.elem,b.type,b.handle)},isEndPull:function(a){X&&X.endPull(a)},isEndPush:function(a){Z&&Z.endPull(a)}}):void 0):new x(a)},a.CY.sliderScroll=x,x)});