---
layout: post
title: Optimising MySQL InnoDB
---

I was having trouble with a MySQL server, pegged at 180% CPU and falling behind on writes by more than 10 minutes each hour.

The fix was to increase innodb_buffer_pool_size from the default 8MB to 2G.

I just needed to add the line:

    [mysqld]
    innodb_buffer_pool_size = 2G

to /etc/mysql/my.cnf

This reduced the CPU usage from 180% to around 10%.
