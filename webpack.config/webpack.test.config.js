//测试环境配置,快捷启动命令npm run test
const path=require("path");
const webpack=require("webpack");
const HtmlWebpackPlugin=require('html-webpack-plugin');
const ExtractTextPlugin=require("extract-text-webpack-plugin");

const PublicModule=require("./publicModule.js")
const PublicResolve=require("./PublicResolve.js")
const CommonConfig=require("../ProjectConfig/CommonConfig.js")

module.exports={
	entry:{
		"public":PublicModule.EntryArray,
		"bundle":"./build/entry.js",
	},
	output:{
		path:path.resolve(__dirname,"../TestServer/test/"),
		filename:"[name].js",
	},
	module:{
		rules:[{
			test:/\.scss$/,
            use:ExtractTextPlugin.extract({
                use:[{loader:"css-loader"},{loader:"sass-loader"}],
                fallback:"style-loader",
            })
		},{
			test:/\.css$/,
            use:ExtractTextPlugin.extract({
                use:{loader:"css-loader"},
                fallback:"style-loader",
            })
        },{
			test:/\.(js|jsx)$/,
			use:[{loader:"babel-loader"}],
			exclude:/node_modules/,
		},{
			test:/\.(otf|eot|svg|ttf|woff|woff2)$/,
	        use:[{
	            loader:"file-loader",
	            options:{
	            	name:"myFiles-[name].[ext]",
	            	outputPath:"./fonts/",
	            	publicPath:"./"
	            }  
	        }]
		},{
			test:/\.(png|jpg|jpeg|gif)$/,
	        use:[{
	            loader:"file-loader",
	            options:{
	            	name:"myFiles-[name].[ext]",
	            	outputPath:"images/",
	            	publicPath:"./",
	            }  
	        }]
		},{
			test:/\.json$/,
			use:["json-loader"]
		},{
			test:/\.(html|htm)$/,
			use:[{loader:"html-loader"}]
		}],
	},
	plugins:[
		new ExtractTextPlugin({
			filename:"./[name].css",
		}),
		/*以下是提取公共模块的插件*/
		new webpack.ProvidePlugin(PublicModule.ProvideNames),
		/*全局变量*/
		new webpack.DefinePlugin({
			"hostname":JSON.stringify(CommonConfig.interfaceHost.test),
		   	"process.env":{
		        NODE_ENV:'"production"',
		    },
		    "TestServer":true
		}),
		/*打包公共文件*/
		new webpack.optimize.CommonsChunkPlugin({
			name:"public",
			filename:"./public.js",
		}),
		/*html模板*/
		new HtmlWebpackPlugin({
			filename:"./index.html",
			template:path.resolve(__dirname,"../ProjectConfig/template.html"),
			cache:false
		})
	],
	resolve:{
		modules:PublicResolve.modules.concat(CommonConfig.modules),
		alias:Object.assign({},PublicResolve.alias,CommonConfig.alias)
	}
}


