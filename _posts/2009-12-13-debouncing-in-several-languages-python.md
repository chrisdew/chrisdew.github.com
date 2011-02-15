--- 
layout: post
title: Debouncing in several languages - Python.
created: 1260735198
---
I recently found a need to create a 'debouncer', or 'bistable' object.

This is basically a counter with low and high limits, and a state.  When the counter gets to the high limit the state is changed to 'on', when it reaches the low limit, the state is changed to 'off'.  Actions can be registered to be executed on either of these state changes.

It seems an ideal, small, but not trivial, object to implement in several languages to document their differences.

I intend to do this for Python 2.6, Java 1.3 (JavaME), C, C++ (C with classes), C++ (modern), Ruby, Erlang, Haskell, Javascript, Python 3 and Java 7 (when released).

Here's Python:

debounce.py:
<python>
class Debounce(object):
    def __init__(self, steps=10, state=True):
        self.MAX_STEP = steps - 1
        self.state = state
        self.value = state and self.MAX_STEP or 0
        self.onFalse = []   # list of callbacks for state transitions
        self.onTrue = []

    def inc(self, steps=1):
        self.value = self.value + steps
        if (self.value <= 0 and self.state == True):
            self.state = False
            for fn in self.onFalse:
                fn()
        if (self.value >= self.MAX_STEP and self.state == False):
            self.state = True
            for fn in self.onTrue:
                fn()

        if (self.value < 0):
            self.value = 0
        if (self.value > self.MAX_STEP):
            self.value = self.MAX_STEP

    def dec(self, steps=1):
        self.inc(-steps)


</python>

debounce_demo.py:
<code type="python">
#!/usr/bin/python

from debounce import Debounce

def callbackFalse():
    print "state changed to False"

def callbackTrue():
    print "state changed to True"

debounce = Debounce(5)
debounce.onFalse.append(callbackFalse)
debounce.onTrue.append(callbackTrue)

debounce.dec()
debounce.dec()
debounce.dec()
debounce.dec()
debounce.dec()
debounce.dec()
debounce.dec(20)
debounce.inc()
debounce.inc()
debounce.inc()
debounce.inc()
debounce.inc()


</code>

Some language features to notice:
<ul>
<li>Python, unlike more specialised object oriented languages, requires an explicit 'self' to refer to properties of the object.</li>
<li>I had to name the callback functions - while Python has lambdas, they must be expressions rather than statements.</li>
</ul>
