---
relationship: colleague
phone:
birthday:
location: Cleveland
email: jeffrey_washlock@progressive.com
company: 
  name: PGR
  team: KMAC
title: Data Analyst III
aliases:
---

[[People]]

# Jeff Washlock


# Notes
- *Fun fact, other interesting note, etc.*

# Meetings
```dataview
TABLE file.cday as Created, summary AS "Summary"
FROM "Timestamps/Meetings" where contains(file.outlinks, [[Jeff Washlock]])
SORT file.cday DESC
```

