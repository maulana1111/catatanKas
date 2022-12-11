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

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      if (dataFilter.status === false) {
        console.log('hit false');
        await db
          .getDataTransaksi(dataUser.data.id, 'pemasukan')
          .then(data1 => {
            if (data1 !== null) {
              let totall = 0;
              for (const row of data1) {
                totall = totall + row.nominal;
              }
              setTotalPemasukan(totall);
            }
            setDataPemasukan(data1);
            dispatch(
              storeDataTransaksiIn({
                data: data1,
              }),
            );
          })
          .catch(err => {
            console.log('error home1 = ' + err);
          });

        await db
          .getDataTransaksi(dataUser.data.id, 'pengeluaran')
          .then(data2 => {
            if (data2 !== null) {
              let total = 0;
              for (const row of data2) {
                total = total + row.nominal;
              }
              setTotalPengeluaran(total);
            }
            setDataPengeluaran(data2);
            dispatch(storeDataTransaksiOut({data: data2}));
          })
          .catch(err => {
            console.log('error home2 = ' + err);
          });
      }
      if (dataFilter.status === true) {
        console.log('hit true');
        await db
          .getDataTransaksiWhere(
            'id001',
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
              setDataPemasukan(data1);
              dispatch(
                storeDataTransaksiIn({
                  data: data1,
                }),
              );
            }
          })
          .catch(err => {
            console.log('error home3 = ' + err);
            setTotalPemasukan(0);
            setDataPemasukan(null);
            dispatch(
              storeDataTransaksiIn({
                data: null,
              }),
            );
          });
        await db
          .getDataTransaksiWhere(
            'id001',
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
              setDataPengeluaran(data2);
              dispatch(storeDataTransaksiOut({data: data2}));
            }
          })
          .catch(err => {
            console.log('error home4 = ' + err);
            setTotalPengeluaran(0);
            setDataPengeluaran(null);
            dispatch(storeDataTransaksiOut({data: null}));
          });
      }
      setLoading(false);
    };
    isFocused && getData();
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
      console.log('Response = ', response);

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
      navigation.navigate('SecScreen');
      // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  let img = dataUser.data.foto;
  // CameraRoll.getPhotos(dataUser.data.foto)
  console.log('path = ' + RNFS.PicturesDirectoryPath);

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
              {/* <Image source={require('../../../assets/img_person.png')} /> */}
              <Image
                source={{
                  // uri: `file:///data/user/0/com.catatankas/cache/rn_image_picker_lib_temp_d3fc6f3b-6c7f-49ef-b958-2c845a3a7a5c.jpg`,
                  // uri: `file:/${RNFS.PicturesDirectoryPath}/${dataUser.data.foto}`,
                  uri: `file:///storage/emulated/0/DCIM/Pictures/${dataUser.data.foto}`,
                }}
                style={{height: 40, width: 40}}
              />
              {/* /storage/emulated/0/Pictures/image_1670674560014.jpg */}
              {/* <Image
                source={{
                  uri: 'file://storage/emulated/0/DCIM/image_1670664930580.jpg',
                }}
              /> */}
            </View>
            <View>
              <Text style={Style.txt1}>Selamat Pagi</Text>
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
