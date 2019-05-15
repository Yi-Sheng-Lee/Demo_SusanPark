$(document).ready(function(){
	var slider = $("#slider>div>section:nth-of-type(1)>figure");
	var arrows = $('#slider>div>section:nth-of-type(2)>a');
	var points = $('#slider>div>section:nth-of-type(3)>ul a');

	var nRight, nLeft, current, out, i, direction;

	var timer; //slide timer
	var pos = 0; //active position
	var len = slider.length - 1; //slides total number


	arrows.on({
		click: function(e){
			e.preventDefault();
			direction = $(this).attr("data-direction") == 'right' ? true : false;
			
			changePic(direction);

		}
	});

	function changePic(dir){
		switch(dir){
			case true:
				picRight();
				break;
			case false:
				picLeft();
		}
	}
	function picRight(){
		out = nLeft.removeAttr('class').addClass('l2O');
		nLeft = slider.eq(pos++).removeAttr('class').addClass('a2L');
		if(pos > len){
			pos = 0;
		} 
		current = slider.eq(pos).removeAttr('class').addClass('active r2A');
		if(pos+1>len){
			nRight = slider.eq(0).removeAttr('class').addClass('o2R');
		} else{
			nRight = slider.eq(pos+1).removeAttr('class').addClass('o2R');
		}
	}

	function picLeft(){
		out = nRight.removeAttr('class').addClass('r2O');
		nRight = slider.eq(pos--).removeAttr('class').addClass('a2R');
		if(pos < 0){
			pos = len;
		} 
		current = slider.eq(pos).removeAttr('class').addClass('active l2A');
		if(pos-1 < 0){
			nLeft = slider.eq(len).removeAttr('class').addClass('o2L');
		} else{
			nLeft = slider.eq(pos-1).removeAttr('class').addClass('o2L');
		}
	}
	
	function initialSlider(){
		$('#slider>div>section:nth-of-type(1)').height($(this).width() * 0.6 * 0.69 + 16);
	}

	function initial(){
		current = slider.eq(pos).addClass('active r2A');
		nRight = slider.eq(pos+1).addClass('o2R');
		nLeft = slider.eq(len).addClass('o2L');
		initialSlider();
	}
	
	$(window).on({
		resize: function(e){
			initialSlider();
		}
	});			
	setInterval(picRight, 3000);
	initial();
	
});