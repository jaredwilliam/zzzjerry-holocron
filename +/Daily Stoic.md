
[[Books]]

[[Ryan Holiday]]

## Weekly Lessons
```dataview
LIST rows.file.link
FROM "Notes"
WHERE contains(file.outlinks, [[The Daily Stoic]])
SORT file.name
FLATTEN type
GROUP BY type
```
