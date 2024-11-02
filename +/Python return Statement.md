---
date: 2023-12-16
---

Can only be used within the body of a function. 

The format of the return statement is:

```python
return [expression_list]
```

The expression list is optional. If there is an expression, it will be evaluated, otherwise `None` will be substituted. 

`return` will cause Python to leave the function call with the evaluated expression (or `None`).

If the function call was assigned to a variable name, the evaluated expression (or `None`) will be assigned to that variable. 

For example, 

```python
def maxVal(x, y):
	if x > y:
		return x
	else:
		return y

max_number = maxVal(x=3, y=4)

print(max_number)

>>> 4
```

The variable `max_number` is given the value of the expression that is returned by the `maxVal` function call. 

## Related Concepts
- [[Python Function Definition]]
- [[Python None Value]]

## References
- [[4.1.1 Function Definitions]]
- [The `return` Statement](https://docs.python.org/3/reference/simple_stmts.html#the-return-statement)

