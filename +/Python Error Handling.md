---
date: 2023-06-28
---

[[Python]]

**Syntax of Try-Except Blocks**
Try-except blocks are used to handle exceptions (errors) that occur during program execution. 
```python
try:
	# Code that may raise an exception
except ExceptionType:
	# Code to handle the exception
```

**How to Catch Specific Exceptions**
To catch specific exceptions, you can list multiple except blocks, each targeting a specific exception type.
```python
try:
	# Code that may raise an exception
except FirstExceptionType:
	# Handle the first exception
except SecondExceptionType:
	# Handle the second exception
```

**Built-In Exceptions and Use Cases**
Python has several built-in exceptions, some common ones include:
- ValueError: Raised when a function receives an argument of the correct type but an inappropriate value
- TypeError: Raised when an operation is performed on an object of an inappropriate type. 
- FileNotFoundError: Raised when trying to open a file that doesn't exist. 
- ZeroDivisionError: Raised when attempting to divide by zero. 

**Examples**
Example 1: Catching a ValueError and TypeError:
```python
try: 
	int("string") # Raises ValueError
	5 / "string" # Raises TypeError
except ValueError:
	print("A value error occured.")
except TypeError: 
	print("A type error occured.")
```

Example 2: Catching a FileNotFoundError"
```python
try:
	with open("non_existent_file.txt", "r") as file:
		content = file.read()
except FileNotFoundError:
	print("File not found.")
```

Example 3: Catching a ZeroDivisionError:
```python
try: 
	result = 10 / 0
except ZeroDivisionError:
	print("Division by zero is not allowed.")
```

**More Note**
From *Introduction to Computation and Programming Using Python*

Consider the code:
```python
val = int(input('Enter an integer: '))
print('The square of the number you entered is', val**2)
```

This will work fine if the user types in an integer, but if they type in something like 'abc', the print statement will never be reached. It should be written like:
```python
while True:
	val = input('Enter an integer: ')
	try:
		val = int(val)
		print('The square of the number you entered is', val**2)
		break # to exit the while loop
	except ValueError:
		print(val, 'is not an integer')
```

This works much better. But now the code is 8 lines long instead of 2, which is problematic if there are lot of instances of asking a user for an integer. We can alleviate this by introducing a function:
```python
def readInt():
	while True:
		val = input('Enter an integer: ')
		try:
			return(int(val)) # convert str to int before returning
		except ValueError:
			print(val, 'is not a string')
```

Better yet, this function can be generalized to ask for any type of input:
```python
def readVal(valType, requestMsg, errorMsg):
	while True:
		val = input(requestMsg + ' ')
		try:
			return(valType(val)) # convert str to valType before returning
		except ValueError:
			print(val, errorMsg)

readVal(int, 'Enter an integer:', 'is not an integer')
```





