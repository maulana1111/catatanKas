import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  GestureDetector,
  Gesture,
  ScrollView,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 60;
const SEC_MAX_TRANSLATE_Y = -SCREEN_HEIGHT;

function ScreenBottomSheetFilter() {
  const [condition, setCondition] = useState(false);
  const {conditionChildSheet} = useSelector(state => state.globalStm);
  const translateY = useSharedValue(0);
  const translateDropShadow = useSharedValue(0);
  const context = useSharedValue({y: 0});
  const BottomDropShadow = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateDropShadow.value}],
    };
  });

  const BottomSheetChild = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  useEffect(() => {
    // setCondition(conditionChildSheet);
    console.log('child = ' + SCREEN_HEIGHT);
    if (conditionChildSheet) {
      console.log('hit true');
      translateDropShadow.value = withSpring(SEC_MAX_TRANSLATE_Y, {
        damping: 50,
      });
      translateY.value = withSpring(-SCREEN_HEIGHT / 2, {damping: 50});
    } else {
      console.log('hit false');
      translateDropShadow.value = withSpring(0, {damping: 50});
      translateY.value = withSpring(0, {damping: 50});
    }
  }, [conditionChildSheet]);

  return (
    <Animated.View
      style={[
        styles.container,
        {backgroundColor: 'rgba(0, 0,0,0.6)'},
        BottomDropShadow,
      ]}>
      <Animated.View style={[styles.container, BottomSheetChild]}>
        <View style={{padding: 24}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.text1}>Filter & Urutan</Text>
            <Image source={require('../../../../assets/Cancel.png')} />
          </View>
          <View>
            <Text>Urutan Pemasukan</Text>
            <View>
              <View>
                <Image source={require('../../../../assets/sort_des.png')} />
                <Text>Pemasukan Tertinggi</Text>
              </View>
              <View>
                <Image source={require('../../../../assets/sort_asc.png')} />
                <Text>Pemasukan Terendah</Text>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: SCREEN_HEIGHT,
    backgroundColor: '#fff',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 26,
  },
  text1: {
    fontSize: 18,
    fontFamily: 'BalooBhaijaan2-SemiBold',
    lineHeight: 28,
    color: '#000',
  },
});

export default ScreenBottomSheetFilter;
