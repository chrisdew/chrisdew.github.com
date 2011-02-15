--- 
layout: post
title: Convert a .a file into a .so shared archive.
created: 1215327533
---
Sometimes it's useful to be able to convert a <a href="http://en.wikipedia.org/wiki/Ar_%28Unix%29">.a file</a> into a <a href="http://en.wikipedia.org/wiki/Library_%28computing%29#Naming">.so shared object library</a>.  A better way is to modify the Makefile, or dig deep into autotools, and recompile/relink.

The command I use is:

<code>ld --whole-archive -shared -o lib.so lib.a</code>

Where 'lib' should be replaced with the name of the library which you are converting.  This has worked for me, but your milage may vary.

The created shared object library will be larger than a properly created .so.  This is because the object files in the .a library will have statically included some libc (and other) code which a properly created shared object library could share instead.  
