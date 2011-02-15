--- 
layout: post
title: Untarring symlinks.
created: 1215758286
---
When you extract a tar file over an existing file structure, symlinks within the tar file behave in the following way:
<ul>
<li>If the path of the symlink is currently a file, then that file is replaced with the symlink.</li>
<li>If the path of the symlink is currently an empty directory, then that empty directory is replaced with the symlink.</li>
<li>If the path of the symlink is currently a <em>non-empty</em> directory, then the tarred symlink is completely ignored.</li>
</ul>
This can cause a lot of grief, if you're not expecting this behaviour. 
