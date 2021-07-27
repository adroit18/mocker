var httpProxy = require("http-proxy");
var https = require("https");
var http = require("http");
var url = require("url");
var fs = require("fs");
var express = require("express");

var app = express();
// http=127.0.0.1:8080;https=127.0.0.1:8080
// <-loopback>

var sslOptions = {
  key: fs.readFileSync("./security/cert.key", "utf8"),
  cert: fs.readFileSync("./security/cert.pem", "utf8"),
};


var server = https.createServer(sslOptions, function(req,res){
 var urlObj = url.parse(req.url);
 let searchParams = new URLSearchParams(urlObj.query);
 var target = searchParams.get("target");
 console.log(target,'2');
 
}).listen(4000);

http.createServer(function(req,res){
  var urlObj = url.parse(req.url);
  var target = urlObj.protocol + "//" + urlObj.host;
  req.target = encodeURI(target);
  console.log(target,'1');
  var proxy = httpProxy.createProxyServer({});
  proxy.web(req, res, {target: `https://localhost:4000?target=${target}`, ssl:sslOptions, secure:false, changeOrigin:true});
}).listen(8080);
