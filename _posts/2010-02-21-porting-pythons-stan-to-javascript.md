--- 
layout: post
title: Porting Python's Stan to Javascript.
created: 1266779170
---
<javascript>
// This is a proof-of-concept port of Python's Stan
// to Javascript.

function make_tag_fn() {
	var _indent = 0 ;
	var indent = function() {
		var tmp = "" ;
		var i ;
		for (i = 0 ; i < _indent ; i++) {
			tmp += "  ";
		}
		return tmp;
	}
	
	// tag is a function contructor
	var tag = function(name) {
		
		// fn is the function which tag contructs
		var fn = function() {
			// this copies the arguments which fn
			// receives, so that fn_ can acces them
			var argz = [].slice.call(arguments); 
			
			// fn_ is a thunk created by fn.  Its evaluation
			// creates an html string.
			var fn_ = function() {
				// note: this function takes no arguments,
				// except for those in the surrounding function
				var opentag = "<" + name + ">";
				var closetag = "</" + name + ">";
				
				// if it's empty, just create a self-closing tag
				if (argz[0] === undefined) {
					return indent() + opentag + closetag + "\n" ;
				}
				
				// if it's called with a string, wrap it
				if (typeof(argz[0]) === typeof("")) {
					return indent() + opentag + argz[0] + closetag + "\n" ;
				}
				
				// otherwise it's a list of functions to be called
				var tmp = indent() + opentag + "\n";
				_indent += 2; // aren't closures great?
				for (i in argz) {
					tmp += argz[i]();
				}
				_indent -= 2;
				tmp += indent() + closetag + "\n";
			
				return tmp ;
			}
			return fn_ ;
		}
		return fn ;
	}
	return tag ;
}

// make all the tag functions
var tag = make_tag_fn() ;
HTML = tag("HTML") ;
HEAD = tag("HEAD") ;
BODY = tag("BODY") ;
H1 = tag("H1") ;
P = tag("P") ;

// doc is a thunk which can generate html on evaluation
var doc = 
HTML( HEAD()
    , BODY( H1("The title.")
		  , P("A first line.")
		  , P("A second line.")
		  )
	) ;

// execute the the thunk
var html = doc()

</javascript>
