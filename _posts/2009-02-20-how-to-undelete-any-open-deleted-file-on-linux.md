--- 
layout: post
title: How to undelete any open, deleted file on linux.
created: 1235134903
---
<strong>Introduction</strong>

There are many situations where a file has been deleted (typically by an overnight log-cleaning process), yet the inode is still held open by a process reading from, or writing to, it.  Recovery of such a file is simple, regardless of whether it is on ext2, ext3, reiserfs or any other filesystem.

When a file is deleted in linux, it is simply 'unlinked'.  The inode, which contains the file's data, is not deleted until all processes have finished with it.  This is why processes can carry on writing to deleted files.  

(Incidentally, this is why linux can be upgraded without requiring a reboot.  Programmes, which have shared libraries open, carry on using the old versions of shared libraries until they finish.)

<strong>Demonstration</strong>

Let's make a test file, and hold it open with a backgrounded 'tail -f':
<code type='bash'>
chris@chris-laptop:/tmp$ echo "hello world" > testfile
chris@chris-laptop:/tmp$ tail -f testfile &
[1] 8530
chris@chris-laptop:/tmp$ hello world


</code>

8530 is the process id of the tail command.  Let's look at the file descriptors used by the tail:
<code type='bash'>
chris@chris-laptop:/tmp$ ls -lA /proc/8530/fd
total 0
lrwx------ 1 chris chris 64 2009-02-20 10:32 0 -> /dev/pts/23
lrwx------ 1 chris chris 64 2009-02-20 10:32 1 -> /dev/pts/23
lrwx------ 1 chris chris 64 2009-02-20 10:32 2 -> /dev/pts/23
lr-x------ 1 chris chris 64 2009-02-20 10:32 3 -> /home/tmp/testfile
lr-x------ 1 chris chris 64 2009-02-20 10:32 62 -> pipe:[18848062]
lr-x------ 1 chris chris 64 2009-02-20 10:32 63 -> pipe:[18848057]


</code>

Now we can delete the test file, check that it's deleted and have another look at this tail's file descriptors.
<code type='bash'>
chris@chris-laptop:/tmp$ rm testfile
chris@chris-laptop:/tmp$ ls testfile
ls: cannot access testfile: No such file or directory
chris@chris-laptop:/tmp$ ls -lA /proc/8530/fd
total 0
lrwx------ 1 chris chris 64 2009-02-20 10:32 0 -> /dev/pts/23
lrwx------ 1 chris chris 64 2009-02-20 10:32 1 -> /dev/pts/23
lrwx------ 1 chris chris 64 2009-02-20 10:32 2 -> /dev/pts/23
lr-x------ 1 chris chris 64 2009-02-20 10:32 3 -> /home/tmp/testfile (deleted)
lr-x------ 1 chris chris 64 2009-02-20 10:32 62 -> pipe:[18848062]
lr-x------ 1 chris chris 64 2009-02-20 10:32 63 -> pipe:[18848057]


</code>

The file descriptor shows that the file has been deleted.  Now all we have to do is to recover the file.  Luckily, we can access the file's contents via the process's file descriptor link.
<code type='bash'>
chris@chris-laptop:/tmp$ cat /proc/8530/fd/3
hello world
chris@chris-laptop:/tmp$ ls testfile
ls: cannot access testfile: No such file or directory
chris@chris-laptop:/tmp$ cp /proc/8530/fd/3 testfile
chris@chris-laptop:/tmp$ ls -lA testfile
-rw-r--r-- 1 chris chris 12 2009-02-20 10:34 testfile
chris@chris-laptop:/tmp$ cat testfile 
hello world


</code>

Job done.  Thanks to my colleagues, at <a href='http://www.appliansys.com'>ApplianSys</a>, for requiring this solution.

