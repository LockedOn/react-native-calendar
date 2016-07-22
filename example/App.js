import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import Calendar from './react-native-calendar';
import moment from 'moment';

const customDayHeadings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f7f7f7',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const WidthScreen = Dimensions.get("window").width;

const customStyle = StyleSheet.create({
  calendarContainer: {
    backgroundColor: "white"
  },
  dayCircleFiller: {
    borderRadius: 0,
    backgroundColor: "#d7d7d7",
    width: 40,
    height: 40
  },
  currentDayCircle: {
    backgroundColor: "#55b14b"
  },
  todayCircle: {
    backgroundColor: "#55b14b"
  },
  outMonthDayCircle: {
    backgroundColor: "#f2f2f2"
  },
  currentDayText: {
    color: "white"
  },
  weekendDayText: {
    color: "#333"
  },
  day: {
    fontSize: 11,
    fontWeight: "400"
  },
  title: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0
  },
  calendarHeading: {
    borderBottomWidth: 0,
    borderTopWidth: 0
  },
  dayButton: {
    borderTopWidth: 0,
    padding: 0,
    height: (WidthScreen - (WidthScreen - 280) / 8) / 7,
    width: (WidthScreen - (WidthScreen - 280) / 8) / 7,
    alignItems: "flex-end"
  },
  dayHeading: {
    fontSize: 11,
    color: "#676767"
  },
  weekendHeading: {
    fontSize: 11,
    color: "#676767"
  },
  selectedDayCircle: {
    borderColor: "#55b14b",
    borderWidth: 2
  },
  hasEventCircle: {
    borderBottomColor: "#55b14b",
    borderBottomWidth: 2
  }
});

const CustomTopBar = () => (
    <View>
      <Text>Custom topBar</Text>
    </View>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: moment().format(),
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Calendar
          ref="calendar"
          customStyle={customStyle}
          eventDates={['2016-07-03', '2016-07-05', '2016-07-28', '2016-07-30']}
          scrollEnabled
          showControls
          weekStart={7}
          dayHeadings={customDayHeadings}
          titleFormat={'MMMM YYYY'}
          prevButtonText={'Prev'}
          nextButtonText={'Next'}
          onDateSelect={(date) => this.setState({ selectedDate: date })}
          onTouchPrev={() => console.log('Back TOUCH')}     // eslint-disable-line no-console
          onTouchNext={() => console.log('Forward TOUCH')}  // eslint-disable-line no-console
          onSwipePrev={() => console.log('Back SWIPE')}     // eslint-disable-line no-console
          onSwipeNext={() => console.log('Forward SWIPE')}  // eslint-disable-line no-console
          onTitlePress={() => console.log('Title Press')}  // eslint-disable-line no-console
        />
        <Text>Selected Date: {moment(this.state.selectedDate).format('MMMM DD YYYY')}</Text>
      </View>

    );
  }
}

module.exports = App;
