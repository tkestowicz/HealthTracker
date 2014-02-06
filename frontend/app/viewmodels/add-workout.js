define(['providers/modal-provider', 'knockout', 'jquery', 'knockout-validation', 'services/workouts-service', 'durandal/app']
	, function(modalProvider, ko, $, validation, workoutsService, app){
	
	var createFormViewModel = function(){
		return {
			date: ko.observable('2014-05-02').extend({ required: true, date: true }),
			length: ko.observable('1:46').extend({ required: true }),
			inZone: ko.observable('1:00').extend({ required: true }),
			type: ko.observable(1).extend({ required: true }),
			heartRate:{
				avg: ko.observable(142).extend({ required: true, min: 60, max: 220 }),
				max: ko.observable(160).extend({ min: 60, max: 220 })
			},
			burnt: {
				calories: ko.observable(1200).extend({ required: true, min: 0 }),
				fat: ko.observable(40).extend({ required: true, min: 0 })
			},
			endomondoUrl: ko.observable()
		};
	},
	closeWindow = function(view){
		view.providedData = createFormViewModel();	
		modalProvider.close(view);	
	},
	trainingData = createFormViewModel(),
	saveBtnEnabled = ko.observable(true);
		

	return {

		trainingTypes: [{id: 1, name: 'Gym'}, {id:2, name:'Running'}, {id:3, name:'Cycling'}],
		providedData: trainingData,
		validationErrors: ko.validation.group(trainingData),
		saveBtnEnabled: saveBtnEnabled,

		abort: closeWindow,

		save: function(view){
			if(trainingData.isValid()){

			saveBtnEnabled(false);

			workoutsService.insert(trainingData).fail(function(){
					app.showMessage('An error occured during workout saving. Please try again.');					
				}).done(function(){
					app.showMessage('Workout successfully saved.');
					closeWindow(view);	
				}).always(function(){
					saveBtnEnabled(true);
				});

			}
			else
				app.showMessage("Some fields have invalid data.");
		}
	};
});