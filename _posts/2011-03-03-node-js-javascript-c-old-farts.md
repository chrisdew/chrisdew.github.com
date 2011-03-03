---
layout: post
title: NodeJS, C, Old Farts and Script Kiddies
---

This blog post is written mainly as a response to many of the [comments](http://forums.theregister.co.uk/forum/1/2011/03/01/the_rise_and_rise_of_node_dot_js/) on [an article on the register](http://www.theregister.co.uk/2011/03/01/the_rise_and_rise_of_node_dot_js/).

Firstly my background:
----------------------

I'm an old fart (36).  I have been coding in C for 14 years on and off.  I know sockets and I have written a kernel module.  (I also use Java, Python, C++ and Javascript professionally, and play around with Haskell and Scheme.)

An Old Fart uses NodeJS.
------------------------

I chose NodeJS, in preference to C, for essential parts of our current project, [xlocate.net](http://www.xlocate.net) almost a year ago.

Why?
----

[NodeJS](http://nodejs.org/) lets me build and change a loosely-coupled system  much more quickly than I ever could in C.

One system component, the broker, is an HTTP Client and talks JSON over Multicast UDP, WebSockets and JSON over TCP.  Another uses MySQL and JSON over TCP.

These protocols have been easy in integrate, thanks to the wealth of projects in [NPM](http://npmjs.org/) and [GitHub](https://github.com/).

Future Proof?
-------------

If any of these processes get overloaded, our team have the skills to recode in C, as, where and when neccessary (and not before).

Jealous?
--------

We old farts have every reason to be jealous.  Were scribes happy about the printing press?

NodeJS makes it possible for a script kiddie to create a server app **without even knowing what a file descriptor is**.  With NodeJS their server app can process thousands of messages per second and deal with thousands of connections simultaneously.

The memory footprint may be 100 times greater than the same thing written in C 
nd the speed may be a tenth of a well-written C program.  But, it will work reliably and without causing too much load on a modern server.

This allows them to deliver **more value** to their customers **more quickly**.

Bitter?
-------

Our experience in socket programming in C has just had its applicability drastically slashed.  Knowing low level stuff will always be useful - it's just never **as useful** as it used to be, until there's a [problem](http://www.joelonsoftware.com/articles/LeakyAbstractions.html),

Don't be bitter - use the script kiddies' tools, when appropriate.

P.S. This post was written in VIM, in true old fart style.
