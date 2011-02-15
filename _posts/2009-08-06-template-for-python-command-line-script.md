--- 
layout: post
title: Template for Python command line script.
created: 1249561840
---
Here's a simple template for a command line Python script which includes testing and logging from the beginning.  It's currently linux-specific - I'd be really interested to hear from Windows (and Mac) developers - what do I need to change to make it cross platform?

Note: the os.getpid() call returns the pid of the executed process, not the running thread (in a multi-threaded application).

<code type='python'>
#!/usr/bin/env python
"""
This module is just template for a Python command-line script. 
"""

import os
import logging
import sys
import time

from logging.handlers import SysLogHandler
from logging import StreamHandler
from optparse import OptionParser

# Each module can define a logger at the module level.
# The handling of log output is acheived by manipulating the *root*
# logger, rather than by adding handlers to each individual logger.
logger = logging.getLogger("%s[%s]" % (os.path.basename(sys.argv[0]),
                                       os.getpid(),
                                       ))


def do_stuff():
    """
    This is a demo method, which simply does some logging and returns 42.

    >>> do_stuff()
    42
    """
    logger.warn("do_stuff() does nothing yet")
    time.sleep(2)
    logger.warn("except sleep for two seconds and return 42")

    return 42   # something for the doctest to check


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
    parser = OptionParser(usage="%prog [OPTION...] ADDRESS",
                          version="%prog 0.1",
                          )
    parser.add_option("-v", "--verbose",
                      action="count",
                      dest="verbosity",
                      help="increase verbosity",
                      metavar="VERBOSITY",
                      )
    parser.add_option("-d", "--debug",
                      action="store_true",
                      dest="debug",
                      help="debug to stderr",
                      metavar="DEBUG",
                      )
    parser.add_option("-t", "--test",
                      action="store_true",
                      dest="test",
                      help="run test suite",
                      metavar="TEST",
                      )
    parser.set_defaults(debug=False,
                        test=False,
                        )

    options, args = parser.parse_args()

    # get the *root* logger
    root_logger = logging.getLogger()
    formatter = logging.Formatter('%(name)s: %(levelname)s %(message)s')

    # set logging level
    log_level = logging.WARNING
    if options.verbosity == 1:
        log_level = logging.INFO
    elif options.verbosity >= 2:
        log_level = logging.DEBUG
    root_logger.setLevel(log_level)

    # log to syslog (linux specific?)
    syslogHandler = SysLogHandler(address='/dev/log')
    syslogHandler.setFormatter(formatter)
    root_logger.addHandler(syslogHandler)

    # log to stderr (linux specific?)
    if options.debug:
        stderrHandler = StreamHandler(open('/dev/stderr', 'w'))
        stderrHandler.setFormatter(formatter)
        root_logger.addHandler(stderrHandler)

    # 'logger' is the logger defined at the module level, not the root logger 
    logger.info("started")
    logger.debug("options: %s" % (options,))
    logger.debug("args: %s" % (args,))

    # run either the test suite, or the application
    try:
        if options.test:
            _test()
        else:
            do_stuff()
    except KeyboardInterrupt, e:
        logger.critical("killed with ctrl-C")

</code>
