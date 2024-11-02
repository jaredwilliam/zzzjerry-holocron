---
date: 2024-02-23 08:18
type: evergreen
area: personal
effort: "[[GPT API Exploration]]"
---

[[GPT API Exploration]]

It is recommended that you set up this key for all projects with the main advantage being that the [[Python Library]] will automatically detect it and use it without having to write any code. 

1. Open the [[Command Prompt]] (type "cmd" in the search menu)
2. Set [[Environment Variable]] in the current session. To do so, use this command, replacing `your-api-key-here` with your actual [[API Key]]
	1. `setx OPENAI_API_KEY "your-api-key-here"`
	2. This command will set the `OPENAI_API_KEY` [[Environment Variable]] for the current session. 
3. Permanent setup. To make the setup permanent, add the variable through the system properties as follows:
	1. Open the [[File Explorer]]
	2. Right-click on '[[This PC]]' or '[[My Computer]]' and select 'Properties'
	3. Click on '[[Advanced System Settings]]'
	4. Click on the '[[Environment Variables]]' button
	5. In the '[[System Variables]]' section, click 'New...' and enter `OPENAI_API_KEY` as the variable name and you [[API Key]] as the variable value. 
	6. Click 'OK' to confirm. 
	7. To verify the setup, reopen the [[Command Prompt]] and type the following command: `echo %OPENAI_API_KEY%`. It should display your [[API Key]] 




## Linked Notes
```dataview
TABLE file.cday AS "Created"
FROM "Evergreen" where contains(file.outlinks, [[Set Up Your API Key]])
SORT file.cday DESC
```

