define(function(){
	return {

		/*
         * Gets number of the week of given date.
         * Bases on stackoverflow answer: http://stackoverflow.com/a/6117889/2131067
         *
         * @param date Date
         * @return number
         */
		weekNumberOfTheYear: function (date){
			var d = (date instanceof Date)? date : new Date(date);
    		d.setHours(0,0,0);
    		d.setDate(d.getDate()+4-(d.getDay()||7));

    		return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
		},

        /*
         * Converts string in format hh:mm into number in minutes.
         *
         * @param when string
         * @return number
         */
		convertStringToTimespan: function (when) {
            var parsedString = when.split(':'),
                computedValue = 0,
                numberOfElements = parsedString.length;

            if(numberOfElements > 0)
                computedValue += parseInt(parsedString[0]) * 60;

            if(numberOfElements === 2)
                computedValue += parseInt(parsedString[1]);

            return computedValue;
        },

        /*
         * Converts number into string in hh:mm format.
         *
         * @param timespan number
         * @return string
         */
        convertTimespanToString: function (timespan){
            var hours = (timespan-(timespan%60))/60,
                minutes = timespan - hours*60;

            return hours + ':' + minutes;
        }

	};
});