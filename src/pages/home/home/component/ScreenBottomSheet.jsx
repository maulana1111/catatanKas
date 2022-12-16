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
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
// import {NOTES_SVG, LOGO_SVG, HTML} from './component_html/assets/StrHTML';
// import HtmlGenerate, {logo} from './component_html/StrHTML';
import GeneratePDF from './component_html/GeneratePDF';
import ModalEmpty from './component_html/ModalEmpty';

// import {
//   svg_notes,
//   logo,
//   SvgGayaHidup,
//   SvgHiburan,
//   SvgInstant,
//   SvgMakananMinuman,
//   SvgTransfer,
//   SvgTunai,
// } from './component_html/assets/ItemSVG';

const db = new Database();
const date = new Date();

function ScreenBottomSheet() {
  const {
    dataTransaksiIn,
    dataTransaksiOut,
    jumlahDataTransaksiIn,
    jumlahDataTransaksiOut,
    dataUser,
    dataFilter,
  } = useSelector(state => state.globalStm);
  // console.log('jumlah in ' + jumlahDataTransaksiIn);
  const dispatch = useDispatch();
  let strPem = 'Pemasukan = ';
  let strPen = 'Pengeluaran = ';

  const [visible, setvisible] = useState(false);
  const [visibleModalEmpty, setVisibleModalEmpty] = useState(false);
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

  // const sharePemasukan = async () => {
  //   try {
  //     const result = await Share.share({
  //       message: JSON.stringify(strPem),
  //     });
  //     // console.log('result = ' + result);
  //     if (result.action === Share.sharedAction) {
  //       if (result.activityType) {
  //         // shared with activity type of result.activityType
  //       } else {
  //         // shared
  //       }
  //     } else if (result.action === Share.dismissedAction) {
  //       // dismissed
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  const sharePengeluaran = async () => {
    try {
      const result = await Share.share({
        message: JSON.stringify(strPen),
      });
      // console.log('result = ' + result);
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

  async function createPdfPemasukan() {
    var t = await GeneratePDF(
      dataTransaksiIn,
      dataTransaksiOut,
      jumlahDataTransaksiIn,
      jumlahDataTransaksiOut,
      dataUser,
      dataFilter,
    );
    // console.log(t);
    // <HtmlGenerate />
    // dataTransaksiIn.length === 0 && dataTransaksiOut.length === 0
    //   ? setvisible(true)
    //   : GeneratePDF();
    let file = await RNPrint.print({
      html: t,
    });
    await RNPrint.print({filePath: file.filePath});
    // let name_pdf =
    //   'document_pemasukan_' +
    //   Math.floor(date.getTime() + date.getSeconds() / 2);
    // let options = {
    //   html: t,
    //   fileName: name_pdf,
    //   directory: 'Documents',
    //   base64: true
    // };
    // let file = await RNHTMLtoPDF.convert(options);
    // console.log(file.filePath);
    // console.log('res = ' + file);
    // return alert(file.filePath);
  }

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
      setvisible(false);
      setSecVisible(true);
      setTimeout(() => {
        setSecVisible(false);
        dispatch(
          storeConditionDelete({
            condition: true,
          }),
        );
      }, 500);
    });
  };
  const onChangeVisible = () => {
    setVisibleModalEmpty(false);
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
            <View></View>
          </View>
          <ModalEmpty
            text={"Data Transaksi Kosong!"}
            visible={visibleModalEmpty}
            onChange={() => onChangeVisible()}
          />
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
