$(document).ready(function(){
	var span = $('#header>div>div:nth-of-type(2)>nav>ul>li>div[data-decoration="corner"]>label>span');
	var h3 = $('#header>div>div:nth-of-type(2)>nav>ul>li>div[data-layout=submenu]>section>label>h3');

	var preObj1='';
	var preObj2='';
	
	span.click(function(){
		if(preObj1){
			preObj1.slideUp();
		} 
		if(preObj2){
			preObj2.slideUp();
			preObj2 = '';
		} 
		preObj1 = $(this).parentsUntil('li').nextUntil("ul.submenu");
		preObj1.slideDown();
	});

	h3.click(function(){
		if(preObj2){
			preObj2.slideUp();
		}
		preObj2 = $(this).parentsUntil('section').nextUntil('li');
		preObj2.slideDown();
	});

	$(window).on({
		resize: function(e){
			if($(this).width() > 800){
				$('[data-decoration="corner"]>div').removeAttr('style');
				$('#header>div>div:nth-of-type(2)>nav>ul>li div[data-layout=submenu]').removeAttr('style');
				$('#header>div>div:nth-of-type(2)>nav>ul>li ul').removeAttr('style');
			}	

		}
	});
});