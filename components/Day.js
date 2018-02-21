import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

export default class Day extends Component {
  static defaultProps = {
    customStyle: {}
  };

  static propTypes = {
    caption: PropTypes.any,
    customStyle: PropTypes.object,
    filler: PropTypes.bool,
    hasEvent: PropTypes.bool,
    isSelected: PropTypes.bool,
    isToday: PropTypes.bool,
    isWeekend: PropTypes.bool,
    isCurrentMonth: PropTypes.bool,
    onPress: PropTypes.func,
    usingEvents: PropTypes.bool
  };

  dayCircleStyle = (isWeekend, isSelected, isToday, isCurrentMonth, hasEvent) => {
    const { customStyle } = this.props;
    const dayCircleStyle = [styles.dayCircleFiller, customStyle.dayCircleFiller];

    if (isToday) {
      dayCircleStyle.push(styles.todayCircle, customStyle.todayCircle);
    } else if (!isCurrentMonth) {
      dayCircleStyle.push(styles.outMonthDayCircle, customStyle.outMonthDayCircle);
    }

    if (isSelected && !isToday) {
      dayCircleStyle.push(!customStyle.selectedDayCircle && styles.selectedDayCircle, customStyle.selectedDayCircle);
    } else if (isSelected && isToday) {
      dayCircleStyle.push(!customStyle.currentDayCircle && styles.currentDayCircle, customStyle.currentDayCircle);
    }

    if (hasEvent) {
      dayCircleStyle.push(styles.hasEventCircle, customStyle.hasEventCircle)
    }
    return dayCircleStyle;
  };

  dayTextStyle = (isWeekend, isSelected, isToday, isCurrentMonth, hasEvent) => {
    const { customStyle } = this.props;
    const dayTextStyle = [styles.day, customStyle.day];

    if (isToday && !isSelected) {
      dayTextStyle.push(styles.currentDayText, customStyle.currentDayText);
    } else if (isToday && isSelected) {
      dayTextStyle.push(styles.selectedDayText, customStyle.selectedDayText);
    } else if (!isCurrentMonth) {
      dayTextStyle.push(styles.outMonthDayText, customStyle.outMonthDayText);
    } else if (isWeekend) {
      dayTextStyle.push(styles.weekendDayText, customStyle.weekendDayText);
    }

    if (hasEvent) {
      dayTextStyle.push(styles.hasEventText, customStyle.hasEventText)
    }
    return dayTextStyle;
  };

  render() {
    let { caption, customStyle } = this.props;
    const {
      hasEvent,
      isWeekend,
      isSelected,
      isToday,
      isCurrentMonth,
      usingEvents,
    } = this.props;

    return (
        <TouchableOpacity onPress={this.props.onPress}>
          <View style={[styles.dayButton, customStyle.dayButton]}>
            <View style={this.dayCircleStyle(isWeekend, isSelected, isToday, isCurrentMonth, hasEvent)}>
              <Text style={this.dayTextStyle(isWeekend, isSelected, isToday, isCurrentMonth, hasEvent)}>{caption}</Text>
            </View>
          </View>
        </TouchableOpacity>
    );
  }
}
