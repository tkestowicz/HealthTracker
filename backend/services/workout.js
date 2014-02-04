module.exports = function(db, server, restify){

	var cfg = {
		servicePath: '/workout',
		crud: {
			create: '/create'
		},
		workoutsCollection: 'workouts'
	};

	server.post({path: cfg.servicePath + cfg.crud.create}, function(req, res, next){

		var workout = req.body;

		db.collection(workoutsCollection).save(workout, function(error, doc){

			if (error)
      			return next(error);

    		res.json(200, { success: true, inserted: doc });
    		return next();
		});
	});

};