--- 
layout: post
title: Best UK linux wireless broadband, May 2009 - T-Mobile and Ubuntu 9.04.
created: 1243167066
---
Ubuntu 9.04 and t-mobile wireless broadband.

I bought a t-mobile 'USB stick 110' (which is actually a Huawai E160 dongle).  It cost £40, including £20 credit.  It's PAYG, costing £2/day, with a 3GB monthly limit.

I plugged it into my laptop and a new connection appeared in the network manager.

Sceptically, I clicked to enable it - and *it just worked*.

No messing with kernels, mode switching or anything else.

The E160 is detected as an E220, which is fully supported by linux.

<code>
chris@vostro:~$ lsusb | grep Huawei
Bus 003 Device 004: ID 12d1:1003 Huawei Technologies Co., Ltd. 
E220 HSDPA Modem / E270 HSDPA/HSUPA Modem
</code>

Congratulations to the Ubuntu folks for doing such an excellent job here.
