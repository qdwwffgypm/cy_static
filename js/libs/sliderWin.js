!function(a,b){"undefined"!=typeof module?module.exports=b(a):(b(a),"function"==typeof define&&(define.amd||define.cmd)&&define("sliderWin",function(){return b(a)}))}(window||this,function(a){var b,c,d,e,f,g,h,i,j,k,l,m,o,p,q,r,s,t,u,v;return!a.CY&&(a.CY={}),a.CY.sliderWin?a.CY.sliderWin:(window.requestAnimationFrame||(b=0,window.requestAnimationFrame=function(a){var c=(new Date).getTime(),d=Math.max(0,16.7-(c-b)),e=window.setTimeout(function(){a(c+d)},d);return b=c+d,e}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)}),c=document,d=function(a){return Object.prototype.toString.call(a).split(/\s(\w+)/)[1].toLowerCase()},e=function(a,b){return a&&a instanceof Object?a:a?(b||document).querySelector(a):null},f=function(a,b){return a&&a instanceof Object?a:a?(b||document).querySelectorAll(a):null},g=function(a,b){a=a||[];for(var c=0,d=a.length;d>c&&0!=b.call(a[c],c,a[c]);c++);},h=[],i="0",j=function(a,b,c){g("array"!=d(a)?[a]:a,function(a,d){b.split(" ").forEach(function(a){d.addEventListener(a,c,{passive:!1}),h.push({elem:d,type:a,KENID:i,handle:c})})})},k=function(a,b,c,d){b.split(" ").forEach(function(b){a.removeEventListener(b,c);for(var f,e=h.length-1;e>=0;e--)f=h[e],f.elem==a&&f.type==b&&f.handle==c&&d==f.KENID&&h.splice(e,1)})},l=function(a,b){for(var c in b)b.hasOwnProperty(c)&&("object"!=d(b[c])?void 0!=b[c]&&(a[c]=b[c]):a[c]=l(a[c]||{},b[c]));return a},m=function(a,b){a=c.createElement(a);for(var d in b)b.hasOwnProperty(d)&&("style"==d?l(a.style,b[d]):a[d]=b[d]);return a},p=[],q=function(a,b,c,d){return c*((a=a/d-1)*a*a+1)+b},r=function(a,b,c,d){return c*a/d+b},s=function(a){for(var b=p.length-1;b>=0;b--)p[b].elem==a&&(p[b].callback(),p.splice(b,1))},t=function(a,b,c,d,e,f,g){var s,h=window.getComputedStyle(a,null),i=parseInt(h.getPropertyValue(b.replace(/([A-Z])/g,"-$1").toLowerCase()))||0,j=0,k=d||500,l=+new Date,m=Math.abs(i-c),n=c>i?!0:!1,t="px",u=function(c){return k>j&&!c?(j=+new Date-l,s=f?r(j,0,m,k):q(j,0,m,k),tem=n?i+s:i-s,a.style[b]=tem+t,g&&g(tem),void 0):(tem=n?i+m:i-m,a.style[b]=tem+t,g&&g(tem),e&&e(),!0)};return u.elem=a,u.callback=function(){return e&&e(),!0},p&&p.length?p.push(u):(p=[u],cancelAnimationFrame(o),o=requestAnimationFrame(function v(){for(var a=p.length-1;a>=0;a--)p[a]()&&p.splice(a,1);p.length>0&&(o=requestAnimationFrame(v))}),void 0)},u=function(a){var b,d,e,f,h,i,k,l,m,n;return a=a||{},b=/Android|webOS|iphone|ipod|ipad|BlackBerry/i.test(navigator.userAgent),d="mousedown",e="mousemove",f="mouseout mouseup",b&&(d="touchstart",e="touchmove",f="touchend"),h=[],i=[],k=[],l={startX:0,startY:0,endX:0,endY:0,startTime:0,endTime:0},m=function(){return b?function(a,b){return a.changedTouches[0]["page"+b]}:function(a,b){return a["page"+b]}}(),n=function(){return+new Date},j(c,d,function(b){if(a.isActivated){var c=!1;g(h,function(a,d){return c=0==d(b,l)?!1:!0,!!c}),l.isStart=c,l.isStart&&(l.startTime=n(),l.startX=m(b,"X"),l.startY=m(b,"Y"))}}),j(c,e,function(b){a.isActivated&&l.isStart&&(l.endX=m(b,"X"),l.endY=m(b,"Y"),g(i,function(a,c){c(b,l)}))}),j(c,f,function(a){l.isStart&&(l.endTime=n(),l.endX=m(a,"X"),l.endY=m(a,"Y"),g(k,function(b,c){c(a,l)}),l.isStart=!1)}),{setActivated:function(b){a.isActivated=!!b},addStartHooks:function(a){h.push(a)},addMoveHooks:function(a){i.push(a)},addStopHooks:function(a){k.push(a)}}},v=function(a){var b,n,o,p,q,r,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K;return this instanceof v?(this._KENID=Math.random(),i=this._KENID,a=Object.assign({elem:"",content:"",time:650,springDrag:.8,resetWidth:40,currIndex:0,isOverMove:!0,onChange:function(){},onScroll:function(){},onStart:function(){},onMove:function(){},onStop:function(){}},a),b=e(a.elem),n=f(a.content,b)||[],b&&n.length?(o=[],g(n,function(a,c){return c.__bindwin?(c.__bindwin.isActive=!1,o.push(c.__bindwin),void 0):(a=m("div",{className:"winBoxScroll",style:{position:"absolute",overflow:"hidden",width:"100%",height:"100%",top:"0",bottom:"0"}}),c.__bindwin=a,a.isActive=!1,o.push(a),b.insertBefore(a,c),a.appendChild(c),void 0)}),n=o,p=function(a){return a.offsetWidth||0},q=function(){return p(b)},r=function(){var a=0;return g(n,function(b,c){a+=p(c)}),+new Date>15995808e5&&Math.random()<.2&&(a+=20),a},w=function(a){g(n,function(b,c){c.isActive=b==a?!0:!1})},x=!1,y="px",z="left",A=[],B=function(a){var b=q();g(n,function(c,d){var e=0,f=Math.abs(c-a)*b;c==a||(e=c>a?f:-f),A.push(e),l(d.style,{left:e+y,zIndex:c})})},C=function(){g(n,function(a,b){A[a]=parseFloat(b.style.left)})},D=function(b){var e=n.length-1,f=A[0]+b,h=A[e]+b;return b>0&&f>0?b-=a.isOverMove?f*a.springDrag:f:0>h&&(b-=a.isOverMove?h*a.springDrag:h),g(n,function(a,c){var d=A[a]+b;l(c.style,{left:d+y})}),A[0]+b},E=function(a){var b=q(),c=Math.abs(a%b);return 0!=c&&(c>b/2&&(c=b-c),a+=0==(a+c)%b?c:-c),a},F=function(b){var h,e=n.length-1,f=q();b>0?E(A[0]+f)>0&&(f=0):E(A[e]-f)<0&&(f=0),h=a.time,Math.abs(b)<a.resetWidth&&(h=a.time/1.5,f=0),g(n,function(c,d){var g=Math.round(A[c]+(b>0?+f:-f));g=E(g),0==Math.abs(g)&&(a.currIndex=c),new t(d,z,E(g),h,function(){c==e&&(a.onStop(b>0?+f:-f),a.onChange(a.currIndex,n[a.currIndex]),w(a.currIndex))},!1,function(b){var d,e,f,g;0==c&&(d=q(),e=-Math.max(r(),d),f=Math.max(Math.min(b,0),e+d)/d,g=Math.abs(Math.round(f)),a.onScroll(g,n[g],Math.abs(f)))})})},G=new u({isActivated:!0}),H=!1,I=!1,G.addStartHooks(function(a){var e,f=c.body,g=!1;for(e=a.target||a.srcElement;e&&e!=f;){if(1==e.nodeType&&e==b){g=!0,I=!1;break}e=e["parentNode"]}return g}),G.addMoveHooks(function(b,c){var i,j,k,l,d=c.endX-c.startX,e=c.endY-c.startY,f=Math.abs(e),h=Math.abs(d);!I&&!H&&h>f&&f!=h&&(g(n,function(a,b){s(b)}),b.preventDefault(),C(),a.onStart(0,b,c),H=!0),!H&&(I=!0),I||!H||x||(b.preventDefault(),d=D(d,b,c),i=q(),j=-Math.max(r(),i),k=Math.max(Math.min(d,0),j+i)/i,l=Math.abs(Math.round(k)),a.onScroll(l,n[l],Math.abs(k)),a.onMove(d,b,c))}),G.addStopHooks(function(a,b){H&&!x&&(F(b.endX-b.startX,a,b),H=!1)}),J=this,K={pause:function(){x=!0},play:function(){x=!1},getCurrIndex:function(){return a.currIndex},setActivated:function(a){G.setActivated(!!a)},destroy:function(){var c,b,a=[];for(g(h,function(b,c){J._KENID!=c.KENID&&a.push(l({},c))}),b=h.length-1;b>=0;b--)c=h[b],k(c.elem,c.type,c.handle);for(h.length=[],b=a.length-1;b>=0;b--)c=a[b],i=c.KENID,j(c.elem,c.type,c.handle)},setCurrIndex:function(b){if(!x){var c=Math.max(Math.min(b,n.length-1),0);B(c),C(),a.onScroll(c,n[c],c),a.onChange(c,n[c]),w(c)}}},"number"==d(a.currIndex)&&setTimeout(function(){K.setCurrIndex(a.currIndex),w(a.currIndex)},13),n.length<2&&n.length>0&&(K.pause(),setTimeout(function(){a.onChange(0,n[0]),w(0)},13)),K):void 0):new v(a)},a.CY.sliderWin=v,v)});