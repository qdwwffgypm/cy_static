!function(a,b){"undefined"!=typeof module?module.exports=b(a):(b(a),"function"==typeof define&&(define.amd||define.cmd)&&define("valid",function(){return b(a)}))}(window||this,function(win){var doc,addEvent,get,getAll,_typeof,extend,isTime,isDate,isDateTime,each,getLength,coreConfig,setting,Valid;return!win.CY&&(win.CY={}),win.CY.valid?win.CY.valid:(doc=document,addEvent=function(a,b,c){b.split(" ").forEach(function(b){a.addEventListener(b,c,!1)})},get=function(a,b){return a&&a instanceof Object?a:a?(b||document).querySelector(a):null},getAll=function(a,b){return a&&a instanceof Object?a:a?(b||document).querySelectorAll(a):null},_typeof=function(a){return Object.prototype.toString.call(a).split(/\s(\w+)/)[1].toLowerCase()},extend=function(a,b){for(var c in b)b.hasOwnProperty(c)&&("object"==_typeof(b[c])?a[c]=extend(a[c]||{},b[c]):"array"==_typeof(b[c])?a[c]=extend(a[c]||[],b[c]):void 0!=b[c]&&(a[c]=b[c]));return a},isTime=function(a){var b=a.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);return null==b?!1:b[1]>24||b[3]>60||b[4]>60?!1:!0},isDate=function(a){var c,b=a.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);return null==b?!1:(c=new Date(b[1],b[3]-1,b[4]),c.getFullYear()==b[1]&&c.getMonth()+1==b[3]&&c.getDate()==b[4])},isDateTime=function(a){var d,b=/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/,c=a.match(b);return null==c?!1:(d=new Date(c[1],c[3]-1,c[4],c[5],c[6],c[7]),d.getFullYear()==c[1]&&d.getMonth()+1==c[3]&&d.getDate()==c[4]&&d.getHours()==c[5]&&d.getMinutes()==c[6]&&d.getSeconds()==c[7])},each=function(a,b){a=a||[];for(var c=0,d=a.length;d>c&&0!=b.call(a[c],c,a[c]);c++);},getLength=function(a,b){var e,f,c=a.type,d=0;switch(c){case"checkbox":case"radio":d=getAll("input[type='"+c+"'][name='"+a.name+"']:checked").length;break;case"select-one":d=a.options?a.options.selectedIndex:-1;break;case"select-multiple":each(a.options,function(a,b){1==b.selected&&d++});break;default:if(e=a.value,b.params.wideWord)for(f=0;f<e.length;f++)d+=e.charCodeAt(f)>=19968&&e.charCodeAt(f)<=40869?2:1;else d=e.length}return d},coreConfig=[],setting={debug:!1,form:"",submitBtn:"",resetBtn:"",alertMeg:!1,wideWord:!0,onSuccess:function(){return!0},onError:function(){}},Valid=function(a){var b=this;return b instanceof Valid?(Valid.getValid().addValidItem(get(a)),void 0):new Valid(a)},extend(Valid,{config:function(a){var b,c,d,e;return a=extend(setting,a||{}),b=get(a.form),c=get(a.submitBtn),d=get(a.resetBtn),e={validItem:[],params:a,addValidItem:function(a){a&&(a=get(a)),a=a||{},a.setting=[],this.validItem.push(a)},getValidItem:function(a){return this.validItem["number"!=_typeof(a)?this.validItem.length-1:a]},addValidItemRule:function(a,b){b&&(b=get(b)),!b&&(b=this.validItem[this.validItem.length-1]||{}),b.setting.push(a)},submitForm:function(c){var d=this,e=!1;return c=c||{},d.pageIsValid()&&0!=a.onSuccess()?(e=!0,b&&b.submit()):(e=!1,a.onError(),c.preventDefault&&c.preventDefault()),e},pageIsValid:function(){var e,c=this,d=!0;return c.validItem.forEach(function(b){var f=c.oneIsValid(b);f.isValid||(c.validItem[0]&&c.validItem[0].setting[0].empty?d=!0:(d=f.isValid,b.focus(),b.blur(),a.alertMeg&&!e&&(c.alert(f.onError),e=!0)))}),d},alert:function(a){CY.ui.toast(a)},oneIsValid:function(a){var d,c,b={dom:"",ajax:-1,onError:"",setting:{},isValid:!0};if("string"==_typeof(a)&&(a=get(a)),!a)return b;for(b.dom=a,c=1;c<a.setting.length;c++){switch(d=a.setting[c],b.setting=d,d.validtype){case"initValid":break;case"inputValid":Valid.inputValid(b);break;case"regType":Valid.regType(b);break;case"funType":Valid.funType(b);break;case"ajaxType":b.ajax=c;break;case"compareType":Valid.compareType(b)}if(!b.isValid)break}return b.isValid&&Valid.initValid(b),b},reset:function(){var a=this;a.validItem.forEach(function(a){var b=get(a.setting[0].tipId||"#"+(a.id||a.name)+"Tip");Valid.setTipInfo(b,"onShow",a.setting[0].onShow)})},serialize:function(a){var b=[];return each(this.serializeArray(a),function(a,c){b.push(c.name+"="+c.value)}),b.join("&")},serializeArray:function(a){var d=[],f=[],g=[],h=[],e=a?get(a):b;return e?(f=e.getElementsByTagName("input")||[],g=e.getElementsByTagName("select")||[],h=e.getElementsByTagName("textarea")||[]):each(this.validItem,function(a,b){switch(b.tagName.toLowerCase()){case"input":/radio|checkbox/.test(b.type)?each(doc.getElementsByTagName("input"),function(a,c){b.name==c.name&&b.name&&f.push(c)}):f.push(b);break;case"select":g.push(b);break;case"textarea":h.push(b)}}),each(f,function(a,b){var c,e=b.type;!b.name||b.disabled||/button|submit|reset/.test(e)||(/radio|checkbox/.test(e)?b.checked&&(c=b.value):c=b.value,void 0!=c&&d.push({name:b.name,value:c}))}),each(g,function(a,b){b.name&&!b.disabled&&each(this.options,function(a,c){1==c.selected&&d.push({name:b.name,value:c.value})})}),each(h,function(a,b){b.name&&!b.disabled&&d.push({name:b.name,value:b.value})}),d}},b&&addEvent(b,"submit",function(a){e.submitForm(a)}),c&&addEvent(c,"click",function(a){e.submitForm(a)}),d&&addEvent(d,"click",function(){e.reset()}),coreConfig.push(e),e},getValid:function(a){return void 0==a?coreConfig[coreConfig.length-1]:coreConfig[a]},clear:function(a){"number"==_typeof(a)?coreConfig.length=a:coreConfig=[]},initValid:function(a){var b=a.setting.empty,c=a.setting.onEmpty,d=a.dom.value,e=!1;return b?e=!0:""==(d||"").replace(/^\s+|\s+$/g,"")?a.onError=c:e=!0,a.isValid=e,a},inputValid:function(a){var h,b=a.setting,c=a.dom.value,d=a.dom.type,e=getLength(a.dom,this.getValid()),f=b.empty,g=!1;return/checkbox|select-one|select-multiple|radio/.test(d)||"size"==b.type&&(f=b.empty,f.leftEmpty||(g=c.replace(/^[\s]+/,"").length!=c.length),g||f.rightEmpty||(g=c.replace(/[\s]+$/,"").length!=c.length),g&&f.emptyError&&(a.onError=f.emptyError)),("select-one"==d||"select-multiple"==d)&&(b.type="size"),h=b.type,"size"==h?(g||(lb_go_on=!0),lb_go_on&&(c=e)):"date"==h||"datetime"==h?("date"==h&&(lb_go_on=isDate(c)),"datetime"==h&&(lb_go_on=isDateTime(c)),lb_go_on&&(c=new Date(c),b.min=new Date(b.min),b.max=new Date(b.max))):(d=_typeof(b.min),"number"==d&&(c=new Number(c).valueOf(),isNaN(c)||(lb_go_on=!0)),"string"==d&&(lb_go_on=!0)),a.isValid=!1,lb_go_on&&(c<b.min||c>b.max?(c<b.min&&b.onErrorMin&&(a.onError=b.onErrorMin),c>b.min&&b.onErrorMax&&(a.onError=b.onErrorMax),!a.onError&&(a.onError=b.onError)):a.isValid=!0),a},regType:function(returnObj){var i,reg,regExp=returnObj.setting.regExp,dataType=returnObj.setting.dataType,operateor=returnObj.setting.operateor,onError=returnObj.setting.onError,param=returnObj.setting.param,val=returnObj.dom.value,isValid=!1;for("array"!=_typeof(regExp)&&(regExp=[regExp]),i=0;i<regExp.length&&(reg=regExp[i],"enum"==dataType&&(reg=eval("regexEnum."+reg)),reg&&""!=val);i++){if(isValid=new RegExp(reg,param).test(val),"||"==operateor&&isValid){isValid=!0;break}if("&&"==operateor&&!isValid)break}return returnObj.onError=onError,returnObj.isValid=isValid,returnObj},funType:function(a){var b=a.dom.value,c=a.setting,d=c.fun.call(b,b,a.dom);return 0==d&&(a.isValid=!1,a.onError=c.onError),d&&"string"==_typeof(d)&&(a.isValid=!1,a.onError=d),a},ajaxType:function(){return this},compareType:function(a){var g,b=a.setting,c=a.setting.dataType,d=a.dom.value,e=get(b.desID).value,f=a.setting.onError;switch("number"==c&&(isNaN(d)||isNaN(e)||(d=parseFloat(d),e=parseFloat(e))),("date"==c||"datetime"==c)&&(g=!1,"date"==c&&(g=isDate(d)&&isDate(e)),"datetime"==c&&(g=isDateTime(d)&&isDateTime(e)),g&&(d=new Date(d).getTime(),e=new Date(e).getTime())),b.operateor){case"=":a.isValid=d==e;break;case"!=":a.isValid=d!=e;break;case">":a.isValid=d>e;break;case">=":a.isValid=d>=e;break;case"<":a.isValid=e>d;break;case"<=":a.isValid=e>=d;break;default:a.isValid=!1}return a.onError=f,a},mark:function(a,b){var d=get(a);b=b||{},"string"==_typeof(b)&&(b={tip:b}),b=extend({css:{position:"absolute",textIndent:"8px",color:"#999",overflow:"hidden",zIndex:"2",fontFamily:"Microsoft YaHei"},tip:"请输入",delay:0,holder:!1,disabledCss:"disabled"},b),setTimeout(function(){var a,f,g,h,i,c=b.css||{},e=d.parentNode;return d.getAttribute("readonly")&&!b.notReadonly?(d.classList.add(b.disabledCss),void 0):b.isHolder?(d.setAttribute("placeholder",b.tip),void 0):(extend(e.style,{position:"relative"}),a=doc.createElement("span"),a.className="info-mark",a.innerHTML=a.title=b.tip,f="px",g=function(){c.width=(c.width||d.offsetWidth)+f,c.height=(c.height||d.offsetHeight)+f,c.top=(c.top||d.offsetTop)+f,c.left=(c.left||d.offsetLeft)+f,c.lineHeight=c.height,extend(a.style,c)},h=function(){extend(a.style,{display:d.value.replace(/^\s+|\s+$/g,"")?"none":"block"})},g(),e.insertBefore(a,d),h(),addEvent(document,"resize",function(){g()}),addEvent(a,"click",function(){d.focus()}),addEvent(d,"focus",function(){h()}),addEvent(d,"keyup blur",function(){h()}),i=setInterval(function(){d.parentNode?h():cleartInterval(i)},1e3),void 0)},b.delay)},setTipInfo:function(a,b,c){if(a){var d=[];a.innerHTML=c||"",each((a.className||"").split(" "),function(a,b){!/^on/.test(b)&&d.push(b)}),a.className=d.join(" ")}}}),extend(Valid.prototype,{initValid:function(a){var c,d,e,f,g;return a=extend({isValid:!1,empty:!1,tipId:"",onShow:"请输入内容",onFocus:"请输入内容",onCorrect:"输入正确",onEmpty:"输入内容为空",triggerEvent:"blur",validtype:"initValid"},a||{}),d=Valid.getValid(),d.addValidItemRule(a),c=d.getValidItem(),void 0!=c.nodeType?(e=c.tagName,f=c.setting[0],g=get(a.tipId||"#"+(c.id||c.name)+"Tip"),Valid.setTipInfo(g,"onShow",f.onShow),addEvent(c,"focus",function(){Valid.setTipInfo(g,"onFocus",f.onFocus)}),"select"==e?addEvent(c,"blur change",function(){var a=d.oneIsValid(c);a.isValid?Valid.setTipInfo(g,"onCorrect",f.onCorrect):Valid.setTipInfo(g,"onError",a.onError)}):addEvent(c,a.triggerEvent,function(){var a=d.oneIsValid(c);a.isValid?Valid.setTipInfo(g,"onCorrect",f.onCorrect):Valid.setTipInfo(g,"onError",a.onError)}),this):void 0},inputValid:function(a){return Valid.getValid().addValidItemRule(extend({type:"size",empty:{leftEmpty:!0,rightEmpty:!0,emptyError:""},min:0,max:99999999999999,onError:"输入错误",onErrorMin:"",onErrorMax:"",validtype:"inputValid"},a)),this},regType:function(a){return Valid.getValid().addValidItemRule(extend({regExp:"",dataType:"string",operateor:"",onError:"输入错误",validtype:"regType"},a)),this},funType:function(a){return Valid.getValid().addValidItemRule(extend({fun:function(){},onError:"输入错误",validtype:"funType"},a)),this},ajaxType:function(a){return Valid.getValid().addValidItemRule(extend({type:"GET",url:"",dataType:"html",onError:"输入错误",validtype:"ajaxType"},a)),this},compareType:function(a){return Valid.getValid().addValidItemRule(extend({desID:"",operateor:"=",onError:"输入错误",dataType:"string",validtype:"compareType"},a)),this},unValid:function(){},mark:function(a){var b=Valid.getValid(),c=b.getValidItem();return Valid.mark(c,a),this}}),win.CY.valid=Valid,Valid)});