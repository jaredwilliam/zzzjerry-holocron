---
date: 2023-12-16
---

Formal parameters in a Python function are the referring to the parameters used in the function definition itself. When the function is used, the formal parameters are bound to the [[Actual Parameters]], sometimes called [[Arguments]], of the function call. 

For example, in this piece of code:

```python
def maxVal(x, y):
	if x > y:
		return x
	else:
		return y

maxVal(x=3, y=4)
```

The `x` and `y` are in the function definition are the formal parameters. The `x=3` and `y=4` (or rather, the *value they evaluate to*) are the actual parameters (or arguments). 

I prefer using the term argument. 

## Related Concepts
- [[Python Function Definition]]

## References
- [[4.1.1 Function Definitions]]
- [Formal and Actual Parameters in Python Function](https://stackoverflow.com/questions/45065288/formal-and-actual-parameters-in-a-function-in-python)

