--- 
layout: post
title: Redmine, git and the post-commit / post-receive hook.
created: 1226832619
---
Recently I submitted a <a href='http://www.redmine.org/issues/show/2192'>bug</a> report to Redmine.

I was impressed that it was answered with a few hours.  I wanted autofetch to happen on every page whose display could be affected by the results on an autofetch.  i.e. at least the issues and repository pages.

They came back with a perfectly valid reason as to why this wasn't a good idea and pointed me to a solution to my problem: setting-up a repository hook to trigger a update of changesets on each push.

I initially, mistakenly, set this up as a post-commit hook.  I was confused because of years of subversion.  (Committing in git is done locally - it's pushes are more of an equivalent to svn's commits when viewing things from an svn-inspired/indoctrinated client-server workflow.)

I then found out that it needed to be a post-receive hook.  This is run whenever a remote client pushes to the central git respository.

This is my .git/post-receive.  It needed to be chmodded to 755.

<code>
#!/bin/bash
#
# An example hook script for the post-receive event
#
# This script is run after receive-pack has accepted a pack and the
# repository has been updated.  It is passed arguments in through stdin
# in the form
#  <oldrev> <newrev> <refname>
# For example:
#  aa453216d1b3e49e7f6f98441fa56946ddcd6a20 68f7abf4e6f922807889f52bc043ecd31b79f814 refs/heads/master
#
# see contrib/hooks/ for an sample, or uncomment the next line (on debian)
#

echo "running post-receive hook..."
cd /opt/redmine
ruby script/runner "Repository.fetch_changesets" -e production


</code>
Of course, now that I've discovered how easy and useful git hooks are to use, I can start using them for autotomatic testing and building :-)

Although this works, I'm now wondering if it should be a post-update script, rather than a post-receive.  Why is it working as a post-receive?  
