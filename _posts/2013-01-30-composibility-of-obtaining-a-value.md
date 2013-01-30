---
layout: post
title: Composibility of obtaining a value.
---

In programming languages, there are multiple ways of obtaining a value.  Some are nearly instant, some take time, or forever.  This is a short post on the problems of integrating time (and the outside world) into computer programs.

I have used C to illustrate some of these.

Group 1, from memory, directly or indirectly
--------------------------------------------
    int a = C;                 // assignment from a constant 
    int a = b;                 // assignment from a variable (on the stack)
    int a = *p;                // assignment from a dereferenced pointer
    int a = structure.element; // structures, and so on
    int a = access(args...)    // assignment from memory via a calculated reference
                               // think of properties from Python, etc. too

Group 2, calculation
--------------------
    int a = calc(args...)      // CPU intensive calculation of a pure function that hogs one or more cores

Group 3a, async IO
------------------
    function callback(int a) {...}
    asyncread(args..., callback); // think NodeJS too

Group 3b, blocking IO
---------------------
    int a = *p;                // if p is mmapped adn will cause a page fault
    int ret = blockingread(&a, args...); // causes thread to yield to kernel

Group 3p, polling IO*
---------------------
    int ret = pollingread(&a, args...); // does not block, but may not yeild a new value

(* I am unsure of the validity of including G3p, as it does not yield the sought type `a`, only a `Maybe a` - to use Haskell terminology).

Note that many of these methods of obtaining a value look identical, even though they are in diferent groups.  This leads to API confusion in many languages.  New languages should make things that behave differently look different. 

The differences between groups are important, as you can always wrap a method from a more primitive group as a more sophisticated way, but *never* the reverse.

Program flow constructs, such as `if` and `for` apply only to those values outside of G3a.

These groups impact directly on composability of code.

    +-----+-----+-----+-----+-----+-----+
    |     | G1  | G2  | G3a | G3b | G3p |
    +-----+-----+-----+-----+-----+-----+
    | G1  | G1  | G2  | G3a | G3b | G3p |
    | G2  | G2  | G2  | G3a | G3b | G3p |
    | G3a | G3a | G3a | G3a |  X  | G3a |
    | G3b | G3b | G3b |  X  | G3b | G3b |
    | G3p | G3p | G3p | G3a | G3b | G3p |
    +-----+-----+-----+-----+-----+-----+

(X marks composition as impossible.)

Composing blocking and asynchrous operations within one thread yields a situation where *no* progress on asynchronous composed operations can be made while any IO is blocking in the same thread.

Conclusions
-----------

1. New languages need to think about these issues carefully.  I want to write code that is "Group Generic" - i.e. my function will work not just on values, but on asynchronously obtained values too, without any change to my code.  (This will take people many times cleverer than I to sort out.)

2. For the time being, give up on blocking and use <a href="http://nikhilm.github.com/uvbook/index.html">libuv</a>.

Help
----

I need some better terms to categorise the sources of values.
Should I consider a page fault cause by accessing mmapped memory differently from a page fault caused by a overloaded machine?  I have assumed for simplicity that a machine should not be overloaded and that page faults do not happen on accessing runtime structures in memory. 

Further ramblings
-----------------

There is also the difference between a list of values, and an (asynchronous/blocking?) stream of values to consider.  I should be able to write code which is "Group Generic" over both, though the stream implementation may need to be richer in some way.

e.g. For a 'sum' function, intermediate sums of a stream may be required, when the values have paused for some time.  (Although that could also be valid for huge lists; think of updating a progress bar.) 

P.S.
----`

I am aware of <a href="http://stackoverflow.com/questions/10942450/haskell-lists-vs-streams">streams</a> in Haskell and <a href="http://en.wikipedia.org/wiki/Functional_reactive_programming">Functional Reactive Programming</a> though not much of practical use seems to have made it out yet.
