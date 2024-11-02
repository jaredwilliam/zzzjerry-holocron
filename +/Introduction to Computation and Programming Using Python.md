---
date: 2024-07-09
type: Book
author: "[[John V. Guttag]]"
up: "[[Books]]"
---



## 2. Introduction to Python
### 2.1 The Basic Elements of Python
#### 2.1.1 Objects, Expressions, and Numerical Types

*pg. 9*
**Objects** are the core things that Python programs manipulate. Every object has a **type** that defines the kinds of things that programs can do with that object.  There are **scalar** objects that are indivisible and **non-scalar** objects (like strings) that have internal structure. 

*pg. 10*
Many objects can be denoted by **literals** in the text of a program. 

> [!note]-
> A "literal" is a fixed value that appears directly in the source code. 
> ```python
> x = 5
> ```
> Here, 5 is a literal.

Python has four types of scalar objects
- `int` is used to represent integers
- `float` is used to represent real numbers. It is also possible to write floats using scientific notation, e.g., `1.6E3`
- `bool` is used for Boolean values `True` and `False`
- `None` is a type with a single value. Discussed in Chapter 4 Section 1. 

#### 2.1.2 Variables and Assignment
In Python, a variable is just a name, nothing more. An assignment statement associates the name on the left of the = symbol with the object denoted by the expression to the right of the = symbol. An object can have one, multiple, or no name associated with it. 

Python allows multiple assignment. 

```python
x, y = 2, 3
```

This binds `x` to `2` and `y` to `3`. All of the expressions on the right of the assignment are evaluated before bindings are changed. This is convenient since it allows you to swap assignments to variables. 

```python
x, y = 2, 3
x, y = y, x
print('x = ', x)
print('y = ', y)

>> x = 3
>> y = 2
```

### 2.2 Branching Programs
**Indentation** is semantically meaningful in Python. Most other programming languages use some sort of bracketing symbols to delineate blocks of code. An advantage of the Python approach is that it ensures that the visual structure of the program is an accurate representation of the semantic structure of the program. 

### 2.4 Iteration
Executing a **break** statement terminates the loop in which it is contained, and transfers control to the code immediately following the loop. 

> [!note]-
> If in a nested loop, the `break` statement will give control back to the "parent" loop. 

## 3. Some Simple Numerical Programs
### 3.3 Approximate Solutions and Bisection Search
**Bisection search** is when the search space is cut in half with each step. Here is a script using bisection search to approximate the square root. 

```python
x = 25
epsilon = 0.01
numGuesses = 0
low = 0.0
high = max(1.0, x)
ans = (high + low) / 2.0
while abs(ans**2 - x) >= epsilon:
	print('low =', low, 'high =', high, 'ans =', ans)
	numGuesses += 1
	if ans**2 < x:
		low = ans
	else:
		high = ans
	ans = (high + low) / 2.0
print('numGuesses =', numGuesses)
print(ans, 'is close to square root of', x)
```




## Functions, Scoping, and Abstraction

## Structured Types, Mutability, and Higher-Order Functions

## Testing and Debugging

## Exceptions and Assertions

## Classes and Object-Oriented Programming

## A Simplistic Introduction to Algorithmic Complexity

## Some Simple Algorithms and Data Structures

## Plotting and More About Classes

## Knapsack and Graph Optimization Problems

## Dynamic Programming

## Random Walks and More About Data Visualization

## Stochastic Programs, Probability, and Distributions

## Monte Carlo Simulation

## Sampling and Confidence Intervals

## Understanding Experimental Data

## Randomized Trials and Hypothesis Checking

## Conditional Probability and Bayesian Statistics 

## Lies, Damned Lies, and Statistics

## A Quick Look at Machine Learning

## Clustering

## Classification Methods