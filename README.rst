Javascript 101
==============

Welcome
-------

This document is a programming course for
students that know some html and css. It was originally written for a programming  
class to seventeen year olds. If you see ways of improving the course, please
fork, I promise I'll look over every pull request you send.

Introduction
------------

This course is about teaching how to write computer programs that run inside
the browser. Each chapter starts with a piece of sample code, you can run in
your own browser::

    <html>
        <head>
            <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js" type="text/javascript"></script>
        </head>
        <body>
            <h1>
                Please click me
            </h1>
        <script>
            $(document).ready (function() {
                $('h1').click(function() {
                    alert('thank you!');
                    })
            })
        </script>
    </html>

Questions
~~~~~~~~~

#. What does the first `<script>` does?
#. What does the second one does?
#. What does `$(document)` means?
#. What does the `.ready()` means? Why do we need it?
#. What does `function()` do? 
#. What is `alert()`? Who wrote it?

Exercises 
~~~~~~~~~

#. change the `thank you!` to `hello world`

Keeping Score
-------------

This chapter will introduce the concept of variable and math operators. The
sample below, keeps count of user clicks::

    <html>
        <head>
            <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js" type="text/javascript"></script>
        </head>
        <body>
            <h1>
                Please click me
            </h1>
        <script>
            $(document).ready (function() {
                var i=0;
                $('h1').click(function() {
                    i = i + 1;
                    alert(i);
                    })
            })
        </script>
    </html>

Questions
~~~~~~~~~

#. What does `var` do?
#. How does the assignment `i = i + 1` work? 
#. What other operators can I use?
#. what other ways are to display `i`?

Exercises
~~~~~~~~~

#. add a `don't click me` element and punish the player by subtracting the score

Keeping the score live on the page
----------------------------------

In this chapter we will introduce the DOM and use it to read and write html
elments. We will use jQuery to get the DOM, read it and change it so the page
corner will keep the current score::

    TBD

A real game
-----------

In this class we will learn to use a timer, so the game will have a begining. The game will last 60 seconds and
will measure how fast you are with a mouse. To score a point you'll have to move
to move the mouse from one corner of the screen to another and click::

    TBD

Keeping a high score list
-------------------------

Keeping a shared high score list
---------------------------------

Using fancy graphics 
--------------------

