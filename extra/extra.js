$('.right-arrow').click(function() {
	if($('.week-heading').hasClass('active')) {
		$('.active').addClass('hide-left');
		$('.active').next('h2').removeClass('hide-right');
		$('.hide-left').removeClass('active');
		$('.hide-left:last').next('h2').addClass('active');	
	} 
	if($('.seven-day').hasClass('show')) {
		$('.show').addClass('hidden-left');
		$('.show').next('ul').removeClass('hidden-right');
		$('.hidden-left').removeClass('show');
		$('.hidden-left:last').next('ul').addClass('show');	
	} 
});

$('.left-arrow').click(function() {
	if($('.week-heading').hasClass('active')) {
		$('.active').addClass('hide-right');
		$('.active').prev('h2').removeClass('hide-left');
		$('.hide-right').removeClass('active');
		$('.hide-right:first').prev('h2').addClass('active');	
	} 
	if($('.seven-day').hasClass('show')) {
		$('.show').addClass('hidden-right');
		$('.show').prev('ul').removeClass('hidden-left');
		$('.hidden-right').removeClass('show');
		$('.hidden-right:first').prev('ul').addClass('show');	
	} 
});


//pull just class with :first so jquery above properly fires
var weatherHtml = '<ul class="seven-day ' + 
		function() { if($(this) == $('.seven-day:first')) { 
				var show = 'show';
				return show;
			 } 
			}
		+ '">';
