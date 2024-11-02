---
date: 2024-01-09 13:03
type: person
relationship:
parents:
children:
phone:
birthday:
email:
aliases:
---

## {{name}}


## Notes
- *Fun fact, other interesting note, etc.*

## Interactions
```dataview
TABLE WITHOUT ID file.link AS "Meeting", date, summary
FROM [[]] AND #meeting
SORT date DESC
```

## Associated Projects
```dataview
LIST FROM #project 
WHERE containts(people, this.file.link)
```

