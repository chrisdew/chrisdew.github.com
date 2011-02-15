--- 
layout: post
title: Simple encapsulation in Javscript.
created: 1264164278
---
In the spirit of 'doing the simplest thing which works', I've been using the following idiom for encapsulating data within objects.  I'm still quite new to Javascript, so I'm sure others have been doing similar things for a long time, in a more elegant fashion (I must get round to reading the jQuery source).

A naive object is:
<code type="javascript">
var account = { name    : "fred"
              , balance : 100.00
              , branch  : "Worcester"
              } ;


</code>

My current favoured method for encapsulation is to use a constructor-function (not a javascript constructor, they're a bit nasty). 

The constructor-function returns an interface object containing methods.  Only these methods have access to the member variables held within the constructor-function's closure. 
<code type="javascript">
var new_account = function(name, branch) {
    // constructor-type code
    var _name    = name ;
    var _balance = 0.0 ;
    var _branch  = branch ;

    // create the *interface*
    var _interface ;
    _interface = { getName     : function()       { return _name ; }
                 , getBalance  : function()       { return _balance ; }
                 , getBranch   : function()       { return _branch ; }
                 // return of _iface below is to allow jQuery-style method chaining.
                 , credit      : function(amount) { _balance += amount ; return _iface ; } 
                 } ;

    // return the interface
    return _interface ;
}


</code>

This approach has problems with inheritance, but personally I have found inheritance to be unneeded in Javascript.  It's loosely typed language - so interface inheritance is moot.  Implementation inheritance is easily (and probably better) done as a has-a relation.
