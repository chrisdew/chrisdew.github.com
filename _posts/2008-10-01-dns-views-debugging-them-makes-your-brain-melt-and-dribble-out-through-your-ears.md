--- 
layout: post
title: DNS views - debugging them makes your brain melt and dribble out through your ears.
created: 1222891985
---
As soon as you introduce views into DNS, the pain begins.  (Views, also known as split horizon DNS, are a way for a single DNS server to give different (or no) answers to the same question depending on who's asking, or from where they're asking.  Views allow mail.foo.com to resolve to 10.1.2.3 inside Foo Inc.'s London LAN, to 192.168.3.7 inside Foo Inc.'s Madrid office, but to 123.45.67.89 when answering queries from the internet.  This is convenient for mobile users [though properly setup DHCP would be better].)

The conventional DNS architecture is to have a hidden master DNS server, which answers queries only from it's slaves.  If each view has one or more separate slaves, then there is no problem.  If an organisation wants to make more efficient use of it's computing resources, then it makes sense for the slaves to be able to serve multiple views.  

The question becomes how does each slave query the hidden master in such a way that the master responds with answers correct for each view.  The current solution is to choose one of a selection of ugly hacks, with multiple IP addresses on the master and each slave, or TSIG keys, or some unholy combination of these approaches.  It can be made to work, but your brain may melt and drain through your ears while debugging intermittent problems.    

The central problem is that AXFR does not know about views.  The slave can't ask the master for a zone transfer for zone foo.com in view LONDONLAN.  It has to convince the master that it has the right characteristics to be served *only* view LONDONLAN, then ask for the zone.  Of course, if it also needs to serve the MADRIDLAN view, it then has to counterfeit characteristics to be given *only* the MADIDLAN view of the master, as it request foo.com for a second time.  These characteristics could be a second IP address, or a TSIG key.  Of course, once we have to make sure that NOTIFYs are sent to the right slaves, things get progressively more ugly.

Basically, NOTIFY and AXFR were not designed for views.

What else is there?

There are other ways of getting all the DNS information out to slaves which must serve multiple views.  They have some drawbacks, but all seem cleaner than AXFR.

1. Synchronise zone files via rsync over ssh and get bind to reload zones via rndc.
2. Don't use BIND as the master.  Once you're not using AXFR/NOTIFY, you may as well just use a database for DNS data storage.  There are many ways to get data out from a central database and into the slaves.
3. Suggestions?

  
