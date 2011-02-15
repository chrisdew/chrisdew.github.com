--- 
layout: post
title: Python with Curses with with_curses.
created: 1249627053
---
The 'with' keyword, introduced in Python 2.5, allows a nice way of handling the initialisation (and teardown) of curses applications.

The object used with 'with' needs to have two methods, __enter__ and __exit__.

The __enter__ method is called before the code in the 'with' block is executed.  Whatever it returns can be assigned to a variable using the 'as' keyword.

The __exit__ method is called after the code in the 'with' block is executed, or if an exception is raised within the block.

Using 'with', with curses, elegantly restores the console to a sane state on exceptions which crash a program (during development - programmes never crash in the field, right?).


<strong>with_curses.py</strong>
<code type="python">
#!/usr/bin/env python
"""
This module provides a 'with' for using curses in Python.
"""

from __future__ import with_statement
import curses


class WithCurses(object):
    """
    WithCurses is a simple convenience for using Python's curses
    module.
    """

    def __enter__(self):
        self.stdscr = curses.initscr()
        curses.noecho()
        curses.cbreak()
        self.stdscr.keypad(1)
        curses.start_color()

        curses.init_pair(1, curses.COLOR_BLUE, curses.COLOR_BLACK)
        curses.init_pair(2, curses.COLOR_RED, curses.COLOR_BLACK)
        curses.init_pair(3, curses.COLOR_GREEN, curses.COLOR_BLACK)
        curses.init_pair(4, curses.COLOR_MAGENTA, curses.COLOR_BLACK)
        curses.init_pair(5, curses.COLOR_CYAN, curses.COLOR_BLACK)
        curses.init_pair(6, curses.COLOR_YELLOW, curses.COLOR_BLACK)
        curses.init_pair(7, curses.COLOR_WHITE, curses.COLOR_BLACK)

        self.DIM_BLUE = curses.color_pair(1)
        self.DIM_RED = curses.color_pair(2)
        self.DIM_GREEN = curses.color_pair(3)
        self.DIM_MAGENTA = curses.color_pair(4)
        self.DIM_CYAN = curses.color_pair(5)
        self.DIM_YELLOW = curses.color_pair(6)
        self.DIM_WHITE = curses.color_pair(7)

        self.BLUE = curses.color_pair(1) | curses.A_BOLD
        self.RED = curses.color_pair(2) | curses.A_BOLD
        self.GREEN = curses.color_pair(3) | curses.A_BOLD
        self.MAGENTA = curses.color_pair(4) | curses.A_BOLD
        self.CYAN = curses.color_pair(5) | curses.A_BOLD
        self.YELLOW = curses.color_pair(6) | curses.A_BOLD
        self.WHITE = curses.color_pair(7) | curses.A_BOLD

        # Whatever the __enter__() method returns is the instance
        # which is assigned to the 'as' variable in the 'with' statement.
        # This does not necessarily need to be an instance of this class.
        return self

    # The __exit__() method can perform exception handling, but
    # here we just let any exception propagate upwards, after
    # making the console sane.
    def __exit__(self, type, value, traceback):
        curses.nocbreak()
        self.stdscr.keypad(0)
        curses.echo()
        curses.endwin()


# This is executed if the script is executed, but not if it is imported.
if __name__ == '__main__':
    import time

    # Print hello world on the screen, as a demo.
    with WithCurses() as wc:
        wc.stdscr.addstr(0, 0, "hello", wc.GREEN)
        wc.stdscr.refresh()
        time.sleep(1)
        wc.stdscr.addstr(0, 6, "world", wc.RED)
        wc.stdscr.refresh()
        time.sleep(1)


</code>


See http://www.python.org/dev/peps/pep-0343/ for details about 'with'.
See http://docs.python.org/library/curses.html for details about curses.
