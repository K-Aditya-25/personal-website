---
title: 'Today''s State of AI: Is Markdown the new Source Code?'
description: >-
  Code is becoming dispensable. Natural Language instructions in markdown files
  are a project's core.
date: 2026-10-13T00:00:00.000Z
tags:
  - AI
  - agents
  - agentic AI
  - coding
coverImage: /images/blog/today-s-state-of-ai-is-markdown-the-new-source-code/cover.png
coverAlt: 'Today''s State of AI: Is Markdown the new Source Code? cover image'
seoTitle: Is Markdown the new Source Code?
seoDescription: >-
  Code is becoming dispensable. Are markdown files becoming the new source code
  for agentic AI led projects? This blog dives deeper into the discussion.
readTimeInMinutes: 10
---

There is a higher chance that you encountered software written by AI today than yesterday.

Before agentic coding took rise, it was considered good practice to

1.  Write good quality code
    
2.  Write high coverage tests
    
3.  Have good systems thinking
    

However, with AI writing so much code today, engineers are spending less and less time looking at and reviewing the source code. It seems as if all that's important now is to create the perfect harness around the model instead!

Almost everyday we are seeing a new industry standard coming up for creating harnesses that gives a coding agent the right context at the right time. The agent writes the code and the surrounding skills and tools handle testing and system design.

But, a coding agent works best only when you have the perfect instructions, tools, skills and context delivered to it while managing constraints like not running out of the context window. And majority of context that people provide to an agent is usually markdown.

So, I ask myself:

> Is Markdown the new source code?

I've been actively and passively thinking about it for more than a week now, and I say ***no, not yet***\*.

# Defining Markdown and Source Code

Before I jump in to discuss why Markdown isn't the new source code yet, let me briefly explain the scope of markdown and source code in this blog.

## Markdown

In this blog, "markdown" represents any and all instructions and context offered to an AI coding agent in a *.md* file as part of a bigger software project. This could take all of the following forms:

*   system\_prompt.md
    
*   plan.md
    
*   SKILL.md
    
*   memory.md
    
*   reference.md
    
*   wiki.md
    
*   CLAUDE.md / agents.md
    

These files typically contain the bulk of context and instructions for an AI coding agent. The content within these files steer the behaviour of the coding agent and give the agent the necessary context to work inside the respective project.

## Source Code

While this may be quite obvious, let's define "source code" for the sake of the argument.

Source code refers to all the files in a software project which have deterministic code written in them in a programming language. They typically end with *.py, .ts, .cpp, .c, .sh* etc.

Source code is what actually gets things done. It is the language of deterministic software. Even though we describe agents as models with the capability to take actions in a loop, it is through source code that an agent takes that action.

# Why isn't Markdown the new Source Code?

I like to classify software projects into three broad groups:

1.  Legacy / Zero AI projects
    
2.  Semi Agentic AI projects
    
3.  Fully Agentic AI led projects
    

Having programmed for five years and working for a year now, I've seen all three kinds of projects.

I found that classifying all software projects that I've ever been a part of in these three categories really helped me to reach to my answer quickly, and I hope it will help you understand how.

## Legacy / Zero AI projects

These projects are usually at companies/firms/businesses that have too much legacy software to deal with and cannot afford (or don't intend) to change their present ways.

Easy examples would be SMEs, small family owned businesses, public/government organisations, restaurants with in-home software for reservations etc. Organisations and businesses like these have very little or nothing to gain to use AI in their software lifecycle.

They care very little about the newest development in AI and are often slow to adopt best industry practices for software. But don't get me wrong, I don't blame them.

This saying fits perfectly in this scenario.

> If it ain't broke, don't fix it.

So, markdown would not even be something that they'd need to think about. Actual source code would be more than enough to get right.

## Semi Agentic AI projects

These are projects where development is AI-assisted and not AI-led. This was essentially all AI-assisted development before 2025 when coding agents like claude code started getting popular.

I imagine that the companies that aren't primarily in a SaaS business, or aren't frontier AI labs would fall into this category.

For example: In 2025, I worked as a data science intern for 8 months at Eaton. Eaton is a power management company which specialises in developing patented technologies for electrical hardware. Software is just a part of the puzzle that accompanies their first-in-class electrical hardware.

I would often use copilot on VS code to write basic code for doing data analysis with Pandas, model training with PyTorch and other simple python scripts. I still had to do my own research, think of all the edge cases, own the architecture decisions and testing methodology. Copilot accelerated merely the programming aspect of my job. And that is still the case with the majority of the software engineers today, even with agents like claude code and codex getting commonplace.

With many multi-national giants that aren't primarily Saas businesses, AI is merely a means to achieve a goal. It is not the goal itself. Most of these companies are too big and process-heavy to be agile to change their set processes to keep up with the pace of development of AI, and rarely find it valuable to constantly adapt to the next big thing in AI.

Hence, software engineers in such companies don't have much budget, encouragement, or allowance to experiment with AI and extensively use it. So subsequently, markdown wouldn't be as important to them as source code.

Sure, markdown files would still influence how they use agentic AI, but not to the point where it becomes the only thing that software engineers interact with.

## Fully Agentic AI led projects

These are the newest category of software projects where most, if not all, of the development is done by AI. Software engineers are equipped with cutting edge AI models, frameworks and harnesses and are given generous token spend limits to drive real and heavy development workflows with AI.

There are 3 types of companies which actively encourage projects like these.

1.  **Frontier AI Labs**. eg: OpenAI, Anthropic, xAI, Deepmind, Moonshot AI, Z AI etc
    
2.  **Tech Giants.** eg: NVIDIA, Microsoft, Meta, Amazon, Google, Stripe, Salesforce etc
    
3.  **Top AI Startups.** eg: Cursor, Lovable, Replit, Langchain, HuggingFace etc
    

Employees in these companies are typically power users of AI who are encouraged to extract the maximum value out of it with generous budgets. They are more likely to set industry standards on how to best work with AI simply by posting their daily AI workflow on social media.

%[https://x.com/steipete/status/2063697162748260627] 

These companies encourage (and sometimes borderline force) their employees to spend the maximum time iterating with one of their own AI products to come up with the best techniques to use it.

Hence, software projects in such companies have workflows where software engineers direct a swarm of AI agents to finish a goal and create PRs, which are then reviewed by a subsequent AI agent and merged into production.

Often, an engineer's ability to get AI to do a particular task faster, with less tokens and a scalable approach is far more valuable than the engineer's ability to write the source code itself.

At Web Summit, this is how my workflow looks like for a fully Agentic AI led project:

1.  For every prompt thread, the agent is initialised with the *agents.md* file that gives the agent essential context about the project and guides it on how to behave and what type of requests it can expect from the user.
    
2.  A persistent *wiki.md* acts as a company reference for the agent to refer to whenever it requires essential Web Summit context.
    
3.  10+ *skill.md* files give the agent the capability to perform the exact workflows that are required for the project. Langchain describes it well on how to write good agent skills in their [Paid Media Agent blog](https://www.langchain.com/blog/paid-media-agent) : *Skills should be independent of the organisation and the wiki must be organisation specific.*
    
4.  Each skill has a corresponding *memory.md* file that contains all the instances where an agent fell for a *not-so-obvious* bug. This helps the agent to continuously learn from its actions.
    
5.  The *scripts/* folder contains all the python scripts that are relevant to any skill. The [*skill.md*](http://skill.md) file for a particular skill typically mentions which scripts to run, which the agent directly follows.
    
6.  A persistent *CHANGELOG.md* file tracks all the changes made to the repo. The *agents.md* specifies that whenever the agent commits a PR to github, it must also add the summary of the changes to the [*CHANGELOG.md*](http://CHANGELOG.md) file.
    

Instructions (tools, skills, system prompts etc) and context (README's, CHANGELOGs, PLAN, MEMORY etc) provided in markdown totally influence the way AI works in a project which directly affects how long it takes to complete the project, how much it costs and whether it is aligned with the organisation's programming standards.

> Hence, in this context, markdown is definitely replacing source code in terms of its relevance and importance\*.\*

# Final Thoughts

Markdown files are slowly gaining importance in software projects as AI adoption is increasing across the value chain. It seems that the tech industry is collectively moving towards a future where an engineer will be judged not only by how well they're able to understand and write source code, but also by how well the engineer can structure and version control the context for an AI agent across markdown files.

For a future like that, many open questions emerge:

1.  What are the new best practices to handle context across the project in markdown files?
    
2.  Is markdown even the best way to maintain context? Is there something better?
    
3.  How do you set the new hiring standards for software engineers?
    

Currently, I see that for two out of the three types of projects that I described, markdown files have still not reached the relevance and importance level of source code itself.

So, by simple rule of majority, markdown is not the new source code to me, *yet.* But why am I too hung up on *yet*? Here's why.

AI coding agents already bring tremendous benefits to software projects. Some of them being rapid pace of development, higher abstraction, development in natural language, and enabling non technical teams to contribute to software projects and utilise their domain knowledge directly.

So, I believe that AI adoption is only going to increase across all types of software projects. On top of this, advancement in open-source and open-weight AI models, frameworks and harnesses will only lead to lower costs and increased data privacy.

For example, Unsloth AI recently launched their jupyter notebook to train any open-source AI model into a Jev-like System 1 decision model.

%[https://x.com/UnslothAI/status/2107868866361930236] 

Google also recently launched their new open-source embedding model **EmbeddingGemma 2** for on-device local embeddings.

%[https://x.com/GoogleDeepMind/status/2107502286758895878] 

Developments like these will only keep increasing as investment in open-source AI and the AI community grows.

Hence, although markdown files aren't as relevant to \*all\* software projects as source code ***yet***, it will very soon be.
