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
  width: 6,
  height: 11
};

const todayBtnStyle = StyleSheet.create({
  container: {
    width: 47,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#d7d7d7"
  },
  text: {
    fontSize: 11,
    color: "#676767"
  }
});

const topBarStyles = StyleSheet.create({
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
      <View style={[styles.container, customStyle.container]}>
        <TouchableOpacity
            style={[styles.controlButton, customStyle.controlButton]}
            onPress={onPrev}>
          <Arrow source={require("./assets/calendar-arrow-left.png")}/>
        </TouchableOpacity>
        <View style={styles.controlButton}>
          <TouchableOpacity style={todayBtnStyle.container}
                            onPress={scrollToToday}>
            <Text style={todayBtnStyle.text}>Today</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
          style={styles.containerTitle}
          onPress={onTitlePress}>
        {customTitleView ||
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Text style={[topBarStyles.title, customStyle.title]}>
            {localizedMonth} {year}
          </Text>
          <Arrow
              source={require("./assets/calendar-arrow-down.png")}
              width={10}
              height={10}/>
        </View>}
      </TouchableOpacity>
      <View style={[styles.container, customStyle.container]}>
        <View style={[styles.controlButton, customStyle.controlButton]}>
        </View>
        <TouchableOpacity
            style={[styles.controlButton, customStyle.controlButton]}
            onPress={onNext}>
          <Arrow source={require("./assets/calendar-arrow-right.png")}/>
        </TouchableOpacity>

      </View>
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
