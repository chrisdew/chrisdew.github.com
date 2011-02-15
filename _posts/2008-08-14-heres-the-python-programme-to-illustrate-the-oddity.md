--- 
layout: post
title: Here's the python programme to illustrate the oddity.
created: 1218737714
---
Here's the example programme to illustrate the strange property of <a href='/node/10'>d(x)</a>.  Thanks to <a href='http://drupal.org/project/geshifilter'>GeSHi Filter</a> for the syntax highlighting.
<code type="python">
#!/usr/bin/python
"""
>>> print d(1)
1
>>> print d(2)
2
>>> print d(3)
6
>>> print d(4)
12
>>> print d(5)
60
>>> print d(6)
60
>>> get_ratio(10)
1.2768107627908574
>>> get_ratio(100)
1.0633172317981949
>>> get_ratio(200)
0.97018685255328507
>>> get_ratio(300)
1.0025654465340426
>>> get_ratio(400)
1.0054524536976457
>>> get_ratio(500)
0.99670664870153203
>>> get_ratio(700)
1.0014245028740023
"""
    
import gmpy
import math
    
def d(x):
    """
    Return the smallest positive integer number which can be exactly divded 
    by all integers from 1 to x.
    """
    if x == 1:
        return 1
    dxmo = d(x - 1)
    gcd = gmpy.gcd(x, dxmo)
    if gcd == 1:
        return dxmo * x
    else:
        return dxmo * (x / gcd)
    
def get_ratio(x):
    """
    Return the ratio of x to ln d(x)
    """
    return x / math.log(d(x))
    
def _test():
    import doctest
    doctest.testmod()

if __name__ == "__main__":
    _test()
</code>
