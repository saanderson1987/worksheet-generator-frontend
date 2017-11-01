-Can't highlight response text -- click starts drag. Maybe have drag not apply to response OR drag only a side bar of problem.
-Play around with drag and drop to catch errors.
-Maybe the functionality should add a blank before or after a WORD. Every word would have to be its own object/array item. In order to allow user to still time freely, maybe upon drag, the object is split...

-Don't forget permitted users in NewDocForm

Notable:
  -There is a single component for both read only and editable instructions. The elements that change are stored as properties of an object `values`. Each element property has two properties, `edit` and `read`. A variable `mode` determines which of these the render function returns based on the boolean value of `this.props.edit`. This approach avoids splitting the component into two separate components, which would force repetition of shared code. 
