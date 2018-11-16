const path=require("path")


module.exports={
	interfaceHost:{
		//分别对应(测试,开发,产品)3种不同的接口地址
		test:"http://106.14.115.8:8008/",
		development:"http://106.14.115.8:8008/",
		production:"http://api.jzker.cn/",
	},
	modules:[
		//模块寻找地址,配置此项可以让webpack按照以下配置的文件夹顺序查找模块
		
	],	
	alias:{
		//模块/路径别名,配置此项可以精确的告知webpack对应的模块/路径是什么
		
		
	},	
}