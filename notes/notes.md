-Can't highlight response text -- click starts drag. Maybe have drag not apply to response OR drag only a side bar of problem.
-Play around with drag and drop to catch errors.
-Maybe the functionality should add a blank before or after a WORD. Every word would have to be its own object/array item. In order to allow user to still time freely, maybe upon drag, the object is split...

-Don't forget permitted users in NewDocForm

Notable:
  -There is a single component for both read only and editable instructions. The elements that change are stored as properties of an object `values`. Each element property has two properties, `edit` and `read`. A variable `mode` determines which of these the render function returns based on the boolean value of `this.props.edit`. This approach avoids splitting the component into two separate components, which would force repetition of shared code.

  -BUG: When I was implementing the drag and drop functionality for adding a new blank, I needed to create a function to split the text into array of word objects so that a blank could be added before or after any word. Then I needed to create another function to rejoin the text so that users could edit the text as a unit, i.e., use the backspace and highlight text. The rejoin function was cutting off some of the words at the end and I needed to figure out why. The rejoin function creates a new, empty text piece array and iterates over the old text piece array and adds the text of the current object in the iteration to the previous.   Upon analyzing the function, I realized that the variable I had for the previous text object referred to the previous one in the old text piece array, not the new one, which lead to errors.
