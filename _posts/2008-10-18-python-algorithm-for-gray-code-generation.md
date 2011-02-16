--- 
layout: post
title: Python algorithm for Gray Code generation.
created: 1224348655
permalink: python-grey-code-algorithm.html
---
<a href='http://en.wikipedia.org/wiki/Gray_code'>Gray code</a> is a sequence of binary values where <em>only one bit</em> changes state as the we go up through the sequence.  It is also known as reflected binary code.

<python>
Index   Gray Code
    0   00000000
    1   00000001
    2   00000011
    3   00000010
    4   00000110
    5   00000111
    6   00000101
    7   00000100
    8   00001100
    9   00001101
   10   00001111
   11   00001110
   12   00001010
   13   00001011
   14   00001001
   15   00001000


</python>


Here is an algorithm in Python to generate gray codes.  (If you need to generate sequences of Gray Codes, then adding <a href='http://en.wikipedia.org/wiki/Memoization'>memoisation</a> to the (<a href='http://en.wikipedia.org/wiki/Pure_function#Pure_functions'>pure</a>) function 'gray(i)' will speed the process.)

The algorithm operates in O(log n) when generating a single Gray Code.

Note: The algorithm only requires Python 2.6 to in order to display the results in binary.  The function 'gray(i)' will work in earlier versions.  The function 'tcbin' (two's compliment bin) is from <a href='http://finalcog.com/node/20'>bit twiddling</a>.

This post seems to be getting a lot of visitors from Wikipedia - what are people using Gray Codes for?  Please register and leave a comment.  (Registration is our defence against Comment Spam.)

<python>
#!/usr/local/bin/python2.6

"""
Doctests...

>>> log2(16)
4.0
>>> log2(2)
1.0
>>> for i in range(8):
...     print tcbin(gray(i))
0b00000000
0b00000001
0b00000011
0b00000010
0b00000110
0b00000111
0b00000101
0b00000100
"""

import math

def gray(i):
    """
    This function returns the i'th Gray Code.
    It is recursive and operates in O(log n) time.
    """
    if i == 0: return 0
    if i == 1: return 1

    ln2 = int(log2(i))
    # the grey code of index i is the same as the gray code of an index an 
    # equal distance on the other side of ln2-0.5, but with bit ln2 set
    pivot = 2**(ln2) - 0.5 # TODO: double everything so that we use no floats
    delta = i - pivot
    mirror = int(pivot - delta)
    x = gray(mirror)    # get the grey code of the 'mirror' value
    x = x + 2**(ln2)    # set the high bit
    return x


def log2(x):
    """
    Return log base 2 of x.
    """
    return math.log(x) / math.log(2)


def tcbin(x, y=8):
    """
    This function returns the padded, two's complement representation of x, in y-bits.
    It is conventional for y to be 8, 16, 32 or 64, though y can have any non-zero positive value. 
    """
    if x >= (2**(y - 1)) or x < -(2**(y - 1) or y < 1):
        raise Exception("Argument outside of range.")
    if x >= 0:
        binstr = bin(x)
        # pad with leading zeros
        while len(binstr) < y + 2:
            binstr = "0b0" + binstr[2:]
        return binstr
    return bin((2**y) + x) # x is negative


def _test():
    import doctest
    doctest.testmod()


if __name__ == "__main__":
    _test()



</python>
