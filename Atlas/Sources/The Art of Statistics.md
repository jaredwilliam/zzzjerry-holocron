---
created: 2024-09-19
up: "[[Books]]"
type: Book
---

## Introduction
- Turning experiences into data is not straightforward, and data is inevitably limited in its capacity to describe the world. 
- [[Statistical Science]] has a long successful history, but is now changing in the light of increased availability of data. 
- Skill in [[Statistical Methods]] plays an important part of being a [[Data Scientist]]. 
- Teaching statistics is changing from a focus on mathematical methods to one based on an entire problem-solving cycle. 
- The [[PPDAC Cycle]] provides a convenient framework: Problem - Plan - Data - Analysis - Conclusion and communication.
- [[Data Literacy]] is a key skill for the modern world. 

## Getting Things in Proportion: Categorical Data and Percentages
- Summary
	- Binary variables are yes/no questions, sets of which can be summarized as proportions. 
	- Positive or negative framing of proportions can change their emotional impact. 
	- Relative risks tend to convey an exaggerated importance, and absolute risks should be provided for clarity. 
	- Expected frequencies promote understanding and an appropriate sense of importance.
	- Odds ratios arise from scientific studies but should not be used for general communication. 
	- Graphics need to be chosen with care and awareness of their impact. 
- [[Communicating Counts and Proportions]]
	- The basic presentation of statistics is important. 
	- [[Framing]]
	- Presenting information in a table that orders what is being compared (e.g., like ranking), can be grossly misleading: only only because the differences could be due to chance variation, but because the items being compared may be using different types of similar data. For example:
		- Say we are comparing hospitals in terms of the number of operations they perform and their respective mortality rates. 
		- The way the hospitals are ordered will impact how the table is interpreted - showing them in order of number of operations vs showing them in order or mortality rate. In combination with the rest of the analysis and conclusion of the study, what is shown in that particular visualization can lead to the audience (or even the author) to come to different conclusions or have different impressions. 
		- The visual can also be misleading because it may not be considering the different types of similar data. Continuing with the example, the hospitals may be taking in different types of cases (e.g., in terms of severity). 
	- When you have a horizontal bar chart, a crucial choice is where to start the horizontal axis. If the values start from 0%, all the bars will be almost the full length of the graphic, which will clearly show the extraordinarily high survival rates, but the lines will be indistinguishable, e.g., 
	  ![[2024-09-23 art of stats 01.png|750]]
	- But we can be misleading if we start the graphic at 95%, which will make the hospitals look extremely different, even if the variation is in fact only what is attributable to random chance along. 
	  ![[2024-09-23 art of stats 00.png|750]]
	- You should always start with a logical and meaningful baseline, which can be difficult and arbitrary at times. 
	- Numbers do not speak for themselves - we are responsible for giving them meaning. - Nate Silver
- [[Categorical Variables]] - measures that can take on two or more categories
	- Unordered categories - a person's country of origin, the color of a car, a hospital in which an operation takes place
	- Ordered categories- military rank
	- Numbers that have been grouped - levels of obesity
	- A variable is defined as any measurement that can take on different values in different circumstances. 
	- Pi charts allow an impression of the size of each category relative to the whole pie, but are often visually confusing, especially if they attempt to show too many categories in the same chart, or use a three-dimensional representation that distorts area. Comparisons are better based on height or length alone in a bar chart. 
- [[Comparing a Pair of Proportions]]
	- When proportions represent estimates of the risks of experiencing some harm, the way in which those risks are compared becomes a serious and contested issue.
	- Relative Risk: if the absolute risk among people who are exposed to something of interest is $p$, and the absolute risk among people who are not exposed is $q$, then the relative risk is $p/q$. 
	- Absolute Risk: the proportion of people in a defined group who experience an event of interest within a specified period of time.
	- We need to distinguish what is actually dangerous from what sounds frightening. 
	- Example: In November 2015 the [[World Health Organization]]'s [[International Agency for Research in Cancer (IARC)]] announced that processed meat was a "Group 1 carcinogen". This led to panicky headlines such as that "Bacon Have the Same Cancer Risk as Cigarettes". However in a IARC press release, they report that 50g of processed meat a day was associated with an increased risk of bowel cancel of 18%. Should "18%" be worrying? That 18% is a relative risk but the way it was framed in the media changed it to an absolute risk. What the IARC actually concluded was, in the normal run of things, around 6 in every 100 people who do not eat bacon daily would be expected to get bowel cancer in their lifetime. If 100 similar people ate a bacon sandwich every single day of their lives, we would expect that 18% more would get bowel cancel, which means a rise from 6 to 7 cases out of 100, which doesn't sound so frightening. 
	- The example illustrates the advantage of communicating risks using **expected frequencies**: instead of discussing percentages or probabilities, we just ask "what does this mean for 100 (or 1000) people?" 
	- We can use **icon arrays** to show the expected frequencies. Icon arrays are a graphic display of frequencies using a set of small images. 
![[2024-10-04 icon array.png|500]]

- In the icon array, you can randomly scatter the highlighted people. This an increase the impression of unpredictability, but it should only be used when there is a single additional highlighted icon in a comparison icon array. There should be no need to count icons in order to make a quick visual comparison. 
- Here are more ways to compare two proportions:

| Method             | Non-bacon eaters | Daily bacon eaters |
| ------------------ | ---------------- | ------------------ |
| Event Rate         | 6%               | 7%                 |
| Expected Frequency | 6 out of 100     | 7 out of 100       |
|                    | 1 in 6           | 1 in 14            |
| Odds               | 6/94             | 7/93               |

- Using multiple "1 in … " statements is not recommended as many people find them difficult to compare. 
- The **odds** for an event is the ratio of the chance of the event happening to the chance of it not happening. 
- odds, odds ratio
	- If the probability of an event is $p$, the odds of the event is defined by $\frac{p}{(1-p)}$. 
	- If the odds of an event in the exposed group is $\frac{p}{(1-p)}$, and the odds in the non-exposed group is $\frac{q}{(1-q)}$, then the odds ratio is given by $\frac{p}{(1-p)}/\frac{q}{(1-q)}$ .
	- If $p$ and $q$ are small, then the odds ratio will be close to the relative risk $p/q$, but odds ratios and relative risks start to differ when the absolute risks are much more than 20%.
	- A study published in 2013 found that 87% of people taking statins reported muscle pains, compared to 85% in those who did not take statins. We could report either a 2% increase in absolute risk, or a relative risk of $0.87/0.85 = 1.02$, a 2% relative increase in risk. The odds in the two groups are given by $0.87/0.13 = 6.7$ and $0.85/0.15=5.7$, so the odds ratio is therefore $6.7/5.7 = 1.18$, which could be called an "18% increase". 
	- Odds ratios should be avoided except in a scientific context. 

## Summarizing and Communicating Numbers. Lots of Numbers
- **Wisdom of Crowds**: the idea that a summary derived from a group opinion is closer to the truth than the majority of the individuals. 
- **Sample Distribution**: the pattern made by a set of numerical or categorical observations. Also known as the empirical or data distribution. 
- **Skewed Distribution**: when a sample or population distribution is highly asymmetric, and has a long left- or right-hand tail. This might typically occur for variables such as income and sales of books, when there is extreme inequality. Standards measures such as means and standard deviations can be very misleading for such distributions. 
- We can transform data in a way that reduces the impact of extreme values, say by plotting it on a **logarithmic scale**, where the space between 100 and 1000 is the same as the space between 1000 and 10,000. 
	- Logarithmic transformations are particularly appropriate when it is reasonable to assume people are making 'relative' rather than 'absolute' errors. 
	- **Logarithmic Scale**: the logarithm to base 10 of a positive number $x$ is denoted by $y=log_{10}\ x$, or equivalently $x=10^y$. In statistical analysis, $log\ x$ generally denotes the natural logarithm $y=log_e\ x$, or equivalently $x=e^y$ where $e$ is the exponential constant 2.718. 
- Strip- charts show individual points, box-and-whisker plots are convenient for rapid visual summaries, and histograms give a good feel for the underlying shape of the data distribution. 
- **Count Variables**: variables that can take on integer values 0, 1, 2, and so on. 
- **Continuous Variables**: a random variable $X$ that can, at least in principle, take on any value within a specific range. It has a probability density function $f$ such that $P(X \leq x) = \int_{-\infty}^x f(t)dt$, and expectation given by $E(X)=\int_{-\infty}^{\infty}xf(x)dx$. The probability of $X$ lying in the interval $(A, B)$ can be calculated using $\int_A^B f(x)dx$.
- When a set of counts or continuous observations are reduced to a single summary statistics, it is called an **average**. This is a generic term and there are different types of averages:
	- **Mean**: the sum of the numbers divided by the number of cases
	- **Median**: the middle value when the numbers are put in order. 
	- **Mode**: the most common value
- Means can be influenced by a few extreme values. Means can be highly misleading when the raw data does not form a symmetric pattern around a central value but instead are skewed towards one side. 
- **Percentile** (of a population): there is, for example, a 70% chance of drawing a random observation below the 70th percentile. For a literal population, 70% lie below this value. 
- **Percentile** (of a sample): the 70th percentile of a sample, for example, is the value that is 70% along the ordered data set: the median is therefore the 50th percentile. Interpolation between points may be necessary.  

### Describing the Spread of a Data Distribution
- Three ways to summarize the spread
	- **Range** (of a sample): the maximum minus the minimum, $x_{(n)} - x_{(1)}$  
	- **Inter-quartile Range**: a measure of the spread of a sample or a population distribution, specifically the distance between the 25th and 75th percentiles. 
	- **Standard Deviation**: the square root of the variance of a sample or distribution. For well-behaved, reasonably symmetric data distributions without long tails, we would expect most of the observations to lie within two sample standard deviations from the sample mean. 

### Describing Differences between Groups of Numbers
- A substantial difference between the mean and median indicates a long tail.
- **Population**: a group from which it is assumed your sample data are drawn, and which provides the probability distribution for a single observation. In a survey this may be a literal population, but when making measurements, or when having all possible data, the population becomes a mathematical idealization. 

### Describing Relationships Between Variables
**[[Pearson Correlation Coefficient]]**
For a set of $n$ paired numbers, $(x_1, y_1),(x_2, y_2)\ldots(x_n, y_n)$, when $\overline{x}$, $s_x$ are the sample mean and standard deviation of the $x$'s and $\overline y$, $s_y$ are the sample mean and standard deviation of the $y$'s, the Pearson correlation coefficient is given by:
$$r = \frac{\sum_{i=1}^n (x_i - \overline{x})(y_i - \overline{y})}{\sqrt{\sum_{i=1}^n (x_i - \overline{x})^2 \sum_{i=1}^n (y_i - \overline{y})^2}}$$
Suppose $x$s and $y$s have both been standardized to Z-scores given by $u$s and $v$s respectively, so that $u_i=(x_i-\overline{x})/s_x$ and $v_i=(y_i-\overline{y})/s_y$. Then the Pearson correlation coefficient can be expressed as $\frac{1}{n}\sum_{i=1}^n u_i v_i$, which is the 'cross-product' of the Z scores. This assumes the standard deviations have been calculated with $n$ in the denominator. If $n-1$ has been used, the formula is then $\frac{1}{n-1}\sum_{i=1}^n u_i v_i$

A Pearson correlation coefficient runs between -1 and +1, and expresses how close to a straight line the data points fall. 

**[[Spearman's Rank Correlation]]** - an alternative to the [[Pearson Correlation Coefficient]] - the rank of an observation ins its position in the ordered set, where 'ties' are considered to have the same rank. For example, for the data `[3, 2, 1, 0, 1]` the ranks are `[5, 4, 2.5, 1, 2.5]`. Spearman's rank correlation is simply the Pearson correlation when the `x`'s and `y`'s are replaced by their respective ranks. 

Correlation coefficients are simply summaries of association, and cannot be used to conclude that there is definitely an underlying relationship between two variables, let alone why one might exist. 

[[Independent Variable]] - a variable that is fixed by design or observation, and whose association with an outcome variable may be of interest. 

[[Dependent Variable]] - the variable of primary interest that we wish to predict or explain.

Plotting the independent variable and dependent variable is a common exercise, but it presupposes the direction in which the influence might lit. 

### Describing Trends
- It is always valuable to split data according to some factor that explains some of the overall variability. 
- Four common features of a good data visualization:
	- It contains reliable information
	- The design has been chosen so that relevant patterns become noticeable
	- It is presented in an attractive manner, but appearance should not get in the way of honesty, clarity, and depth
	- When appropriate, it is organized in a way that enables some exploration

### Communication
- We should focus on summarizing and communicating data in an open and non-manipulative way; we do not want to influence our audiences' emotions and attitudes, or convince them of a certain perspective. We just want to tell it how it is, or at least how it seems to be, and while we cannot ever claim to tell the absolute truth, we can at least try to be as truthful as possible. 
- The first rule of communication is to shut up and listen, so that you can get to know about the audience for your communication, whether it might be politicians, professionals, or the general public. We have to understand their inevitable limitations and any misunderstandings, and fight the temptation to be too sophisticated and clever, or put in too much detail. The second rule of communication is to know what you want to achieve. 

# hello 
## What Are We Looking At Data Anyway? Populations and Measurement
### Summary
- Inductive inference requires working from our data, through study sample and study population, to a target population.
- Problems and biases can crop up at each stage of this path.
- The best way to proceed from sample to study population is to have drawn a random sample. 
- A population can be thought of as a group of individuals, but also as providing the probability distribution for a random observation drawn from that population.
- Populations can be summarized using parameters that mirror the summary statistic of sample data. 
- Often data does not arise as a sample from a literal population. When we have all the data there is, then we can imagine it drawn from a metaphorical population of events that could have occurred, but didn't. 

### Key Ideas
- [[Stages of Going From Survey Responses to Claims]]

## What Causes What?

## Modelling Relationships Using Regression

## Algorithms, Analytics, and Prediction

## How Sure Can We Be About What is Going On? Estimates and Intervals

## Probability - The Language of Uncertainty and Variability

## Putting Probability and Statistics Together

## Answering Questions and Claiming Discoveries

## Learning from Experience the Bayesian Way

## How Things Go Wrong

## How We Can Do Statistics Better

## In Conclusion
