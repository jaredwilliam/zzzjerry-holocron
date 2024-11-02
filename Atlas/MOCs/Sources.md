---
up: "[[Atlas]]"
created: 2024-08-19
type: "[[Map]]"
---

This is where I keep tabs on some of the sources I have encountered. 

```dataview
LIST WITHOUT ID source
WHERE source
FLATTEN source
GROUP BY source 
```



> [!book] Books
> ```dataview
> TABLE WITHOUT ID
>  year as "Year",
>  file.link as Book
> FROM [[]]
> SORT year asc
> ```

> [!video] Movies
> ```dataview
> TABLE WITHOUT ID
>  year as "Year",
>  file.link as Movie
> FROM "Atlas/Notes/Sources" and -#x/readme
> WHERE type = [[Movie]]
> SORT year asc
> ```

> [!joystick] Video Games
> ```dataview
> TABLE WITHOUT ID
>  year as "Year",
>  file.link as Game
> FROM "Atlas/Notes/Sources" and -#x/readme
> WHERE type = [[Video Game]]
> SORT year asc
> ```

> [!puzzle] Board Games
> ```dataview
> TABLE WITHOUT ID
>  year as "Year",
>  file.link as "Board Game"
> FROM "Atlas/Notes/Sources" and -#x/readme
> WHERE type = [[Board Game]]
> SORT year asc
> ```

> [!note] Articles
> ```dataview
> TABLE WITHOUT ID
>  year as "Year",
>  file.link as Article
> FROM "Atlas/Notes/Sources" and -#x/readme
> WHERE type = [[Article]]
> SORT year asc
> ```

> [!quote] Quotes
> ```dataview
> TABLE WITHOUT ID
>  year as "Year",
>  file.link as Quote
> FROM "Atlas/Notes/Sources" and -#x/readme
> WHERE type = [[Quote]]
> SORT year asc
> ```

> [!script] Poems
> ```dataview
> TABLE WITHOUT ID
>  year as "Year",
>  file.link as Poem
> FROM "Atlas/Notes/Sources" and -#x/readme
> WHERE type = [[Poem]]
> SORT year asc
> ```

