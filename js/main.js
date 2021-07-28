$(window).on("scroll touchmove", function() {

	fixedHeader();

	var scrollPos = $(window).scrollTop();

	if ($("#md-indicator").css("display") == "block") {
		var yDiff = $("header").outerHeight();
	} else {
		var yDiff = $("header").outerHeight();
	}

	$("a[name]").each(function() {

		if ($(this).closest(".section").length) {

			var offTop = $(this).closest(".section").offset().top;

		} else {

			var offTop = $(this).offset().top;

		}

		if (scrollPos > offTop - yDiff - 100) {
			$(".navbar-nav a").removeClass("active");
			$(".navbar-nav a[href='#" + $(this).attr("name") + "']").addClass("active");
		}
	});

});

$(document).ready(function() {

	$(".header-logo a").click(function () {

		$("html, body").animate({
			scrollTop: 0
		},1500);

		return false;

	});

	$(".svg-inline").svgInline();

	fixedHeader();

	$("body").on("click", function(e) {
		if ($("#mobile-indicator").css("display") == "block" && !$(e.target).hasClass("navbar-wrapper-inner") && !$(e.target).parents().hasClass("navbar-wrapper-inner") && !$(e.target).hasClass("navbar-trigger") && !$(e.target).parents().hasClass("navbar-trigger")) {
			$(".navbar-wrapper").fadeOut(150);
			$("body").removeClass("menu-open");
			$(".navbar-trigger").removeClass("active");
		}
	});

	$(".navbar-trigger").click(function() {
		$(this).toggleClass("active");
		$(".navbar-wrapper").fadeToggle(150);
		$("body").toggleClass("menu-open");
	});



	$(".navbar-nav a").click(function() {

		if ($("#mobile-indicator").css("display") == "block") {

			$(".navbar-wrapper").fadeOut(150);
			$("body").removeClass("menu-open");
			$(".navbar-trigger").removeClass("active");

		}

	});

	// $(".navbar-wrapper").click(function(e) {
	// 	if (!$(e.target).hasClass("navbar-wrapper-inner") && !$(e.target).parents().hasClass("navbar-wrapper-inner")) {
	// 		$(".navbar-wrapper").fadeOut(150);
	// 		$("body").removeClass("menu-open");
	// 		$(".navbar-trigger").removeClass("active");
	// 	}
	// });

	// $("body").on("click", function (e) {
	//
	// 	if ($("#md-indicator").css("display") != "block") {
	//
	// 		if (!$(e.target).hasClass("navbar-trigger") && !$(e.target).parents().hasClass("navbar-trigger") && !$(e.target).hasClass("navbar-wrapper") && !$(e.target).parents().hasClass("navbar-wrapper") && $(".navbar-trigger").hasClass("active")) {
	//
	// 			$(".navbar-wrapper").fadeOut(150);
	//
	// 			$(".navbar-trigger").removeClass("active");
	//
	// 		}
	//
	// 	}
	//
	// });

	$("body").on("click", ".navbar-nav a, .header-button a", function() {

		var curLink = $(this);

		if ($("#mobile-indicator").css("display") == "block") {
			var yDiff = $("header").outerHeight();
		} else {
			var yDiff = $("header").outerHeight();
		}

		$("html,body").animate({
			scrollTop: $("a[name='" + curLink.attr("href").replace("#","") + "']").offset().top - yDiff - 50
		},1000,function () {
			//curLink.addClass("active")
		});

		return false;

	});

	// Countdown

	var endDate = new Date(2021, 5, 7, 0, 0, 0, 0);

	$(".countdown").each(function() {
		$(this).countdown({
			until: endDate,
			layout : "<div class='cd-section cd-section-days'><div class='cd-num'>{dnn}</div><div class='cd-ttl'>{dl}</div></div><div class='cd-section cd-section-hours'><div class='cd-num'>{hnn}</div><div class='cd-ttl'>{hl}</div></div><div class='cd-section cd-section-minutes'><div class='cd-num'>{mnn}</div><div class='cd-ttl'>{ml}</div></div>"
		});
	});

	// Countdown END

	// Marquee

	$(".marquee-list").each(function () {

		var mList = $(this),
			mClone1 = $(this).clone(),
			mClone2 = $(this).clone(),
			mSize = $(this).find(".marquee-item").length;

		mList.before(mClone1);
		mList.after(mClone2);

		$(this).closest(".marquee-content").css({
			animationDuration: mSize * 20 + "s",
			width: mList.outerWidth() * 3
		});



	});

	// Marquee END

	// FAQ

	$("body").on("click", ".faq-item-ttl", function () {

		if (!$(this).closest(".faq-item").hasClass("active")) {

			var faqItemActive = $(".faq-item.active"),
				faqItemCur = $(this).closest(".faq-item");

			faqItemActive.find(".faq-item-content").slideUp("250", function () {

				faqItemActive.removeClass("active");

			});

			faqItemCur.find(".faq-item-content").slideDown("250", function () {

				faqItemCur.addClass("active");

			});

			//$(".faq-answer").html(faqItemCur.find(".faq-item-content").html());

		} else {

			var faqItemCur = $(this).closest(".faq-item");

			faqItemCur.find(".faq-item-content").slideUp("250", function () {

				faqItemCur.removeClass("active");

			});

		}

	});

	// FAQ END

});

function fixedHeader() {

	var scrollPos = $(window).scrollTop();

	if (scrollPos > $(".section-top").outerHeight()) {

		$("header").addClass("header-fixed");

	} else {

		$("header").removeClass("header-fixed");

	}

}

(function($) {
	$.fn.svgInline = function() {
		return this.each(function() {
			var $img = jQuery(this);
			var imgID = $img.attr('id');
			var imgClass = $img.attr('class');
			var imgURL = $img.attr('src');
			jQuery.get(imgURL, function(data) {
				// Get the SVG tag, ignore the rest
				var $svg = jQuery(data).find('svg');
				// Add replaced image's ID to the new SVG
				if (typeof imgID !== 'undefined') {
					$svg = $svg.attr('id', imgID);
				}
				// Add replaced image's classes to the new SVG
				if (typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass + ' replaced-svg');
				}
				// Remove any invalid XML tags as per http://validator.w3.org
				$svg = $svg.removeAttr('xmlns:a');
				// Replace image with new SVG
				$img.replaceWith($svg);
			}, 'xml');
		});
	};

})(jQuery);