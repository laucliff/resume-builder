function MainCtrl($scope, $element, $http, focus, $rootScope){


	// $http.get('templates/prototype.json').success(function(data){
	// 	$scope.doc = data
	// })



	$scope.testval = 'awedg'

	// $scope.allowEdit = false

	$scope.doc = {
		type: 'section',
		style: {
			'background-color': 'gray',
			'border' : '1px solid black'
			},
		data: [
			{
				style: {
					'background-color': 'orange',
					'width': '200px',
					'position': 'relative',
					'left': '100px'
				},
				data: '1',
				type: 'textarea'
			}
			,{
				type: 'hr',
				style: {
					'border': '1px solid black'
				}
			}
			,{
				style: {
					'background-color': 'brown',
					'font-family': '"Times New Roman"',
					'font-size': '24px',
					'width': '200px',
					'position': 'relative',
					'left': '100px'
				},
				data: '2',
				type: 'text'
			}
			,{
				style: {
					'background-color': 'white',
					'width': '200px',
					'position': 'relative',
					'left': '100px'
				},
				data: [
					{
						style: {
							'background-color': 'orangered'
						},
						data: '7',
						type: 'textarea'
					},
					{
						style: {
							'background-color': 'salmon'
						},
						data: '8',
						type: 'text'
					},
				],
				type: 'section'
			}
		]

	}

$scope.section_class = []
$scope.allowEdit = false
$scope.gettingFocus = false

$scope.getFocus = function(){
		event.stopPropagation()
		focus.giveStyle(this.doc.style)
		this.gettingFocus = true
		$rootScope.$broadcast('newFocus')
	}
	
	$scope.newFocus = function(){
		if (this.gettingFocus){
			this.section_class = _.union(this.section_class, ["focus"])
			this.allowEdit = true
			this.gettingFocus = false
		}
		else{
			this.section_class = _.without(this.section_class, "focus")
			this.allowEdit = false
		}
	}

	$scope.template = function(type){
		switch(type){
			case "text":
				return 	'' +
								'<div ng-class="section_class" ng-click="getFocus()">' +
								// '<div>{{allowEdit}}' +
								'<div ng-style="doc.style" ng-hide="allowEdit">{{doc.data}}</div>' +
								'<input aa type="text" ng-style="doc.style" ng-model="doc.data" ng-show="allowEdit">' +
								'</div>'
				break;
			case "textarea": //remove this later
				return '<textarea ng-style="doc.style" ng-model="doc.data" ng-class="section_class" ng-click="getFocus()">'
			case "section":
				return '<div ui:sortable ng-model="doc.data" ng-style="doc.style" ng-class="section_class">' +
								'<div ng-repeat="item in doc.data" ng-style="item.style" ng-controller="SectionController" ng-click="getFocus()">' +
								// '{{section_class}}{{gettingFocus}}<hr>' +
								'<div section></div>' +
								'</div></div>'
			case "hr":
				return '<hr ng-style="doc.style">'
			default: 
				return '<div ng-style="doc.style" ng-model="doc.data">{{doc.data}}</div>'
				
		}
	}


}

function SectionController($scope, $element, focus, $rootScope){
	
	$scope.doc = $scope.doc.data[$scope.$index]

	

}

function styleCtrl($scope, $element, focus){
	$scope.styleAttrs = [
		"background-color",
		"border",
		"height"
	]

	// $scope.$on('dropFocus', function(){
	// 	$scope.style = focus.getStyle()
	// })

}