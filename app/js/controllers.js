function MainCtrl($scope, $element, $http, focus){


	// $http.get('templates/prototype.json').success(function(data){
	// 	$scope.doc = data
	// })



	$scope.testval = 'awedg'


	contactInfo = {
		type: "contact",
		style: {
		},
		data: {
			phone: "123-456-7890",
			email: "abc@abc.com",
			address: "123 something way"
		}
	}


	resumeIntro = {
		type: "container",
		style:{
			border: "1px solid black"
		},
		data: [
			{
				type: "text",
				style: {
					"text-align": "center",
					"font-family": "arial",
					"font-size": "24pt"
				},
				data: "Lorem \nIpsum"
			}
		]
	}

	$scope.doc = {
		type: 'container',
		style: {
			'background-color': 'gray',
			'border' : '1px solid black',
			'width' : '8.5in',
			'min-height' : '11in'
			},
		data: [
			// resumeIntro,
			// {
			// 	style: {
			// 		'background-color': 'orange',
			// 		'position': 'relative',
			// 		'padding-left': '100px'
			// 	},
			// 	data: '1',
			// 	type: 'textarea'
			// }
			// ,{
			// 	type: 'hr',
			// 	style: {
			// 		'border': '1px solid black'
			// 	}
			// }
			// ,{
			// 	style: {
			// 		'background-color': 'brown',
			// 		// 'padding-left': '30px',
			// 		'text-align' : 'center',
			// 		'font-family': '"Times New Roman"',
			// 		'font-size': '24px',
			// 		'padding-left': '100px'
			// 	},
			// 	data: '2',
			// 	type: 'text'
			// }
			// ,
			{
				type: 'container-columns',
				style: {
					'background-color': 'white',
					'position': 'relative'
					// 'padding-left': '100px'
				},
				data:[ 
									{
				type: 'container',
				style: {
					'background-color': 'white',
					'position': 'relative'
				},
				data:[ 
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
			},
									{
				type: 'container',
				style: {
					'background-color': 'white',
					'position': 'relative'
				},
				data:[ 
						{
							style: {
								'background-color': 'orangered'
							},
							data: '8',
							type: 'textarea'
						},
						{
							style: {
								'background-color': 'salmon'
							},
							data: '9',
							type: 'text'
						}
					]
			}
					]
			}
		]

	}


	//should probably move this stuff into a RootSectionController later. bind to div in index

	// $scope.deleteChildByIndex = function(index){
	// 	this.doc.data.splice(index, 1)
	// }

	$scope.isContainer = function(){
		// return (this.doc.type == "container")

		containerTypes = [
			"container",
			"container-list",
			"container-columns"
		]

		return (_.indexOf(containerTypes, this.doc.type) != -1)

	}

	$scope.addSection = function(){

		newDoc = {
			type: "text",
			style: {},
			data: ""
		}

		if (this.isContainer()) {
			this.doc.data.push(newDoc)
		}
	}

	$scope.deleteSection = function(){

		this.parentDoc.data.splice(this.$index, 1)

	}

	// $scope.local_css = []
	$scope.container = {
		"css" : [],
		"allowEdit" : false
	}
	$scope.isRootSection = true

	$scope.toggleEdit = function(){
			this.container.allowEdit = !this.container.allowEdit
	}

	$scope.getFocus = function(){
		event.stopPropagation() //prevent ng-click propagation
		focus.requestFocus(this, this.doc.style, this.addFocus, this.dropFocus)
	}

	$scope.addFocus = function(){
		this.toggleEdit()
		// this.container.css = _.union(this.container.css, "focus")
		// this.local_css = _.union(this.local_css, "local-focus")

		this.container.hasFocus = true
		this.local_focus = true
	}

	$scope.dropFocus = function(){
		this.toggleEdit()
		// this.container.css = _.without(this.container.css, "focus")
		// this.local_css = _.without(this.local_css, "local-focus")

		this.container.hasFocus = false
		this.local_focus = false
	}




	$scope.template = function(type){
		switch(type){
			case "text":
				return 	'' +
								// '<div ng-class="{localFocus:local_focus}" ng-click="getFocus()">' +
								'<div style="position: relative">' +
								'<div style="position: relative" ng-style="doc.style" ng-hide="container.allowEdit">{{doc.data}}</div>' +
								'<textarea style="position: relative" ng-style="doc.style" ng-model="doc.data" ng-show="container.allowEdit">' +
								'<button class="section-delete" ng-show="container.allowEdit" ng-click="deleteSection()">&times;</button>' +
								'</div>'
			case "text-constant":
				return '<div style="position: relative" ng-style="doc.style">{{doc.data}}</div>'
			case "textarea": //remove this later
				return '<div style="position: relative">' +
							'<button class="section-delete" ng-show="container.allowEdit" ng-click="deleteSection()">&times;</button>' +
							'<textarea ng-style="doc.style" ng-model="doc.data">' +
							'</div>'
			case "container":
				return '<div style="position: relative" ui:sortable ng-model="doc.data" ng-style="doc.style" class="sectionContainer" ng-class="{focus: container.hasFocus, page: isRootSection}" ng-click="getFocus()">' +
									'<div ng-repeat="item in doc.data" ng-class="{localFocus:local_focus}" ng-click= "getFocus()" ng-controller="SectionController">' +
									// '{{local_css}}<hr>' +
										'<div section></div>' +
									'</div>' + 
									'<button class="section-delete" ng-show="container.allowEdit&&!isRootSection" ng-click="deleteSection()">&times;</button>' + 
									'<button ng-show="container.allowEdit" ng-click="addSection()">+</button>' +
								'</div>'
			case "hr":
				return  '<div style="position: relative">' +
								'<hr ng-style="doc.style">' +
								'<button class="section-delete" ng-show="container.allowEdit" ng-click="deleteSection()">&times;</button>' +
								'</div>'
			case "container-list":
				return '<ul style="position: relative" ui:sortable ng-model="doc.data" ng-style="doc.style" class="sectionContainer" ng-class="{focus: container.hasFocus, page: isRootSection}" ng-click="getFocus()">' +
									'<li ng-repeat="item in doc.data" ng-class="{localFocus:local_focus}" ng-click= "getFocus()" ng-controller="SectionController">' +
										'<div section></div>' +
									'</li>' + 
									'<button class="section-delete" ng-show="container.allowEdit&&!isRootSection" ng-click="deleteSection()">&times;</button>' + 
									'<button ng-show="container.allowEdit" ng-click="addSection()">+</button>' +
								'</ul>'
			case "container-columns":
				return '<div>' +
								'<div style="position: relative" ng-model="doc.data" ng-style="doc.style" class="sectionContainer" ng-class="{focus: container.hasFocus, page: isRootSection}" ng-click="getFocus()">' +
									'<div style="float: left; width: 49%;" ui:sortable ng-repeat="item in doc.data" ng-class="{localFocus:local_focus}" ng-click="getFocus()" ng-controller="SectionController">' +
									// '{{local_css}}<hr>' +
										'<div section></div>' +
									'</div>' + 
									'<div style="clear:both">foot</div>'
									'<button class="section-delete" ng-show="container.allowEdit&&!isRootSection" ng-click="deleteSection()">&times;</button>' + 
									'<button ng-show="container.allowEdit" ng-click="addSection()">+</button>' +
								'</div>'
								'</div>'
			default: 
				return '<div ng-style="doc.style" ng-model="doc.data">{{doc.data}}</div>'
				
		}
	}


}

function SectionController($scope, $element, focus, $rootScope){
	
	$scope.parentDoc = $scope.doc
	$scope.doc = $scope.doc.data[$scope.$index]
	console.log($scope.doc, ':', $scope.parentDoc)
	// $scope.local_css = []
	$scope.local_focus = false

	if ($scope.isContainer()){
		$scope.container = {
			// "css" : [],
			"hasFocus" : false,
			"allowEdit" : false
		}
	}
	$scope.isRootSection = false

}

function StyleController($scope, $element, focus, styleService){
	$scope.styleAttrs = [
		"background-color",
		"padding-left",
		"padding-top",
		"border",
		"width",
		"min-height",
		"font-size",
		"font-family"
	]

	$scope.currentFocus = styleService.getStyle()

	$scope.addStyle = function(){

		newStyle = {
			test: 'test'
		}

		// _.extend($scope.currentFocus.style, newStyle)
		styleService.addStyle(newStyle)
	}

}