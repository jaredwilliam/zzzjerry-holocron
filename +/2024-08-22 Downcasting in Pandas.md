---
up: "[[Add]]"
created: "2024-08-22"
tags: []
---

Downcasting in Pandas refers to the process of reducing the memory usage of a DataFrame or Series by converting data types to a more memory-efficient representations **without** losing information. This is particularly useful when working with large datasets to optimize memory usage and potentially improve performance.

Here's a brief overview of downcasting in Pandas:

1. Numeric downcasting: Converting numeric columns to smaller dtypes if possible.
    - Integer downcasting: e.g., int64 to int32, int16, or int8
    - Float downcasting: e.g., float64 to float32
2. Object downcasting: Converting object columns to more specific types if possible.
    - Strings to categorical
    - Mixed-type object columns to more specific dtypes

To perform downcasting in Pandas, you can use the `pd.to_numeric()` function with the `downcast` parameter, or the `DataFrame.select_dtypes().apply(pd.to_numeric, downcast='integer')` method for specific column types.

Here's a simple example of numeric downcasting:

```python
import pandas as pd
import numpy as np

# Create a sample DataFrame
df = pd.DataFrame({
    'A': np.random.randint(0, 100, 1000),
    'B': np.random.rand(1000)
})

# Check initial memory usage
print(df.memory_usage(deep=True))

# Downcast numeric columns
df['A'] = pd.to_numeric(df['A'], downcast='integer')
df['B'] = pd.to_numeric(df['B'], downcast='float')

# Check memory usage after downcasting
print(df.memory_usage(deep=True))
```

> In your example, what if df['A'] happened to contain a float, e.g., 3.2? Would it be converted to an integer (3) and we lose information?

That's an excellent question! You're right to be concerned about potential loss of information. Let's break this down:
1. Behavior with mixed types: If df['A'] contained a mix of integers and floats (like 3.2), the `pd.to_numeric()` function with `downcast='integer'` would not actually downcast to an integer type. Instead, it would preserve the float values and use the smallest float type that can represent all the values without loss of precision.
2. No automatic truncation: The function doesn't automatically truncate or round float values to integers. It prioritizes preserving the data's integrity over aggressive downcasting.

Let's demonstrate this with an example:
```python
import pandas as pd
import numpy as np

# Create a sample DataFrame with mixed integer and float values
df = pd.DataFrame({
    'A': [1, 2, 3.2, 4, 5.7, 6]
})

print("Original dtype:", df['A'].dtype)

# Attempt to downcast
df['A'] = pd.to_numeric(df['A'], downcast='integer')

print("After downcast dtype:", df['A'].dtype)
print(df['A'])
```

This code will output something like:
```python
Original dtype: float64
After downcast dtype: float32
0    1.0
1    2.0
2    3.2
3    4.0
4    5.7
5    6.0
Name: A, dtype: float32
```

As you can see:

1. The original column was float64 due to the presence of float values.
2. After the downcast attempt, it became float32, not an integer type.
3. All values, including 3.2 and 5.7, are preserved.

The `downcast='integer'` parameter is essentially saying "use the smallest possible numeric type that can represent these values without loss of information". If all values are whole numbers, it will use an integer type. If there are any float values, it will use a float type.

If you did want to force conversion to integers (which would indeed lose information), you'd need to explicitly cast the column:

```python
df['A'] = df['A'].astype(int)
```

But this is generally not recommended unless you're certain that's what you want, as it does involve data loss.

In practice, when using `pd.to_numeric()` with `downcast='integer'`, you don't have to worry about accidental loss of precision for float values. The function is designed to be conservative in its downcasting to prevent exactly the kind of information loss you were concerned about.
