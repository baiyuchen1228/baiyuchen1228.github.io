onload = function () {
	/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
	 * Licensed under the MIT License (LICENSE.txt).
	 *
	 * Version 2.1.2
	 */
	!(function (t) {
		function e(t) {
			return t && t.constructor === Number ? t + 'px' : t;
		}
		(t.fn.bgiframe =
			t.browser.msie && /msie 6\.0/i.test(navigator.userAgent)
				? function (i) {
						var r =
							'<iframe class="bgiframe"frameborder="0"tabindex="-1"src="' +
							(i = t.extend({ top: 'auto', left: 'auto', width: 'auto', height: 'auto', opacity: !0, src: 'javascript:false;' }, i)).src +
							'"style="display:block;position:absolute;z-index:-1;' +
							(!1 !== i.opacity ? "filter:Alpha(Opacity='0');" : '') +
							'top:' +
							('auto' == i.top ? "expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+'px')" : e(i.top)) +
							';left:' +
							('auto' == i.left ? "expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+'px')" : e(i.left)) +
							';width:' +
							('auto' == i.width ? "expression(this.parentNode.offsetWidth+'px')" : e(i.width)) +
							';height:' +
							('auto' == i.height ? "expression(this.parentNode.offsetHeight+'px')" : e(i.height)) +
							';"/>';
						return this.each(function () {
							0 === t(this).children('iframe.bgiframe').length && this.insertBefore(document.createElement(r), this.firstChild);
						});
					}
				: function () {
						return this;
					}),
			(t.fn.bgIframe = t.fn.bgiframe);
	})(jQuery);
};
