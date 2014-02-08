define(['providers/modal-provider', 'knockout', 'jquery', 'knockout-validation', 'services/measurements-service', 'durandal/app']
	, function(modalProvider, ko, $, validation, measurementsService, app){
	
	var ctor = function(){

		var createFormViewModel = function(){
			return {
				date: ko.observable().extend({ required: true, date: true }),
				weight: ko.observable().extend({ required: true, min: 0, number: true }),
				fat: {
					percent: ko.observable().extend({ required: true, min: 0, max: 100, number: true }),
					mass: ko.observable().extend({ required: true, min: 0, number: true }),
					visceralRating: ko.observable().extend({ min: 0, number: true }),
				},
				muscleMass: ko.observable().extend({ required: true, min: 0, number: true }),
				metabolicAge: ko.observable().extend({ required: true, min: 0, number: true }),
				bmr: ko.observable().extend({ min: 0, number: true })
			};
		};

		this.providedData = createFormViewModel();
		this.validationErrors = ko.validation.group(this.providedData);
		this.formEnabled = ko.observable(true);

	};

	ctor.prototype.abort = modalProvider.close;

	ctor.prototype.save = function(view){
		if(view.providedData.isValid()){

			view.formEnabled(false);

			measurementsService.insert(view.providedData).fail(function(){
					app.showMessage('An error occured during measurement saving. Please try again.');					
				}).done(function(){
					app.showMessage('Measurement successfully saved.');
					modalProvider.close(view);	
				}).always(function(){
					view.formEnabled(true);
				});
		}
		else{
			view.validationErrors.showAllMessages();
			app.showMessage("Some fields have invalid values.");
		}			
	};

	ctor.prototype.isValid = function(field){
			return field.isValid() && field.isModified();
	};

	ctor.prototype.isInvalid = function(field){
			return !field.isValid() && field.isModified();
	};

	return ctor;
});