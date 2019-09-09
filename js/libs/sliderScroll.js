(function(e, n) {
	if (typeof module !== "undefined") {
	    module.exports = n(e);
	} else {
		n(e);
	    if (typeof define === "function" && (define.amd || define.cmd)) {
	        define("sliderScroll",function() {
	            return n(e);
	        });
	    }
	}
})(window || this, function(win) {
	!win.CY && (win.CY = {});
	if(win.CY.sliderScroll) return win.CY.sliderScroll;	
	var doc = document;
	var _typeof = function(obj) {
		return Object.prototype.toString.call(obj).split(/\s(\w+)/)[1]
				.toLowerCase();
	};
	var get = function(selector, content) {// dom|selector
		return selector && selector instanceof Object ? selector : (selector ? (content || document).querySelector(selector) : null);
	};
	var getAll = function (selector, content) {// dom|selector
		return selector && selector instanceof Object ? selector : (selector ? (content || document).querySelectorAll(selector) : null);
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
	            dom.addEventListener(n, handle, { passive: false });
	        });
	    });
	};
	var removeEvent = function(elem, type, handle) {
		type.split(' ').forEach(function (n) {
			elem.removeEventListener(n, handle);
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
	var create = function(tag, attrs) {
	    tag = doc.createElement(tag);
	    for (var key in attrs) {
	        if (attrs.hasOwnProperty(key)) {
	            if (key == "style") {
	                extend(tag.style, attrs[key]);
	            } else {
	                tag[key] = attrs[key];
	            }
	        }
	    }
	    return tag;
	};
	var getStyle = function(ele, attr) {
	    if (win.getComputedStyle) {
	        return win.getComputedStyle(ele, null)[attr];
	    }
	    return ele.currentStyle[attr];
	};
	
	var inArray = function( elem, array ) {
		for ( var i = 0, length = array.length; i < length; i++ )
			if ( array[ i ] === elem )
				return i;
		return -1;
	};
	var classList = {
		    has: function(dom, name) {
		        return inArray(name, (dom.className || '').split(/\s+/)) > -1;
		    },
		    add: function(dom, name) {
		        !this.has(dom, name) && (dom.className += (dom.className ? " " : "") + name);
		    },
		    remove: function(dom, name) {
		        var arr = [];
		        each((dom.className || '').split(/\s+/), function(i, n) {
		            n != name && arr.push(n);
		        });
		        dom.className = arr.join(' ');
		    }
		};
	
	var __tid, __arr = [];
	var _expo = function(t, b, c, d) {
		return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	};
	var _linear = function(t, b, c, d) {
		return c*t/d + b; 
	};
	var _stop = function (elem) {
		for (var i = __arr.length - 1; i >= 0; i--) {
			if (__arr[i].elem ==  elem) {
				__arr[i].callback();
				__arr.splice(i, 1);
			} 
		}
	};
	var _animate = function(elem, attr, val, time, callback, twee, onChange) {
	    var _attr = window.getComputedStyle(elem, null);
	    var _val = parseInt(_attr.getPropertyValue(attr.replace( /([A-Z])/g, "-$1" ).toLowerCase())) || 0;
	    var t = 0 , d = time || 500, now = +new Date(), range = Math.abs(_val - val);
	    var dir = val > _val ? true : false, v, tem;
	    var unit = 'px' , _run = function(gotoEnd) {
	    	if (t < d && !gotoEnd) {
	            t = +new Date() - now;
	            v = twee ? _linear(t, 0, range, d) : _expo(t, 0, range, d);
	            tem = (dir ? _val + v : _val - v);
	            elem.style[attr] = tem + unit;
	            onChange && onChange(tem);
	        } else {
	        	tem = (dir ? _val + range : _val - range);
	            elem.style[attr] = tem + unit;
	            onChange && onChange(tem);
	            callback && callback();
	            return true;
	        }
	    };
	    _run.elem = elem;
	    _run.callback = function () {
	    	callback && callback();
	    	return true;
	    };
	    if (__arr && __arr.length) {
	        return __arr.push(_run);
	    }
	    __arr = [_run];
	    clearInterval(__tid);
	    __tid = setInterval(function() {
	        for (var i = __arr.length - 1; i >= 0; i--) {
	            __arr[i]() && __arr.splice(i, 1);
	        }

	    }, 15);
	};
	
	var bidnDrag = function () {// 设置触摸事件
		var inMobile = /Android|webOS|iphone|ipod|ipad|BlackBerry/i.test(navigator.userAgent);
		var onStart = "mousedown";
	    var onMove = "mousemove";
	    var onEnd = "mouseout mouseup";
	    if (inMobile) {
	        onStart = 'touchstart';
	        onMove = 'touchmove';
	        onEnd = 'touchend';
	    }
		var _startHooks = []; 	// 开始
		var _moveHooks = [];	// 移动
		var _stopHooks = [];	// 停止
		var __params = { 
			startX : 0,	// 开始鼠标位置
			startY : 0,	// 开始鼠标位置
			endX : 0,	// 最后鼠标位置
			endY : 0,	// 最后鼠标位置
			startTime : 0,	// 开始移动时间
			endTime : 0,	// 停止移动时间
		};		
		var getPageXY = (function(event, XY) {
		    return inMobile ? function(event, XY) {
		        return event.changedTouches[0]["page" + XY];
		    } : function(event, XY) {
		        return event["page" + XY];
		    };
		})();
		var now = function () {
			return +new Date();
		};
		addEvent(doc, onStart, function(event) {
			var isStart = false;
			each(_startHooks, function(i, func) {
			    isStart = func(event, __params) == false ? false : true;
			    return !!isStart;
			});
		    if (!isStart) return;
		    __params.startTime = now();
		    __params.startX = getPageXY(event, "X");
		    __params.startY = getPageXY(event, "Y");
		    var _remove = function () {
		    	removeEvent(doc, onMove, moveFunc);
		        removeEvent(doc, onEnd, endFunc);
		    };
		    var moveFunc = function(event) {
		    	var isMove = false;
		        __params.endX = getPageXY(event, "X");
		        __params.endY = getPageXY(event, "Y");
				each(_moveHooks, function(i, func) {
					isMove = func(event, __params) == false ? false : true;
				    return isMove;
				});
				!isMove && _remove();
		    };
		    var endFunc = function(event) {
		    	_remove();
			    __params.endTime = now();
		        __params.endX = getPageXY(event, "X");
		        __params.endY = getPageXY(event, "Y");
		        each(_stopHooks, function(i, func) {
		        	func(event, __params);
			    });
		    };
		    addEvent(doc, onMove, moveFunc);
		    addEvent(doc, onEnd, endFunc);
		});
		
		return {
		    addStartHooks: function(func) {
		        _startHooks.push(func);
		    },
		    addMoveHooks: function(func) {
		        _moveHooks.push(func);
		    },
		    addStopHooks: function(func) {
		        _stopHooks.push(func);
		    }
		};
	};
	
	var loadDef = {
		 	height:30,//可选,默认50.触发下拉刷新拖动距离,
			onShowCss: "onShow",
			onReadCss: "onRead",
        	onLoadCss: "onLoad",
        	onEndCss: "onEnd",
        	onShow: "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
			onRead:"释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
        	onLoad: "正在加载...",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
        	onEnd: "已经到底啦!",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容	
        	callback: function(func) {}// 加载数据
	};
	var _initCss = function() {
		var cssArr = [];
		cssArr.push('.loadMore{text-align:center;color:#999;font-size:14px;position: absolute;bottom: -40px;left: 0;right: 0;}');
		cssArr.push('.loadMore p{padding:5px 0;}');
		cssArr.push('.loadMore .onShow{}');
		cssArr.push('.loadMore .onLoad{background-image:url(data:image/gif;base64,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);background-repeat:no-repeat;background-size:16px 16px;background-position:left center;width:113px;margin:auto;text-align:center}');
		cssArr.push('.loadMore .onEnd{}');
		
		var style = doc.createElement('style') ;
		style.type = "text/css";
		style.innerHTML = cssArr.join('');
		doc.getElementsByTagName('head')[0].appendChild(style);
	};
	
	var sliderScroll = function (params) {
		if (params.pullDown) {
		    params.pullDown = extend(loadDef, params.pullDown);
		}
		if (params.pushDown) {
		    params.pushDown = extend(extend({
		        onShow: "上拉可以刷新"
		    }, loadDef), params.pushDown);
		}
		params = extend({
			elem : "",// 窗口元素--要设置高度
			content : "",// 窗口子元素--被包在动态生成的绝对元素里
			time : 600,// 手离开后滑动时间
			drag : 0.6, 	// 阻尔糸数
			scrollTop : 0, // 滚动条高
			isSpring : true,// 启动弹性吸附效果
			isTopEffect : false,// 顶部动画效果
			isBotEffect : true,// 底部动画效果
			hasScrollbar : true,// 显示滚动条
//			pullDown : {// 下拉刷新(顶部刷新加载)对象{}
//			 	height:50,//可选,默认50.触发下拉刷新拖动距离,
//				onShowCss: "onShow",
//				onReadCss: "onRead",
//	        	onLoadCss: "onLoad",
//	        	onEndCss: "onEnd",
//	        	onShow: "上拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
//				onRead:"释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
//	        	onLoad: "正在加载...",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
//	        	onEnd: "已经到底啦!",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
//			},
//			pushDown : {// 上拉刷新(底部刷新加载)对象{}
//			 	height:50,//可选,默认50.触发下拉刷新拖动距离,
//				onShowCss: "onShow",
//				onReadCss: "onRead",
//	        	onLoadCss: "onLoad",
//	        	onEndCss: "onEnd",
//	        	onShow: "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
//				onRead:"释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
//	        	onLoad: "正在加载...",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
//	        	onEnd: "已经到底啦!",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
//			}
		}, params);	
		var elem = get(params.elem);
		var content = get(params.content, elem);// 
		if (!elem || !content || content.__bindscroll) return;
		if (getStyle(content, "position") != "absolute") {
		    content.style.position = 'relative';
		}
		content.__bindscroll = true;
		var _content = null;
		if (!content.__bindwin) {
			content.__bindwin = true;
			var _content = create('div', {
				style: {
					position: 'absolute',
					width: '100%',
					height: '100%',
					top: '0',
					bottom: '0'
				}
			});
			elem.insertBefore(_content, content);
			_content.appendChild(content);
		}
		
		// 事件列表
		var _onScroll = []; // 滚动中
		var _onOverflow = []; // 滚动溢出
		var _onTopOrBottom = []; // 滚动顶OR底部
		var _onStart = []; // 拖动开始
		var _onMove = []; // 拖动中
		var _onStop = []; // 拖动结束
		params.onScroll && _onScroll.push(params.onScroll);
		params.onOverflow && _onOverflow.push(params.onOverflow);
		params.onTopOrBottom && _onTopOrBottom.push(params.onTopOrBottom);
		params.onStart && _onStart.push(params.onStart);
		params.onMove && _onMove.push(params.onMove);
		params.onStop && _onStop.push(params.onStop);
		
		
		var scrollbar = create("div", {
		    style: {
		        top: 0,
		        right: 0,
		        bottom: 0,
		        zIndex: 100,
		        width :'3px',
		        display: 'none',
		        position: 'absolute',
		        backgroundColor: '#BCBCBC'
		    }
		});
		var getWinHeight = function () {
			return elem.offsetHeight;
		};
		var getConHeight = function () {
			return content.offsetHeight;
		};
		var getScrollHeight = function () {
			return getConHeight() - getWinHeight();
		};
		var isPause = false;
		var unit = 'px', attName = "top", currTop = 0;
		var setScrollTop = function(currTop) {// 设置选中
			extend(content.style, {// 更新位置
		        top: currTop + unit
		    });
		};
		var hideScrollbar = function () {
			extend(scrollbar.style, {
	            display: 'none'
	        });
		};
		var showScrollbar = function () {
			extend(scrollbar.style, {
	            display: 'block'
	        });
		};
		var timeId;
		// 移动
		var moveScrollbar = function(top) {
		    var winHeight = getWinHeight();
		    var conHeight = getConHeight();
		    if (conHeight < winHeight) {
		    	hideScrollbar();
		        return;
		    }
		    clearTimeout(timeId);
		    setTimeout(showScrollbar, 30);	
		    timeId = setTimeout(hideScrollbar, 30);	    
		    // 滚动条高度
		    var height = winHeight * (winHeight / conHeight);
		    // 内容滚动总高
		    var totalConHeight = conHeight - winHeight;
		    // 滚动条滚动总高
		    var totalscrollHeight = winHeight - height;
		    // 算出比值:滚动高*滚动和要滚动的总高/滚动内容总高
		    
		    // 得到比例计算*总可移动滚动条高度
		    var scrollScrollHeight = Math.abs(top) / totalConHeight * totalscrollHeight;
		    // 从上向下滑动已超心头
		    top > 0 && (scrollScrollHeight = -scrollScrollHeight);
		    extend(scrollbar.style, {
		    	display : 'block',
		    	top : scrollScrollHeight + unit,
		    	height : height + unit
		    });
		};

		// 同步CSS位置
		var updatePos = function() {
		    _stop(content);
		    currTop = parseFloat(getStyle(content, attName).replace(/[^\d|\.|-]/g, '') || 0);
		};
		// 移动中
		var movePos = function(height) {
		    var temTop = currTop + height;
		    if (height > 0 && temTop > 0) {
		        if (params.isTopEffect) {// 只滑动超出部分的20%
		            height = height - temTop * 0.85;
		        } else {
		            height = height - temTop;
		        }	
		        // 回调事件
		        each(_onOverflow, function(i, func) {
		    		func(Math.abs(height));
		    	});
		    } else if (temTop < -getScrollHeight()) {
		    	var maxMove = getScrollHeight();
		        if (params.isBotEffect) {// 只滑动超出部分的20%
		            height = height - (temTop + maxMove) * 0.85;
		        } else {
		            height = height - (temTop + maxMove);
		        }
		        // 回调事件
		        each(_onOverflow, function(i, func) {
		    		func(Math.abs(height));
		    	});
		    }
		    var total = currTop + height;
		    extend(content.style, {// 更新位置
		        top: total + unit
		    });
		    moveScrollbar(total);
	        // 回调事件
		    each(_onScroll, function(i, func) {
	    		func(total);
	    	});
		};

		// 移动结束
		var endPos = function(height, __params) {
		    var v0 = 0, s0 = 0, top;
		    if (params.isSpring) {// 得到速度*滑动时间*阻尔糸数 = 路程
		        v0 = Math.abs(height) / (__params.endTime - __params.startTime);
		        s0 = v0 * params.time * params.drag;// 路程
		    }
		    if (height > 0) {// 左向右移动正
		        height += s0;
		    } else {// 右向左移动负
		        height -= s0;
		    }
		    top = currTop + height;

		    if (height > 0) {// 左边已没有了
		        top > 0 && (top = 0);
		    } else {// 右边已没有了
		    	var maxMove = getScrollHeight();
		        if (Math.abs(top) > maxMove) {
		            top = -maxMove;
		        }
		    }
		    new _animate(content, attName, top, params.time, function() {
		        // 回调事件
		    	setTimeout(function () {
		    		updatePos();
		    		each(_onStop, function(i, func) {
		    			func(currTop);
		    		});
		    	},0);
		    	// 回调事件    
		    	if (currTop > -1 || Math.abs(currTop - 1) >= getScrollHeight()) {
		    		each(_onTopOrBottom, function(i, func) {
						func();
					});
		    	}
		    	
		    },false, function (top) {
		    	moveScrollbar(top);		
		        // 回调事件    	
		    	each(_onScroll, function(i, func) {
		    		func(top);
		    	});
		        // 回调事件
		    	each(_onMove, function(i, func) {
					func(top);
				});
		    });
		};
		// 初始滚动条相关
		if (_content && params.hasScrollbar) {
			_content.appendChild(scrollbar);
		    updatePos();
		    moveScrollbar(currTop);
		}
		if (_typeof(params.scrollTop)=="number") {
	        setScrollTop(params.scrollTop);
	    }
		var drag = new bidnDrag(), isMove = false, isLock = false;// true锁定
		// 添加开始滚动执行的函数
		drag.addStartHooks(function(event, __params) {
		    var cur, body = doc.body, isStart = false;
		    cur = (event.target || event.srcElement);
		    while (cur && cur != body) {
		        if (cur.nodeType == 1 && cur == content) {
		            isStart = true;		  
		            updatePos();
			        // 回调事件
					each(_onStart, function(i, func) {
						func(currTop, event, __params);
					});
				    isLock = false;
		            break;
		        }
		        cur = cur["parentNode"];
		    }

		    return isStart? getConHeight() < getWinHeight() ? false : true : false;
		});
		// 添加滑动滚动执行的函数
		drag.addMoveHooks(function(event, __params) {
			if (isPause) {
				return !isPause;
			}
			var moveX = __params.endX - __params.startX;
			var moveY = __params.endY - __params.startY;
			if (!isLock && !isMove && Math.abs(moveY) > Math.abs(moveX)) {
				isMove = true;
				if (moveY > 0) {
			        if (!params.isTopEffect && currTop > -1) {
			            return false;// 已滑到顶释放事件
			        }
			    } else {
			        if (!params.isBotEffect && Math.abs(currTop + moveY) > getScrollHeight()) {
			            return false; // 已滑到底释放事件
			        }
			    }
			}
			!isMove && (isLock = true);
			if (!isLock && isMove) {
			    movePos(moveY, __params);
		        // 回调事件
			    each(_onMove, function(i, func) {
					func(moveY, event, __params);
				});
			    event.preventDefault();
			}
		});
		// 添加滑动结束滚动执行的函数
		drag.addStopHooks(function(event, __params) {
			if (isMove) {
				endPos(__params.endY - __params.startY, __params);
				isMove = false;
			}
		});
		
		// 加载更多相关	
		var endPull = function () {};
		var loadMore = function(isPush, _params) {
		    _initCss();
		    var more = create("div", {
		    	style : {bottom:(isPush ? "-40px" : "10px")},
		        className: "loadMore " + (isPush ? "pushDown" : "pullDown")
		    });
		    var conBox = create("p", {
		        className: "onShow"
		    });
		    more.appendChild(conBox);
		    content.appendChild(more);

		    var onShow = function() {
		        conBox.innerHTML = _params.onShow;
		        conBox.className = _params.onShowCss;
		    };
		    var onRead = function() {
		        conBox.innerHTML = _params.onRead;
		        conBox.className = _params.onReadCss;
		    };
		    var onLoad = function() {
		        __isRun = true;
		        conBox.innerHTML = _params.onLoad;
		        conBox.className = _params.onLoadCss;
		    };
		    var onEnd = function() {
		        _isEnd = true;
		        conBox.innerHTML = _params.onEnd;
		        conBox.className = _params.onEndCss;
		    };
		    endPull = function(isEnd) {
		        isEnd ? onEnd() : onShow();
		        __isRun = false;
		    };

		    var step = _params.height, isLoadData = false;
		    var __isRun = false, _isEnd = false;

		    _onScroll.push(function() {// 滚动中
		        !_isEnd && onShow();
		    });
		    _onOverflow.push(function(height) {// 滚动溢出
		        if (!_isEnd && !isLoadData && height >= step) {
		            onRead();
		            isLoadData = true;
		        }
		    });
		    _onTopOrBottom.push(function() {// 滚动顶OR底部
		        if (!_isEnd && isLoadData) {
		            _params.callback() !== false && onLoad();
		            isLoadData = false;
		        }
		    });
		    onShow();
		};
		params.pullDown && params.isTopEffect && loadMore(false, params.pullDown);
		params.pushDown && params.isBotEffect && loadMore(true, params.pushDown);
		
		return {
			pause : function () {// 暂停
				isPause = true;
			},
			play : function () {// 播放
				isPause = false;
			},
    	    scrollTop: function (y) {// 滚动致到固定位置
    	    	setScrollTop(parseFloat(y) || 0);
    	    },
    	    endPull: function(isEnd) {// 滚动内容加载状态
    	    	endPull(isEnd);
    	    } 
    	};
	};
	win.CY.sliderScroll = sliderScroll;
	return sliderScroll;	
});

