var fs = require('fs');
var path = require('path');
var url = require('url');

function getFileExtension(u) {
    var arr = url.parse(u).path.split('.');
    if(arr.length<=1) {
        return 'html'
    }
    return arr[arr.length -1].toLowerCase();
}

function handleRequests(req, res) {
    var header;
    var ext = getFileExtension(req.url);
    switch (ext) {
        case 'css':
            header = {
                'Content-Type': 'text/css'
            };
            break;
        case 'js':
            header = {
                'Content-Type': 'application/javascript'
            };
            break;
        case 'html':
            header = {
                'Content-Type': 'text/html'
            };
            break;
        default:
        
            header = {
                'Content-Type': 'application/json'
            };
            break;
    }
    /* file path to the index.html file using path module */
    var urlPath = function(url) {
        if(url == "/") {
            return "/index.html";
        }
        
        return url;
    }
    
    var filePath = urlPath(url.parse(req.url).path);
    if(filePath === '/messages') {
        filePath = './messages.txt';
    } else {
        filePath = '../client' + filePath;
    }
    
    var file = path.join(__dirname, filePath);

    fs.readFile(file, function (err, data) {
        var statusCode = statusCode || 200;
        
        
        /* writeHead writes a response which includes statusCodes and header*/
        res.writeHead(statusCode, header);

        /*indicates conclusion of the response https://nodejs.org/api/http.html#http_response_end_data_encoding_callback*/
        res.end(data);
    });
}



module.exports = {
    handleRequests: handleRequests
};