--- 
layout: post
title: Replace log files with emlog circular buffers
created: 1240990785
---
Emlog is a very useful kernel module.  It can be used to create one or more 'circular buffer' character devices.  

Advantages:
<ul>
<li>they take the place of regular log files (in /var/log, or elsewhere)</li>
<li>they cause no disk writes (ideal for read only filesystems, such as squashfs)</li>
<li>they use no disk space, obviously :-P</li>
</ul>


Disadvantages:
<ul>
<li>the circular buffer is lost on reboot - it's not a good idea to use emlog for logs which need to be persistent (especially /var/log/auth.log)</li>
<li>they consume ram while running - the length of each circular buffer can be specified independently</li>
<li>you have to use <code>nbcat</code> instead of <code>cat</code>, when using these circular buffers, unless you want cat to block like <code>tail -f</code></li>

Read more on: http://www.circlemud.org/~jelson/software/emlog/
