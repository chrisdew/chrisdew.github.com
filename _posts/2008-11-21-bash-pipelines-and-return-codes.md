--- 
layout: post
title: Bash pipelines and return codes.
created: 1227249219
---
Yesterday, I needed to know if a command in a pipeline failed.  

Unfortunately a pipeline's exit code is the exit code of the <b>last</b> command in the pipeline.
<code type="bash">
chris@chris-laptop:~$ cat not_here.txt | sort
cat: not_here.txt: No such file or directory
chris@chris-laptop:~$ echo $?
0

</code>

I did manage to find a solution.  Bash has an option to make pipelines return the last <b>non-zero</b> return code.
<code type="bash">
chris@chris-laptop:~$ set -o pipefail
chris@chris-laptop:~$ cat not_here.txt | sort
cat: not_here.txt: No such file or directory
chris@chris-laptop:~$ echo $?
1


</code>
