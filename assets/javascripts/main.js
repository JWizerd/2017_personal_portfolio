(function($){
  // Immediately Invoked Fucntion Expresion invoked to create a new execution context therefore encapsulating any variables from the global object

  function animateOnHover(elm, animation) {
    $(elm).hover(
      function(){
        $(this).addClass(animation);
      },
      function() {
        $(this).removeClass(animation);
      }
    );
  }

  function addAnimation(elm, animation) {
    $(elm).addClass('my-animate ' + animation);
  }

  /* formspree */
  function formSpreeAjax() {
  var $contactForm = $('.contact-form');
  var $btn = $('.btn-submit');
  $contactForm.submit(function(e) {
  	e.preventDefault();
  	$.ajax({
  		url: '//formspree.io/jeremiah@impactstud.io',
  		method: 'POST',
  		data: $(this).serialize(),
  		dataType: 'json',
  		beforeSend: function() {
        $btn.addClass('alert--loading');
  			$btn.prop('value', 'Sending Message...');
  		},
  		success: function(data) {
  			$btn.find('.alert--loading').hide();
  			$btn.prop('value', 'Message Sent!');
        $btn.addClass('my-animate bounce sun');
        $(".contact-form")[0].reset();
        window.setTimeout(function() {
          $btn.removeClass('my-animate bounce bg-sun');
        }, 2000);
        window.setTimeout(function() {
          window.location.href = "/";
        }, 3000);
  		},
  		error: function(err) {
    			$contactForm.find('.alert--loading').hide();
    			$contactForm.append('<div class="alert alert--error">Ops, there was an error.</div>');
    		}
    	});
    });
  }

  /* add animation before load for smoothest effect */
  addAnimation('.subpage-title', 'bounceInLeft');

  /* show load animations on window page load. note: .load is deprecated since jQuery 3.x */
  $(window).on("load", function(){
    $('.load-screen').fadeOut(1000);
  });

  $(document).ready(function() {

    /* animations */
    animateOnHover('.client-logo', 'tada');

    formSpreeAjax();

    /* bug fix for modal window and animation.css */
    window.setTimeout(function() {
      $('.clients').removeClass('my-animate rotateInUpLeft');
    }, 3500);

    /* drawer menu */
    $('.fa-github').parent().click(function(e){
      e.preventDefault();
      $('.drawer').animate({width: 'toggle'}, 500);
    })

  });

}(jQuery));
