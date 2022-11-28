import React from 'react';
import {Text, View, StyleSheet, Dimensions, Image} from 'react-native';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

function BottomSheetNav() {
  console.log(Dimensions.get('window'));
  const translateY = useSharedValue(0);
  const context = useSharedValue({y: 0});
  const up_arrow = require('../../../../assets/up_arrow.png');
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
    })
    .onUpdate(event => {
      console.log('hit = ' + event.translationY);
      translateY.value = event.translationY;
    });
  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, rBottomSheetStyle]}>
        <View style={styles.view_first}>
          <Image source={up_arrow} />
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: SCREEN_HEIGHT,
    backgroundColor: '#fff',
    position: 'absolute',
    top: SCREEN_HEIGHT / 2,
    borderRadius: 26,
  },
  view_first: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default BottomSheetNav;
