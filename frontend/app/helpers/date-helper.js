define(function(){
	return {

		// bases on stackoverflow answer: http://stackoverflow.com/a/6117889/2131067
		weekNumberOfTheYear: function (date){
			var d = (date instanceof Date)? date : new Date(date);
    		d.setHours(0,0,0);
    		d.setDate(d.getDate()+4-(d.getDay()||7));

    		return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
		},


		timespan: function (when) { // this ignores months
    var obj = {};
    obj._milliseconds = (new Date()).valueOf() - when.valueOf();
    obj.milliseconds = obj._milliseconds % 1000;
    obj._seconds = (obj._milliseconds - obj.milliseconds) / 1000;
    obj.seconds = obj._seconds % 60;
    obj._minutes = (obj._seconds - obj.seconds) / 60;
    obj.minutes = obj._minutes % 60;
    obj._hours = (obj._minutes - obj.minutes) / 60;
    obj.hours = obj._hours % 24;
    obj._days = (obj._hours - obj.hours) / 24;
    obj.days = obj._days % 365;
    // finally
    obj.years = (obj._days - obj.days) / 365;
    return obj;
}
	};
});