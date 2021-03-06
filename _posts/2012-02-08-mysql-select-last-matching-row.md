---
layout: post
title: A MySQL query to find the last matching row(s).
---

After having to reinvent this query three times, I'm actually blogging it this time.  It always seems obvious afterwards, but takes me about half and hour to write fron scratch.

Here's a table:
    CREATE TABLE foo (
        id INT(10) NOT NULL AUTO_INCREMENT,
        uid INT(10) NOT NULL,
        value VARCHAR(50) NOT NULL,
        PRIMARY KEY (`id`),
        INDEX `uid` (`uid`)
    )

containing:
    id, uid, value
     1,   1, hello
     2,   2, cheese
     3,   2, pickle
     4,   1, world

The data represents two objects (uids 1 and 2) which go through a couple of values.  (Google 'event sourcing' and 'CQRS' for more info.) 

I want to make a view of the 'latest' values of each uid, to simplify querying.

It can be done with: 
    select id, uid, value 
    from foo as a
    where a.id = (select max(id) from foo where uid = a.uid group by uid)
    ;

The above query produces:
    id, uid, value
     3,   2, pickle
     4,   1, world

There is bound to be a more efficient way to do this, so I'll ask on <a href="http://stackoverflow.com/questions/9192673/returning-the-last-row-of-each-group-by-in-mysql">StackOverflow</a>...
