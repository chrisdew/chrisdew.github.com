--- 
layout: post
title: Thoughts on Bresenham's Algorithm in Haskell
created: 1253557964
---
I'm still hacking away at little bits of Haskell, gradually learning my way around.

I happened to find code for Bresenham's Algorithm on <a href="http://rosettacode.org/wiki/Bresenham%27s_line_algorithm#Haskell">Rosetta Code</a>.  It made me uncomfortable - it looked like the author had pushed a C-shaped programme into Haskell-shaped syntax.  

This was just my first impression - I don't know the language well enough to know when to use the State Monad - and I'm certainly not qualified to criticise the orginal author of the following code.

<code type="Haskell">
module Bitmap.Line(line) where
-- code from the Rosetta Code project

import Bitmap
import Control.Monad
import Control.Monad.ST
import qualified Data.STRef
 
var = Data.STRef.newSTRef
get = Data.STRef.readSTRef
mutate = Data.STRef.modifySTRef
 
line :: Color c => Image s c -> Pixel -> Pixel -> c -> ST s ()
line i (Pixel (xa, ya)) (Pixel (xb, yb)) c = do
    yV <- var y1
    errorV <- var $ deltax `div` 2
    forM_ [x1 .. x2] (\x -> do
        y <- get yV
        setPix i (Pixel $ if steep then (y, x) else (x, y)) c
        mutate errorV $ subtract deltay
        error <- get errorV
        when (error < 0) (do
            mutate yV (+ ystep)
            mutate errorV (+ deltax)))
  where steep = abs (yb - ya) > abs (xb - xa)
        (xa', ya', xb', yb') = if steep
          then (ya, xa, yb, xb)
          else (xa, ya, xb, yb)
        (x1, y1, x2, y2) = if xa' > xb'
          then (xb', yb', xa', ya')
          else (xa', ya', xb', yb')
        deltax = x2 - x1
        deltay = abs $ y2 - y1
        ystep = if y1 < y2 then 1 else -1


</code>
<br/>

I'm still a beginner at Haskell, but would a solution along the following lines be more idiomatic?  Would it be less efficient?

<code type="Haskell">
module Line(line) where

line :: (Int, Int) -> Int -> [(Int, Int)]
line (x, y) inv_grad = line' (x, y) inv_grad (inv_grad `div` 2)

line' :: (Int, Int) -> Int -> Int -> [(Int, Int)]
line' (x, y) inv_grad 0 =     (x, y) : line' (x+1, y+1) inv_grad (inv_grad-1)
line' (x, y) inv_grad err_y = (x, y) : line' (x+1, y) inv_grad (err_y-1)


</code>

Note: this code is <strong>not</strong> functionally equivalent, just a proof of concept.  It can only produce lists of points in the first octant.  <code>inv_gradient</code> is one divided by the line's gradient.

<code type="haskell">
*Line> :load bresenham
[1 of 1] Compiling Line             ( bresenham.hs, interpreted )
Ok, modules loaded: Line.
*Line> take 10 $ line (0, 0) 3
[(0,0),(1,0),(2,1),(3,1),(4,1),(5,2),(6,2),(7,2),(8,3),(9,3)]


</code>

Please post comments either below, or on <a href="http://www.reddit.com/r/haskell/comments/9mp6j/thoughts_on_bresenhams_algorithm_in_haskell/">Reddit</a>.
