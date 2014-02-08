module.exports = function(db, server, restify){

	var cfg = {
		servicePath: '/measurement',
		crud: {
			create: '/create'
		},
		measurementsCollection: 'measurements'
	};

	server.post({path: cfg.servicePath + cfg.crud.create}, function(req, res, next){

		res.setHeader('Access-Control-Allow-Origin', '*');

		var workout = req.body;

		db.collection(cfg.measurementsCollection).save(workout, function(error, doc){

			if (error)
      			return next(error);

    		res.json(200, { success: true, inserted: doc });
    		return next();
		});
	});

};