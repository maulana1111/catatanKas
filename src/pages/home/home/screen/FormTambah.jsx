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
  color,
} from 'react-native-reanimated';
import Transaksi from './component/componentBottomSheet/Transaksi';
import JenisTransaksi from './component/componentBottomSheet/JenisTransaksi';
import KategoriTransfer from './component/componentBottomSheet/KategoriTransfer';
import KategoriInstant from './component/componentBottomSheet/KategoriInstant';
import KategoriHiburan from './component/componentBottomSheet/KategoriHiburan';
import KategoriGayaHidup from './component/componentBottomSheet/KategoriGayaHidup';
import KategoriMakanan from './component/componentBottomSheet/KategoriMakanan';
import KategoriTunai from './component/componentBottomSheet/KategoriTunai';
// import Database from '../../../../utilSqlite/database';
import Database from '../../../../../android/app/src/main/assets/database';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/id';
import Modal from 'react-native-modal';
import ModalItem from './component/componentBottomSheet/Modal';
import ModalItemSuccess from './component/componentBottomSheet/ModalSuccess';
import {useSelector} from 'react-redux';
import {Alert} from 'react-native';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 60;
const SEC_MAX_TRANSLATE_Y = -SCREEN_HEIGHT;
const today = new Date();
const tanggal =
  today.getFullYear() +
  '-' +
  (String(today.getMonth()).length === 1
    ? '0' + parseInt(today.getMonth()+1)
    : today.getMonth()) +
  '-' +
  (String(today.getDate()).length === 1
    ? '0' + today.getDate()
    : today.getDate());
const time =
  today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
// var dt = new Date(tanggal);
// console.log('tanggal = ' + dt);

function FormTambah() {
  const {dataUser} = useSelector(state => state.globalStm);
  const [stateScreen, setStateScreen] = useState('transaksi');
  const [transaksi, setTransaksi] = useState('');
  const [jenisTransaksi, setJenisTransaksi] = useState('');
  const [kategori, setKategori] = useState('');
  const [nominal, setNominal] = useState();
  const [deskripsi, setDeskripsi] = useState('');
  const [txtNominal, setTxtNominal] = useState('');
  const [loading, setLoading] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const translateY = useSharedValue(0);
  const translateDropShadow = useSharedValue(0);
  const navigation = useNavigation();
  // console.log("date = "+time);
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
    translateY.value = withSpring(-SCREEN_HEIGHT / 3.6, {damping: 50});
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
    translateY.value = withSpring(-SCREEN_HEIGHT / 1.5, {damping: 50});
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
      translateY.value = withSpring(-SCREEN_HEIGHT / 1.5, {damping: 50});
    }
    if (jenisTransaksi === 'instant') {
      translateY.value = withSpring(-SCREEN_HEIGHT / 2.0, {damping: 50});
    }
    if (jenisTransaksi === 'tunai') {
      translateY.value = withSpring(-SCREEN_HEIGHT / 1.1, {damping: 50});
    }
    if (jenisTransaksi === 'hiburan') {
      translateY.value = withSpring(-SCREEN_HEIGHT / 1.3, {damping: 50});
    }
    if (jenisTransaksi === 'gaya_hidup') {
      translateY.value = withSpring(-SCREEN_HEIGHT / 1.2, {damping: 50});
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

  const doSubmit = async() => {
    const db = new Database();
    data = {
      id_user: dataUser.data.id_user,
      transaksi: transaksi,
      jenisTransaksi: jenisTransaksi,
      kategori: kategori,
      nominal: nominal,
      deskripsi: deskripsi,
      date: tanggal,
      // date: '2022-12-05',
      time: moment(new Date()).format('LT'),
    };
    // setVisibleSuccess(false);
    console.log('data form = ' + JSON.stringify(data));
    try {
      db.insertDataTransaksi(data)
        .then(data => {
          // navigation.navigate('Home');
          setTimeout(() => {
            setVisibleSuccess(false);
            navigation.navigate('Home');
          }, 500);
        })
        .catch(err => console.log('err ' + err));
    } catch (err) {
      console.log('somthing err3 = ' + err);
      ToastAndroid.showWithGravity(
        'Internal Error',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      navigation.navigate('Home');
    }
  };

  const handleDoSubmit = () => {
    setLoading(false);
    doSubmit();
    setVisibleSuccess(true);
  };

  const handleSubmit = () => {
    if (
      transaksi === '' ||
      jenisTransaksi === '' ||
      kategori === '' ||
      nominal === 0 ||
      deskripsi === ''
    ) {
      return Alert.alert('Peringatan!!', 'Semua Inputan Harus Terisi');
    }
    setLoading(true);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <MyStatusBar backgroundColor="#006F78" barStyle="light-content" />
      {/* <GestureHandlerRootView> */}
      <KeyboardAwareScrollView extraHeight={0} style={{backgroundColor: '#006F78'}}>
        <ModalItem
          visible={loading}
          onChange={() => setLoading(false)}
          onSubmit={() => {
            handleDoSubmit();
          }}
        />
        <ModalItemSuccess visible={visibleSuccess} />
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
                    fontWeight: 'bold',
                    color: 'black'
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
