import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { addReminder, deleteReminder } from '../actions/index.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      dueDate: ''
    }
  }

  addReminder() {
    const { addReminder } = this.props;
    const { dueDate, text } = this.state;
    
    console.log('this.state.dueDate', dueDate);
    addReminder(text, dueDate);
  }

  deleteReminder(id) {
    const { deleteReminder } = this.props;
    deleteReminder(id);
  }

  renderReminders() {
    const { reminders } = this.props;
    
    return (
      <ul className="list-group col-sm-4">
        {
          reminders.map(reminder => {
          return (
              <li key={reminder.id} className="list-group-item">
              <div className="list-item">
                <div>{reminder.text}</div>
                <div><em>{moment(reminder.dueDate).fromNow()}</em></div>
              </div>
              <div
                className="list-item delete-button"
                onClick={() => this.deleteReminder(reminder.id)}
              >
                &#x2715;
              </div>
              </li>
            );
          })
        }
      </ul>
    )
  }

  render() {
    return (
      <div className="app">
        <div className="title">
          Reminder Pro
        </div>
        <div className="form-inline reminder-form">
          <div className="form-group">
            <input
              className="form-control"
              placeholder="I have to..."
              onChange={event => this.setState({ text: event.target.value })}
            />
            <input
              className="form-control"  
              type="datetime-local"
              onChange={event => this.setState({ dueDate: event.target.value })}
            />
          </div>
          <button
            className="btn btn-success"
            type="button"
            onClick={() => this.addReminder()}
          >
            Add Reminder  
          </button>
        </div>
        { this.renderReminders() }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reminders: state
  }
}

export default connect(mapStateToProps, { addReminder, deleteReminder })(App);
