---
relationship: manager
phone:
birthday: 2024-03-08
location: Cleveland
email: kristen_m_lasco@progressive.com
company: 
  name: "[[PGR]]"
  team: "[[KMAC]]"
title: Associate Manager Data Analysis
aliases:
---

[[People]]

# Kristen Lasco
```dataview
LIST file.name
FROM "People" where contains(file.outlinks, [[Kristen Lasco]])
SORT file.cday DESC
```

# Notes
- *Fun fact, other interesting note, etc.*

# Projects

# Meetings
```dataview
TABLE file.cday as "Created", summary AS "Summary"
FROM "Timestamps/Meetings" where contains(file.outlinks, [[Kristen Lasco]])
SORT file.cday DESC
```

