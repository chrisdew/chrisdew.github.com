--- 
layout: post
title: Manipulating the root logger in Python.
created: 1249037192
---
This took me a few minutes to figure out, so I'm blogging it.

<strong>Problem:</strong>
We need to create multiple loggers within one application (often one per module), but we need all of these to have the same behaviour (i.e. use the same handlers).

<strong>Solution:</strong>
In the solution below, we use two handlers.  Logging goes to both stderr and syslog.  (Linux specific example.)

Note: The loggers created by logging.getLogger(X) inherit their handlers from the root_logger (created with logging.getLogger()).  Is this slightly surprising?  This even happens if the root logger has handlers added <strong>after</strong> other logger have been defined.

<code type="python">
#!/usr/bin/python

import logging
import logging.handlers

if __name__ == '__main__':
    syslog = logging.handlers.SysLogHandler(address='/dev/log')
    stderr = logging.StreamHandler(open('/dev/stderr', 'w'))
    formatter = logging.Formatter(
                            '%(asctime)s %(name)s %(levelname)s %(message)s')
    syslog.setFormatter(formatter)
    stderr.setFormatter(formatter)

    root_logger = logging.getLogger()
    root_logger.addHandler(stderr)
    root_logger.addHandler(syslog)
    root_logger.setLevel(logging.DEBUG)

    first_logger = logging.getLogger("first_logger")
    first_logger.info("foo")

    second_logger = logging.getLogger("second_logger")
    second_logger.info("bar")

</code>
