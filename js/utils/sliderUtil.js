(function(e, n) {	
	if (typeof module !== "undefined") {
	    module.exports = n(e);
	} else {
		n(e);
	    if (typeof define === "function" && (define.amd || define.cmd)) {
	        define("sliderUtil", function() {
	            return n(e);
	        });
	    }
	}
})(window || this, function(win) {
	!win.CY && (win.CY = {});
	if(win.CY.sliderUtil) return win.CY.sliderUtil;
	
	var unit = "px", doc = document;
	var undf = undefined;
	var get = function(selector, content) {// dom|selector
		return selector && selector instanceof Object ? selector : (selector ? (content || document).querySelector(selector) : null);
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
	var getStyle = function(ele, attr) {
	    if (win.getComputedStyle) {
	        return win.getComputedStyle(ele, null)[attr];
	    }
	    return ele.currentStyle[attr];
	};
	var create = function(tag, className) {
		tag = doc.createElement(tag);
		className && (tag.className = className);
		return tag;
	};
	var Drag = function (params) {
		var inMobile = /Android|webOS|iphone|ipod|ipad|BlackBerry/i.test(navigator.userAgent);
		var onStart = "mousedown";
	    var onMove = "mousemove";
	    var onEnd = "mouseout";
	    if (inMobile) {
	        onStart = 'touchstart';
	        onMove = 'touchmove';
	        onEnd = 'touchend';
	    }
	    params = extend({
	    	drag : 0.1, 	// 阻尔糸数
	    	time : 1000,	// 滑动时间
	    	attr : 'left',	// 滚动元素属性[left|top]
			elem : '', 		// 滑动元素选择器
			content : '', 	// 滚动元素选择器
			resetWidth : 10 // 重置复位宽度	
	    }, params || {});
	    params.elem = get(params.elem);
	    params.content = get(params.content, params.elem);
		if (!params.elem || !params.content) return;
		params.content.style.position = 'relative';
		var _startHooks = []; 	// 开始
		var _moveHooks = [];	// 移动
		var _stopHooks = [];	// 停止
		var __params = {
			startPageX : 0,	// 开始鼠标位置
			endPageX : 0,	// 最后鼠标位置
			startPageY : 0,	// 开始鼠标位置
			endPageY : 0,	// 最后鼠标位置
			startX : 0, 	// 开始移动位置（元素）
			startTime : 0,		// 开始移动时间
			endTime : 0,		// 停止移动时间
			isStart : false,	// 开始移动
		    winWidth: 0,		// 窗口宽
		    maxScrWidth: 0,	// 滚动内容宽
		    scrWidth: 0		// 每次移动的整数
		};
		var children, isMove = false;
		var isPageX = params.attr == "left";
		var getWidth = (function(dom) {
		    var attr = "offset" + (isPageX ? "Width" : "Height");
		    return function(dom) {
		        return dom[attr];
		    };
		})();
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
	    children = params.content.children;
		__params.winWidth = getWidth(params.elem);
		__params.scrWidth = getWidth(children[0]);
		var __maxScrWidth = Math.max(getWidth(params.content), children.length * __params.scrWidth);
		var paddingWinth = parseFloat(getStyle(params.elem,"paddingLeft") || 0) + parseFloat(getStyle(params.elem,"paddingRight") || 0);
		__params.maxScrWidth = __maxScrWidth - __params.winWidth + paddingWinth;
		var mask = document.createElement("div");
		if (__params.maxScrWidth > 0) {;
			extend(mask.style, {
			    position: 'absolute',
			    left: 0,
			    top: 0,
			    right: 0,
			    bottom: 0,
			    opacity: 0.1,
			    zIndex: 1,
			    backgroundColor: '#fff'
			});
			var isLock = false;// true锁定
			addEvent(doc, onStart, function(event) {
			    _startHooks.forEach(function(func) {
			        func(__params, params, event);
			    });
			    if (!__params.isStart) return;
			    isMove = false;
			    isLock = false;
			    __params.startTime = now();
			    __params.startPageX = getPageXY(event,"X");
				__params.startPageY = getPageXY(event,"Y");
				__params.startX = parseFloat(getStyle(params.content, params.attr) || 0);				
			});
			
			addEvent(doc, onMove, function(event){
				if (!__params.isStart || isLock) return;
				__params.endPageX = getPageXY(event,"X");
			    __params.endPageY = getPageXY(event,"Y");
			    var moveX = __params.endPageX - __params.startPageX;
			    var moveY = __params.endPageY - __params.startPageY;
			    var absMoveY = Math.abs(moveY);
			    var absMoveX = Math.abs(moveX);
			    if (!isMove && absMoveX > absMoveY && absMoveY != absMoveX) {
			    	event.preventDefault();
					isMove = true;
				}
			    _moveHooks.forEach(function(func) {
			    	func(__params, params, event);
			    });
			    if (!isMove) {
			    	isLock = true;
			    }
			    if (!isLock && isMove) {				    	
			    	var style = {}, move = 0;
			    	move = __params.endPageX - __params.startPageX;
			    	style[params.attr] = __params.startX + move + unit;
			    	extend(params.content.style, style);
			    	!mask.parentNode && params.content.appendChild(mask);
			    	event.preventDefault();
			    }
			});
			addEvent(doc, inMobile ? onEnd : onEnd + " mouseup", function(event){
				if (!__params.isStart) return;
				if (isMove) {
					event.preventDefault();
					__params.isStart = false;
					__params.endTime = now();
					__params.endPageX = getPageXY(event,"X");
					_stopHooks.forEach(function(func) {
						func(__params, params, event);
					});
					mask.parentNode && mask.parentNode.removeChild(mask);
				}
			});			
			
		}
		return {
			params : params,
			__params : __params,
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
	var _animate = function(elem, attr, val, time, callback, twee) {
	    var _attr = window.getComputedStyle(elem, null);
	    var _val = parseInt(_attr.getPropertyValue(attr.replace( /([A-Z])/g, "-$1" ).toLowerCase())) || 0;
	    var t = 0 , d = time || 500, now = +new Date(), range = Math.abs(_val - val);
	    var dir = val > _val ? true : false, v;
	    var unit = 'px' , _run = function(gotoEnd) {
	        if (t < d && !gotoEnd) {
	            t = +new Date() - now;
	            v = twee ? _linear(t, 0, range, d) : _expo(t, 0, range, d);
	            elem.style[attr] = (dir ? _val + v : _val - v) + unit;
	        } else {
	            elem.style[attr] = (dir ? _val + range : _val - range) + unit;
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
	var Slider = function (params) {
		params = extend({
			delay : 800,
			moveInt : true,// 移动整格
			isSpring : true,// 启动弹性吸附效果
		    realSrc: "realSrc",// 真实路径	
			isOverMove : true,// 超过窗口还
			onChange : function () {}
		}, params || {});
		var isPause = false, _setClickIndex = function () {};
		setTimeout(function () {
			var drag = new Drag(params);
			if (!drag.params) return;
			params = drag.params;
			var __params = drag.__params;
			var isLoop = params.isLoop;	// 循环
			var currIndex = 0;			// 当前第几个
			var children = params.content.children;// 没有生成前后所有子元素前
			var len = children.length;	// 子元素长度
			var setOther = function() {	// 设置数量和低下小点
				currIndex = Math.round(currIndex);
				setShowNum && setShowNum();
				setNavMenu && setNavMenu();
			};
			if (len < 2) {return;}
			if (isLoop) {
				if (!params.elem || !params.content) return;
				var first = children[0].cloneNode(true);
				var last = children[len - 1].cloneNode(true);
				params.content.insertBefore(last, children[0]);
				params.content.appendChild(first);
				var lztem = "_lazyloadtem";
				each(first.querySelectorAll("img"), function (i, n) {
					n.removeAttribute(lztem);
				});
				each(last.querySelectorAll("img"), function (i, n) {
					n.removeAttribute(lztem);
				});
				params.content.style[params.attr] = - __params.scrWidth + unit;
			}
			// 当前多少个数量
			var isShowNum = params.isShowNum, showNum, setShowNum;
			if (isShowNum) {
				setShowNum = function() {
					showNum.innerHTML = "<b>" + (currIndex + 1) + "</b>/" + len;
				};
				showNum = create("div", "showNum");
				params.elem.appendChild(showNum);
			}
			// 底部菜单小点
			var navMenu = params.navMenu, setNavMenu;
			setNavMenu = function() {
				each(navMenu.children, function(i, n) {
					n.classList[currIndex == i ? "add" : "remove"]("curr");
				});
			};
			if (!navMenu) {
				navMenu = create("div", "navMenu");
				for (var i = 1, numArr = []; i <= len; i++) {
					numArr.push("<b></b>");
				}
				navMenu.innerHTML = numArr.join(" ");
				params.elem.appendChild(navMenu);
			} else {
				navMenu = get(params.navMenu);
			}
			
			_setClickIndex = function (index) {
				var left = 0;
				if (isPause) return;
				if (isLoop) {
					currIndex = index;
					left = -(currIndex * __params.scrWidth + __params.scrWidth);
				    if (left >= 0) {
					    currIndex = len - 1;
					} else if (left < -__params.maxScrWidth - __params.scrWidth) {
					    currIndex = 0;
					} else {
					    currIndex = Math.round(Math.abs(left) / __params.scrWidth) - 1;
					}
				} else {
					currIndex = index;
				    left = -(currIndex * __params.scrWidth);
				    if (left < -__params.maxScrWidth) {
				        left = 0;
				        currIndex = 0;
				    }
				}
				setOther();
				setAuto();
				_stop(params.content);
				_animate(params.content, params.attr, left, 1000, function() {
					if (isLoop) {
						if (left >= 0) {
						    left = -__params.maxScrWidth - __params.scrWidth;
						    params.content.style[params.attr] = left + unit;
						} else if (left < -__params.maxScrWidth - __params.scrWidth) {
						    left = -__params.scrWidth;
						    params.content.style[params.attr] = left + unit;
						}
					}
					lazyload();
					params.onChange(currIndex+1, children[currIndex], len);
				});
			};
			
			each(navMenu.children, function(index, n) {
				addEvent(n,"click", function () {
					_setClickIndex(index);
				});
			});
			var autoTime = params.autoTime;// 自动播放
			var autoTimeID, setAuto, clearAuto;
			setAuto = function() {};
			clearAuto = function() {};
			// 自动播放需要循环属性
			if (autoTime) {
				setAuto = function() {
					clearAuto();
					autoTimeID = setInterval(function() {
						var left = 0;
						if (isPause) return;
						currIndex++;
					    lazyload();
						if (isLoop) {
						    left = -(currIndex * __params.scrWidth + __params.scrWidth);
						    if (left >= 0) {
						        currIndex = len - 1;
						    } else if (left < -__params.maxScrWidth - __params.scrWidth) {
						        currIndex = 0;
						    }
						} else {
						    left = -(currIndex * __params.scrWidth);
						    if (left < -__params.maxScrWidth) {
						        left = 0;
						        currIndex = 0;
						    }
						}
						setOther();
						_stop(params.content);
						_animate(params.content, params.attr, left, 1000, function() {
						    if (isLoop) {
						        if (left >= 0) {
						            left = -__params.maxScrWidth - __params.scrWidth;
						            params.content.style[params.attr] = left + unit;
						        } else if (left < -__params.maxScrWidth - __params.scrWidth) {
						            left = -__params.scrWidth;
						            params.content.style[params.attr] = left + unit;
						        }
						    }
						    lazyload();
						    params.onChange(currIndex+1, children[currIndex], len);
						});
					}, autoTime);
				};
				clearAuto = function() {
					clearInterval(autoTimeID);
				};
			}
			// 延迟加载图片
			var lazyload = function() {
				var realSrc = params.realSrc, lztem = "_lazyloadtem";
				var imgs = params.elem.querySelectorAll("img[" + realSrc + "]");
				if (!imgs.length) {
					return;
				}
				var style = window.getComputedStyle(params.content, null);
				var scrL = parseInt(style.getPropertyValue(params.attr)) || 0;
				var winW = doc.documentElement["clientWidth"] || doc.body["clientWidth"];
				var step = 100, inW = function(num) {
					return (num >= scrL - step && num < (winW + scrL + step)) ? true : false;
				};
				each(imgs, function(i, n) {
					var url = n.getAttribute(realSrc);
					if (!url) {
						n.getAttribute(lztem) && n.removeAttribute(lztem);
						return;
					}
					var pos = n.getBoundingClientRect();
					var l = pos.left + scrL;
					var w = n.offsetWidth;
					if (inW(l) || inW(l + w)) {
						n.setAttribute('src', url);
						n.removeAttribute(realSrc);
						n.onload = function() {
							n.__bindKkey && n.removeAttribute(lztem);
						};
					}
				});
			};
			setAuto();
			setOther();
			setTimeout(function () {
				lazyload();
			}, params.delay/2);
			drag.addStartHooks(function (__params, params, event) {
				if (isPause) {
					__params.isStart = false;
					return;
				};
				var cur, i = 0, body = doc.body;
				cur = (event.target || event.srcElement);
				while (cur && cur != body) {
					if (cur.nodeType == 1) {
						if (i++ > 10) return;
						if (cur == params.content) {
							__params.isStart = true;
							clearAuto();
							break;
						} else {
							__params.isStart = false;
						}
					}
					cur = cur["parentNode"];
				}
			});
			drag.addMoveHooks(function (__params, params, event) {
				
				var maxMove, moveX, left;
				clearAuto();
				maxMove = __params.maxScrWidth;
				moveX = __params.endPageX - __params.startPageX;
				left = __params.startX + moveX;
				if (isLoop) {// 超划的时间
					if (moveX > 0) { // 左向右移动正
						if (left > - __params.scrWidth) {
							__params.startX = -__params.maxScrWidth -__params.winWidth - __params.scrWidth - (__params.endPageX - __params.startPageX);
						}
					} else if (left < -maxMove -__params.scrWidth) {
						__params.startX = - (__params.startPageX - __params.endPageX);
					}
				} else {
					if (moveX > 0) { // 左向右移动正
						if (left > 0) {
							if (params.isOverMove) {
								__params.endPageX -= Math.abs(moveX) / 1.5;
							} else {
								__params.endPageX  -= moveX;
							}
						}
					} else if (left < -maxMove) {
						if (params.isOverMove) {
							__params.endPageX += Math.abs(moveX) / 1.5;
						} else {
							__params.endPageX += Math.abs(left) - maxMove;
						}
					}
				}
			});
			drag.addMoveHooks(function (__params, params, event) {
				lazyload();	_stop(params.content);
			});
			drag.addStopHooks(function (__params, params, event) {
				lazyload();
			});
			drag.addStopHooks(function (__params, params, event) {
				var moveX = 0, left, v0 = 0, s0 = 0;
				moveX = __params.endPageX - __params.startPageX;
				if (Math.abs(moveX) < params.resetWidth) {// 复位
					_animate(params.content, params.attr, __params.startX);
					setAuto();
				} else {
					if (isLoop) {// 循环
						if (moveX > 0) {// 左向右移动正
							// 向下取整;移动距离%移动整数再*移动整数得到要路径的距离
							moveX += s0;
							params.moveInt && (moveX = Math.ceil(Math.abs(moveX) / __params.scrWidth) * __params.scrWidth);
							left = __params.startX + moveX;
						} else {// 右向左移动负
							// 向下取整;移动距离%移动整数再*移动整数得到要路径的距离
							moveX -= s0;
							params.moveInt && (moveX = -Math.ceil(Math.abs(moveX) / __params.scrWidth) * __params.scrWidth);
							left = __params.startX + moveX;
						}
						if (params.moveInt) {// 不是整数，调整到整数
						    var num = left % __params.scrWidth;
						    if (num != 0) {
						        if (Math.abs(num) > __params.scrWidth / 2) {
						            num = __params.scrWidth - Math.abs(num);
						        }
						        left = left + num % __params.scrWidth == 0 ? left + num : left - num;
						    }
						}

						if (left >= 0) {
						    currIndex = len - 1;
						} else if (left < -__params.maxScrWidth - __params.scrWidth) {
						    currIndex = 0;
						} else {
						    currIndex = Math.round(Math.abs(left) / __params.scrWidth) - 1;
						    currIndex < 0 && (currIndex = 0);
						}
						setOther();
						_animate(params.content, params.attr, left, 350, function () {
							if (left >= 0) {
							    left = -__params.maxScrWidth - __params.scrWidth;
							    params.content.style[params.attr] = left + unit;
							} else if (left < -__params.maxScrWidth - __params.scrWidth) {
							    left = -__params.scrWidth;
							    params.content.style[params.attr] = left + unit;
							}
							setAuto();
							lazyload();
							params.onChange(currIndex+1, children[currIndex], len);
						});
					} else {
						// 得到速度*滑动时间*阻尔糸数 = 路程
						if (params.isSpring) {
							v0 = Math.abs(moveX) / (__params.endTime - __params.startTime);
							s0 = v0 * params.time * params.drag;// 路程
						}
						if (moveX > 0) {// 左向右移动正
							// 向下取整;移动距离%移动整数再*移动整数得到要路径的距离
							moveX += s0;
							params.moveInt && (moveX = Math.ceil(Math.abs(moveX) / __params.scrWidth) * __params.scrWidth);
							left = __params.startX + moveX;
							left > 0 && (left = 0);
						} else {// 右向左移动负
							// 向下取整;移动距离%移动整数再*移动整数得到要路径的距离
							moveX -= s0;
							params.moveInt && (moveX = -Math.ceil(Math.abs(moveX) / __params.scrWidth) * __params.scrWidth);
							left = __params.startX + moveX;
							left < -__params.maxScrWidth && (left = -__params.maxScrWidth);
						}
						currIndex = Math.round(Math.abs(left) / __params.scrWidth);
						setOther();
						_animate(params.content, params.attr, left, 500, function () {
							setAuto();
							lazyload();
							params.onChange(currIndex+1, children[currIndex], len);
						});
					}
				}
			});
		}, params.delay);
		
		return {
			pause : function () {
				isPause = true;
			},
			play : function () {
				isPause = false;
			},
			setCurr : function (index) {
				_setClickIndex(index);
			}
		};
	};
	
	win.CY.sliderUtil = Slider;
	return Slider;	
});
