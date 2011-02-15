--- 
layout: post
title: The explanation of immortal, migrating sockets and Python's getstatusoutput.
created: 1249906234
---
<a href="http://finalcog.com/mystery-migrating-sockets-python-getstatusoutput">Click to read the first part of this post.</a>

OK, it's time to come clean, one piece of information that we hadn't disclosed yet is that this daemon is responsible for running the start scripts of various services (including ntp and dhcpd) as it is a service control daemon.

Secondly, it uses commands.getstatusoutput("/etc/rc.d/rc.X start") to start the services.

<strong>Explanation</strong>
When you execute a command with getsatusoutput *all* of the current process's open file descriptors (as listed in /proc/XXXX/fd) are inherited by the child process.  These file descriptors include all files, devices, unix sockets and pipes the process has open, but more importantly all network sockets, including listening sockets.

These file descriptors were inherited from rc.ntpd by ntp and from rc.httpd by httpd (yes, it's a Slackware box, and no, it wasn't my choice).

<strong>Fix</strong>
The solution was just to make our daemon execute the init scripts using Popen (with close_fds=True).

<strong>Netstat Feature Request</strong>
We would have found this bug far sooner if netstat would list *all* of the processes which are bound to a port, not just the one with the lowest file descriptor.  The bug wasn't that the bound socket was moving between between processes, it was the the bound socket was a file descriptor shared by many processes.

<strong>Author Ignorance</strong> 
I haven't yet had a chance to investigate whether an inherited file descriptor (for a listening socket) can be used.  I assume that an inheriting process can just use the listening socket's file descriptor as easily as if the inheriting process had bound the socket itself.

Using inherited file descriptors for stdin, stdout and stderr is common place, but I'm not aware of a programme which uses an inherited listening socket.  Do Apache, and other servers with 'workers', do this?
