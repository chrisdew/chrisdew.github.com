---
layout: post
title: Review of 'Node Web Development' by David Herron.
---

The folks over at <a href="http://www.packtpub.com/">Packt</a> have sent me a copy of <a href="http://link.packtpub.com/E7v1eK">Node Web Development</a> to review.

I've been using Node in production for eighteen months now, so I am not the target audience for this book, but I am now in a position to have a good overview.

It is a very clear introduction for developers who already have experience of web development.

Even for a developer who has been using Node for some time, it is a useful reference.  For example, I was not up to speed on how NPM had changed since the early days, especially the node_modules search paths. 

The text covers the creation of a couple of web application in Node and the use of both SQLite and MongoDB as storage back ends.  Once you are familiar with async access to databases, using MySQL or Postgres is no huge leap.

There are a couple of important areas of Node development which are not covered, probably due to the short length and introductory nature of this book.  These are:

SocketIO:  SocketIO is one of the best developments to have been built on top of Node and it is one of the clear advantages of using Node over other languages/frameworks.

Complex async behaviour:  When writing and non-trivial application in Node, a developer will soon need to coordinate the dependencies between multiple callbacks.  This is one of the more *interesting* areas of current investigation, proposed solutions include promises, streamline and step.

All in all, a very clear introduction.
