webpackJsonp([0],{

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(React) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = includeFrame;
function includeFrame(Component) {
	var selfApi = {
		on: function on(handleName, callback) {
			//当在iframe中加载时监听外界的消息
			var handle = function handle(e) {
				if (e.data.eventName == handleName) {
					callback(e.data.data);
				} else {
					return false;
				}
			};
			window.addEventListener("message", handle);
			return function () {
				window.removeEventListener("message", handleFuction);
			};
		}
	};
	var includeFrameApi = {
		_target: null,
		target: function target(targetFrame) {
			this._target = targetFrame;
		},
		emit: function emit(handleName, data, targetFrame) {
			(targetFrame || this._target).contentWindow.postMessage({ eventName: handleName, data: data }, "*");
		}
	};
	return function (props) {
		return React.createElement(Component, _extends({}, props, { includeFrame: includeFrameApi, self: selfApi }));
	};
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),

/***/ 279:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signout = exports.ajax = exports.StartToRedner = exports.webview = exports.WithLogin = exports.storage = exports.includeFrame = exports.withFrame = undefined;

var _withFrame = __webpack_require__(280);

var _withFrame2 = _interopRequireDefault(_withFrame);

var _includeFrame = __webpack_require__(108);

var _includeFrame2 = _interopRequireDefault(_includeFrame);

var _storage = __webpack_require__(74);

var _storage2 = _interopRequireDefault(_storage);

var _WithLogin = __webpack_require__(527);

var _WithLogin2 = _interopRequireDefault(_WithLogin);

var _WeiChatWebView = __webpack_require__(281);

var _WeiChatWebView2 = _interopRequireDefault(_WeiChatWebView);

var _StartToRedner = __webpack_require__(529);

var _StartToRedner2 = _interopRequireDefault(_StartToRedner);

var _fetchFunction = __webpack_require__(530);

var _fetchFunction2 = _interopRequireDefault(_fetchFunction);

var _signout = __webpack_require__(531);

var _signout2 = _interopRequireDefault(_signout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.withFrame = _withFrame2.default;

//当组件内部包含iframe的时候使用这个装饰器
//当组件在iframe中的时候使用这个装饰器

exports.includeFrame = _includeFrame2.default;

//操作storage的Api

exports.storage = _storage2.default;

//方便调试的登录

exports.WithLogin = _WithLogin2.default;

//webview相关的Api

exports.webview = _WeiChatWebView2.default;

//基于webviewApi的高阶方法兼容webview和浏览器渲染

exports.StartToRedner = _StartToRedner2.default;

//针对金钻客接口封装的fetch请求

exports.ajax = _fetchFunction2.default;
exports.signout = _signout2.default;

/***/ }),

/***/ 280:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(React) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = withFrame;
function withFrame(Component) {
	var isFrame = false;
	if (window.top !== window.self) {
		isFrame = true;
	} else {
		isFrame = false;
	}
	//console.log("当前环境是否为iframe=>",isFrame);
	var frameApi = {
		on: function on(handleName, callback) {
			//当在iframe中加载时监听外界的消息
			if (!isFrame) {
				return false;
			}
			var handle = function handle(e) {
				if (e.data.eventName == handleName) {
					callback(e.data.data);
				} else {
					return false;
				}
			};
			window.addEventListener("message", handle);
			return function () {
				window.removeEventListener("message", handleFuction);
			};
		}
	};
	var parentWindowApi = {
		emit: function emit(handleName, data) {
			//当在iframe中加载时向外界发送消息
			if (!isFrame) {
				return false;
			}
			window.parent.postMessage({ eventName: handleName, data: data }, "*");
		}
	};
	return function (props) {
		return React.createElement(Component, _extends({}, props, { isFrame: isFrame, self: frameApi, parentWindow: parentWindowApi }));
	};
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),

/***/ 281:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
	-重要结论
	原生端和js端的方法是相反的
	当原生端使用registerHandler注册事件后,js端需要使用callHandler来调用方法
	当js端使用registerHandler注册事件后,原生端需要使用callHandler来注册方法
	ios和Android初始化webview的方式不同
*/

var webview = (_temp = _class = function () {
	function webview() {
		var _this = this;

		_classCallCheck(this, webview);

		this.ready = function (AfterReadyFn) {
			if (!_this.isWebView) {
				window.onload = function () {
					AfterReadyFn();
				};
			}
			if (_this.isAndroid) {
				//webview为安卓的情况
				if (window.WebViewJavascriptBridge) {
					WeiChatWebView.initWebViewJavascriptBridge();
					AfterReadyFn(window.WebViewJavascriptBridge);
				} else {
					document.addEventListener("WebViewJavascriptBridgeReady", function () {
						WeiChatWebView.initWebViewJavascriptBridge();
						AfterReadyFn(window.WebViewJavascriptBridge);
					}, false);
				}
			}
			if (_this.isIOS) {
				//webview为IOS的情况
				if (window.WebViewJavascriptBridge) {
					AfterReadyFn(window.WebViewJavascriptBridge);
					return false;
				}
				if (window.WVJBCallbacks) {
					window.WVJBCallbacks.push(AfterReadyFn);
					return false;
				}
				//以上两者都不存在的情况下使用iframe
				window.WVJBCallbacks = [AfterReadyFn];
				var WVJBIframe = document.createElement("iframe");
				WVJBIframe.style.display = "none";
				WVJBIframe.src = "wvjbscheme://__BRIDGE_LOADED__";
				document.documentElement.appendChild(WVJBIframe);
				setTimeout(function () {
					document.documentElement.removeChild(WVJBIframe);
				}, 0);
			}
		};

		this.on = function (handleName, handleFunction) {
			if (!window.WebViewJavascriptBridge) {
				return false;
			}
			window.WebViewJavascriptBridge.registerHandler(handleName, function (data, responseCallback) {
				handleFunction(data);
				if (responseCallback) {
					responseCallback("数据交接完成");
				}
			});
		};

		this.emit = function (handleName, param, callback) {
			if (!window.WebViewJavascriptBridge) {
				return false;
			}
			window.WebViewJavascriptBridge.callHandler(handleName, param, function (responseData) {
				if (callback) {
					callback(responseData);
				}
			});
		};

		this._ua = window.navigator.userAgent.toLowerCase();
	}

	_createClass(webview, [{
		key: "isWebView",
		get: function get() {
			//console.log(ua);
			if (this._ua.match("com.jzker.weiliao.android")) {
				return true;
			}
			if (this._ua.match("com.jzker.weiliao.ios")) {
				return true;
			}
			return false;
		}
	}, {
		key: "isIOS",
		get: function get() {
			if (this._ua.match("com.jzker.weiliao.ios")) {
				return true;
			} else {
				return false;
			}
		}
	}, {
		key: "isAndroid",
		get: function get() {
			if (this._ua.match("com.jzker.weiliao.android")) {
				return true;
			} else {
				return false;
			}
		}
	}, {
		key: "WebViewType",
		get: function get() {
			if (this._ua.match("com.jzker.weiliao.ios")) {
				return "ios";
			}
			if (this._ua.match("com.jzker.weiliao.android")) {
				return "android";
			}
			return "other";
		}
	}]);

	return webview;
}(), _class.initWebViewJavascriptBridge = function () {
	window.WebViewJavascriptBridge.init(function (message, responseCallback) {
		if (responseCallback) {
			responseCallback({ "Javascript Responds": "测试中文!" });
		}
	});
	window.localStorage.clear();
}, _temp);
exports.default = new webview();

/***/ }),

/***/ 525:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(ReactDOM, React) {

var _api = __webpack_require__(279);

var _reactRouterDom = __webpack_require__(103);

var _TestDemo = __webpack_require__(532);

var _TestDemo2 = _interopRequireDefault(_TestDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var target = document.getElementById("AppView");
(0, _api.StartToRedner)(function () {
	ReactDOM.render(React.createElement(
		_api.WithLogin,
		null,
		React.createElement(
			_reactRouterDom.HashRouter,
			null,
			React.createElement(
				"div",
				{ className: "AppRouter" },
				React.createElement(_reactRouterDom.Route, { path: "/", component: _TestDemo2.default })
			)
		)
	), target);
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(102), __webpack_require__(10)))

/***/ }),

/***/ 526:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var getLocalInfo = function getLocalInfo() {
	return JSON.parse(window.localStorage.getItem("userInfo")) || {};
};

exports.default = getLocalInfo;

/***/ }),

/***/ 527:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(React, PubSub) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;

var _reactRouterDom = __webpack_require__(103);

var _withFrame = __webpack_require__(280);

var _withFrame2 = _interopRequireDefault(_withFrame);

var _includeFrame = __webpack_require__(108);

var _includeFrame2 = _interopRequireDefault(_includeFrame);

var _storage = __webpack_require__(74);

var _storage2 = _interopRequireDefault(_storage);

var _Login = __webpack_require__(528);

var _Login2 = _interopRequireDefault(_Login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WithLogin = (0, _withFrame2.default)(_class = function (_React$Component) {
	_inherits(WithLogin, _React$Component);

	function WithLogin() {
		_classCallCheck(this, WithLogin);

		return _possibleConstructorReturn(this, (WithLogin.__proto__ || Object.getPrototypeOf(WithLogin)).apply(this, arguments));
	}

	_createClass(WithLogin, [{
		key: "render",

		//页面会嵌套在iframe中,所以要使用withFrame
		value: function render() {
			if (_storage2.default.isLogin) {
				return this.props.children;
			} else {
				if (this.props.isFrame) {
					//当嵌套在iframe中的时候,不要显示登录
					return null;
				} else {
					return React.createElement(
						_reactRouterDom.HashRouter,
						null,
						React.createElement(
							"div",
							{ className: "AppRouter" },
							React.createElement(_reactRouterDom.Route, { path: "/", component: _Login2.default })
						)
					);
				}
			}
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this2 = this;

			this.props.self.on("setUserInfo", function (userInfo) {
				//跳转时传递用户登录信息的事件
				window.localStorage.clear();
				_storage2.default.saveLoginInfo(userInfo);
				PubSub.publish("LOGIN_SUCCESS");
			});
			PubSub.subscribe("LOGIN_SUCCESS", function () {
				_this2.forceUpdate();
			});
		}
	}]);

	return WithLogin;
}(React.Component)) || _class;

exports.default = WithLogin;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10), __webpack_require__(101)))

/***/ }),

/***/ 528:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(React, PubSub) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;

var _includeFrame = __webpack_require__(108);

var _includeFrame2 = _interopRequireDefault(_includeFrame);

var _storage = __webpack_require__(74);

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = (0, _includeFrame2.default)(_class = function (_React$Component) {
	_inherits(Login, _React$Component);

	function Login() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Login);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Login.__proto__ || Object.getPrototypeOf(Login)).call.apply(_ref, [this].concat(args))), _this), _this.handleLoad = function () {
			var LoginFrame = _this.refs.LoginFrame;

			_this.props.includeFrame.target(LoginFrame);
			_this.props.includeFrame.emit("aaa", {});
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Login, [{
		key: "render",
		value: function render() {
			return React.createElement("iframe", {
				ref: "LoginFrame",
				style: { width: "100%", height: "100%", border: "none" },
				src: "http://192.168.65.100:8082",
				onLoad: this.handleLoad
			});
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			//监听不需要等待准备完成
			this.props.self.on("loginSuccess", function (userInfo) {
				_storage2.default.saveLoginInfo(userInfo);
				PubSub.publish("LOGIN_SUCCESS");
			});
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			var LoginFrame = this.refs.LoginFrame;

			this.props.includeFrame.emit("clearLoginInfo", {}, LoginFrame);
		}
	}]);

	return Login;
}(React.Component)) || _class;

exports.default = Login;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10), __webpack_require__(101)))

/***/ }),

/***/ 529:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = StartToRedner;

var _WeiChatWebView = __webpack_require__(281);

var _WeiChatWebView2 = _interopRequireDefault(_WeiChatWebView);

var _storage = __webpack_require__(74);

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//高阶方法兼容webview和浏览器渲染
function StartToRedner(renderFunction) {
	_WeiChatWebView2.default.ready(function () {
		//这段话是兼容webview的
		if (_WeiChatWebView2.default.isWebView) {
			_WeiChatWebView2.default.on("functionInJs", function (data) {
				_storage2.default.saveLoginInfo(JSON.parse(data));
				renderFunction();
			});
		} else {
			renderFunction();
		}
	});
}

/***/ }),

/***/ 530:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var ApiHost = "http://106.14.115.8:8008/";

var postFetch = function postFetch(postObject) {
	var url = postObject.url,
	    data = postObject.data;

	var dataString = "?";
	for (var key in data) {
		switch (key) {
			case "host":
				dataString = dataString + key + "=" + data[key] + "&";
				break;
			case "pagenum":
				dataString = dataString + key + "=" + data[key] + "&";
				break;
			case "pagesize":
				dataString = dataString + key + "=" + data[key] + "&";
				break;
			default:
				dataString = dataString + "param." + key + "=" + data[key] + "&";
		}
	}
	dataString = dataString.replace(/\&$/ig, "") + function () {
		var checkStr = "";
		if (localStorage.getItem("PlantFrom")) {
			checkStr = checkStr + "&param.plantFrom=" + localStorage.getItem("PlantFrom");
		}
		if (localStorage.getItem("SecretID")) {
			checkStr = checkStr + "&param.secretId=" + localStorage.getItem("SecretID");
		}
		if (localStorage.getItem("SecretKey")) {
			checkStr = checkStr + "&param.secretKey=" + localStorage.getItem("SecretKey");
		}
		return checkStr;
	}();
	return fetch(ApiHost + url.replace(/^\//ig, "").replace(/\/$/ig, "") + "/" + dataString, {
		method: "POST"
	}).catch(function (error) {
		//fetch请求自身出了问题
		throw "请检查fetch请求";
	}).then(function (response) {
		return response.json();
	}).catch(function (error) {
		//请求成功但接口报错
		console.log("\u9519\u8BEF\u63A5\u53E3:" + url);
		throw "抱歉,服务器开小差了";
	}).then(function (result) {
		switch (result.Code) {
			case "0":
				throw result.Tips;
				break;
			case "1":
				return result.Result;
				break;
			case "-1":
				throw "网络超时";
				break;
			case "-2":
				throw "无权限,非法访问";
				break;
		}
	});
};

var getFetch = function getFetch(getObject) {
	var url = getObject.url,
	    data = getObject.data;

	var dataString = "?";
	for (var key in data) {
		switch (key) {
			case "host":
				dataString = dataString + key + "=" + data[key] + "&";
				break;
			case "pagenum":
				dataString = dataString + key + "=" + data[key] + "&";
				break;
			case "pagesize":
				dataString = dataString + key + "=" + data[key] + "&";
				break;
			default:
				dataString = dataString + "param." + key + "=" + data[key] + "&";
		}
	}
	dataString = dataString.replace(/\&$/ig, "") + function () {
		var checkStr = "";
		if (localStorage.getItem("PlantFrom")) {
			checkStr = checkStr + "&param.plantFrom=" + localStorage.getItem("PlantFrom");
		}
		if (localStorage.getItem("SecretID")) {
			checkStr = checkStr + "&param.secretId=" + localStorage.getItem("SecretID");
		}
		if (localStorage.getItem("SecretKey")) {
			checkStr = checkStr + "&param.secretKey=" + localStorage.getItem("SecretKey");
		}
		checkStr = checkStr + ("&_=" + new Date().getTime());
		return checkStr;
	}();
	return fetch(ApiHost + url.replace(/^\//ig, "").replace(/\/$/ig, "") + "/" + dataString, {
		method: "GET"
	}).catch(function (error) {
		//fetch请求自身出了问题
		throw "请检查fetch请求";
	}).then(function (response) {
		return response.json();
	}).catch(function (error) {
		//请求成功但接口报错
		console.log("\u9519\u8BEF\u63A5\u53E3:" + url);
		throw "抱歉,服务器开小差了";
	}).then(function (result) {
		switch (result.Code) {
			case "0":
				throw result.Tips;
				break;
			case "1":
				return result.Result;
				break;
			case "-1":
				throw "网络超时";
				break;
			case "-2":
				throw "无权限,非法访问";
				break;
		}
	});
};

exports.default = {
	post: postFetch,
	get: getFetch
};

/***/ }),

/***/ 531:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = signout;

var _history = __webpack_require__(46);

var history = (0, _history.createHashHistory)();

function signout() {
	window.parent.postMessage({ eventName: "signout", data: {} }, "*");
	window.localStorage.clear();
	history.replace("/");
	window.location.reload();
}

/***/ }),

/***/ 532:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(React) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _api = __webpack_require__(279);

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TestDemo = function (_React$Component) {
	_inherits(TestDemo, _React$Component);

	_createClass(TestDemo, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"button",
					{ onClick: this.handleClick },
					"退出登录"
				),
				this.state.data.map(function (ListItem, index) {
					return React.createElement(
						"div",
						{ key: index },
						ListItem["ChatName"]
					);
				})
			);
		}
	}]);

	function TestDemo(props) {
		_classCallCheck(this, TestDemo);

		var _this = _possibleConstructorReturn(this, (TestDemo.__proto__ || Object.getPrototypeOf(TestDemo)).call(this, props));

		_this.handleClick = function () {
			(0, _api.signout)();
		};

		_this.state = { data: [] };
		return _this;
	}

	_createClass(TestDemo, [{
		key: "componentDidMount",
		value: function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
				var result;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.prev = 0;
								_context.next = 3;
								return _api.ajax.get({
									url: "/api/Wl_Chat_Info/ListAsync/",
									data: { pagenum: 0, pagesize: 40 }
								});

							case 3:
								result = _context.sent;

								console.log(result);
								this.setState({ data: result["data"] });
								_context.next = 11;
								break;

							case 8:
								_context.prev = 8;
								_context.t0 = _context["catch"](0);
								throw _context.t0;

							case 11:
							case "end":
								return _context.stop();
						}
					}
				}, _callee, this, [[0, 8]]);
			}));

			function componentDidMount() {
				return _ref.apply(this, arguments);
			}

			return componentDidMount;
		}()
	}]);

	return TestDemo;
}(React.Component);

exports.default = TestDemo;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _getLocalInfo = __webpack_require__(526);

var _getLocalInfo2 = _interopRequireDefault(_getLocalInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var storage = function () {
	function storage() {
		var _this = this;

		_classCallCheck(this, storage);

		this.saveLoginInfo = function (result) {
			switch (result.LoginType) {
				case 1:
					//切换门店
					window.localStorage.setItem("PlantFrom", result["PlantFrom"]);
					window.localStorage.setItem("SecretID", result["SecretID"]);
					window.localStorage.setItem("SecretKey", result["SecretKey"]);
					window.localStorage.setItem("userInfo", JSON.stringify(result));
					break;
				case 2:
					//伪登录模式
					window.localStorage.setItem("PlantFrom", result["PlantFrom"]);
					window.localStorage.setItem("SecretID", result["SecretID"]);
					window.localStorage.setItem("SecretKey", result["SecretKey"]);
					window.localStorage.setItem("originUser", JSON.stringify(_this.loginInfo));
					window.localStorage.setItem("userInfo", JSON.stringify(result));
					break;
				default:
					//0和3的情况
					window.localStorage.setItem("PlantFrom", result["PlantFrom"]);
					window.localStorage.setItem("SecretID", result["SecretID"]);
					window.localStorage.setItem("SecretKey", result["SecretKey"]);
					window.localStorage.setItem("userInfo", JSON.stringify(result));
			}
		};

		this.signoutMockLogin = function () {
			window.localStorage.setItem("PlantFrom", _this.originUserInfo["PlantFrom"]);
			window.localStorage.setItem("SecretID", _this.originUserInfo["SecretID"]);
			window.localStorage.setItem("SecretKey", _this.originUserInfo["SecretKey"]);
			window.localStorage.setItem("userInfo", JSON.stringify(_this.originUserInfo));
			window.localStorage.removeItem("originUser");
		};

		this.setUserInfo = function (keyname, keyvalue) {
			var nextUserInfo = (0, _getLocalInfo2.default)();
			switch (keyname) {
				case "PlantFrom":
					window.localStorage.setItem("PlantFrom", keyvalue);
					nextUserInfo["PlantFrom"] = keyvalue;
					break;
				case "SecretID":
					window.localStorage.setItem("SecretID", keyvalue);
					nextUserInfo["SecretID"] = keyvalue;
					break;
				case "SecretKey":
					window.localStorage.setItem("SecretKey", keyvalue);
					nextUserInfo["SecretKey"] = keyvalue;
					break;
				case "companyName":
					window.localStorage.setItem("companyName", keyvalue);
					break;
				default:
					if (Object.keys(nextUserInfo).includes(keyname)) {
						nextUserInfo[keyname] = keyvalue;
					}
			}
			window.localStorage.setItem("userInfo", JSON.stringify(nextUserInfo));
		};
	}

	_createClass(storage, [{
		key: "isLogin",
		get: function get() {
			if ((0, _getLocalInfo2.default)()["Type"]) {
				return true;
			} else {
				return false;
			}
		}
	}, {
		key: "loginInfo",
		get: function get() {
			return JSON.parse(window.localStorage.getItem("userInfo"));
		}
	}, {
		key: "isMockLogin",
		get: function get() {
			if (!this.loginInfo) {
				return false;
			}
			if (this.loginInfo.LoginType == 2) {
				return true;
			} else {
				return false;
			}
		}
	}, {
		key: "originUserInfo",
		get: function get() {
			return JSON.parse(window.localStorage.getItem("originUser"));
		}
	}]);

	return storage;
}();

exports.default = new storage();

/***/ })

},[525]);