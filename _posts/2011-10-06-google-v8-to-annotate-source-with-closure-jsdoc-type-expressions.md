---
layout: post
title: Google V8 to annotate source with Closure JSDoc Type Expressions
---

I would a like a new tool to help with Javascript development, both in NodeJS and (possibly) on the browser.

What I want is to be able to run (and/or unit test) a NodeJS app (on the built-in V8).  As an extra *output* I would like a transformed version of the source, annotated with <a href="http://code.google.com/closure/compiler/docs/js-for-compiler.html#types">Google Closure JSDoc Type Expressions</a>.

I can't see any technical reason why this would not be possible.

Who will write this?  It's probably a few weeks of fulltime work, or more if you don't already know the innards of V8.


Why would it be useful?

1. It allows the flexibility of untyped development, without the maintenance burden.
2. A developer will quickly spot any unexpected types, leading to bug fixes.


Please Google, Joyent, or Anyone Else, can you write this for us?

Thanks,

Chris.

