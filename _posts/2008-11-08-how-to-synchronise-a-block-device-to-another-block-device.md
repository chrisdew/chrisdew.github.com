--- 
layout: post
title: How to synchronise a block device to another block device.
created: 1226148833
---
Context: Fedora 9 and Ubuntu 8.10.

As part of setting up virtual machines, I find myself periodically needing to synchronise an unchanging block device (an LVM2 snapshot of the block device holding the VM images) to another block device (which does not need to be read or changed by other processes during the synchronisation).

I only want the changed blocks to be written to the destination block device.  I do not want pointless writes (i.e. writes which just rewrite the same data) to occur.

Initially this will initially only need to be done locally, but eventually I will need to do this across a network.

<ul>
<li>A straightforward dd is wasteful - it seems to write the block, even if it doesn't need to be written.  (This will be the case for 99%+ of the blocks.) </li>
<li>rsync is network-efficient, but creates a new file, which only replaces the target file just after it has finished transferring.  This therefore looks like it will be inefficient.</li>
</ul>

A naive algorithm to do this is simple:

MD5 hash the source and target devices.  If they're the same, do nothing.  Otherwise try hashing the first and second halves of the source and target devices.  If either of these halves are different then carry on doing this recursively, until you get a map of all the changed blocks.  Only the changed blocks then need to be transferred.

I'm assuming there is already a programme which will do this - could anyone enlighten me?
