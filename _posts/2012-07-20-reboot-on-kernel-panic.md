---
layout: post
title: Reboot on Kernel Panic
---

Last week, a server crashed with a kernel panic.  It stayed like that overnight.

I did some research.  Running the following command will make a machine reboot 15 seconds after a kernel panic.

    chris@svr3:~$ echo "kernel.panic = 15" | sudo tee /etc/sysctl.d/10-reboot-on-panic.conf

