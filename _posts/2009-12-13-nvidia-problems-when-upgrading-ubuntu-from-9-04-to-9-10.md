--- 
layout: post
title: Nvidia problems when upgrading Ubuntu from 9.04 to 9.10.
created: 1260736180
---
I upgraded my laptop today.  When I restarted, it gave me that dreaded choice of 'low-graphics mode'.  X was well and truly borked.

The error was:
<code>
(II) Module nvidia: vendor="NVIDIA Corporation"  compiled for 4.0.2, module version = 1.0.0 
FATAL: Module nvidia not found. 
(EE) NVIDIA: Failed to load the NVIDIA kernel module. Please check your 
(EE) NVIDIA:     system's kernel log for additional error messages.
</code>

The solution was to edit xorg.conf to use the 'nv' driver, reboot, and then use System>>Hardware Drivers to install version 173.
