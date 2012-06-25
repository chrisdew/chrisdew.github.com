---
layout: post
title: Values, Functions and Async in C, NodeJS and Haskell.
---

Obtaining result in a program typically comes from one of three places:

1. A variable:
<code>
int res = v;
</code>

2. A function:
<code>
int res = fn(v);
</code>

3. An asynchronous function:
<code>
int callback(res) { ... }
async(v, &callback);
</code>



