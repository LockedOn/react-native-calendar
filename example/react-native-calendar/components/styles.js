import { Dimensions, StyleSheet } from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;

const colors = {
  main: "#55b14b",
  mainBackground: "transparent",
  secondaryBackground: "#d7d7d7",
  text: "#333",
  secondaryText: "#676767"
};

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: colors.mainBackground,
  },
  monthContainer: {
    width: DEVICE_WIDTH,
  },
  calendarControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 2,
    flexDirection: "row",
  },
  containerTitle: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  controlButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  controlButtonText: {
    margin: 10,
    fontSize: 15,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    margin: 10
  },
  calendarHeading: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  dayHeading: {
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 5,
    color: '#333',
  },
  weekendHeading: {
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 5,
    color: '#333',
  },
  weekRow: {
    flexDirection: 'row',
  },
  dayButton: {
    alignItems: 'center',
    padding: 5,
    width: DEVICE_WIDTH / 7,
    borderTopWidth: 1,
    borderTopColor: '#e9e9e9',
  },
  day: {
    fontSize: 16,
    alignSelf: 'center',
    color: '#333'
  },
  eventIndicatorFiller: {
    marginTop: 3,
    borderColor: 'transparent',
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  eventIndicator: {
    backgroundColor: '#cccccc',
  },
  dayCircleFiller: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  todayCircle: {
    backgroundColor: 'transparent'
  },
  outMonthDayCircle: {
    backgroundColor: 'transparent'
  },
  currentDayCircle: {
    backgroundColor: 'red',
  },
  currentDayText: {
    color: 'red',
  },
  selectedDayCircle: {
    backgroundColor: 'black',
  },
  hasEventCircle: {
  },
  hasEventText: {
  },
  selectedDayText: {
    color: 'white',
    fontWeight: 'bold',
  },
  weekendDayText: {
    color: '#333',
  },
  outMonthDayText: {
    color: '#a3a3a3',
  },
});

export default styles;
