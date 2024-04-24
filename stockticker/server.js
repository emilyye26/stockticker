var http = require('http');
var url = require('url');
var qs = require('querystring');
var fs = require('fs');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type':'text/html'});
    urlObj = url.parse(req.url,true)
    path = urlObj.pathname;

    if (path == "/")
    {
        file="form.html";
        fs.readFile(file, function(err, home) {
        res.write(home);
        res.end();
    })
    }
    else if (path == "/process") {
        res.write("Processing...<br/>");
    }
    else
        res.write ("Unknown page request");

res.end();
}).listen(8080);
