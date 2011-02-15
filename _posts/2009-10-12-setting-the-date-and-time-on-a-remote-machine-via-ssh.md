--- 
layout: post
title: Setting the date and time on a remote machine via ssh.
created: 1255359697
---
This is just to stop me from having to lookup the date command.

<code>
ssh root@servername date `date +%m%d%H%M%Y.%S`
</code>

It set the date and time on servername to be the same as the local date and time.  Obviously ntp is the correct solution here...
