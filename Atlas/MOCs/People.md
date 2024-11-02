---
up: "[[Atlas]]"
created: 2024-08-19
type: "[[Map]]"
---

> [!user] Family
> > ```dataview
> > TABLE WITHOUT ID
> > file.link as People,
> > relationship as "Relationship"
> > FROM #people/family 
> > SORT dates asc
> > ```

> [!user] Prominent People
> The hope is to see these prominent people in various ways to pull out insights. 
> > ```dataview
> > TABLE WITHOUT ID
> > file.link as People
> > FROM #people/prominent
> > SORT dates asc
> > ```

> [!user] Friends
> > ```dataview
> > TABLE WITHOUT ID
> > file.link as People
> > FROM #people/friend
> > SORT dates asc
> > ```

> [!user] Colleagues
> > ```dataview
> > TABLE WITHOUT ID
> > file.link as People
> > FROM #people/colleague
> > SORT dates asc
> > ```

