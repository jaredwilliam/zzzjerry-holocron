---
up: "[[Programming]]"
created: 2024-10-13
related:
  - "[[Python]]"
  - "[[Data Analysis]]"
tags:
  - python
  - pandas
type: "[[How-To]]"
---

Image you have a [[Pandas]] DataFrame that looks like:

| State | X   | Y   |
| ----- | --- | --- |
| OH    | 1   | 3   |
| PA    | 5   | 7   |

And you want to combined `OH` and `PA` into `OH/PA` and add together their respective `X` and `Y` values. You can approach this by grouping the rows that you want to combine. 
1. Filter the rows that need to be combined.
2. Sum the "X" and "Y" values for those rows.
3. Create a new state name by combining the state names alphabetically, separated by a "/".
4. Remove the original rows and add the new combined row.

Below is the code to accomplish this:
```python
import pandas as pd

def combine_states(df: pd.DataFrame, states_to_combine: list[str]) -> pd.DataFrame:
	"""
    Combines the given states by summing their 'X' and 'Y' values, and
    creating a new state name in alphabetical order.

    Parameters
    ----------
    df (pd.DataFrame): The original dataframe containing the columns
    'State', 'X', and 'Y'.
    states_to_combine (list[str]): List of states to combine.

    Returns
    -------
    pd.DataFrame: Updated dataframe with the combined state and summed
    'X' and 'Y' values.
    """
    # Filter the rows with the states to combine
    filtered_df = df[df['State'].isin(states_to_combine)]
    
    # Sum the X and Y values
    combined_X = filtered_df['X'].sum()
    combined_Y = filtered_df['Y'].sum()
    
    # Create the new state name by sorting the states alphabetically
    # and joining with "/"
    combined_state = "/".join(sorted(states_to_combine))
    
    # Remove the original rows and append the new combined row
    df = df[~df['State'].isin(states_to_combine)]
    new_row = pd.DataFrame(
	    {
		    'State': [combined_state],
		    'X': [combined_X],
		    'Y': [combined_Y]
		}
	)
    
    # Append the new row to the dataframe
    df = pd.concat([df, new_row], ignore_index=True)
    
    return df

# Example dataframe
data = {
    'State': ['OH', 'PA'],
    'X': [1, 5],
    'Y': [3, 7]
}

df = pd.DataFrame(data)

# Example usage: combine 'OH' and 'PA'
combined_df = combine_states(df, ['OH', 'PA'])
print(combined_df)
```
