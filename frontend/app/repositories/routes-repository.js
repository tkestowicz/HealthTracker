define(function(){

	//Todo: move this setting to configuration repository
	var server = 'http://127.0.0.1:8080/';

	return {
		workouts: {
			crud:{
				insert: server + 'workout/create'
			}
		},
		measurements: {
			crud:{
				insert: server + 'measurement/create'
			}
		}
	};
});