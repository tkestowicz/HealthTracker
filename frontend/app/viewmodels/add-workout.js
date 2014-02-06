define(['providers/modal-provider', 'knockout', 'jquery', 
	'knockout-validation', 'services/workouts-service', 'durandal/app', 'module']
	, function(modalProvider, ko, $, validation, workoutsService, app, currentModule){
	
	var ctor = function(){

		var createFormViewModel = function(){
			return {
				date: ko.observable('2014-05-02').extend({ required: true, date: true }),
				length: ko.observable(undefined).extend({ required: true }),
				inZone: ko.observable('1:00').extend({ required: true }),
				type: ko.observable(undefined).extend({ required: true }),
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
		};

		this.trainingTypes = [{id: 1, name: 'Gym'}, {id:2, name:'Running'}, {id:3, name:'Cycling'}];
		this.providedData = createFormViewModel();
		this.validationErrors = ko.validation.group(this.providedData);
		this.saveBtnEnabled = ko.observable(true);

		this.abort = function(view){
			modalProvider.close(view);
		};

		this.save = function(view){
			if(view.providedData.isValid()){

			saveBtnEnabled(false);

			workoutsService.insert(view.providedData).fail(function(){
					app.showMessage('An error occured during workout saving. Please try again.');					
				}).done(function(){
					app.showMessage('Workout successfully saved.');
					closeWindow(view);	
				}).always(function(){
					saveBtnEnabled(true);
				});

			}
			else{
				view.validationErrors.showAllMessages();
				app.showMessage("Some fields have invalid data.");
			}				
		};
	};

	return ctor;
});