import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert,
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
import moment from 'moment';
import 'moment/locale/id';
import {useDispatch, useSelector} from 'react-redux';
import FilterComponent from './component_item/filter-component';
import ShowCalendar from './component_item/ShowCalendar';
const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 60;
const SEC_MAX_TRANSLATE_Y = -SCREEN_HEIGHT;
import {
  storeGlobalChildSheet,
  storeGlobalSecChildSheet,
} from '../../../../redux/features/globalSlice';
import FilterJenisItem from './component_item/filter-jenis-item';

function ScreenBottomSheetFilter() {
  const [stateIn, setStateIn] = useState('');
  const [stateOut, setStateOut] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [date, setDate] = useState(new Date());
  const [dateFromCom, setDateFromCom] = useState(new Date());
  const [dateToCom, setDateToCom] = useState(new Date());
  const [stateJenis, setStateJenis] = useState('');

  const {conditionChildSheet, secondConditionChildSheet} = useSelector(
    state => state.globalStm,
  );
  const translateY = useSharedValue(0);
  const translateDropShadow = useSharedValue(0);

  const dispatch = useDispatch();

  const handleChangeStateIn = value => {
    setStateIn(value);
  };

  const handleChangeStateOut = value => {
    setStateOut(value);
  };

  const handleChangeDateFrom = (value1, value2) => {
    setDateFrom(value1);
    setDateFromCom(value2);
  };

  const handleChangeDateTo = (value1, value2) => {
    setDateTo(value1);
    setDateToCom(value2);
  };

  const handleChangeStateJenis = value => {
    setStateJenis(value);
  };

  const handleSubmitSetting = () => {
    if (dateFromCom > dateToCom) {
      return Alert.alert('Perhatian !', 'Tanggal Tidak Bisa Diterima', [
        {text: 'Oke'},
      ]);
    }
  };

  const handleSubmitReset = () => {
    setStateJenis('');
    setDateFromCom(new Date());
    setDateToCom(new Date());
    setDateFrom('');
    setDateTo('');
    setStateIn('');
    setStateOut('');
  };

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
    if (conditionChildSheet) {
      translateDropShadow.value = withSpring(SEC_MAX_TRANSLATE_Y, {
        damping: 50,
      });
      translateY.value = withSpring(-SCREEN_HEIGHT / 1.3, {damping: 50});
      if (secondConditionChildSheet) {
        translateY.value = withSpring(0, {damping: 50});
      } else {
        translateY.value = withSpring(-SCREEN_HEIGHT / 1.3, {damping: 50});
      }
    } else {
      translateDropShadow.value = withSpring(0, {damping: 50});
      translateY.value = withSpring(0, {damping: 50});
    }
  }, [conditionChildSheet, secondConditionChildSheet]);

  return (
    <Animated.View
      style={[
        styles.container,
        {backgroundColor: 'rgba(0, 0,0,0.6)', borderRadius: 0},
        BottomDropShadow,
      ]}>
      <Animated.View style={[styles.container, BottomSheetChild]}>
        <View style={{padding: 24}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.text1}>Filter & Urutan</Text>
            <TouchableOpacity
              onPress={() =>
                dispatch(
                  storeGlobalChildSheet({
                    condition: false,
                  }),
                )
              }>
              <Image source={require('../../../../assets/Cancel.png')} />
            </TouchableOpacity>
          </View>
          <FilterComponent
            title={'Urutan Pemasukan'}
            text1={'Pemasukan Tertinggi'}
            text2={'Pemasukan Terendah'}
            state={stateIn}
            onChangeState={value => handleChangeStateIn(value)}
          />
          <FilterComponent
            title={'Urutan Pengeluaran'}
            text1={'Pengeluaran Tertinggi'}
            text2={'Pengeluaran Terendah'}
            state={stateOut}
            onChangeState={value => handleChangeStateOut(value)}
          />
          <View>
            <Text style={styles.text2}>Tanggal</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <ShowCalendar
                date={dateFrom === '' ? moment(date).format('ll') : dateFrom}
                title={'Dari Tanggal'}
                onChangeDate={(value1, value2) =>
                  handleChangeDateFrom(value1, value2)
                }
              />
              <Image
                source={require('../../../../assets/arrow_right.png')}
                style={{marginTop: 10}}
              />
              <ShowCalendar
                date={dateTo === '' ? moment(date).format('ll') : dateTo}
                title={'Sampai Tanggal'}
                onChangeDate={(value1, value2) =>
                  handleChangeDateTo(value1, value2)
                }
              />
            </View>
          </View>
          <View>
            <Text style={styles.text2}>Jenis</Text>
            <View style={styles.container2}>
              <FilterJenisItem
                images={require('../../../../assets/filter/transfer.png')}
                text={'Transfer'}
                state={stateJenis}
                onChange={value => handleChangeStateJenis(value)}
              />
              <FilterJenisItem
                images={require('../../../../assets/filter/instant.png')}
                text={'Instan'}
                state={stateJenis}
                onChange={value => handleChangeStateJenis(value)}
              />
              <FilterJenisItem
                images={require('../../../../assets/filter/coin.png')}
                text={'Tunai'}
                state={stateJenis}
                onChange={value => handleChangeStateJenis(value)}
              />
              <FilterJenisItem
                images={require('../../../../assets/filter/entertainment.png')}
                text={'Hiburan'}
                state={stateJenis}
                onChange={value => handleChangeStateJenis(value)}
              />
              <FilterJenisItem
                images={require('../../../../assets/filter/lifestyle.png')}
                text={'Gaya Hidup'}
                state={stateJenis}
                onChange={value => handleChangeStateJenis(value)}
              />
              <FilterJenisItem
                images={require('../../../../assets/filter/food.png')}
                text={'Makanan & Minuman'}
                state={stateJenis}
                onChange={value => handleChangeStateJenis(value)}
              />
            </View>
          </View>
          <View style={styles.container3}>
            <View>
              <TouchableOpacity
                style={styles.btnCard}
                onPress={() => {
                  handleSubmitReset();
                }}>
                <Text style={styles.text3}>Hapus Semua</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.btnCard2}
                onPress={() => {
                  handleSubmitSetting();
                }}>
                <Text style={styles.text4}>Atur Setting</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  container2: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  container3: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    marginTop: 10,
  },
  container: {
    flex: 1,
    width: '100%',
    height: SCREEN_HEIGHT,
    backgroundColor: '#fff',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 26,
  },
  btnCard: {
    width: 165,
    height: 48,
    padding: 10,
    borderRadius: 16,
  },
  btnCard2: {
    backgroundColor: '#FCBC31',
    width: 165,
    height: 48,
    padding: 10,
    borderRadius: 16,
  },
  text1: {
    fontSize: 18,
    fontFamily: 'BalooBhaijaan2-SemiBold',
    lineHeight: 28,
    color: '#000',
  },
  text2: {
    fontSize: 16,
    fontFamily: 'BalooBhaijaan2-SemiBold',
    lineHeight: 24,
    color: '#FCBC31',
  },
  text3: {
    fontSize: 16,
    fontFamily: 'BalooBhaijaan2-SemiBold',
    lineHeight: 24,
    color: '#D8D8D8',
    textAlignVertical: 'center',
    marginTop: 3,
    textAlign: 'center',
  },
  text4: {
    fontSize: 16,
    fontFamily: 'BalooBhaijaan2-SemiBold',
    lineHeight: 24,
    color: '#000',
    textAlignVertical: 'center',
    marginTop: 3,
    textAlign: 'center',
  },
});

export default ScreenBottomSheetFilter;
