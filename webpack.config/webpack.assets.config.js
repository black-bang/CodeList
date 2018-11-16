//生产环境配置,快捷启动命令npm run assets
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
		path:path.resolve(__dirname,"../assets/"),
		filename:"[name]-[hash].js",
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
	            	name:"myFiles-[name]-[hash].[ext]",
	            	outputPath:"./fonts/",
	            	publicPath:"./"
	            }  
	        }]
		},{
			test:/\.(png|jpg|jpeg|gif)$/,
	        use:[{
	            loader:"file-loader",
	            options:{
	            	name:"myFiles-[name]-[hash].[ext]",
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
		new webpack.optimize.UglifyJsPlugin({
			compress:{
				warnings:false,
			},
			//mangle:false,
		}),
		new ExtractTextPlugin({
			filename:"./[name]-[hash].css",
		}),
		/*以下是提取公共模块的插件*/
		new webpack.ProvidePlugin(PublicModule.ProvideNames),
		/*全局变量*/
		new webpack.DefinePlugin({
			"hostname":JSON.stringify(CommonConfig.interfaceHost.production),
		   	"process.env":{
		        NODE_ENV:'"production"',
		    }
		}),
		/*打包公共文件*/
		new webpack.optimize.CommonsChunkPlugin({
			name:"public",
			filename:"./[name]-[hash].js",
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


