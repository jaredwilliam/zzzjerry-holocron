---
date: 2024-02-23 08:32
type: evergreen
area: personal
effort: "[[GPT API Exploration]]"
---

[[GPT API Exploration]]

After you have the [[Virtual Environment Setup]], [[Install the OpenAI Python Library]], and [[Set Up Your OpenAI API Key]], the final step is to send a request to the [[OpenAI API]] using the [[Python Library]]. 

To do this, create a file named `openai-test.py` using the [[Terminal]] or an [[IDE]].

Inside the file, use this code:

```python
from openai import OpenAI
client = OpenAI()

completion = client.chat.completions.create(
	model = "gpt-3.5-turbo",
	messages=[
		{"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
		{"role": "user", "content": "Compose a poem that explains the concept of recursion in programming."}	
	]
)

print(completion.choices[0].message)
```

To run the code, enter `python openai-test.py` into the terminal. I ran into an issue here where `openai` couldn't be resolved. Closing out the IDE and switching to the correct Python version resolved this. However, I ran into another error message telling me that I had exceeded my quote because the $18 in credits I was given had expired almost a year before typing this. Oops. I bought $10 of credits. I had to wait a little bit for it to actual begin working though. Probably took some time for servers/databases to update. 



## Linked Notes
```dataview
TABLE file.cday AS "Created"
FROM "Evergreen" where contains(file.outlinks, [[Send an OpenAI API Request]])
SORT file.cday DESC
```

