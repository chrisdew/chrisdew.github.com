--- 
layout: post
title: Recombinant Hashes Demo
created: 1250574401
---
Sorry for the delay, I had more to learn about Apache's <a href="http://www.finalcog.com/apache2-proxypass-ubuntu-403-forbidden">proxypass</a> directive.

See http://www.finalcog.com/recombinant-hashes for some details of, and applications for, the algorithm.

The demo is now running, the urls are:
<ul>
<li>http://www.finalcog.com/hash</li>
<li>http://www.finalcog.com/combine</li>
</ul>

To use the demo:
<ol>
<li>Open the two urls in two browser windows side-by-side.</li>
<li>Type some words (16 chars max) into the /hash page - it will then show your data in hex, and twelve hashes of your data.</li>
<li>Cut and paste any five (or more) hashes into the /combine page and click submit.  It should recreate your original data from the hashes.  Note: you have to paste the hashes into their correct boxes.
</ol>

This demo deals with data on a tiny scale, just to get the principles across.  Real data would typically be handled as 4Kb chunks, with many 512 byte hashes made (and distributed) from each 4Kb chunk.  Any 9 hashes could be used to recreate an original 4Kb chunk.

I have performance tested the algorithm on a (single-core) Pentium M 1.6GHz, it can combine hashes at the rate of 5-6Mbit/s at 100% CPU load.  I have no reason to believe that performance won't scale linearly with CPU speed.  Also, the algorithm is embarrassingly parallel.
