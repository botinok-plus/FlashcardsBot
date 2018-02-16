(function($) {
	var fcb = {};

	fcb.init = function() {
		fcb.topline();
		fcb.testimonials();
		fcb.mobileMenu();
	}

	fcb.topline = function() {
		var topline = $('.topline');
		if(topline.length > 0) {
			$(window).on('scroll', function(e) {
				if($(e.target).scrollTop() >= 84) topline.addClass('scrolled');
				else topline.removeClass('scrolled');
			});
		}
	}

	fcb.testimonials = function() {
		var testimonials = $('[data-testimonials]');
		if(testimonials.length > 0) {
			testimonials.addClass('owl-carousel').owlCarousel({
				items: 1,
				mouseDrag: false,
				nav: true,
				dots: false,
				navText: ['<i class="icon-arrow-left"></i>', '<i class="icon-arrow-right"></i>']
			});
		}
	}

	fcb.mobileMenu = function() {
		var mobileMenuButton = $('[data-mobilemenu]');
		if(mobileMenuButton.length > 0) {
			mobileMenuButton.click(function(e) {
				e.preventDefault();
				$(this).toggleClass('opened');
			})
		}
	}

	$(document).ready(fcb.init);
})(jQuery);