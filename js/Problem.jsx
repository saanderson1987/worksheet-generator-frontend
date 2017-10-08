import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import { flow } from 'lodash';


const problemSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },

  endDrag(props, monitor) {
    props.makeProbVisible(monitor.getItem().index);
  }
};

const problemTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    props.moveProblem(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  },
};

const newProblemTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    const clientOffset = monitor.getClientOffset();

    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    // if dragIndex === 0 , => false
    if (dragIndex !== null) {
      if (dragIndex === hoverIndex) {
        return;
      }
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      props.moveProblem(dragIndex, hoverIndex);
    }
    else {
      props.addNewProblem(hoverIndex);
    }
    monitor.getItem().index = hoverIndex;
  },
};

const newBlankTarget = {

};

class Problem extends React.Component {

  componentWillReceiveProps(nextProps) {
    // Remove new blank if new blank drag item leaves problem and reset its index.
    if (nextProps.isNewBlankOver !== this.props.isNewBlankOver &&
      !nextProps.isNewBlankOver && this.props.newBlank.index !== null &&
      !nextProps.didNewBlankDrop) {
      this.props.removeBlank(this.props.index, this.props.newBlank.index);
      this.props.newBlank.index = null;
    }
  }


  render(){
    const { isDragging, connectDragSource, connectDropTarget,
      connectAnotherDropTarget, connectNewBlankDropTarget,opaque } =
      this.props;
    const opacity = isDragging || opaque ? 0 : 1;

    return connectDragSource(connectDropTarget(connectAnotherDropTarget(connectNewBlankDropTarget(
      <div style={{opacity}} className='problem'>
        {this.props.children}
      </div>
    ))));
  }
}

export default flow(
  DragSource(ItemTypes.PROBLEM, problemSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget(ItemTypes.PROBLEM, problemTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  })),
  DropTarget(ItemTypes.NEWPROBLEM, newProblemTarget, connect => ({
    connectAnotherDropTarget: connect.dropTarget(),
  })),
  DropTarget(ItemTypes.NEWBLANK, newBlankTarget, (connect, monitor) => ({
    connectNewBlankDropTarget: connect.dropTarget(),
    isNewBlankOver: monitor.isOver(),
    didNewBlankDrop: monitor.didDrop(),
    newBlank: monitor.getItem()
  }))
)(Problem);
