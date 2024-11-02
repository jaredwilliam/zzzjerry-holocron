---
up: "[[Atlas]]"
related:
  - "[[Relate]]"
  - "[[Communicate]]"
created: "[[2024-08-19]]"
type: "[[Map]]"
---

This **Add** note isn't just an inbox. It's a cooling pad 🧊.
Thoughts come in hot. But after a few days, they cool down. 
When cooler thoughts prevail, you can better prioritize. 

> [!activity] Added Stuff
> This view looks at the `10` newest notes in the + folder. As you process each note, add a link, add details, move them to the best folder, and delete everything that no longer sparks. 
> ``` dataview
> TABLE WITHOUT ID file.link as "", (date(today) - file.cday).day as "Days alive"
> FROM "+" and -#x/readme 
> SORT file.cday desc
> LIMIT 10

