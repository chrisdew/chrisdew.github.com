--- 
layout: post
title: Python ConfigParser and lower case names
created: 1235751785
---
I was using Python's excellent <a href='http://docs.python.org/library/configparser.html'>ConfigParser</a> to manipulate SolidDB's (don't ask) solid.ini configuration file (amongst other files).

I just couldn't figure out why SolidDB wasn't starting, until I realised that ConfigParser changes all the 'names' in an .ini file to lower case, by default.  This behaviour can be fixed by simply substituting an identity as ConfigParser's optionxform function.

<code type='python'>
import ConfigParser

config_parser = ConfigParser.ConfigParser()
config_parser.optionxform = lambda x: x


</code>

As an aside, there is no <strong>identity</strong> function in Python <a href='http://bugs.python.org/issue1673203'>yet</a>, so I had to use a lambda function.
