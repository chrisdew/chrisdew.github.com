--- 
layout: post
title: How to find the filenames and mdsums of all 'normal' files.
created: 1250684262
---
Another note to self...

<code type="bash">
$ find . -type f -exec bash -c "
OUT=\$(md5sum {})
P1=\$( echo \${OUT} | cut -d ' ' -f 2 )
P2=\$( echo \${OUT} | cut -d ' ' -f 1 )
echo \$P1 \$P2
" \;

</code>
