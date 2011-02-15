--- 
layout: post
title: "BarricaneDB - a transparent object persistence mechanism for NodeJS. "
created: 1297339002
---
GitHub - https://github.com/chrisdew/barricane-db
Documentation - http://www.barricane.com/barricane-db/

Status v0.2.0 - Just about works - there will be bugs.

BarricaneDB is a persistence layer for [NodeJS](http://nodejs.org/) which was developed to meet my following requirements:

* My app's state exists as a heap of objects in RAM.  I just want to be able to shutdown my app and get that same heap of objects the next time I start my app.
* I don't want to have to add or change more than a dozen lines of code.
* I want a proper transaction log, so that the data is resilient against application crashes.
* I want to be able to read the transaction log - I care more about making my app easily debuggable than saving disk space.

BarricaneDB is a loose implementation of the [Prevalence](http://www.ibm.com/developerworks/library/wa-objprev/) System Design Pattern, as implemented in Java by [Prevaylor](http://www.prevayler.org/), but for [NodeJS](http://nodejs.org/).

See the links at the top of the post, if you're interested.
