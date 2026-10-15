---
title: My CS50P Final Project
description: >-
  I have built a cool project on NBA using Python. It's all about MVPs and
  visualising the statistical trends in the NBA for the last 10 seasons.
date: 2023-08-26T00:00:00.000Z
tags:
  - cs50
  - Python
  - Matplotlib
  - numpy
  - projects
coverImage: /images/blog/my-cs50p-final-project/cover.jpeg
coverAlt: My CS50P Final Project cover image
seoTitle: I Joined NBA And Python Together
seoDescription: >-
  I have built a cool project on NBA using Python. It's all about MVPs and
  visualising the statistical trends in the NBA for the last 10 seasons.
readTimeInMinutes: 10
coverPhotographer: Tamarcus Brown
coverAttribution: 'https://unsplash.com/@tamarcusbrown'
---

You decide the problem statement. You decide the theme. You decide the track. It's all about you for the final project. This is the one time in the course where they let you run wild and build anything you want, under some very basic rules.

This blog is all about my Final Project: [**Terminal-Based-NBA-Game**](https://www.youtube.com/watch?v=pXmzOgjLVjg&t=2s)

## Ideation

I've been a basketball player and an NBA nerd for 6 years now. And now that I know how to code in Python, it's time that I did something for the nerd in me.

For context: NBA fans LOVE TO COMPARE players. It's like our side job but without pay. Given the statistics of any two players, we love to compare and declare who's better.

This is where I came up with the idea for the first part of my project: **Guess The MVP (Most Valuable Player)**.

To increase the complexity of this project, I planned to use Matplotlib and Numpy to plot graphs and visualise different NBA trends for the past 10 seasons.

And this is how I came up with the final idea for my project

## Collecting Data

I chose [ESPN](https://www.espn.com/nba/seasonleaders) to extract the statistics. Here's a look at what the data looks like:

![screenshot of season leader stats of 2022-23 season](/images/blog/my-cs50p-final-project/image-01.png)

These are the relevant statistics of the top 10 performing players, i.e., the season leaders of the most recent 2022-23 season. These stats include the following parameters:

* RK (Rank, according to ESPN)
    
* GP (Games Played, out of 82 total)
    
* MPG (Minutes Per Game)
    
* FG% (Field Goal Percentage, i.e., percentage of shots made out of shots attempted)
    
* FT% (Free Throw Percentage)
    
* 3PM (3 Pointer Made per game)
    
* RPG (Rebounds Per Game)
    
* APG (Assists Per Game)
    
* STPG (Steals Per Game)
    
* BLKPG (Blocks Per Game)
    
* TOPG (Turnovers Per Game)
    
* PTS (Points Per Game)
    
* ESPN (The ESPN overall score for the player)
    

As far as I could think, there were three ways to extract this data:

1. Web Scraping
    
2. Find ESPN API
    
3. Copy-Paste this data to Excel
    

And, the shortest and easiest way to get things done, was to use the 3rd method. So one by one, for 10 seasons, I copied and pasted this data in different Excel files and saved them as CSV.

To keep my project size compact, I decided to take the data from 10 recent seasons, that is, from 2013-2023. Here's how the 2022-23.csv file looked:

![A screenshot of the copied data on an Excel FIle](/images/blog/my-cs50p-final-project/image-02.png)

## Cleaning Data

At this point, I had 10 CSV files, named according to their respective seasons (e.g.: 2022-23.csv). Now, I had to clean the data.

I wanted to remove the "RK" and the "ESPN" columns from all of my CSV files. I did not want these two parameters to show as statistics to my users. The "ESPN" column had to be removed since I devised a formula to calculate the MVP score for a player based on the above statistics (about this in the upcoming section).

Again, I had two ways of doing it:

1. Manually delete both columns from each file
    
2. Automate this process using Python
    

To skip all the hard work, I wrote a simple Python script in a separate file that removes any number of columns that I wanted to remove from a given CSV file.

I started with the basics, using the CSV library.

```python
import csv
```

I wrote a function that loaded all the data from the CSV file into a list of dictionaries and rewrote the file with the data I wanted to show.

```python
def delete_column(filename, *args):
    #read preferred data into a list
    with open(filename) as f:
        reader = csv.DictReader(f)
        data = [] #list of dictionaries as individual rows
        for row in reader:
            data.append({k: v for k, v in row.items() if k not in args})
    #rewrite the csv file with preferred data
    with open(filename, "w") as f:
        writer = csv.DictWriter(f, fieldnames= list(data[0].keys()))
        writer.writeheader()
        for row in data:
            writer.writerow(row)
```

Now, I removed the data of both columns by calling the ***delete\_column*** function.

```python
if __name__ == "__main__":
    delete_column("2022-23.csv","ESPN","\ufeffRK")
```

## Guess The MVP

The first part of my project is GUESS THE MVP. This is where you'll be displayed the list of 10 seasons as below, and you have to choose which season's MVP you want to take a guess.

![](/images/blog/my-cs50p-final-project/image-03.png)

I have a pre-prepared seasons list, and an actual MVP dictionary as below:

```python
seasons = [
    "2013-14",
    "2014-15",
    "2015-16",
    "2016-17",
    "2017-18",
    "2018-19",
    "2019-20",
    "2020-21",
    "2021-22",
    "2022-23",
]
actual_mvp = {
    "2022-23": "Joel Embiid",
    "2021-22": "Nikola Jokic",
    "2020-21": "Nikola Jokic",
    "2019-20": "Giannis Antetokounmpo",
    "2018-19": "Giannis Antetokounmpo",
    "2017-18": "James Harden",
    "2016-17": "Russell Westbrook",
    "2015-16": "Stephen Curry",
    "2014-15": "Stephen Curry",
    "2013-14": "Kevin Durant",
}
```

After having entered the season of choice, a table of all the statistics of the season leaders of the players gets printed. I made the table using the *tabulate* library in Python.

You may print a table using ***tabulate*** like the following example:

```python
import tabulate from tabulate

headers = ["Student", "House"]
table_rows = [
    ["Harry Potter", "Gryffindor"], 
    ["Draco Malfoy","Slytherin"], 
    ["Ron Weasley","Gryffindor"]
    ]
print(tabulate(table_rows, headers, tablefmt = "heacy_grid")
```

Here's how the stats table looked after printing it (this is for the 2022-23 season):

![](/images/blog/my-cs50p-final-project/image-04.png)

Now, looking at the statistics of the season leaders, you have to intelligently guess the MVP for that season. You get 3 attempts to do that successfully.

### The Concept of Statistical MVP

For a player to be crowned the MVP of a season, apart from the pure statistics, the player's narrative in the media and his team's performance matters a lot. Since quantifying something like the media narrative of a player is quite tough, I limited the MVP decision purely to these stats.

Hence, we now have two types of MVPs

1. Actual MVP
    
2. Statistical MVP
    

These two can be the same person for a season, it all depends on the narrative and team performance. For instance, a player with slightly bad stats but a good media narrative and a winning team can win the MVP award over a statistically better player.

Here's to put things into perspective: This is the output when you enter Joel Embiid as the MVP of the 2022-23 season.

![](/images/blog/my-cs50p-final-project/image-05.png)

Notice how according to the program, Jayson Tatum should've won it. And that's because he must have had the highest statistical score, calculated in the next section.

### Calculating the MVP Score

I implemented a ***calc\_score*** function that looked like this.

```python
def calc_score(PPG, GP, RPG, APG, SPG, BPG, _3PM, FG, FT, MPG, TOV):
    return (
        (0.5 * PPG)
        + (0.5 * GP)
        + (0.2 * RPG)
        + (0.15 * APG)
        + (0.1 * SPG)
        + (0.05 * BPG)
        + (0.05 * _3PM)
        + (0.04 * (FG / 100))
        + (0.04 * (FT / 100))
        + (0.03 * (MPG / 48))
        - (0.02 * TOV)
    )
```

This function took the previously discussed statistics, multiplied them with a multiplying factor as per the priority, and added them. Except for the TOV parameter, it has to be subtracted from a player's score since Turnovers aren't appreciated and are bad for the team.

In the above code, I've arranged the priority of each parameter with the highest priority being on the top, and the lowest being on the bottom. I won't dive deep into why the priority order is like that, so you may assume that this is the right priority order.

## Visualise NBA Trends

These are the two trends that I plot using Matplotlib.

### Line Graph

![](/images/blog/my-cs50p-final-project/image-06.png)

This is a simple line graph plotting the statistical score of the actual MVP of each season.

You need to install Matplotlib on your device if you haven't used it before.

```python
#type on the terminal
pip install matplotlib
```

Import Matplotlib as:

```python
import matplotlib.pyplot as plt
```

I made a dictionary called ***mvp\_scores*** of key-value pairs as: {season: Statistical Score of MVP}. Then I plotted the graph using the following statement.

```python
plt.plot(list(mvp_scores.keys()), list(mvp_scores.values()), c="r", lw=3)
```

Finally, I labelled the X and Y axes and gave the title of the graph using the following statements.

```python
plt.xlabel("Seasons")
plt.ylabel("MVP Scores")
plt.title("Highest Statistical Scores per season.")
```

If you're working on Jupyter Notebook, doing this much would automatically show the graph plotted after running the code. However, while working in IDEs like VSCode, you need to manually show the graph using:

```python
plt.show()
```

From this graph, we get the trend as:

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text">As the seasons have progressed, the individual statistical scores of MVPs have dipped. Instead, the narrative around the player and the team performance has started mattering more to decide the MVP of the season.</div>
</div>

### Bar Graph

![](/images/blog/my-cs50p-final-project/image-07.png)

This is a grouped bar graph. This plots the points averages along with the number of games played by the MVP (out of a total of 82) in their respective MVP seasons.

You may need to refer to the [Matplotlib Documentation](https://matplotlib.org/stable/tutorials/introductory/quick_start.html) to learn how to produce a grouped bar chart. Here's how I did it.

Import Matplotlib

```python
import matplotlib.pyplot as plt
```

Store the values of the X and Y axes individually.

```python
ppg = []  # stores Points Per Game of last 10 MVPs
gp = []  # stores Number of Games Played of last 10 MVPs
x = np.arange(len(seasons)) #seasons is the list of all seasons mentioned above
```

Plot the Bar Chart

```python
fig, ax = plt.subplots()
rect1 = ax.bar(x - width / 2, ppg, width, label="PPG (Points Per Game)")
rect2 = ax.bar(x + width / 2, gp, width, label="GP (Games Played)")
```

Print values over individual bars

```python
for bar in ax.patches:
    value = bar.get_height()
    text = f"{value}"
    text_x = bar.get_x() + bar.get_width() / 2
    text_y = bar.get_y() + value
    ax.text(text_x, text_y, text, ha="center", color="r", size=12)
```

Adding Axes Labels and Tick Labels

```python
ax.set_ylabel("PTS averages and GP numbers")
ax.set_xlabel("Seasons")
ax.set_xticks(x)
ax.set_xticklabels(seasons)
ax.legend() #shows legend as "label" value that we set while plotting the graph
```

Set the title of the graph and show it

```python
plt.title("PPG and GP of last 10 MVPs")
plt.show()
```

Having plotted the graph, the trend for this graph comes out to be:

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text">For the past 10 seasons, the MVP has played less number of games with every passing season. To compensate for less games played, the MVP scores more Points Per Game for that season. This further shows that media narrative and team performance matter a lot.</div>
</div>

## Unit Test

When you're working with a lot of functions, it's good to create Unit Tests in a separate file for those functions, to test whether the function is working how you want it to.

There are numerous Python libraries to perform unit tests. I used Pytest. There's no specific reason why, except that this was taught in the course.

You may import the library first since it's not under the default modules that come with Python.

```python
import pytest
```

Here's an example of a unit test on the ***calc\_score*** function.

```python
def test_calc_score():
    assert (
        calc_score(31.6, 81, 10.7, 10.4, 1.6, 0.4, 2.5, 0.425, 0.845, 34.6, 5.4)
        == 60.219133
    )
```

You shall test all your unit tests at once with the following statement.

**pytest filename.py**

Here's the output of the above statement for my unit tests file.

![](/images/blog/my-cs50p-final-project/image-08.png)

The assert keyword does the same thing as it does in the real world: assert a fact. Here, we assert the return value of a function for the given parameters to a value that we want it to return.

If the function doesn't return this value for the given parameters in the code, it returns false.

## Conclusion

While conceiving this idea, I wanted to implement Machine Learning into it, where I fed the same statistics and results to the model and it would predict future MVPs based on that.

Moreover, here are some things that I wanted to implement but couldn't wrap my mind around:

1. Make a Player class and all the individual players as objects of that class
    
2. Use APIs and JSON files in this project.
    

I feel this project still has some potential after applying Machine Learning to it. Till then, I felt that this was enough complexity for the final project submission of an introductory course in Python.

I hope this blog provided you with key insights into my project. Feel free to ask any questions that you may have below!
