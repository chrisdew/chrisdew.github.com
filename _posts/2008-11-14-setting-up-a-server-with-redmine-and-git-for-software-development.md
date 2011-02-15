--- 
layout: post
title: Setting up a server, with Redmine and git, for software development.
created: 1226692429
---
I'd heard great things about git, and have recently been burned by subversion corruption.  (At work we use trac and subversion.)

So when I wanted to setup a server for personal software development, I decide to have a look around.

I ended up choosing Redmine and git, as my ticketing and VCS tools.

My first install of Redmine, on my Ubuntu 8.04 (Hardy Heron) laptop was painless.  I just installed ruby and rubygems, then 'gem install'ed rails, rake, etc.  I downloaded the development version of Redmine, followed their instructions, and everything just worked.

I then attempted to setup a Ubuntu 8.10 Server system - tried the same procedure and spent hours cursing strange ruby-errors and reinstalling.  A few hours later, I made a 8.04 Server VM and everything went smoothly.  The results of my installation can be seen on <a href='http://vm3.finalcog.com:3000'>http://vm3.finalcog.com:3000</a>.  I'll get the Apache forwarding working soon...

One strange issue I've come across is that 'autofetch commits' only autofetches them when you look at the repository.  If you commit and push a change which fixes an issue, that commit will not show against that issue *until* a user has viewed the repository page.  I'll file this as a bug.


