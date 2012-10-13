angular.module('rbDirectives',[]).directive('section', function($compile, $interpolate){
	return {
		restrict: 'A',
		controller: function($scope, $element){
			// console.log($scope, $element)
			$scope.template = function(type){
				switch(type){
					case "text":
						return '<input type="text" ng-style="style" ng-model="data">'
						break;
					case "textarea":
						return '<textarea ng-style="style" ng-model="data">'
					case "section":
						return '<ul ng-style="style"><li ng-repeat="item in data" ng-style="item.style"><div section="item.type" style="item.style" class="section-text" data="item.data"></div></li></ul>'
					default: 
						return '<div ng-style="style">{{data}}</div>'
						
				}
			}
		},
		scope: {
			section : '=',
			style : '=',
			data : '=',
		},
		// templateUrl: '/partials/section.html',
		link: function(scope, element, attrs){


			scope.$watch('section', function(value){
				var type = scope.section
				var html = scope.template(type)
				html = $compile(html)(scope)
				element.replaceWith(html)
				element = html
				// element.html($compile(html)(scope))
			})
		}
	}
})


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