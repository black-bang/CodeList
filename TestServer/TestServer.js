var express=require("express")
var path=require("path")
var server=express()

var staticPath=path.resolve(__dirname,"./test/")
server.use(express.static(staticPath))

console.log("路径=>",staticPath);
console.log("测试地址=>http://localhost:5200");

server.listen(5200)