--- 
layout: post
title: Haskell, right folds (foldr) and inifinite lists of semi-primes.
created: 1230646718
---
I think I'm getting to grips with foldr now.

I've written a couple of functions, one which returns the infinite list of odd primes, and one which returns the list of odd primes less than x.

I wanted to 'fuse' these infinite and finite lists together, using multiplication, to produce the infinite list of the odd, non-square semi-primes.  After an hour of playing around with foldl, I tried foldr, and realised that it is exactly what I needed to <strong>lazily</strong> generate the infinite list of odd, non-square semi-primes.

The code below could easily be modified, if you need the square and/or even semi-primes. 

<code type='haskell'>
oddNonSquareSemiPrimes :: [Integer]
oddNonSquareSemiPrimes = foldr f [] oddPrimes
    where
    f x ys = (map (\p -> p * x) (oddPrimesLessThan x)) ++ ys


</code>

Continue to <a href='http://www.finalcog.com/real-world-haskell-exercise-answers-chapter-4'>chapter 4</a>...
