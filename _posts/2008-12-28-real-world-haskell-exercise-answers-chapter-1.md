--- 
layout: post
title: Real World Haskell - Exercise Answers - Chapter 1
created: 1230456229
---
I have started working my way through the exercises in Real World Haskell.  I'm going to comment on my thoughts on these questions, as well as supplying my attempt at answers.  (Remember, I'm just starting to learn Haskell, too.)  

I'm only posting answers to non-trivial questions which require code to be written for their answer.

Critique from Haskell experts would be much appreciated.

<strong>Page 16 - Question 3</strong>
The existing lines turned the input into a list, each element of which was a line.  By replacing the lines function with words, the input is instead transformed into a list, each element of which is a list.  Counting the length of the list gives us the number of words in the file.
<code type="haskell">
main = interact wordCount
    where wordCount input = show (length (words (input))) ++ "\n"


</code>
<strong>Page 16 - Question 4</strong>
A 'String' is Haskell is simply a alias for a list of 'Char's.  Instead of splitting the input into an array of lines or words, we just let Haskell treat it as a list of characters.  Taking the length therefore gives us the number of characters in the input.
<code type="haskell">
main = interact wordCount
    where wordCount input = show (length (input)) ++ "\n"


</code>
Continue to <a href='http://www.finalcog.com/real-world-haskell-exercise-answers-chapter-2'>chapter 2</a>...
