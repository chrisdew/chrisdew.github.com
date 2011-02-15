--- 
layout: post
title: Roadmap for Cooperative Virtual Machine Hosting (timescales to follow).
created: 1225347835
---
I now have a level of interest in hosting virtual machines, sufficient to allow me to make a start.  I've not yet got the 10 interested potential users for who I was looking, but I am now happy to colocate one server and build a failover server to sit on my home broadband - until we get more users.
<ol>
<li>Setup oVirt on my spare Dell server (dual core, 1.5Gb RAM, 2x320Gb SATA, 2x4Gb CF card for host OS).</li>
<li>Connect the server to the internet via my home broadband - I have a /29 subnet (five free public internet-routable addresses).</li>
<li>Invite interested parties to set up VMs.</li>
<li>Wait 1-2 weeks to see if issues emerge.</li>
<li>Upgrade RAM, processor and disks (quad core, 8Gb RAM, 2x1.5Tb SATA, 2x4Gb CF card for host OS).</li>
<li>Build identical failover server for home and configure 'boxbackup' to synchronize.</li>
<li>Ship server to UKShells colocation facility in Birmingham.</li>
<li>Ask users to actually pay £6/£10 per month and see how many are still interested.</li>
<li>Marketing.</li>
<li>If more than 5 users, build a new server (4x1.5Tb), and ship failover server to colocation facility.</li>
<li>Modify the oVirt software to enable automated billing by Mb bandwidth, GbDay storage,  CPUSec processing.  (This will allow charges to be reduced to £5 + usage, making it very fair and competitive.)
<li>Start adding some hosted services to the offering (Redmine/git, Trac/svn, email, storage, Ruby-on-Rails web hosting, etc.).</li>
</ol>
