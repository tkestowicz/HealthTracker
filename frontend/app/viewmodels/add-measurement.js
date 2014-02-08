define(['providers/modal-provider', 'knockout', 'jquery', 'knockout-validation', 'services/measurements-service', 'durandal/app']
	, function(modalProvider, ko, $, validation, measurementsService, app){
	
	var ctor = function(){

		var createFormViewModel = function(){
			return {
				date: ko.observable('2014-05-02').extend({ required: true, date: true }),
				weight: ko.observable(93).extend({ required: true, min: 0, number: true }),
				fat: {
					percent: ko.observable(16.1).extend({ required: true, min: 0, max: 100, number: true }),
					mass: ko.observable(15).extend({ required: true, min: 0, number: true }),
					visceralRating: ko.observable(3).extend({ min: 0, number: true }),
				},
				muscleMass: ko.observable(74.5).extend({ required: true, min: 0, number: true }),
				metabolicAge: ko.observable(17).extend({ required: true, min: 0, number: true }),
				bmr: ko.observable(2332).extend({ min: 0, number: true })
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
					closeWindow(view);	
				}).always(function(){
					view.formEnabled(true);
				});
		}
		else
			app.showMessage("Some fields have invalid values.");
	}

	ctor.prototype.isValid = function(field){
			return field.isValid() && field.isModified();
	};

	ctor.prototype.isInvalid = function(field){
			return !field.isValid() && field.isModified();
	};

	return ctor;
});