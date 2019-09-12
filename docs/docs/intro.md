---
id: intro
title: Introduction to the VPIA
sidebar_label: Example Page
---

Welcome to the VPIA documentation! This has been built to help both technical and non-technical users of the platform to orient themselves and understand how to build and run the project.

The VPIA uses Node and MySQL on the backend - React on the front. 

The platform is technically split up into large separate chunks. 

## Wiki Engine

A wiki engine is premade code that supports basic Wikipedia-esque functions. This involves:
* Creating content connected to a user or even anonymously
* Revision history - the ability to see who, when and what changed in content and to return to an earlier form
* Allows multiple users to edit content

The VPIA currently uses Matterwiki, a simple functional wiki engine that supports revision, content creation and editor and even a basic search functionality.

One challenge is allowed the public to view content without modifying - Matterwiki only allows the admin to add users at the moment. There's also no support for user profile viewing. 

## WYSIWYG editor

Literally stands for "What you see is what you get", this is usually content editor software. Most Wiki editors use `Markup languages` - meaning if you want to, for example, bold a sentence, you have to manually put some kind of tag - such as \*Word\* or [b]word[\b]. 

The benefit of WYSIWYG is that what you write is exactly the same as the finished product and you don't need to mark up your content manually. 

The VPIA has an editor that is bundled with Matterwiki called [Trix](https://github.com/basecamp/trix). The current version has been customised for Matterwiki - and image/video support has been removed. Either Trix will be fixed up or entirely scrapped for a different WYSIWYG engine. 

## Search

Search is usually either a file that does database queries to return certain files the user requested or it can be an engine like ElasticSearch. Currently the search is done through simple query search. As we grow with need for advanced search, we must consider either adding an engine or manually modifying the existing code.

## Force-Directed Graph

A large, customised part of the VPIA will be adding in a Force-directed graph. A force directed graph is a way of drawing graphs in a nice visualization. It will show the connection between the nodes, the researchers, the museums, the tribes and onwards. This does not come bundled with Matterwiki, so this will have to be investigated. 

[D3.js](https://d3js.org/) and [Sigma.js](http://sigmajs.org/) are two proposed technologies to use.

## Database

Currently the Dataset has been transcribed into Airtable, a visually friendly and simple way of depositing information. The problem is we must be able to add in this content into a software database to pull in content. At the moment, there's no elegant solution to integrating. 

Matterwiki currently uses SQL based technology (MySQL and possible PostgreSQL). As of now, we are unsure whether NoSQL is a better longterm solution for supporting resilient data, but if we were to migrate, it would be a large rewrite. 

## Other aspects

The VPIA has done a few new things:
* Enabled ESLint in most JS files to fix formatting issues.
* Enabled Prettier to allow better structure and enforce coding styles.
* Made this Docusaurus documentation site for technical and non technical information.
