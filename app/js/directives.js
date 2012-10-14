angular.module('rbDirectives',[]).directive('section', function($compile, $rootScope){
	return {
		restrict: 'A',
		controller: function($scope, $element){
			// console.log($scope, $element)
			$scope.template = function(type){
				switch(type){
					case "text":
						// return '<input type="text" ng-style="style" ng-model="data" ng-class="class" ng-click="getFocus()">'
						// return '<div section-text ng-style="style" ng-model="data">{{data}}</div>'
						return '<div ng-class="class" ng-click="getFocus()"><div ng-style="style" ng-hide="allowEdit">{{data}}</div><input type="text" ng-style="style" ng-model="data" ng-show="allowEdit"></div>'
						break;
					case "textarea":
						return '<textarea ng-style="style" ng-model="data" ng-class="class" ng-click="getFocus()">'
					case "section":
						return '<div ui:sortable ng-model"data" ng-style="style"><li ng-repeat="item in data" ng-style="item.style"><div section="item.type" style="item.style" class="section-text" data="item.data"></div></li><//div'
					default: 
						return '<div ng-style="style" ng-model="data">{{data}}</div>'
						
				}
			}
		},
		scope: {
			section : '=',
			style : '=',
			data : '=',
		},
		link: function(scope, element, attrs){

			scope.getFocus = function(){
				$rootScope.$broadcast('dropFocus')
				// console.log('getFocus')
				scope.class="focus"
				// $('.focus').removeClass('focus')
				// $element.addClass('focus')
				scope.allowEdit = true
			}

			scope.$on('dropFocus', function(){
				// console.log('dropFocus', scope.data)
				scope.class=""
				scope.allowEdit = false
			})

			scope.$watch('section', function(value){
				var type = scope.section
				var html = scope.template(type)
				newElement = $compile(html)(scope)
				element.replaceWith(newElement)
				element = newElement



				// element.bind('click', function(event){
				// 	$('.focus').removeClass('focus')
				// 	element.addClass('focus')
				// 	event.stopPropagation()
				// })


			})

		}
	}
})
// .directive('contenteditable', function(){
// 	return {
// 		restrict: 'A',
// 		require: '?ngModel',
// 		link: function(scope, element, attrs, ngModel){
// 			if(!ngModel) return;

// 			ngModel.$render = function(){
// 				element.html(ngModel.$viewValue || '')
				
// 			}

// 			element.bind('blur keyup change', function(){
// 				scope.$apply(read())
// 			})


// 			function read(){
// 				ngModel.$setViewValue(element.html())
// 			}

// 		}
// 	}
// })


// .directive('section', function(){
// 	return function(scope, element, attrs){

// 		// depending on type attr, set html to custom type (div, css)

// 		// problems with resizable+sortable nested. look into later.
// 		// element.resizable().sortable()
// 	}
// })


// .directive('section', function($document){
// 	return function(scope, element, attrs){

// 		var cssAttrs = [
// 			'width',
// 			'height',
// 			'top',
// 			'left'
// 			];

// 		var offsetX=0, offsetY=0;

// 		element.bind('mousedown', function(event){
// 			//angular's jqueryLite does not pick up css applied by an assigned class. need to use normaly jquery.
// 			scope.$apply(function(){
// 				angular.forEach(cssAttrs, function(cssAttr){
// 					scope.cssAttr[cssAttr] = $(element).css(cssAttr)
// 				})
// 			})

// 			offsetX = event.screenX - parseInt($(element).css('left'),10)
// 			offsetY = event.screenY - parseInt($(element).css('top') ,10)



// 			$document.bind('mousemove', mousemove)
// 			$document.bind('mouseup', mouseup)
// 		})
			

// 		function mousemove(event){
// 			element.css({
// 				'left': event.screenX - offsetX + 'px',
// 				'top': event.screenY - offsetY  + 'px'
// 			})
// 		}

// 		function mouseup(){	
// 			$document.unbind('mousemove', mousemove)
// 			$document.unbind('mouseup', mouseup)
// 		}



// 	}
// })