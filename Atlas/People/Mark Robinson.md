---
date: 2024-08-06 13:49
type: person
relationship:
parents:
children:
phone:
birthday:
email:
aliases:
---

## Mark Robinson

```dataview
table without id link(file.link, title) as "Date", L.text as List
from "notes/Daily"
flatten file.lists as L
where contains(this.file.inlinks, file.link) and contains(L.text, this.file.name)
sort date desc
```



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

