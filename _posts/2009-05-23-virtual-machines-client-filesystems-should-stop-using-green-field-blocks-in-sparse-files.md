--- 
layout: post
title: Virtual Machines - client filesystems should stop using green-field blocks in sparse files.
created: 1243059376
---
A small change to client filesystems could stop unnecessary growth of virtual machine storage requirements.

Virtual machines' storage is often provided by sparse files.

Sparse files are space-efficient because blocks which solely contain zeros are not stored.  If a sparse file contains 100MB of zeros followed by 1MB of data, it's length will be 101MB, but it will only occupy 1MB of disk space.

There are problems with using sparse files as VM storage:<ul>
<li>If an area of a sparse file used to contain data, but now contains zeros, it will still occupy disk space.</li>
<li>If an area of a sparse file contains data, but it was been 'deleted' by the client OS, it will still occupy disk space.</li>
</ul>

The first problem could be mitigated by changes to the host's filesystem - so that it would 'free' blocks which were rewritten to contain only zeros.

Both problems could be mitigated by changes to the clients' filesystems.  There needs to be mount option to specify that a filesystem should prefer to re-use blocks over using green-field blocks.

Does any current filesystem do this?

How hard would it be to make such a modification?
