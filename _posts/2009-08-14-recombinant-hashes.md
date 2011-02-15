--- 
layout: post
title: Recombinant Hashes
created: 1250234162
---
A couple of years ago, while playing around with hash-function-generating-functions (as you do), I came up with a way of generating a (practically limitless) series of hash functions and a <strong>recombinator</strong>.  

Take a lump of data and use as many of these hash functions as you like to make hashes of the original data.

<strong>Now the magic...</strong>

Tell the recombinator the length (in bits) of the original data and give it <strong>any selection of the hashes</strong>, whose total length exceeds the size of the original data by at least one bit, and it will split out the original data.

This allows the generation of far more hashes than are needed, and provided that a quorum are available, the original data can be retrieved.  e.g. if you generated hashes, whose combined length was three times the length of the source data, then the source data could be recreated provided at least a third of the hashes were available.  

Note: that's <strong>any</strong> third of the hashes.

<strong>Uses</strong>

I'm trying to think of uses for this algorithm.  I've already considered distributed backups.  I'm really keen to hear of others...

<strong>Demo</strong>

If people are interested, I'll put a demo of this technology online.  Have I just reinvented the wheel here, or have I devised something new?

Also see http://groups.google.co.uk/group/hash-functions/browse_thread/thread/18c6a3eb2557ecc4

There is now a demo on http://www.finalcog.com/recombinant-hashes-demo
