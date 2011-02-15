--- 
layout: post
title: What is the name of a function's type?
created: 1253202145
---
Got the afternoon off, to speak at a planning commitee meeting.  Just got back and thought I'd raise a little Python problem that bothers me...

I'm still struggling to find out what the builtin name of a function's type is.  It's <code>&lt;type 'function'&gt;</code>, but I can't find what the builtin name for it is.  It not <code>func</code> nor <code>function</code>.

Can anyone help?


<code type="python">
#!/usr/bin/env python
"""
This module implements a memoisation decorator.
"""

import cPickle
import sys

from functools import wraps


# make a type for functions, until I find out what it's called
def foo():
    pass
func_t = type(foo)
del(foo)


def memoise(arg, max_size=None, fudge_first=False):
    """
    Memoise is a decorator that can be used to cache computed results in 
    side-effect-free or pure functions.  i.e. functions which will always
    return the same result when called with the same arguments.

    max_size limits how many results are stored for the decorated function.

    fudge_first allows this decorator to be used on methods where the instance
    cannot be pickled - because it has file descriptors or a database connect, 
    for example.  Only fudge_first when the method's result does not depend on 
    the instance and when it is a pure method.

    Decorate without arguments.

    >>> @memoise 
    ... def foo(arg, kwarg=None):
    ...     print "calculating foo..."
    ...     return arg + kwarg
    ...
    >>> foo(10, kwarg=32)
    calculating foo...
    42
    >>> foo(10, kwarg=32)
    42

    Decorate, explicitly setting the number of 'slots' for memoisation.
    >>> @memoise(2)
    ... def bar(arg0, arg1):
    ...     print "calculating bar..."
    ...     return arg0 + arg1
    ...
    >>> bar(10, 32)
    calculating bar...
    42
    >>> bar(10, 32)
    42
    >>> bar(1, 1)
    calculating bar...
    2
    >>> bar(1, 1)
    2
    >>> bar(2, 2)
    calculating bar...
    4
    >>> bar(2, 2)
    4
    >>> bar(10, 32)
    calculating bar...
    42
    >>> bar.func_name
    'bar'

    Make sure that the fudge_first ignores the first argument when pickling.
    >>> import sys
    >>> @memoise(2, fudge_first=True)
    ... def wib(self, arg0, arg1):
    ...     print "calculating wib..."
    ...     return arg0 + arg1
    ...
    >>> wib(sys.stdin, 10, 32)
    calculating wib...
    42

    >>> @memoise(2)
    ... def ble(self, arg0, arg1):
    ...     print "calculating ble..."
    ...     return arg0 + arg1
    ...
    >>> ble(sys.stdin, 10, 32)
    Traceback (most recent call last):
        ...
    TypeError: can't pickle file objects


    """

    # Allows decorator to be used both with and without an (integer) argument
    # Check that func isn't a function.
    if not isinstance(arg, func_t):
        def memoise_wrapper(f):
            return memoise(f, arg, fudge_first=fudge_first)
        return memoise_wrapper
    else:
        func = arg # we know the argument is a function

    # the dictionary contains a map from pickled args to the return value
    dict = {}
    # the list contains the pickled args in order or last use
    list = []

    @wraps(func)
    def memoise_wrapper(*args, **kwargs):
        # this might be more efficient as some form of tuple?
        if fudge_first:
            key = cPickle.dumps((args[1:], kwargs))
        else:
            key = cPickle.dumps((args, kwargs))

        # is it memoised?
        if dict.has_key(key):
            # move those pickled args to the end of the list
            list.append(list.pop(list.index(key)))
            return dict[key]

        # otherwise add it to both the dict and the list
        else:
            dict[key] = func(*args, **kwargs)
            list.append(key)   

            # has the list gone beyond the maximum size?
            if max_size is not None and len(list) > max_size:
                del dict[list.pop(0)]
        return dict[key]

    return memoise_wrapper


def _test():
    """
    This method is responsible for running tests, replace it with whatever
    test framework you're using.
    """
 
    import doctest
    failures, x = doctest.testmod()
 
    # It's important in some situations (e.g. buildbot) that test failures
    # return a non-zero exit code.
    if failures > 0:
        sys.exit(1)
 
 
# This is run if this script is executed, rather than imported.
if __name__ == '__main__':
    _test()


</code>
