import React, {Fragment} from 'react';
import {View, Text, Image, StyleSheet, Share} from 'react-native';
import ItemScreen from './component_item/item-screen';

import {useSelector, useDispatch} from 'react-redux';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import ModalAskDelete from '../screenBill/component/ModalAskDelete';
import ModalItemSuccess from '../screenBill/component/ModalSuccess';
import {storeConditionDelete} from '../../../../redux/features/globalSlice';
import Database from '../../../../utilSqlite/database';
const db = new Database();

function ScreenBottomSheet() {
  const {dataTransaksiIn, dataTransaksiOut} = useSelector(
    state => state.globalStm,
  );
  const dispatch = useDispatch();
  let strPem = 'Pemasukan = ';
  let strPen = 'Pengeluaran = ';

  const [visible, setvisible] = useState(false);
  const [secVisible, setSecVisible] = useState(false);
  const [id, setId] = useState('');

  const ChangeRupiah = number => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };

  if (dataTransaksiIn) {
    dataTransaksiIn.map(item => {
      let st =
        '( Tanggal Transaksi = ' +
        item.tanggal_transaksi +
        ', Waktu Transaksi = ' +
        item.waktu_transaksi +
        ', Kategori = ' +
        item.kategori +
        ', Nominal = ' +
        ChangeRupiah(item.nominal) +
        ', Jenis Transaksi = ' +
        item.transaksi +
        ') ';
      strPem += st;
    });
  }

  if (dataTransaksiOut) {
    dataTransaksiOut.map(item => {
      let txt =
        '( Tanggal Transaksi = ' +
        item.tanggal_transaksi +
        ', Waktu Transaksi = ' +
        item.waktu_transaksi +
        ', Kategori = ' +
        item.kategori +
        ', Nominal = ' +
        ChangeRupiah(item.nominal) +
        ', Jenis Transaksi = ' +
        item.transaksi +
        ') ';
      strPen += txt;
    });
  }

  const sharePemasukan = async () => {
    try {
      const result = await Share.share({
        message: JSON.stringify(strPem),
      });
      console.log('result = ' + result);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const sharePengeluaran = async () => {
    try {
      const result = await Share.share({
        message: JSON.stringify(strPen),
      });
      console.log('result = ' + result);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = id => {
    setvisible(true);
    setId(id);
  };

  const handleClickCancel = () => {
    setId(0);
    setvisible(false);
  };

  const doDelete = async () => {
    await db.deleteDataTransaksi(id).then(() => {
      setvisible(false)
      setSecVisible(true);
      setTimeout(() => {
        setSecVisible(false);
        dispatch(
          storeConditionDelete({
            condition: true,
          }),
        );
      }, 3000);
    });
  };

  return (
    <View>
      <View
        style={{
          paddingHorizontal: 24,
          // width: '100%',
          justifyContent: 'flex-start',
        }}>
        <View>
          <View style={styles.container}>
            <Text style={styles.txt1}>Pemasukan</Text>
            <TouchableOpacity onPress={() => sharePemasukan()}>
              <Image source={require('../../../../assets/Share.png')} />
            </TouchableOpacity>
          </View>

          <ModalItemSuccess
            visible={secVisible}
            text={'Berhasil menghapus transaksi'}
          />

          <ModalAskDelete
            visible={visible}
            title={'Hapus transaksi'}
            desc={
              'Apakah Anda yakin ingin menghapus transaksi ini? Periksa terlebih dahulu sebelum menghapus transaksi.'
            }
            onClickCancel={() => handleClickCancel()}
            onClickHandle={() => doDelete()}
          />

          {dataTransaksiIn !== null &&
            dataTransaksiIn.map((item, index) => {
              return (
                <View key={index}>
                  <ItemScreen
                    jenis={item.transaksi}
                    item={item}
                    onClick={id => handleDelete(id)}
                  />
                </View>
              );
            })}
        </View>
      </View>
      <View style={{marginVertical: 10}}>
        <Image source={require('../../../../assets/line.png')} />
      </View>
      <View
        style={{
          paddingHorizontal: 24,
          width: '100%',
          marginBottom: 200,
        }}>
        <View>
          <View style={styles.container}>
            <Text style={styles.txt1}>Pengeluaran</Text>
            <TouchableOpacity onPress={() => sharePengeluaran()}>
              <Image source={require('../../../../assets/Share.png')} />
            </TouchableOpacity>
          </View>

          {dataTransaksiOut !== null &&
            dataTransaksiOut.map((item, index) => {
              return (
                <View key={index}>
                  <ItemScreen
                    jenis={item.transaksi}
                    item={item}
                    onClick={id => handleDelete(id)}
                  />
                </View>
              );
            })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  txt1: {
    fontFamily: 'BalooBhaijaan2-SemiBold',
    fontSize: 16,
    color: '#40300F',
  },
});

export default ScreenBottomSheet;
