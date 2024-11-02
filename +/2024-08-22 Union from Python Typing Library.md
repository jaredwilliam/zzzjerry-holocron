---
up: "[[Add]]"
created: "2024-08-22"
tags: []
---
`Union` from Python's `typing` library is used for type hinting to indicate that a value can be one of several types. It's particularly useful when a function can accept or return multiple types of data.

Here's a brief overview of `Union`:

1. Purpose:
    - To specify that a variable, parameter, or return value can be of multiple types.
2. Basic syntax:
```python
from typing import Union

def func(param: Union[Type1, Type2, ...]) -> Union[ReturnType1, ReturnType2, ...]:
    ...
```

1. Common use cases:
    - Functions that can handle different input types
    - Variables that might hold different types of data
    - Return values that could be of different types depending on conditions

Here's a simple example to illustrate its use:
```python
from typing import Union

def process_data(data: Union[str, int, float]) -> Union[str, float]:
    if isinstance(data, str):
        return data.upper()
    else:
        return float(data) * 2

# Usage
result1 = process_data("hello")  # Returns "HELLO"
result2 = process_data(5)        # Returns 10.0
result3 = process_data(3.14)     # Returns 6.28
```

In this example:

- The `data` parameter can be a string, integer, or float.
- The return value can be either a string or a float.

Key points about `Union`:

1. It's part of Python's gradual typing system and doesn't affect runtime behavior.
2. It's used by type checkers and IDEs to provide better code analysis and suggestions.
3. In Python 3.10+, you can use the `|` operator instead of `Union`, e.g., `str | int | float`.