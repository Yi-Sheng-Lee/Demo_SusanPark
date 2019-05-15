$(document).ready(function(){
	var slider = $("#slider>div>section:nth-of-type(1)>figure");
	var arrows = $('#slider>div>section:nth-of-type(2)>a');
	var points = $('#slider>div>section:nth-of-type(3)>ul a');

	var nRight, nLeft, current, out;
	var speed = 2500;
	var timer; //slide timer
	var pos = 0; //active position
	var len = slider.length - 1; //slides total number


	arrows.on({
		click: function(e){
			e.preventDefault();
			slider.removeAttr('class');
			//var direction = $(this).attr("data-direction") == 'right' ? true : false;
			clearInterval(timer);
			switch($(this).attr("data-direction")){
				case 'right':
					posRight();
					break;
				case 'left':
					posLeft();
			}
			setTimer();
		}
	});

	function posRight(){
		slider.removeAttr('class');
		out = nLeft;
		nLeft = pos++;
		if(pos > len){
			pos = 0;
		} 
		current = pos;
		nRight = (pos + 1 > len) ? 0 : pos + 1 ; 
		picRight();
	}

	function posLeft(){
		out = nRight;
		nRight = pos--;
		if(pos < 0){
			pos = len;
		} 
		current = pos;
		nLeft = (pos - 1 < 0) ? len : pos - 1;
		picLeft();
	}

	function picRight(){
		slider.eq(out).addClass('l2O');
		slider.eq(nLeft).addClass('a2L');
		slider.eq(current).addClass('active r2A');
		slider.eq(nRight).addClass('o2R');
	}

	function picLeft(){
		slider.eq(out).addClass('r2O');
		slider.eq(nRight).addClass('a2R');
		slider.eq(current).addClass('active l2A');
		slider.eq(nLeft).addClass('o2L');
	}
	
	function initialSlider(){
		if(window.matchMedia("(min-width:601px) and (max-width:1280px)").matches){
			$('#slider>div>section:nth-of-type(1)').height($(this).width() * 0.7 * 0.69 + 16);
		} else{
			$('#slider>div>section:nth-of-type(1)').height($(this).width() * 0.6 * 0.69 + 16);
		}
	}

	function initial(){
		// current = slider.eq(pos).addClass('active r2A');
		// nRight = slider.eq(pos+1).addClass('o2R');
		// nLeft = slider.eq(len).addClass('o2L');
		posRight();
		initialSlider();
		setTimer();
	}
	
	function setTimer(){
		clearInterval(timer);
		timer = setInterval(posRight, speed);
	}

	$(window).on({
		resize: function(e){
			initialSlider();
		}
	});			
	
	initial();
	
});