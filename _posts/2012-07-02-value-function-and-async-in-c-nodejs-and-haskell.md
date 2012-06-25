---
layout: post
title: Values, Functions and Async in C, NodeJS and Haskell.
---

Obtaining result in a program typically comes from one of three places:

1. A variable:

{% highlight c %}
int res = v;
{% endhighlight %}

{% highlight python %}
res = v
{% endhighlight %}

{% highlight haskell %}
let res = v
{% endhighlight %}

2. A function:

{% highlight c %}
int res = fn(v);
{% endhighlight %}

{% highlight python %}
res = fn(v)
{% endhighlight %}

{% highlight haskell %}
let res = v
{% endhighlight %}

3. An asynchronous function:

{% highlight c %}
int callback(res) { ... }
async(v, &callback);
{% endhighlight %}

{% highlight python %}
def callback(res): 
    ...
async(v, callback)
{% endhighlight %}

{% highlight haskell %}
{% endhighlight %}


