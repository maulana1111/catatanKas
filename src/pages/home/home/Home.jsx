import React, {useMemo, useRef, useCallback, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  LogBox,
  PermissionsAndroid,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import MyStatusBar from '../../auth/component/StatusBar';
import {Style} from './style/index';
import Navigation from './component/Navigation';
import Card from './component/Card';
import BottomSheet from '@gorhom/bottom-sheet';
import BottomSheetNav from './component/BottomSheetNav';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ScreenBottomSheetFilter from './component/BottomSheetFilter';
import Database from '../../../utilSqlite/database';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  storeDataTransaksiIn,
  storeDataTransaksiOut,
  storeConditionDelete,
  storeUser,
  storeJumlahDataTransaksiIn,
  storeJumlahDataTransaksiOut,
} from '../../../redux/features/globalSlice';
const db = new Database();
import {useIsFocused} from '@react-navigation/native';
import {Bounce} from 'react-native-animated-spinkit';
import Modal from 'react-native-modal';
// var RNFS = require('react-native-fs');
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {useNavigation} from '@react-navigation/native';
import ModalAskDelete from './screenBill/component/ModalAskDelete';
import moment from 'moment';
import 'moment/locale/id';
import DoubleClick from 'react-native-double-click';
import { Alert } from 'react-native';

function Home() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {dataFilter, conditionDelete, dataUser} = useSelector(
    state => state.globalStm,
  );
  const [data, setData] = useState(null);
  const [dataPemasukan, setDataPemasukan] = useState([]);
  const [dataPengeluaran, setDataPengeluaran] = useState([]);
  const [totalPemasukan, setTotalPemasukan] = useState(0);
  const [totalPengeluaran, setTotalPengeluaran] = useState(0);
  const [loading, setLoading] = useState(false);
  const [visibleAsk, setVisibleAsk] = useState(false);
  const [total, setTotal] = useState(0);
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();

  const date = new Date();
  const strWaktu = moment(date).format('LT');
  const waktu = strWaktu.split('.');
  // console.log("wakttu = "+waktu[0]);
  let strText = '';
  if (waktu[0] >= 2 && waktu[0] < 10) {
    strText = 'Selamat Pagi';
  }
  if (waktu[0] >= 10 && waktu[0] < 14) {
    strText = 'Selamat Siang';
  }
  if (waktu[0] >= 14 && waktu[0] < 20) {
    strText = 'Selamat Sore';
  }
  if (waktu[0] >= 20) {
    strText = 'Selamat Malam';
  }

  let currentCount = 0;

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      if (dataFilter.status === false) {
        // console.log('hit false');
        await db
          .getDataTransaksi(dataUser.data.id_user, 'pemasukan')
          .then(data1 => {
            if (data1 !== null) {
              let totall = 0;
              for (const row of data1) {
                totall = totall + row.nominal;
              }
              setTotalPemasukan(totall);
              dispatch(
                storeJumlahDataTransaksiIn({
                  data: totall,
                }),
              );
            } else {
              setTotalPemasukan(0);
              dispatch(
                storeJumlahDataTransaksiIn({
                  data: 0,
                }),
              );
            }
            setDataPemasukan(data1);
            dispatch(
              storeDataTransaksiIn({
                data: data1,
              }),
            );
          })
          .catch(err => {
            setDataPemasukan(null);
            setTotalPemasukan(0);
            dispatch(
              storeJumlahDataTransaksiIn({
                data: 0,
              }),
            );
            dispatch(
              storeDataTransaksiIn({
                data: null,
              }),
            );
            console.log('error home1 = ' + err);
          });

        await db
          .getDataTransaksi(dataUser.data.id_user, 'pengeluaran')
          .then(data2 => {
            if (data2 !== null) {
              let total = 0;
              for (const row of data2) {
                total = total + row.nominal;
              }
              setTotalPengeluaran(total);
              dispatch(
                storeJumlahDataTransaksiOut({
                  data: total,
                }),
              );
            } else {
              setTotalPengeluaran(0);
              dispatch(
                storeJumlahDataTransaksiOut({
                  data: 0,
                }),
              );
            }
            setDataPengeluaran(data2);
            dispatch(storeDataTransaksiOut({data: data2}));
          })
          .catch(err => {
            console.log('error home2 = ' + err);
            setDataPengeluaran(null);
            setTotalPengeluaran(0);
            dispatch(
              storeJumlahDataTransaksiOut({
                data: 0,
              }),
            );
            dispatch(
              storeDataTransaksiOut({
                data: null,
              }),
            );
          });
      }
      if (dataFilter.status === true) {
        // console.log('hit true');
        await db
          .getDataTransaksiWhere(
            dataUser.data.id_user,
            'pemasukan',
            dataFilter.data.urutan_pemasukan,
            dataFilter.data.urutan_pengeluaran,
            dataFilter.data.real_tanggal_dari,
            dataFilter.data.real_tanggal_sampai,
            dataFilter.data.jenis_transaksi,
          )
          .then(data1 => {
            if (data1 !== null) {
              let total = 0;
              for (const row of data1) {
                total = total + row.nominal;
              }
              setTotalPemasukan(total);
              dispatch(
                storeJumlahDataTransaksiIn({
                  data: total,
                }),
              );
            } else {
              setTotalPemasukan(0);
              dispatch(
                storeJumlahDataTransaksiIn({
                  data: 0,
                }),
              );
            }
            setDataPemasukan(data1);
            dispatch(
              storeDataTransaksiIn({
                data: data1,
              }),
            );
          })
          .catch(err => {
            console.log('error home3 = ' + err);
            setTotalPemasukan(0);
            dispatch(
              storeJumlahDataTransaksiIn({
                data: 0,
              }),
            );
            setDataPemasukan(null);
            dispatch(
              storeDataTransaksiIn({
                data: null,
              }),
            );
          });
        await db
          .getDataTransaksiWhere(
            dataUser.data.id_user,
            'pengeluaran',
            dataFilter.data.urutan_pemasukan,
            dataFilter.data.urutan_pengeluaran,
            dataFilter.data.real_tanggal_dari,
            dataFilter.data.real_tanggal_sampai,
            dataFilter.data.jenis_transaksi,
          )
          .then(data2 => {
            if (data2 !== null) {
              let total = 0;
              for (const row of data2) {
                total = total + row.nominal;
              }
              setTotalPengeluaran(total);
              dispatch(
                storeJumlahDataTransaksiOut({
                  data: total,
                }),
              );
            } else {
              setTotalPengeluaran(0);
              dispatch(
                storeJumlahDataTransaksiOut({
                  data: 0,
                }),
              );
            }
            setDataPengeluaran(data2);
            dispatch(storeDataTransaksiOut({data: data2}));
          })
          .catch(err => {
            console.log('error home4 = ' + err);
            setTotalPengeluaran(0);
            dispatch(
              storeJumlahDataTransaksiOut({
                data: 0,
              }),
            );
            setDataPengeluaran(null);
            dispatch(storeDataTransaksiOut({data: null}));
          });
      }
      setLoading(false);
    };
    if (isFocused) {
      try {
        getData();
      } catch (err) {
        console.log('somthing err = ' + err);
        ToastAndroid.showWithGravity(
          'Internal Error',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
        navigation.navigate("SecScreen");
      }
    }
    dispatch(storeConditionDelete({condition: false}));
  }, [isFocused, dataFilter.status, conditionDelete]);

  useEffect(() => {
    setTotal(totalPemasukan - totalPengeluaran);
  }, [totalPemasukan, totalPengeluaran]);

  useEffect(() => {
    requestStoragePermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Permission title',
            message: 'Permission message',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the EXTERNAL_STORAGE');
        } else {
          console.log('EXTERNAL_STORAGE permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };
    requestStoragePermission();
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      doBackPressHandler,
    );

    return () => backHandler.remove();
  }, []);

  const doBackPressHandler = () => {
    if (navigation.isFocused()) {
      currentCount++;
      if (currentCount === 1) {
        ToastAndroid.showWithGravity(
          'Tekan Lagi Untuk Keluar Aplikasi !',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      } else {
        BackHandler.exitApp();
      }
      setTimeout(() => {
        currentCount = 0;
      }, 2000);
    } else {
      navigation.goBack();
    }
    return true;
  };

  const chooseFile = async () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: dataUser.data.foto,
      },
    };
    await launchImageLibrary(options, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        console.log('Hasil picker = ' + JSON.stringify(source));
      }
    });
  };

  const handleLogout = async () => {
    setVisibleAsk(true);
  };
  const doLogout = async () => {
    const dt = {
      status: false,
      data: {
        id_user: '',
        nama_user: '',
        email: '',
        foto: '',
      },
    };
    dispatch(
      storeUser({
        dt,
      }),
    );
    try {
      await GoogleSignin.signOut();
      setVisibleAsk(false);
      navigation.navigate('SecScreen');
      // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  // CameraRoll.getPhotos(dataUser.data.foto)
  // console.log('path = ' + dataUser.data.link_foto);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView>
        <MyStatusBar backgroundColor="#40300F" barStyle="light-content" />
        <Modal isVisible={loading}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Bounce size={48} color="#FFF" />
          </View>
        </Modal>
        <ModalAskDelete
          visible={visibleAsk}
          title="Keluar Aplikasi"
          desc={'Apakah Anda Yakin Ingin Keluar Dari Aplikasi ini ?'}
          onClickHandle={() => doLogout()}
          onClickCancel={() => setVisibleAsk(false)}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginTop: 10,
          }}>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginRight: 10}}>
              <Image
                source={{uri: dataUser.data.link_foto}}
                style={{height: 40, width: 40}}
              />
            </View>
            <View>
              <Text style={Style.txt1}>{strText}</Text>
              <Text style={Style.txt2}>{dataUser.data.nama_user}</Text>
            </View>
          </View>
          <View>
            {/* <TouchableOpacity onPress={() => chooseFile()}> */}
            <TouchableOpacity onPress={() => handleLogout()}>
              <Image source={require('../../../assets/logout_btn.png')} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Card nominal={total} state={loading} />
        </View>
        <View
          style={{
            marginVertical: 7,
          }}>
          <Navigation />
        </View>
        <BottomSheetNav />
        <ScreenBottomSheetFilter state={'home'} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#40300F',
  },
});

export default Home;
