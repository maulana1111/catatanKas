import React, {useMemo, useRef, useCallback, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  LogBox,
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
} from '../../../redux/features/globalSlice';
const db = new Database();
import {useIsFocused} from '@react-navigation/native';
import {Bounce} from 'react-native-animated-spinkit';
import Modal from 'react-native-modal';

function Home() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {dataFilter, conditionDelete} = useSelector(state => state.globalStm);
  const [data, setData] = useState(null);
  const [dataPemasukan, setDataPemasukan] = useState([]);
  const [dataPengeluaran, setDataPengeluaran] = useState([]);
  const [totalPemasukan, setTotalPemasukan] = useState(0);
  const [totalPengeluaran, setTotalPengeluaran] = useState(0);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      if (dataFilter.status === false) {
        console.log('hit false');
        await db
          .getDataTransaksi('id001', 'pemasukan')
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
          .getDataTransaksi('id001', 'pengeluaran')
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginTop: 10,
          }}>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginRight: 10}}>
              <Image source={require('../../../assets/img_person.png')} />
            </View>
            <View>
              <Text style={Style.txt1}>Selamat Pagi</Text>
              <Text style={Style.txt2}>Toni Borrow</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity>
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
