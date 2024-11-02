---
date: 2024-05-05 11:24
type:
  - "[[Evergreen]]"
---
#unpublished

I like to use Dataview on my MOC pages to see better organize the linked notes over the Obisidian default Linked mentions features. 

I generally group by a field in the properties, for example, group by 'type'. 

```
LIST rows.file.link
FROM "folder_name"
WHERE contains(file.outlinks, [[file_name]])
GROUP BY type
```

But it causes the output to look funny:

![[2024-05-05 Dataview Flatten Example 0.jpg|500]]

I don't like how the resulting types - Commonplace and Quotes, have two bullet points and then the colon is on a new line. It looks sloppy and is hard to read. 

Using `FLATTEN` helps with this:

```
LIST rows.file.link
FROM "folder_name"
WHERE contains(file.outlinks, [[file_name]])
FLATTEN type
GROUP BY type
```

![[2024-05-05 Dataview Flatten Example 1.jpg|500]]

## Related
- [[Dataview Queries]]
- [[Dataview FLATTEN]]
