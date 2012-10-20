angular.module('rbDirectives',[])
.directive('section', function($compile, $rootScope, focus){
	return {
		restrict: 'A',
		link: function(scope, element, attrs){

			// scope.$on('delete', function(event, index){
			// 	if (!scope.gettingDeleted){
			// 		event.stopPropagation()
			// 		scope.deleteChildByIndex(index)
			// 	}
			// })

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
.directive('contenteditable', function(){
 	return {
 		restrict: 'A',
 		require: '?ngModel',
 		link: function(scope, element, attrs, ngModel){
 			if(!ngModel) return;

 			ngModel.$render = function(){
 				element.html(ngModel.$viewValue || '')
				
 			}

 			element.bind('blur keyup change', function(){
 				scope.$apply(read())
 			})


 			function read(){
 				ngModel.$setViewValue(element.html())
 			}

 		}
 	}
 })
.directive('sortable', function(){
    return {
    	restrict: 'A',
      require: '?ngModel',
      link: function(scope, element, attrs, ngModel) {
        var onStart, onUpdate, opts, _start, _update;

        // opts = angular.extend({}, scope.$eval(attrs["sortable"]))
        opts = {}

        if (!ngModel) return

        onStart = function(e, ui) {
          return ui.item.data('ui-sortable-start', ui.item.index());
        }
        onUpdate = function(e, ui) {
          var end, start
          start = ui.item.data('ui-sortable-start')
          end = ui.item.index()
          ngModel.$modelValue.splice(end, 0, ngModel.$modelValue.splice(start, 1)[0])
          return scope.$apply()
        }
        _start = opts.start
        opts.start = function(e, ui) {
          onStart(e, ui)
          if (typeof _start === "function") {
            _start(e, ui)
          }
          return scope.$apply()
        }
        _update = opts.update
        opts.update = function(e, ui) {
          onUpdate(e, ui)
          if (typeof _update === "function") {
            _update(e, ui)
          }
          return scope.$apply()
        }

        scope.$watch(attrs['sortable'], function(n, v){
        	// console.log(attrs['sortable'], scope.$eval(attrs['sortable']), n, v)
        	element.sortable(scope.$eval(attrs['sortable']))
        }, true)


        return element.sortable(opts)
      }
    }
  })