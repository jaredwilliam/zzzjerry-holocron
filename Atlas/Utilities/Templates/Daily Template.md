---
date: "{{date:YYYY-MM-DD}}"
type: daily
---

# {{date:dddd, MMMM Do}}

![[{{date:gggg-[W]ww}}#Initiatives]]

<<[[<% fileDate = moment(tp.file.title, 'YYYY-MM-DD').subtract(1, 'd').format('YYYY-MM-DD') %>|Yesterday]] | [[<% fileDate = moment(tp.file.title, 'YYYY-MM-DD').add(1, 'd').format('YYYY-MM-DD') %>|Tomorrow]]>>

## Inbox
- 

## Tasks 
- [ ] Inbox zero
```todoist
name: "Today & Overdue"
filter: "today | overdue"
groupBy: project
```
## Captured Tasks
```tasks
```

## Notes Created Today
```dataview
LIST
FROM [[]]
WHERE type != "daily"
```
