--- 
layout: post
title: Subversion, buildbot and commit times.
created: 1250850329
---
<strong>Implementing continuous integration... </strong>

We use buildbot to build our products, but make has been continually rebuilding packages, because each checkout done by buildbot has put a 'now' timestamp on every single file.

The solution was difficult to find, because of a lot of noise when googling, such as: 

http://subversion.tigris.org/ds/viewMessage.do?dsForumId=1065&dsMessageId=856146
http://subversion.tigris.org/issues/show_bug.cgi?id=1256

I found the answer in http://subversion.tigris.org/issues/show_bug.cgi?id=1445

<strong>Solution</strong>
<code>
Unhash the 'use-commit-times' line in ~/.subversion/config

### Set use-commit-times to make checkout/update/switch/revert
### put last-committed timestamps on every file touched.
use-commit-times = yes

</code>
