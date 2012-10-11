angular.module('rbDirectives',[]).directive('section', function($document){
	return function(scope, element, attrs){

		var cssAttrs = [
			'width',
			'height',
			'top',
			'left'
			];

		var offsetX=0, offsetY=0;

		element.bind('mousedown', function(event){
			//angular's jqueryLite does not pick up css applied by an assigned class. need to use normaly jquery.
			scope.$apply(function(){
				angular.forEach(cssAttrs, function(cssAttr){
					scope.cssAttr[cssAttr] = $(element).css(cssAttr)
				})
			})

			offsetX = event.screenX - parseInt($(element).css('left'),10)
			offsetY = event.screenY - parseInt($(element).css('top') ,10)



			$document.bind('mousemove', mousemove)
			$document.bind('mouseup', mouseup)
		})
			

		function mousemove(event){
			element.css({
				'left': event.screenX - offsetX + 'px',
				'top': event.screenY - offsetY  + 'px'
			})
		}

		function mouseup(){	
			$document.unbind('mousemove', mousemove)
			$document.unbind('mouseup', mouseup)
		}



	}
})