--- 
layout: post
title: Extending Python's 'with' statement - or is 'with' semantically pointless.
created: 1223527755
---
Before this makes any sense, you'll needs to be familiar with '<a href='http://docs.python.org/whatsnew/2.6.html#pep-343-the-with-statement'>with</a>'.  It's really useful for safety.

Currently 'with' 'bookends' its contained code by calling __enter__() and __exit__() on the thing you're 'with-ing'.  __enter__ can return an object to be given to the contained code.

I'd like to extend __exit__ in the following way:
 * If it returns None, then it should function as it does currently - 100% backwards compatibility.
 * If it returns anything else, the 'with's *contained code* should be run again, and should be given the return value via it's 'as' variable.

This would then allow <a href='http://docs.python.org/whatsnew/2.6.html#the-contextlib-module'>context mangers</a> to be modified.  Context managers could then be allowed to yield *multiple times*.

How it this different from just using a generator instead of 'with'?  For example is there any difference between using:

<code type="Python">
>>> with open('foo', 'r') as f:
...     print f.read()
 

</code>
and

<code type="Python">
>>> def open_gen(filename, mode):
...     f = open(filename, mode)
...     yield f
...     f.close()
...
>>> for f in open_gen('foo', 'r'):
...     print f.read()


</code>
