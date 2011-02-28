---
layout: post
title: Manpage for expand (Ubuntu 10.04LTS)
---
This is just too useful when working with whitespace sensitive languages, such
as Haskell or Python.

<pre>
EXPAND(1)                        User Commands                       EXPAND(1)

NAME
       expand - convert tabs to spaces

SYNOPSIS
       expand [OPTION]... [FILE]...

DESCRIPTION
       Convert  tabs in each FILE to spaces, writing to standard output.  With
       no FILE, or when FILE is -, read standard input.

       Mandatory arguments to long options are  mandatory  for  short  options
       too.

       -i, --initial
              do not convert tabs after non blanks

       -t, --tabs=NUMBER
              have tabs NUMBER characters apart, not 8

       -t, --tabs=LIST
              use comma separated list of explicit tab positions

       --help display this help and exit

       --version
              output version information and exit

AUTHOR
       Written by David MacKenzie.

REPORTING BUGS
       Report expand bugs to bug-coreutils@gnu.org
       GNU coreutils home page: <http://www.gnu.org/software/coreutils/>
       General help using GNU software: <http://www.gnu.org/gethelp/>

COPYRIGHT
       Copyright  ©  2009  Free Software Foundation, Inc.  License GPLv3+: GNU
       GPL version 3 or later <http://gnu.org/licenses/gpl.html>.
       This is free software: you are free  to  change  and  redistribute  it.
       There is NO WARRANTY, to the extent permitted by law.

SEE ALSO
       unexpand(1)

       The  full  documentation  for expand is maintained as a Texinfo manual.
       If the info and expand programs are properly installed  at  your  site,
       the command

              info coreutils 'expand invocation'

       should give you access to the complete manual.

GNU coreutils 7.4               September 2010                       EXPAND(1)

</pre>
