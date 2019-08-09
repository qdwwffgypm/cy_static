(function(doc, win) {
	win.CY = win.CY || {};
	var unit = "px";
	var undf = undefined;
	var func = function () {};
	var get = function(selector, content) {// dom|selector
		return selector && typeof selector == "object" ? selector
				: (selector ? (content || doc).querySelector(selector) : null);
	};
	var _typeof = function(obj) {
		return Object.prototype.toString.call(obj).split(/\s(\w+)/)[1]
				.toLowerCase();
	};
	var each = function(arr, callback) {
		arr = arr || [];
		for ( var i = 0, len = arr.length; i < len; i++) {
			if (callback.call(arr[i], i, arr[i]) == false) {
				break;
			};
		};
	};
	var addEvent = function(elem, type, handle) {
	    each((_typeof(elem) != "array" ? [elem] : elem), function(i, dom) {
	        type.split(' ').forEach(function(n) {
	            dom.addEventListener(n, handle, false);
	        });
	    });
	};
	var extend = function(source, params) {
		for ( var key in params) {
			if (params.hasOwnProperty(key)) {
				if (_typeof(params[key]) != "object") {
					params[key] != undefined && (source[key] = params[key]);
				} else {
					source[key] = extend(source[key] || {}, params[key]);
				}
			}
		}
		return source;
	};
	
	var defItem = {
		current : 0,// 要选中的Tab导航菜单
	    titles: {// 秒杀各状态对应显示的文本
	        before: "准时开抢，敬请期待",
	        herald: "距秒杀开始还有",
	        start: "距秒杀结束还有",
	        sell: "已售罄，距结束还有",
	        end: "秒杀已结束"
	    },
	    cssCss: {// 秒杀各状态对应的样式(在单商品最外层添加)
	        before: "l-befor",
	        herald: "l-herald",
	        start: "l-start",
	        sell: "l-sell",
	        end: "l-end"
	    },
	    data: [],
	    onBefore: func,
	    onHerald: func,
	    onStart: func,
	    onSell: func,
	    onEnd: func,
	    onAfter : function () {},// HTML生成后事件
	    dateHTML : "<b>{1}</b>月<b>{2}</b>日 <b>{3}</b>点",
		timeHTML : "<label class='tDay{0}'><b>{0}</b>天</label><b>{1}</b>时<b>{2}</b>分<b>{3}</b>秒",
	};
	
	var killUtil = function (params) {
		params = extend({
				
		}, params || {});
	};
	
	
	
	win.CY.killUtil = CY.killUtil || killUtil;
	if (typeof define === "function" && define.amd) {
	    define("killUtil", [], function() {
	        return CY.killUtil;
	    });
	}
	
})(document, window);