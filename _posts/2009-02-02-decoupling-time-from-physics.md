--- 
layout: post
title: Decoupling time from physics.
created: 1233610852
---
It's possible to decouple time from physics, and it's especially easy in Haskell.

The (higher order) function below (lazily) accepts a list of events and yields a function which can give the historical or predicted displacement at any given time.

Note: The events do <strong>not</strong> have to be in chronological order - this provides a way to deal with <strong>lag</strong> in networked games.

The lazy nature of Haskell means that if the list of events is infinite (e.g. data from a network socket) then the generated function will give improved accuracy of position (for a given time) as more events are received.  

<code type='haskell'>
newtype EvTime = T Double
newtype Impulse = I Double
newtype Displacement = D Double
  deriving (Eq,Show)
data Event = Ev EvTime Impulse

-- I can't yet figure out how to define or derive (+) for Displacement
plus (D x) (D x') = D (x + x')

-- 'calc' returns a function which calculates displacement at a given time,
-- provided a list of events are provided
calc :: [Event] -> (EvTime -> Displacement)
calc [] = (\ _ -> D 0.0) 
calc (Ev (T et) (I i):es) = f
  where
    f (T t) = if t > et
                then -- physics assumes unit mass
                  D ((t - et) * i) `plus` calc es (T t)
                else
                  calc es (T t)


</code>


Here's a simple demonstration...
<code>
*Main> :load Eventual.hs
[1 of 1] Compiling Main             ( Eventual.hs, interpreted )
Ok, modules loaded: Main.
*Main> let l = [Ev (T 1.0) (I 1.0), Ev (T 4.0) (I 0.5), Ev (T 2.0) (I (-2.0))]
*Main> let f = calc l
*Main> f (T 0.0)
D 0.0
*Main> f (T 0.5)
D 0.0
*Main> f (T 1.0)
D 0.0
*Main> f (T 1.5)
D 0.5
*Main> f (T 2.0)
D 1.0
*Main> f (T 2.5)
D 0.5
*Main> f (T 3.0)
D 0.0
*Main> f (T 3.5)
D (-0.5)
*Main> f (T 4.0)
D (-1.0)
*Main> f (T 4.5)
D (-1.25)
*Main> f (T 5.0)
D (-1.5)


</code>
