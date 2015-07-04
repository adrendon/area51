
jQuery.fn.centerHorz = function () {
	this.css("position","absolute");
	this.css("left", (($(window).width() - 381) / 2) + $(window).scrollLeft() + "px");
	return this;
}

	
$(function(){
	
	
	$(".fancybox").fancybox({
		maxWidth	: 630,
		maxHeight	: 800,
		fitToView	: false,
		width		: '70%',
		height		: '95%',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none'
	});
	
	Shadowbox.init({
	    handleOversize: "drag",
	    autoplayMovies: true,
	    displayNav: false,
	    displayCounter: false,
	    flashVars: {'autoplay':1}
	});
	
	
	
	/* MENU CENTER */
	
	$('#main-nav').hide();
	$('#main-nav').centerHorz().fadeIn('slow');
	
	
	$('#op-home').attr('href','#inicio');
	$('#op-courses').attr('href','#cursos');
	$('#op-about').attr('href','#nosotros');
	$('#op-instructors').attr('href','#instructores');
	$('#op-contact').attr('href','#contacto');
	$('#home-imgs a[href="#"]').attr('href','#cursos');
	
	/* End of MENU CENTER */	
	
	var clouds=$('#clouds');
	var background=0;
	
	if(!$.browser.webkit){
		
		var scrollingBG = setInterval(function(){background-=1;if(background==2400)background=0;clouds.css('background-position',background); },95)
		
	}
	
	
	
	
	var browserWidth = $(window).width();
	var browserHeight = $(window).height();
	if( browserHeight <= 600 ){
		browserHeight = 600;
	} 
	
	
	if( browserHeight <= 700 ){
		$('.scenario img').css('bottom','-100px')
	} else {
		$('.scenario img').css('bottom','0')
	}
	
	
	var cloudsPos = $(window).height() / 1.5; 
	if( (browserHeight * 2) <= 1200 ){
		$("#sky").height(1200); 
	} else {
		$("#sky").height(browserHeight * 2); 
	}
	
	$("#contact").css("top","-"+ browserHeight +"px"); 
	$('#slider,.item, .scenario, .scenario img').width(browserWidth);
	
	var oneImageWidth = $('#home').width()
	var allImagesWidth = $('#home').width() * 4;
	
	$('#slider-holder').width(allImagesWidth);
	
	var menuItems = {
		home: function(){
			if($.browser.msie){
				$("#slider-holder").animate({
				  left: 0
				}, 1000);
			} else {
				$("#slider-holder").css("left",0);
			}
			var pageTracker = _gat._getTracker("UA-27674439-1");
			pageTracker._trackPageview("/homepage");
			window.location.hash = 'inicio';
		},
		courses: function(){
			if($.browser.msie){
				$("#slider-holder").animate({
				  left: "-"+ oneImageWidth
				}, 1000);
			} else {
				$("#slider-holder").css("left","-"+ oneImageWidth +"px");
			}
			var pageTracker = _gat._getTracker("UA-27674439-1");
			pageTracker._trackPageview("/courses");
			window.location.hash = 'cursos';
		},
		about: function(){
			if($.browser.msie){
				$("#slider-holder").animate({
				  left: "-"+ (oneImageWidth*2)
				}, 1000);
			} else {
				$("#slider-holder").css("left","-"+ (oneImageWidth*2) +"px");
			}
			var pageTracker = _gat._getTracker("UA-27674439-1");
			pageTracker._trackPageview("/about");
			window.location.hash = 'nosotros';
		},
		instructors: function(){
			if($.browser.msie){
				$("#slider-holder").animate({
				  left: "-"+ (oneImageWidth*3)
				}, 1000);
			} else {
				$("#slider-holder").css("left","-"+ (oneImageWidth*3) +"px");
			}
			var pageTracker = _gat._getTracker("UA-27674439-1");
			pageTracker._trackPageview("/instructors");
			window.location.hash = 'instructores';
			
		}
	};
	
	$('#main-nav a').bind('click',function(e){
		
		$('#slider-holder').addClass('animation');
		
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
				
				var pageTracker = _gat._getTracker("UA-27674439-1");
				pageTracker._trackPageview("/contact");
				window.location.hash = 'contacto';
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
	
	$(".logo.main a").click(function() {
		$('#op-home').trigger('click');
		return false;
	});
	
	$('#home-imgs a[href="#cursos"]').click(function() {
		$('#op-courses').trigger('click');
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
			timeout: 20000,
			cleartype : true,
			cleartypeNoBg : true
	});
	
	$('#home-imgs').cycle({
			timeout: 5000
	});
	
	$('#instructors-slides').cycle({
			fx: 'scrollHorz',
			timeout: 0,
			pager: '#instructors-slider .slider-nav'
	});
	
	/* RESIZE */
	$(window).bind('resize', function(e){
		
		$('<div></div>').appendTo('body');
		
		var currentSeccion = $('#main-nav .current').attr('id').substr(3);
		
		if( currentSeccion == 'instructors' ){
			$('#slider-holder').removeClass('animation');
		}

		browserWidth = $(window).width();
		browserHeight = $(window).height();
		
		if( browserHeight < 600 ){
			browserHeight = 600;
		} 
		
		if( browserHeight <= 700 ){
			$('.scenario img').css('bottom','-100px')
		}  else {
			$('.scenario img').css('bottom','0')
		}
		
		cloudsPos = $(window).height() / 1.5; 
		
		if( (browserHeight * 2) < 1200 ){
			$("#sky").height(1200); 
		} else {
			$("#sky").height(browserHeight * 2); 
		} 
		
		if( currentSeccion == 'contact' ){
			
			$('#slider-holder').css("top",browserHeight);
			
			$('#sky').css("bottom",-browserHeight);
			
			$('#clouds').css("top",cloudsPos);
				
			$('#contact').css("top",0);
			
		} else {
			$("#contact").css("top","-"+ browserHeight +"px");
		}
	
		$('#slider,.item, .scenario, .scenario img').width(browserWidth);

		oneImageWidth = $('#home').width();
		allImagesWidth = $('#home').width() * 4;
		$('#slider-holder').width(allImagesWidth);

		$('#main-nav').centerHorz();
		
		if( menuItems[currentSeccion] != undefined ){
			menuItems[currentSeccion]();
		}
		

		
	});
	/* End of RESIZE */

	
	/* COURSE by otakurzo*/
	
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
	
	/* End of COURSES by Otakurzo */
	
	$('.courses-content').lionbars();
	
	$('#btnSubmit').live("click", function(){
										
		
			$(this).attr('disabled','disabled');
			var name = $('#txtName').val();
			var email = $('#txtEmail').val();
			var phone = $('#txtPhone').val();
			var comments = $('#txtMessage').val();
			
			//console.log(name,email,comments);
			
			$.ajax({
				url: 'send_mail.php',
				type: 'POST',
				data: 'name=' + name + '&email=' + email + '&phone=' + phone + '&comments=' + comments,
				
				success: function(result){
					$('#responses .response').remove();
				
					$('#responses').append( result )
					
					$('#btnSubmit').removeAttr('disabled');
					
					var pageTracker = _gat._getTracker("UA-27674439-1");
					pageTracker._trackPageview("/form_interaction");
				}
			});
			return false;


										
	});
	
	if(window.location.hash){
		var currentHash = window.location.hash
		currentHash = currentHash.slice(1);
		
		if( currentHash == 'cursos' ){
			$('#op-courses').trigger('click');
		} else if ( currentHash == 'nosotros' ){
			$('#op-about').trigger('click');
		} else if ( currentHash == 'instructores' ){ 
			$('#op-instructors').trigger('click');
		} else if ( currentHash == 'contacto' ){
			$('#op-contact').trigger('click');
		} else if ( currentHash == 'inicio' ){
			$('#op-home').trigger('click');
		}
	
	}
	
	
});