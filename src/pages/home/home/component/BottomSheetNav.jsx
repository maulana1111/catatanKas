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
import ScreenBottomSheet from './ScreenBottomSheet';
import {storeGlobalChildSheet} from '../../../../redux/features/globalSlice';
import ScreenBottomSheetFilter from './BottomSheetFilter';
import {useDispatch, useSelector} from 'react-redux';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 60;
import {useNavigation} from '@react-navigation/native';

function BottomSheetNav({dataPemasukan, dataPengeluaran}) {
  const navigation = useNavigation();
  const [condition, setCondition] = useState(false);
  const {conditionChildSheet} = useSelector(state => state.globalStm);
  const dispatch = useDispatch();
  const translateY = useSharedValue(0);
  const context = useSharedValue({y: 0});
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
    })
    .onUpdate(event => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (translateY.value < -SCREEN_HEIGHT / 2) {
        translateY.value = withSpring(MAX_TRANSLATE_Y, {damping: 50});
      }
      if (translateY.value > -SCREEN_HEIGHT / 2) {
        translateY.value = withSpring(-SCREEN_HEIGHT / 2, {damping: 50});
      }
    });
  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  const handleFilter = async () => {
    if (conditionChildSheet !== true) {
      translateY.value = withSpring(MAX_TRANSLATE_Y, {damping: 50});
    } else {
      translateY.value = withSpring(-SCREEN_HEIGHT / 2, {damping: 50});
    }
    dispatch(storeGlobalChildSheet({condition: !conditionChildSheet}));
  };

  useEffect(() => {
    conditionChildSheet
      ? (translateY.value = withSpring(MAX_TRANSLATE_Y, {damping: 50}))
      : (translateY.value = withSpring(-SCREEN_HEIGHT / 2, {damping: 50}));
  }, [conditionChildSheet]);
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, rBottomSheetStyle]}>
        <View style={styles.view_first}>
          <View style={styles.line}></View>
        </View>
        <View style={{paddingHorizontal: 24}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.txt1}>Transaksi Hari Ini</Text>
            <Text style={styles.txt2}>28 Maret 2022</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 7,
            }}>
            <View>
              <TouchableOpacity
                style={styles.bgCard}
                onPress={() => navigation.navigate('FormTambahTransaksi')}>
                <Image
                  source={require('../../../../assets/add.png')}
                  style={{
                    width: 24,
                    height: 24,
                    marginLeft: '14%',
                    marginTop: '14%',
                  }}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.bgCard}
                onPress={() => handleFilter()}>
                <Image
                  source={require('../../../../assets/filter.png')}
                  style={{
                    width: 24,
                    height: 24,
                    marginLeft: '14%',
                    marginTop: '14%',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <SafeAreaView>
          <ScrollView>
            <ScreenBottomSheet
              dataPengeluaran={dataPengeluaran}
              dataPemasukan={dataPemasukan}
            />
          </ScrollView>
        </SafeAreaView>
        {/* <ScreenBottomSheetFilter /> */}
      </Animated.View>
    </GestureDetector>
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
  line: {
    width: 40,
    height: 3,
    backgroundColor: '#DBA42D',
  },
  view_first: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  txt1: {
    fontSize: 16,
    fontFamily: 'BalooBhaijaan2-SemiBold',
    lineHeight: 24,
    color: '#DBA42D',
  },
  txt2: {
    fontSize: 16,
    fontFamily: 'BalooBhaijaan2-Regular',
    lineHeight: 24,
    color: '#000',
  },
  bgCard: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(252, 188, 49, 0.4)',
    borderRadius: 8,
  },
});

export default BottomSheetNav;
