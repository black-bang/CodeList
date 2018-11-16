//开发环境配置,快捷启动命令npm run dev
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
		path:"/",
		publicPath:"/",
		filename:"[name].js",
	},
	devtool:"source-map",
    devServer:{
        inline:true,
        host:"0.0.0.0",
        publicPath:"/",
        contentBase:"./",
        watchContentBase:true,
        historyApiFallback:true,
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
			use:[/*{loader:"react-hot-loader/webpack"},*/{loader:"babel-loader"}/*,{loader:"webpack-module-hot-accept"}*/],
			exclude:/node_modules/,
		},{
			test:/\.(otf|eot|svg|ttf|woff|woff2)$/,
	        use:[{
	            loader:"file-loader",
	            options:{
	            	name:"myFiles-[name].[ext]",
	            	outputPath:"./style/"
	            }  
	        }]
		},{
			test:/\.(png|jpg|jpeg|gif)$/,
	        use:[{
	            loader:"file-loader",
	            options:{
	            	name:"myFiles-[name].[ext]",
	            	publicPath:"./",
	            	outputPath:"images/"
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
			filename:"[name].css",
		}),
		//new webpack.HotModuleReplacementPlugin({multiStep:true}),
		//new webpack.NamedModulesPlugin(),
		/*以下是提取公共模块的插件*/
		new webpack.ProvidePlugin(PublicModule.ProvideNames),
		/*全局变量*/
		new webpack.DefinePlugin({
			hostname:JSON.stringify(CommonConfig.interfaceHost.development),
		   	"process.env":{
		        NODE_ENV:'"development"',
		    }
		}),
		/*打包公共文件*/
		new webpack.optimize.CommonsChunkPlugin({
			name:"public",
			filename:"assets/lib/public.js",
		}),
		/*html模板*/
		new HtmlWebpackPlugin({
			filename:"index.html",
			template:path.resolve(__dirname,"../ProjectConfig/template.html"),
			cache:false
		})
	],
	//定义路径别名
	resolve:{
		modules:PublicResolve.modules.concat(CommonConfig.modules),
		alias:Object.assign({},PublicResolve.alias,CommonConfig.alias)
	}
}


