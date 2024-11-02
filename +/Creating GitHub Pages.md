

[[GitHub MOC]]

# Notes
1. Go to the main page of the relevant repository on the Git Hub website
2. Find the branch button. By default it probably is labeled as "main".
   ![[github_branch_button.jpg|200]]
3. Click this and type in "gh-pages" for a GitHub State webpage and then click "Create Branch".
4. In Git Bash, have the your current working directory be your relevant repository. 
5. Fetch the new branch from the remote repository on GitHub using the command `git fetch origin`
6. Switch to the new branch with `git checkout gh-pages`
7. In whichever IDE or code editor you are using, create either a HTML or Markdown file and name it `index.html` or `index.md`, respectively. 
	1. Alternatively, in Git Bash, you can also type in `code .` and it will open a window for you in that directory. 
8. The index acts as your homepage for the site. 
9. Add other pages as you see fit and you can link to them. 
10. When you make updates, push it to GitHub using:

```bash
git add .
git commit -m "Relevant note"
git push origin gh-pages
```

Go to your site:  `https://<username>.github.io/<repositoryname>`

# Related Links
- [[Creating a New GitHub Repository]]
- [[Cloning a GitHub Repo to your Computer]]
- [[GitBash]]


