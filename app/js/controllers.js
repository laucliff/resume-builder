function MainCtrl($scope, $element, $http, focus){


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


	//should probably move this stuff into a RootSectionController later. bind to div in index

	$scope.deleteChildByIndex = function(index){
		this.doc.data.splice(index, 1)
	}

	$scope.deleteSection = function(){
		if (!angular.isUndefined(this.$index)) {
			this.gettingDeleted = true
			this.$emit('delete', this.$index)
		}
	}

	$scope.container = {
		"css" : [],
		"allowEdit" : false
	}


	$scope.toggleEdit = function(){
			this.container.allowEdit = !this.container.allowEdit
	}

	$scope.getFocus = function(){
		event.stopPropagation() //prevent ng-click propagation
		focus.requestFocus(this, this.doc.style, this.addFocus, this.dropFocus)
	}

	$scope.addFocus = function(){
		this.toggleEdit()
		this.container.css = _.union(this.container.css, ["focus"])
		// add local css here
	}

	$scope.dropFocus = function(){
		this.toggleEdit()
		this.container.css = _.without(this.container.css, "focus")
		// drop local css here
	}



	$scope.template = function(type){
		switch(type){
			case "text":
				return 	'' +
								'<div ng-click="getFocus()">' +
								// '<div>' +
								'<div ng-style="doc.style" ng-hide="container.allowEdit">{{doc.data}}</div>' +
								'<input type="text" ng-style="doc.style" ng-model="doc.data" ng-show="container.allowEdit">' +
								'</div>'
				break;
			case "textarea": //remove this later
				return '<textarea ng-style="doc.style" ng-model="doc.data" ng-click="getFocus()">'
			case "container":
				return '<div ui:sortable ng-model="doc.data" ng-style="doc.style" ng-class="container.css" ng-click="getFocus()">' +
								'<div ng-repeat="item in doc.data" ng-style="item.style" ng-controller="SectionController">' +
								// '{{container}}<hr>' +
								'<div section></div>' +
								'</div></div>'
			case "hr":
				return '<div ng-click="getFocus()"><hr ng-style="doc.style"></div>'
			default: 
				return '<div ng-style="doc.style" ng-model="doc.data">{{doc.data}}</div>'
				
		}
	}


}

function SectionController($scope, $element, focus, $rootScope){
	
	$scope.doc = $scope.doc.data[$scope.$index]

	if ($scope.doc.type == "container"){
		$scope.container = {
			"css" : [],
			"allowEdit" : false
		}
	}

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