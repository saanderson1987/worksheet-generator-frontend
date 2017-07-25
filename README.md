#Running Pace Calculator

[Live page](https://saanderson1987.github.io/Running-Pace-Calculator-with-React/)

I wanted to pace myself while I ran in order to run a certain time in a certain distance. For example, how long should it take me to run a quarter mile if I want to make sure I finish 2 miles in 15 minutes? Welcome back to math class. Calculating this was annoying because I had to keep converting the time in a decimal and also had to account for different intervals of a mile. So I decided to automate it.

Using an HTML file for the interface, I composed the math functions using JavaScript. Bam, done. See that version's repository [here](https://github.com/saanderson1987/Running-Pace-Calculator). With the file having only 40 lines of code, I knew that the organization of the JavaScript file wasn't critical, but I was still curious about the best way to structure the program. I had already created a large application using React, but how would a small app look using React? So re-built the program with React.

I knew I could build it using a single component, but I thought it would be better if I test out React's modular nature by separating the input form from the calculator. By keeping the calculator functions in a separate component, I could rely on them to help create another component later, such as a one that populates a chart with distance times and their interval pace.

The input form component `<PaceForm />` stores all the input values in its local state. One the form is submitted, it calls the function `calculatePace`, which has been passed down to its props from `<PaceCalculator />`, and sets the `pace` value in its state.
