--- 
layout: post
title: SSD Bonnie++ Benchmarks
created: 1236889589
---
I've been in the fortunate position to test a couple of SSDs recently.  To round things off, I've also included results for a standard 7,200rpm SATA disk and a USB key.

The results are:

SAMSUNG MCBQE32G5MPP-0VA £400
seq. write: 65MB/s
seq. read: 96MB/s
random seeks: 7,511/s

OCZ VERTEX 00.PT1 £100
seq. write: 77MB/s
seq. read: 142MB/s
random seeks: 9,058/s

WDC WD1600AAJS-00B4A0 (normal 3.5" 7,200rpm hdd) £30
seq. write: 68MB/s
seq. read: 91MB/s
random seeks: 226/s

KINGSTON DATATRAVELER USB STICK
seq. write: 8MB/s
seq. read: 32MB/s
random seeks: 2,828/s

I was very impressed with the performance of the OCZ Vertex drive, and ordered one for myself yesterday.

Also see <a href='http://www.anandtech.com/printarticle.aspx?i=3531'>Anandtech's article</a>.

<code type="bash">
(Model=SAMSUNG MCBQE32G5MPP-0VA                , FwRev=PS105006, SerialNo=SE81470022)
root@ubuntu:~/bonnie++-1.03e# bonnie++ -d /sdc1 -f -u ubuntu
Using uid:1000, gid:1000.
Writing intelligently...done
Rewriting...done
Reading intelligently...done
start 'em...done...done...done...
Create files in sequential order...done.
Stat files in sequential order...done.
Delete files in sequential order...done.
Create files in random order...done.
Stat files in random order...done.
Delete files in random order...done.
Version 1.03e       ------Sequential Output------ --Sequential Input- --Random-
                    -Per Chr- --Block-- -Rewrite- -Per Chr- --Block-- --Seeks--
Machine        Size K/sec %CP K/sec %CP K/sec %CP K/sec %CP K/sec %CP  /sec %CP
ubuntu           8G           65284  18 39589   8           96293   8  7511   6
                    ------Sequential Create------ --------Random Create--------
                    -Create-- --Read--- -Delete-- -Create-- --Read--- -Delete--
              files  /sec %CP  /sec %CP  /sec %CP  /sec %CP  /sec %CP  /sec %CP
                 16 +++++ +++ +++++ +++ +++++ +++ +++++ +++ +++++ +++ +++++ +++
ubuntu,8G,,,65284,18,39589,8,,,96293,8,7510.9,6,16,+++++,+++,+++++,+++,+++++,+++,+++++,+++,+++++,+++,+++++,+++


(Model=OCZ       VERTEX        00.PT1          , FwRev=00.PT1  , SerialNo=D10F8XZMMI2M9Q8MY39O)
root@ubuntu:~/bonnie++-1.03e# bonnie++ -d /sdb1 -f -u ubuntu
Using uid:1000, gid:1000.
Writing intelligently...done
Rewriting...done
Reading intelligently...done
start 'em...done...done...done...
Create files in sequential order...done.
Stat files in sequential order...done.
Delete files in sequential order...done.
Create files in random order...done.
Stat files in random order...done.
Delete files in random order...done.
Version 1.03e       ------Sequential Output------ --Sequential Input- --Random-
                    -Per Chr- --Block-- -Rewrite- -Per Chr- --Block-- --Seeks--
Machine        Size K/sec %CP K/sec %CP K/sec %CP K/sec %CP K/sec %CP  /sec %CP
ubuntu           8G           77584  21 45625   8           142635  11  9058  21
                    ------Sequential Create------ --------Random Create--------
                    -Create-- --Read--- -Delete-- -Create-- --Read--- -Delete--
              files  /sec %CP  /sec %CP  /sec %CP  /sec %CP  /sec %CP  /sec %CP
                 16 +++++ +++ +++++ +++ +++++ +++ +++++ +++ +++++ +++ +++++ +++
ubuntu,8G,,,77584,21,45625,8,,,142635,11,9058.1,21,16,+++++,+++,+++++,+++,+++++,+++,+++++,+++,+++++,+++,+++++,+++


(Model=WDC WD1600AAJS-00B4A0                   , FwRev=01.03A01, SerialNo=     WD-WMAT14589383)
root@ubuntu:~#bonnie++ -d /sda1 -f -u ubuntu
Using uid:1000, gid:1000.
Writing intelligently...done
Rewriting...done
Reading intelligently...done
start 'em...done...done...done...
Create files in sequential order...done.
Stat files in sequential order...done.
Delete files in sequential order...done.
Create files in random order...done.
Stat files in random order...done.
Delete files in random order...done.
Version 1.03e       ------Sequential Output------ --Sequential Input- --Random-
                    -Per Chr- --Block-- -Rewrite- -Per Chr- --Block-- --Seeks--
Machine        Size K/sec %CP K/sec %CP K/sec %CP K/sec %CP K/sec %CP  /sec %CP
ubuntu           8G           68685  16 39615   5           91856   6 226.6   0
                    ------Sequential Create------ --------Random Create--------
                    -Create-- --Read--- -Delete-- -Create-- --Read--- -Delete--
              files  /sec %CP  /sec %CP  /sec %CP  /sec %CP  /sec %CP  /sec %CP
                 16 +++++ +++ +++++ +++ +++++ +++ +++++ +++ +++++ +++ +++++ +++
ubuntu,8G,,,68685,16,39615,5,,,91856,6,226.6,0,16,+++++,+++,+++++,+++,+++++,+++,+++++,+++,+++++,+++,+++++,+++


</code>
