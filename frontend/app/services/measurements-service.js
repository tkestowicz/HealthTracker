define(['plugins/http', 'repositories/routes-repository', 'helpers/date-helper'], 
	function($http, routes, dateHelper){
	return {
		insert: function(measurementData){

			var dateOfTheTraining = new Date(measurementData.date());

			var measurement = {
					dateMarker: {
						concreteDate: dateOfTheTraining,
						year: dateOfTheTraining.getFullYear(),
						month: dateOfTheTraining.getMonth(),
						week: dateHelper.weekNumberOfTheYear(dateOfTheTraining)
					},
					params: {
						weight: measurementData.weight(),
						fat:{
							percent: measurementData.fat.percent(),
							mass: measurementData.fat.mass(),
							visceralRating: measurementData.fat.visceralRating()							
						},
						muscleMass: measurementData.muscleMass(),
						metabolicAge: measurementData.metabolicAge(),
						bmr: measurementData.bmr()
					}
				};

			return $http.post(routes.measurements.crud.insert, measurement);
		}
	};
});