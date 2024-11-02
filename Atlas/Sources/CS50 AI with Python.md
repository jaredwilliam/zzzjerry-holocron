---
up: "[[Sources]]"
created: 2024-08-28
type: source
university:
  - "[[Harvard]]"
source-type: course
---

[Provided Notes](https://cs50.harvard.edu/ai/2024/notes/0/)

## Artificial Intelligence
There are a lot of different things a computer can do that are considered "AI". For example, whenever a computer recognizes the face of someone in a photograph. 

This course is going to cover the following topics of AI:
- Search
- Knowledge
- Uncertainty
- Optimization
- Learning
- Neural Networks
- Language

### [[Search]]
Search problems involve an agent that is given an initial state and a goal state, and it returns a solution of how to get from the former to the latter. For example, navigator apps, finding your way through a maze, solving the 15-tile sliding puzzle.

![[2024-08-28 15-tile puzzle.jpg|250]]

Some terminology:
- **Agent** - an entity that perceives its environment and acts upon that environment. 
- **State** - a configuration of an agent in its environment. 
- **Initial State** - the state from which the search algorithm starts. 
- **Actions** - choices that can be made in a state. More precisely, actions can be defined as a function. Upon receiving state `s` as input, `Actions(s)` returns as output the set of actions that can be executed in state `s`. 
- **Transition Model** - a description of what state results from performing any applicable action in any state. More precisely, the transition model can be defined as a function. Upon receiving state `s` and action `a` as input, `Results(s, a)` returns the state resulting from performing action `a` in state `s`. 
- **State Space** - the set of all states reachable from the initial state by any sequence of actions. The state space can be visualized as a directed graph with states represented as nodes and actions represented as arrows between nodes. 
- **Goal Test** - the condition that determines whether a given state is a goal state. If it is, the problem is solved. If it is not, we continue searching. 
- **Path Cost** - A numerical cost associated with a given path. 
- **Solution** - A sequence of actions that leads from the initial state to the goal state. 
- **Optimal Solution** - A solution that has the lowest path cost among all solutions. 

### [[Solving Search Problems]]
In a search process, data is often stored in a **node**, a data structure that contains the following data:
- A *state*
- Its *parent node*, through which the current node is generated
- The *action* that was applied to the state of the parent to get to the current node
- The *path cost* form the initial state to this node

*Nodes* contain information that makes them very useful for the purposes of search algorithms. They contain a *state*, which can be checked using the *goal test* to see if it is the final state. If it is, the node's *path cost* can be compared to other nodes' *path cost*, which allows choosing the *optimal solution*. Once the node is chosen, by virtue of storing the *parent node* and the *action* that led from the *parent* to the current node, it is possible to trace back every step of the way form the *initial state* to this node, and this sequence of actions is the *solution*. 

However, *nodes* are simply a data structure - they don't search, they hold information. To actually search, we use the **frontier**, the mechanism that "manages" the *nodes*. The *frontier* starts by containing an initial state and an empty set of explored items, and then repeats the following actions until a solution is reached. 
1. If the frontier is empty, then *stop*. There is no solution to the problem.
2. Remove a node from the frontier. This is the node that will be considered.
3. If the node contains the goal state, return the solution. *Stop*. 
4. Else, expand the node (find all the new nodes that could be reached from this node), and add resulting nodes to the frontier. Add the current node to the explored set. 

There is something that could go wrong though. The above steps assume that you can only go in one direction through the frontier. However, there are times when nodes are linked bi-directionally, meaning that you could just bounce back and forth between two nodes indefinitely. 

![[2024-08-28 cs50 lecture 0 bi-directional frontier.jpg|250]]

Revised approach:
1. Start with a frontier that contains the initial state
2. Start with an empty explored set
3. Repeat
	1. If the frontier is empty, then no solution
	2. Remove a node from the frontier
	3. If a node contains a goal state, return the solution
	4. Add the node to the explored set
	5. Expand node, add resulting nodes to the frontier if they aren't already in the frontier or the explored set

### [[Depth-First Search]]
The order in which we decide to remove a node from the frontier is important. One of the simplest data structures to represent the frontier is a [[Stack Data Structure]], which is a "last-in first-out" data type. This is depth-first search. 

A *depth-first* search algorithm exhausts each one direction before trying another direction. In these cases, the frontier is managed as a stack data structure. After nodes are being added to the frontier, the first node to remove and consider is the last one to be added. This results in a search algorithm that goes as deep as possible in the first direction that gets in the way while leaving all other directions for later. 
- Pros
	- At best, this algorithm is the fastest. If it "lucks out" and always chooses the right path to the solution (by chance) then depth-first search takes the least possible time to get to a solution.
- Cons
	- It is possible that the found solution is not optimal
	- At worst, this algorithm will explore every possible path before finding the solution, thus taking the longest possible time before reaching the solution. 

```python
# Define the function that removes a node from the frontier and returns it
def remove(self):
	# Terminate the search if the frontier is empty, because this means that there is no solution
	if self.empty():
		raise Exception("empty frontier")
	else:
		# Save the last item in the list (which is the newest node added)
		node = self.frontier[-1]
		# Save all the items on the list besides the last node (i.e., removing the last node)
		self.frontier = self.frontier[:-1]
		return node

```

DFS will always find *a solution* (assuming that the search space is not infinite). But it may not be the optimal solution.
### [[Breadth-First Search]]
This is similar to [[Depth-Search First]], except that it expands the shallowest node in the frontier. So instead of a stack, it uses a [[Queue Data Structure]] - first-in, first-out data structure. 

The BFS algorithm will follow multiple directions at the same time, taking one step in each possible direction before taking the second step in each direction. In this case, the frontier is managed as a queue data structure (first-in first-out). In this case, all the new nodes add up in a line, and nodes are being considered based on which one was added first/ This results in a search algorithm that takes one step in each possible direction before taking a second step in any one direction. 
```python
# Define the function that removes a node from the frontier and returns it
def remove(self):
	# Terminate the search if the frontier is empty, because this means that there is no solution
	if self.empty():
		raise Exception("empty frontier")
	else:
		# Save the oldest item on the list (which was the first one to be added)
		node = self.frontier[0]
		# Save all the items on the list besides the first one (i.e., removing the first node)
		self.frontier = self.frontier[1:]
		return node
```

### [[Depth-First Search and Breadth-First Search Comparisons]]
*Note: from Claude*
There are some trade-offs between Depth-First Search and Breadth-First Search. 

- DFS
	- Pros
		- Memory efficient - only needs to store a stack of nodes on the current path
		- Can find a solution without examining the entire tree
		- Well-suited for problems where the solution is known to be far from the root
	- Cons
		- May get trapped in infinite loops if not implemented correctly
		- Not guaranteed to find the shortest path
		- Can be slower than BFS is the solution is close to the root
- BFS
	- Pros
		- Guaranteed to find the shortest path in unweighted graphs
		- Good for finding all nodes within a connected component
		- Avoids getting trapped in infinite loops
	- Cons
		- More memory intensive - needs to store all nodes at the current level
		- May be slower for deep trees or graphs
		- Not ideal for decision tree problems where the solution is far from the root

### [[Greedy Best-First Search]]
There are two broad categories of search algorithms
1. [[Uninformed Search]] - search strategy that uses no problem-specific knowledge ([[Depth-First Search]], [[Breadth-First Search]])
2. [[Informed Search]] - search strategy that uses problem-specific knowledge to find solutions more efficiently ([[Greedy Best-First Search]])

Most often is the case that some knowledge about the problem is available. 

**Greedy Best-First Search** expands the node that is the closest to the goal, as determined by a **heuristic function** $h(n)$. As its name suggests, the function estimates how close to the goal the next node is, but it can be mistaken. The efficiency of the greedy best-first algorithm depends on how good the heuristic function is.

For example, in a maze, an algorithm can use a heuristic function that relies on the [[Manhattan Distance]] between the possible nodes and the end of the maze. The Manhattan Distance ignores walls and counts how many steps up, down, or to the sides it would take to get from one location to the goal location. This is an easy estimation that can be derived based on the $(x, y)$ coordinates of the current location and the goal location. 

However, it is important to emphasize that, as with any heuristic, it can go wrong and lead the algorithm down a slower path than it would have gone otherwise. It is possible that an uninformed search algorithm will provide a better solution faster, but it is less likely to do so than an informed algorithm. 

#### From Claude
- Pros
	- Very fast in many cases, especially when the heuristic is good
	- Uses less memory than A* as it doesn't need to keep track of path costs
	- Can find a reasonably good solution quickly in large search spaces
- Cons
	- Not optimal - doesn't guarantee shortest path
	- Not complete - can get stuck in loops or dead ends
	- Heavily dependent on the quality of the heuristic function
	- May perform poorly if the heuristic frequently misleads the search

### [[A* Search]]
A development of the [[Greedy Best-First Search]] algorithm, A* search considers not only $h(n)$, the estimated cost from the current location to the goal, but also $g(n)$, the cost that was accrued until the current location. By combining these values, the algorithm has a more accurate way of determining the cost of the solution and optimizing its choices on the go. The algorithm keeps track of `cost of path until now + estimated cost to the goal`, and once it exceeds the estimated cost of some previous option, the algorithm will ditch the current path and go back to the previous option, thus preventing itself from going down a long, inefficient path that $h(n)$ erroneously marked as best. 

Since this algorithm also relies on a heuristic, it is as good as the heuristic that it employs. It is possible that in some situations it will be less efficient than GFS or even the uninformed algorithms. For A* search to be optimal, the heuristic function should be:
1. Admissible, or never overestimating the true cost (it gets it exactly correct or underestimates)
2. Consistent, which means that the estimated path cost to the goal of a new node in addition to the cost of transitioning to it from the previous node is greater or equal to the estimated path cost to the goal of the previous node. To put it in an equation, $h(n)$ is consistent if for every node $n$ and successor node $n'$ with step cost $c$, $h(n) <= h(n') + c$. 

#### From Claude
- Pros
	- Efficiency: A* is generally more efficient that other search algorithms like [[Dijkstra's Algorithm]], especially for large search spaces
	- Optimality: It guarantees finding the optimate (shortest) path if one exists, provided an admissible heuristic is used. 
	- Flexibility: A* can be adapted to various problem domains by modifying its heuristic function. 
	- Informed search: It uses heuristics to guide the search towards the goal, potentially reducing the number of nodes explored. 
	- Completeness: A* will always find a solution if one exists, given enough time and memory. 
- Cons
	- Memory usage: A* can consume a lot of memory, especially for large search spaces, as it needs to store all generated nodes
	- Heuristic dependency: The algorithm's performance heavily relies on the quality of the heuristic function. A poor heuristic can lead to suboptimal performance. 
	- Complexity: Implementing A* correctly, especially choosing an appropriate heuristic, can be more complex than simpler algorithms like [[Breadth-First Search]] or [[Depth-First Search]]
	- Not suitable for all problems: A* may not be the best choice for problems where the heuristic is difficult to define or compute. 
	- Potential for inconsistent results: If the heuristic is not consistent, A* may now always find the optimal path. 


### [[Adversarial Search]]
#### From Claude
Adversarial Search is a type of search algorithm used in [[Game Thoery]] and [[Artificial Intelligence]] to make decisions in scenarios where multiple agents with competing objectives are involved. It's commonly used in two-player games like chess, checkers, or Go. The algorithm considers possible moves by both the player and the opponent, trying to find the best move assuming the opponent will also play optimally. 

The most well-known adversarial search algorithm is [[Minimax]], often enhanced with alpha-beta pruning for efficiency. These algorithms create a game tree of possible moves and countermoves, evaluating positions to determine the best course of action. 

- Pros:
	- Optimal decision-making: In fully observable, deterministic games, it can find the optimal move. 
	- Anticipates opponent's moves: It considers the opponent's possible responses, leading to more robust strategies. 
	- Applicable to many domains: Useful in various fields beyond games, such as economics and military strategy. 
	- Pruning techniques available: Enhancements like [[Alpha-Beta Pruning]] can significantly improve efficiency. 
	- Adaptable to different game complexities: Can be adjusted (e.g., limiting search depth) to suit computational resources. 
- Cons
	- Computationally expensive: For complex games, the search space can become extremely large, requiring significant processing power.
	- Memory intensive: Storing the game tree can require substantial memory, especially for deep searches. 
	- Assumes rational opponent: The algorithm assumes the opponent always makes the best move, which may not reflect real-world scenarios.
	- Difficulty with imperfect information: Traditional adversarial search struggles with games where all information isn't visible (e.g., poker).
	- Can be predictable: If both players use the same algorithm, gameplay might become formulaic. 
	- Evaluation function dependent: The effectiveness heavily relies on the quality of the position evaluation function, which can be challenging to design for complex games.

### [[Minimax]]

A type of algorithm in [[Adversarial Search]], Minimax represents winning conditions as (-1) for one side and (+1) for the other size. Further actions will be driven by these conditions, with the minimizing side trying to get the lowest score, and the maximizer trying to get the highest score. 

We need to have the ability to translate a game into something that a computer understands, i.e., numbers and comparing them. 

For example, in tic-tac-toe, if we assume we want `player X` to win, then we can assign `-1` to `player O` winning, `0` to a draw, and `+1` to `player X` winning. 

So there would be two "players" playing this game, `MAX(X)` that wants to maximize the score for `X` to win, and `MIN(O)` that wants to minimize the score for `O` to win. 

To encode it into an AI, we need:
- $S_0$ - The initial state (e.g., an empty 3X3 board)
- $Players(s)$ - A function that, given a state $s$, returns which player's turn it is (X or O).
- $Actions(s)$ - A function that, given a state $s$, return all the legal moves in this state. 
- $Results(s)$ - A function that, given a state $s$ and an action $a$, return a new state. This is the result from performing the action $a$ on state $s$ (i.e., making a move in a game). 
- $Terminal(s)$ - A function that, given a state $s$, checks whether this is the last step in the game, i.e., if someone won or there is a tie. Return `True` if the game has ended, `False` otherwise. 
- $Utility(s)$ - A function that, given a terminal state $s$, returns the utility value of the state: -1, 0, +1.

**How the Algorithm Works**

Recursively, the algorithm simulates all possible games that can take place beginning at the current state and until a terminal state is reached. Each terminal state is valued as either -1, 0, or +1. 

So the algorithm will take in a state and will have all the legal actions that can be performed from that state. But unless there is a terminal state, the algorithm doesn't know which state has a lower or higher value. So it will consider all of them. For each state, it will select an action to generate a new state, a repeat the process over again, but this time considering it from the other player's point of view. 

For example, if the `MAX(X)` player is taking its turn and is looking at a set of states, it will select an action for each one, resulting in new states. For each of those states, it will then take the point of view of `MIN(O)` to select an action because `MAX(X)` assumes that `MIN(O)` is playing optimally. `MAX(X)` will continue this generating of states / selecting actions / switching perspectives until it reaches a terminal state and select the path that maximizes its score.

![[2024-09-03 cs50 lecture 0 minimax.jpg]]

In pseudocode:

- Given a state s:
	- MAX picks action $a$ in `Actions(s)` that produces highest value of `Min_Value(Result(state, action))`
	- MIN picks action $a$ in `Actions(state)` that produces smallest value of `Max_Value(Results(state, action))`

```python
def max_value(state):
	v = -inf
	if terminal(state):
		return utility(state)
	for action in Actions(state):
		v = max(x, min_value(result(state, action)))
	return v

def min_value(state):
	v = +inf
	if terminal(state):
		return utility(state)
	for action in Actions(state):
		v = min(v, max_value(result(state, action)))
	return v
```

#### From Claude
Minimax is a decision-making algorithm used in two-player turn-based games. It's designed to find the optimal move for a player, assuming that the opponent also plays optimally. The algorithm works by recursively building a game tree that represents all possible moves and their outcomes. 

In Minimax, one player aims to maximize their score (typically the AI), while the other tries to minimize it (typically the opponent). The algorithm alternates between these two objectives as it traverses the games tree:
1. At maximizing levels, it chooses the move with the highest score.
2. At minimizing levels, it chooses the move with the lowest score. 

The algorithm continues this process until it reaches terminal states (end of game) or a predefined depth limit. It then propagates these scores back up the tree to determine the best move for the current state. 

- Pros
	- Optimal decision-making: Guarantees the best move in fully observable, deterministic games. 
	- Simplicity: The core concept is straightforward and easy to understand. 
	- Completeness: Explores all possible game states within the search depth. 
	- Adaptable: Can be applied to various two-player, turn-based games. 
	- Foundation for improvements: Serves as a base for more advanced algorithms like [[Alpha-Beta Pruning]].
- Cons
	- Computationally expensive: The time complexity grows exponentially with game tree depth. 
	- Memory intensive: Requires storing the entire game tree in memory. 
	- Limited by search depth: Practical implementations often need to limit search depth, potentially missing optimal moves in complex games. 
	- Assumes perfect play: May not perform optimally against suboptimal opponents. 
	- Struggles with games of chance: Not directly applicable to games with random elements. 
	- Evaluation function dependent: The algorithm's effectiveness relies heavily on the quality of the state evaluation function. 
	- Fixed strategy: Without modifications, it doesn't adapt to opponent's playing style or learn from past games. 

### [[Alpha-Beta Pruning]]

A way to optimize [[Minimax]] is through Alpha-Beta Pruning. This skips some of the recursive computations that are decidedly unfavorable. After establishing the value of one action, if there is initial evidence that the following actions can bring the opponent to get a better score than the already established action, there is no need to further investigate this action because it will decidedly be less favorable than the previously established one. 

![[2024-09-03 cs50 lecture 0 alpha beta pruning.jpg]]

In the image, this is shown by the empty triangles. It is the maximizing players turn. The bottom row of triangles are the values that the minimizing player gets to choose from. The middle row is what the maximizing player gets to choose from. Once the 3 was calculated, we as the maximizing player have no need to calculate the rest of the states because regardless of what it is, we are not going to be choosing that path because we know it can only be at most a 3 since that is the minimizing player's choice, and between 3 and 4, the maximizing player will choose 4. 

#### From Claude

Alpha-Beta Pruning is an optimization technique for the [[Minimax]] algorithm. It reduces the number of nodes evaluated in the game tree without affecting the final result. The algorithm maintains two values, alpha and beta, which represent the minimum score that the maximizing player is assured of and the maximum score that the minimizing player is assured of, respectively. 

As the algorithm traverses the game tree, it updates these values and uses them to eliminate branches that cannot possible influence the final decision. If the current node's value is worse than the alpha or beta value for the player, that branch is pruned because the opponent would never allow the play to reach that node. 

The effectiveness of alpha-beta pruning depends on the order in which nodes are examined. With an ideal ordering, it can effectively double the depth of the search possible in a given amount of time. 

- Pros
	- Improved efficiency: Significantly reduces the number of nodes evaluated compared to standard [[Minimax]].
	- Faster decision-making: Allows for deeper searches in the same amount of time as [[Minimax]].
	- Optimal results: Produces the same result as [[Minimax]], ensuring optimal play. 
	- Memory efficient: Can be implemented with less memory usage than full [[Minimax]].
	- Applicable to various games: Can be used in any zero-sum, two player game. 
- Cons
	- Oder dependent: The efficiency of pruning heavily depends on the order in which moves are examined. 
	- Implementation complexity: More complex to implement correctly than basic [[Minimax]].
	- Still exponential: While more efficient, the time complexity is still exponential in the worst case.
	- Not suitable for non-zero-sum games: The algorithm assumes that one player's gain is the other's loss. 
	- Requires good evaluation function: Like [[Minimax]], its effectiveness depends on the quality of the position evaluation. 
	- May struggle with dynamic game states: In games where the state can change dramatically, pruning might be less effective. 

### [[Depth-Limited Minimax]]

**Depth-limited Minimax** considers only a pre-defined number of moves before it stops, without ever getting to a terminal state. However, this doesn’t allow for getting a precise value for each action, since the end of the hypothetical games has not been reached. To deal with this problem, _Depth-limited Minimax_ relies on an **evaluation function** that estimates the expected utility of the game from a given state, or, in other words, assigns values to states. For example, in a chess game, a utility function would take as input a current configuration of the board, try to assess its expected utility (based on what pieces each player has and their locations on the board), and then return a positive or a negative value that represents how favorable the board is for one player versus the other. These values can be used to decide on the right action, and the better the evaluation function, the better the Minimax algorithm that relies on it.

#### From Claude

Depth-Limited Minimax is a variant of the standard [[Minimax]] algorithm that addresses the computational challenges of searching deep game trees. This algorithms sets a maximum depth for the search, beyond which it stops exploring and applies an evaluation function to estimate the value of the game state. 

The algorithm works as follows:
1. It explores the game tree up to a predetermined depth limit. 
2. When it reaches the depth limit or a terminal state, it applies an evaluation function to estimate the value of that state. 
3. These values are then propagated back up the tree using the standard [[Minimax]] procedure. 
4. The algorithm chooses the move that leads to the best evaluated position within the depth limit. 

- Pros
	- Bounded computation time: Guarantees a decision within a predictable timeframe. 
	- Memory efficient: Requires less memory than full [[Minimax]] as it doesn't explore the entire game tree. 
	- Applicable to complex games: Allows [[Minimax]] to be applied to games with very large or infinite game trees. 
	- Adjustable performance: The depth limit can be tuned based on available computational resources or time constraints. 
	- Combines heuristics with search: Leverages both tree search and heuristic evaluation. 
- Cons
	- Suboptimal decisions: May miss optimal moves that would be found at greater depths. 
	- Horizon effect: Can make poor decisions when important events occur just beyond the search depth. 
	- Evaluation function dependency: Heavily relies on the quality of the evaluation function for non-terminal nodes. 
	- Depth selection challenge: Choosing an appropriate depth limit can be difficult and may require experimentation. 
	- Lack of completeness: Unlike full [[Minimax]], it's not guaranteed to find a winning strategy even if one exists. 
	- Potential for misjudgment: In certain game states, the limited depth might lead to misunderstanding of the true game situation. 
	- Fixed search depth: Without modifications, it doesn't adapt the search depth based 


## Knowledge
Human reason based on existing knowledge and draw conclusions. The concept of representing knowledge and drawing conclusions from it is also used in AI. 

**[[Knowledge-Based Agents]]**
These are agents that reason by operating on internal, representations of knowledge. 

What does "reasoning based on knowledge to draw a conclusion" mean?

Let's start answering this with a [[Harry Potter]] example. Consider the following sentences:
1. If it didn't rain, Harry visited Hagrid today.
2. Harry visited Hagrid or Dumbledore today, but not both. 
3. Harry visited Dumbledore today. 

Based on these three sentences, we can answer the question "did it rain today" even though none of the individual sentences tells us anything about whether it is raining today. By looking at sentence 3, we know that Harry visited Dumbledore. Looking at sentence 2, we know that Harry visited either Dumbledore or Hagrid, thus we can conclude
4. Harry did not visit Hagrid.

Now, looking at sentence 1, we understand that if it didn't rain, Harry would have visited Hagrid. However, knowing sentence 4, we know that this is not the case. Therefore, we can conclude
5. It rained today.

To come to this conclusion, we used logic, and this lecture explores how AI can use logic to reach new conclusions based on existing information. 

**Sentence** - a sentence is an assertion about the world in a knowledge representation language. A sentence is how AI stores knowledge and uses it to infer new information. 

### [[Propositional Logic]]
Propositional logic is based on propositions, statements about the world that can be either true or false, as in sentences 1-5 above. 

**[[Propositional Symbols]]** - are most often letters (P, Q, R) that are used to represent a proposition. 

**[[Logical Connectives]]** - are logical symbols that connect propositional symbols in order to reason in a more complex way about the world. 

- **Not (¬)** - inverses the truth value of the proposition. For example, if `P`: "It is raining", the `¬P` is "It is not raining". 
- **And (∧)** - connects two different propositions. When two propositions are connected by ∧, then the resulting proposition `P ∧ Q` is true only in the case that both `P` and `Q` are true. 
- **Or (∨)** - is true as long as either of its arguments is true. This means that for `P ∨ Q` to be true, at least one of `P` or `Q` has to be true. 
	- It is worthwhile to mention that there are two types of "Or": an [[Inclusive Or]] and an [[Exclusive Or]]. In an Exclusive Or, `P ∨ Q` is false if `P ∧ Q` is true. That is, an Exclusive Or requires **only one** of its arguments to be true for it to evaluate to true, **not both**. An Inclusive Or it true if any of P, Q, or P and Q is true. In the case of Or (∨), the intention is an Inclusive Or. 
- **Implication (→)** - represents a structure of "if P then Q". For example, if P: "It is raining" and Q: "I'm indoors." In the case of P implies Q (`P → Q`), P is called the **antecedent** and Q is called the **consequent**. 
	- When the antecedent is true, the whole implication it true in the case that the consequent is true. (if it is raining and I'm indoors, then the sentence "if it is raining, then I'm indoors", is true). When the antecedent is true, the implication is false if the consequent is false (if I'm outside while it is raining, then the sentence "If it is raining, then I'm indoors" is false).
	- However, when the antecedent is false, the implication is always true, **regardless** of the consequent. Logically, we cannot learn anything from an implication `P->Q` if the antecedent (`P`) is false. E.g., if it is not raining, the implication doesn't say anything about whether I'm indoors or not. When the antecedent is false, we say that the implication is **trivially true**. 
- **Biconditional (↔)** is an implication that goes both directions. You can read is as "if an only if". P↔Q is the same as P→Q and Q→P taken together. Foe example, if P: "It is raining" and Q: "I'm indoors", then P↔Q means that "If it is raining, then I'm indoors" and "if I'm indoors, then it is raining". This means that we can infer more than we could with a simple implication. If P is false, then Q is also false; if it is not raining, we know that I'm also not indoors. 

Truth tables are used to compare all possible truth assignments to propositions.

| P   | Q   | P ∧ Q | P ∨ Q | P→Q | P↔Q |
| --- | --- | ----- | ----- | --- | --- |
| T   | T   | T     | T     | T   | T   |
| T   | F   | F     | T     | F   | F   |
| F   | T   | F     | T     | T   | F   |
| F   | F   | F     | F     | T   | T   |

**[[Model]]**
The model is an assignment of a truth value to every proposition. To reiterate, propositions are statements about the world that can be either true or false. However, knowledge about the world is represented in the truth values of the propositions. The model is the truth-value assignment that provides information about the world. 

For example, if P "it is raining" and Q "it is Tuesday", a model could be the following truth-value assignment:

`{P = True, Q = False}`

This model means that it is raining, but it it not Tuesday. However, there are more possible models in this situation. For example, `{P = True, Q = True}`, where it is both raining and a Tuesday. In face, the number of possible models is 2 to the power of the number of propositions. In this case, we had 2 propositions, so $2^2=4$ possible models. 

**[[Knowledge Base]]**
The knowledge base is a set of sentences known by [[Knowledge-Based Agents]]. This is knowledge that the AI is provided about the world in the form of [[Propositional Logic]] sentences that can be used to make additional inferences about the world. 

**[[Entailment]] (⊨)**
If α ⊨ β (α entails β), then in any world where α is true, β is true too. 

For example, if α "it is a Tuesday in January" and β "It is January", then we know that α ⊨ β. If it is true that it is a Tuesday in January, we also know that it is January. Entailment is different from implication. Implication is a logical connective between two propositions. Entailment, on the other hand, is a relation that means that if all the information in α is true, then all the information in β is true. 

### [[Inference]]
Inference is the process of deriving new sentences from old ones. For instance, in the sentences, number 4 and 5 are inferred from 1, 2, and 3. 
1. If it didn't rain, Harry visited Hagrid today.
2. Harry visited Hagrid or Dumbledore today, but not both. 
3. Harry visited Dumbledore today. 
4. Harry did not visit Hagrid.
5. It rained today.

There are multiple ways to infer new knowledge based on existing knowledge. First, we will consider the **[[Model Checking Algorithm]]**. 
- To determine if KB ⊨ α (i.e., answering the question: "can we conclude that α is true based on our knowledge base"?)
	- Enumerate all possible models.
	- If in every model where KB is true, α is true as well, then KB entails α (KB ⊨ α). 

Consider the following example.
- P: It is a Tuesday. 
- Q: It is raining. 
- R: Harry will go for a run. 
- KB: (P ∧ ¬Q) → R
	- P and not Q imply R
- P is true
- Q is false
- Query R (is R true of false, does KB ⊨ R?)

To answer the query using the Model Checking Algorithm, we enumerate all possible models. Then, we go through every model and check whether it is true given our Knowledge Base. 
- First, in our KB, we that that P is true. Thus, we can say that the KB is false in all models were P is not true. 
- Next, similarly, in our KB, we know that Q is false. Thus, we can say that the KB is false in all models where Q is true. 
- Finally, we are left with two models. P is true in both. Q is false in both. R has one true and one false. Given the model, we can say that when P is true and Q is false, R must be true. So we say KB is false when R is false, and true for the model where R is true. 

| P   | Q   | R   | KB  |
| --- | --- | --- | --- |
| F   | F   | F   | F   |
| F   | F   | T   | F   |
| F   | T   | F   | F   |
| F   | T   | T   | F   |
| T   | F   | F   | F   |
| T   | F   | T   | T   |
| T   | T   | F   | F   |
| T   | T   | T   | F   |

Looking at this model, there is only one model where the Knowledge Base is true. In this model, we see that R is also true. By our definition of entailment, if R is true in all models where the KB is true, then KB ⊨ R. Let's look at how knowledge and logic can be represented as code. 
```python
from logic import *
# Create new classes, each having a name, or a symbol, representing each proposition.
rain = Symbol("rain") # It is raining.
hagrid = Symbol("hagrid") # Harry visited Hagrid
dumbledore = Symbol("dumbledore") # Harry visited Dumbledore

# Save sentences into the KB
knowledge = And( # Note 1 
	Implication(Not(rain), hagrid), # Note 2
	Or(hagrid, dumbledore), # Note 3 
	Not(And(hagrid, dumbledore)), # Note 4 
	dumbledore # Note 5 
)
```
Notes:
1. Start from the "And" b/c each proposition is knowledge that we know to be true.
2. ¬(It is raining) → (Harry visited Hagrid)
3. (Harry visited Hagrid) ∨ (Harry visited Dumbledore).
4. ¬(Harry visited Hagrid ∧ Harry visited Dumbledore) i.e. Harry did not visit both Hagrid and Dumbledore.
5. Harry visited Dumbledore. Note that while previous propositions contained multiple symbols with connectors, this is a proposition consisting of one symbol. This means that we take as a fact that, in this KB, Harry visited Dumbledore.

To run the Model Checking algorithm, the following information is needed:
- Knowledge Base, which will be used to draw inferences
- A query, or the proposition that we are interested in whether it is entailed by the KB
- Symbols, a list of all the symbols (or atomic propositions) used (in our case, these are `rain`, `hagrid`, and `dumbledore`).
- Model, an assignment of truth and false values to symbols.

The model checking algorithm looks as follows:
```python
def check_all(knowledge, query, symbols, model):
    # If model has an assignment for each symbol
    # (The logic below might be a little confusing: we start with a list of symbols. The function is recursive, and every time it calls itself it pops one symbol from the symbols list and generates models from it. Thus, when the symbols list is empty, we know that we finished generating models with every possible truth assignment of symbols.)
    if not symbols:
        # If knowledge base is true in model, then query must also be true
        if knowledge.evaluate(model):
            return query.evaluate(model)
        return True
    else:
        # Choose one of the remaining unused symbols
        remaining = symbols.copy()
        p = remaining.pop()

        # Create a model where the symbol is true
        model_true = model.copy()
        model_true[p] = True

        # Create a model where the symbol is false
        model_false = model.copy()
        model_false[p] = False

        # Ensure entailment holds in both models
        return(
	        check_all(knowledge, query, remaining, model_true) and 
	        check_all(knowledge, query, remaining, model_false))
```
Note that we are interested only in the models where the KB is true. If the KB is false, then the conditions that we know to be true are not occurring in these models, making them irrelevant to our case.

Further, the way the `check_all` function works is recursive. That is, it picks one symbol, creates two models, in one of which the symbol is true and in the other the symbol is false, and then calls itself again, now with two models that differ by the truth assignment of this symbol. The function will keep doing so until all symbols will have been assigned truth-values in the models, leaving the list `symbols` empty. Once it is empty (as identified by the line `if not symbols`), in each instance of the function (wherein each instance holds a different model), the function checks whether the KB is true given the model. If the KB is true in this model, the function checks whether the query is true, as described earlier.

### [[Knowledge Engineering]]
Knowledge Engineering is the process of figuring out how to represent propositions and logic in [[Artificial Intelligence]].

Let's use the game Clue as an example. In the game, a murder was committed by a *person* using a *tool*, in a *location*. In our [[Model Checking Algorithm]] we mark items that we know are related to the murder as `True`, and `False` otherwise. 

Suppose we have three people (Mustard, Plum, and Scarlet), three tools (knife, revolver, wrench), and three locations (ballroom, kitchen, and library). 

We can start creating our knowledge base by adding the rules of the game. We know for certain that one person is the murdered, that one tool was used, and that it happened in one location. This can be represented in propositional logic in the following way:
- (Mustard ∨ Plum ∨ Scarlet)
- (knife ∨ revolver ∨ wrench)
- (ballroom ∨ kitchen ∨ library)

The game starts with each player seeing one person, on tool, and one location, thus knowing that those are not related to the murder. Players do not share the information that they saw in these cards. Suppose we got the cards of Mustard, kitchen, and revolver. Thus, we know that these are not related to the murder and we can add to our knowledge base. 
- ¬(Mustard)
- ¬(kitchen)
- ¬(revolver)

In other situations in the game, one can make a guess, suggesting one combination of one person, one tool, and one location. Suppose that the guess is that Scarlet used the wrench in the library. If this guess is wrong, then the following can be deduced and added to the KB (we only learn that the *combination* is wrong):
- (¬Scarlet ∨ ¬library ∨ ¬wrench)

Now, suppose someone shows us the Plum card. Thus we add the following to our KB. 
- ¬(Plum)

At this point, we can conclude that the murderer is Scarlet. Adding another piece of evidence, for example, that the location was not the ballroom, can give us more information. First, update the KB:
- ¬(ballroom)

At this point, we can deduce that it was Scarlet with the knife in the library. We know at least one of the element from the earlier incorrect guess of Scarlet, library, and wrench, has to be false. Since we know Scarlet and library to be true, wrench must be false, and we know the revolver isn't true, so we can conclude that it is the knife. Here is a Python implementation:
```python
knowledge = And(
	# Start with game conditions
	Or(mustard, plum, scarlet),
	Or(ballroom, kitchen, library),
	Or(knife, revolver, wrench),

	# Add the infromation from our initial cards
	Not(mustard),
	Not(kitchen),
	Not(revolver),

	# Add the guess someone made
	Or(Not(scarlet), Not(library), Not(wrench)),

	# Add the cards that we were exposed to
	Not(plum),
	Not(ballroom)
)
```

We can look at other logic puzzles as well. Consider the following example: four different people Gilderoy, Pomona, Minerva, and Horace, are assigned to four different houses, Gryffindor, Hufflepuff, Ravenclaw, and Slytherin. There is exactly one person in each house. Representing the puzzle's conditions in propositional logic is quite cumbersome. First, each of the possible assignments will have to be a proposition in itself: MinervaGryffindor, MinervaHufflepuff, MinervaRavenclaw, MinervaSlytherin, PomonaGryffindor… Second, to represent that each person belongs to a house, an Or statement is required with all the possible house assignments per person. 

(MinervaGryffindor ∨ MinervaHufflepuff ∨ MinervaRavenclaw ∨ MinervaSlytherin), repeat for every person.

Then, to encode that if one person is assigned to one house, they are not assigned to the other houses, we would write…

(MinervaGryffindor → ¬MinervaHufflepuff) ∧ (MinervaGryffindor → ¬MinervaRavenclaw) ∧ (MinervaGryffindor → ¬MinervaSlytherin) ∧ (MinervaHufflepuff → ¬MinervaGryffindor)…

and so on for all houses and all people. A solution to this inefficiency is offered from [[First Order Logic]]. However, this type of riddle can still be soled with either type of logic, given enough clues. 

Another type of puzzle that can be solved using propositional logic is a Mastermind game. In this game, player one arranges colors in a certain order, and then player two has to guess this order. Each turn, player two makes a guess, and player one gives back a number, indicating how many colors player two got right. Let's simulate a game with four colors. Suppose player two suggests the following order:

Red | Blue | Green | Yellow

And player one answers "two". Thus we know that two of the colors are in the correct position, and the other two are in the wrong place. Based on this information, player two switches the location of two colors:

Blue | Red | Green | Yellow

Now player one answers "zero". Thus, player two knows that the switched colors were in the right location initially, which means the two untouched colors were in the correct place. Player two switches them:

Red | Blue | Yellow | Green

Representing this in propositional logic would require us to have (number of colors)^2 atomic propositions. In the case of four colors, we would have the propositions `red0`, `red1`, `red3`, `red4`, `blue0`… for each color and position. The next step would be representing the rules of the game in propositional logic (that there is only one color in each position and no colors repeat) and adding them to the KB. The final step would be adding all the cues that we have to the KB. 

### [[Inference Rules]]
The [[Model Checking Algorithm]] is not efficient because it has to consider every possible model before giving the answer. Inference rules allow us to generate new information based on existing knowledge without considering every possible model. 

Inference Rules are usually represented using a horizontal bar that separates the top part, the premise, from the bottom part, the conclusion. The premise is whatever knowledge we have, and the conclusion is what knowledge can be generated based on the premise. 
```
If it if raining, then Harry is inside. 
It is raining.
---
Harry is inside. 
```

In this example, our premise consist of the following propositions:
- If it is raining, then Harry is inside.
- It is raining. 

Based on this, we can conclude that:
- Harry is inside. 

The type of inference rule we use in this example is [[Modus Ponens]], which is a fancy way of saying that if we know an implication and its antecedent to be true, then the consequent is true as well.
```
α → β
α
---
β
```

And Elimination - If an "And" proposition is true, then any one atomic proposition within it is true as well. For example, if we know that Harry is friends with Ron and Hermione, we can conclude that Harry is friends with Hermione. 
```
α ⋀ β 
---
α
```

Double Negation Elimination - A proposition that is negated twice is true. 
```
¬(¬(α))
---
α
```

Implication Elimination - An implication is equivalent to an Or relation between the negated antecedent and the consequent. E.g., "If it is raining, Harry is inside" is equivalent to "(it is not raining) or (Harry is inside)".
```
α → β
---
¬α ⋁ β
```

The Implication Elimination can be a little confusing, but consider the following truth table:

| **P** | **Q** | P → Q | ¬P ∨ Q |
| :---: | :---: | :---: | :----: |
|   F   |   F   |   T   |   T    |
|   F   |   T   |   T   |   T    |
|   T   |   F   |   F   |   F    |
|   T   |   T   |   T   |   T    |

Since P → Q and ¬P ∨ Q have the same truth-value assignment, we know them to be equivalent logically.

Another way to think about is that an implication is true if either of two possible conditions is met:
1. If the antecedent if false, the implication is trivially true, as discussed in [[Propositional Logic]]. This is represented by the negated antecedent P in ¬P ∨ Q, meaning that the proposition is always true if P is false. 
2. The implication is true when the antecedent is true only when the consequent is true as well. That is, if P and Q are both true, then ¬P ∨ Q is true. However, if P is true and Q if false, then ¬P ∨ Q is false. 

[[Biconditional Elimination]] - A biconditional proposition is equivalent to an implication and its inverse with an And connective. For example, "It is raining if and only if Harry is inside" is equivalent to ("If it is raining, Harry is inside" And "If Harry is inside, it is raining"). 
```
α ↔ β
---
(α → β) ⋀ (β → α)
```

De Morgan's Law - It is possible to turn an And connective into an Or connective. Consider the following proposition: "It is not true that both Harry and Ron passed the test". From this, is it possible to conclude that "It is not true that Harry passed the test" Or "It is not true that Ron passed the test". That is, for the And proposition earlier to be true, at least one of the propositions in the Or propositions must be true. 
```
¬(α ⋀ β)
---
¬α ⋁ ¬β
```

Similarly, it is possible to conclude the reverse. "It is not true that Harry or Ron passed that test" can be rephrased as "Harry did not pass the test" And "Ron did not pass the test".
```
¬(α ⋁ β)
---
¬α ⋀ ¬β
```

Distributive Property - A proposition with two elements that are grouped with "And" or "Or" connectives can be distributed, or brown down into smaller units consisting of "And" and "Or". 
```
(α ⋀ (β ⋁ γ))
---
(α ⋀ β) ⋁ (α ⋀ γ)
```

```
(α ⋁ (β ⋀ γ))
---
(α ⋁ β) ⋀ (α ⋁ γ)
```

Knowledge and Search Problems - Inference can be viewed as a search problem with the following properties:
- Initial state - starting knowledge base
- Actions - inference rules
- Transition model - new knowledge base after inference
- Goal test - checking whether the statement that we are trying to prove is in the KB
- Path cost function - the number of steps in the proof

This shows just how versatile [[Search Algorithms]] are, allowing us to derive new information based on existing knowledge using inference rules. 

### [[Resolution]]
Resolution if a powerful [[Inference Rules|Inference Rule]] that states that if one of two atomic propositions in an Or proposition is false, then other other has to be true. For example, given the proposition "Ron is in the Great Hall" Or "Hermione is in the library", in addition to the proposition "Ron is not in the Great Hall", we can conclude that "Hermione is in the library". More formally, we can define resolution the following way:
```
P ⋁ Q
¬P
---
Q
```

Resolution relies on [[Complementary Literals]], two of the same atomic propositions where one is negated and the other is not, such as P and ¬P. 

Resolution can be further generalized. Suppose that in addition to the proposition "Ron is in the Great Hall" Or "Hermione is in the library", we also know that "Ron is not in the Great Hall" Or "Harry is sleeping". We can infer from this, using resolution, that "Hermione is in the library" Or "Harry is sleeping". In formal terms:
```
P ⋁ Q
¬P ⋁ R
---
Q ⋁ R
```

[[Complementary Literals]] allow us to generate new sentences through inferences by resolution. Thus, inference algorithms locate complementary literals to generate new knowledge. 

A **Clause** is a disjunction of literals (a propositional symbol or a negation of a propositional symbol, such as P, ¬P). A **disjunction** consists of propositions that are connected with an Or logical connective (P ∨ Q ∨ R). A **conjunction**, on the other hand, consists of propositions that are connected with an And logical connective (P ∧ Q ∧ R). Clauses allow us to convert any logical statement into a **Conjunctive Normal Form** (CNF), which is a conjunction of clauses, for example,  (A ∨ B ∨ C) ∧ (D ∨ ¬E) ∧ (F ∨ G).

**Steps in Conversion of Propositions to Conjunctive Normal Form**
- Eliminate biconditional
	- Turn (α ↔ β) into (α → β) ∧ (β → α)
- Eliminate implications
	- Turn (α → β) into ¬α ∨ β
- Move negation inwards until only literals are being negated (and not clauses), using [[De Morgan's Law]]
	- Turn ¬(α ∧ β) into ¬α ∨ ¬β

Here is an example of converting (P ∨ Q) → R to Conjunctive Normal Form:
- (P ∨ Q) → R
- ¬(P ∨ Q) ∨ R /Eliminate implication
- (¬P ∧ ¬Q) ∨ R /De Morgan’s Law
- (¬P ∨ R) ∧ (¬Q ∨ R) /Distributive Law

At this point, we can run an inference algorithm on the conjunctive normal form. Occasionally, through the process of inference by resolution, we might end up in cases where a clause contains the same literal twice. In these cases, a process called **factoring** is used, where the duplicate literal is removed. For example, (P ∨ Q ∨ S) ∧ (¬P ∨ R ∨ S) allows us to infer by resolution that (Q ∨ S ∨ R ∨ S). The duplicate S can be removed to give us (Q ∨ R ∨ S). 

Resolving a literal and its negation, i.e., ¬P and P, give the **empty clause**. The empty clause is always false, and this makes sense because it it impossible that both P and ¬P are true. This fact is used by the resolution algorithm. 
- To determine if KB ⊨ α:
	- Check: is (KB ∧ ¬α) a contradiction?
		- If so, then KB ⊨ α
		- Otherwise, no entailment

Proof by contradiction is a tool used often in computer science. If our knowledge base is true, and it contradicts ¬α, it means that ¬α is false, and, therefore, α must be true. More technically, the algorithm would perform the following actions:
- To determine if KB ⊨ α:
	- Convert (KB ∧ ¬α) to [[Conjunctive Normal Form]]
	- Keep checking to see if we can use resolution to produce a new clause
	- If we ever produce the empty clause (equivalent to false), then we have arrived at a contradiction, this proving that KB ⊨ α
	- If contradiction is not achieved and no more clauses can be inferred, there is no entailment. 

Here is an example that illustrates how this algorithm might work:
- Does (A ∨ B) ∧ (¬B ∨ C) ∧ (¬C) entail A?
- First, to prove by contradiction, we assume that A is false. Thus, we arrive at (A ∨ B) ∧ (¬B ∨ C) ∧ (¬C) ∧ (¬A).
- Now, we can start generating new information. Since we know that C is false (¬C), the only way (¬B ∨ C) can be true is if B is false, too. Thus, we can add (¬B) to our KB.
- Next, since we know (¬B), the only way (A ∨ B) can be true is if A is true. Thus, we can add (A) to our KB.
- Now our KB has two complementary literals, (A) and (¬A). We resolve them, arriving at the empty set, (). The empty set is false by definition, so we have arrived at a contradiction.

### [[First Order Logic]]
First Order Logic is another type of logic that allows us to express more complex ideas more succinctly that propositional logic. First order logic uses two types of symbols: [[Constant Symbols]] and [[Predicate Symbols]]. Constant symbols represent objects, while predicate symbols are like relations or functions that take an argument and return a true or false value. 

For example, we return to the logic puzzle with different people and house assignments at Hogwarts. The constant symbols are people or houses, like Minerva, Pomona, Gryffindor, etc. The predicate symbols are properties that hold true or false of some of some constant symbols. For example, we can express the idea that Minerva is a person using the sentence `Person(Minerva)`. Similarly, we can express the idea that Gryffindor is a house using the sentence `House(Gryffindor)`.

All the logical connectives work in first order logic the same was as before. For example, `¬House(Minerva)` expresses the idea that Minerva is not a house. A predicate symbol can also take two or more arguments and express a relation between them. For example, `BelongsTo` expresses a relation between two arguments, the person and the house to which the person belongs. Thus, the idea that Minerva belongs to Gryffindor can be expressed as `BelongsTo(Minerva, Gryffindor)`. 

First Order Logic allows having one symbol for each person and one symbol for each house. This is more succinct than propositional logic, where each person - house assignment would require a different symbol. 

[[Universal Quantification]] - Quantification is a tool that can be used in first order logic to represent sentences without using a specific constant symbol. Universal quantification uses the symbol ∀ to express "for all". For example, the sentence `∀x. BelongsTo(x, Gryffindor) → ¬BelongsTo(x, Hufflepuff)` expresses the idea "for every symbol that belong to Gryffindor, it does not belong to Hufflepuff".

[[Existential Quantification]] - is an idea parallel to [[Universal Quantification]]. However, while universal quantification was used to create sentences that are true for all `x`, existential quantification is used to create sentences that are true for at least one `x`. It is expressed using the symbol ∃. For example, the sentence `∃x. House(x) ∧ BelongsTo(Minerva, x)` means that there is at least one symbol that is both a house and that Minerva belongs to it. In other words, this expresses the idea that Minerva belongs to a house. 

[[Existential Quantification]] and [[Universal Quantification]] can be used in the same sentence. For example, the sentence `∀x. Person(x) → (∃y. House(y) ∧ BelongsTo(x, y))` expresses the idea that if `x` is a person, there there is at least one house, `y`, to which this person belongs. In other words, every person belongs to a house. 

## Uncertainty
[[Artificial Intelligence|AI]] usually only has partial [[Knowledge]] of the world, leaving space for uncertainty. There are ways to create AI that can do better than chance and makes optimal decisions given limited information and uncertainty. 

### Probability
Uncertainty can be represented as a number of events and the likelihood of each of them happening. 

**Possible Worlds**
Every possible situation can be thought of as a world, represented by the lowercase Greek letter omega $\omega$. For example, rolling a die can result in six possible worlds - one for each possible results of rolling the die. To represent the probability of a certain world, we write $P(\omega)$. 

**Axioms in Probability**
- $0 < P(\omega) < 1$ every value representing probability must range between 0 and 1. 
	- 0 is an impossible event
	- 1 is an event that is certain to happen
	- In general, the higher the value, the more likely the event is to happen.
- [[The probabilities of every possible event when summed together are equal to 1]]

$$\sum_{\omega \in \Omega} P(\omega) = 1$$ 
Now lets roll two dice, giving us 36 possible events, all equally likely. But what if we try to predict the sum of the dice? Now there are only 11 possible values and they do not occur equally as often. 

![[2024-09-27 cs50 probability two die.jpg|666]]

To get the probability of an event, we divide the number of worlds in which it occurs by the number of total possible worlds. For example, there are 36 possible worlds when rolling two dice. Only in one of those worlds do we get a sum equal to 12. Thus, $P(12) = 1/36$. And $P(7) = 1/6$. 

**Unconditional Probability**
Unconditional probability is the degree of belief in a proposition in the absence of any other evidence. Meaning, the result of one event happening is not dependent on previous events. 

### Conditional Probability
Conditional probability is the degree of belief in a proposition given some evidence that has already been revealed. Conditional probability is expressed in the following notation: $P(a|b)$, meaning "the probability of $a$ given $b$". 

We use the following formula to calculate the conditional probability of $a$ given $b$:
$$P(a|B)=\frac{P(a \wedge b)}{P(b)}$$

An intuitive way to think about this is "we are interested in the events where both $a$ and $b$ are true but only from the worlds where we know $b$ to be true". The following are algebraically equivalent forms to the formula above:
$$P(a \wedge b) = P(b)*P(a|b)$$
$$P(a \wedge b) = P(a)*P(b|a)$$

For example, consider $P(sum=12 | roll \ six \ on \ one \ die)$, or the probability of rolling two dice and getting a sum of 12, given that we have already rolled one die and got a six. 

First, restrict the world of 36 die combinations to the ones where the value of the first die is six, giving us 6/36 or 1/6 of the rolls. 
![[2024-09-28 cs 50 conditional probability.jpg|666]]

Now we ask how many times does event $a$ (the sum being 12) occur in the worlds that we restricted the question to (dividing by $P(b)$, or the probability of the first die yielding 6). 
![[2024-09-28 cs 50 conditional probability 1.jpg|666]]

### Random Variables
A random variable is a variable in probability theory with a domain of possible values that it can take on. For example, to represent possible outcomes when rolling a die, we can define a random variable `Roll` that can take on the values `{0, 1, 2, 3, 4, 5, 6}`. To represent the status of a flight, we can define a variable `Flight` that takes on the values `{on time, delayed, canceled}`.

Often, we are interested in the probability with with each value occurs. We represent this using a probability distribution. For example, 
- $P(Flight = on \ time) = 0.6$
- $P(Flight = delayed) = 0.3$
- $P(Flight = cancelled) = 0.1$

[[The probabilities of every possible event when summed together are equal to 1]].

A probability distribution can be represented as a vector. For example, $P(Flight) = <0.6, 0.3, 0.1>$. For this notation to be interpretable, the values have to have a set order. In this case, is it "on time", "delayed", "cancelled". 

**Independence** - Independence is the knowledge that the occurrence of one event does not affect the probability of the other event. For example, when rolling two dice, the result of each die is independent from the other. Rolling a 4 with the first die does not influence the value of the second die that we roll. This is opposed to dependent events, like the presence of clouds and the chance of rain. 

Independence can be defined mathematically: events $a$ and $b$ are independent if and only if the probability of $a$ and $b$ is equal to the probability of $a$ times the probability of $b$: $P(a \wedge b) = P(a) \times P(b)$.
- [[Biconditional Elimination]]

### Bayes' Rule
Bayes' Rile is commonly used in probability theory to compute conditional probability. In words, Bayes' Rule states that the probability of $b$ given $a$ is equal to the probability of $a$ given $b$, times the probability of $b$, divided by the probability of $a$. 
$$P(b|a)=\frac{P(b) \times P(a|b)}{P(a)}$$
For example, we would like to computer the probability of it raining in the afternoon if there are clouds in the morning, or $P(rain\ |\ clouds)$. We start with the following information:
- 80% of rainy afternoons start with cloudy mornings, or $P(clouds\ |\ rain)$.
- 40% of days have cloudy mornings, or $P(clouds)$.
- 10% of days have rainy afternoons, or $P(rain)$.

Applying Bayes' Rule, we computer that the probability of rain in the afternoon given clouds, or $P(rain\ |\ clouds)$ is $\frac{0.1 \times 0.8}{0.4} = 0.2$. That is, the probability that it rains in the afternoon given that it was cloudy in the morning is 20%.

Knowing $P(a\ |\ b)$, $P(a)$, and $P(b)$ allows us to calculate $P(b\ |\ a)$. This is helpful because knowing the conditional probability of a visible effect given an unknown cause, $P(visible\ effect\ |\ unknown\ cause)$, allows use to calculate the probability of the unknown cause given the visible effect, $P(unknown\ cause\ |\ visible\ effect)$. 

For example, we can learn $P(medical\ test\ results\ |\ disease)$ through medical trials, where we test people with the disease and see how often the test picks up on that. Knowing this, we can calculate $P(disease\ |\ medical\ test\ results)$, which is valuable diagnostic information. 

### Joint Probability
Joint probability is the likelihood of multiple events all occurring. Let us consider the following example, concerning the probabilities of clouds in the morning and rain in the afternoon. 
- $cloud = 0.4$
- $\neg\ cloud = 0.6$
- $rain = 0.1$
- $\neg\ rain = 0.9$

Looking at that data, we cannot say whether clouds in the morning are related to the likelihood of rain in the afternoon. To be able to do so, we need to look at the joint probabilities of all the possible outcomes of the two variables. We can represent this in a table.

|              | $cloud$ | $\neg\ cloud$ |
| ------------ | ------- | ------------- |
| $rain$       | 0.08    | 0.02          |
| $\neg\ rain$ | 0.32    | 0.58          |
Now we are able to know information about the co-occurrence of the events. 

Using joint probabilities, we can deduce conditional probability. For example, if we are interested in the probability distribution of clouds in the morning given rain in the afternoon, $P(C\ |\ rain) = \frac{P(C,\ rain)}{P(rain)}$.
- Note that in probability theory, commas and $\wedge$ are used interchangeably.

It is possible to view $P(rain)$ as some constant by which $P(C,\ rain)$ is multiplied. Thus, we can rewrite $P(C,\ rain)\ /\ P(rain) = \alpha P(C,\ rain)$, or $\alpha <0.08, 0.02>$. 

Factoring out $\alpha$ leaves us with the proportions of the probabilities of the possible values of $C$ given that there is rain in the afternoon. Namely, if there is rain in the afternoon, the proportion of the probabilities of clouds in the morning and no clouds in the morning is $0.08\ :\ 0.02$/ Note that this doesn't add up to $1$; however, since this is the probability distribution for the random variable $C$, we know that they should sum of to $1$. Therefore, we need to normalize the values by computing $\alpha$ such that $\alpha 0.08 + \alpha 0.02 = 1$.  Finally, we can say that $P(C\ |\ rain) = <0.8,\ 0.2>$. 

### Probability Rules
- **[[Negation]]**: $P(\neg\ a) = 1- P(a)$. This stems from the fact that the sum of the probabilities of all the possible worlds is 1.  
- **[[Inclusion-Exclusion]]**: $P(a \vee b) = P(a) + P(b) - P(a \wedge b)$. This can be interpreted in the following way: the worlds in which $a$ or $b$ are true are equal to all the worlds where $a$ is true, plus the worlds where $b$ is true. However, in this case, some worlds are counted twice (the worlds where both $a$ and $b$ are true). To get rid of this overlap, we subtract once the worlds where both $a$ and $b$ are true (since they were counted twice). 
- **[[Marginalization]]**: $P(a) = P(a, b) + P(a, \neg\ b)$. The idea here is that $b$ and $\neg\ b$ are disjoint probabilities. That is, the probability of $b$ and $\neg\ b$ occurring at the same time is 0. We also know that $b$ and $\neg\ b$ sum up to 1. This, when $a$ happens, $b$ can either happen or not. When we take the probability of both $a$ and $b$ happening in addition to the probability of $a$ and $\neg\ b$, we end up with simply the probability of $a$. 

Marginalization can be expressed for random variables the following way:
$$P(X=x_i)=\sum_j P(X=x_i, Y=y_j)$$
The left side of the equation means "The probability of random variable $X$ having the value $x_i$". For example, for the variable $C$ we mentioned earlier, the two possible values are *clouds in the morning* and *no clouds in the morning*. The right part of the equation is the idea of marginalization. $P(X=x_i)$ is equal to the sum of all the joint probabilities of $x_i$ and every single value of the random variable $Y$. For example, $$P(C=cloud)=P(C=cloud, R=rain) + P(C=cloud, R= \neg\ rain)=0.08 + 0.32 = 0.40$$
- **Conditioning**: $P(a) = P(a\ |\ b) \times P(b) + P(a\ |\ \neg\ b) \times P(\neg\ b)$. This is a similar idea to marginalization. The probability of event $a$ occurring is equal to the probability of $a$ given $b$ times the probability of $b$, plus the probability of $a$ given $\neg\ b$ times the probability of $\neg\ b$. 
$$P(X=x_i)=\sum_j P(X=x_i\ |\ Y=y_j) \times P(Y=y_j)$$
In this formula, the random variable $X$ takes the value $x_i$ with probability that is equal to the sum of the probabilities of $x_i$ given each value of the random variable $Y$ multiplied by the probability of variable $Y$ taking that value. This makes sense if we remember that $P(a\ |\ b) = P(a, b)/P(b)$. If we multiply this expression by $P(b)$, we end up with $P(a, b)$, and from here we do the same as we did with marginalization. 

### Bayesian Networks
A [[Bayesian Network]] is a data structure that represents the dependencies among random variables. Bayesian networks have the following properties:
- They are directed graphs
- Each node on the graph represent a random variable
- An arrow from X to Y represents that X is a parent of Y. That is, the probability distribution of Y depends on the value of X. 
- Each node X has probability distribution $P(X\ |\ Parents(X))$.

Let's consider an example of a Bayesian network that involves variables that affect whether we get to our appoint on time. 

![[2024-10-12 cs 50 bayesian network example.jpg|333]]

Let's describe it from the top down.
- `Rain` is the root node in this network. This means that its probability distribution is not reliant on any prior event. In our example, `Rain` is a random variable that can take the values `{none, light, heavy}` with the following probability distribution:
	- `none = 0.7`
	- `light = 0.2`
	- `heavy = 0.1`
- `Maintenance`, in our example, encodes whether there is a train track maintenance, taking the values `{yes, no}`. `Rain` is a parent note of `Maintenance`, which means that the probability distribution of `Maintenance` is affected by `Rain`.

| `Rain`  | `Maintenance` | `P` |
| ------- | ------------- | --- |
| `none`  | `yes`         | 0.4 |
| `light` | `yes`         | 0.2 |
| `heavy` | `yes`         | 0.1 |
| `none`  | `no`          | 0.6 |
| `light` | `no`          | 0.8 |
| `heavy` | `no`          | 0.9 |

- `Train` is the variable the encodes whether the train is on time or delayed, taking the values `{on time, delayed}`. Note that `Train` has arrows pointing to it from both `Maintenance` and `Rain`. This means that both are parents of `Train` and their values affect the probability distribution of `Train`.

| `Rain`  | `Maintenance` | `Train`   | `P` |
| ------- | ------------- | --------- | --- |
| `none`  | `yes`         | `on time` | 0.8 |
| `none`  | `yes`         | `delayed` | 0.2 |
| `none`  | `no`          | `on time` | 0.9 |
| `none`  | `no`          | `delayed` | 0.1 |
| `light` | `yes`         | `on time` | 0.6 |
| `light` | `yes`         | `delayed` | 0.4 |
| `light` | `no`          | `on time` | 0.7 |
| `light` | `no`          | `delayed` | 0.3 |
| `heavy` | `yes`         | `on time` | 0.4 |
| `heavy` | `yes`         | `delayed` | 0.6 |
| `heavy` | `no`          | `on time` | 0.5 |
| `heavy` | `no`          | `delayed` | 0.5 |

`Appointment` is a random variable that represents whether we attend our appointment, taking the values `{attend, miss}`. Note that its only parent is `Train`. This point about Bayesian networks is noteworthy: parents include only direct relations. It is true that maintenance affects whether the `Train` ins on time, and whether the train is on time affects whether we attend the appointment. However, in the end, what directly affects our chances of attending the appointment is whether the train came on time, and this is what is represented in the Bayesian network. 

| `Train`   | `Appointment` | `P` |
| --------- | ------------- | --- |
| `on time` | `attend`      | 0.9 |
| `on time` | `miss`        | 0.1 |
| `delayed` | `attend`      | 0.6 |
| `delayed` | `miss`        | 0.4 |

For example, if we want to find the probability of missing the meeting when the train was delayed on a day with no maintenance and light rain, or $P(light, no, delayed, miss)$ we will computer the following:
$$P(light) \times P(no\ |\ light) \times P(delayed\ |\ light, no) \times P(miss\ |\ delayed)$$
The value of each of the individual probabilities can be found in the tables above, and then these values are multiplied to produce $P(light, no, delayed, miss)$.

[[Inference]] through [[Entailment]] meant that we could definitely conclude new information based on the information we already had. We can also infer new information based on probabilities. This does not allow us to know new information for certain, but it allows us to figure out the probability distributions for some values. 

Inference has multiple properties:
- Query **$X$**: the variable for which we want to compute the probability distribution.
- Evidence variables **$E$**: one or more variables that have been observed for event **$e$**. For example, we might have observed that there is light rain, and this observation helps us compute the probability that the train is delayed. 
- Hidden variables **$Y$**: variables that are not the query and also have not been observed. For example, standing at the train station, we can observe whether there is rain, but we can't know if there is maintenance on the track further down the road. Thus, maintenance would be a hidden variable in this situation. 
- The goal: calculate $P(X\ |\ e)$. For example, compute the probability distribution of the Train variable (the query) based on the evidence $e$ that we know there is light rain. 

For example, we want to compute the probability distribution of the `Appointment` variable given the evidence that there is light rain and no track maintenance. That is, we know that there is light rain and no track maintenance, and we want to figure out what are the probabilities that we attend the appointment and that we miss the appointment, $P(Appointment\ |\ light,\ no)$. 

From [[Joint Probability]] we know that we can express the possible values of the `Appointment` random variable as a proportion, rewriting $P(Appointment\ |\ light,\ no)$ as $\alpha P(Appointment,\ light,\ no)$. 

How do we calculate though if the probability distribution of `Appointment` if its parent is only the `Train` variable (as seen in [[2024-10-12 cs 50 bayesian network example.jpg]])? We use [[Marginalization]]. 
$$P(Appointment,\ light,\ no) = \alpha [P(Appointment,\ light,\ no,\ delayed)+P(Appointment,\ light,\ no,\ on\ time)]$$

**Inference by Enumeration**
Inference by enumeration is a process of finding the probability distribution of variable `X` given observed evidence `e` and some hidden variables `Y`. 
$$P(X\ |\ e) = \alpha P(X,\ e) = \alpha \sum_y P(X,\ e,\ y)$$
In this equation, $X$ is the query variable, $e$ is the observed evidence, $y$ is all the values of the hidden variables, and $\alpha$ normalizes the result such that we end up with probabilities that add up to 1. In words, it is saying that the probability distribution of $X$ given $e$ is equal to a normalized probability distribution of $X$ and $e$. To get to this distribution, we sum the normalized probability of $X$, $e$, and $y$, where $y$ takes each time a different value of the hidden variables $Y$. 

Multiple libraries exist in Python to ease the process of probabilistic inference. We take a look at the library *pomegranate* to see how the above data can be represented in code. 

First, we create the nodes and provide a probability distribution for each one. 
```python
from pomegranate import *

# Rain node has no parents
rain = Node(DiscreteDistribution({
	"none": 0.7,
	"light": 0.2, 
	"heavy": 0.1 
}), name = "rain")

# Track maintenance node is conditional on rain
maintenance = Node(ConditionalProbabilityTable([
	["none", "yes", 0.4],
	["none", "no", 0.6],
	["light", "yes", 0.2],
	["light", "no", 0.8],
	["heavy", "yes", 0.1],
	["heavy", "no", 0.9],
], [rain.distribution]), name="maintenance")

# Train node is conditional on rain and maintenance
train = Node(ConnditionalProbabilityTable([
	["none", "yes", "on time", 0.8],
	["none", "yes", "delayed", 0.2],
	["none", "no", "on time", 0.9],
	["none", "no", "delayed", 0.1],
	["light", "yes", "on time", 0.6],
	["light", "yes", "delayed", 0.4],
	["light", "no", "on time", 0.7],
	["light", "no", "delayed", 0.3],
	["heavy", "yes", "on time", 0.4],
	["heavy", "yes", "delayed", 0.6],
	["heavy", "no", "on time", 0.5],
	["heavy", "no", "delayed", 0.5],
], [rain.distribution, maintenance.distribution]), name="train")

# Appointment node is conditional on train
appointment = Node(ConditionalProbabilityTable([
	["on time", "attend", 0.9],
	["on time", "miss", 0.1],
	["delayed", "attend", 0.6],
	["delayed", "miss", 0.4],
], [train.distribution]), name="appointment")
```

Second, we create the model by adding all the nodes and then describing which node is the parent of which other node by adding edges between them (recall that a Bayesian Network is a directed graph, consisting of nodes with arrows between them).
```python
# Create a Bayesian Network and add states
model = BayesianNetwork()
model.add_states(rain, maintenance, train, appointment)

# Add edges connecting nodes
model.add_edge(rain, maintenance)
model.add_edge(rain, train)
model.add_edge(maintenance, train)
model.add_edge(train, appointment)

# Finalize model
model.bake()
```

Now to ask how probable a certain event is, we run the model with the values we are interested in. Here we ask what is the probability that there is no rain, no track maintenance, the train is on time, and we attend the meeting.
```python
# Calculate probability for a given observation
probability = model.probability([["none", "no", "on time", "attend"]])
print(probability)
```

In the following example, we know that the train was delayed. Given this information, we compute and print the probability distributions of the variables `Rain`, `Maintenance`, and `Appointment`.
```python
# Calculate predictions based on the evidence that the train was delayed
predictions = model.predict_proba({
	"train": "delayed"
})

# Print predictions for each node
for node, prediction in zip(model.states, predictions):
	if isinstance(prediction, str):
		print(f"{node.name}: {prediction}")
	else:
		print(f"{node.name}")
		for value, probability in prediction.parameters[0].items():
			print(f"    {value}: {probability:.4f}")
```

The code above used inference by enumeration. However, this is inefficient, especially when there are many variables in the model. A different approach is to abandon **exact inference** in favor of **approximate inference**. 

### Sampling
Sampling is one technique of approximate inference. In sampling, each variable is sampled for a value according to its probability distribution. 

One example of generating a distribution is rolling a six-sided die. If we roll it 600 times, this will generate an approximate distribution of the values. It is unlikely that we get exactly 1/6 probability for each value, but we should get something close to it. 

For our train example, we start by sampling the `Rain` variable. That will give us some value. We note that value down and then sample from the `Maintenance` variable. We continue sampling from each variable. We continue this many times and it will generate a probability distribution. From this probability distribution, we can ask questions (e.g., $P(Train = on\ time)$) and find the answer by counting the number of samples where the question is true divided by the total number of samples. This generates an approximate probability for that question. 

We can also answer questions that involve conditional probability, such as $P(Rain=light\ |\ Train = on\ time)$. In this case, we ignore all samples where the value of `Train` is not `on time`, and then proceed as before. We count how many samples have the variable `Rain = light` among those samples that have `Train = on time`, and then divide by the total number of samples where `Train = on time`. 

In code, a sampling function can look like:
```python
import pomegranante
from collections import Counter
from model import model # model is the Bayesian Network we made previously

def generate_sample():
	# Mapping of random variable name to sample generated
	sample = {}

	# Mapping of distribution to sample generated
	parents = {}

	# Loop over all states, assuming topological order
	for state in model.states:

		# If we have a non-root node, sample conditional on parents
		if isinstance(state.distribution, pomegranate.ConditionalProbabilityTable):
			sample[state.name] = state.distribution.sample(parent_values=parents)

		# Otherwise, just sample from the distribution alone
		else:
			sample[state.name] = state.distribution.sample()

		# Keep track of the sampled value in the parents mapping
		parents[state.distribution] = sample[state.name]

	# Return generated sample
	return sample
```

Now, to compute $P(Appointmanet\ |\ Train=delayed)$, which is the probability distribution of the `Appointment` variable given that the train is delayed, we do the following:
```python
# Rejection sampling
# Compute distribution of Appointment given that train is delayed
N = 10000
data = []

# Repeat sampling 10,000 times
for i in range(N):

	# Generate a sample based on the function that we defined earlier
	sample = generate_sample()

	# If, in this sample, the variable of Train has the value delayed, 
	# save the sample. Since we are interested in the probability 
	# distribution of Appointment given that the train is delayed, we 
	# discard the samples where the train was on time. 
	if sample["train"] == "delayed":
		data.append(sample["appointment"])

# Count how many times each value of the variable appeared. Later, we 
# can normalize by dividing the results by the total number of saved 
# samples to get the approximate probabilities of the vraibles that 
# add up to 1.
print(Counter(data))
```

**Likelihood Weighting**
In the sampling example above, we discarded the samples that did not match the evidence that we had. This is inefficient. One way to get around this is with likelihood weighting, using the following steps:
- Start by fixing the values for evidence variables.
- Sample the non-evidence variables using conditional probabilities in the Bayesian Network.
- Weight each sample by its **likelihood**: the probability of all the evidence occurring. 

For example, if we have the observation that the train was on time, we will start sampling as before. We sample a value of `Rain` given its probability distribution, then `Maintenance`, but when we get to `Train` - we always give it the observed values, in our case, `on time`. Then we proceed and sample `Appointment` based on its probability distribution given `Train = on time`. Now that this sample exists, we weight it by the conditional probability of the observed variable given its sampled parents. That is, if we sampled `Rain` and got `light`, and then we sampled `Maintenance` and got `yes`, then we will weight this sample by $P(Train = on\ time\ |\ light,\ yes)$.

### Markov Models
So far, we have looked at questions of probability given some information that we observed. In this kind of paradigm, the dimension of time if not represented in any way. However, many tasks do rely on the dimension of time, such as prediction. To represent the variable of time we will create a new variable, $X$, and change it based on the event of interest, such that $X_t$ is the current event, $X_{t+1}$ is the next event, and so on. To be able to predict events in the future, we will use Markov Models. 

#### The Markov Assumption
The Markov Assumption is an assumption that the current sate depends on only a finite fixed number of previous states. This is important. Think of the task of predicting the weather. In theory, we could use all the data from the past year to predict tomorrow's weather. However, it is infeasible, both because of the computational power this would require and because there is probably no information about the conditional probability of tomorrow's weather based on the weather 365 days ago. Using the Markov Assumption, we restrict our previous states (e.g., how many previous days we are going to consider when predicting tomorrow's weather), thereby making the task manageable. This means that we might get a more rough approximation of the probabilities of interest, but this is often good enough for our needs. Moreover, we can use a Markov Model based on the information of the one last event (e.g., predicting tomorrow's weather based on today's weather). 

#### Markov Chain
A Markov Chain is a sequence of random variables where the distribution of each variable follows the Markov Assumption. That is, each event in the chain occurs based on the probability of the event before it. 

To start constructing a Markov Chain, we need a **transition model** that will specify the probability distributions of the next event based on the possible values of the current event. 
![[2024-10-29 cs50 ai markov chain.jpg|600]]

Using this transition model, it is possible to sample a Markov Chain. Start with a day being either rainy or sunny, and then sample the next day based on the probability of it being sunny or rainy given the weather today. Then, condition the probability of the day after tomorrow based on tomorrow, and so on, resulting in a Markov Chain.

Given this chain, we can now answer questions such as "what is the probability of having four rainy days in a row?" Here is an example of how a Markov Chain can be implemented in code:
```python
from pomegranate import *

# Define starting probabilities
start = DiscreteDistribution({
	"sun": 0.5,
	"rain": 0.5
})

# Define transition model
transitions = ConditionalProbabilityTable([
	["sun", "sun", 0.8],
	["sun", "rain", 0.2],
	["rain", "sun", 0.3],
	["rain", "rain", 0.7],
], [start])

# Create Markov Chain
model = MarkovChain([start, transition])

# Sample 50 states form chain
print(model.sample(50))
```

### Hidden Markov Models
A Hidden Markov Model is a type of Markov Model for a system with hidden states that generate some observed event. This means that sometimes, the AI has some measurement  of the world but no access to the precise state of the world. In these cases, the state of the world is called the **hidden state** and whatever data the AI has access to are the **observations**. Here are a few examples:
- For a robot exploring uncharted territory, the hidden state is its position, and the observation is the data recorded by the robot's sensors. 
- In speech recognition, the hidden state is the words that were spoken, and the observation is the audio waveforms. 
- When measuring user engagement on websites, the hidden state is how engaged the user is, and the observation is the website or app analytics. 

For our weather example, our AI wants to infer the weather (the hidden state) but it only has access to an indoor camera that records how many people brought umbrellas with them. This is the **sensor model** (also called the **emission model**) that represent these probabilities.
![[2024-10-30 cs50 AI weather sensor model.jpg|600]]

#### Sensor Markov Assumption
This is the assumption that the evidence variable depends only on the corresponding state. Our models, for example, we assume that whether people bring umbrellas to the office depends only on the weather. This is not necessarily reflective of the complete truth, because some people may take an umbrella with them everywhere they go. However, the Sensor Markov Assumption ignores these data, assuming that only the hidden states affects the observation. 

A Hidden Markov Model can be represented in a Markov Chain with two layers. The top later, `X`, stands for the hidden state. The bottom layer, `E`, stands for the evidence, the observations we have. 
![[2024-10-30 cs50 AI hidden markov.jpg|600]]

Based on hidden Markov models, multiple tasks can be achieved:
- Filtering - given observations from start until now, calculate the probability distribution for the current state. For example, given information on when people bring umbrellas from the start of time until today, we generate a probability distribution for whether it is raining today or not. 
- Prediction - given observations from start until now, calculate the probability distribution for a future state. 
- Smoothing - given observations from start until now, calculate the probability distribution for a past state. For example, calculating the probability of rain yesterday given that people brought umbrellas today.
- Most likely explanation - given observations from start until now, calculate most likely sequence of events. 

This is a Python implementation of a hidden Markov model that we will use for a most likely explanation task:
```python
from pomegranate import *

# Observation model for each state
sun = DiscreteDistribution({
	"umbrella": 0.2,
	"no umbrella": 0.8
})

rain = DiscreteDistribution({
	"umbreall": 0.9,
	"no umbrella": 0.1
})

states = [sun, rain]

# Transition Model
transitions = numpy.array(
	[[0.8, 0.2], # Tomorrow's predictions if today == sun
	 [0.3, 0.7]] # Tomorrow's predictions if today == rain
)

# Starting probabilities
starts = numpy.array([0.5, 0.5])

# Create the model
model = HiddenMarkovModel.from_matrix(
	transitions, states, starts,
	state_name=["sun", "rain"]
)
model.bake()
```

Note that our model has both the sensor model and the transition model. We need both for the hidden Markov model. The following code snippet defines a sequence of observations which is run through the model. It will generate and print the most likely explanation (the weather sequence that most likely brought to this patter of observations).
```python
from model import model

# Observed data
observations = [
	"umbrella",
	"umbrella",
	"no umbrella",
	"umbrella",
	"umbrella",
	"umbrella",
	"umbrella",
	"no umbrella",
	"no umbrella",
]

# Predict underlying states
predictions = model.predict(observations)
for prediction in predictions:
	print(model.states[prediction].name)
```

## Optimization
Optimization is choosing the best option from a set of possible options. 
### Local Search
Local Search is a search algorithm that maintains a single node and searches by moving to a neighboring node. This is different than other algorithms we have seen at this point. In maze solving for example, we wanted to find the quickest way to the goal. Local Search is interested in finding the best answer to a question. 

Often, local search will bring an answer that is not optimal but "good enough", conserving computational power. Consider the following example.

We have four houses in set locations. We want to build two hospitals, such that we minimize the distance from each house to a hospital. This can be visualized as:
![[2024-10-30 cs50 AI local search.jpg|600]]

The figure shows a possible configuration of houses and hospitals. The distance between them is called the Manhattan Distance. The sum of the distances from each house to the nearest hospital is 17 units. This is the **cost**, because we are trying to minimize the distance. A **state** is any one configuration. 

A few important terms:
- An **Objective Function** is a function that we use to maximize the value of the solution. 
- A **Cost Function** is a function that we use to minimize the cost of the solution (this is the function that we would use in our example with houses and hospitals). We want to minimize the distance from houses to hospitals. 
- A **Current State** is the state that is currently being considered by the function. 
- A **Neighbor State** is a state that the current state can transition to. 

Note that the way local search algorithms work is by considering one node in a current state, and then moving the node to one of the current state's neighbors. This is unlike the [[Minimax Algorithm]] where every single state in the state space is considered recursively. 

### Hill Climbing
Hill Climbing is one type of [[Local Search Algorithms]]. In this algorithms, the neighbor states are compared to the current state, and if any of them is better, we change the current node from the current state to that neighbor state. What qualifies as better is defined by whether we use an objective function, preferring a higher value, or a decreasing function, preferring a lower value. 

In pseudocode…

function Hill-Climbing(`problem`):
- `current` = initial state of `problem`
- repeat:
	- `neighbor` = best valued neighbor of `current`
	- if `neighbor` not better than `current`:
		- return `current`
	- `current` = `neighbor`

Hill Climbing algorithms find the local minimum/maximum. 

#### Local and Global Minima and Maxima
A local maximum/minimum is a state that has a higher/lower value than its neighboring states, but is not necessarily the global maximum/minimum. 

Hill Climbing algorithms find the local maximum/minimum because it only moves to "better" states. 

#### Hill Climbing Variants
All the variations have in common that, no matter their strategy, each one still has the potential of ending up in local minima and maxima and no means to continue optimizing. The algorithms below are phrased such that a higher value is better, but they also apply to cost functions, where the goal is to minimize cost.
- [[Steepest-Ascent Algorithm]] - choose the highest-values neighbor. 
- [[Stochastic Hill Climbing Algorithm]] - choose randomly from higher-valued neighbors. 
- [[First-Choice Hill Climbing Algorithm]] - choose the first higher-valued neighbor.
- [[Random-Restart Hill Climbing Algorithm]] - conduct hill climbing multiple times. Each time, start from a random state. Compare the maxima from every trial, and choose the highest amongst those. 
- [[Local Beam Search Hill Climbing Algorithm]] - chooses the `k` highest-valued neighbors. This is unlike most local search algorithms in that it uses multiple nodes for the search, and not just one. 

Although Local Search Algorithms don't always give the best possible solution, they can often give a good enough solution in situations where considering every possible state is computationally infeasible. 

### Simulated Annealing
Simulated Annealing allows the [[Hill-Climbing Algorithms]] to "dislodge" itself if it gets stuck in a local maximum. 

[[Annealing]] is the process of heating metal and allowing it to cool slowly, which serves to toughen the metal. This is used as a metaphor for the simulated annealing algorithm, which starts with a high temperature, being more likely to make random decisions, and, and the temperature decreases, it becomes less likely to make random decisions, becoming more "firm". This is the pseudocode:

function Simulated-Annealing(`problem`, `max`):
- `current` = initial state of `problem`
- for `t` = 1 to `max`:
	- `T` = Temperature(`t`)
	- `neighbor` = random neighbor of `current`
	- `delta_E` = how much better `neighbor` is than `current`
	- if `delta_E` > 0:
		- `current` = `neighbor`
	- with probability `e^(delta_e / T)` set `current` = `neighbor`
- return `current`

The algorithm takes as input a `problem` and `max`, the number of times it should repeat itself. For each iteration, `T` is set using a Temperature function. This function returns a higher value in the early iterations (when `t` is low) and a lower value in later iterations (when `t` is high). 

Then, a random neighbor is selection, and `delta_E` is computer such that it quantifies how much better the neighbor state is than the current state. If the neighbor state is better than the current state (`delta_E` > 0), as before, we set our current state to be the neighbor state. 

However, when the neighbor state is worse (`delta_e` < 0), we still might set our current state to be that neighbor state, and we do so with probability `e^(delta_e / T)`. The idea here is that a more negative `delta_E` will result in lower probability of the neighbor state being chosen, and the higher temperature `T` the higher the probability that the neighbor state will be chosen. 

This means that the worse the neighbor state, the less likely it is to be chosen, and the earlier algorithm is in its process, the more likely it is to set a worse neighbor state as a current state. 

#### Traveling Salesman Problem
In the Traveling Salesman Problem, the task is to connect all points while choosing the shortest possible distance. This is, for example, what delivery companies need to do: find the shortest route from the store to all the customers' houses and back. In this case, a neighbor state might be seen as a state where two arrows swap places. Calculating every possible combination makes this computationally demanding (10 points is 10!). By using simulated annealing, a good solution can be found for a lower computational cost. 

### Linear Programming
Linear Programming is a family of problems that optimize a linear equation. Linear Programming will have the following components:
- A cost function that we want to minimize: $c_1 x_1 + c_2 x_2 + \dots + c_n x_n$. Here, each $x$ is a variable and it is associated with some cost $c$. 
- A constraint that's represented as a sum of variables that is either less than or equal to a value ($a_1 x_1 + a_2 x_2 + \dots a_n x_n \leq b$) or precisely equal to this value ($a_1 x_1 + a_2 x_2 + \dots a_n x_n = b$). In this case, $x$ is a variable and $a$ is some resource associated with it, and $b$ is how much resources we can dedicate to this problem. 
- Individual bounds on variables (for example, that a variable cannot be negative) of the form $l_i \leq x_i \leq u_i$.

Consider the following example:
- Two machines, $X_1$ that cost $50 per hour to run and $X_2$ that costs $80 per hour to run. The goal is to minimize cost. This can be formalized as a cost function: $50x_1 + 80x_2$. 
- $X_1$ requires 5 units of labor per hour. $X_2$ requires 2 units of labor per hours, and there is a total of 20 units of labor to spend. This can be formalized as a constraint: $5x_1 + 2x_2 \leq 20$.
- $X_1$ produces 10 units of output per hour. $X_2$ produces 12 units of output per hour. Company needs 90 units of output. This is another constraint. It could be rewritten as $10x_1 + 12x_2 \geq 90$. However, constraints need to be of the form $a_1 x_1 + a_2 x_2 + \dots a_n x_n \leq b$ or $a_1 x_1 + a_2 x_2 + \dots a_n x_n = b$. Therefore, we multiply by $-1$ to get an equivalent equation of the desired form: $-10x_1 - 12x_2 \leq 90$.

An optimizing algorithm for linear programming requires background knowledge in geometry and linear algebra that we don't want to assume. Instead, we can use algorithms that already exist, such as [[Simplex]] and [[Interior-Point]].

The following is a linear programming example that uses the scipy library in Python.
```python
import scipy.optimize

# Objective Function 50x_1 + 80x_2
# Constraint 1: 5x_1 + 2x_2 <= 20
# Constraint 2: -10x_1 + -12x_2 <= 90

result = scipy.optimize.linprog(
	[50,80], # Cost function: 50x_1 + 80x_2
	A_ub = [[5, 2], [-10, -12]], # Coefficients for inequalities
	b_ub = [20, -90], # Constraints for inequalities: 20 and -90
)

if result.success:
	print(f"X1: {round(result.x[0], 2)} hours")
	print(f"X2: {round(result.x[1], 2)} hours")
else:
	print("No solution")
```

### Constraint Satisfaction
Constraint Satisfaction problems are a class of problems where variables need to be assigned values while satisfying some conditions. 

Constraint Satisfaction problems have the following properties:
- Set of variables ($x_1, x_2, \dots x_n$).
- Set of domains for each variable {$D_1, D_2, \dots , D_n$}.
- Set of constraints $C$. 

Sudoku can be represented as a constraint satisfaction problem, where each empty square is a variable, the domain is the numbers 1-9, and the constraints are the squares that can't be equal to each other. 

Another example, consider students 1-4 is taking three courses from A, B, …, G. Each course needs to have an exam, and the possible days for exams are Monday, Tuesday, and Wednesday. However, the same student cannot have two exams on the same day. In this case, the variables are the courses, the domain is the days, and the constraints are which courses cannot be scheduled to have an exam on the same day because the same student is taking them. This can be visualized as follows:
![[2024-11-02 cs50 ai constraint satisfaction.jpg|600]]

This problem can be solved using constraints that are represented as a graph. Each node on the graph is a course, and an edge is drawn between two courses if they cannot be scheduled on the same day. 
![[2024-11-02 cs50 ai constraint satisfaction 1.jpg|600]]

A few more terms worth knowing:
- A **Hard Constraint** is a constraint that must be satisfied in a correct solution. 
- A **Soft Constraint** is a constraint the expresses which solution is preferred over others. 
- A **Unary Constraint** is a constraint that involves only one variable. 
- A **Binary Constraint** is a constraint the involves two variables. 

### Node Consistency
### Arc Consistency
### Backtracking Search

## Machine Learning
### Supervised Learning
### Nearest-Neighbor Classification
### Perception Learning
### Support Vector Machines
### Regression
### Loss Functions
### Overfitting
### Regularization
### scikit-learn
### Reinforcement Learning
### Markov Decision Processes
### Q-Learning
### Unsupervised Learning
### k-means Clustering

## Neural Networks
### Activation Functions
### Neural Network Structure
### Gradient Descent
### Multilayer Neural Networks
### Backpropagation
### Overfitting
### TensorFlow
### Computer Vision
### Image Convolution
### Convolutional Neural Networks
### Recurrent Neural Networks

## Language
### Syntax and Semantics
### Context-Free Grammar
### nltk
### n-grams
### Tokenization
### Markov Models
### Bag-of-Words Model
### Naive Bayes
### Work Representation
### word2vec
### Neural Networks
### Attention
### Transformers
