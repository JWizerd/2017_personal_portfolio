(function($){
  // Immediately Invoked Fucntion Expresion invoked to create a new execution context therefore creating encapsulation any variables from the global object

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

  // COME BACK TO LATER WITH FRESH MIND
  // function loadViewOnClick(elm, view, location) {
  //   var location = '.view div' || location;
  //   $(elm).on("click", function(e){
  //     e.preventDefault();
  //     $(location).load(view);
  //     $.getScript('assets/javascripts/main.js');
  //   });
  // }

  function addAnimation(elm, animation) {
    $(elm).addClass('my-animate ' + animation);
  }

  /* add animation before load for smoothest effect */
  addAnimation('.subpage-title', 'bounceInLeft');


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
        window.setTimeout(function() {
          $btn.removeClass('my-animate bounce bg-sun');
        }, 3000)
  		},
  		error: function(err) {
  			$contactForm.find('.alert--loading').hide();
  			$contactForm.append('<div class="alert alert--error">Ops, there was an error.</div>');
  		}
  	});
  });
}

  $(document).ready(function() {

    /* animations */
    animateOnHover('.client-logo', 'tada');

    formSpreeAjax();


    /* single page navigation */
    // loadViewOnClick('.about', 'about.html');
    // loadViewOnClick('.contact', 'contact.html');
    // loadViewOnClick('.home', 'home.html');
    // loadViewOnClick('.work', 'work.html');

    /* bug fix for modal window and animation.css */
    window.setTimeout(function() {
      $('.clients').removeClass('my-animate rotateInUpLeft');
    }, 3000);
  });
}(jQuery));
