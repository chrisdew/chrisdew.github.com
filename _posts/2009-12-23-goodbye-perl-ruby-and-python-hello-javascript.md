--- 
layout: post
title: "Goodbye Perl, Ruby and Python.  Hello JavaScript. "
created: 1261570798
---
I read <a href="http://javascript.crockford.com/">Douglas Crockford's book</a> and was rather inspired.

Now JavaScript is starting to grow up, with excellent projects including <a href="http://github.com/thatcher/env-js">env-js</a>, <a href="http://nodejs.org/">nodeJS</a>, <a href="http://commonjs.org/">CommonJS</a>, <a href="http://code.google.com/p/v8/">v8</a> and <a href="http://jquery.com/">jQuery</a>, what are the reasons to still use other 'scripting' languages.  (I'm not using 'scripting' in a derogatory way - I suppose I mean dynamic/interpreted.)

This is a question which is currently very close to me.  I know Python well, and Ruby to a good degree.  We are starting a greenfield project and we will need a scripting language.

Other developers in the team each know one or more scripting languages, but it would seems sensible to use one scripting language for this project.

JavaScript is an attractive candidate for this post, as we all know a bit of it, and skills we gain (and libraries we write) will apply to both the browser and server-side.  It's better to use my limited brain power to solve problems, rather than to remember three different languages' array, string and hashtable syntax and methods.

My question: is JavaScript a usable alternative to Perl, Ruby and Python.  Server-side will be exclusively Linux.

Can JavaScript (on the Linux server-side):

<ul>
<li>Open local files?</li>
<li>Create processes (JavaScript, shell, exec)?</li>
<li>Control, communicate with, and join and kill processes?</li>
<li>Be modularised?</li>
<li>Be debugged?</li>
<li>Open TCP connections (as a client)?</li>
<li>Send UDP packets?</li>
<li>Listen for UDP packets?</li>
<li>Be unit tested (browserless)?</li>
<li>Talk to C(++) code?</li>
<li>Have a web framework (Rails/Django)?</li>
<li>Be executed as a script?</li>
<li>Talk to databases (MySQL, SQLite Postgres) (asynchronously)?</li>
</ul>

I have the feeling that all of these are possible, after browsing the projects mentioned at the start of the post, but I would love to have real-world practical confirmation before jumping in.  How well does JavaScript enable you to manage complexity?  This is a big issue which can never be addressed with an example, but needs experience instead.

If you've used JavaScript as your main scripting language for more than a few weeks, please post your experiences and answers below, so that we can all benefit.

Or on <a href="http://www.reddit.com/r/programming/comments/ahtq7/goodbye_perl_ruby_and_python_hello_javascript/">Reddit</a>.
