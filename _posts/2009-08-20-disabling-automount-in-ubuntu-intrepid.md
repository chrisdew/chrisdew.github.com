--- 
layout: post
title: Disabling automount in Ubuntu Intrepid
created: 1250771106
---
This took a few minute to find...

<code>
$ gconf-editor

apps > nautilus > preferences
Remove the tick from the "media_automount" option.

</code>
