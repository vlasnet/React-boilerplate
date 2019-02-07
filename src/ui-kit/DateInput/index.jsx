import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import moment from 'moment';
import PropTypes from 'prop-types';

import 'react-day-picker/lib/style.css';
import './picker.css';
import styles from './index.module.css';

export default class DateInput extends Component {

  static propTypes = {
    value: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  };
  state = {
    selectedDay: this.props.value,
  };

  handleDayClick = day => {
    const newDate = moment(day).set('hour', 0).valueOf();

    this.setState({
      selectedDay: newDate,
    });
  };

  render() {
    const { id, label } = this.props;
    const { selectedDay } = this.state;

    return (
      <div>
        {label && <label htmlFor={id} className={styles.label}>{label}</label>}
        <DayPicker
          id={id}
          selectedDays={new Date(selectedDay)}
          firstDayOfWeek={1}
          onDayClick={this.handleDayClick}
        />
      </div>
    );
  }
}
