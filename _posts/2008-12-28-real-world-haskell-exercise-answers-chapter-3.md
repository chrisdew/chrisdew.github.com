--- 
layout: post
title: Real World Haskell - Exercise Answers - Chapter 3
created: 1230457961
---
<strong>Page 60 - Question 1</strong>
This took me a few minutes to get write - it was the first occasion where just reading the text is was insufficient for me to get the syntax right first time.  (This is my problem, not a problem with the book.)
The answer to this question is slightly tricky because ':' is an infix operator, whereas the parallel Cons is prefix.
<code type='haskell'>
data List a = Cons a (List a)
            | Nil
              deriving (Show)

fromList (x:xs) = Cons x (fromList xs)
fromList []     = Nil

toList :: List a -> [a]
toList (Cons x (xs)) = (x:toList xs)
toList Nil           = []


</code>
Below is code using (:) as a prefix function, rather than it's normal role of an infix operator.  This illustrates the perfect isomorphism between the new List type and the existing Haskell list type.
<code type='haskell'>
fromList2 ((:) x xs) = Cons x (fromList2 xs)
fromList2 []       = Nil

toList2 :: List a -> [a]
toList2 (Cons x xs) = (:) x (toList2 xs)
toList2 Nil       = []


</code>  
<strong>Page 60 - Question 2</strong>
I'm not sure that I've got to the bottom of this question.  My answer looks rather crude - suggestions for alternatives greatly appreciated.
<code type='haskell'>
data OCTree a = Node (Maybe a) (Maybe (OCTree a)) (Maybe (OCTree a))
                deriving (Show)
simpleTree = Node (Just "parent") (Just (Node (Just "left") Nothing Nothing)) (Just (Node (Just "right") Nothing Nothing))


</code>
Removing the option for the text to be optional shortens the answer slightly - but I still don't think I'm quite on the right track.
<code type='haskell'>
data OCTree2 a = Node2 a (Maybe (OCTree2 a)) (Maybe (OCTree2 a))
                 deriving (Show)
simpleTree2 = Node2 "parent" (Just (Node2 "left" Nothing Nothing)) (Just (Node2 "right" Nothing Nothing))


</code>
<strong>Page 69 - Questions 1 to 8</strong>
I found these questions to all be quite straightforward.  The intersperse function has grown my confidence in using guards, as they show the functions behaviour so clearly.
<code type='haskell'>
module P69 () where
import Data.List

len :: [a] -> Integer
len [] = 0
len (x:xs) = 1 + len xs

mean :: [Double] -> Double
mean x = sum(x) / fromInteger(len x)

palindrome :: [a] -> [a]
palindrome [] = []
palindrome (x:xs) = x:(palindrome xs) ++ [x]

isPalindrome :: Eq a => [a] -> Bool
isPalindrome x = x == reverse x

sortByLength :: [[a]] -> [[a]]
sortByLength [] = []
sortByLength x = sortBy f x
    where
        f p q = compare (length p) (length q)

intersperse2 :: Char -> [String] -> String
intersperse2 _ [] = ""
intersperse2 c (x:[]) = x
intersperse2 c (x:xs) = x ++ [c] ++ intersperse2 c xs


</code>
Continue to <a href='http://www.finalcog.com/haskell-infinite-list-semi-primes'>right folds</a>...
Continue to <a href='http://www.finalcog.com/real-world-haskell-exercise-answers-chapter-4'>chapter 4</a>...
