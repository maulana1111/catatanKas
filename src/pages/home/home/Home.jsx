import React, {useMemo, useRef, useCallback, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
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
} from '../../../redux/features/globalSlice';
const db = new Database();
import {useIsFocused} from '@react-navigation/native';

function Home() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {dataFilter} = useSelector(state => state.globalStm);
  const [data, setData] = useState(null);
  const [dataPemasukan, setDataPemasukan] = useState([]);
  const [dataPengeluaran, setDataPengeluaran] = useState([]);
  const [totalPemasukan, setTotalPemasukan] = useState(0);
  const [totalPengeluaran, setTotalPengeluaran] = useState(0);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      if (dataFilter.status !== true) {
        await db
          .getDataTransaksi('id001', 'pemasukan')
          .then(data1 => {
            if (data1 !== null) {
              let total = 0;
              for (const row of data1) {
                total = total + row.nominal;
              }
              setTotalPemasukan(total);
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
      } else {
        console.log("data from redux = "+JSON.stringify(dataFilter));
        await db
          .getDataTransaksiWhere(
            'id001',
            'pemasukan',
            dataFilter.urutan_pemasukan,
            dataFilter.urutan_pengeluaran,
            dataFilter.tanggal_dari,
            dataFilter.tanggal_sampai,
            dataFilter.jenis_transaksi,
          )
          .then(data1 => {
            if (data1 !== null) {
              let total = 0;
              for (const row of data1) {
                total = total + row.nominal;
              }
              setTotalPemasukan(total);
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
          .getDataTransaksiWhere('id001', 'pengeluaran')
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
      setLoading(false);
    };
    isFocused && getData();
  }, [isFocused, dataFilter]);

  useEffect(() => {
    if (dataPemasukan && dataPengeluaran) {
      // console.log('data pemasukan = ' + totalPemasukan);
      setTotal(totalPemasukan - totalPengeluaran);
    }
  }, [totalPemasukan, totalPengeluaran]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView>
        <MyStatusBar backgroundColor="#40300F" barStyle="light-content" />
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
        <ScreenBottomSheetFilter />
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
