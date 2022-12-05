import React, {useState, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import MyStatusBar from '../../../auth/component/StatusBar';
// import Dropdown from './component/dropdown';
import Dropdown from '../screen/component/dropdown';
import FormInput from '../screen/component/formInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import Transaksi from '../screen/component/componentBottomSheet/Transaksi';
import JenisTransaksi from '../screen/component/componentBottomSheet/JenisTransaksi';
import {launchCamera} from 'react-native-image-picker';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 60;
const SEC_MAX_TRANSLATE_Y = -SCREEN_HEIGHT;
import {useNavigation} from '@react-navigation/native';
import {PermissionsAndroid} from 'react-native';

function FormTambahBill() {
  const [stateScreen, setStateScreen] = useState('transaksi');
  const [transaksi, setTransaksi] = useState('');
  const [jenisTransaksi, setJenisTransaksi] = useState('');
  const [kategori, setKategori] = useState('');
  const [nominal, setNominal] = useState();
  const [deskripsi, setDeskripsi] = useState('');
  const [gambar, setGambar] = useState(null);
  const [txtNominal, setTxtNominal] = useState('');
  const translateY = useSharedValue(0);
  const translateDropShadow = useSharedValue(0);
  const navigation = useNavigation();
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

  const handleOpenBottomSheetTransaksi = () => {
    setStateScreen('transaksi');
    translateDropShadow.value = withSpring(SEC_MAX_TRANSLATE_Y, {
      damping: 50,
    });
    translateY.value = withSpring(-SCREEN_HEIGHT / 4, {damping: 50});
  };
  const handleOpenBottomSheetJenis = () => {
    if (transaksi === '') {
      return ToastAndroid.showWithGravityAndOffset(
        'Anda Harus Memilih Transaksi!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }

    setStateScreen('jenis');
    translateDropShadow.value = withSpring(SEC_MAX_TRANSLATE_Y, {
      damping: 50,
    });
    translateY.value = withSpring(-SCREEN_HEIGHT / 1.7, {damping: 50});
  };

  const handleCancelClick = () => {
    translateDropShadow.value = withSpring(0, {
      damping: 50,
    });
    translateY.value = withSpring(0, {damping: 50});
    // setStateScreen('jenis');
  };

  const handleChangeSetStateTransaksi = e => {
    translateDropShadow.value = withSpring(0, {
      damping: 50,
    });
    translateY.value = withSpring(0, {damping: 50});
    setTransaksi(e);
  };

  const handleChangeKategoriClick = e => {
    translateDropShadow.value = withSpring(0, {
      damping: 50,
    });
    translateY.value = withSpring(0, {damping: 50});
    setJenisTransaksi(e);
  };

  const handleChangeNominal = e => {
    setNominal(e);
    // console.log('nominal = ' + e)
  };

  const handleChangeDeskripsi = e => {
    setDeskripsi(e);
  };

  const ChangeRupiah = number => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };

  const cameraLaunch = async () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    const androidCameraPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'This app would like Access your Camera',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (androidCameraPermission === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('camera Permission granted');

      launchCamera(options, res => {
        // console.log('Response = ', res);
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.error) {
          console.log('ImagePicker Error: ', res.error);
        } else if (res.customButton) {
          console.log('User tapped custom button: ', res.customButton);
          alert(res.customButton);
        } else {
          const source = {uri: res.uri};
          //   console.log('response', JSON.stringify(res.assets[0]));
          setGambar(res.assets[0]);
          // this.setState({
          //   filePath: res,
          //   fileData: res.data,
          //   fileUri: res.uri,
          // });
        }
      });
    } else {
      console.log('Contacts permission denied');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <MyStatusBar backgroundColor="#fff" barStyle="dark-content" />
      {/* <GestureHandlerRootView> */}
      <KeyboardAwareScrollView extraHeight={0}>
        <View style={{padding: 14}}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Home');
              }}>
              <View style={styles.back}>
                <Image
                  source={require('./assets/arrow_left.png')}
                  style={styles.imageBack}
                />
              </View>
            </TouchableOpacity>
            <View style={{marginLeft: '25%'}}>
              <Text style={styles.title}>Tambah Tagihan</Text>
            </View>
          </View>
          <View>
            <View style={{marginVertical: 15}} />
            <TouchableOpacity
              onPress={() => {
                cameraLaunch();
              }}>
              {gambar !== null ? (
                <TouchableOpacity onPress={() => {setGambar(null)}}>
                  <View style={styles.ThirdContainer}>
                    <View>
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          backgroundColor: '#FF9292',
                          borderRadius: 4,
                          padding: 5,
                          position: 'absolute',
                          top: -20,
                          left: 100,
                        }}>
                        <Image
                          source={require('./assets/Cancel.png')}
                          style={{width: 10, height: 10, tintColor: '#CD1717'}}
                        />
                      </View>
                      <Image
                        source={{uri: gambar.uri}}
                        style={{
                          justifyContent: 'center',
                          alignSelf: 'center',
                          width: 101,
                          height: 183,
                        }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              ) : (
                <View style={styles.secContainer}>
                  <View>
                    <Image
                      source={require('./assets/image.png')}
                      style={{justifyContent: 'center', alignSelf: 'center'}}
                    />
                    <Text style={{textAlign: 'center'}}>
                      Upload / Ambil Gambar
                    </Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
            <View style={{marginVertical: 10}} />
            <TouchableOpacity onPress={() => handleOpenBottomSheetTransaksi()}>
              <Dropdown
                title={'Transaksi'}
                text={transaksi === '' ? 'Pilih Transaksi' : transaksi}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOpenBottomSheetJenis()}>
              <Dropdown
                title={'Jenis Transaksi'}
                text={
                  jenisTransaksi === ''
                    ? 'Pilih Jenis Transaksi'
                    : jenisTransaksi
                }
              />
            </TouchableOpacity>
            <FormInput
              title={'Bank/Perorang/Perusahaan/Tokok'}
              val={'Masukan Bank/Perorang/Perusahaan/Tokok'}
              type={'text'}
              onChange={e => handleChangeNominal(e)}
            />
            <FormInput
              title={'Nominal Transaksi'}
              val={'Masukan Nominal Transaksi'}
              type={'numeric'}
              onChange={e => handleChangeNominal(e)}
            />
            <FormInput
              title={'Deskripsi'}
              val={'Masukan Deskripsi'}
              type={'text'}
              onChange={e => handleChangeDeskripsi(e)}
            />
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
      </KeyboardAwareScrollView>
      {/* <GestureDetector> */}
      <Animated.View
        style={[
          styles.container,
          {backgroundColor: 'rgba(0, 0,0,0.6)', borderRadius: 0},
          BottomDropShadow,
        ]}>
        <Animated.View style={[styles.container, rBottomSheetStyle]}>
          {stateScreen === 'transaksi' && (
            <Transaksi
              onClickCancel={() => handleCancelClick()}
              onChangeState={value => handleChangeSetStateTransaksi(value)}
            />
          )}
          {stateScreen === 'jenis' && (
            <JenisTransaksi
              onClickCancel={() => handleCancelClick()}
              onChangeState={value => handleChangeKategoriClick(value)}
            />
          )}
        </Animated.View>
      </Animated.View>
      {/* </GestureDetector> */}
      {/* </GestureHandlerRootView> */}
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
  secContainer: {
    width: 125,
    height: 121,
    padding: 12,
    borderColor: '#FCBC31',
    borderWidth: 2,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 12,
  },
  ThirdContainer: {
    width: 125,
    height: 207,
    padding: 12,
    borderColor: '#000',
    borderWidth: 2,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
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

export default FormTambahBill;
