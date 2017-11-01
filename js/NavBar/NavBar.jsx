import React from 'react';
// import { Meteor } from 'meteor/meteor';
// import { createContainer } from 'meteor/react-meteor-data';
// import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(e){
    e.preventDefault();
    // Meteor.logout( (err) => {
    //     if (err) {
    //         console.log( err.reason );
    //     } else {
    //         this.props.history.push('/login');
    //     }
    // });
  }

  render(){
    return (
        <nav>
          <div className="nav__row1">
            <div className="nav__logo">Worksheet Generator</div>
            <div onClick={this.logout}>Logout</div>
          </div>
          <div className="nav__row2">
            <div className='nav__row2-item'>Documents I'm Subscribed To</div>
            <div className='nav__row2-item'>Documents I've Created</div>
            <div className='nav__row2-item'>
              <div className="plus-icon">+</div>
              <div className='nav__row2-text_left-of-icon'>New Document</div>
            </div>
          </div>
        </nav>
    );
  }

}
