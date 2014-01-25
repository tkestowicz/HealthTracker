define(['providers/modal-provider', 'knockout', 'jquery', 'knockout-validation']
	, function(modalProvider, ko, $, validation){
	
	var trainingData = {
		length: ko.observable().extend({ required: true }),
		inZone: ko.observable().extend({ required: true }),
		type: ko.observable().extend({ required: true }),
		heartRate:{
			avg: ko.observable().extend({ required: true, min: 60, max: 220 }),
			max: ko.observable().extend({ min: 60, max: 220 })
		},
		burnt: {
			calories: ko.observable().extend({ required: true }),
			fat: ko.observable().extend({ required: true })
		},
		endomondoUrl: ko.observable()
	};

	return {
		trainingTypes: ['Gym', 'Running', 'Cycling'],
		modalProvider: modalProvider,
		providedData: trainingData,
		validationErrors: ko.validation.group(trainingData),
		save: function(){
			if(trainingData.isValid())
				console.log("Data to send");
			else
				console.log("Validation errors");
		}
	};
});