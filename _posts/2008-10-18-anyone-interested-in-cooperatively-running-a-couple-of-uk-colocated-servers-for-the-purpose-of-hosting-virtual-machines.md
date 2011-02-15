--- 
layout: post
title: Anyone interested in cooperatively running a couple of UK colocated servers for the purpose of hosting virtual machines?
created: 1224324647
---
Currently I pay £20/month (£10 over the odds) for a very good internet service from <a href='http://www.plus.net/'>plus net</a>, because they give me a /29 network of my very own, enabling me to easily connect to home machines from the internet.

I currently pay ~£10/month for a very small VM with <a href='http://www.tektonic.net/'>tektonic</a>.  Their service is very good, but once (about 3 years ago) they lost <am>all</em> the data from my server <em>and</em> the backups.  You really get what you pay for - £10 a month gives you a vm with root access, but it's all built on <a href='http://en.wikipedia.org/wiki/User-mode_Linux'>user mode linux</a> which is far from ideal.  Although it's cheap, my gripes include:
<ul>
<li>My lack of trust in their backup policies.</li>
<li>The small share of RAM/processing/disk you get with the ~£10/month plan.</li>
<li>You have to choose between one of their supplied linux installations.  They're customised for UML, so their package management is crippled - you can't install packages which use X, for example.</li>
</ul> 

This gives me a budget of ~£20/month.  I wouldn't mind spending £30/month, if I can get additional functionality out of a colocated server, such as a large amount of space for backups, etc.  (I'm looking for a more capable server for a couple of other projects I'm developing, plus this blog.  I'm surprised to see blog readers <a href='http://en.wikipedia.org/wiki/Referer'>referred</a> from Google queries (not crawlers) made all over the world, including India, Romania, Finland, Canada and Slovenia.  It's only around 100 hits/day :-(  The most popular landing pages seem to be <a href='http://finalcog.com/node/8'>Django recursive relationships</a>, <a href='http://finalcog.com/node/20'>bit twiddling</a> and <a href='http://finalcog.com/node/21'>auto completion</a>)

I looked at <a href='http://aws.amazon.com/ec2/instance-types/'>Amazon's services</a>, but to keep an instance running 24/7 costs $72/month!  This seems a bit pricey.

I looked at Google App Engine, but the HTTPS support is currently limited to appspot sub-domains.  There are also other issues of tie-in.

Looking at <a href='http://www.ukshells.co.uk/serverhosting/'>uk shells</a>, they cost £50/month for colocating.  I'm not set on any particular colocation company - I'm just using them for an estimate.   

I'm happy to personally pay a significant majority of the server costs.  (Anyone who chooses the £200 option will be helping towards the server cost.)

Therefore we need at least four or more interested people, at £10/month, to share these servers.  We would also be happy to offer half the resources for £6/month, or £120 for 3 years.  Please comment, if you could use more resources.

For £6/£10 per month (or £120/£200 for 3 years) we can offer:
<ul>
<li>The ability to run one <em>or more</em> virtual machines, with the following resources split between them:</li>
<ol>
<li>50/100% of one core of a Core2 Quad processor at > 2GHz.</li>
<li>50/100Gb of disk space.</li>
<li>1/2Gb of RAM.</li>
<li>These resources are about 3-10x of what I get for the same price from tektonic.</li>
</ol>
<li>Other features will include:</li>
<ol>
<li>Automated backup to the backup server.</li>
<li>Hot failover to the standby server.</li>
<li>Ability to upload your own, customised, virtual machines - most likely either Xen or qemu/KVM.</li>
<li>No OS restrictions on virtual machines - Linux, Windows, and others.</li>
<li>Facility to control your VM(s) via libvirt and associated technologies.</li>
<li>32 or 64 bit OS.</li>
<li>Initially no SLA - this is service for hackers, run by hackers, in their spare time.</li>
<li>Full IPv6 connectivity - as a learning exercise for the admins ;-)</li>
<li>Support from live, contactable, people.</li>
</ol>
</ul>

This service is far in excess of that offered by commercial hosting companies (with the critical exception of an SLA, which many commercial organisations will require).

The sort of people/organisations with whom we want to share a couple of servers include independent web designers, web2.0 startup companies, <a href='http://en.wikipedia.org/wiki/Hacker_(programmer_subculture)'>hackers</a>, students and small (IT literate) businesses.  Spamming, or excessive network traffic harms everyone involved and will not be tolerated.

If you're interested, <a href='/user/register?destination=comment/reply/25%2523comment-form'>register</a> on this site and leave a comment below (once you've recieved the registration email) - this is definitely not binding in any way.  We'll contact you if we get enough of a response to make colocating a couple of servers seem worthwhile (>10 semi-interested responses?).  Lead time would be 1-2 months, though after we're up and running new members could be setup within a few minutes.

Some, trusted, participants will be asked to help administer this VM system - we'd like to build up a team of 3 or 4 volunteer admins, with skills in linux/<a href='http://virt-manager.et.redhat.com/'>virt-manager</a>/<a href='http://ovirt.org/'>oVirt</a>.







