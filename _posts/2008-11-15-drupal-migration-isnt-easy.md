--- 
layout: post
title: Drupal migration isn't easy.
created: 1226784080
---
Drupal gives you a nice module (Backup and Migrate) to use when migrating a site between servers.

It exports the site's database as a huge sequence of sql commands.  These can then be uploaded to the target machine.

Unfortunately, as soon as these commands are run on the database (whether through drupal, or manually) the target site breaks.  The front screen of the site continues to work, but request for other urls result in the following errors:

<code>
[Sat Nov 15 21:14:27 2008] [error] [client 213.232.82.84] File does not exist: /var/www/drupal-5.7/files/color, referer: http://beta.finalcog.com/files/color/garland-510d4072/style.css
[Sat Nov 15 21:14:29 2008] [error] [client 213.232.82.84] File does not exist: /var/www/drupal-5.7/node, referer: http://beta.finalcog.com/logout
[Sat Nov 15 21:14:30 2008] [error] [client 213.232.82.84] File does not exist: /var/www/drupal-5.7/files/color, referer: http://beta.finalcog.com/files/color/garland-510d4072/style.css
[Sat Nov 15 21:14:31 2008] [error] [client 213.232.82.84] File does not exist: /var/www/drupal-5.7/node, referer: http://beta.finalcog.com/node/33

</code>

Request for real files, such as install.php and index.php continue to work.



If anyone has seen this <a href='http://drupal.org/node/334816'>problem</a> before, please point me at an answer...
