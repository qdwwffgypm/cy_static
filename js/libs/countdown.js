!function(a,b){"undefined"!=typeof module?module.exports=b(a):(b(a),"function"==typeof define&&(define.amd||define.cmd)&&define("countdown",function(){return b(a)}))}(window||this,function(a){var b,c;return!a.CY&&(a.CY={}),a.CY.countdown?a.CY.countdown:(b=[],c={format:function(a,b){!Array.isArray(b)&&(b=[b]);for(var c=0;c<b.length;c++)a=a.replace(new RegExp("\\{"+c+"\\}","g"),b[c]);return a},run:function(a){var f,c=Object.assign({time:0,downText:"",onChange:function(){},callback:function(){}},a),d=this,e=function(a){return 10>a?"0"+a:a},g=function(){var a=--c.time,b=parseInt(a%60),f=parseInt(a/60%60),g=parseInt(a/3600%24),h=Math.floor(a/3600/24);return c.onChange(d.format(c.downText,[h,e(g),e(f),e(b)])),1>a?(c.callback(),!0):void 0};return b.push(g),b.length<2&&(f=setInterval(function(){for(var a=b.length-1;a>=0;a--)b[a]()&&b.splice(a,1),b.length<1&&clearInterval(f)},1e3)),g(),f}},a.CY.countdown=c,c)});