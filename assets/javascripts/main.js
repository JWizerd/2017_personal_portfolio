(function($){
  // Immediately Invoked Fucntion Expresion invoked to create a new execution context therefore creating encapsulation any variables from the global object

  $navLinks = $('.navigation ul li a');
  $icon = $('.navigation ul li');

  function addLinkTitlesToNavLinks() {
    $($navLinks).each(function() {
      $title = $(this).attr('title');
      $(this).find('span').html($title);
    });
  }

  function linkTitleOnHover() {
    $navLinks.hover(function() {
      $this = $(this);
      $this.find('i').hide();
      $this.find('span').show();
    }, function () {
      $this.find('i').show();
      $this.find('span').hide();
    });
  }

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

  $(document).ready(function() {
    addLinkTitlesToNavLinks();
    linkTitleOnHover();
    animateOnHover('.client-logo', 'tada');
  });
}(jQuery));
