---
layout: post
title: Reboot on Kernel Panic
---

Last week, a server crashed with a kernel panic.  It stayed crashed all night.

This seems to be the default behaviour wuth Ubuntu server 12.04.

I did some research.  Running the following command will make a machine reboot 15 seconds after a kernel panic.

    chris@svr3:~$ echo "kernel.panic = 15" | sudo tee /etc/sysctl.d/10-reboot-on-panic.conf

I've now done this for all my servers.

Kernel panics shouldn't happen.  But if they do, I want a speedy reboot, not a screen full of CPU registers.
