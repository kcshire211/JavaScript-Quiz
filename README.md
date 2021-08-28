# JavaScript-Quiz

## HTML Page

I first created a basic html file with a header for "JavaScript Quiz", a sub-header with instructions to push the start button to start the quiz,
and below I have a timer that begins with 60 seconds and will count down to 0. 
My main section contains two buttons: one to start the quiz, the other to show the highest logged score. The rest of the main is broken up into a questions section, end section, and high-score section. 

## CSS 

I used very basic CSS for this assignment as my main focus was on the logic and function of the page. That said, I do feel the simplicity works with this quiz. I added background color to the header and assinged font, padding, and made sure the header is centered. 
I used CSS to give the buttons distinct color and a hover funtion that changes the button border color. My most important css feature is the display: none; feature that allowed the page to hide the quiz question and answers as well as the high score until each are called upon using JavaScript.

## JavaScript

My first priority was assigning variables to all of my ID tags from my html file to be referenced and called in the js file. I also created a variable for the list of questions and answers. Using click and submit event listeners, I made the two buttons and the answer options functional. Those buttons trigger showElement to display the sections I was hiding initially so that the quiz, end, and high score only display one at time. Also in the js I made the timer begin the countdown from 60 seconds upon the start button being clicked. 
When a correct answer is clicked, the quiz goes to the next question. If the wrong answer is clicked, the quiz goes to the next question but also docs 10 additional seconds to the count down. The game ends when either the timer hits 0 or all 5 questions are answered. This prompts the "end" section that asks you to input your initials, then stores those initals and time remaining as your score in the local files. From there, the show high score button displays the highest score saved in the system. 

