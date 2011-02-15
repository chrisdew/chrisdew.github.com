--- 
layout: post
title: c++ initialisation lists
created: 1218438309
---
Despite having coded in c++ for a several years, I looked at this and thought ?!?.  It turns out that this is an obscure, but perfectly valid c++ construct, an <a href="http://www.cprogramming.com/tutorial/initialization-lists-c++.html">initialisation list</a>.  
<code type="c">
// TCP digest calculation

TCPDigest::TCPDigest (DigestAlgorithm *alg_to_use, SigKey &key):
        counter(0),
        alg (alg_to_use ? alg_to_use->clone( key ):
                          new HMAC_MD5_Algorithm (key)),
        key (key)
        // here request signatre should be taken to digest
{
}
</code>

It's primary purpose is to allow the developer to choose which superclass constructors would be called, and with what parameters (especially in the case of multiple inheritance).  The <a href="http://www.cprogramming.com/tutorial/initialization-lists-c++.html">initialisation list</a> can also assign values to member variables, by using pseudo functions having the same name as the member variables.  i.e. the above code assigns a value of 0 to counter.

The driving force in using an <a href="http://www.cprogramming.com/tutorial/initialization-lists-c++.html">initialisation list</a> in this source was that it is a valid way of initialising class members which are <b>references</b>, rather than normal variables.  (In this case 'key' is declared <code>foo &key;</code> in the header).)

