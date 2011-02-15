--- 
layout: post
title: The mystery of immortal, migrating sockets and Python's getstatusoutput.
created: 1249888654
---
Last week we finally solved a mysterious problem that was causing us to doubt the very foundations of linux/unix (or our knowledge thereof).

We had a daemon process (written in Python).  When we killed it, the network port on which it was listening would 'migrate' to a process with a higher process id.

The fact that that the port was migrating to other processes caused the original daemon process to be unable to restart, as another process was already bound to the port on which it wanted to listen.

<code>
root@chris-laptop:~# netstat -lntp
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign     Address State       PID/Program name
tcp        0      0 0.0.0.0:3141            0.0.0.0:*   LISTEN              3452/python
tcp        0      0 0.0.0.0:80              0.0.0.0:*   LISTEN              3443/httpd
tcp        0      0 0.0.0.0:22              0.0.0.0:*   LISTEN              3423/sshd
tcp        0      0 0.0.0.0:7766            0.0.0.0:*   LISTEN              3318/python
tcp        0      0 0.0.0.0:443             0.0.0.0:*   LISTEN              3443/httpd
</code>

Killing process 3318 (our daemon, written in Python) resulted in port 7766 (the port on which process 3318 was listening) migrating to another process (ntpd in this case).

<code>
root@chris-laptop:~# netstat -lntp
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign     Address State       PID/Program name
tcp        0      0 0.0.0.0:3141            0.0.0.0:*   LISTEN              3452/python
tcp        0      0 0.0.0.0:80              0.0.0.0:*   LISTEN              3443/httpd
tcp        0      0 0.0.0.0:22              0.0.0.0:*   LISTEN              3423/sshd
tcp        0      0 0.0.0.0:7766            0.0.0.0:*   LISTEN              3413/ntpd
tcp        0      0 0.0.0.0:443             0.0.0.0:*   LISTEN              3443/httpd

</code>

Killing process 3412 (ntpd) resulted in the port migrating to yet another process - 3443 (httpd).  

<code>
root@chris-laptop:~# netstat -lntp
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign     Address State       PID/Program name
tcp        0      0 0.0.0.0:3141            0.0.0.0:*   LISTEN              3452/python
tcp        0      0 0.0.0.0:80              0.0.0.0:*   LISTEN              3443/httpd
tcp        0      0 0.0.0.0:22              0.0.0.0:*   LISTEN              3423/sshd
tcp        0      0 0.0.0.0:7766            0.0.0.0:*   LISTEN              3443/httpd
tcp        0      0 0.0.0.0:443             0.0.0.0:*   LISTEN              3443/httpd

</code>

This behaviour was perfectly reproducable.  We started to doubt netstat and our understanding of linux.  The only way to  get rid of this bound socket was to restart the machine.

The cause was obvious once we'd seen it - can you figure it out?

<a href="http://www.finalcog.com/explanation-migrating-sockets-python-getstatusoutput">Click to read the explanation of immortal, migrating sockets and Python's getstatusoutput.</a>


