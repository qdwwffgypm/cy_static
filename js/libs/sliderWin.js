(function(e, n) {
	if (typeof module !== "undefined") {
	    module.exports = n(e);
	} else {
		n(e);
	    if (typeof define === "function" && (define.amd || define.cmd)) {
	        define("sliderWin",function() {
	            return n(e);
	        });
	    }
	}
})(window || this, function(win) {
	!win.CY && (win.CY = {});
	if(win.CY.sliderWin) return win.CY.sliderWin;	
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
	
	var sliderWin = function (params) {
		params = Object.assign({
			elem : "",// 窗口元素--要设置高度
			content : "",// 窗口子元素--被包在动态生成的绝对元素里
			time : 1000,// 滑动时间
			resetWidth : 10,// 重置复位宽度
			currIndex:0,// 默认选中的窗口
			isOverMove : true,// 超过窗口是否能滑动
			onChange : function (index, dom) {},// 滚动改变事件
			onScroll : function (index, bfb) {},// 滚动的时候触发
			onStart : function (x, event, params) {},// 拖动开始
		    onMove : function (bfb, index) {},// 拖动中
		    onStop : function (index) {}// 拖动结束
		}, params);	
		var elem = get(params.elem);
		var content = getAll(params.content, elem);// 绝对定位absolute
		if (!elem || !content) return;

		var _content = [];// 生成固定结构
		each(content, function(div, item) {
		    if (item.__bindwin) {
		        return;
		    }
		    item.__bindwin = true;
		    div = create('div', {
		        style: {
		            position: 'absolute',
		            width: '100%',
		            height: '100%',
		            top: '0',
		            bottom: '0'
		        }
		    });
		    _content.push(div);
		    elem.insertBefore(div, item);
		    div.appendChild(item);
		});
		content = _content;
		if (content.length < 2) return;
		var getWidth = function (elem) {
			return elem.offsetWidth || 0;
		};
		var getWinWidth = function () {
			return getWidth(elem);
		};
		var getConWidth = function () {
			var total = 0;
			each(content, function (i, item) {
				total += getWidth(item);
			});
			return total;
		};
		var isPause = false;
		var unit = 'px', attName = "left", arrValue = [];
		var setIndex = function(currIndex) {// 设置各窗口位置与层高
			var width = getWinWidth();
		    each(content, function(index, item) {
		        var left = 0, dill = Math.abs(index - currIndex) * width;
		        if (index == currIndex) {
		            currVal = index * width;// 当前滑动位置
		        } else if (index > currIndex) {
		            left = dill;// 当前滑动前面的位置
		        } else {
		            left = -dill;// 当前滑动后面的位置
		        }
		        arrValue.push(left);
		        extend(item.style, {
		            left: left + unit,
		            zIndex: index
		        });
		    });
		};
		var updatePos = function () {// 同步CSS位置
			each(content, function(index, item) {
				arrValue[index] = parseFloat(item.style.left);
		    });
		};
		// 移动中
		var movePos = function(width, event, __params) {
			var len = content.length - 1;
			var firstWidth = arrValue[0] + width;
			var lastWidth = arrValue[len] + width;
			if (width > 0 && firstWidth > 0) {
			    if (params.isOverMove) {// 只滑动超出部分的20%
			        width = width - firstWidth * 0.8;
			    } else {
			        width = width - firstWidth;
			    }
			} else if (lastWidth < 0) {
			    if (params.isOverMove) {// 只滑动超出部分的20%
			        width = width - lastWidth * 0.8;
			    } else {
			        width = width - lastWidth;
			    }
			}
			each(content, function(index, item) {
			    var val = arrValue[index] + width;
			    extend(item.style, {// 更新位置
			        left: val + unit
			    });
			});
			return arrValue[0] + width;
		};
		var resetPos = function(currWidth) {// 修正
		    var offsetWidth = getWinWidth();
		    var over = Math.abs(currWidth % offsetWidth);
		    if (over != 0) {
		        if (over > offsetWidth / 2) {
		            over = offsetWidth - over;
		        }
		        currWidth = currWidth + ((currWidth + over) % offsetWidth == 0 ? over : -over);
		    }
		    return currWidth;
		};
		// 移动结束
		var endPos = function(width, event, __params) {
			var length = content.length - 1;
		    var offsetWidth = getWinWidth();
		    if (width > 0) {// 左边已没有了
			    if (resetPos(arrValue[0] + offsetWidth) > 0) {
			        offsetWidth = 0;
			    }
			} else {// 右边已没有了
			    if (resetPos(arrValue[length] - offsetWidth) < 0) {
			        offsetWidth = 0;
			    }
			}
		    // 复位
		    if (Math.abs(width) < params.resetWidth) {
		        width = 0;
		    }
		    each(content, function(index, item) { // 更新位置更新坐标				
		        var currWidth = Math.round(arrValue[index] + (width > 0 ? +offsetWidth : -offsetWidth));
		        // 设置当前
		        currWidth = resetPos(currWidth);
		        Math.abs(currWidth) == 0 && (params.currIndex = index);
		        new _animate(item,attName, resetPos(currWidth), params.time,function(len) {
		        	if (index == length) {
		    		    var offsetWidth = getWinWidth();
		        	    params.onStop((width > 0 ? +offsetWidth : -offsetWidth));
		        	    params.onChange(params.currIndex, content[params.currIndex]);
		        	}
		        }, false, function(len) {
		        	if (index == 0) {
		        		var length = content.length - 1;
						var offsetWidth = getWinWidth();
						//>>>>>>>>>>>>>>>>>>>>>>>
						var _currIndex = len / offsetWidth;
						var bfb = Math.abs(len % offsetWidth) / offsetWidth;
						var currIndex = width > 0 ? Math.ceil(_currIndex) : Math.floor(_currIndex);
		        		if (currIndex < -length) {
		        		    currIndex = -length;
		        		    bfb = 1;
		        		} else if (currIndex > 0) {
		        		    currIndex = 0;
		        		    bfb = 1;
		        		} 
		        		if (width > 0) {
		        			bfb == 1 && (bfb=0);
		        		} else {
		        			bfb == 0 && (bfb=1);
		        		}
						// 当前第几个，已滑动百份比
		        		currIndex = Math.abs(currIndex);
						params.onScroll(currIndex, content[currIndex] ,width > 0 ? bfb : -1 + bfb);

		        	}
		        });
		    });
		};

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
			if (!isLock && !isMove && Math.abs(moveX) > Math.abs(moveY)) {
		        each(content, function(index, item) {
		            _stop(item);
		        });
		        updatePos();
				params.onStart(0, event, __params);
			    isMove = true;
			}
			!isMove && (isLock = true);
			if (!isLock && isMove) {
				var length = content.length - 1;
				var offsetWidth = getWinWidth();
				//>>>>>>>>>>>>>>>>>>>>>>>
				var _currIndex = movePos(moveX, event, __params) / offsetWidth;
				var bfb = Math.abs(moveX) / offsetWidth;
				var currIndex = moveX > 0 ? Math.ceil(_currIndex) : Math.floor(_currIndex);
        		if (currIndex < -length) {
        		    currIndex = -length;
        		    bfb = 1;
        		} else if (currIndex > 0) {
        		    currIndex = 0;
        		    bfb = 1;
        		}
				// 当前第几个，已滑动百份比
        		currIndex = Math.abs(currIndex);
				params.onScroll(currIndex, content[currIndex] ,moveX > 0 ? 1 - bfb : -1 + bfb);
				//<<<<<<<<<<<<<<<<<<<<<<<
				params.onMove(moveX, event, __params);
				event.preventDefault();
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
			setCurrIndex : function (index) {
				var currIndex = Math.max(Math.min(index, content.length - 1), 0);				
				setIndex(currIndex);
				updatePos();
				params.onScroll(currIndex, content[currIndex], 0);
				params.onChange(currIndex, content[currIndex]);
			}
		};
		setTimeout(function () {
			insObj.setCurrIndex(params.currIndex);
		}, 0);
		return insObj;
	};
	win.CY.sliderWin = sliderWin;
	return sliderWin;	
});

