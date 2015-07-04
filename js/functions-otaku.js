$(function(){	
	
	var clouds=$('#clouds');
	var background=0;
	//var scrollingBG = setInterval(function(){background-=1;if(background==2400)background=0;clouds.css('background-position',background); },95);
	
	if(!$.browser.webkit){
		
		var scrollingBG = setInterval(function(){background-=1;if(background==2400)background=0;clouds.css('background-position',background); },95)
		
	}
	
	

	var browserWidth 	= 0;
	var browserHeight 	= 0;
	var cloudsPos 		= 0; 
	var oneImageWidth 	= 0;
	var allImagesWidth 	= 0;
	var menuWidth 		= 0;

	var menuItems = {
		home: function(){
			$("#slider-holder").css("left",0);
		},
		courses: function(){
			$("#slider-holder").css("left","-"+ oneImageWidth +"px");
		},
		about: function(){
			$("#slider-holder").css("left","-"+ (oneImageWidth*2) +"px");
		},
		instructors: function(){
			$("#slider-holder").css("left","-"+ (oneImageWidth*3) +"px");
		}
	};

	$('#main-nav a').bind('click',function(e){
		e.preventDefault();

		$('#main-nav .current').removeClass('current');
		$(this).addClass('current');
		
		var id = $(this).attr('id');
		switch( id ){
			case 'op-contact':
				$('#slider-holder').animate({
				  top: browserHeight
				}, 100);
				
				$('#sky').animate({
				  bottom: -browserHeight
				}, 1000);
				
				$('#clouds').animate({
				  top: cloudsPos,
				  opacity: 0.3
				}, 1000);
					
				$('#contact').animate({
				  top: '0'
				}, 1000);
			break;
			
			default:
				returnScenario();

				if( menuItems[id.substr(3)] != undefined ){
					menuItems[id.substr(3)]();
				}
			break;
		}
		


		
		return false;
	});
	
	function returnScenario(){
		$('#contact').animate({
		  top: "-"+ browserHeight
		}, 1000);
		
		$('#sky').animate({
		  bottom: 0
		}, 1000);
		
		$('#clouds').animate({
		  top: 0,
		  opacity: 1
		}, 1000);
		
		$('#slider-holder').animate({
		  top: 0
		}, 100);
	}
	
	$('#benefits').cycle({
			pager: '#text-slides .slider-nav',
			timeout: 10000
	});

	$('#home-imgs').cycle({
			timeout: 5000
	});
	
	$('#instructors-slides').cycle({
			fx: 'scrollHorz',
			timeout: 0,
			pager: '#instructors-slider .slider-nav'
	});

	// BEGIN: @otakurzo
	$(window).bind('resize', function(e){
		browserWidth = $(window).width();
		browserHeight = $(window).height();
		cloudsPos = $(window).height() / 1.5; 

		$("#sky").height(browserHeight * 2); 
		$("#contact").css("top","-"+ browserHeight +"px"); 
		$("#contact").css("top","-"+ browserHeight +"px"); 
		$('#slider,.item, .scenario, .scenario img').width(browserWidth);

		oneImageWidth = $('#home').width();
		allImagesWidth = $('#home').width() * 4;
		$('#slider-holder').width(allImagesWidth);

		menuWidth = $('#main-nav').outerWidth(); // - 107;
		$('#main-nav').css("left", ((browserWidth - menuWidth) / 2) + "px");

		var currentSeccion = $('#main-nav .current').attr('id').substr(3);
		if( menuItems[currentSeccion] != undefined ){
			menuItems[currentSeccion]();
		}
	});

	// Fix Menu Position
	$('#main-nav').hide();
	setTimeout(function(){
		$(window).trigger('resize');
		$('#main-nav').fadeIn('slow');
	},100);

	
	

	var prevCourse = '';
	var activeCourse = '';
	
	var easeOut = 'easeOutCirc';
	var easeIn = 'easeInCirc';
	var duration = 700;
	var headerHeight = $('#courses-slider .courses-header').height();
	var $containerInnerChildren = $('#courses-slider .courses-container .courses-content .courses-container-inner');

	var showHeader = function(){
		$('#courses-slider .courses-header img[data-id="'+ activeCourse +'"]:first')
			.css({
				'z-index': $('#courses-slider .courses-header img').length + 1,
				display:'block',
				top: headerHeight * -1
			})
			.animate({top:0}, duration, easeOut, function(){
				if( prevCourse != '' ){
					$('#courses-slider .courses-header img[data-id="'+ prevCourse +'"]:first').hide();
				}
				showContent();
			});
	}
	var showContent = function(){
		$('#courses-slider .courses-container .courses-content [data-id="'+ activeCourse +'"]:first')
			.css({
				'z-index': $containerInnerChildren.length + 1,
				opacity:0,
				display:'block'
			})
			.animate({opacity:1}, duration, easeOut);
	}

	$('#courses-slider .courses-container .courses-sidebar ul li a').bind('click',function(e){
		e.preventDefault();

		if( $(this).data('id') == activeCourse ) return;

		prevCourse = activeCourse;
		activeCourse = $(this).data('id');


		$('#courses-slider .courses-container .courses-sidebar ul li a.active').removeClass('active');
		$(this).addClass('active');
		

		// HEADER
		$('#courses-slider .courses-header img').each(function(index){
			$(this).css({'z-index':index+1});
		});
		
		// CONTAINER
		$containerInnerChildren.each(function(index){
			$(this).css({'z-index':index+1});
		});
		if( prevCourse != ''){
			$('#courses-slider .courses-container .courses-content [data-id="'+ prevCourse +'"]:first')
				.animate({opacity:0}, duration * .5, easeOut, function(){
					$('#courses-slider .courses-container .courses-content [data-id="'+ prevCourse +'"]:first').hide();

					showHeader();
				});
		} else {
			showHeader();
		}

	});

	$('#courses-slider .courses-container .courses-sidebar ul li a:first').trigger('click');

	// END: @otakurzo
});