import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import styles from "./styles";

const arrowStyle = StyleSheet.create({
  container: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center"
  }
});
const Arrow = ({source, width, height}) => (
    <View style={arrowStyle.container}>
      <Image
          source={source}
          resizeMode="contain"
          style={{width, height}}/>
    </View>
);
Arrow.propTypes = {
  source: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired
};
Arrow.defaultProps = {
  width: 14,
  height: 14
};

const todayBtnStyle = StyleSheet.create({
  container: {
    borderColor: "#d7d7d7",
    borderRadius: 7,
    borderWidth: 0.5,
    paddingVertical: 5,
    paddingHorizontal: 9
  },
  text: {
    fontSize: 11,
    color: "#676767"
  }
});
const TodayBtn = ({text, textStyle}) => (
    <View style={todayBtnStyle.container}>
      <Text style={[todayBtnStyle.text, textStyle]}>{text}</Text>
    </View>
);

const topBarStyles = StyleSheet.create({
  centredContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontWeight: "700",
    letterSpacing: 0
  }
});
const TopBar = ({
    onPrev,
    onNext,
    customStyle,
    scrollToToday,
    onTitlePress,
    localizedMonth,
    year,
    customTitleView}) => (
    <View style={[styles.calendarControls, customStyle.calendarControls]}>
      <TouchableOpacity
          style={[styles.controlButton, customStyle.controlButton]}
          onPress={onPrev}>
        <Arrow source={require("./assets/calendar-arrow-left.png")}/>
      </TouchableOpacity>
      <TouchableOpacity
          style={[styles.controlButton, customStyle.controlButton]}
          onPress={scrollToToday}>
        <TodayBtn text="Today"/>
      </TouchableOpacity>
      <TouchableOpacity
          style={topBarStyles.centredContent}
          onPress={onTitlePress}>
        {customTitleView ||
        <View>
          <Text style={[topBarStyles.title, customStyle.title]}>
            {localizedMonth} {year}
          </Text>
          <Arrow
              source={require("./assets/calendar-arrow-down.png")}
              width={10}
              height={10}/>
        </View>}
      </TouchableOpacity>
      <TouchableOpacity
          style={[styles.controlButton, customStyle.controlButton]}
          onPress={onNext}>
        <Arrow source={require("./assets/calendar-arrow-right.png")}/>
      </TouchableOpacity>
    </View>
);
TopBar.defaultProps = {
  onPrev: () => {},
  onNext: () => {},
  customStyle: {},
  scrollToToday: () => {},
  onTitlePress: () => {},
  localizedMonth: "",
  year: 2000
};
TopBar.propTypes = {
  onPrev: React.PropTypes.func.isRequired,
  onNext: React.PropTypes.func.isRequired,
  customStyle: React.PropTypes.object.isRequired,
  scrollToToday: React.PropTypes.func.isRequired,
  onTitlePress: React.PropTypes.func.isRequired,
  localizedMonth:React.PropTypes.string.isRequired,
  year: React.PropTypes.number.isRequired
};

module.exports = TopBar;
