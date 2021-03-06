const path=require("path")
//项目常用的开源js模块

module.exports={
	EntryArray:[
			//入口文件的数组
			"babel-polyfill",
			"whatwg-fetch",
			"pubsub-js",
			"moment",
			"react",
			"prop-types",
			"react-dom",
			"mobx",
			"mobx-react",
			"classnames",
			"react-router-dom",
			path.resolve(__dirname,"../JZKER.API/initStyle.scss"),
	],	
	ProvideNames:{
		//公共模块的在全局的变量名
		React:"react",
		moment:"moment",
		PropTypes:"prop-types",
		classnames:"classnames",
		ReactDOM:"react-dom",
		PubSub:"pubsub-js"
	}
}