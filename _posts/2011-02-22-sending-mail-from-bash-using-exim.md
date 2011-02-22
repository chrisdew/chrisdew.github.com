---
layout: post
title: Sending Mail from Bash using Exim's Mail Command
---

After trawling through dozens of sendmail based blog posts, I finally figured out how to send an email from bash using the mail implementation provided by Exim on Ubuntu.

    echo $EMAIL_BODY | mail -s "$SUBJECT" -a "From: $FROM" $TO

It was the setting of the From: field which caused me trouble.  The internet just kept telling me to use <code>-- -f $FROM</code> which does not work with exim.
