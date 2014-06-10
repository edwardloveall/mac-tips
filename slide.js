$(document).ready(function() {
  init();
});

var init = function() {
  prep_slides();
  prep_keybindings();
}

var prep_slides = function() {
  var slides = $('div.slides > section'),
      partials = $('.partial', slides);
  slides.not(':first-child').addClass('future');
  slides.first().addClass('present');
  partials.addClass('future')
}

var prep_keybindings = function() {
  $(document).on('keydown', function(key) {
    switch(key.keyCode) {
      case 37:
        slide_back();
        break;
      case 39:
        slide_next();
        break;
      default:
        break;
    }
  });
}

var slide_next = function() {
  var present_slide = $('div.slides > section.present'),
      future_slide = present_slide.next('section'),
      future_partial = present_slide.find('.partial.future').first(),
      present_partial = present_slide.find('.partial.present').first();

  if (future_partial.length > 0) {
    present_partial.removeClass('present').addClass('past');
    future_partial.removeClass('future').addClass('present');
  } else if (future_slide.length > 0) {
    present_slide.removeClass('present').addClass('past');
    future_slide.find('.partial').addClass('future').removeClass('present past')
    future_slide.removeClass('future').addClass('present');
  }
}

var slide_back = function() {
  var present_slide = $('div.slides > section.present'),
      past_slide = present_slide.prev('section');

  if (past_slide.length > 0) {
    present_slide.removeClass('present').addClass('future');
    past_slide.find('.partial').addClass('future').removeClass('present past')
    past_slide.removeClass('past').addClass('present');
  }
}
