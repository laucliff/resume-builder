function AttributeManager($scope, $element){


	$scope.style = {
		'background-color': 'gray',
		'border' : '1px solid black'
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
			data: '1\n1',
			type: 'textarea'
		}
		,{
			style: {
				'background-color': 'brown',
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
			data: [{
				style: {
					'background-color': 'orangered'
				},
				data: '7',
				type: 'textarea'
			}],
			type: 'section'
		}
	]

	$scope.test = function(){
		return 'asdf'
	}

}
