angular.module('rbDirectives',[])
.directive('section', function($compile, $rootScope, focus){
	return {
		restrict: 'A',
		link: function(scope, element, attrs){

			scope.$on('delete', function(event, index){
				if (!scope.gettingDeleted){
					event.stopPropagation()
					scope.deleteChildByIndex(index)
				}
			})

			scope.$watch('doc.type', function(value){
				var html = scope.template(value)
				newElement = $compile(html)(scope)
				element.replaceWith(newElement)
				element = newElement
			})

		}
	}
})
.directive('stylebox', function(focus){
	return {
		restrict: 'A',
		link: function(scope, element, attrs){


		}
	}
})