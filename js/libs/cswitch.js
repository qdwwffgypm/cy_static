!function(a,b){"undefined"!=typeof module?module.exports=b(a):(b(a),"function"==typeof define&&(define.amd||define.cmd)&&define("cswitch",function(){return b(a)}))}(window||this,function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s;return!a.CY&&(a.CY={}),a.CY.cswitch?a.CY.cswitch:(b=document,c=function(a){return Object.prototype.toString.call(a).split(/\s(\w+)/)[1].toLowerCase()},d=function(a,b){return a&&a instanceof Object?a:a?(b||document).querySelector(a):null},e=function(a,b){a=a||[];for(var c=0,d=a.length;d>c&&0!=b.call(a[c],c,a[c]);c++);},f=[],g="0",h=function(a,b,d){e("array"!=c(a)?[a]:a,function(a,c){b.split(" ").forEach(function(a){c.addEventListener(a,d,{passive:!1}),f.push({elem:c,type:a,KENID:g,handle:d})})})},i=function(a,b,c,d){b.split(" ").forEach(function(b){a.removeEventListener(b,c);for(var g,e=f.length-1;e>=0;e--)g=f[e],g.elem==a&&g.type==b&&g.handle==c&&d==g.KENID&&f.splice(e,1)})},j=function(a,b){for(var d in b)b.hasOwnProperty(d)&&("object"!=c(b[d])?void 0!=b[d]&&(a[d]=b[d]):a[d]=j(a[d]||{},b[d]));return a},k=function(a,c){a=b.createElement(a);for(var d in c)c.hasOwnProperty(d)&&("style"==d?j(a.style,c[d]):a[d]=c[d]);return a},l=function(a,b){for(var c=0,d=b.length;d>c;c++)if(b[c]===a)return c;return-1},m={has:function(a,b){return l(b,(a.className||"").split(/\s+/))>-1},add:function(a,b){!this.has(a,b)&&(a.className+=(a.className?" ":"")+b)},remove:function(a,b){var c=[];e((a.className||"").split(/\s+/),function(a,d){d!=b&&c.push(d)}),a.className=c.join(" ")}},o=function(a){return a+(Math.random()+"").slice(9)},p=function(){var c,a=[];a.push(".l-switch["+n+"]{box-sizing: border-box;position:relative;display:block;width:65px;height:30px;line-height: 30px;background-color:#fff;background-clip:padding-box;border:2px solid #ddd;border-radius:20px;transition-timing-function:ease-in-out;transition-duration:.2s;transition-property:background-color,border}"),a.push(".l-switch["+n+"] .l-switch-handle{position:absolute;top:0px;left:-2px;z-index:1;width:26px;height:26px;background-color:#fff;background-clip:padding-box;border-radius:16px;box-shadow:0 2px 5px rgba(0,0,0,.4);transition:.2s ease-in-out;transition-property:transform,width,left}"),a.push(".l-switch["+n+"].l-dragging{background-color:#f7f7f7;border-color:#f7f7f7}"),a.push(".l-switch["+n+"].l-dragging .l-switch-handle{width:38px}"),a.push(".l-switch["+n+"].l-dragging.l-active .l-switch-handle{left:0;width:38px}"),a.push(".l-switch["+n+']:before{position:absolute;top:7px;right:8px;font-size:12px;color:#999;text-transform:uppercase;content:"Off";line-height:14px}'),a.push(".l-switch["+n+"].l-active{background-color:#4cd964;border-color:#4cd964}"),a.push(".l-switch["+n+"].l-active .l-switch-handle{left:auto;right:0}"),a.push(".l-switch["+n+'].l-active:before{right:auto;left:10px;color:#fff;content:"On"}'),a.push(".l-switch["+n+"].l-disabled{opacity:.3}"),a.push(".l-switch["+n+"].l-mini{width:55px}"),a.push(".l-switch["+n+"].l-mini:before{display:none;}"),a.push(".l-switch["+n+"] input[type=checkbox]{display:none}"),c=b.createElement("style"),c.type="text/css",c.innerHTML=a.join(""),b.getElementsByTagName("head")[0].appendChild(c),p=function(){}},q=function(a){var c,d,f,g,i,j,k,l,m,n;return a=a||{},c=/Android|webOS|iphone|ipod|ipad|BlackBerry/i.test(navigator.userAgent),d="mousedown",f="mousemove",g="mouseout mouseup",c&&(d="touchstart",f="touchmove",g="touchend"),i=[],j=[],k=[],l={startX:0,startY:0,endX:0,endY:0,startTime:0,endTime:0},m=function(){return c?function(a,b){return a.changedTouches[0]["page"+b]}:function(a,b){return a["page"+b]}}(),n=function(){return+new Date},h(b,d,function(b){if(a.isActivated){var c=!1;e(i,function(a,d){return c=0==d(b,l)?!1:!0,!!c}),l.isStart=c,l.isStart&&(l.startTime=n(),l.startX=m(b,"X"),l.startY=m(b,"Y"))}}),h(b,f,function(b){a.isActivated&&l.isStart&&(l.endX=m(b,"X"),l.endY=m(b,"Y"),e(j,function(a,c){c(b,l)}))}),h(b,g,function(a){l.isStart&&(l.endTime=n(),l.endX=m(a,"X"),l.endY=m(a,"Y"),e(k,function(b,c){c(a,l)}),l.isStart=!1)}),{setActivated:function(b){a.isActivated=!!b},addStartHooks:function(a){i.push(a)},addMoveHooks:function(a){j.push(a)},addStopHooks:function(a){k.push(a)}}},r=function(a){a.style.display="none"},s=function(a){var c,l,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O;return this instanceof s?(this._KENID=Math.random(),g=this._KENID,a=Object.assign({elem:"",className:"",isMini:!1,isChecked:!1,isDisabled:!1,onToggle:function(){}},a),!n&&(n=o("cswitch")),p(),(c=d(a.elem))?(/input/i.test(c.tagName)||/checkbox/i.test(c.type)||(l=c,t=c.parentNode,r(c),c=k("input",{type:"checkbox"}),t.insertBefore(c,l)),u=k("div",{className:"l-switch "+a.className}),v=k("div",{className:"l-switch-handle"}),r(c),u.appendChild(v),c.parentNode.insertBefore(u,c),u.appendChild(c),w="l-mini",x="l-active",y="l-dragging",z="l-disabled",u.setAttribute(n,""),a.isMini&&m.add(u,w),a.isChecked&&(c.checked="checked"),A=function(){m[c.checked?"add":"remove"](u,x),a.onToggle(c.checked)},B=function(){m.add(u,y)},C=function(){m.remove(u,y)},D=function(){m.add(u,z)},E=function(){m.remove(u,z)},F=function(){c.checked=!c.checked},h(c,"change",function(){A()}),G=null,h(u,"click",function(){H&&!L&&K&&(F(),A(),B(),clearTimeout(G),G=setTimeout(function(){C()},180))}),H=!0,I=!1,J=!1,K=!0,L=a.isDisabled||c.disabled||c.readOnly,M=new q({isActivated:!0}),M.addStartHooks(function(a){var d,e=b.body,f=!1;for(d=a.target||a.srcElement;d&&d!=e;){if(1==d.nodeType&&d==u){f=!0,J=!1;break}d=d["parentNode"]}return H=!0,f}),M.addMoveHooks(function(a,b){var d=b.endX-b.startX,e=b.endY-b.startY,f=Math.abs(e),g=Math.abs(d);if(!J&&!I&&g>f&&f!=g&&(H=!1,I=!0),!I&&(J=!0),!J&&I&&!L)if(d>0){if(c.checked)return;clearTimeout(G),F(),A(),B()}else{if(!c.checked)return;clearTimeout(G),F(),A(),B()}}),M.addStopHooks(function(){I&&!L&&(I=!1,C())}),N=this,O={pause:function(){L=!0,D()},play:function(){L=!1,E()},setActivated:function(a){K=a,M.setActivated(!!a)},destroy:function(){var c,b,a=[];for(e(f,function(b,c){N._KENID!=c.KENID&&a.push(j({},c))}),b=f.length-1;b>=0;b--)c=f[b],i(c.elem,c.type,c.handle);for(f.length=[],b=a.length-1;b>=0;b--)c=a[b],g=c.KENID,h(c.elem,c.type,c.handle)}},A(),L&&O.pause(),O):void 0):new s(a)},a.CY.cswitch=s,s)});