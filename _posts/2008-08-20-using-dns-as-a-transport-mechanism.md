--- 
layout: post
title: Using DNS as a transport mechanism.
created: 1219215694
---
Any form of communication can be used as a transport mechanism.  DNS is slower than direct UDP or TCP, but is still usable.

It's possible (I've written a python/twisted tunnel client and DNS server to do so) to use perfectly valid DNS requests and responses to enable two way communication.  The communication must be initiated by the DNS client, but once established, two way communication is possible.  (My programme proxies TCP streams, but there's no reason why such a tunnel couldn't be plugged into the Linux TUN/TAP module - then it wouldn't have to implement it's own ordering and reliability mechanisms.)

Note: This communication is perfectly valid DNS, not just a service using UDP on port 53.  An (encrypted, encoded) outgoing packet could be a request for a TXT record for h7dk9f4dh5hkjjh6vvgfrtdrd5....7656gt6.adomainwhichicontrol.com.  (With full-stops between each 63 characters.)

There's also the simpler task of using DNS as a download transport, for those situations where all other communication is, or could be, blocked.  In this case, rather than needing a custom DNS server, a regular instance of bind can be used.  An encoding programme can accept a private key and a file and produce a zone containing the file (split into many ~200byte resource records).  A corresponding download module can accept the name of the zone and a public key (which must be the other half of the key with which the file has been signed/encrypted).  I have an Java (alpha-quality) implementation of this, but without the encryption/signing.  Maybe it's time to rewrite in Python?
