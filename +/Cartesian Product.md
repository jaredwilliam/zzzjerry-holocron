---
date: 2023-08-23
---

[[Python]]

---

A mathematical operation that returns a set from multiple sets by taking all possible ordered pairs (or triples, etc.) from the given sets. 

```python
from itertools import product

x = [1, 2, 3]
y = [10, 20, 30]
z = [100, 200, 300]

combinations = list(product(x, y, z))

print(combinations)

>> [(1, 10, 100), (1, 10, 200), (1, 10, 300), (1, 20, 100), (1, 20, 200), (1, 20, 300), (1, 30, 100), (1, 30, 200), (1, 30, 300), (2, 10, 100), (2, 10, 200), (2, 10, 300), (2, 20, 100), (2, 20, 200), (2, 20, 300), (2, 30, 100), (2, 30, 200), (2, 30, 300), (3, 10, 100), (3, 10, 200), (3, 10, 300), (3, 20, 100), (3, 20, 200), (3, 20, 300), (3, 30, 100), (3, 30, 200), (3, 30, 300)]
```

---

## Links and Relationships
- [[Mathematics]]
- [[itertools_product.py]]
- [[Itertools]]
- 
## References
[Any external resources or materials that have informed or inspired the note. Include author, title, publication date, and URL or other citation information]

1. [Reference 1]
2. . . .


