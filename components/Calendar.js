import React, { Component, PropTypes } from 'react';
import {
    Dimensions,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import Day from './Day';
import TopBar from "./TopBar";

import moment from 'moment';
import styles from './styles';


const DEVICE_WIDTH = Dimensions.get('window').width;
const VIEW_INDEX = 2;

function areSameDay(first, second) {
  return (
    first.isSame(second, "year") &&
    first.isSame(second, "month") &&
    first.isSame(second, "day")
  )
}

export default class Calendar extends Component {

  state = {
    currentMonthMoment: moment(this.props.startDate),
    selectedMoment: moment(this.props.selectedDate),
  };

  static propTypes = {
    customStyle: PropTypes.object,
    dayHeadings: PropTypes.array,
    eventDates: PropTypes.array,
    monthNames: PropTypes.array,
    nextButtonText: PropTypes.string,
    onDateSelect: PropTypes.func,
    onSwipeNext: PropTypes.func,
    onSwipePrev: PropTypes.func,
    onTouchNext: PropTypes.func,
    onTouchPrev: PropTypes.func,
    prevButtonText: PropTypes.string,
    scrollEnabled: PropTypes.bool,
    selectedDate: PropTypes.any,
    showControls: PropTypes.bool,
    startDate: PropTypes.any,
    titleFormat: PropTypes.string,
    today: PropTypes.any,
    weekStart: PropTypes.number,
  };

  static defaultProps = {
    customStyle: {},
    dayHeadings: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    eventDates: [],
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
      'Jule', 'August', 'September', 'October', 'November', 'December'],
    nextButtonText: 'Next',
    prevButtonText: 'Prev',
    scrollEnabled: false,
    showControls: false,
    startDate: moment().format('YYYY-MM-DD'),
    titleFormat: 'MMMM YYYY',
    today: moment(),
    weekStart: 1,
    customTopBar: false
  };

  componentDidMount() {
    this.scrollToItem(VIEW_INDEX);
  }

  componentDidUpdate() {
    this.scrollToItem(VIEW_INDEX);
  }

  getMonthStack(currentMonth) {
    if (this.props.scrollEnabled) {
      const res = [];
      for (let i = -VIEW_INDEX; i <= VIEW_INDEX; i++) {
        res.push(moment(currentMonth).add(i, 'month'));
      }
      return res;
    }
    return [moment(currentMonth)];
  }

  prepareEventDates(eventDates) {
    const parsedDates = {};

    eventDates.forEach(event => {
      const date = moment(event);
      const month = moment(date).startOf('month').format();
      if (!parsedDates[month]) {
        parsedDates[month] = {};
      }
      parsedDates[month][date.date() - 1] = true;
    })
    return parsedDates;
  }

  selectDate(date) {
    this.setState({selectedMoment: date});
    this.props.onDateSelect && this.props.onDateSelect(date.format());
  }

  onPrev = () => {
    const newMoment = moment(this.state.currentMonthMoment).subtract(1, 'month');
    this.setState({currentMonthMoment: newMoment});
    this.props.onTouchPrev && this.props.onTouchPrev(newMoment);
  }

  onNext = () => {
    const newMoment = moment(this.state.currentMonthMoment).add(1, 'month');
    this.setState({currentMonthMoment: newMoment});
    this.props.onTouchNext && this.props.onTouchNext(newMoment);
  }

  scrollToItem(itemIndex) {
    const scrollToX = itemIndex * DEVICE_WIDTH;
    if (this.props.scrollEnabled) {
      this._calendar.scrollTo({y: 0, x: scrollToX, animated: false});
    }
  }

  scrollEnded(event) {
    const position = event.nativeEvent.contentOffset.x;
    const currentPage = position / DEVICE_WIDTH;
    const newMoment = moment(this.state.currentMonthMoment).add(currentPage - VIEW_INDEX, 'month');
    this.setState({currentMonthMoment: newMoment});

    if (currentPage < VIEW_INDEX) {
      this.props.onSwipePrev && this.props.onSwipePrev(newMoment);
    } else if (currentPage > VIEW_INDEX) {
      this.props.onSwipeNext && this.props.onSwipeNext(newMoment);
    }
  }

  scrollToToday = () => this.setState({currentMonthMoment: moment()});

  selectMonth = selectedMoment => this.setState({currentMonthMoment: selectedMoment});

  renderMonthView(argMoment, eventDatesMap) {

    let
        renderIndex = 0,
        weekRows = [],
        days = [];

    const
        selectedMoment = moment(this.state.selectedMoment),
        weekStart = this.props.weekStart,
        todayMoment = moment(this.props.today),
        argMonthDaysCount = argMoment.daysInMonth(),
        startOfArgMonthMoment = argMoment.startOf('month'),
        startOfArgPrevMonthMoment = startOfArgMonthMoment.subtract(1, "month"),
        startOfArgNextMonthMoment = startOfArgMonthMoment.add(1, "month"),
        offset = (startOfArgMonthMoment.isoWeekday() - weekStart + 7) % 7;

    const events = (eventDatesMap !== null)
        ? eventDatesMap[argMoment.startOf('month').format()]
        : null;

    let
        startOfMonth = startOfArgMonthMoment,
        isCurrentMonth = true;

    do {
      const
          dayIndex = renderIndex - offset,
          isoWeekday = (renderIndex + weekStart) % 7,
          currentMoment = moment(startOfArgMonthMoment).add(dayIndex, "day"),
          currentIndex = currentMoment.date();

      if (dayIndex < 0) {
        startOfMonth = startOfArgPrevMonthMoment;
        isCurrentMonth = false;
      } else if (dayIndex >= argMonthDaysCount) {
        startOfMonth = startOfArgNextMonthMoment;
        isCurrentMonth = false;
      } else {
        startOfMonth = startOfArgMonthMoment;
        isCurrentMonth = true;
      }

      days.push((
          <Day
              startOfMonth={startOfMonth}
              isWeekend={isoWeekday === 0 || isoWeekday === 6}
              isCurrentMonth={isCurrentMonth}
              key={`${renderIndex}`}
              onPress={() => this.selectDate(currentMoment)}
              caption={`${currentIndex}`}
              isToday={areSameDay(currentMoment, todayMoment)}
              isSelected={areSameDay(currentMoment, selectedMoment)}
              hasEvent={events && events[dayIndex] === true}
              usingEvents={this.props.eventDates.length > 0}
              customStyle={this.props.customStyle}
              />
      ));

      if (renderIndex % 7 === 6) {
        weekRows.push(
            <View
                key={weekRows.length}
                style={[styles.weekRow, this.props.customStyle.weekRow]}
                >
              {days}
            </View>);
        days = [];
        if (dayIndex + 1 >= argMonthDaysCount) {
          break;
        }
      }
      renderIndex += 1;
    } while (true)
    const containerStyle = [styles.monthContainer, this.props.customStyle.monthContainer];
    return <View key={argMoment.month()} style={containerStyle}>{weekRows}</View>;
  }

  renderHeading() {
    const headings = [];
    for (let i = 0; i < 7; i++) {
      const j = (i + this.props.weekStart) % 7;
      headings.push(
          <Text
              key={i}
              style={j === 0 || j === 6 ?
            [styles.weekendHeading, this.props.customStyle.weekendHeading] :
            [styles.dayHeading, this.props.customStyle.dayHeading]}
              >
            {this.props.dayHeadings[j]}
          </Text>
      );
    }

    return (
        <View style={[styles.calendarHeading, this.props.customStyle.calendarHeading]}>
          {headings}
        </View>
    );
  }

  renderTopBar() {
    let localizedMonth = this.props.monthNames[this.state.currentMonthMoment.month()];
    if (this.props.showControls) {
      if (this.props.customTopBar) {
        return React.createElement(this.props.customTopBar, this.props);
      }
      return (
          <TopBar
              onNext={this.onNext}
              onPrev={this.onPrev}
              scrollToToday={this.scrollToToday}
              customStyle={this.props.customStyle}
              localizedMonth={localizedMonth}
              currentMonthMoment={this.state.currentMonthMoment.year()}
              onTitlePress={() => this.props.onTitlePress && this.props.onTitlePress(this.selectMonth)}/>
      );
    }
    return (
        <View style={[styles.calendarControls, this.props.customStyle.calendarControls]}>
          <Text style={[styles.title, this.props.customStyle.title]}>
            {this.state.currentMonthMoment.format(this.props.titleFormat)}
          </Text>
        </View>
    );
  }

  render() {
    const calendarDates = this.getMonthStack(this.state.currentMonthMoment);
    const eventDatesMap = this.prepareEventDates(this.props.eventDates);

    return (
        <View style={[styles.calendarContainer, this.props.customStyle.calendarContainer]}>
          {this.renderTopBar()}
          {this.renderHeading(this.props.titleFormat)}
          {this.props.scrollEnabled ?
              <ScrollView
                  ref={calendar => this._calendar = calendar}
                  horizontal
                  scrollEnabled
                  pagingEnabled
                  removeClippedSubviews
                  scrollEventThrottle={1000}
                  showsHorizontalScrollIndicator={false}
                  automaticallyAdjustContentInsets
                  onMomentumScrollEnd={(event) => this.scrollEnded(event)}
                  >
                {calendarDates.map((date) => this.renderMonthView(moment(date), eventDatesMap))}
              </ScrollView>
              :
              <View ref={calendar => this._calendar = calendar}>
                {calendarDates.map((date) => this.renderMonthView(moment(date), eventDatesMap))}
              </View>
          }
        </View>
    );
  }
}
