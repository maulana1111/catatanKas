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
import {
  storeGlobalChildSheet,
  storeDataFilter,
} from '../../../../redux/features/globalSlice';
import ScreenBottomSheetFilter from './BottomSheetFilter';
import {useDispatch, useSelector} from 'react-redux';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 60;
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/id';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import ModalEmpty from './component_html/ModalEmpty';
import GeneratePDF from './component_html/GeneratePDF';

// console.log('height = ' + -SCREEN_HEIGHT / 1.7);
// console.log('res height = ' + (58 / 100) * -SCREEN_HEIGHT);

function BottomSheetNav() {
  const navigation = useNavigation();
  const [condition, setCondition] = useState(false);
  const {
    conditionChildSheet,
    dataTransaksiIn,
    dataTransaksiOut,
    jumlahDataTransaksiIn,
    jumlahDataTransaksiOut,
    dataUser,
    dataFilter,
  } = useSelector(state => state.globalStm);
  const [visibleModalEmpty, setVisibleModalEmpty] = useState(false);
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
      if (translateY.value < (50 / 100) * -SCREEN_HEIGHT) {
        translateY.value = withSpring(MAX_TRANSLATE_Y, {damping: 50});
      }
      if (translateY.value > -SCREEN_HEIGHT / 2) {
        translateY.value = withSpring((58 / 100) * -SCREEN_HEIGHT, {
          damping: 50,
        });
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
      translateY.value = withSpring((50 / 100) * -SCREEN_HEIGHT, {damping: 50});
    }
    dispatch(storeGlobalChildSheet({condition: !conditionChildSheet}));
  };

  async function createPdfPemasukan() {
    var t = await GeneratePDF(
      dataTransaksiIn,
      dataTransaksiOut,
      jumlahDataTransaksiIn,
      jumlahDataTransaksiOut,
      dataUser,
      dataFilter,
    );
    // console.log(t);
    // <HtmlGenerate />
    // console.log("data = "+dataTransaksiIn.length);
    if (dataTransaksiIn === null && dataTransaksiOut === null) {
      setVisibleModalEmpty(true);
    } else {
      let file = await RNPrint.print({
        html: t,
      });
      await RNPrint.print({filePath: file.filePath});
    }
    // let name_pdf =
    //   'document_pemasukan_' +
    //   Math.floor(date.getTime() + date.getSeconds() / 2);
    // let options = {
    //   html: t,
    //   fileName: name_pdf,
    //   directory: 'Documents',
    //   base64: true
    // };
    // let file = await RNHTMLtoPDF.convert(options);
    // console.log(file.filePath);
    // console.log('res = ' + file);
    // return alert(file.filePath);
  }

  const onChangeVisible = () => {
    setVisibleModalEmpty(false);
  };

  useEffect(() => {
    conditionChildSheet
      ? (translateY.value = withSpring(MAX_TRANSLATE_Y, {damping: 50}))
      : (translateY.value = withSpring((58 / 100) * -SCREEN_HEIGHT, {
          damping: 50,
        }));
  }, [conditionChildSheet]);
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, rBottomSheetStyle]}>
        <ModalEmpty
          text={"Data Transaksi Kosong"}
          visible={visibleModalEmpty}
          onChange={() => onChangeVisible()}
        />
        <View style={styles.view_first}>
          <View style={styles.line}></View>
        </View>
        <View style={{paddingHorizontal: 24}}>
          {dataFilter.status && (
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.txt1}>Transaksi By Filter</Text>
              <Text style={styles.txt2}>
                {dataFilter.data.tanggal_dari} -{dataFilter.data.tanggal_sampai}
              </Text>
            </View>
          )}

          {/* {moment(new Date).format('ll')} */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 7,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
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
            <View
              style={{
                flexDirection: 'row',
              }}>
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
              <TouchableOpacity onPress={() => createPdfPemasukan()}>
                <Image source={require('../../../../assets/Share.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <SafeAreaView>
          <ScrollView>
            <ScreenBottomSheet />
          </ScrollView>
        </SafeAreaView>
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
