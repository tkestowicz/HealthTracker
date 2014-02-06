define(['plugins/dialog'], function(dialog){
	return {
		open: function(template){
			dialog.show(template.moduleId);
		},
		close: function(view){
			dialog.close(view);
		}
	};
});