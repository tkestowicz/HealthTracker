var restify = require('restify');
var mongojs = require("mongojs");
 
var ip_addr = '127.0.0.1';
var port    =  '8080';
 
var server = restify.createServer({
    name : "healthTrackerBackend"
});
 
server.listen(port ,ip_addr, function(){
    console.log('%s listening at %s ', server.name , server.url);
});