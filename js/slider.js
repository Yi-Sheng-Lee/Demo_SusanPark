$(document).ready(function(){
	var slider = $("#slider>div>section:nth-of-type(1)>figure");
	var arrows = $('#slider>div>section:nth-of-type(2)>a');
	var points = $('#slider>div:nth-of-type(2)>ul>li>a');


	var nRight, nLeft, current, out, currentM;
	var speed = 2500;
	var timer; //slide timer
	var pos = 0; //active position
	var len = slider.length - 1; //slides total number
	//var point;

	arrows.on({
		click: function(e){
			e.preventDefault();
			slider.removeAttr('class');
			//var direction = $(this).attr("data-direction") == 'right' ? true : false;
			clearInterval(timer);
			switch($(this).attr("data-direction")){
				case 'right':
					posRight();
					picRight();
					break;
				case 'left':
					posLeft();
					picLeft();
			}
			setTimer();
		}
	});

	points.on({
		click: function(e){
			clearInterval(timer);
			e.preventDefault();
			//console.log($(this).parent().index());
			nLeft = pos;
			pos = $(this).parent().index();
			current = pos;
			picRight();
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
		
	}

	function posLeft(){
		out = nRight;
		nRight = pos--;
		if(pos < 0){
			pos = len;
		} 
		current = pos;
		nLeft = (pos - 1 < 0) ? len : pos - 1;
	}

	function picRight(){
		slider.removeAttr('class');
		if(window.matchMedia("(max-width:600px)").matches){
			points.parent().removeAttr('class');
			slider.eq(nLeft).addClass('a2OL');
			slider.eq(current).addClass('active or2A');
			points.parent().eq(current).addClass('active');
		} else{
			slider.eq(out).addClass('l2O');
			slider.eq(nLeft).addClass('a2L');
			slider.eq(current).addClass('active r2A');
			slider.eq(nRight).addClass('o2R');			
		}
	}

	function picLeft(){
		slider.removeAttr('class');
		slider.eq(out).addClass('r2O');
		slider.eq(nRight).addClass('a2R');
		slider.eq(current).addClass('active l2A');
		slider.eq(nLeft).addClass('o2L');
	}
	
	function initialSlider(){
		if(window.matchMedia("(max-width:600px)").matches){
			$('#slider>div>section:nth-of-type(1)').height($(this).width() * 1 * 0.69 + 16);
			$('#header>div>div:nth-of-type(2)').height($(window).innerHeight() - 20);
		}
		  else if(window.matchMedia("(min-width:601px) and (max-width:1280px)").matches){
			$('#slider>div>section:nth-of-type(1)').height($(this).width() * 0.7 * 0.69 + 16);
		} else{
			$('#slider>div>section:nth-of-type(1)').height($(this).width() * 0.6 * 0.69 + 16);
		}
	}

	function initial(){
		// current = slider.eq(pos).addClass('active r2A');
		// nRight = slider.eq(pos+1).addClass('o2R');
		// nLeft = slider.eq(len).addClass('o2L');
		// if(window.matchMedia("(max-width:600px)").matches){
		// 	initialSlide();
		// 	picRight();
		// } else {
			initialSlider();
			picRight();
			
		// }
			setTimer();
	}
	
	function setTimer(){
		clearInterval(timer);
		timer = setInterval(function(){posRight(); picRight();}, speed);
	}

	$(window).on({
		resize: function(e){
			clearInterval(timer);
			initialSlider();
			if(window.matchMedia("(max-width:600px)").matches){
				slider.removeClass('o2R o2L r2A l2A a2R a2L l2O r2O');
				$('#header>div>div:nth-of-type(2)').height($(window).innerHeight());
			} else{
				slider.removeClass('or2A a2OL');
				$('#header>div>div:nth-of-type(2)').removeAttr('style');
			}
			picRight();
			setTimer();
		}
	});			
	
	initial();

});