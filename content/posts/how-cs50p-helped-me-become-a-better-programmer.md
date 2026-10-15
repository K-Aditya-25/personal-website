---
title: How CS50P Helped Me Become A Better Programmer
description: >-
  In this blog, I'm gonna let you know all that I learnt from the course itself
  and leave it to you to decide whether the course is worth it or not.
date: 2023-08-19T00:00:00.000Z
tags:
  - cs50
  - Harvard CS50 course
  - Python
  - Python 3
  - cs50p
coverImage: /images/blog/how-cs50p-helped-me-become-a-better-programmer/cover.png
coverAlt: How CS50P Helped Me Become A Better Programmer cover image
seoTitle: CS50P Made Me A Better Coder
seoDescription: >-
  In this blog, I'm gonna let you know all that I learnt from the course itself
  and leave it to you to decide whether the course is worth it or not.
readTimeInMinutes: 5
---

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text">CS50P is Harvard's Introductory Couse to Programming in Python</div>
</div>

There are dozens of blogs up on the internet suggesting why you should, or shouldn't, go for CS50P as a beginner in Python Programming. I'm not here to suggest you anything.

In this blog, I'm gonna let you know all that I learnt from the course itself and leave it to you to decide whether the course is worth it or not. Enough about suggestions, I'll tell you my experience of taking this course and how I think, it's beneficial for beginners like me.

## Removing The Fear Of Documentation

If you're anything like me, you fear the holy documentation of Python. The thought of looking up the documentation for something you need is exhausting in itself.

Well, if you don't know what Python Documentation is, or what documentation is in general, here's a look:

![](/images/blog/how-cs50p-helped-me-become-a-better-programmer/image-01.png)

Be it a language, an API, or anything related to tech, everything has its documentation. Whenever you want to learn something new, look up its documentation and start playing with it.

Personally speaking, I was always hesitant to look up any kind of documentation. Probably because I was afraid that I won't understand it, or I'd simply get lost in the vastness of it.

However, after having taken CS50P, I am a lot more confident in looking up documentation. This course encouraged me to find the solutions to my problems in the documentation from the initial problem sets. This proved extremely helpful to overcome my fear of documentation.

## Building A Strong Foundation Of Basics

I've done a Python course on Udemy before. And no hate to Udemy or the instructor there, but there's just something about Professor David's teaching style that makes concepts stick longer in my mind.

Trust me, the internet hype for Professor David is real! Now maybe this is just me, but 1.5-2 hour lectures covering the basics were all I needed to build a strong foundation of the basics.

From Week 0 to Week 2, I spent 4-5 hours only on the lecture material on Functions, Variables, Loops and Conditionals. Add an hour more for the problem sets. And according to me, this is an ample amount of time to cover all the basics.

And as I progressed through the course material, the lectures got longer, and the problem sets got harder. No wonder this course is tough to complete. Nevertheless, all the more worth it.

## Making Better Design Decisions

In his lectures, Professor David always made sure to stop and make us wonder why some design choice was better than other. And gradually, this made me a better coder.

Choosing a better design not only makes the program more efficient and more robust but also makes our lives as programmers easier! I realised it when I had to write significantly less code for achieving the same goal.

Let me demonstrate:

You have a dictionary of students' marks. You have to print the key-value pairs sorted on the values.

```python
marks = {'A': 95, 'B': 50, 'C': 80, 'D': 20}

def get_value(student):
    return marks[student]

for student in sorted(marks, key = get_value):
    print(f"{student}: {marks[student]}")
```

```python
marks = {'A': 95, 'B': 50, 'C': 80, 'D': 20}

for student in sorted(marks, key = lambda student: marks[student]):
    print(f"{student}: {marks[student]}")
```

This is a classic example of how you can use an anonymous function over a proper function when you just have to use it once. To achieve the same goal, the first design choice took 5 lines, and the second choice took only 3 lines of code!

Here's the output for both codes:

![](/images/blog/how-cs50p-helped-me-become-a-better-programmer/image-02.png)

## Getting To Solve Real-World Problems

I believe that as I moved ahead in the course, I got to solve more real-world problems in the problem sets of the course. Topics like Regular Expressions, Object-Oriented Programming, and File I/O involved problems that mirrored real-life situations.

A classic example that amused me was Email verification through Regular Expressions. Did you know what expression is used by google forms and services alike to verify the email that you enter?

Here it is:

![](/images/blog/how-cs50p-helped-me-become-a-better-programmer/image-03.png)

I know this looks gibberish, but once you take the lecture on Regular Expressions, everything in this image will start to make sense.

## Unit Tests

I've rarely found this topic in any of the introductory Python courses available on the internet. CS50P helped me understand why unit tests are so important for programmers when they work on big projects.

I remember seeing a tweet where-in a well-established software engineer said that people come for interviews without having a clue about Unit Tests. Well, I can comfortably say that CS50P got me covered.

## Final Project

I won't dive much into the workings of my Final Project here. However, I would say this:

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text">The CS50P Final Project helped me give the most satisfying conclusion to the course.</div>
</div>

I made a project using Python, Tabulate, Matplotlib and Numpy. My project revolved around NBA statistics and The MVP Award. Please note that Matplotlib and Numpy were not explicitly taught in the course.

Then how did I do it? Simple. Documentation. My final project is a testimony to the fact that CS50P not only helped me learn Python but also enabled me to learn any new feature or any new language on my own!

Here's my project video and GitHub repo:

%[https://github.com/K-Aditya-25/Terminal-based-NBA-project] 

%[https://www.youtube.com/watch?v=pXmzOgjLVjg&t=2s] 

See you in the next blog!
