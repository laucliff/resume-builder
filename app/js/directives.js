angular.module('rbDirectives',[]).directive('section', function($compile, $interpolate){
	return {
		restrict: 'A',
		controller: function($scope, $element){
			// console.log($scope, $element)
			$scope.sectionType = function(type){
				switch(type){
					case "text":
						return 'input type="text"'
						break;
					default: return "div"
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

			//make this a watch on section change

			var type = scope.$eval($interpolate('{{section}}'))
			var html = '<' + scope.sectionType(type) + 'ng-style="style" ng-model="data">'
			element.replaceWith($compile(html)(scope))
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