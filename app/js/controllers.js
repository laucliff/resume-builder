function AttributeManager($scope, $element, $http){


	// $http.get('templates/prototype.json').success(function(data){
	// 	$scope.doc = data
	// })



	$scope.testval = 'awedg'

	$scope.allowEdit = false

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

}
