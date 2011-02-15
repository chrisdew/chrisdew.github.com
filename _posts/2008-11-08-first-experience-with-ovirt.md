--- 
layout: post
title: First experience with oVirt
created: 1226128150
---
<a href='http://ovirt.org/'>oVirt</a> is a 'RedHat emerging technology project'.

It's a Ruby-on-Rails app for configuring virtual machines.  I've installed it and have the following opinions about the project and software:

<ol>
<li>The project has no easily findable discussion group.  Nothing on google groups.</li>
<li>It uses Kerberos - i.e. if you're ignorant of Kerberos (I am) you can only connect to the web interface from the machine on which you have installed oVirt.</li>
<li>It does not initially seem possible to create new users on the system.  I think I may need to ue a separae Kerberos system.</li>
<li>It only, currently, allows VM storage to be on iSCSI or NFS, not on a local disk.</li>
</ol>

These problems, especially point 4, are driving me towards evaluating <a href='http://libvirt.org/'>libvirt</a> and its Python bindings.

As I have one potential customer who needs a VM ASAP, I will configure that one manually (and later integrate it with oVirt, some custom Python/libvirt system or a Python/bash system).
