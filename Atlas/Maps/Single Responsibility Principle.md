---
date: "[[2024-11-01]]"
type: MOC
tags:
  - MOC
maps:
  - "[[SOLID Design Principles]]"
---

The single-responsibility principle (SRP) is a computer programming principle that state that "a module should be responsible to one, and only one, actor."

**Importance**
- Maintainability - when classes have a single, well-defined responsibility, they are easier to understand and modify.
- Testability - It is easier to write unit tests for classes with a single focus. 
- Flexibility - Changes to one responsibility don't affect unrelated parts of the system.

As an example, consider a module that compiles and prints a report. Imagine such a module can be changed for two reasons: the content of the report can change, or the format of the report could change. These two things change for different causes. These two aspects of the problem are really two separate responsibilities, and should, therefore, be in separate classes or modules. It is bad design to couple two things that change for different reasons at different times. 

Here is an example of a Python class that **does not** follow SRP:
```python
class Employee:
	def __init_(self, name, position, hourly_rate):
		self.name = name
		self.position = position
		self.hourly_rate = hourly_rate

	def calculate_payroll(self, hours_worked):
		return self.hourly_rate * hours_worked

	def save_to_database(self, connection):
		cursor = connection.cursor()
		cursor.execute(
			"INSERT INTO employees (name, position, hourly_rate) VALUES(?, ?, ?)",
			(self.name, self.position, self.hourly_rate)
		)
		connection.commit()

	def generate_report(self):
		return f"Employee Report: {self.name}, Position: {self.position}"
```

In this example, the `Employee` class handles multiple responsibilities:
1. Employee Data Management - storing and managing employee attributes like name, position, and hourly rate. 
2. Payroll Calculation - calculating the payroll based on hours worked.
3. Database Operations - saving employee data to a database.
4. Reporting - generating a report about the employee. 

This violates SRP because the class has more than one reason to change - a change in payroll calculation, or database schema, or reporting format, would all require a modification to this class. 

We can separate the responsibilities into different classes:
1. `Employee`: Manages employee data. 
2. `PayrollCalculator`: Calculates payroll.
3. `EmployeeDatabase`: Handles database operations.
4. `EmployeeReport`: Generates reports. 

Refactored code:
```python
class Employee:
	def __init__(self, name, position, hourly_rate):
		self.name = name
		self.position = position
		self.hourly_rate = hourly_rate
		
class PayrollCalculator:
	def calculate_payroll(self, employee, hours_worked):
		return employee.hourly_rate * hours_worked
		
class EmployeeDatabase:
	def save(self, employee, connection):
		cursor = connection.cursor()
		cursor.execute(
			"INSERT INTO employees (name, position, hourly_rate) VALUES(?, ?, ?)",
			(employee.name, employee.position, employee.hourly_rate)
		)
		connection.commit()

class EmployeeReport:
	def generate(self, employee):
		return f"Employee Report: {employee.name}, Position: {employee.position}"
```

Now each class has a single responsibility.

> [!Venetian]+ Unrequited notes
> These notes point directly to this note. But this note doesn't point back (yet). This is the strongest contextual query.
> ```dataview
> TABLE tags
> FROM [[]]
> AND !outgoing([[]])
> ```

## Overview
- Brief summary of the topic, theme, or project this MOC covers
- What does this MOC focus on, and why is it important?

## Core Concepts
```dataview
LIST
FROM [[]] and #concept 
```

## Key Ideas
```dataview
LIST
FROM [[]] AND #idea
```

## Resources and Links
- External resources, articles, books, or notes relevant to this MOC:

## Notes and Thoughts
- Any additional thoughts, reflections, or insights related to this MOC

## Related MOCs
```dataview
LIST
FROM [[]] AND #MOC 
```

## Tags
- #MOC 