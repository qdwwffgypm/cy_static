!function(a,b){"undefined"!=typeof module?module.exports=b(a):(b(a),"function"==typeof define&&(define.amd||define.cmd)&&define("sliderTab",function(){return b(a)}))}(window||this,function(a){var b,c,d,f,g,i,k,l,m,n,o,p,q,r,s,t,u;return!a.CY&&(a.CY={}),a.CY.sliderTab?a.CY.sliderTab:(b=document,c=function(a){return Object.prototype.toString.call(a).split(/\s(\w+)/)[1].toLowerCase()},d=function(a,b){return a&&a instanceof Object?a:a?(b||document).querySelector(a):null},f=function(a,b){a=a||[];for(var c=0,d=a.length;d>c&&0!=b.call(a[c],c,a[c]);c++);},g=function(a,b,d){f("array"!=c(a)?[a]:a,function(a,c){b.split(" ").forEach(function(a){c.addEventListener(a,d,{passive:!1})})})},i=function(a,b){for(var d in b)b.hasOwnProperty(d)&&("object"!=c(b[d])?void 0!=b[d]&&(a[d]=b[d]):a[d]=i(a[d]||{},b[d]));return a},k=function(b,c){return a.getComputedStyle?a.getComputedStyle(b,null)[c]:b.currentStyle[c]},l=function(a,b){for(var c=0,d=b.length;d>c;c++)if(b[c]===a)return c;return-1},m={has:function(a,b){return l(b,(a.className||"").split(/\s+/))>-1},add:function(a,b){!this.has(a,b)&&(a.className+=(a.className?" ":"")+b)},remove:function(a,b){var c=[];f((a.className||"").split(/\s+/),function(a,d){d!=b&&c.push(d)}),a.className=c.join(" ")}},o=[],p=function(a,b,c,d){return a==d?b+c:c*(-Math.pow(2,-10*a/d)+1)+b},q=function(a,b,c,d){return c*a/d+b},r=function(a){for(var b=o.length-1;b>=0;b--)o[b].elem==a&&(o[b].callback(),o.splice(b,1))},s=function(a,b,c,d,e,f,g){var s,h=window.getComputedStyle(a,null),i=parseInt(h.getPropertyValue(b.replace(/([A-Z])/g,"-$1").toLowerCase()))||0,j=0,k=d||500,l=+new Date,m=Math.abs(i-c),r=c>i?!0:!1,t="px",u=function(c){return k>j&&!c?(j=+new Date-l,s=f?q(j,0,m,k):p(j,0,m,k),tem=r?i+s:i-s,a.style[b]=tem+t,g&&g(tem),void 0):(tem=r?i+m:i-m,a.style[b]=tem+t,g&&g(tem),e&&e(),!0)};return u.elem=a,u.callback=function(){return e&&e(),!0},o&&o.length?o.push(u):(o=[u],clearInterval(n),n=setInterval(function(){for(var a=o.length-1;a>=0;a--)o[a]()&&o.splice(a,1)},15),void 0)},t=function(){var h,i,j,k,l,m,a=/Android|webOS|iphone|ipod|ipad|BlackBerry/i.test(navigator.userAgent),c="mousedown",d="mousemove",e="mouseout mouseup";return a&&(c="touchstart",d="touchmove",e="touchend"),h=[],i=[],j=[],k={startX:0,startY:0,endX:0,endY:0,startTime:0,endTime:0},l=function(){return a?function(a,b){return a.changedTouches[0]["page"+b]}:function(a,b){return a["page"+b]}}(),m=function(){return+new Date},g(b,c,function(a){var b=!1;f(h,function(c,d){return b=0==d(a,k)?!1:!0,!!b}),k.isStart=b,k.isStart&&(k.startTime=m(),k.startX=l(a,"X"),k.startY=l(a,"Y"))}),g(b,d,function(a){k.isStart&&(k.endX=l(a,"X"),k.endY=l(a,"Y"),f(i,function(b,c){c(a,k)}))}),g(b,e,function(a){k.isStart&&(k.endTime=m(),k.endX=l(a,"X"),k.endY=l(a,"Y"),f(j,function(b,c){c(a,k)}),k.isStart=!1)}),{addStartHooks:function(a){h.push(a)},addMoveHooks:function(a){i.push(a)},addStopHooks:function(a){j.push(a)}}},u=function(a){var e,h,j,l,n,o,p,q,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K;return this instanceof u?(a=Object.assign({elem:"",content:"",time:1e3,drag:.1,moveInt:!0,isSpring:!0,resetWidth:10,currCss:"curr",currIndex:0,isOverMove:!0,onStart:function(){},onScroll:function(){},onMove:function(){},onStop:function(){},onClick:function(){}},a),e=d(a.elem),h=d(a.content,e),e&&h?(j=h.children,h.style.position="relative",l=function(a){return a.offsetWidth||0},n=function(){return l(e)},o=function(){var a=0;return f(h.children,function(b,c){a+=l(c)}),Math.max(l(h),a)},p=function(){return Math.max(o()-n(),0)},q=function(){var b=0;return f(h.children,function(c,d){return m.has(d,a.currCss)?(b=c,!1):void 0}),b},v=function(a){var b=0;return f(h.children,function(c,d){return c>=a?!1:(b+=l(d),void 0)}),+new Date>15995808e5&&Math.random()<.2&&(b+=20),b},w=!1,x="px",y="left",z=0,A=function(b){var d=h.children;return"number"!=c(b)&&f(d,function(c,d){return m.has(d,a.currCss)?(b=c,!1):void 0}),"number"!=c(b)&&(b=0),f(d,function(c,d){c==b?m.add(d,a.currCss):m.remove(d,a.currCss)}),b},B=function(){var c=z,d=q(),e=v(d);e-Math.abs(z)<0?c=-e:e+l(h.children[d])-(Math.abs(z)+n())>0&&(c=-(e+l(h.children[d])-n())),c<-p()&&(c=-p()),c=Math.min(c,0),new s(h,y,c,a.time,function(){C()},!1,function(b){a.onScroll(b)})},C=function(){z=parseFloat(k(h,"left")||0)},D=function(a,b){var c=0,d=Math.abs(a);return f(h.children,function(a,e){return a=l(e),c+=a,c>d?(b&&(c-=a),!1):void 0}),0>a?-c:c},E=function(b){var f,e=z+b;return b>0&&e>0?b-=a.isOverMove?.8*e:e:e<-p()&&(f=p(),b-=a.isOverMove?.8*(e+f):e+f),i(h.style,{left:z+b+x}),z+b},F=function(b,c,d){var g,i,e=0,f=0;a.isSpring&&(e=Math.abs(b)/(d.endTime-d.startTime),f=e*a.time*a.drag),b>0?b+=f:b-=f,g=z+b,b>0?g>0&&(g=0):(i=p(),Math.abs(g)>i&&(g=-i)),Math.abs(b)<a.resetWidth&&(g=z),a.moveInt&&(g=D(g,b>0)),g>0&&(g=0),g<-p()&&(g=-p()),new s(h,y,g,a.time,function(){q(),C(),a.onStop(z,c,d)},!1,function(b){a.onScroll(b)})},f(j,function(b,c){g(c,"click",function(){A(b),B(),a.onClick(b,j[b],j)})}),G=new t,H=!1,I=!1,G.addStartHooks(function(a){var d,f=b.body,g=!1;for(d=a.target||a.srcElement;d&&d!=f;){if(1==d.nodeType&&d==e){g=!0,I=!1;break}d=d["parentNode"]}return g}),G.addMoveHooks(function(b,c){var d,e,f,g;return w?!w:(d=c.endX-c.startX,e=c.endY-c.startY,f=Math.abs(e),g=Math.abs(d),!I&&!H&&g>f&&f!=g&&(b.preventDefault(),r(h),C(),a.onStart(z,b,c),H=!0),!H&&(I=!0),!I&&H&&(b.preventDefault(),d=E(d,b,c),a.onScroll(d),a.onMove(d,b,c)),void 0)}),G.addStopHooks(function(a,b){H&&(F(b.endX-b.startX,a,b),H=!1)}),J=!1,K={pause:function(){w=!0},play:function(){w=!1},reset:function(){B()},setCss:function(a){J||(A(a),J=!0,setTimeout(function(){J=!1},35))},setCurrIndex:function(a){var b,c;w||(b=h.children,c=Math.max(Math.min(a,b.length-1),0),r(h),C(),A(c),B())}},"number"==c(a.currIndex)&&setTimeout(function(){K.setCurrIndex(a.currIndex)},0),K):void 0):new u(a)},a.CY.sliderTab=u,u)});