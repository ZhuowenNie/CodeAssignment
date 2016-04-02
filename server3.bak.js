var http = require('http');
var fs = require('fs'); 
var url=require("url");   
var express = require('express');

var port = 8888;
var host = '127.0.0.1';

var app = express();

app.use(express.static('public'));
app.use('/static', express.static('static'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.param('id', function (req, res, next, id) {
  console.log('CALLED ONLY ONCE');
});

app.get('/save', function (req, res) {
	console.log('save msg',req.query.msg);
	var filename = getRandom();
	var msg = req.query.msg;
	writeFile("./data/"+filename,msg);
	var resp_url = "http://"+host+":"+port + "/s/" + filename;
	res.send('1:'+resp_url);
});

function writeFile (filename,data) {
	 //写入文件
	 fs.writeFile(filename,data,function (err) {
		 if (err) throw err ;
		 console.log("File (" + filename + ") writeFile data: " + data); //文件被保存
	 }) ;
}

function getRandom () {
	return Math.random().toString(32).substr(2);
}

app.get('/s/:msg', function (req, res) {
  var filename = req.params.msg;
  fs.readFile("./data/"+filename,"utf8",function (error,data){
		if(error) throw error ;
		console.log("File (" + filename + ") readFile data: " + data) ;
		var getUrl = data;
		 res.redirect(301, getUrl);
	}) ;
  // var getUrl = "http://www.baidu.com";
  // res.redirect(301, getUrl);
});

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
/**
var server = http.createServer(function (request, response) {
	 var pathname=url.parse(request.url).pathname;   
      console.log("Request for "+pathname+" received.");   
	
	if(pathname.startWith('/save')) {
		//var param = pathname.substring(6);
		//var fileKey = "";//getRandom();

		// writeFile(fileKey,param);
		// console.log(readFile(fileKey));
		// existsFile(fileKey);
		// console.log("save param: "+param+" fileKey :" + fileKey + " received.");  
		response.end('1');
	} if(pathname.startWith('/d')) {
		//var param = pathname.substring(2);
		//console.log("short param: "+param+" received.");  
		response.end('2');
	} else {
		fs.readFile('./index.html', 'utf-8',function (err, data) {//读取内容 
			if (err) throw err; 
			response.writeHead(200, {"Content-Type": "text/html"});//注意这里 
			response.write(data); 
			response.end(); 
		}); 
	}

});

String.prototype.startWith=function(str){  
	if(str==null||str==""||this.length==0||str.length>this.length)  
	  return false;  
	if(this.substr(0,str.length)==str)  
		return true;  
	else  
		return false;  
	return true;  
}  

function shortUrl () {
	var fileKey = getRandom();

}

function writeFile (filename,data) {
	 //写入文件
	 fs.writeFile(filename,data,function (err) {
		 if (err) throw err ;
		 console.log("File (" + filename + ") writeFile data: " + data); //文件被保存
	 }) ;
}

function readFile (filename) {
	fs.readFile(filename,"utf8",function (error,data){
		if(error) throw error ;
		console.log("File (" + filename + ") readFile data: " + data) ;
		return data;
	}) ;
}

function existsFile (filename) {
	var flag = false;
	// 判断文件是否存在
	fs.exists(filename, function( exists ){
	   console.log("0:"+  exists ) ;
		flag = exists;
	}) ;
	console.log("1:"+ flag ) ;
	return flag;
}

**/




// 终端打印如下信息
console.log('Server running at http://'+host+':'+port+'/');