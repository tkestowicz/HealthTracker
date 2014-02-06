define(['providers/modal-provider', 'knockout', 'jquery', 
	'knockout-validation', 'services/workouts-service', 'durandal/app', 'module']
	, function(modalProvider, ko, $, validation, workoutsService, app, currentModule){
	
	var ctor = function(){

		var createFormViewModel = function(){

			var timeValidation = {
				params: '^[1-9]{0,1}[0-9]:[0-5]{1}[0-9]{0,1}$',
				message: 'Correct format for this field is: hh:mm.'
			};

			var endomondoUrl = ko.observable();

			return {
				date: ko.observable().extend({ required: true, date: true }),
				length: ko.observable().extend({ required: true, pattern: timeValidation }),
				inZone: ko.observable().extend({ required: true, pattern: timeValidation }),
				type: ko.observable().extend({ required: true }),
				heartRate:{
					avg: ko.observable().extend({ required: true, min: 60, max: 220 }),
					max: ko.observable().extend({ min: 60, max: 220 })
				},
				burnt: {
					calories: ko.observable().extend({ required: true, min: 0 }),
					fat: ko.observable().extend({ required: true, min: 0 })
				},
				endomondoUrl: endomondoUrl.extend({ 
					pattern: { 
						params: '^(https{0,1}://|www.|https{0,1}://www.)endomondo.com/workouts/{0,1}[0-9]*/[0-9]*$', 
						message: 'Incorrect URL to Endomondo training.',
						onlyIf: function(){ 
							return endomondoUrl() !== undefined; 
						}
					}
				})
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

			view.saveBtnEnabled(false);

			workoutsService.insert(view.providedData).fail(function(){
					app.showMessage('An error occured during workout saving. Please try again.');					
				}).done(function(){
					app.showMessage('Workout successfully saved.');
					view.abort(view);	
				}).always(function(){
					view.saveBtnEnabled(true);
				});

			}
			else{
				view.validationErrors.showAllMessages();
				app.showMessage("Some fields have invalid data.");
			}				
		};

		this.isValid = function(field){
			return field.isValid() && field.isModified();
		};

		this.isInvalid = function(field){
			return !field.isValid() && field.isModified();
		};
	};

	return ctor;
});