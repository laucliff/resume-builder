function MainCtrl($scope, $element, $http, focus, $rootScope){


	// $http.get('templates/prototype.json').success(function(data){
	// 	$scope.doc = data
	// })



	$scope.testval = 'awedg'

	// $scope.allowEdit = false

	$scope.doc = {
		type: 'container',
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
				type: 'container',
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
					}
				]
			}
		]

	}



	$scope.deleteChildByIndex = function(index){
		this.doc.data.splice(index, 1)
	}

	$scope.deleteSection = function(){
		if (!angular.isUndefined(this.$index)) {
			this.gettingDeleted = true
			this.$emit('delete', this.$index)
		}
	}


	// focus should be an encapsulated function like focus.requestFocus(handle)
	// grab css from handle
	// notify old focus holder
	// notify stylebox to get new css

	$scope.section_class = []
	$scope.allowEdit = false

	$scope.getFocus = function(){

		event.stopPropagation() //prevent ng-click propagation

		focus.requestFocus(this, this.doc.style, this.addFocus, function(){
			this.allowEdit = false
			this.section_class = _.without(this.section_class, "focus")
		})

	}

	$scope.addFocus = function(){
		this.allowEdit = true
		this.section_class = _.union(this.section_class, ["focus"])

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
			case "container":
				return '<div ui:sortable ng-model="doc.data" ng-style="doc.style" ng-class="section_class" ng-click="getFocus()">' +
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
	$scope.section_class = []
	$scope.allowEdit = false

	// if ($scope.doc.type == "container"){
	// 	$scope.allowEdit = false
	// }

}

function StyleController($scope, $element, focus){
	$scope.styleAttrs = [
		"background-color",
		"border",
		"left"
	]

	focus.setStyleCB($scope, function(newStyle){
		this.style = newStyle
	})

}