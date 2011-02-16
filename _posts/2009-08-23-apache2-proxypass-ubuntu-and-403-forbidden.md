--- 
layout: post
title: Apache2, ProxyPass, Ubuntu and 403 Forbidden
created: 1251026222
permalink: apache2-proxypass-ubuntu-403-forbidden.html
---
I have spent an hour figuring this one out - I wanted to allow a couple of specific URLs on this website to be proxied through to another webserver, but I kept getting 403 Forbidden errors and no useful log output.

The reason was simple enough, once you know it.  As well as the ProxyPass and ProxyPassReverse directives, you also need to allow access in a Proxy section:


        ProxyPass /hash http://localhost:8000/hash
        ProxyPassReverse /hash http://localhost:8000/hash
        ProxyPass /combine http://localhost:8000/combine
        ProxyPassReverse /combine http://localhost:8000/combine

        &lt;Proxy http://localhost:8000/&gt;
                Order Allow,Deny
                Allow from all
        &lt;/Proxy&gt;


Note: Drupal automatically turned the above localhost urls into links, I don't know if this behaviour can be turned off.  In a code tag, it makes a complete mess.

I found the answer at http://ubuntuforums.org/archive/index.php/t-624818.html - thanks to MJN.

This problem related to http://www.finalcog.com/recombinant-hashes-demo
