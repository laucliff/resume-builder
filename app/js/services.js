angular.module('rbServices',[]).factory('focus', function(){
	var sectionStyle = {
		style : {}
	} 
	var sectionFocus, sectionCallback
	var styleBox, styleCallback

	return {
		getStyle: function(){
			return sectionStyle
		},
		// setStyleCB: function(context, callback){
		// 	styleBox = context
		// 	styleCallback = callback
		// },
		requestFocus: function(section, style, approveFocus, dropFocus){
			
			//signal old focus to drop
			if (sectionFocus){
				sectionCallback.call(sectionFocus)
			} 

			//reassign to new focus
			sectionFocus = section
			sectionCallback = dropFocus
			sectionStyle.style = style


			//signal new focus approved
			approveFocus.call(sectionFocus)

		},
		dropAllFocus: function(){

			//signal old focus to drop
			if (sectionFocus){
				sectionCallback.call(sectionFocus)
			} 

			//reset focus assignment
			//reassign to new focus
			sectionFocus = null
			sectionCallback = null
			sectionStyle.style = null

		}

	}
})
.factory('styleService', function(focus){

	var currentFocus = {}

	return {
		getStyle: function(){
			currentFocus =  focus.getStyle()
			return currentFocus
		},
		addStyle: function(newStyle){
			_.extend(currentFocus.style,newStyle)
		}
	}

})