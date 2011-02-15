--- 
layout: post
title: Experiments in the Cheese Shop
created: 1222888281
---
I recently wrote two small python modules, and have put them on the cheese shop.  Before I started the process, I had never packaged python code for distribution, but it turned out to be quite painless.

The modules are <a href='http://pypi.python.org/pypi/timeout'>timeout</a> and <a href='http://pypi.python.org/pypi/completion'>completion</a>.  They can either be downloaded as a tar.gz from the links in the last sentence, or they can be installed by 'easy_install timeout' and 'easy_install completion'. 

Timeout is a module containing a couple of simple decorators, allowing functions to be defined to 'timeout' if they have do not return within a set interval.

Completion is simple autocompletion code, inspired by <a href='http://pyparsing.wikispaces.com/'>Pyparsing</a>.  You define a grammar programatically.  The parser can then be called with text which is incomplete, according to the grammar, and suggestions of what to add to the text will be returned.  

As you can see from the code, I'm becoming a doctest junkie and starting to believe in test driven development.  I'm very impressed with doctest's simplicity.  Completion took me only a couple of hours to write - I wrote each doctest first, then the code to make it pass.
