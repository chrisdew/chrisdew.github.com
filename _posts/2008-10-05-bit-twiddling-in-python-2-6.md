--- 
layout: post
title: Bit-twiddling in Python 2.6
created: 1223189898
permalink: bit-twiddling-python.html
---
Bit manipulation, or bit-twiddling, has always been possible in Python.  The only problem was that there was no built-in support for displaying numbers in binary format. <a href="http://www.python.org/download/releases/2.6/">Python 2.6</a> <a href="http://docs.python.org/whatsnew/2.6.html#pep-3127-integer-literal-support-and-syntax">fixes this</a>.  

There's a new generation of programmers who didn't spend their childhoods designing spaceship graphics on graph-paper and manually converting them from binary (the graph-paper image) to integers, byte-by-byte for their ZX Spectrum 48K. They don't yet know the wonders on bit-twiddling; are you among them?

<strong>Why?</strong>
Bit-twiddling is efficient and concise.  If you ever find yourself iterating over the bits in an integer to achieve some end, it's a near certainty that bit-twiddling can achieve that end, in just a few processor cycles rather than thousands.

Any array of booleans can be converted into a set of bits and thence twiddled.

<strong>Jargon</strong>
First of all, you'll need to know that negative integers on almost all systems are represented in two's <a href="http://en.wikipedia.org/wiki/Two's_complement">complement format</a>.

Bit-twiddlers refer to a 1 as a 'set' bit and a 0 as 'clear' bit.  'Set' and 'clear' are verbs meaning to set a bit to one or zero, respectively.  A new byte (or word, or long, etc.) is presumed to be 'clear' - i.e. all bits set to zero, an integer value of zero.  'Higher' bits are to the left and 'lower' bits are to the right.

You'll also need to be familiar with the bitwise operators: & (and), | (or), ^ (xor), and ~ (not).  They are demonstrated in a section further below.

<strong>Examples</strong>
<code type="python">
# python's binary support
>>> x = 0b00101010
42
>>> bin(42) # note: this omits leading zeros
'0b101010'

# problems with Python's bin...
>>> bin(-42)         # 'bin' shows a sign, rather than printing an explicit two's complement format
'-0b101010'
>>> bin(2**8 - 42)   # this prints two's complement representation of 42 for a *byte*
'0b11010110'
>>> bin(2**32 - 42)  # this prints two's complement representation of 42 for a *32-bit long word*
'0b11111111111111111111111111010110'



</code>
Make wrapper for 'bin' which shows Y bit's two's complement, instead of negatives.
<code type="python">
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



</code>
Basic operators.
<code type="python">
>>> x = 0b00101010
>>> y = 0b00001111

>>> tcbin(x & y) # set all bits which are set in x and y
'0b00001010'

>>> tcbin(x | y) # set all bits which are set in x or y
'0b00101111'

>>> tcbin(x ^ y) # set all bits which are set in x or y, but not both (x xor y)
'0b00100101'

>>> tcbin(~x) # set all bits which are clear in x
'0b11010101'


</code>
Two's complement identity.
<code type="python">
>>> x = 0b00101010
>>> tcbin(-x)
'0b11010110'
>>> tcbin(~x)
'0b11010101'
>>> tcbin(~x + 1)
'0b11010110'



</code>
Extract lowest set bit.
<code type="python">
>>> x = 0b00101010
>>> tcbin(x & -x)
'0b00000010'



</code>
Mask for bits above *and including* lowest bit set
<code type="python">
>>> x = 0b00101010
>>> tcbin(x | -x)
'0b11111110'



</code>   
Mask for bits above lowest set bit.
<code type="python">
>>> x = 0b00101010
>>> tcbin(x ^ -x)
'0b11111100



</code>   
Clear lowest set bit.
<code type="python">
>>> x = 0b00101010
>>> tcbin(x & (x - 1))
'0b00101000'



</code>   
Set all bits below lowest set bit.
<code type="python">
>>> x = 0b00101010
>>> tcbin(x | (x - 1))
'0b00101011'



</code>   
Shift bits rights so that lowest set bit is at the right.
<code type="python">
>>> x = 0b00101010
>>> tcbin (x / (x & -x))
'0b00010101'



</code>
More useful ideas (if you can read C) can be found at <a href='http://www-graphics.stanford.edu/~seander/bithacks.html'>Sean Eron Anderson's page</a>.
