--- 
layout: post
title: Real World Haskell - Exercise Answers - Chapter 2
created: 1230456947
---
<strong>Page 39 - Question 1</strong>
<ul>
<li>'last' cannot know what type 'a' is, therefore it cannot create a value of type 'a'.</li>
<li>'last' is a pure function, so it cannot interact with network or disks, nor accept input, not write anything to the screen.</li>
<li>'last' is not told that type 'a' has any operators, therefore it cannot combine elements of [a].</li>
</ul>
It must be limited to returning one of the elements of [a].  We cannot determine which one, but the name 'last' gives us a clue.  

<strong>Page 39 - Question 2</strong>
The answer to this question splits the incoming array into first, second and 'the rest'.  Once there is no 'the rest' - i.e. second is the last element of the list, the function returns the first value, which must be the second from last, as 'y' is then the last element of the list.
<code type='haskell'>
lastButOne :: [a] -> a
lastButOne (x:y:xs) = if null xs
                      then x
                      else lastButOne (y:xs)


</code>
This can be rewritten with guards.  Although, at the point of writing this, I'm only on chapter 3 - I already consider the guarded version to be the easier to read.
<code type='haskell'>
lastButOne2 :: [a] -> a
lastButOne2 (x:y:[]) = x
lastButOne2 (x:y:xs) = lastButOne2 (y:xs)


</code>
Continue to <a href='http://www.finalcog.com/real-world-haskell-exercise-answers-chapter-3'>chapter 3</a>...
