# Responder #

jQuery plugin to add classes and trigger events based on defined breakpoints.

## Usage ##

Specify an element and any breakpoints you would like to associate it.  

### Getting Started ###

Add the responder.js file along with jQuery to your HTML file, then call the plugin.

    $('body').responder();
    
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
* Callback function to execute when the break point is entered

Create a break point using the constructor:

    var breakpoint = new Breakpoint('320', 'mobile-portrait');