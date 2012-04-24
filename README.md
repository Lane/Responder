# Responder #

Responder is a light weight (~1.2KB) jQuery plugin to add classes and trigger events based on defined break points (screen resolutions).  This allows you to style elements and execute javascript based on the browser window resolution or device width. 

## Responder vs. Media Queries ##

Why use this plugin when media queries already allow for styling based on different device widths?  There are a few reasons:

1. When dealing with mobile and desktop interactive elements on a page there is sometimes a need to switch functionality between devices.  Triggering a code block to execute when entering a breakpoint allows for that functionality switch to occur.
2. Older browsers do not support media queries, but do support javascript.  This plugin could be used to replicate the functionality of media queries.

## Usage ##

Specify an element and any breakpoints you would like to associate it.  

### Getting Started ###

Add the responder.js file along with jQuery to your HTML file, then call the plugin.

    $('body').responder();
    
This will apply the responder to the body element with the default breakpoints.  A class will be added to the body tag depending on which breakpoint the user has entered.  For example: the "mobile-landscape" class will be added to the body if the window width is between 480 and 768 pixels.

You can specify your own breakpoints for the responder:

    $('body').responder({ 
        breakpoints: [ 
            new $.responsive.Breakpoint(0, "mobile"),
            new $.responsive.Breakpoint(767, "desktop")
        ]
    });
    
This will add the "mobile" class to the body element if the window width is between 0-767 and add the "desktop" class to the body element if the window width is 768+ pixels wide.  In addition, breakpoint events are triggered whenever the window width crosses into a new break point.  For example, with the above responder, it is possible to bind to the mobile and desktop break points.  The event is referred to with the word "breakpoint" concatenated with the width of the specific break point.

    $('body').bind("breakpoint0", function() {
        // Do something when entering the "mobile" break point
    });
    
    $('body').bind("breakpoint767", function() {
        // Do something when entering the "desktop" break point
    });
    
You can also access the break point object from within the event binding:

    $('body').bind("breakpoint0", function(event, breakpoint) {
        alert("Current class: " + breakpoint.className);
    });
    
It is also possible to specify a callback function when creating the breakpoint.  The callback function will execute when entering a new breakpoint.    
    
    new $.responsive.Breakpoint(768, "tablet-portrait", function() {
        // code executed when entering this break point
        alert("The tablet-portrait break point has been triggered");
    });
    
### Options ###

#### Default Options ####

The plugin is setup with the following default break points

    new $.responsive.Breakpoint(320, "mobile-portrait"),
    new $.responsive.Breakpoint(480, "mobile-landscape"),
    new $.responsive.Breakpoint(768, "tablet-portrait"),
    new $.responsive.Breakpoint(1024, "tablet-landscape"),
    new $.responsive.Breakpoint(1280, "desktop")


#### Break Points ####

A break point can take three parameters:

* Width to trigger the break point
* Class name to assign to the element at the break point
* _Callback function to execute when the break point is entered (optional)_

Create a break point using the constructor:

    var breakpoint = new $.responsive.Breakpoint('320', 'mobile-portrait');
    
## Credit ##

**Breakpoints.js**

Credited for the break point idea.  I worked off of this plugin initially but wanted to apply the breakpoint to specific elements. 

http://xoxco.com/projects/code/breakpoints/