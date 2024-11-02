---
created: "2024-09-25"
up: "[[Concepts]]"
source: 
type: Concept
---

```sql
DECLARE @StartDate DATE = '2024-08-01';
DECLARE @EndDate DATE = '2024-09-01';

SELECT *
FROM YourTable
WHERE DateColumn BETWEEN @StartDate AND @EndDate;
```

[[SQL]]

