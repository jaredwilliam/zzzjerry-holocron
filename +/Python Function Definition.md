---
date: 2023-12-16
---

In Python, each function definition is of the form:

```python
def name_of_function(list_of_formal_parameters):
	body_of_function
```

For example, 

```python
def maxVal(x, y):
	if x > y:
		return x
	else:
		return y
```

- `def` is a reserved word that tells Python that a function is about to be defined. 
- `maxVal` is just a name for the function so we can refer to it later. 
- `x` and `y` are the [[Formal Parameters]] of the function.
- The function body is any piece of Python code. 
- The [[Python return Statement]] can only be used within the body of a function.


## Related Concepts
- [[Built In Functions]]
- [[User Defined Functions]]

## References
- [[4.1.1 Function Definitions]]