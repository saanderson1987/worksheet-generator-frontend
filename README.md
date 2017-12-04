# Worksheet Generator
[View a sample](https://saanderson1987.github.io/worksheet-generator-sample/) of the work in progress!

Worksheet Generator is a tool to create digital educational worksheets. Teachers can create digital worksheets for their students to complete. Also, students will be able to create their own worksheets to help them study. Currently, the application supports fill-in-blank worksheets, and in the future it will support other types of worksheets such as matching, multiple-choice, etc.

My most notable feature is the ability for users to edit worksheets by using a drag and drop interface. You can witness a sample of this [here](https://saanderson1987.github.io/worksheet-generator-sample/). 

The application is built using Ruby on Rails and PostgreSQL on the backend, and React on the front end.

I originally started building this project with Meteor and MongoDB, but I found that while working on the front end with Meteor, every time I made change to a file and reloaded the browser to see the updated view, Meteor had to restart the server, which took a good 5-7 seconds. That doesn't sound long, but when I was making lots of edits, particularly while building the drag-and-drop interface, it could be very irritating. Therefore, I extracted the front end from the project and worked on it directly, without a database. 

Since then, I have switched to a back end using Ruby on Rails and PostgreSQL. You can see the current repository [here](https://github.com/saanderson1987/worksheet-gen-rails).


