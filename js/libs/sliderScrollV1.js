!function(a,b){"undefined"!=typeof module?module.exports=b(a):(b(a),"function"==typeof define&&(define.amd||define.cmd)&&define("sliderScrollV1",function(){return b(a)}))}(window||this,function(a){var b,c,d,e,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,x,w,y,z,A,B,C;return!a.CY&&(a.CY={}),a.CY.sliderScrollV1?a.CY.sliderScrollV1:(window.requestAnimationFrame||(b=0,window.requestAnimationFrame=function(a){var c=(new Date).getTime(),d=Math.max(0,16.7-(c-b)),e=window.setTimeout(function(){a(c+d)},d);return b=c+d,e}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)}),c=document,d=function(a){return Object.prototype.toString.call(a).split(/\s(\w+)/)[1].toLowerCase()},e=function(a,b){return a&&a instanceof Object?a:a?(b||document).querySelector(a):null},g=function(a,b){a=a||[];for(var c=0,d=a.length;d>c&&0!=b.call(a[c],c,a[c]);c++);},h=[],i="0",j=function(a,b,c){g("array"!=d(a)?[a]:a,function(a,d){b.split(" ").forEach(function(a){d.addEventListener(a,c,{passive:!1}),h.push({elem:d,type:a,KENID:i,handle:c})})})},k=function(a,b,c){b.split(" ").forEach(function(b){a.removeEventListener(b,c)})},l=function(a,b){for(var c in b)b.hasOwnProperty(c)&&("object"!=d(b[c])?void 0!=b[c]&&(a[c]=b[c]):a[c]=l(a[c]||{},b[c]));return a},m=function(a,b){b=b||{},a=c.createElement(a);for(var d in b)b.hasOwnProperty(d)&&("style"==d?l(a.style,b[d]):a[d]=b[d]);return a},n=function(b,c){return a.getComputedStyle?a.getComputedStyle(b,null)[c]:b.currentStyle[c]},o=function(a,b){for(var c=0,d=b.length;d>c;c++)if(b[c]===a)return c;return-1},p={has:function(a,b){return o(b,(a.className||"").split(/\s+/))>-1},add:function(a,b){!this.has(a,b)&&(a.className+=(a.className?" ":"")+b)},remove:function(a,b){var c=[];g((a.className||"").split(/\s+/),function(a,d){d!=b&&c.push(d)}),a.className=c.join(" ")}},r=[],s=function(a,b,c,d){return c*((a=a/d-1)*a*a+1)+b},t=function(a,b,c,d){return c*a/d+b},u=function(a){for(var b=r.length-1;b>=0;b--)r[b].elem==a&&(r[b].callback(),r.splice(b,1))},v=function(a,b,c,d,e,f,g){var j,k,l,m,o,p,n,u,v,h=window.getComputedStyle(a,null),i=parseInt(h.getPropertyValue(b.replace(/([A-Z])/g,"-$1").toLowerCase()))||0;return"scrollTop"==b&&(i=a.scrollTop||0),j=0,k=d||500,l=+new Date,m=Math.abs(i-c),n=c>i?!0:!1,u="px",v=function(c){return k>j&&!c?(j=+new Date-l,o=f?t(j,0,m,k):s(j,0,m,k),p=n?i+o:i-o,"scrollTop"==b?a[b]=p:a.style[b]=p+u,g&&g(p),void 0):(p=n?i+m:i-m,"scrollTop"==b?a[b]=p:a.style[b]=p+u,g&&g(p),e&&e(),!0)},v.elem=a,v.callback=function(){return e&&e(),!0},r&&r.length?r.push(v):(r=[v],cancelAnimationFrame(q),q=requestAnimationFrame(function w(){for(var a=r.length-1;a>=0;a--)r[a]()&&r.splice(a,1);r.length>0&&(q=requestAnimationFrame(w))}),void 0)},w=[],y=function(a){w.push(a),w.length<2&&(x=requestAnimationFrame(function b(){for(var a=w.length-1;a>=0;a--)w[a]()&&w.splice(a,1);w.length>0&&setTimeout(function(){x=requestAnimationFrame(b)},1e3)})),a()},z=function(){var h,i,k,l,m,n,o,p,q,r,s,t,u,v,a=/Android|webOS|iphone|ipod|ipad|BlackBerry/i.test(navigator.userAgent),b="mousedown",d="mousemove",e="mouseup",f="mousewheel DOMMouseScroll";return a&&(b="touchstart",d="touchmove",e="touchend"),h=[],i=[],k=[],l=[],m={startX:0,startY:0,endX:0,endY:0,startTime:0,endTime:0},n=function(){return a?function(a,b){return a.changedTouches[0]["page"+b]}:function(a,b){return a["page"+b]}}(),o=function(){return+new Date},p=function(a,b){for(var c=b;c.parentNode;)if(c=c.parentNode,c==a)return!0;return!1},q=function(a){var c,b=!0,d=function(e){if(1==a.length)return c=a[0].content,void 0;for(var f=a.length-1;f>=0;f--)p(a[f].content,e.content)&&a.splice(f,1);b=!b,a.length>1?d(a[b?0:a.length-1]):c=a[0].content};return d(a[0]),c},r=!1,s=null,j(c,b,function(a){if(r=!1,s=null,h=[],g(i,function(b,c){var d=c(a,m);d&&void 0!=d.isStart&&(d.content&&h.push(d),!r&&(r=d.isStart))}),r){var b=!1,c=[];g(h,function(a,d){d.content&&c.push(d),d.content&&d.isSingleton&&(b=!0)}),b&&(s=q(c)),m.startTime=o(),m.startX=n(a,"X"),m.startY=n(a,"Y")}}),j(c,d,function(a){r&&(m.endX=n(a,"X"),m.endY=n(a,"Y"),g(k,function(b,c){c(a,m,void 0,s)}))}),j(c,e,function(a){r&&(m.endTime=o(),m.endX=n(a,"X"),m.endY=n(a,"Y"),g(l,function(b,c){c(a,m,void 0,s)})),r=!1,s=null}),t=25,u=0,v=0,f&&j(c,f,function(a){var b,c,d,e;0==v&&0==u&&(r=!1,s=null,h=[],g(i,function(b,c){var d=c(a,m);d&&void 0!=d.isStart&&(d.content&&h.push(d),!r&&(r=d.isStart))}),b=!1,c=[],g(h,function(a,d){d.content&&c.push(d),d.content&&d.isSingleton&&(b=!0)}),b&&(s=q(c))),r&&(d=null,d=a.wheelDelta?a.wheelDelta:40*-a.detail,d=d>0?t:-t,e=d>0?t-1:-t+1,u+=d,v+=e,m.startX=0,m.startY=0,m.endX=v,m.endY=u,d>0?(m.startTime=0,m.endTime=5e5):(m.startTime=0,m.endTime=5e5),g(k,function(b,c){c(a,m,d,s)}),g(l,function(b,c){c(a,m,d,s)}),v=0,u=0,r=!1,s=null)}),function(a){return a=a||{},{setLockfull:function(b){a.isLockfull=!!b},setActivated:function(b){a.isActivated=!!b},addStartHooks:function(b){i.push(function(c,d,e){return a.isActivated?b(c,d,e):void 0})},addMoveHooks:function(b){k.push(function(c,d,e,f){return!a.isActivated||f&&a.content!=f?void 0:(a.isLockfull&&c.preventDefault(),b(c,d,e))})},addStopHooks:function(b){l.push(function(c,d,e,f){return!a.isActivated||f&&a.content!=f?void 0:b(c,d,e)})}}}}(),A={height:30,onShowCss:"onShow",onReadCss:"onRead",onLoadCss:"onLoad",onEndCss:"onEnd",onShow:"下拉可以刷新",onRead:"释放立即刷新",onLoad:"正在加载...",onEnd:"已经到顶啦!",callback:function(){}},B=function(){var b,a=[];a.push(".winBoxScroll,.winBoxScrollInner{position: absolute; overflow: hidden; width: 100%; height: 100%; top: 0px; bottom: 0px;}"),a.push(".winBoxScrollInner .botSpaceElem,.winBoxScrollInner .topSpaceElem{position: relative}"),a.push(".winBoxScrollInner .pushDown{top: 0;}"),a.push(".winBoxScrollInner .pullDown{bottom: 0;}"),a.push(".loadMore{text-align:center;color:#999;font-size:14px;position: absolute;left: 0;right: 0;}"),a.push(".loadMore p{padding:6px 0;color:#999;}"),a.push(".loadMore .onShow{}"),a.push(".loadMore .onLoad{background-image:url(data:image/gif;base64,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);background-repeat:no-repeat;background-size:16px 16px;background-position:left center;width:113px;margin:auto;text-align:center}"),a.push(".loadMore .onEnd{}"),a.push(".scrollbar {border-radius: 4px;opacity: 0;transition: opacity .6s;right: 0;bottom: 0;z-index: 100;width :4px;position: absolute;background-color: #BCBCBC}"),a.push(".scrollbarShow {opacity: 1;}"),a.push(".topMask,.botMask {position:absolute;left:50%;right:0;background-color:#ffc922;z-index:1;opacity:0.15;border-radius:0 0 100% 100%;width:200%;transform:translateX(-50%);}"),a.push(".botMask {border-radius: 100% 100% 0 0}"),b=c.createElement("style"),b.type="text/css",b.innerHTML=a.join(""),c.getElementsByTagName("head")[0].appendChild(b),B=function(){}},C=function(a){function yb(a){if(!(this instanceof yb))return new yb(a);var b=this;b._params=a,b.more=m("div",{className:"loadMore "+a.css}),b.conBox=m("p",{innerHTML:"&nbsp;",className:"onShow"}),b.more.appendChild(b.conBox)}var b,f,o,q,r,s,t,w,x,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,$,_,ab,bb,cb,db,eb,fb,gb,hb,ib,jb,kb,lb,mb,nb,ob,pb,qb,rb,sb,tb,ub,wb,xb,zb,Ab,Bb,Cb,Db,Eb,Fb,Gb,Hb;return this instanceof C?(this._KENID=Math.random(),i=this._KENID,a.pullDown&&(a.pullDown=l(l({},A),a.pullDown)),a.pushDown&&(a.pushDown=l(l(l({},A),{onShow:"上拉可以加载",onRead:"释放立即加载",onEnd:"已经到底啦!"}),a.pushDown)),a=l({elem:"",content:"",time:600,drag:.9,springDrag:.8,scrollTop:0,itemHeight:0,hasMask:!1,isSpring:!0,isTopEffect:!1,isBotEffect:!0,hasScrollbar:!0,isLockfull:!1,isLockTopSpace:!1,isLockBotSpace:!1,hasHoveScrollbar:!1,isSingleton:!1,isPauseReset:!0},a),b=e(a.elem),f=e(a.content,b),b&&f&&!f.__bindscroll?(B(),"absolute"!=n(f,"position")&&(f.style.position="relative"),f.__bindscroll=!0,o=100,q=100,r=null,s=null,x=function(a){s=m("div",{className:"winBoxScrollInner"}),t=m("div",{className:"topSpaceElem",style:{height:o+T}}),w=m("div",{className:"botSpaceElem",style:{height:q+T}}),r.appendChild(s),!a&&b.insertBefore(r,f),s.appendChild(t),s.appendChild(f),s.appendChild(w),f.__bindwin=r},f.__bindwin?(r=f.__bindwin,x(!0)):(r=m("div",{className:"winBoxScroll"}),x(),r.isActive=!0),E=[],F=[],G=[],H=[],I=[],J=[],K=[],a.onScroll&&E.push(a.onScroll),a.onOverflow&&F.push(a.onOverflow),a.onTopOrBottom&&G.push(a.onTopOrBottom),a.onStart&&H.push(a.onStart),a.onMove&&I.push(a.onMove),a.onStop&&J.push(a.onStop),a.onSpringBottom&&K.push(a.onSpringBottom),E.push(function(){var a=document.createEvent("HTMLEvents");a.initEvent("scroll",!0,!0),s&&s.dispatchEvent(a)}),L=a.itemHeight,M=m("div",{className:"scrollbar",style:{top:0}}),N=function(a){return a.scrollHeight||0},O=function(){return N(b)},P=function(){return N(s)},Q=function(){return P()-O()},R=!1,S=!1,T="px",U="scrollTop",V=0,W=function(a){s&&(u(s),a=Math.max(a,0),s.scrollTop=Math.max(a+o,o))},Y=function(){X=setTimeout(function(){p.remove(M,"scrollbarShow")},400)},Z=function(){p.add(M,"scrollbarShow"),clearTimeout(X)},_=function(a){var b,c,d,e,f,g;return a-=o,b=O(),c=P()-o-q,b>c?(Y(),void 0):(clearTimeout($),setTimeout(Z,30),$=setTimeout(Y,70),d=b*(b/c),e=c-b,f=b-d,g=a/e*f,Z(),l(M.style,{top:g+T,height:d+T}),void 0)},a.hasMask&&(gb=b.offsetWidth,a.isTopEffect||(ab=m("div",{className:"topMask",style:{top:-gb+T,height:gb+T}}),r.insertBefore(ab,s)),a.isBotEffect||(db=m("div",{className:"botMask"}),hb=function(){l(db.style,{top:N(b)+T,height:b.offsetWidth+T}),setTimeout(function(){hb()},2e3)},hb(),r.appendChild(db))),ib=function(){V=s?s.scrollTop||0:0},jb=0,kb=0,lb=function(b,c,d,e){var f,h,i,j;if(jb=Math.abs(b)-Math.abs(kb),kb=Math.abs(b),f=V+b,h=0,0>b&&o>f)a.isTopEffect?void 0!=e?(b=b,h=b):(b=-(o-f)*(1-a.springDrag),h=b):(b=b-f+o,h=b),g(F,function(a,b){b(h)});else if(f>Q()-q){if(i=Math.max(Q()-q,0),0>b&&0==i)return 0;a.isBotEffect?void 0!=e?(b=b,h=b):(b-=(f-i)*(9*a.springDrag/10),h=b):(b-=f-i,h=b),g(F,function(a,b){b(h)})}return j=V+b,s[U]=j,_(j),g(E,function(a,b){b(j-o,c,d)}),b},mb=function(b,c,d,e,f){var j,m,n,p,r,h=0,i=0,k=.14,l=!1;a.isSpring&&(h=Math.abs(b)/(d.endTime-d.startTime),jb>2&&h>k&&(i=h*a.time*a.drag)),b>0?b+=i:b-=i,j=V+b,f&&(j=f),0>b?(L>0&&(j=Math.ceil(j/L)*L),o>j&&(j=o-wb,l=!0)):(L>0&&(j=Math.floor(j/L)*L),m=Q()-q,j>m&&(j=m+xb,l=!0),o>m&&(j=o)),n=l?a.time/1.53:a.time,void 0!=e?n=1.8*a.time:a.isSpring&&.65>h&&(n=h>k&&jb>2?a.time/1.53:0),p=function(a){_(a),g(E,function(b,e){e(a-q,c,d)})},r=function(){ib(),g(J,function(a,b){b(V-q)}),(V>-1||Math.abs(V-1)>=Q())&&g(G,function(a,c){c(0>b)})},0!=n||l?new v(s,U,j,n,function(){r()},!1,function(a){p(a)}):(p(j),r())},nb=null,ob=function(){var b=Q()-q,c=s.scrollTop||0;(c>b||o>V)&&b>0&&(clearTimeout(nb),nb=setTimeout(function(){ib();var a=Q()-q;V>a&&a>0?s[U]=a:o>V&&qb===!1&&(s[U]=o)},a.time+300))},y(function(){var d,e,c=O();o=c,q=c,t&&l(t.style,{height:c+T}),w&&l(w.style,{height:c+T}),f.style.minHeight=O()+T,qb===!1&&(d=function(){zb?0==wb&&ob():ob()},Cb?0==xb&&d():d()),a.hasMask&&(e=b.offsetWidth,a.isTopEffect||l(ab.style,{top:-e+T,height:e+T}),a.isBotEffect||l(db.style,{top:N(b)+T,height:b.offsetWidth+T}))}),requestAnimationFrame(function Ib(){0==S&&(W("number"==d(a.scrollTop)?a.scrollTop:0),ib(),setTimeout(function(){requestAnimationFrame(Ib)},500))}),r&&a.hasScrollbar&&(r.appendChild(M),a.hasHoveScrollbar&&(j(b,"mouseover",function(){var a=O(),b=P();b>a&&Z()}),j(b,"mouseout",function(){Y()})),_(V)),pb=new z({content:f,isLockfull:a.isLockfull,isActivated:!0}),qb=!1,rb=!1,sb={},pb.addStartHooks(function(b){qb=!1,S=!0,sb={};var e,g=c.body,h=!1,i=null;for(e=b.target||b.srcElement;e&&e!=g;){if(1==e.nodeType&&e==f){i=f,h=!0,rb=!1,cb=!1,fb=!1;break}e=e["parentNode"]}return{isStart:a.isLockTopSpace||a.isLockBotSpace?!0:h,content:i,isSingleton:a.isSingleton}}),tb=c.body,ub=c.documentElement,pb.addMoveHooks(function(b,c,d){var e,h,i,j,k,m,n,p,t;if(null!=f.parentNode){if(R&&a.isPauseReset&&(ib(),sb.startX=c.endX,sb.startY=c.endY,sb.startTime=c.endTime),e=c.startX-c.endX,h=c.startY-c.endY,sb.startX&&(e=sb.startX-c.endX,h=sb.startY-c.endY),i=ub.scrollTop||tb.scrollTop||0,h>0&&1>i&&b.preventDefault(),!r.isActive||e==h&&0==h)return!1;if(j=Math.abs(h),k=Math.abs(e),m=function(a){g(G,function(b,c){c(a)})},0>h?(a.isLockTopSpace&&b.preventDefault(),a.isTopEffect||(V+h>o?b.preventDefault():ab&&!cb&&(b.preventDefault(),clearTimeout(bb),n=function(a){ab&&l(ab.style,{marginTop:Math.max(a,0)+T})},n((o-(V+h))/5),bb=setTimeout(function(){cb=!0,new v(ab,"marginTop",0,200)},60)))):(a.isLockBotSpace&&b.preventDefault(),a.isBotEffect||V+h>Q()-q&&(b.preventDefault(),db&&!fb&&(clearTimeout(eb),p=function(a){db&&l(db.style,{marginTop:-Math.min(a,q)+T})},p((V+h-(Q()-q))/5),eb=setTimeout(function(){new v(db,"marginTop",0,200),fb=!0},60)))),!rb&&!qb&&j>k&&j!=k&&(u(s),ib(),g(H,function(a,d){d(V-o,b,c)}),qb=!0),!qb&&(rb=!0),!rb&&qb&&!R){if(t=function(){h=lb(h,b,c,d),g(I,function(a,d){d(h,b,c)})},0>h){if(!a.isTopEffect&&o>V+h)return t(),m(!0),qb=!1,rb=!0,!1}else if(!a.isBotEffect&&Math.abs(V+h)>Q()-q)return t(),m(!1),qb=!1,rb=!0,!1;b.preventDefault(),t()}}}),pb.addStopHooks(function(a,b,c){if(qb&&!R){if(null==f.parentNode)return;a.preventDefault(),mb(b.startY-b.endY,a,b,c),qb=!1}qb=!1,void 0!=c&&(rb=!1)}),wb=0,xb=0,yb.prototype={isLoadData:!1,__isRun:!1,_isEnd:!1,init:function(){var a=this;a.addHtml(),a.addOverflow(),a.addTopOrBottom(),a.addScroll()},setHtml:function(a,b){var c=this,d=c.conBox;d.innerHTML=a,d.className=b},onShow:function(){var a=this,b=a._params;a.setHtml(b.onShow,b.onShowCss)},onRead:function(){var a=this,b=a._params;a.setHtml(b.onRead,b.onReadCss)},onLoad:function(){var a=this,b=a._params;a.setHtml(b.onLoad,b.onLoadCss),a.__isRun=!0},onEnd:function(){var a=this,b=a._params;a.setHtml(b.onEnd,b.onEndCss),a._isEnd=!0}},Bb=!1,Eb=!1,a.pullDown&&a.isTopEffect&&(a.pullDown.css="pullDown",zb=new yb(a.pullDown),zb.addHtml=function(){t.appendChild(this.more)},zb.addOverflow=function(){var a=this,b=a._params;F.push(function(c){a._isEnd||R||(0>c&&Math.abs(c)>=b.height?(a.onRead(),a.isLoadData=1,wb=N(a.more)):(a.onShow(),a.isLoadData=0,wb=0))})},zb.addScroll=function(){var b=function(){};E.push(function(a){b(a)}),b(0)},zb.endPull=function(a){var b=this;clearTimeout(Ab),a?b.onEnd():b.onShow(),wb>0&&(wb=0,Hb.play(),mb(-1,{},{endTime:1e-4,startTime:1e6})),Bb&&(Bb=!1,Hb.play()),b.__isRun=!1},zb.addTopOrBottom=function(){var b=this,c=b._params;G.push(function(d){d&&!b._isEnd&&b.isLoadData&&(c.callback(a,f)!==!1&&b.onLoad(),b.isLoadData=0,Hb.pause(),Bb=!0,Ab=setTimeout(function(){b.endPull(!1)},15e3))})},zb.init()),a.pushDown&&a.isBotEffect&&(a.pushDown.css="pushDown",Cb=new yb(a.pushDown),Cb.addHtml=function(){w.appendChild(this.more)},Cb.setDefH=function(){N(f)<N(b)},Cb.addOverflow=function(){var a=this,b=a._params,c=function(c){a._isEnd||R||(c>0&&c>=b.height?(a.onRead(),a.isLoadData=1,xb=N(a.more)):(a.onShow(),a.isLoadData=0,xb=0))};F.push(function(a){c(a)})},Cb.addScroll=function(){var a=this,b=function(){var c=O(),d=P();a.more&&d>c};E.push(function(c){b(c),a.setDefH()}),b(0)},Fb=1e5,Cb.endPull=function(a){var b=this;clearTimeout(Db),a?b.onEnd():b.onShow(),xb>0&&(xb=0,Hb.play(),mb(Fb,{},{endTime:1e-4,startTime:0},void 0,Fb)),Eb&&(Eb=!1,Hb.play()),b.__isRun=!1},Cb.addTopOrBottom=function(){var b=this,c=b._params;G.push(function(d){d||b._isEnd||!b.isLoadData||(Fb=Math.max(Q()-q,0),c.callback(a,f)!==!1&&b.onLoad(),b.isLoadData=0,Hb.pause(),Eb=!0,Db=setTimeout(function(){b.endPull(!1)},15e3))})},Cb.init(),Cb.setDefH()),Gb=this,Hb={pause:function(){R=!0},play:function(){R=!1},scrollTop:function(a){W(Math.max(parseFloat(a)||0),0)},getScrollTop:function(){var a=V-o;return a?parseFloat(a):0},setLockfull:function(a){pb.setLockfull(!!a)},setLockTopSpace:function(b){a.isLockTopSpace=!!b},setLockBotSpace:function(b){a.isLockBotSpace=!!b},setActivated:function(a){pb.setActivated(!!a)},setItemHeight:function(a){L=a},destroy:function(){var c,b,a=[];for(g(h,function(b,c){Gb._KENID!=c.KENID&&a.push(l({},c))}),b=h.length-1;b>=0;b--)c=h[b],k(c.elem,c.type,c.handle);for(h.length=[],b=a.length-1;b>=0;b--)c=a[b],i=c.KENID,j(c.elem,c.type,c.handle)},isEndPull:function(a){zb&&(zb.endPull(a),!a&&(zb._isEnd=!1))},isEndPush:function(a){Cb&&(Cb.endPull(a),!a&&(Cb._isEnd=!1))}},Hb):void 0):new C(a)},a.CY.sliderScrollV1=C,C)});