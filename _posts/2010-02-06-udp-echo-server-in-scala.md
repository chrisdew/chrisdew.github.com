--- 
layout: post
title: UDP Echo Server in Scala
created: 1265450454
permalink: udp-echo-server-scala.html
---
The UDP Echo Server seems to be the 'hello world' of network programming.

<strong>What is Scala?</strong>
<a href="http://www.scala-lang.org/">Scala</a> is a hybrid OO/functional programming language which runs on the Java Virtual Machine.

I gave it a try after spending three hours trying (and failing) to get the Haskell Eclipse <a href="http://eclipsefp.sourceforge.net/eclipsefp2.html">plugin</a> to work on Ubuntu 9.10.  This was after spending half a day trying to get <a href="http://leksah.org/">Leksah</a> to install.  (Which it did, but it still refused to give me auto complete - my most important requirement.)  By this point I was really cross with Cabal, hacked-off with Hackage and looking for an alternative functional language which would "just work" in Eclipse. 

I had already ruled out Erlang (which I really like) as just too slow for CPU-bound apps, and Clojure because of all the brackets (yes, I know they let me write the AST directly and give me flashy macros, but I want to be able to read my code).  Scala is as fast or slow as Java depending on your viewpoint - that's roughly 50% the speed of C++ these days, similar to Haskell's <a href="http://shootout.alioth.debian.org/u32/which-programming-languages-are-fastest.php?calc=chart&gpp=on&java=on&scala=on&csharp=on&ghc=on&v8=on&hipe=on&vw=on&yarv=on&python=on&perl=on">speed</a>.  

<strong>Installing Scala</strong>
<ul>
<li>I installed scala with <code>sudo aptitude install scala</code> - which just worked first time.</li>
<li>I installed the Eclipse plugin from http://www.scala-lang.org/node/94 with four clicks, and one url cut-and-paste.</li>
<li>Twenty minutes later, I had a working UDP Echo Server.</li>
</ul>
I really wish other languages were this easy with which to start coding.  If you're at all interested in functional programming, I'd recommend Scala as a good place to start.  A Java background will make life easier, as you will already be familiar with the libraries - though that's not at all a requirement.

<code type="scala">
package com.finalcog.udpEchoServer

import java.net.DatagramPacket
import java.net.DatagramSocket

object udp_echo_server {
  val bufsize = 16;
  val port = 4444;
  
  def main(args : Array[String]) : Unit = {
    println("udp echoserver started...")
    
    val sock = new DatagramSocket(port)
    val buf = new Array[Byte](bufsize)
    val packet = new DatagramPacket(buf, bufsize)
    
    while (true) {
      sock.receive(packet)
      println("received packet from: " + packet.getAddress())
      sock.send(packet)
      println("echoed data (first 16 bytess): " +
                packet.getData().take(16).toString())
    }
  }
}

</code>

Note: The java.net imports are importing Java classes - it's that easy.

P.S. Any feedback on this programme gladly received, it is my first in Scala.
