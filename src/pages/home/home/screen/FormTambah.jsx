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
import {TextInput} from 'react-native-paper';
import Dropdown from './component/dropdown';
import FormInput from './component/formInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  GestureDetector,
  GestureHandlerRootView,
  Gesture,
  ScrollView,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import Transaksi from './component/componentBottomSheet/Transaksi';
import JenisTransaksi from './component/componentBottomSheet/JenisTransaksi';
import KategoriTransfer from './component/componentBottomSheet/KategoriTransfer';
import KategoriInstant from './component/componentBottomSheet/KategoriInstant';
import KategoriHiburan from './component/componentBottomSheet/KategoriHiburan';
import KategoriGayaHidup from './component/componentBottomSheet/KategoriGayaHidup';
import KategoriMakanan from './component/componentBottomSheet/KategoriMakanan';
import KategoriTunai from './component/componentBottomSheet/KategoriTunai';
import Database from '../../../../utilSqlite/database';
import {useNavigation} from '@react-navigation/native';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 60;
const SEC_MAX_TRANSLATE_Y = -SCREEN_HEIGHT;
const db = new Database();

function FormTambah() {
  const [stateScreen, setStateScreen] = useState('transaksi');
  const [transaksi, setTransaksi] = useState('');
  const [jenisTransaksi, setJenisTransaksi] = useState('');
  const [kategori, setKategori] = useState('');
  const [nominal, setNominal] = useState();
  const [deskripsi, setDeskripsi] = useState('');
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
  const handleOpenBottomSheetKategori = () => {
    if (jenisTransaksi === '') {
      return ToastAndroid.showWithGravityAndOffset(
        'Anda Harus Memilih Jenis Transaksi!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
    setStateScreen(jenisTransaksi);
    translateDropShadow.value = withSpring(SEC_MAX_TRANSLATE_Y, {
      damping: 50,
    });
    if (jenisTransaksi === 'transfer') {
      translateY.value = withSpring(-SCREEN_HEIGHT / 1.7, {damping: 50});
    }
    if (jenisTransaksi === 'instant') {
      translateY.value = withSpring(-SCREEN_HEIGHT / 2.2, {damping: 50});
    }
    if (jenisTransaksi === 'tunai') {
      translateY.value = withSpring(-SCREEN_HEIGHT / 1.1, {damping: 50});
    }
    if (jenisTransaksi === 'hiburan') {
      translateY.value = withSpring(-SCREEN_HEIGHT / 1.5, {damping: 50});
    }
    if (jenisTransaksi === 'gaya_hidup') {
      translateY.value = withSpring(-SCREEN_HEIGHT / 1.3, {damping: 50});
    }
    if (jenisTransaksi === 'makanan&minuman') {
      translateY.value = withSpring(-SCREEN_HEIGHT / 1.1, {damping: 50});
    }
  };

  const handleCancelClick = () => {
    translateDropShadow.value = withSpring(0, {
      damping: 50,
    });
    translateY.value = withSpring(0, {damping: 50});
  };

  const handleChangeSetStateTransaksi = e => {
    translateDropShadow.value = withSpring(0, {
      damping: 50,
    });
    translateY.value = withSpring(0, {damping: 50});
    setTransaksi(e);
  };

  const handleChangeJenisTransaksiClick = e => {
    translateDropShadow.value = withSpring(0, {
      damping: 50,
    });
    translateY.value = withSpring(0, {damping: 50});
    setJenisTransaksi(e);
  };
  const handleChangeKategoriClick = e => {
    translateDropShadow.value = withSpring(0, {
      damping: 50,
    });
    translateY.value = withSpring(0, {damping: 50});
    setKategori(e);
  };

  const handleChangeNominal = e => {
    setNominal(e);
    // console.log('nominal = ' + e);
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

  const handleSubmit = () => {
    data = {
      id_user: 'id001',
      transaksi: transaksi,
      jenisTransaksi: jenisTransaksi,
      kategori: kategori,
      nominal: nominal,
      deskripsi: deskripsi,
    };
    db.insertDataTransaksi(data)
      .then(data => console.log(data))
      .catch(err => console.log(err));
  };

  // useEffect(() => {
  //   if (nominal) {
  //     return setTxtNominal(ChangeRupiah(nominal));
  //   }
  //   // setTxtNominal('');
  // }, [nominal]);

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
                  source={require('../../../../assets/arrow_left.png')}
                  style={styles.imageBack}
                />
              </View>
            </TouchableOpacity>
            <View style={{marginLeft: '20%'}}>
              <Text style={styles.title}>Tambah Transaksi</Text>
            </View>
          </View>
          <View>
            <View style={{marginVertical: 15}} />
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
            <TouchableOpacity onPress={() => handleOpenBottomSheetKategori()}>
              <Dropdown
                title={'Bank/Perorang/Perusahaan/Tokok'}
                text={
                  kategori === ''
                    ? 'Pilih Bank/Perorang/Perusahaan/Tokok'
                    : kategori
                }
              />
            </TouchableOpacity>
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
              <TouchableOpacity
                style={styles.btn}
                onPress={() => handleSubmit()}>
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
              onChangeState={value => handleChangeJenisTransaksiClick(value)}
            />
          )}
          {stateScreen === 'transfer' && (
            <KategoriTransfer
              onClickCancel={() => handleCancelClick()}
              onChangeState={value => handleChangeKategoriClick(value)}
            />
          )}
          {stateScreen === 'instant' && (
            <KategoriInstant
              onClickCancel={() => handleCancelClick()}
              onChangeState={value => handleChangeKategoriClick(value)}
            />
          )}
          {stateScreen === 'tunai' && (
            <KategoriTunai
              onClickCancel={() => handleCancelClick()}
              onChangeState={value => handleChangeKategoriClick(value)}
            />
          )}

          {stateScreen === 'hiburan' && (
            <KategoriHiburan
              onClickCancel={() => handleCancelClick()}
              onChangeState={value => handleChangeKategoriClick(value)}
            />
          )}
          {stateScreen === 'gaya_hidup' && (
            <KategoriGayaHidup
              onClickCancel={() => handleCancelClick()}
              onChangeState={value => handleChangeKategoriClick(value)}
            />
          )}
          {stateScreen === 'makanan&minuman' && (
            <ScrollView>
              <KategoriMakanan
                onClickCancel={() => handleCancelClick()}
                onChangeState={value => handleChangeKategoriClick(value)}
              />
            </ScrollView>
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
