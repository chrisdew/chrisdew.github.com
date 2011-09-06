---
layout: post
title: The D Language is Really Practical.
---

I'd like to take a minute to thank Walter Bright for creating the <a href="http://en.wikipedia.org/wiki/D_(programming_language)">D programming language</a>.

I had a project, which I had previously written in Python, but which I now needed to port to a more runtime-efficient langauge (a single static executable and obfuscated source are also a bonus for a commercial product).

The standard library (for D 2.0) had all the file a directory manipulation functions I needed, easily as rich as Python and an awful lot easier to use than APR or POSIX.

I had initally attempted the port using C and the Apache Portable Runtime, but I found it hard work after years of Python and Javascript.  I quickly got bogged down in memory pools, string handling and shared state.

I decided to give D a try:

* Running D programs as scripts is as easy as adding '#!/usr/bin/dmd -run' to the top of the source file.  This alson must have saved me a few hours.
* String handling is sane, as is just about everything else in the langauge.
* Concurrency is well thought out.
* They've produced a 64 bit compiler, since I last looked a year ago. 

There are a couple of issues:

* I'm still trying to find a Debian Packaging or Autotools Howto for D.
* You may start to dislike writing C/C++.

Basically, if your now mostly a script programmer and think you need to do go back to C for some lower level work, give D a try.
