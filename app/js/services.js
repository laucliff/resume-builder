angular.module('rbServices',[]).factory('focus', function(){
	var sectionStyle, sectionFocus, sectionCallback
	var styleBox, styleCallback

	return {
		setStyleCB: function(context, callback){
			styleBox = context
			styleCallback = callback
		},
		holdFocus: function(section, style, dropFocus){
			
			//signal old focus to drop
			if (sectionFocus) sectionCallback.call(sectionFocus)

			//reassign to new focus
			sectionFocus = section
			sectionStyle = style
			sectionCallback = dropFocus

			//signal stylebox to rebind style
			styleCallback.call(styleBox, sectionStyle)
			
		}
	}

});