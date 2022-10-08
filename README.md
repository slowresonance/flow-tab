Flow tab is a succesor to [Simple tab](https://github.com/mohanvpatta/simple-tab)

# Flowtab

```
--will add a description later--
```

## Adding and formatting links

Click on Edit Links to add/update links.

The following is used for the demo.

```
>Links
GitHub (https://github.com/mohanvpatta/flow-tab)
Hello (http://100r.co/site/home.html)
>Music
Study Playlist (https://www.youtube.com/watch?v=tpWLeUt_7Cc&list=PLx65qkgCWNJIs3FPaj8JZhduXSpQ_ZfvL)
---
>Work
My Other Projects (https://eisen.vercel.app/,https://github.com/mohanvpatta/resurrect)
```

1. Use `>` followed by your group name to seperate links into groups.
2. Use `---` to seperate links into sections. A section is created by default. Max two sections.
3. Use the format `link-name (link-url)` to format your links. 1 per each line.
4. For creating a flow (multiple links) Use the format `flow-name (link1-url, link2-url, link3-url)` to format your flows.

## Editing the colors

The extension uses css variables to assign colors to the elements. I will try to handle theme changes better in the next version.

To change the defaults click on Edit Colors.

These are the defaults:

```
--font-family: monospace;
--links-text-color: #ffffff;
--group-title-color: #a3a3a3;
--background-color: #181818;
--notes-title-color: #a3a3a3;
--notes-text-color: #ffffff;
--notes-background: #1c1c1c;
--notes-border: 2px solid #1c1c1c;
--notes-background-hover: #1c1c1c;
--notes-border-hover: 2px solid #1c1c1c;
--editor-text-color: #1c1c1c;
--editor-background: #ffffff;
--menu-text-color: #a3a3a3;
--menu-text-hover-color: #ffffff;
--scrollbar-color: #333333;
--scrollbar-hover-color: #444444;
```

To change the colors, replace the hexcode of the variable. For example the following changes the backgorund color to red,

```
--background-color: #ff0000;
```

do the above edit if you hate yourself.
