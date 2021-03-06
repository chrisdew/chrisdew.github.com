---
layout: post
title: Eclipse/CDT/autotools - No rule to make target 'all'.  Stop.
---

When you create an autotools Helloword project in Eclipse (on Ubuntu, at least) it is not ready to build.  In order to for Eclipse to be able to build the project, you need to perform the following steps:

    $ aclocal

This generates the file aclocal.m4 and adds it to the current directory. 

Next, run autoconf:

    $ autoconf

After running autoconf you will find the configure script in the current directory. It's important to run aclocal first because automake relies on the contents on configure.in and aclocal.m4.

There are a few files that the GNU standard says must be present in the top-level directory, and if not found Automake will report an error.  Enter the following command to create these files:

    $ touch AUTHORS NEWS README ChangeLog

Now we can run automake to create Makefile.in. The --add-missing argument copies some boilerplate files from your Automake installation into the current directory. 

    $ automake --add-missing

    $ ./configure

    $ ./make

The 'make' command should have built your project for you.
