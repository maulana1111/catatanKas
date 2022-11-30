import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import MyStatusBar from '../../../auth/component/StatusBar';
import {TextInput} from 'react-native-paper';
import Dropdown from './component/dropdown';
import FormInput from './component/formInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import Transaksi from './component/componentBottomSheet/Transaksi';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 60;
const SEC_MAX_TRANSLATE_Y = -SCREEN_HEIGHT;

function FormTambah() {
  const [stateScreen, setStateScreen] = useState('transaksi');
  const translateY = useSharedValue(0);
  const translateDropShadow = useSharedValue(0);
  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  const BottomDropShadow = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateDropShadow.value}],
    };
  });

  const handleTransaksiClick = () => {
    translateDropShadow.value = withSpring(SEC_MAX_TRANSLATE_Y, {
      damping: 50,
    });
    translateY.value = withSpring(-SCREEN_HEIGHT / 3, {damping: 50});
  };

  const handleCancelTransaksiClick = () => {
    translateDropShadow.value = withSpring(0, {
      damping: 50,
    });
    translateY.value = withSpring(0, {damping: 50});
  };

  const handleJenisClick = () => {};

  const handleKategoriClick = () => {};

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <MyStatusBar backgroundColor="#fff" barStyle="dark-content" />
      <KeyboardAwareScrollView> 
        <View style={{padding: 14}}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View style={styles.back}>
              <Image
                source={require('../../../../assets/arrow_left.png')}
                style={styles.imageBack}
              />
            </View>
            <View style={{marginLeft: '20%'}}>
              <Text style={styles.title}>Tambah Transaksi</Text>
            </View>
          </View>
          <View>
            <View style={{marginVertical: 15}} />
            <TouchableOpacity onPress={() => handleTransaksiClick()}>
              <Dropdown title={'Transaksi'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleJenisClick()}>
              <Dropdown title={'Jenis Transaksi'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleKategoriClick()}>
              <Dropdown title={'Bank/Perorang/Perusahaan/Tokok'} />
            </TouchableOpacity>
            <FormInput
              title={'Nominal Transaksi'}
              val={'Masukan Nominal Transaksi'}
            />
            <FormInput title={'Deskripsi'} val={'Masukan Deskripsi'} />
            <View style={{marginTop: 30}}>
              <TouchableOpacity style={styles.btn}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'BalooBhaijaan2-Bold',
                    textAlign: 'center',
                  }}>
                  Simpan
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Animated.View
          style={[
            styles.container,
            {backgroundColor: 'rgba(0, 0,0,0.6)', borderRadius: 0},
            BottomDropShadow,
          ]}>
          <Animated.View style={[styles.container, rBottomSheetStyle]}>
            {stateScreen === 'transaksi' && (
              <Transaksi onClickCancel={() => handleCancelTransaksiClick()} />
            )}
          </Animated.View>
        </Animated.View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    bottom: 0,
    borderRadius: 26,
  },
  imageBack: {
    width: 19,
    height: 19,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 6,
  },
  back: {
    backgroundColor: 'rgba(252, 188, 49, 0.4)',
    width: 32,
    height: 32,
    borderRadius: 30,
  },
  title: {
    fontFamily: 'BalooBhaijaan2-SemiBold',
    fontSize: 18,
    lineHeight: 27,
    color: '#DBA42D',
    marginTop: 5,
  },
  btn: {
    backgroundColor: '#FCBC31',
    padding: 10,
    height: 48,
    borderRadius: 16,
  },
});

export default FormTambah;
