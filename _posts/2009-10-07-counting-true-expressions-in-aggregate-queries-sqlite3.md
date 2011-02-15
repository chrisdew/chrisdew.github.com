--- 
layout: post
title: Counting true expressions in aggregate queries (sqlite3).
created: 1254924350
---
Today, while working for <a href='http://www.appliansys.com'>ApplianSys</a>, I needed to count how many times an expression was True in an aggregate query.

My query began... 

<code>SELECT MAX(reply_size), COUNT(*), req_method, req_scheme, req_hostname, req_port, req_path, req_query, req_fragment, COUNT(cache_status LIKE '%HIT%')</code>

Sqlite3 told me that all of the records were hits (as I misinterpreted the results), which was incorrect.

So, in desperation, I looked at the <a href='http://www.sqlite.org/lang_aggfunc.html'>documentation</a>.  It didn't even mention the possibility of using an expression - <code>COUNT</code> was just for counting non-NULL columns.

Taking a trick from Python, I tried <code>COUNT(cache_status LIKE '%HIT%' OR NULL)</code> and it worked :-)

<code>COUNT</code> counts how many rows satisfy the condition that the expression is not NULL.  Being False doesn't count (or rather it does).  The short circuiting <code>OR</code> causes the expression to evaluate to NULL whenever the first part is False.  Hence, only the True expressions are counted. 
