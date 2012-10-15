angular.module('rbDirectives',[]).directive('section', function($compile, $rootScope, focus){
	return {
		restrict: 'A',
		controller: function($scope, $element){
			// console.log($scope, $element)
			$scope.template = function(type){
				switch(type){
					case "text":
						return 	'' +
										'<div ng-class="_class" ng-click="getFocus()">' +
										// '<div>{{allowEdit}}' +
										'<div ng-style="style" ng-hide="allowEdit">{{data}}</div>' +
										'<input type="text" ng-style="style" ng-model="data" ng-show="allowEdit">' +
										'</div>'
						break;
					case "textarea": //remove this later
						return '<textarea ng-style="style" ng-model="data" ng-class="_class" ng-click="getFocus()">'
					case "section":
						return '<div ui:sortable ng-model="data" ng-style="style" ng-class="_class" ng-click="getFocus()">' +
										'<div ng-repeat="item in data" ng-style="item.style" ng-click="getFocus()">' +
										// '{{item.data}}<hr>' +
										'<div section="item.type" style="item.style" data="item.data"></div>' +
										'</div></div>'
					default: 
						return '<div ng-style="style" ng-model="data">{{data}}</div>'
						
				}
			}
		},
		scope: {
			section : '=',
			style : '=',
			data : '=',
			// allowEdit : '='
		},
		link: function(scope, element, attrs){

			scope._class = []
			var gettingFocus = false

			scope.getFocus = function(){
				event.stopPropagation()
				focus.giveStyle(scope.style)
				gettingFocus = true
				$rootScope.$broadcast('dropFocus')
			}

			scope.$on('dropFocus', function(){
				// console.log('dropFocus', scope.data, scope._class)
				if (gettingFocus){
					scope._class.push("focus")
					scope.allowEdit = true
					gettingFocus = false
				}
				else{
					scope._class = _.without(scope._class, "focus")
					scope.allowEdit = false
				}
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
.directive('stylebox', function(focus){
	return {
		restrict: 'A',
		controller: function($scope, $element){
			$scope.styleAttrs = [
				"background-color",
				"border",
				"height"
			]
		},
		scope:{},
		link: function(scope, element, attrs){

			scope.$on('dropFocus', function(){
				scope.style = focus.getStyle()
			})

		}
	}
})