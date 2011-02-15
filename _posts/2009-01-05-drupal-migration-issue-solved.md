--- 
layout: post
title: Drupal migration issue solved.
created: 1231167325
---
A few months ago I was <a href='http://www.finalcog.com/drupal-migration-issues'>prevented from migrating my drupal installation</a>, because of a strange <a href='http://drupal.org/node/334816'>bug</a>.

It turns out that if you apply a configuration from a server which <strong>passed</strong> the <a href='http://drupal.org/node/15365'>clean urls' test</a> to a machine which would fail it, then the bug occurs.

I simply needed to enable mod_rewrite in order to fix the problem:

<code type='bash'>
root@www:/etc/apache2/mods-enabled# ln -s ../mods-available/rewrite.load .
root@www:/etc/apache2/mods-enabled# /etc/init.d/apache2 restart


</code>
