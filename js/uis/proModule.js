!function(a,b){if("undefined"!=typeof module)require("../utils/serverUtil"),require("../utils/lazyloadUtil"),module.exports=b(a);else if(b(a),"function"==typeof define&&(define.amd||define.cmd)){var c="//"+(/ppppoints.com/.test(document.domain)?"j.ppppoints.com":"j.changyoyo.com")+"/static/js/";requirejs.config({paths:{serverUtil:c+"utils/serverUtil",lazyloadUtil:c+"utils/lazyloadUtil"}}),define("proModule",["serverUtil","lazyloadUtil"],function(){return b(a)})}}(window||this,function(a){var c,b,d,e,f,g;return!a.CY&&(a.CY={}),a.CY.proModule?a.CY.proModule:(b=document,e=function(a){return a+(Math.random()+"").slice(9)},g=function(a,b,c){var d=CY.stringUtil.comma(Number(a||0).toFixed(b));return d=d.replace(/(\.\d+)$/,"<b>$1</b>"),'<span class="l-pri '+(c||0)+'"><i>￥</i>'+d+"</span>"},c=function(){var c,h,i,j,k,a=[];return a.push('<div class="l-item">'),a.push('    <a href="{link}" data-spm="{keyId}">'),a.push("        <article>"),a.push('            <span class="top {topCss}"></span>'),a.push('            <span class="l-img">'),a.push('                <img alt="{goodsName}" realSrc="{centerPic}">'),a.push('                <label class="tag">{label}</label>'),a.push("            </span>"),a.push('            <span class="l-wrap">'),a.push('                <span class="l-title">{goodsName}</span>'),a.push('                <label class="goodsuse goodsuse{goodsuse}">12期免息</label>'),a.push('                <label class="payments payments{goodsuse}">{miniPaymentsHTML}</label>'),a.push('                <span class="l-minPrice">'),a.push("                    <span>{priceHtml}</span>"),a.push("                </span>"),a.push('                <span class="l-btn">立即购买</span>'),a.push("            </span>"),a.push('            <span class="l-cover {coverCss}"><b>抢光了</b></span>'),a.push("        </article>"),a.push("    </a>"),a.push("</div>"),a=a.join(""),c=function(){var d,a=[];a.push(".proModule["+f+"] .l-pri{font-size: 18px;font-weight:bold;color: #CF2D2D;letter-spacing:0;margin-right:0px;}"),a.push(".proModule["+f+"] .l-pri i{font-size: 12px;font-style:normal;margin-right: -2px;}"),a.push(".proModule["+f+"] .l-pri b{font-size:14px;font-style:normal}"),a.push(".proModule["+f+"]{overflow:hidden;padding:0;}"),a.push(".proModule img["+f+"]{min-height: 100px;}"),a.push(".proModule["+f+"] .l-item{padding:0.05rem 0.05rem}"),a.push(".proModule["+f+"] .l-item article{width:100%;height:100%}"),a.push(".proModule["+f+"] .l-item a{position:relative;display:block;background-color:#fff;padding:0.15rem 0.1rem 0.15rem 0.1rem;}"),a.push(".proModule["+f+"] .l-item .top{display:none}"),a.push(".proModule["+f+"] .l-item .l-title{font-size:0.3rem;color:#666;display:block;line-height:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0 0.07rem;padding-top:0.2rem}"),a.push(".proModule["+f+"] .l-item .l-img{min-height: 0.8rem;width:100%;position:relative;display:block}"),a.push(".minHeight.proModule["+f+"] .l-item .l-img{min-height: 2rem;}"),a.push(".proModule["+f+"] .l-item .l-img label{position:absolute;top:0;left:0;background-image:url(/event/2018/activePlatform/img/pro_tip.png);background-repeat:no-repeat;background-size:100% 100%;padding:0 .3rem 0 .1rem;color:#fff;font-size:.24rem}"),a.push(".proModule["+f+"] .l-item .l-img img{width:100%;display:block;height:100%}"),a.push(".proModule["+f+"] .l-item .l-wrap .l-title{font-size:.28rem;color:#333;display:block;line-height:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0 0.07rem;padding-top:0.2rem}"),a.push(".proModule["+f+"] .l-item .l-wrap .l-minPrice{height: 22px;display:inline-flex;align-items:center;color:#FF2851;margin-top:0.1rem;padding:0 0.07rem;position:relative}"),a.push(".proModule["+f+'] .l-item .l-wrap .l-minPrice b{font-size:0.2rem;font-family:"microsoft yahei"}'),a.push(".proModule["+f+"] .l-item .l-wrap .l-minPrice font{font-size:0.3rem}"),a.push(".proModule["+f+"] .l-item .l-wrap .l-minPrice sub{font-size:0.2rem;position:relative;vertical-align:baseline}"),a.push(".proModule["+f+"] .l-item .l-wrap .l-minPrice label{margin-left:0.15rem;background-image:url(/event/2018/activePlatform/img/zjl_icon_006.jpg);background-repeat:no-repeat;background-size:100% 100%;display:inline-block;width:1.05rem;height:0.34rem;overflow:hidden;text-indent:-10rem;position:relative}"),a.push(".proModule["+f+"] .l-item .l-wrap .l-des{display:block;margin-top:0.22rem}"),a.push(".proModule["+f+"] .l-item .l-wrap .l-btn{margin: 0 0.04rem;height:.7rem;line-height:.7rem;background-color:#fa7253;color:#fff;display:block;border-radius:.35rem;font-size:.36rem;text-align:center;letter-spacing:.05rem;background-image:linear-gradient(90deg,#FEBA80 0%,#FC7260 90%);box-shadow:0 0.10rem 0.10rem 0 #FFD4BF}"),a.push(".proModule["+f+"] .l-item .l-cover{display:none;position:absolute;top:17%;left:50%;background:#000;border-radius:2rem;text-align:center;color:#fff;font-size:0.4rem;opacity:.4;width:1.5rem;height:1.5rem;line-height:1.5rem;margin-left:-0.7rem}"),a.push(".proModule["+f+"] .l-item .l-cover-0{display:block}"),a.push(".proModule["+f+"] .l-item .l-cover b{font-weight:normal}"),a.push(".proModule["+f+"] .l-item .goodsuse{display:none;}"),a.push(".proModule["+f+"] .l-item .goodsuse10{margin: 0 0 0 4px;background-color: #FB6B6B;white-space: nowrap;padding: 0px 5px 0 5px;border-radius: 0.15rem;font-size: 10px;color: #fff;display:inline;}"),a.push(".proModule["+f+"] .l-item .payments{display:none;}"),a.push(".proModule["+f+"] .l-item .payments10{display: inline-block;margin-left: 5px;;font-size: 14px;color: #CF2D2D;}"),a.push(".proModule1["+f+"] .l-item a {overflow: hidden;}"),a.push(".proModule1["+f+"] .l-item article {overflow: hidden;position: relative;}"),a.push(".proModule1["+f+"] .l-item .l-img {margin-right: 8px;float: left;width: 130px;height: 130px;border-radius: 4px;overflow: hidden;}"),a.push(".proModule1["+f+"] .l-item .l-wrap .l-title{margin-bottom: 0px;white-space: normal;font-weight: bold;line-height: 20px;padding-top: 0.25rem;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2; }"),a.push(".proModule1["+f+"] .l-item .l-wrap .l-btn{display: none;}"),a.push(".proModule1["+f+"] .l-item .l-wrap .l-minPrice{position: absolute;bottom: 10px;left: 140px;}"),a.push(".proModule1["+f+"] .l-item .tag{margin: 0 0 0 4px;background-color: #FB6B6B;white-space: nowrap;padding: 0px 5px 0 5px;border-radius: 0.15rem;font-size: 10px;color: #fff;}"),a.push(".proModule1["+f+"] .l-item .l-cover{top: 27.5px;left: 27.5px;margin-left: 0;width: 75px;height: 75px;}"),a.push(".proModule2["+f+"]{}"),a.push(".proModule2["+f+"] .l-item{width:50%;float:left}"),a.push(".proModule2["+f+"] .l-item a{padding:0.1rem 0.1rem 0.15rem 0.1rem;}"),a.push(".proModule2["+f+"] .l-item .l-wrap .l-btn{height:.6rem;line-height:.6rem;border-radius:.30rem;font-size:.30rem}"),a.push(".proModule3["+f+"]{}"),a.push(".proModule3["+f+"] .l-item{width:33.3%;float:left}"),a.push(".proModule3["+f+"] .l-item a{padding:0.06rem 0.05rem 0.15rem 0.05rem}"),a.push(".proModule3["+f+"] .l-item .l-img label{transform:scale(0.9);margin-left:-0.06rem}"),a.push(".proModule3["+f+"] .l-item .l-wrap .l-btn{height:.5rem;line-height:.5rem;border-radius:.25rem;font-size:.28rem}"),d=b.createElement("style"),d.type="text/css",d.innerHTML=a.join(""),b.getElementsByTagName("head")[0].appendChild(d),c=function(){}},h=function(a,b){return a&&a instanceof Object?a:a?(b||document).querySelector(a):null},i=function(a){return Object.prototype.toString.call(a).split(/\s(\w+)/)[1].toLowerCase()},j=function(a,b){for(var c in b)b.hasOwnProperty(c)&&("object"!=i(b[c])?void 0!=b[c]&&(a[c]=b[c]):a[c]=j(a[c]||{},b[c]));return a},k=function(a,b){return b&&"object"==i(b)?a.replace(/\{([^{}]+)\}/g,function(a,c){var d=b[c];return void 0!==d?""+d:""}):a.toString()},function(b,l){var m,n,o,p,q,r,s,t,u,v,w,x,z,A,B,C,D,E;b=h(b),l=j({teml:a,css:"",data:null,onBefore:function(){},onAfter:function(){}},l),m="px ",n=void 0,o=l.id,d=o||e("proModule"),!f&&(f=d),c(),p=l.keyId,q=l.column||"1",r=function(a,b){return isNaN(parseInt(a))?b:parseInt(a)},s=function(a,b){return isNaN(parseFloat(a))?b:parseFloat(a)},t=r(l.unLazyNum,0),u=s(l.rowSpace,5)/2,v=s(l.colSpace,5)/2,w=s(l.paddingTop,10),x=s(l.paddingBottom,10),l.moduleSpm,z=l.moduleName||"",A=l.backgroundColor,B=function(a){var e,h,i,f,m,p,n,o,r,c=("https:"==location.protocol?"https:":"http:")+CY.serverUtil.imgUrl+"/";if(!a||!a.length)return j(b.style,{display:"none"});for(l.onBefore(a,l,b),e=[],a.sort(function(a,b){return b.sort-a.sort}),f=0,m=a.length;m>f;f++)i=a[f],i.index=f+1,i.topCss="top_"+i.index,i.storedCount=Math.max(0,i.storedCount),i.coverCss="l-cover-"+i.storedCount,!/^http/.test(i.centerPic)&&!/^data:/.test(i.centerPic)&&(i.centerPic=c+i.centerPic),h=Number(i.price/100).toFixed(2).split("."),i.bamount="<font>"+h[0]+".</font>",i.aamount="<sub>"+h[1]+"</sub>",i.link="/mall/#/goodsDetail?productId="+i.productId,i.storedCount<0&&(i.storedCount=0),"cust"==i.payType||"cash"==i.payType?(i.priceHtml="<span><b>￥</b>"+(i.bamount+i.aamount)+"<b>元</b></span>","cust"==i.payType&&(i.label="任意积分抵扣","01"==i.displayEnable&&(i.label="支持现金购买",i.priceHtml="<span>"+i.price+"</span>积分"))):i.priceHtml="comb"==i.payType?"<span>"+i.points+"</span>积分 + <span><b>￥</b>"+(i.bamount+i.aamount)+"</span>":"<span>"+i.points+"</span>积分","10"==i.goodsuse&&(i.miniPaymentsHTML="最低"+g(i.miniPayments/100,2)+"/期"),n=l.teml,o=[u,v,u,v],"1"==q&&(r='<label class="tag">{label}</label>',n=n.replace(r,""),n=n.replace(/(\{goodsName\}<\/span>)/,"$1"+r)),q>f?o[0]=0:(p=m%q,p=0==p?q:p,f>=m-p&&(o[2]=0)),n=n.replace(/(class="l-item")/,'$1 style="padding:'+o.join("px ")+'px"'),e.push(k(n,i));t&&e.forEach(function(a,b){t>b&&(e[b]=a.replace(/ src="/," "+d+' crs="'),e[b]=e[b].replace(/ realSrc="/," "+d+' src="'))}),b.innerHTML='<div class="content">'+e.join("").replace(/<label class="tag"><\/label>/g,"")+"</div>",t&&function(a){for(var b=0,c=a.length;c>b;b++)t>b&&function(a){a.onload=function(){a.removeAttribute(d)}}(a[b])}(b.querySelectorAll("img")),setTimeout(function(){CY.lazyloadUtil()},15),setTimeout(function(){b.classList.remove("minHeight")},2e3),l.onAfter(a,l,b)},b.setAttribute(f,""),!b.id&&b.setAttribute("id",d),b.setAttribute("title",z),b.setAttribute("keyId",p),b.classList.add("proModule"),b.classList.add("minHeight"),b.classList.add("proModule"+q),j(b.style,{paddingLeft:v+m}),j(b.style,{paddingRight:v+m}),n!=w&&(0>w?j(b.style,{marginTop:w+m}):j(b.style,{paddingTop:w+m})),n!=x&&(0>x?j(b.style,{marginBottom:x+m}):j(b.style,{paddingBottom:x+m})),A&&j(b.style,{backgroundColor:A}),l.spm&&(b.setAttribute("data-spm",l.spm),b.setAttribute("data-spm-type","all")),l.data?(D=i(l.data),"array"==D?C=l.data:"object"==D&&(C=[l.data]),C&&B(C)):(E=function(){CY.serverUtil.loadRecommend({keyIds:p,url:"/pointgate/service/product/newRecommend"},function(a,b){B(b)})},E())}}(),a.CY.proModule=c,c)});