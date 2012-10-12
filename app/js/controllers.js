function AttributeManager($scope, $element){


	$scope.style = {
		'background-color': 'gray'
	}

	$scope.testval = {type: 'div'}

	$scope.items = [
		{
			style: {
				'background-color': 'orange',
				'width': '200px',
				'position': 'relative',
				'left': '100px'
			},
			data: '1',
			type: 'text'
		}
	]

	$scope.test = function(){
		return 'asdf'
	}

}
