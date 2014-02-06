define(['plugins/http', 'repositories/routes-repository', 'helpers/date-helper'], function($http, routes, dateHelper){
	return {
		insert: function(trainingData){

			var dateOfTheTraining = new Date(trainingData.date());

			var workoutToSave = {
					dateMarker: {
						concreteDate: dateOfTheTraining,
						year: dateOfTheTraining.getFullYear(),
						month: dateOfTheTraining.getMonth(),
						week: dateHelper.weekNumberOfTheYear(dateOfTheTraining)
					},
					type: trainingData.type,
					params: {
						time:{
							duration: 4800,
							inZone: 4320
						},
						health:{
							burnt:{
								fat: trainingData.burnt.fat,
								calories: trainingData.burnt.calories
							},
							heartRate:{
								max: trainingData.heartRate.max,
								avg: trainingData.heartRate.avg
							}
						},
						endomondoUrl: trainingData.endomondoUrl
					}
				};

			return $http.post(routes.workouts.crud.insert, workoutToSave);
		}
	}
});