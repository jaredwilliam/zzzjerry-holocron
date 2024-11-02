---
date: 2024-01-30 06:34
type: evergreen
area: personal
effort: "[[Stable Diffusion Exploration]]"
---

- [[Stable Diffusion]]
- [[Hugging Face]]

## Step 1: Check Prerequisites
Ensure you have the following installed and set up on your PC. 
- Python (preferably Python 3.8 or later)
- Pip (Python package installer)
- Git (for cloning repositories if needed)
- Any specific dependencies the Model may have

## Step 2: Clone the Repository (if necessary)
If the model or its supporting code is stored in a GitHub repository, you'll need to clone it. Open a command prompt or terminal and run:

```sh
git clone https://github.com/Stability-AI/generative-models.git
cd generative-models
```

This code clones the repository and changes your current directory to the cloned repository's folder. 

## Step 3: Install Required Libraries
Within the repository, there might be a `requirements.txt` file or similar, listing all the Python libraries. Check the repository on GitHub or you can list all the file in the command prompt with `ls`.

In my case, the requirements were actually in a folder and had a text file named `pt2.txt`.

```sh
cd requirements
pip install -r pt2.txt 
```

## Step 4: Download the Model from Hugging Face
To download models from [Hugging Face](https://huggingface.co/), you usually need to authenticate by logging in to your Hugging Face account and obtaining an access token. Follow the instructions on the Hugging Face website to obtain your token (the Access Tokens are found in your profile settings). 

Once you have your token, you can use the Hugging Face `transformers` library to download and use models. If you haven't installed the `transformers` library yet, you can do so using pip:

```sh
pip install transformers
```

Then, in your Python script or interactive session, you can load the model using the following code snippet:

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

model_name = "stabilityai/sdxl-turbo"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)
```

Replace `"stabilityai/sdxl-turbo"` with the correct model path if it is different. This code will automatically download and cache the model and tokenizer. 

## Step 5: Using the Model


