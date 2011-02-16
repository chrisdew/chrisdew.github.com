--- 
layout: post
title: HTC Hero adb connection problems solved on Ubuntu Jaunty.
created: 1252957374
permalink: htc-hero-android-adb-0bb4-0c01-ubuntu-jaunty-0bb4-0c02-problem.html
---
<strong>Problem</strong>
I recently bought an HTC Hero android phone on Orange UK, but couldn't get <code>adb</code> to list it.

After plugging it into several different usb ports, using several different cables, I <em>still</em> couldn't make <code>adb devices</code> list it.

I then spent far more hours than I would care to admit, writing and rewriting <code>/etc/udev/rules.d/51-android.rules</code> according to many conflicting message board posts.

Finding https://bugs.launchpad.net/ubuntu/+source/hal/+bug/316215/comments/14 made me very nervous that I might have been sold a phone which had adb disabled.  Luckily that wasn't the case.

<strong>Solution</strong>
The fault was <em>not</em> with the setup of my Ubuntu 9.04 (Jaunty) laptop.

It was the phone.  There was a process running (in the background) on the phone called "HTC Sync".

When I killed this process off, the phone's USB id changed from <code>0bb4:0c01</code> to <code>0bb4:0c02</code> and it all worked perfectly.

I have 'hello world' running on my phone :-)  

