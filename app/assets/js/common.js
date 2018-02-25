(function($) {
	var fcb = {};

	fcb.init = function() {
		fcb.topline();
		fcb.testimonials();
		fcb.mobileMenu();
		fcb.smoothScroll();
		fcb.wow();
		fcb.paralax();
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


	fcb.paralax = function() {

		var Visible = function (target, visible, invisible) {
			// Все позиции элемента
			var targetPosition = {
				top: window.pageYOffset + target.getBoundingClientRect().top,
				left: window.pageXOffset + target.getBoundingClientRect().left,
				right: window.pageXOffset + target.getBoundingClientRect().right,
				bottom: window.pageYOffset + target.getBoundingClientRect().bottom
			  },
			  // Получаем позиции окна
			  windowPosition = {
				top: window.pageYOffset,
				left: window.pageXOffset,
				right: window.pageXOffset + document.documentElement.clientWidth,
				bottom: window.pageYOffset + document.documentElement.clientHeight
			  };
		  
			if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
			  targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
			  targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
			  targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
			 
				if(typeof visible != 'undefined') visible(target);
			} else {
				if(typeof invisible != 'undefined') invisible(target);
			};
		};
		/**
		 * Cache
		 */
		var $content = $('header .before, header .after'),
			$content2 = $('.contact-us .before, .contact-us .after'),
			wHeight  = $(window).height();

		$(window).on('resize', function(){
			wHeight = $(window).height();
		});

		/**
		* requestAnimationFrame Shim 
		*/
		window.requestAnimFrame = (function() {
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ){ window.setTimeout(callback, 1000 / 60); };
		})();

		/**
		* Scroller
		*/
		function Scroller()
		{
			this.latestKnownScrollY = 0;
			this.ticking            = false;
		}

		Scroller.prototype = {
			/**
			 * Initialize
			 */
			init: function() {
				window.addEventListener('scroll', this.onScroll.bind(this), false);
			},

			/**
			 * Capture Scroll
			 */
			onScroll: function() {
				this.latestKnownScrollY = window.scrollY;
				this.requestTick();
			},

			/**
			 * Request a Tick
			 */
			requestTick: function() {
			if( !this.ticking ) {
				window.requestAnimFrame(this.update.bind(this));
			}
				this.ticking = true;
			},

			/**
			 * Update.
			 */
			update: function() {
				var currentScrollY = this.latestKnownScrollY;
				this.ticking       = false;
				
				/**
				 * Do The Dirty Work Here
				 */

				Visible($content.get(0), function() {
					var slowScroll = currentScrollY / 8;
					$content.css({
						'transform'         : 'translateY(-' + slowScroll + 'px)',
						'-moz-transform'    : 'translateY(-' + slowScroll + 'px)',
						'-webkit-transform' : 'translateY(-' + slowScroll + 'px)'
					});
				});

				Visible($content2.get(0), function(e) {
					var slowScroll = ($(e).parents('.contact-us').offset().top - currentScrollY) / 6;
					$content2.css({
						'transform'         : 'translateY(-' + slowScroll + 'px)',
						'-moz-transform'    : 'translateY(-' + slowScroll + 'px)',
						'-webkit-transform' : 'translateY(-' + slowScroll + 'px)'
					});
				});
			}
		};

		/**
		* Attach!
		*/
		var scroller = new Scroller();  
		scroller.init();
	}

	$(document).ready(fcb.init);
})(jQuery);