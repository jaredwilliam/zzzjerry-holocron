---
date: 2024-07-28 07:04
type: seedling
tags: 
published: false
source: 
---

## Overview
Perlin Noise is a type of [[Gradient Noise]] developed by [[Ken Perlin]] in 1983. It was originally developed for [[Procedural Textures]] in [[3D Art]], but has many uses, including [[Procedurally Generated Terrain]], applying [[Pseudo-Random]] changes to a variable, and others. 

One dimensional Perlin Noise
- Imagine that you have a function that generates random numbers (between 0 and 1) over time
- Perlin Noise is the same idea, but the random numbers are "smoothed", meaning that a randomly selected point is related to the point before it and after it. 
- Perlin noise values are generated basically by having a bunch of math on top of a random function.

## Algorithm
Say that you pick random values over time. Say that you pick a random number every 10 units of time. You will pick random values within a range, say 0 and 100. 

After you have those random numbers, you want to do an [[Interpolation]].

[[Cosine Interpolation]] - curves are drawn between the values. 

Now you repeat the generation of the random numbers, but you half the amplitude and double the frequency. So following from our first generation of values, our second set of values would have a random number every 5 units of time and the range would be 0 to 50. We repeat this as many times as we like and add the results. 
- The relationship between these different sets of waveforms are called octaves

## Random Function
With a random function, `random()`, you can pass in a minimum value and a maximum value and the function will generate a random number. The `noise()` function only takes one input though. You'd think it would take in the same or similar inputs as `random()` but because of the nature of how Perlin Noise is calculated, you need to give it a different argument. The issue is that Perlin Noise isn't really just a single independent number. It is a set of numbers that are related to each other, and you can ask for a specific Perlin Noise value at a particular point in time or space. 

This is an example of calling the `random()` function multiple times in P5JS would look like:

```javascript
> random()
> 0.387091433544449904

> random()
> 0.45297154128297024

> random(100)
> 9.890066516358242

> random(100)
> 21.609611684128026
```

As expected. Calling `noise()`:

```javascript
> noise()
> NaN

> noise(100)
> 0.5775423354280828

> noise(100)
> 0.5775423354280828

> noise(100)
> 0.5775423354280828

> noise(100.01)
> 0.5779736578991437
```

The `noise()` function needs an argument. Notice that each call of `noise(100)` results in the same output, and slightly changing that input changes the output slightly. What you are passing into the `noise()` function is akin to passing in a position along the x-axis and the return value is the Perlin Noise at that x-axis position. 

Perlin Noise does not have a [[Uniform Distribution]] of its random numbers, it's more of [[Normal Distribution]].

## How to Graph Perlin Noise


## Sources
- [[Perlin Noise in P5JS]]
- [[Noise vs Random in P5JS]]
- [[How to Graph Perlin Noise with P5JS]]
