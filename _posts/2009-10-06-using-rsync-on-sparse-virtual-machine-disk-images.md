--- 
layout: post
title: Using rsync on sparse Virtual Machine disk images.
created: 1254830924
permalink: rsync-vm-sparse-inplace-kvm-vmware.html
---
<strong>Update: see <a href="/virtsync">VirtSync</a> for a better solution.</strong>

<strong>Background</strong>

I have a co-located server for hosting Virtual Machines (KVM and VMWare).  These virtual machines use sparse files as their disk images.  This saves a huge amount of space, without incurring too much of a slowdown - it also takes away the sysadmin headaches of having to add more disk images when a VM outgrows its initial allocation of space.

<strong>Task</strong>

I needed to backup these VMs (using LVM2 to get as consistent an image as possible) to a server at home - efficiently.

<strong>Fruitless Investigations</strong>

<ul>
<li>http://serverfault.com/questions/66338/how-do-you-synchronise-huge-sparse-files-vm-disk-images-between-machines</li>
<li>http://groups.google.com/group/mailing.unix.rsync/browse_thread/thread/94f39271980513d3</li>
<li>http://www.finalcog.com/synchronise-block-devices</li>
</ul>
<strong>Problems</strong>

Using <code>rsync --sparse</code> works, but causes a huge a mount of unnecessary disk writes.  Changing 10 bytes on 50GB long (1GB used) should cause only one or two blocks to be written, this causes 1GB to be written.  This is slow, and possible not good for the disks' longevity.

Using <code>rsync --inplace</code> works, but creates non-sparse files.

You cannot use --sparse and --inplace at the same time :-( this is disallowed by rsync.  
<code>rsync: --sparse cannot be used with --inplace</code>

<strong>Solution</strong>

If you use --inplace to update a pre-existing sparse file, the file will remain sparse <b>and</b> only have a small number of blocks written.  It's only when <code>rsync --inplace</code> <em>creates</em> a file that it makes it non-sparse.

So the solution is to create a corresponding, correctly-lengthed, empty, sparse file on the target machine for every file on the source machine - if the file isn't yet present on the target machine.

Then <code>rsync --inplace</code> will work as intended, leaving sparse files sparse, and only writing the changed blocks to disk.

If there's some interest on http://www.reddit.com/r/programming/comments/9rb98/using_rsync_on_sparse_virtual_machine_disk_images/  I'll package up my script nicely...

<strong>Update: see <a href="/virtsync">VirtSync</a> for a better solution.</strong>
