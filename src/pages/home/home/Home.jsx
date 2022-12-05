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
const db = new Database();

function Home() {
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
      await db
        .getDataTransaksi('id001', 'pemasukan')
        .then(data => {
          // console.log('data get = ' + JSON.stringify(data));
          setDataPemasukan(JSON.parse(JSON.stringify(data)));
        })
        .catch(err => {
          console.log('error home = ' + err);
        });

      await db
        .getDataTransaksi('id001', 'pengeluaran')
        .then(data => {
          // console.log("data = "+JSON.stringify(data));
          setDataPengeluaran(JSON.parse(JSON.stringify(data)));
        })
        .catch(err => {
          console.log('error home = ' + err);
        });
      const dtPem = JSON.parse(JSON.stringify(dataPemasukan));
      const dtPen = JSON.parse(JSON.stringify(dataPengeluaran));
      dtPem.map(item => {
        setTotalPemasukan(totalPemasukan + item.nominal);
      });
      dtPen.map(item => {
        setTotalPengeluaran(totalPengeluaran + item.nominal);
      });

      setTotal(totalPemasukan - totalPengeluaran);
      console.log("data_nominal = "+setTotal);
      setLoading(false);
    };
    getData();
  }, []);
  // console.log("data pemas = "+totalPemasukan);

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
        <BottomSheetNav
          dataPengeluaran={dataPengeluaran}
          dataPemasukan={dataPemasukan}
        />
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
  // contentContainer: {
  //   flex: 1,
  //   alignItems: 'center',
  // },
});

export default Home;
