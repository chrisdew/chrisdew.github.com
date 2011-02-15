--- 
layout: post
title: Design for mixing functional and imperative programming.  Not how Scala works.
created: 1265808063
---
I've been trying to rationalise the way in which I think imperative and functional programming can be brought together.  Primarily, this is an exercise in clarifying my thoughts on how I expected Scala to work.  (It doesn't work this way, possibly because it would certainly break interoperability with Java, but probably because Scala's author(s) are a lot cleverer than me.  This idea probably has implications of which I have not thought.)

I have structured my thoughts as a series of definitions.

<ul>
<li>Value (val) - a value is one or more bytes of information.  It is the information, not the storage location.</li>
<li>Cell - a cell is an area of address space of a fixed size.  It may be allocated on the heap or on the stack.  It may contain a value.</li>
<li>Type - a type is the interpretation of the bits within a cell, such as uint16_t, Char[], UTF-8 or reference-to unit64_t.</li>
<li>Mutable Type (mtypes) - a mutable type is a fixed length type which may be mutated in-place.  Mutable types include unit16_t and mrefs.
<li>Immutable Types (itypes) - an immutable type is a type which cannot be mutated in-place.  Immutable types include Strings, BigIntegers and and mutable type declared as immutable.
<li>Mutable Reference (mref) - a mutable reference is a pointer to a cell.
<li>Immutable Reference (iref) - an immutable reference is also a pointer to a cell.  The value of the iref cannot be changed (i.e. where it points).  The   referenced cell cannot change.  All irefs are therefore completely thread-safe.
</ul>
<strong>Interaction of Immutable and Mutable references.</strong>
An operation on a mutable reference (where there are no immutable references to it) changes the value in place.

Note: Examples in ugly C/Scala hybrid pseudo-code.
<code type="mylang">
mref a :*Int32 = 42 // syntactic sugar for 'new Int32(42)'   // reserves 4 bytes of RAM
mref b :*Int32 = a
b = b + 10
print a              // 52
print a              // 52
</code>


An operation on a mutable reference (where there are one or more immutable references to it) makes a new cell, copies the value into it, then mutates the new value in-place.  Thus the immutable reference points to the old 'version'.  
<code type="mylang">
mref a :*Int32 = 42 // syntactic sugar for 'new Int32(42)'   // reserves 4 bytes of RAM
mref b :*Int32 = a
iref c :*Int32 = a
b = b + 10           // this reserves an additional 4 bytes, copies the value 42 into them and adds ten
print a              // 52
print b              // 52 - the change to one mutable reference changes them all
print c              // 42 - the iref is still pointing at the original cell
</code>

Note: the new 'version' has now has no immutable references pointing at it, and so can be mutated in place. 
<code type="mylang">
mref a :*Int32 = 42 // syntactic sugar for 'new Int32(42)'   // reserves 4 bytes of RAM
mref b :*Int32 = a
iref c :*Int32 = a
b = b + 10           // this reserves an additional 4 bytes, copies the value 42 into them and adds ten (slower than in-place mutation)
print a              // 52 
print b              // 52 - the change to one mutable reference changes them all
print c              // 42 - the iref is still pointing at the original cell

b = b + 10           // this now works in place (i.e. it's fast), as the iref is pointing at the old cell, not the current one.
print a              // 62
print b              // 62
print c              // 42 - the iref is still pointing at the original cell
</code>

The 'implementation detail' of how to track the presence of immutable reference(s) to cells is not something I've gone into here.  It would probably be best folded into the whole garbage collection system.

I think that this approach could be very useful for mixing functional and imperative models.  It combines the efficiency of in-place operations with the thread safety of immutable references to immutable values (unlike Scala).  Any thoughts on this?
