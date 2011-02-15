--- 
layout: post
title: Startup scripts and finding the pid of the last started process.
created: 1215675010
---
Many daemon processes nicely create a file called /var/run/<daemon name>.pid, which contains their process id.  This is a useful thing to have, as it allows automated processes to check that it is still running and look at the resources it is using (in /proc/<pid>).

For daemons which do not produce a pid file, $! can be used to find the process number of the last executed command.  The code below shows how you can wrap a daemon in a (minimal) customised init.d script.

/etc/init.d/mydaemon:
<code>
#!/bin/bash

DAEMON_NAME="mydaemon"
DAEMON="/usr/bin/${DAEMON_NAME}"
PID_FILE="/var/run/${DAEMON_NAME}.pid"

case "$1" in
      'start')
            ${DAEMON} &
            echo $! > "${PID_FILE}"
      ;;
      'stop')
            kill `cat "${PID_FILE}"` && rm "${PID_FILE}"
      ;;
      *)
            echo "Usage: $0 {start|stop}"
      ;;
esac
</code>
