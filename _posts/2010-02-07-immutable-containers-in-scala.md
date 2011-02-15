--- 
layout: post
title: Immutable Containers in Scala
created: 1265534077
---
I'm evaluating Scala and am having a problem with it's immutable collections.

I want to make immutable collections, which are completely immutable, right down through all the contained objects, the objects they reference, ad infinitum.

Is there a simple way to do this?

The code below illustrates what I'm trying to achieve, and a nasty work around (ImmutablePoint).

The problem with the workaround is that every time I want to change an object I have to manually make a new copy.  I understand that the runtime will have to implement copy-on-write, but can this be made transparent to the developer?

I suppose I'm looking to make Immutable Objects, where methods change the current object state, but all other 'val' (and all immutable container) references to the object retain the 'old' state.

Any comments/replies to http://stackoverflow.com/questions/2216524/how-to-make-scalas-immutable-collections-hold-immutable-objects please.

<code type="scala">
package com.finalcog

class Point(xc: Int, yc: Int) {
  var x: Int = xc
  var y: Int = yc
  def move(dx: Int, dy: Int) {
    x = x + dx
    y = y + dy
  }
  override def toString(): String = "p(" + x + ", " + y + ")";
}

class ImmutablePoint(xc: Int, yc: Int) {
  val x: Int = xc
  val y: Int = yc
  def move(dx: Int, dy: Int): ImmutablePoint = {
	new ImmutablePoint(x + dx, y + dy)
  }
  override def toString(): String = "ip(" + x + ", " + y + ")";
}


object immutability_test {
  def main(args : Array[String]) : Unit = {
    println("immutability_test started...")
  
    // Just check that the point classes are working
    // as we expect.
    val point0 = new Point(1, 2)
    point0.move(1, 1)
    println("point0: " + point0)
    
    val ipoint0 = new ImmutablePoint(1,2)
    val ipoint1 = ipoint0.move(1, 1)
    println("ipoint0: " + ipoint0)
    println("ipoint1: " + ipoint1)
  
    // Now illustrate the problem I have with immutable
    // containers.
    val pointA = new Point(1, 2)
    val list_of_point = List(pointA)
    println("list_of_point: " + list_of_point)

    // Change the mutable object in the immutable container.
    // This is what I don't want, I want a completely immutable 
    // list, where changed objects retain their 'old' values
    // in immutable containers.  Is this possible in Scala?
    val pointB = pointA
    pointB.move(10, 10)
    println("list_of_point (after move): " + list_of_point)
    
    // A failed attempt at getting what I want.  It works,
    // but the syntax is horrid.
    val ipointA = new ImmutablePoint(3, 4)
    val list_of_ipoint = List(ipointA)
    println("list_of_ipoint: " + list_of_ipoint)
    
    // Make a new immutable object by moving an old one.
    val ipointB = ipointA.move(10, 10)
    println("list_of_ipoint (after move): " + list_of_ipoint)
    
    // exit code
    0
  }
}

</code>

Replies to 
