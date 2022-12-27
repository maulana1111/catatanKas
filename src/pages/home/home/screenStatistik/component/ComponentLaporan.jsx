import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Share,
  ScrollView,
} from 'react-native';
import TransaksiItem from './TransaksiItem.component';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native';
import GeneratePDFStatistik from '../../component/component_html/GeneratePDFStatistik';
import ModalEmpty from '../../component/component_html/ModalEmpty';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';

function ComponentLaporan({dataIn, dataOut}) {
  const dataPemasukan = new Array();
  const dataPengeluaran = new Array();
  let str = 'Pemasukan = ';
  const [visibleModalEmpty, setVisibleModalEmpty] = useState(false);

  const {
    dataStatistikIn,
    dataStatistikOut,
    jumlahDataStatistikIn,
    jumlahDataStatistikOut,
    dataUser,
  } = useSelector(state => state.globalStm);
  // console.log('data = ' + JSON.stringify(dataStatistikIn));
  const ChangeRupiah = number => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };

  if (dataStatistikIn.length !== 0 || dataStatistikOut.length !== 0) {
    dataStatistikIn.map(item => {
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
      str += txt;
    });

    str += ', Pengeluaran = ';

    dataStatistikOut.map(item => {
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
      str += txt;
    });
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: JSON.stringify(str),
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

  async function createPdfPemasukan() {
    var t = await GeneratePDFStatistik(
      dataStatistikIn,
      dataStatistikOut,
      jumlahDataStatistikIn,
      jumlahDataStatistikOut,
      dataUser,
    );
    if (dataStatistikIn.length < 1 && dataStatistikOut.length < 1) {
      setVisibleModalEmpty(true);
    } else {
      let file = await RNPrint.print({
        html: t,
      });
      await RNPrint.print({filePath: file.filePath});
    }

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
  const onChangeVisible = () => {
    setVisibleModalEmpty(false);
  };

  return (
    <View style={{padding: 16}}>
      <View style={styles.container}>
        <ModalEmpty
          text={'Data Kosong!'}
          visible={visibleModalEmpty}
          onChange={() => onChangeVisible()}
        />
        <ScrollView style={{marginBottom: 10}}>
          <Text style={styles.text}>Buku Pemasukan & Pengeluaran</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 3,
            }}>
            <View>
              <Text style={styles.text2}>Minggu ini</Text>
              <Text style={styles.text3}>{ChangeRupiah(dataIn - dataOut)}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => createPdfPemasukan()}>
                <Image source={require('./assets/Share.png')} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.SecCon}>
            <Text style={styles.text4}>Pemasukan</Text>
            <Text style={styles.text5}>+{ChangeRupiah(dataIn)}</Text>
          </View>
          <View>
            {dataStatistikIn &&
              dataStatistikIn.map((item, index) => {
                return (
                  <TransaksiItem
                    key={index}
                    text={item.jenis_transaksi}
                    text2={item.nominal}
                    state={item.transaksi}
                  />
                );
              })}
          </View>
          <View style={styles.SecCon}>
            <Text style={styles.text4}>Pengeluaran</Text>
            <Text style={styles.text5}>-{ChangeRupiah(dataOut)}</Text>
          </View>
          <View>
            {dataStatistikOut &&
              dataStatistikOut.map((item, index) => {
                return (
                  <TransaksiItem
                    key={index}
                    text={item.jenis_transaksi}
                    text2={item.nominal}
                    state={item.transaksi}
                  />
                );
              })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 234, 189, 1)',
    // justifyContent: 'flex-start',
    height: '89%',
    padding: 12,
    borderRadius: 16,
  },
  SecCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFD16C',
    borderTopStartRadius: 6,
    borderTopEndRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 10,
  },
  text: {
    fontFamily: 'BalooBhaijaan2-SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(64, 48, 15, 1)',
  },
  text2: {
    fontFamily: 'BalooBhaijaan2-Regular',
    fontSize: 14,
    lineHeight: 21,
    color: 'rgba(154, 154, 154, 1)',
  },
  text3: {
    fontFamily: 'BalooBhaijaan2-SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: '#000',
  },
  text4: {
    fontFamily: 'BalooBhaijaan2-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#795B1B',
  },
  text5: {
    fontFamily: 'BalooBhaijaan2-SemiBold',
    fontSize: 10,
    lineHeight: 15,
    color: '#000',
  },
});

export default ComponentLaporan;
