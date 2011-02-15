--- 
layout: post
title: Speed of Mutable vs Immutable objects in Scala.
created: 1265744557
---
After finding that there was no easy way to get immutable collections to 'snapshot' the state of their contained objects, I realised I would have to use only immutable objects.  (See <a href="http://www.finalcog.com/immutable-containers-scala">the previous post</a>.)

Immutable objects are much more costly to modify (not modify per se, but to create a new object that almost the same as the old one).  A new object has to be created on each mutating method call.  There is also then the garbage collection which needs to be done.

I did a little informal benchmark:

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
    
    println("2 billion method calls on mutable point")
    var i = 0
    var point = new Point(0,0)
    while (i < 2000000000) {
      point.move(1,1)
      i = i + 1
    }
    println("point: " + point)
    
    println("200 million method calls on immutable point")
    i = 0
    var ipoint = new ImmutablePoint(0,0)
    while (i < 200000000) {
      ipoint = ipoint.move(1,1)
      i = i + 1
    }
    println("ipoint: " + ipoint)
    
    println("finished.")
  }
}


</code>

The result is that the immutable loop (which is a magnitude smaller) is much slower than the loop modifying the mutable object.

It looks like Scala cannot do what I want, as efficiently as I hoped.  Creating new immutable objects is between one and two orders of magnitude slower than modifying mutable objects.
