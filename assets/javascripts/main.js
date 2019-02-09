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
  		url: '//formspree.io/jeremiah.wodke@gmail.com',
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

  /* GitHub Repos */
  /* https://api.github.com/users/JWizerd/repos */
  function GitHubRepos() {
    var request = $.get('https://api.github.com/users/JWizerd/repos?sort=created');

    request.done(function(data) {
      consumeRepos(data);
    });

    request.fail(function() {
      console.log('An error occurred. Please try again or contact website administrator.')
    })
  }

  function consumeRepos(data) {
    data.forEach(function(repo, index) {
      if (index === 0) {
        $('#repos').before(
          '<div class="gh-info text-center">' +
            '<p><a target="_blank" href="'+ repo.owner.html_url +'"><img class="gh-avatar" src="'+ repo.owner.avatar_url +'" alt="GitHub Profile Avatar"></a></p>' +
            '<p class="gh-username lead">' + repo.owner.login + '</p>' +
            '<p class="gh-profile"><a target="_blank" href="'+ repo.owner.html_url +'">View Profile</a></p>' +
           '</div><!-- end gh info -->'
        )
      }
      var template = '<li class="repo">' +
                       '<p class="repo-name">' +
                        '<a target="_blank" class="repo-link" href="' + repo.html_url + '"><i class="fa fa-link"></i> ' + repo.name + '</a>' +
                       '</p>' +
                     '</li>';
      $('#repos').append(template);
    })
  }

  function toggleDrawerMenu(elm) {
    /* hide initially */
    $('.drawer').addClass('bounceOutLeft');

    /* drawer menu */
    $(elm).click(function(e){
      e.preventDefault();

      if ($('.drawer').hasClass('bounceInLeft')) {

        $('.drawer').removeClass('bounceInLeft')
        $('.drawer').addClass('bounceOutLeft')

      } else if ($('.drawer').hasClass('bounceOutLeft')) {

        $('.drawer').removeClass('bounceOutLeft')
        $('.drawer').addClass('bounceInLeft')

      }

    })
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

    // formSpreeAjax();

    /* bug fix for modal window and animation.css */
    window.setTimeout(function() {
      $('.clients').removeClass('my-animate rotateInUpLeft');
    }, 3500);

    /* drawer menu */
    toggleDrawerMenu('.github-link')
    toggleDrawerMenu('.close-repos')

    /* Get GitHub Repos from Public REST API */
    GitHubRepos()
  });

}(jQuery));
