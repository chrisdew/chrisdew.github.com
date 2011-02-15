--- 
layout: post
title: Ease-of-setup of virtualisation on Ubuntu Server 8.10 blows Fedora 9 away.
created: 1226156246
---
I initially installed Fedora9, as the host operating system on my server, as I wanted try oVirt.  oVirt fell short of my requirements, so I naively thought that I would just use that same Fedora 9 installation to run VMs via virt-manager.

After 3 hours of googling the various error messages, I gave up and replaced it with a fresh install of Ubuntu Server 8.10.

<code>
sudo aptitude install virt-manager
</code>

That was all it took to get a working virt-manager and kvm :-)
