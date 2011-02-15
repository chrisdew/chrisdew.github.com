--- 
layout: post
title: Web classification.
created: 1219385383
---
A year or two ago I wrote some AI software for classifying web pages.  It seemed to work quite well, but I've never got around to doing anything with it.  I've found the python code for the classifier, I'll dig out more as and when,  NB: formatting is all messed up - look at the source - I'm going to look at GeSHi Filter for syntax highlighting, when I get a minute.
<code type="python">
#!/usr/bin/python

#from pysqlite2 import dbapi2 as sqlite
import StringIO
from glob import glob
import logging
import time
import urllib2
import socket
import threading
import aipy

logger = logging.getLogger("collect.py")
socket.setdefaulttimeout(5)

def blacklist(blacklist_dirs):
    """read all the domains and urls from a blacklist directory"""

    for blacklist in blacklist_dirs:
        for filename in ["domains", "urls"]:
            for file in glob(blacklist + "/*/" + filename):
                cla = file.split("/")[-2]
                f = open(file)
                try:
                    lines = f.readlines()
                    for line in lines:
                        if not line:
                            continue
                        if line.endswith("\n"):
                            line = line[:-1]
                        if len(line) > 0:
                            if not line[0] in '0123456789':
                                if not line.startswith("www."):
                                    line = "www." + line
                            yield line, cla
                finally:
                    f.close()


def get_words(str):
    text = ""
    in_tag = False
    last_tag = ""
    tag = ""
    for char in str:
        if char == "<":
            in_tag = True
        if not in_tag:
            if not last_tag.startswith("<script"):
                if not last_tag.startswith("<style"):
                    text += char
        if in_tag:
            tag += char
        if char == ">":
            in_tag = False
            text += " "
            last_tag = tag.lower()
            tag = ""

    return text.lower().split()

if __name__ == "__main__":

    logging.basicConfig(filename="analyse.log", level=logging.DEBUG)
    logger.debug("programme started")
    logger.debug("reading blacklists...")

    files = glob("pages/*")
    clas = ['gamble', 'updatesites', 'music', 'hacking', 'webtv', 'ringtones', 'porn', 'webradio', 'violence', 'dating', 'drugs', 'tracker', 'models', 'isp', 'searchengines', 'dynamic', 'socialnet', 'weapons', 'forum', 'jobsearch', 'aggressive', 'chat', 'webphone', 'spyware', 'redirector', 'webmail', 'warez', 'religion', 'movies', 'shopping', 'adv', 'news', 'downloads', 'mail', 'games', 'mixed_adult', 'strict_redirector', 'adult', 'cleaning', 'liste_bu', 'financial', 'proxy', 'dangerous_material', 'reaffected', 'forums', 'marketingware', 'tricheur', 'radio', 'drogue', 'mobile-phone', 'ads', 'astrology', 'sexual_education', 'agressif', 'publicite', 'strong_redirector', 'gambling', 'filehosting', 'sect', 'blog', 'audio-video', 'phishing', 'suspect']


    ai = aipy.AI(" ".join(clas))

    for url, cla in blacklist([
                "blacklists/shalla/BL",
                "blacklists/uni_toulouse/blacklists",
                "blacklists/mesd/blacklists",
                ]):
        if "pages/"+url in files:
            logger.info("analysing " + url)
            words = get_words("".join(open("pages/"+url).readlines()))
            #print words
            if len(words) > 30:
                logger.info("training with " + url + " class: " + cla)
                ai.tell(" ".join(words), cla)
        else:
            logger.info("couldn't find " + url)
    logger.info("programme finished")

</code>
