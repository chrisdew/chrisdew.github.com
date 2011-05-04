---
layout: post
title: The Secret Life of Unit
---

Unit is an interesting concept from algebraic type theory.  

Unit is the type which has **only one possible value**.  

Having only one possible value means that the value of a variable of type Unit is unimportant.

In Haskell it is written () and is mostly used as a parameter to other type constructors.

It exists in many non-functional languages, but not in plain sight.

Unit in C bitfields
-------------------
int <fieldname> : 3 can represent values 0-7 (unsigned)

int <fieldname> : 2 can represent values 0-3

int <fieldname> : 1 can represent values 0-1

int <fieldname> : 0, if it was valid, could be Unit 

(it's actually overloaded as an alignment operation in C)

Unit is the value which no bits contain.

Unit in SQL
-----------
If a column could have type Unit, that field would be equal for every row.
If a unique index were placed on a column of type Unit, that table would be constrained to having a single row.
NULL has semantics which are too complex and varied to be Unit - but it's a close cousin.

Unit as nullable references
---------------------------
Nullable types and references can either have a value of a type (e.g. int) or no value at all.  Nullables types are <a href="http://en.wikipedia.org/wiki/Tagged_union">tagged unions</a> of a type and unit. 

Unit as the type of Null or Void in Statically Typed OOP languages
------------------------------------------------------------------
Functions which return objects, implictly return a tagged union of the type and unit.  A Java method with the signature:

public Person findByAddress(String address)

It implicitly declares findByAddress as returning either a Person, or Null.  Null has only one value.  Null has a type of Unit.

(The implementation of this tagged union may be a single word, but as the value zero is not available as a valid pointer, it's still theoretically sound.)

The imperative conspiracy to make Unit disappear
------------------------------------------------
For some reason, imperative languages, and even SQL, seem to go to some lengths to make Unit unusable.

In C, you can't have zero length bitfields.

In SQL you can't have zero length bitfields, and you can't declare a column having type of NULL (which would be quite near Unit, if not identical).

