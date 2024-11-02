---
date: 2024-06-20 06:16
type:
  - "[[Evergreen]]"
tags:
  - evergreen
source:
  - "[[Computation and Programming Using Python]]"
---
#unpublished

This simple algorithm is used to find the square roots of a polynomial with one variable, e.g., $3x^2 + 2x  + 3$. 

If $p$ is a polynomial and $r$ a real number, we write $p(r)$ to stand for the value of the polynomial when $x = r$. A root of a polynomial is a solution to the equation $p=0$, i.e., a value of $r$ such that $p(r)=0$. 

For example, finding an approximate value of the square root of $24$ can be formulated as finding a value for $x$ such that $x^2 - 24 \approx 0$.

If one guesses a value to be the approximation of a square root of a number, call it $g$, then $g - p(g) / p'(g)$ is a better approximation ($p'$ is the first derivative of $p$). 

[GitHub Code](https://github.com/jaredwilliam/PythonVault/blob/main/newton-raphson-square.py)

## Related
- [[Isaac Newton]]
- [[Algorithms]]