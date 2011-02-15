--- 
layout: post
title: Using Python's ctypes library is easier than it looks.
created: 1251465045
---
It's <strong>this</strong> easy to write a programme which uses libc's open and read functions to print it's own source.   See <a href="http://docs.python.org/library/ctypes.html">Python's documentation</a> for more details.

<code type="python">
#!/usr/bin/env python

import os
import sys

from ctypes import CDLL

MAX_CHARS = 1000    # maximum number of characters to read

if __name__ == "__main__":
    libc = CDLL("libc.so.6")
    fd = libc.open(sys.argv[0], os.O_RDONLY)
    buffer = " " * MAX_CHARS
    num_chars_read = libc.read(fd, buffer, MAX_CHARS)
    print buffer[:num_chars_read]
    libc.close(fd)

</code>

Obviously this example is a little pointless, but it does show that no fancy magic is required, even when dealing with functions which mutate strings.

Warning: if your programme uses a string of 1000 spaces elsewhere, you may find that it has been clobbered.  (Python's strings are immutable, but the libc.read changes the data *inside* Python's immutable string.)
