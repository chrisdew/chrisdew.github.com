--- 
layout: post
title: How to install Debian Lenny on ARM on Qemu on Ubuntu Jaunty.
created: 1255376365
permalink: howto-install-debian-lenny-arm-qemu-ubuntu-jaunty.html
---
The hosting environment is assumed to be Ubuntu Jaunty, with qemu already installed.

First, get the files you'll need:
<code>
$ wget http://ftp.de.debian.org/debian/dists/lenny/main/installer-armel/current/images/versatile/netboot/initrd.gz
$ wget http://ftp.de.debian.org/debian/dists/lenny/main/installer-armel/current/images/versatile/netboot/vmlinuz-2.6.26-2-versatile
</code>

Create a disk image:
<code>
$ qemu-img create -f qcow hda.img 10G
</code>

Then start qemu:
<code>
$ qemu-system-arm -M versatilepb -kernel vmlinuz-2.6.26-2-versatile \
-hda hda.img -initrd initrd.gz -append "root=/dev/ram" -m 256
</code>

Now the Debian installer will start - it looks almost identical to the 'normal' x86 installer - but it is <em>many</em> time slower...
