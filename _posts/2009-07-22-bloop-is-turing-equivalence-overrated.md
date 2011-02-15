--- 
layout: post
title: Bloop - is Turing Equivalence overrated?
created: 1248245070
---
<strong>Introduction</strong>
<a href='http://en.wikipedia.org/wiki/Douglas_Hofstadter'>Douglas Hofstadter</a> introduced a language called <a href='http://en.wikipedia.org/wiki/BlooP_and_FlooP'>Bloop</a> in his excellent book <a href='http://en.wikipedia.org/wiki/Gödel,_Escher,_Bach'>Gödel, Escher, Bach: An Eternal Golden Braid</a>.

It was used as a point of demonstration and argument, rather than being proposed as a useful language.

Bloop is unusual as it is a computer language which is not <href='http://en.wikipedia.org/wiki/Turing_completeness'>Turing Complete</a>.  i.e. you cannot implement a Turing Complete language, such as C, Floop, Java or Haskell in Bloop.

Any Turing Complete language can be used to implement any other Turing Complete language.  You can write a Java interpreter in Haskell, or a Haskell interpreter in Java.

Bloop is missing the unbounded loop.  

It can loop through a set of values or objects, but a maximum number of iterations must be set before the loop commences.  Therefore Bloop is useless for interactive programmes (loop until the user presses a key) and a certain class of algorithms cannot be implemented in Bloop (<a href='http://en.wikipedia.org/wiki/Primitive_recursive_function'>primitive recursive functions</a> - yes, partial recursive functions - no). 

<strong>Consequences</strong>
The consequence of missing the unbounded loop, is that a Bloop programme <strong>will always halt</strong>.

It is impossible to make a Bloop programme which gets stuck in an infinite loop.  (Though exhausting the stack by writing an infinite loop as inifinite recursion, is possible - but that's just plain mean.)

<strong>SQL</strong>
The only other language, in common usage, which is not Turing Complete, is SQL.  (Though there may be Turing Complete extensions to the language.)

You may have seen a query take a long time, but have you ever seen one get stuck in an infinite loop?

<strong>Well, is Turing Equivalence overrated?</strong>
There are some problem domains where the full power of partially recursive functions are not needed and where the guarantee on halting is essential.  These cases would be well-served by a Bloop-equivalent language.

(I'm currently in the process of writing a toy Bloop-equivalent VM, to test some ideas with regard to <a href='http://en.wikipedia.org/wiki/Functional_reactive_programming'>Functional Reactive Programming</a>.) 

This article continues an idea started in <a href='/haskell-decoupling-time-from-physics'>Decoupling time from Physics</a>.
