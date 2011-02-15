--- 
layout: post
title: Grub, lilo and the 4KB block of doom.
created: 1236679104
---
“When you have eliminated the impossible, whatever remains, however improbable, must be the truth.” - Sir Arthur Conan Doyle.

<strong>Synopsis</strong>
Never start the first partition within the first 4KB (8 sectors) of a block device.

<strong>Detail</strong>
I've recently been having filesystem corruption problems on a decade old CF card-based linux distribution.  (It is now using a 2.6 kernel.) 

The odd thing about this distro is that it starts its first partition on the second sector of the disk, rather on the second cylinder, as is common with most distros.  This was probably done for the reason of utilising another few sectors of space, on the space-constrained CF cards of a decade ago.

Eventually I tracked down the source of the corruption to the following problem:

If you write (and sync or close) the boot block on /dev/XdX, it will write the first 4KB to the disk, not just the boot block.  This will corrupt the filesystem on /dev/XdX1, if the first partition starts within the first 4KB of the disk.

It seems that Linux does not know that /dev/XdX and /dev/XdX1 are backed by the same physical storage.

<code>
       +---------------+-----
hda1   |   |   |   |   |
       +---------------+-----
                     3 4
                     5 0
                     8 9
       0             4 6

     +---------------+-------
hda  |   |   |   |   |
     +---------------+-------
     +-+-+-+-+-+-+-+-+-+-+-+-
phy  | | | | | | | | | | | |
     +-+-+-+-+-+-+-+-+-+-+-+-
         1           4
       5 0           0
       1 2           9
     0 2 4           6

</code>

The following programme demonstrates the problem, if run on a filesystem where the /dev/XdX1 partition begins on the second sector of the disk.  (Which you can make with <code type="bash">echo '1,51200,L' | sfdisk /dev/hdd -uS --force</code>.)


<code type="c">
#include <stdio.h>
#include <fcntl.h>

#define RAW_DEV "/dev/hdd"
#define PART_DEV "/dev/hdd1"
#define RAW_OFF 511
#define PART_OFF 3583

int main() {
    int raw, part, r_raw, r_part;
    char a, b;

    // open the two devices
    raw = open(RAW_DEV, O_RDWR, 0);
    part = open(PART_DEV, O_RDWR, 0);

    // seek to the correct positions
    lseek(raw, RAW_OFF, 0);    
    lseek(part, PART_OFF, 0);

    // write characters
    write(raw, "!", 1);  
    write(part, "?", 1);    

    // synchronise
    fsync(part);
    fsync(raw);

    // close
    close(raw);
    close(part);

    // open for reading
    r_raw = open(RAW_DEV, O_RDONLY, 0);
    r_part = open(PART_DEV, O_RDONLY, 0);

    // seek to the correct positions
    lseek(r_raw, RAW_OFF, 0);    
    lseek(r_part, PART_OFF, 0);

    // read characters
    read(r_raw,  &a, 1);
    read(r_part,  &b, 1);

    // print results
    printf("%c %c\n", a, b);
}


</code>

It should write "!" and "?" to the byte 511 of the boot sector and to byte 3583 of the first partition, then read them back.

What happens is that the syncing of the boot sector <strong>overwrites</strong> the contents of byte 3583 with whatever value was at that location when the "!" was written to the boot sector - wiping out the change.  If you reverse the order of the syncs, everything is fine.

Lilo displays this same sequence of activity.  It reads from the boot sector, moves the map file around (changing the filesystem on /dev/XdX1) and then writes the new boot sector - wiping out changes to the first 3.5KB of the filesystem - leading to corruption.

Grub may have similar behaviour, but it would be much less of a problem as grub only writes the boot sector when a new version is installed.

<strong>Solution</strong>
We were able to fix our problem this by flushing the block devices to the disk at appropriate times during a software upgrade, using <code>ioctl(fd, BLKFLSBUF);</code>.

<strong>Questions</strong>
<ul>
<li>Is this behaviour specific to the boot block, or is there a general linux kernel problem with writing to both /dev/XdX and /dev/XdX1?</li>
<li>Why is it a 4KB block?  I vaguely understood that linux used 1KB blocks in it's caching of block devices.</li>
</ul>
