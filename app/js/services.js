angular.module('rbServices',[]).factory('focus', function(){
	var _style

	return {
		giveStyle: function(style){
			_style = style
		},
		getStyle: function(){
			return _style
		}
	}

});