(function($) {
	var fcb = {};

	fcb.init = function() {
		fcb.topline();
		fcb.testimonials();
		fcb.mobileMenu();
		fcb.smoothScroll();
		fcb.wow();
		$(window).resize(fcb.wow);
	}

	fcb.wow = function() {
		if($(window).width() > 767) new WOW().init();
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

	fcb.smoothScroll = function() {
		var menu = $('[data-anchor-menu]'),
			menuLinks = menu.find('a');

		if(menu.length > 0) {
			menuLinks.click(function(e) {
				e.preventDefault();
				var linkAnchor = $(e.target).attr('href'),
					anchoredElem = $(linkAnchor);
					if(anchoredElem.length > 0) {
						if($(window).width() < 768) $('[data-mobilemenu]').removeClass('opened');
						$('body, html').animate({scrollTop: anchoredElem.offset().top - ((linkAnchor.substr(1) === 'features' && $(window).width() > 767) ? -30 : 84)}, 300);
					} else console.warn('Anchored elem ' + linkAnchor + ' is not found!');

			});
		}
	}

	$(document).ready(fcb.init);
})(jQuery);