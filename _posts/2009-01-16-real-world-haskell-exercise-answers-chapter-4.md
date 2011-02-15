--- 
layout: post
title: Real World Haskell - Exercise Answers - Chapter 4
created: 1232139119
---
<strong>Page 84 - Question 1</strong>
This question seems quite obvious, just match the patterns for arguments which would return an empty list, and return Nothing instead.
<code type="haskell">
safeHead :: [a] -> Maybe a
safeHead (x:xs) = Just x
safeHead _      = Nothing

safeTail :: [a] -> Maybe [a]
safeTail []     = Nothing
safeTail (x:[]) = Nothing
safeTail (x:xs) = Just xs

safeLast :: [a] -> Maybe a
safeLast []     = Nothing
safeLast (x:[]) = Just x
safeLast (x:xs) = Just (last xs)

safeInit :: [a] -> Maybe [a]
safeInit []     = Nothing
safeInit (x:[]) = Nothing
safeInit x      = Just (init x)



</code>
<strong>Page 84 - Question 2</strong>
This one is tricky - I've come up with a couple of different answers.  Which is more Haskell-ish?
<code type="haskell">
splitWith :: (a -> Bool) -> [a] -> [[a]]
splitWith f [] = []
splitWith f xs = fst (break f xs) : splitWith f (h (snd (break f xs)))
                          where
                          h [] = []
                          h x  = tail x

splitWith2 :: (a -> Bool) -> [a] -> [[a]]
splitWith2 f xs = let (pre, suf) = break f xs
                  in pre : case suf of
                                []     -> []
                                (x:[]) -> []
                                (x:xs) -> splitWith2 f xs


</code>
