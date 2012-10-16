angular.module('rbServices',[]).factory('focus', function(){
	var sectionStyle, sectionFocus, sectionCallback
	var styleBox, styleCallback

	return {
		setStyleCB: function(context, callback){
			styleBox = context
			styleCallback = callback
		},
		requestFocus: function(section, style, approveFocus, dropFocus){
			
			//signal old focus to drop
			if (sectionFocus){
				sectionCallback.call(sectionFocus)
			} 

			//reassign to new focus
			sectionFocus = section
			sectionStyle = style
			sectionCallback = dropFocus

			//signal new focus approved
			approveFocus.call(sectionFocus)

			//signal stylebox to rebind style
			styleCallback.call(styleBox, sectionStyle)
			
		}
	}

});