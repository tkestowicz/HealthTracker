define(['plugins/router', 'durandal/app', 'providers/modal-provider'], function (router, app, modalProvider) {
    return {
    	modalProvider: modalProvider,
    	modalButtons: [
    		{ title: 'Add workout', moduleId: 'viewmodels/add-workout', modalClass: 'addWorkout' }
    	],
        router: router,
        activate: function () {
            router.map([
                { route: '', title:'Welcome', moduleId: 'viewmodels/welcome', nav: true }             
            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});