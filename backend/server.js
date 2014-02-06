(function init(restify, mongojs, workoutService){

// bases on: https://www.openshift.com/blogs/day-27-restify-build-correct-rest-web-services-in-nodejs
var cfg = {
		applicationName: 'healthTrackerBackend',
		databaseName: 'healthTracker',
		databaseAddress: '127.0.0.1:27017',
		serverAddress: '127.0.0.1',
		port: '8080'
	}, 
	services = {
		workout: workoutService
	},
	server = restify.createServer({
		name : cfg.applicationName
	}),
	db = mongojs(cfg.databaseAddress+'/'+cfg.databaseName);

server.use(restify.queryParser({ mapParams: false })); // plugin is used to parse the HTTP query string (i.e., /jobs?skills=java,mysql). The parsed content will always be available in req.query.
server.use(restify.bodyParser());  // takes care of turning your request data into a JavaScript object on the server automatically
server.use(restify.CORS());

services.workout(db, server, restify);

server.listen(cfg.port ,cfg.serverAddress, function(){
    console.log('%s listening at %s ', server.name , server.url);
});

}(require('restify'), require("mongojs"), require('./services/workout.js')));