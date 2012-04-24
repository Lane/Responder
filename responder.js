/** 
UAlberta Respond
---------------------------------------------------------------------
Author:         Lane Olson
Sources:        breakpoint.js - base idea
                    http://xoxco.com/projects/code/breakpoints/
                jQuery Plugin Patterns - skeleton for plugin
                    http://coding.smashingmagazine.com/2011/10/11/essential-jquery-plugin-patterns/
Version:        1.0a
Date:           April 23, 2012
Description:    Adds a device specific class to elements based on
                defined breakpoints.  Also triggers jquery breakpoint
                events when resizing to a new breakpoint.
---------------------------------------------------------------------
**/

;(function ($) {

    // initialize namespace if it doesn't exist
    if (!$.responsive) {
            $.responsive = {};
    };
    
    /** 
     * 	Class: Breakpoint
     *
     *	@param	width		document width at which to trigger the break point
     *	@param	className	the class to add to the specified element at the break point
     *	@param	callback	a function to execute once the break point has been entered
     */
    $.responsive.Breakpoint = function(width, className, callback)
    {
        var obj = this;
        
        this.width = width;
        this.className = className;
        this.callback = function() {};
         
        if(typeof callback !== 'undefined')
            this.callback = callback;
    };

    $.responsive.respond = function ( el, options ) {
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
        var currentBreakpoint, oldBreakpoint;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object
        base.$el.data( "responsive.respond" , base );
        
        base.init = function()
        {   
			base.options = $.extend({}, $.responsive.respond.defaultOptions, options);
			
			$(window).resize(function()
			{
				currentBreakpoint = base.getCurrentBreakpoint();
				if (oldBreakpoint != currentBreakpoint) 
				{
					if(oldBreakpoint !== undefined)
						base.$el.removeClass(oldBreakpoint.className);
					base.$el.addClass(currentBreakpoint.className);
					currentBreakpoint.callback();
					base.$el.trigger("breakpoint"+currentBreakpoint.width, currentBreakpoint);
					oldBreakpoint = currentBreakpoint;
				}
			}).resize();
        };
        
        base.getCurrentBreakpoint = function()
        {
            var w = $(window).width();
            var bps = base.options.breakpoints;
			for (var i = 0; i < bps.length; i++) 
			{
				if (w >= bps[i].width && 
					(bps.length == i+1 || w < bps[i+1].width)) 
				{
			  		return bps[i];
				}
			}
			return 0;
        };
        
        base.init();
    };
    
    $.responsive.respond.defaultOptions = {
        breakpoints: [
            new $.responsive.Breakpoint(320, "mobile-portrait"),
            new $.responsive.Breakpoint(480, "mobile-landscape"),
            new $.responsive.Breakpoint(768, "tablet-portrait"),
            new $.responsive.Breakpoint(1024, "tablet-landscape"),
            new $.responsive.Breakpoint(1280, "desktop")
        ]
    };
    
    $.fn.responder = function( options ) {
        return this.each(function () {
            (new $.responsive.respond(this, options));
        });
    };
    
})( jQuery );






