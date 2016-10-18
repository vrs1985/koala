$(document).ready(function(){
    /*  parallaxEffect();*/
      stickyEffect();
      smoothscrollEffect();
      mobileMenu();
      autoHeight();
      currentSection();
      scrolling();
    });

/*          GLOBAL VARIABLES        */
  var $win = $(window),
      $doc = $(document),
      con = console.log,
      windowHeight = $win.height(),
      documentHeight = $doc.height();


/*          PARALLAX            */
/*
function parallaxEffect() {
    	$('#nav').localScroll(800);
	
	//.parallax(xPosition, speedFactor, outerHeight) options:
	//xPosition - Horizontal position of the element
	//inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
	//outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport
    $('#testimonials').parallax("50%", 0.3);
    $('#getInTouch').parallax("50%", 0.3);
}
*/
/*          SCROLL                      */
function scrolling(){
    /*hide arrowDown if page in the down*/
    $win.scroll(function(){
        var windowBottom = (documentHeight - (windowHeight + (windowHeight/2))),
        scrollTop = $win.scrollTop();
        if(windowBottom <= scrollTop){
          $(".arrowDown").css("display", "none");
        }else{
          $(".arrowDown").css("display", "block");
        }
    });

}
/*          END SCROLL                      */

/*          FIND ELEMENT IN VIEWPORT          */
function currentSection(){
  $("#arrowDown").click(function(){
    var scrollTop = $win.scrollTop(),
        windowHeight = $win.height(),
        result = [],
        currentEls = $("section");
  currentEls.each(function(){
    var el = $(this);
    var offset = el.offset();
    console.log(result);
    if((scrollTop - el.height()) <= offset.top && offset.top <= (scrollTop + windowHeight)){ 
        result = [];
        result.push(this);
        var elHeight = $(this).height();
        $("html,body").animate({ scrollTop:  (offset.top + elHeight)}, 1100);
    }
    });
  return $(result);
      });

}
/*          AUTO HEIGHT & BACKGROUND      */
function autoHeight(){
    var  windowWidth = $win.width(),
      windowHeight = $win.height(),
      documentHeight = $doc.height(),
      sectionsHeight = windowHeight - 104,
      fontSize = Math.ceil(windowWidth / 8.4);
      var test = $("footer").height();
      var backgroundSectionHeight = Math.ceil(sectionsHeight/2),
          halfFontSize = backgroundSectionHeight/2;
            /*this code we set background*/
      $(".background-sections").css("font-size", fontSize)
      .css("height", backgroundSectionHeight);
       $(".background-sections-down").css("margin-top", backgroundSectionHeight);
       $(".backgroundTop").css("top", halfFontSize);
       $(".backgroundDown").css("bottom", halfFontSize);
       /*this code we animated background*/
       $("#corruption").mouseenter(function(){
         backgroundAnimate(".corruptionTop", ".corruptionDown");
       });
       $("#social").mouseenter(function(){
         backgroundAnimate(".socialTop", ".socialDown");
       });
       $("#about").mouseenter(function(){
         backgroundAnimate(".aboutTop", ".aboutDown");
       });

    if (windowHeight > 660) {
      $(".sections").css("height", sectionsHeight);
    } 
}

  

function backgroundAnimate(top, down){
    $(top).animate({left: "0px"}, 2000);
    $(down).animate({right: "0px"}, 2000);
  }
  

/*          STICKY          */

function stickyEffect() {
    $("#home").sticky({ topSpacing: 0 });
}

/*          SMOOTH SCROLL       */

function smoothscrollEffect() {
    $('body').smoothScroll({
        delegateSelector: 'ul.nav a, #arrowDown, .buttons a'
      });

      $('p.subnav a').click(function(event) {
        event.preventDefault();
        var link = this;
        $.smoothScroll({
          scrollTarget: link.hash
        });
      });
}

/*              TOOLTIP         */
$('#yearlyrevenue').tooltip('show')
$('#yearlyrevenue').tooltip('hide')
$('#mybudget').tooltip('show')
$('#mybudget').tooltip('hide')

/*              MOBILE MENU       */
function mobileMenu(){
  $('#mobileMenu').click(function(){
    if($('.navbar-menu').is(':hidden')){
      $('.navbar-menu ul, .navbar-menu').css('display','block');
    }else {
    $( '.navbar-menu ul, .navbar-menu' ).css( "display","none" );
  }
      
  });
}