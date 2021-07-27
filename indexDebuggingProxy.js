const debugProxy = require('@cypress/debugging-proxy')
var fs = require("fs");

// create an instance
const proxy = new debugProxy({
    auth: { // if `auth` is set, HTTP basic authentication to the proxy will be required using these credentials
        username: 'foo',
        password: 'bar'
    },
    keepRequests: false, // if `keepRequests` is set, the proxy will store a log of requests that can be retrieved using `proxy.getRequests()`
    https: { // if https is set, https.createServer will be called with this key and cert to launch the server
        key: fs.readFileSync('./security/cert.key'),
        cert: fs.readFileSync('./security/cert.pem')
    }
})

// using your stubbing/spying library of choice...
// spy(proxy.proxyRequestToUrl)
// spy(proxy.proxySslConnectionToDomain)

// start an httpproxy on localhost:3000
proxy.start(3000)