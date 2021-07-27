//  Install npm dependencies first
//  npm init
//  npm install --save url@0.10.3
//  npm install --save http-proxy@1.11.1

var httpProxy = require("http-proxy");
var http = require("http");
var url = require("url");
var net = require('net');
var fs = require('fs');
var zlib = require('zlib');

var server = http.createServer(function (req, res) {
  var urlObj = url.parse(req.url);
  var target = urlObj.protocol + "//" + urlObj.host;
  console.log("Proxy HTTP request for:", target);

  var proxy = httpProxy.createProxyServer({});
  proxy.on("error", function (err, req, res) {
    console.log("proxy error", err);
    res.end();
  });

  proxy.web(req, res, {target: target,
    ssl: {
      key: fs.readFileSync('./security/cert.key', 'utf8'),
      cert: fs.readFileSync('./security/cert.pem', 'utf8')
    }
  });
  
}).listen(8080);  //this is the port your clients will connect to

var regex_hostport = /^([^:]+)(:([0-9]+))?$/;

var getHostPortFromString = function (hostString, defaultPort) {
  var host = hostString;
  var port = defaultPort;

  var result = regex_hostport.exec(hostString);
  if (result != null) {
    host = result[1];
    if (result[2] != null) {
      port = result[3];
    }
  }

  return ( [host, port] );
};

server.addListener('connect', function (req, socket, bodyhead) {
  var [hostDomain, port, ] = getHostPortFromString(req.url, 443);
  console.log("Proxying HTTPS request for:", hostDomain, port);
  console.log(bodyhead.toString("utf8"),'==============');
  var proxySocket = new net.Socket();
  proxySocket.connect(port, hostDomain, function () {
      // console.log("proxySocket connect");
      proxySocket.write(bodyhead);
      socket.write("HTTP/" + req.httpVersion + " 200 Connection established\r\n\r\n");
  });

  proxySocket.on('data', function (chunk) {
    // console.log("proxySocket data");
    socket.write(chunk);
  });

  proxySocket.on('end', function () {
    // console.log("proxySocket end");
    socket.end();
  });

  proxySocket.on('error', function () {
    socket.write("HTTP/" + req.httpVersion + " 500 Connection error\r\n\r\n");
    socket.end();
  });

  socket.on('data', function (chunk) {
    // console.log("socket data");
    proxySocket.write(chunk);
  });

  socket.on('end', function () {
    // console.log("socket error");
    proxySocket.end();
  });

  socket.on('error', function () {
    proxySocket.end();
  });

});