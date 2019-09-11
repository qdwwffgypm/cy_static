(function(e, n) {
	if (typeof module !== "undefined") {
	    module.exports = n(e);
	} else {
		n(e);
	    if (typeof define === "function" && (define.amd || define.cmd)) {
	        define("sliderTab",function() {
	            return n(e);
	        });
	    }
	}
})(window || this, function(win) {
	!win.CY && (win.CY = {});
	if(win.CY.sliderTab) return win.CY.sliderTab;	
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
	    var dir = val > _val ? true : false, v;
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
		    __params.isStart = isStart;
		    if (__params.isStart) {
		    	__params.startTime = now();
			    __params.startX = getPageXY(event, "X");
			    __params.startY = getPageXY(event, "Y");
			}
		});
		addEvent(doc, onMove, function(event){
			if (__params.isStart) {
				__params.endX = getPageXY(event, "X");
				__params.endY = getPageXY(event, "Y");
				each(_moveHooks, function(i, func) {
					func(event, __params);
				});
			}
		});
		addEvent(doc, onEnd, function(event){
			if (__params.isStart) {
				__params.endTime = now();
				__params.endX = getPageXY(event, "X");
				__params.endY = getPageXY(event, "Y");
				each(_stopHooks, function(i, func) {
					func(event, __params);
				});
			}
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
	var sliderTab = function (params) {
		if (!(this instanceof sliderTab)) {
			return new sliderTab(params);
		}
		params = Object.assign({
			elem : "",// 窗口元素--要设置高度
			content : "",// 窗口子元素--被包在动态生成的绝对元素里
			time : 1000,// 滑动时间
			drag : 0.1, 	// 阻尔糸数
			moveInt : true,// 移动整格
			isSpring : true,// 启动弹性吸附效果
			resetWidth : 10,// 重置复位宽度
			currCss:"curr",// 默认选中的窗口
			currIndex:0,// 默认选中的窗口
			isOverMove : true,// 超过窗口是否能滑动
			onStart : function (left, event, __params) {},// 拖动开始#left当前val
			onScroll: function (left) {},// 滚动事件#left滚动中val
		    onMove : function (left, event, __params) {},// 拖动中#left滚动中val
		    onStop : function (left, event, __params) {},// 拖动结束#left当前val
		    onClick : function (index) {}// 当前第几个
		}, params);	
		var elem = get(params.elem);
		var content = get(params.content, elem);// 
		if (!elem || !content) return;
		
		var children = content.children;
		content.style.position = 'relative';
		// >>>>>>>>>>>>>>>>>>>>
		var getWidth = function(elem) {
		    return elem.offsetWidth || 0;
		};
		var getWinWidth = function() {
		    return getWidth(elem);
		};
		var getConWidth = function() {
		    var total = 0;
		    each(content.children, function(i, item) {
		        total += getWidth(item);
		    });
		    return Math.max(getWidth(content), total);
		};
		var getMaxScrollWidth = function() {
		    return getConWidth() - getWinWidth();
		};
		// <<<<<<<<<<<<<<<<<<<<<<<<<<
		var getCurrIndex = function () {
			var currIndex = 0;// 当前选中的位置
		    each(content.children, function(index, item) {
		        if (classList.has(item, params.currCss)) {
		            currIndex = index;
		            return false;
		        }
		    });
		    return currIndex;
		};
		var getOffsetLeft = function (currIndex) {
			var left = 0;// 当前选中的位置
		    each(content.children, function(index, item) {
		    	if (index >= currIndex) {
					return false;
				}
		    	left += getWidth(item);
		    });
		    return left;
			
		};
		// 
		var isPause = false;// 暂停
		var unit = 'px', attName = "left", currLeft = 0;
		var setIndex = function(currIndex) {// 设置选中
			var children = content.children;
			if (_typeof(currIndex) != "number") {
			    each(children, function(index, item) {
			        if (classList.has(item, params.currCss)) {
			            currIndex = index;
			            return false;
			        }
			    });
			}
			_typeof(currIndex) != "number" && (currIndex = 0);
			each(children, function(index, item) {
			    if (index == currIndex) {
			        classList.add(item, params.currCss);
			    } else {
			        classList.remove(item, params.currCss);
			    }
			});
			return currIndex;
		};
		// 如果不在可视窗口就让他在窗口中
		var setCurrShow = function(callback) {
			var left = currLeft;
			var currIndex = getCurrIndex();// 当前选中的位置
			var _currLeft = getOffsetLeft(currIndex);
			if (_currLeft - Math.abs(currLeft) < 0) {// 在前面
				left = -_currLeft;
			} else if (_currLeft + getWidth(content.children[currIndex]) - (Math.abs(currLeft) + getWinWidth()) > 0) {// 在后面
				left = -(_currLeft + getWidth(content.children[currIndex]) - getWinWidth());
			}

			if (left < -getMaxScrollWidth()) {
				left = -getMaxScrollWidth();
			}
			left != currLeft && new _animate(content, attName, left, params.time, function() {				
				updatePos();
			},false, function (top) {
				params.onScroll(top);
		    });
		};
		// 同步CSS位置
		var updatePos = function() {
		    currLeft = parseFloat(getStyle(content, "left") || 0);
		};
		// 修正
		var resetPos = function(currWidth) {
			var total = 0, _currWidth = Math.abs(currWidth);
			each(content.children, function(width, item) {
				width = getWidth(item);
				total += width;
				if (total > _currWidth) {
					if (total - _currWidth < width / 3) {
						//total -= width;
					}
					return false;
				}
			});
			return currWidth < 0 ? -total : total;
		};		// 移动中
		var movePos = function(width, event, __params) {
		    var temWidth = currLeft + width;
		    if (width > 0 && temWidth > 0) {
		        if (params.isOverMove) {// 只滑动超出部分的20%
		            width = width - temWidth * 0.8;
		        } else {
		            width = width - temWidth;
		        }
		    } else if (temWidth < -getMaxScrollWidth()) {
		    	var maxMove = getMaxScrollWidth();
		        if (params.isOverMove) {// 只滑动超出部分的20%
		            width = width - (temWidth + maxMove) * 0.8;
		        } else {
		            width = width - (temWidth + maxMove);
		        }
		    }
		    extend(content.style, {// 更新位置
		        left: currLeft + width + unit
		    });
		    return currLeft + width;
		};

		// 移动结束
		var endPos = function(width, event, __params) {
		    var v0 = 0, s0 = 0, left;
		    if (params.isSpring) {// 得到速度*滑动时间*阻尔糸数 = 路程
		        v0 = Math.abs(width) / (__params.endTime - __params.startTime);
		        s0 = v0 * params.time * params.drag;// 路程
		    }
		    if (width > 0) {// 左向右移动正
		        width += s0;
		    } else {// 右向左移动负
		        width -= s0;
		    }
		    left = currLeft + width;

		    if (width > 0) {// 左边已没有了
		        left > 0 && (left = 0);
		    } else {// 右边已没有了
		    	var maxMove = getMaxScrollWidth();
		        if (Math.abs(left) > maxMove) {
		            left = -maxMove;
		        }
		    }// 复位
		    if (Math.abs(width) < params.resetWidth) {
		        left = currLeft;
		    }
		    if (params.moveInt) {// 修改让他整格移动
		        left = resetPos(left);
		    }
		    left > 0 && (left = 0);
		    if (left < -getMaxScrollWidth()) {
		    	left = -getMaxScrollWidth();
		    }
		    new _animate(content, attName, left, params.time, function() {
	    		var currIndex = getCurrIndex();
	    		updatePos();
				params.onStop(currLeft, event, __params);
			},false, function (currLeft) {
				params.onScroll(currLeft);
		    });
		};

		if (getConWidth() <= getWinWidth()) {
	        return;
	    }
		each(children, function(currIndex, item) {
			addEvent(item, "click", function () {
				setIndex(currIndex);
				setCurrShow();// 如果不在可视窗口就让他在窗口中
				params.onClick(currIndex, children[currIndex], children);
			});
		});
		var drag = new bidnDrag(), isMove = false, isLock = false;// true锁定
		// 添加开始滚动执行的函数
		drag.addStartHooks(function(event, __params) {
		    var cur, body = doc.body, isStart = false;
		    cur = (event.target || event.srcElement);
		    while (cur && cur != body) {
		        if (cur.nodeType == 1 && cur == elem) {
		            isStart = true;	
				    isLock = false;
		            break;
		        }
		        cur = cur["parentNode"];
		    }
		    return isStart;
		});
		// 添加滑动滚动执行的函数
		drag.addMoveHooks(function(event, __params) {
		    if (isPause) {
		        return !isPause;
		    }
		    var moveX = __params.endX - __params.startX;
		    var moveY = __params.endY - __params.startY;
		    var absMoveY = Math.abs(moveY);
		    var absMoveX = Math.abs(moveX);
		    if (!isLock && !isMove && absMoveX > absMoveY && absMoveY != absMoveX) {	
		        event.preventDefault();
	            _stop(content);
	            updatePos();
				params.onStart(currLeft, event, __params);
		        isMove = true;
		    }
		    !isMove && (isLock = true);
		    if (!isLock && isMove) {
		        event.preventDefault();
		        moveX = movePos(moveX, event, __params);
		        params.onScroll(moveX);
		        params.onMove(moveX, event, __params);
		    }
		});
		// 添加滑动结束滚动执行的函数
		drag.addStopHooks(function(event, __params) {
			if (isMove) {
				endPos(__params.endX - __params.startX, event, __params);
				isMove = false;
			}
		});
		var insObj = {
			pause : function () {// 暂停
				isPause = true;
			},
			play : function () {// 播放
				isPause = false;
			},
			reset : function () {// 重新显示在窗口中
				setCurrShow();
			},
			setCurrIndex : function (index) {
				var children = content.children;
				var currIndex = Math.max(Math.min(index, children.length - 1), 0);
				_stop(content);
				updatePos();
				setIndex(currIndex);
				setCurrShow();// 如果不在可视窗口就让他在窗口中
			}
		};
		setTimeout(function () {
			insObj.setCurrIndex(params.currIndex);
		}, 0);
		return insObj;
	};
	win.CY.sliderTab = sliderTab;
	return sliderTab;	
});

