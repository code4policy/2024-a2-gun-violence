Context and learning goals

One of the group's learning goals was to practice text analysis on a variety of sources to analyze discourse. 

Four sources were selected: 
	• NYT
	• Fox News
	• A conversation on gun rights on Reddit immediately after the Jan 4th shooting
	• A conversation on X in response to a tweet by the Governor of Iowa. 

A few words on source selection: 
	• We were interested in subjective expressions to capture voter sentiment at a more granular level
	• We picked 2 news outlets of different political leaning and two online forums (Reddit and X)
	• On Reddit and X, the conversations we chose to highlight were mostly pro-gun rights; they are valuable because they help capture the breadth of reasons behind such opinions and how they are phrased in the direct aftermath of a shooting. 

The ultimate goal of text analysis was to identify patterns in the comments and to cluster comments:
	• Based on sentiment (moderate, strong, extreme)
	• Based on feelings (what mood is the author in)
	• Based on the opinions that are expressed
	• Based on how they interpret the nature of the problem, or the solutions they proposed
	• Based on their connection to the event - whether they are directly connected to the people or the place or not. 

We made several attempts to cooperate with ChatGPT to generate these insights. In terms of methodology, we realized that it could do several things: 
	• Sentiment analysis 
	• Mood
	• Topic modelling (the clustering), using natural language processing techniques including context analysis

However, we ran into potentially two separate issues: 
	• One: ChatGPT was applying simple keyword searches to do the clustering instead of semantic analysis, therefore the results it provided were often far off the mark
	• Two: ChatGPT probably sensed that this was a sensitive, highly controversial and political topic, and would sometimes fail to provide any answer without acknowleding what it was doing. 

Methodology

Therefore, we opted for a manual clustering technique which Louis learned at work, using keywords to initiate the process and building a list of independent topics that cover most of the opinions. The file "compiled_comments-v2" reflects this analysis. 

The approach can be broken down into simple steps.
	• Concatenate all comments from all sources
	• Sort comments by source, from longest to shortest (the reason is that short comments will tend to make it easier to see patterns in terms of topics, and long comments will provide more depth to understand the underlying reasoning for a given topic or opinion - so it's useful to look at both and to separate them)
	• Read through a series of short comments (around 50) and identify recurring themes
	• Capture the themes by a short phrase which summarizes the idea, feeling or opinion
	• Next to each comment, type the topic that it is connected to
	• Then, for each of the topics that emerges, create a column that will search in all comments, using certain keywords, comments that are similar
	• Use a formula with several "isnumber" and "if" piped together, to show a "1" if a given comment contains one of several keywords for a given topic
	• Use the columns and keywords to cluster more comments into topics
	• While reading, identify new topics and new keywords to make the search more powerful
	• Refine topics and keywords while allocating
	• Keep an "Other" category when comments are not connected to an existing topic, or irrelevant
	• Regularly visit the Other category to identify outlier topics that can emerge
	• Stop when no new topics emerge and when most of the comments have been covered (around 80% is often good enough).

In the process, we used another column to flag "selected comments" that are representative of a topic, or particularly interesting/ engaging. 

This analysis provides several outputs:
	• A list of topics
	• A recurrence analysis, which identifies, for each source, the frequency of each topic (in percent)
	• A list of selected quotes, for each topic. 

Here, ChatGPT was put to work again, to help select at random some comments to ensure that for each source and for each topic, at least 2 comments were flagged, to be displayed on the website. 


On scraping: 
Another learning goal was to experiment with scraping. 
We successfully downloaded the comments from the NYT using scraping methods on their website (based on what Dhrumil showed us in office hour). 

For other news sources, we went with a more manual approach, since:
	• Scraping did not work on Fox News website, which uses javascript to load comments that are not stored in the page
	• There were authorization issues on X
	• We didn't atempt to scrape Reddit. 

The manual approach was to consider that only the content of the comments was really useful. Here are the steps to manually extract comments:
	• Do a simple copy-paste of a list of comments (the full list for Reddit and NYT, a selection for X and Fox News) 
	• Copy-paste into Excel: the data is displayed in a single row
	• Use len() function to calculate the length of strings
	• Sort from longest to shortest, and remove the shortest cells (typically, metadata and usernames). 

Data visualization

Based on this source, we wanted to capture two things:
	• What is the discourse on each of the sources (put simply, what is the occurrence of each topic)
	• What are a few examples of comments highlighting each topic? 

In an MVP spirit, instead of having a full workflow from scraping to cleaning up to generating a single .csv file which would then be displayed on the website, we prioritized writing the front-end code. 
Hence, the "data preparation and analysis" part was taken offline, and only the outputs of the analysis that we wanted to display were put into separate .csv files. 

Visualization #1: histogram
By data source, how are comments spread across various themes (excluding "other" category)? 
We made a d3 visualization using ChatGPT. https://chat.openai.com/c/d8e9839a-b5eb-4d9a-b08f-dbafb6f23a33

Visualization #2: selected quotes
After attempting to write code to filter through the full table to display only a few selected comments, we simplified and started from a table that has only the pre-selected comments, with the topic they represent. 

We also attempted to first do a drop-down menu, then show the table, but prompting ChatGPT to do so went nowhere. 
Instead, asking ChatGPT: 
	• First, to display the whole table
	• Then, to filter, using a drop-down menu on topics
	• Then, to remove the topics on the table and format it better,
Was more successful. 
