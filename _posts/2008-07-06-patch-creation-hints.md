--- 
layout: post
title: Patch creation hints.
created: 1215327172
---
I have a mental block on how to create and apply a patch.  I'm forever needing to go back to the man pages, which is frustrating.

Here are the commands which I use:
<ul>
<li><code>diff -ruNx .svn olddir newdir > patch</code></li>
<li><code>cd targetdir ; patch -p1 < ../patch</code></li> 
</ul>
I run the diff from the comment parent directory of the two trees I wish to diff.  The .svn parameter is the name of subdirectories I do not want included in the diff.  (I use subversion, if you hadn't guessed.)  The -p1, on the patch command, causes the first component of the path (olddir/newdir) to be ignored.

