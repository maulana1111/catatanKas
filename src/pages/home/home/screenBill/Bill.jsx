import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  FlatList,
  DevSettings,
  Share,
} from 'react-native';
import MyStatusBar from '../../../auth/component/StatusBar';
import {useNavigation} from '@react-navigation/native';
import ScreenBottomSheetFilter from '../component/BottomSheetFilter';
import {useDispatch, useSelector} from 'react-redux';
import {
  storeGlobalChildSheet,
  storeDataTagihanIn,
  storeDataTagihanOut,
  storeDataFilterTagihan,
} from '../../../../redux/features/globalSlice';
import Database from '../../../../utilSqlite/database';
const db = new Database();
import {useIsFocused} from '@react-navigation/native';
import ModalItemSuccess from './component/ModalSuccess';
import ModalAskDelete from './component/ModalAskDelete';
import ListItemBill from './component/ListItemBill';
import moment from 'moment';
import 'moment/locale/id';
import ModalEmpty from '../component/component_html/ModalEmpty';
import GeneratePDF from '../component/component_html/GeneratePDF';
import GeneratePDFTagihan from '../component/component_html/GeneratePDFTagihan';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';

function Bill() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const {conditionChildSheet, dataFilterTagihan, dataUser} = useSelector(
    state => state.globalStm,
  );
  const dispatch = useDispatch();
  const [dataTagihanIn, setDataTagihanIn] = useState([]);
  const [dataTagihanOut, setDataTagihanOut] = useState([]);
  const [totalPemasukan, setTotalPemasukan] = useState(0);
  const [totalPengeluaran, setTotalPengeluaran] = useState(0);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visiblee, setVisiblee] = useState(false);
  const [idData, setIdData] = useState(null);
  const [reloadPage, setReloadPage] = useState(0);
  const [visibleModalEmpty, setVisibleModalEmpty] = useState(false);
  // console.log('status = ' + dataFilterTagihan.status);
  const dataPemasukan = new Array();
  const dataPengeluaran = new Array();

  useEffect(() => {
    const getData = async () => {
      // setLoading(true);
      if (dataFilterTagihan.status === false) {
        // console.log('tidak hit filter');
        await db
          .getDataTagihan(dataUser.data.id_user, 'pemasukan')
          .then(data1 => {
            if (data1) {
              let totall = 0;
              for (const row of data1) {
                totall = totall + row.nominal;
              }
              setTotalPemasukan(totall);
              setDataTagihanIn(data1);
            }
          })
          .catch(err => {
            console.log('error bill1 = ' + err);
          });

        await db
          .getDataTagihan(dataUser.data.id_user, 'pengeluaran')
          .then(data2 => {
            if (data2) {
              let totall = 0;
              for (const row of data2) {
                totall = totall + row.nominal;
              }
              setTotalPengeluaran(totall);
              setDataTagihanOut(data2);
            }
          })
          .catch(err => {
            console.log('error bill2 = ' + err);
          });
      }
      if (dataFilterTagihan.status === true) {
        // console.log('hit filter');
        await db
          .getDataTagihanWhere(
            dataUser.data.id_user,
            'pemasukan',
            dataFilterTagihan.data.urutan_pemasukan,
            dataFilterTagihan.data.urutan_pengeluaran,
            dataFilterTagihan.data.real_tanggal_dari,
            dataFilterTagihan.data.real_tanggal_sampai,
            dataFilterTagihan.data.jenis_tagihan,
          )
          .then(data1 => {
            if (data1) {
              let totall = 0;
              for (const row of data1) {
                totall = totall + row.nominal;
              }
              setTotalPemasukan(totall);
              setDataTagihanIn(data1);
            }
          })
          .catch(err => {
            console.log('error filter1 = ' + err);
          });

        await db
          .getDataTagihanWhere(
            dataUser.data.id_user,
            'pengeluaran',
            dataFilterTagihan.data.urutan_pemasukan,
            dataFilterTagihan.data.urutan_pengeluaran,
            dataFilterTagihan.data.real_tanggal_dari,
            dataFilterTagihan.data.real_tanggal_sampai,
            dataFilterTagihan.data.jenis_tagihan,
          )
          .then(data2 => {
            if (data2) {
              let totall = 0;
              for (const row of data2) {
                totall = totall + row.nominal;
              }
              setTotalPengeluaran(totall);
              setDataTagihanOut(data2);
            }
          })
          .catch(err => {
            console.log('error filter2 = ' + err);
          });
      }
    };
    getData();
  }, [isFocused, dataFilterTagihan.status, reloadPage]);

  const ChangeRupiah = number => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };

  // useEffect(() => {
  if (dataTagihanIn.length !== 0) {
    dataTagihanIn.map(item => {
      data =
        '(tanggal tagihan = ' +
        item.tanggal_tagihan +
        ', Judul = ' +
        item.kategori +
        ', Jenis Tagihan = ' +
        item.jenis_tagihan +
        ', Waktu Tagihan = ' +
        ChangeRupiah(item.nominal) +
        ')';
      dataPemasukan.push(data);
    });
  }

  if (dataTagihanOut.length !== 0) {
    dataTagihanOut.map(item => {
      data1 =
        'tanggal tagihan = ' +
        item.tanggal_tagihan +
        ', Judul = ' +
        item.kategori +
        ', Jenis Tagihan = ' +
        item.jenis_tagihan +
        ', Waktu Tagihan = ' +
        ChangeRupiah(item.nominal);
      dataPengeluaran.push(data1);
    });
  }
  // }, []);
  // console.log('data pemasukan = ' + dataPemasukan);

  const handleFilter = async () => {
    dispatch(storeGlobalChildSheet({condition: !conditionChildSheet}));
  };

  const handleDelete = id => {
    setVisible(true);
    setIdData(id);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const doDelete = async () => {
    await db.deleteDataTagihan(idData).then(res => {
      setVisible(false);
      setVisiblee(true);
      setTimeout(() => {
        setVisiblee(false);
        setReloadPage(reloadPage + 1);
      }, 3000);
    });
  };

  async function createPdfPemasukan() {
    var t = await GeneratePDFTagihan(
      dataTagihanIn,
      dataTagihanOut,
      totalPemasukan,
      totalPengeluaran,
      dataUser,
      dataFilterTagihan,
    );
    // console.log(t);
    // <HtmlGenerate />
    dataTagihanIn.length === 0 &&
      dataTagihanOut.length === 0 &&
      setVisibleModalEmpty(true);
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

  const onChangeVisible = () => {
    setVisibleModalEmpty(false);
  };

  const handleBack = () => {
    dispatch(
      storeDataFilterTagihan({
        status: false,
        urutan_pengeluaran: '',
        urutan_pemasukan: '',
        tanggal_dari: '',
        tanggal_sampai: '',
        jenis_tagihan: '',
        real_tanggal_dari: '',
        real_tanggal_sampai: '',
      }),
    );

    navigation.navigate('Home');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <SafeAreaView>
        <MyStatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View>
          <ModalEmpty
            visible={visibleModalEmpty}
            onChange={() => onChangeVisible()}
          />
          <ModalItemSuccess
            visible={visiblee}
            text={'berhasil menghapus tagihan'}
          />
          <ModalAskDelete
            visible={visible}
            title={'Hapus Tagihan'}
            desc={
              'Apakah Anda yakin ingin menghapus bill ini? Periksa terlebih dahulu sebelum menghapus bill'
            }
            onClickHandle={() => doDelete()}
            onClickCancel={() => handleCancel()}
          />
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 16,
              marginTop: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                handleBack();
              }}>
              <View style={styles.back}>
                <Image
                  source={require('./assets/arrow_left.png')}
                  style={styles.imageBack}
                />
              </View>
            </TouchableOpacity>
            <View style={{marginLeft: '32%'}}>
              <Text style={styles.title}>Tagihan</Text>
            </View>
          </View>
          <View style={{paddingHorizontal: 16}}>
            <View style={{marginVertical: 5}} />
            {dataFilterTagihan.status === true && (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.text1}>Tagihan By Filter</Text>
                <Text style={styles.text2}>
                  {dataFilterTagihan.data.tanggal_dari} -
                  {dataFilterTagihan.data.tanggal_sampai}
                </Text>
              </View>
            )}

            <View style={{marginVertical: 5}} />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={styles.bg}>
                <TouchableOpacity onPress={() => handleFilter()}>
                  <Image source={require('./assets/filter.png')} />
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.bg}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('FormTambahTagihan');
                    }}>
                    <Image source={require('./assets/capture_bill.png')} />
                  </TouchableOpacity>
                </View>
                <View style={{marginHorizontal: 5}} />
                <View style={styles.bg}>
                  <TouchableOpacity onPress={() => createPdfPemasukan()}>
                    <Image source={require('./assets/Share.png')} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{marginVertical: 5}} />
            <View style={styles.container}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={[styles.text1, {color: '#000'}]}>Pemasukan</Text>
                <View />
              </View>
              <FlatList
                data={dataTagihanIn}
                renderItem={({item}) => (
                  <ListItemBill
                    data={item}
                    onClickDelete={id => handleDelete(id)}
                  />
                )}
              />
            </View>

            <View style={{marginVertical: 5}} />
            <View style={styles.container}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={[styles.text1, {color: '#000'}]}>Pengeluaran</Text>
                <View />
              </View>

              <FlatList
                data={dataTagihanOut}
                renderItem={({item}) => {
                  return (
                    <ListItemBill
                      data={item}
                      onClickDelete={id => handleDelete(id)}
                    />
                  );
                }}
              />
            </View>
          </View>
        </View>
        <ScreenBottomSheetFilter state={'tagihan'} />
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  bg: {backgroundColor: 'rgba(252, 188, 49, 0.4)', padding: 2, borderRadius: 8},
  imageBack: {
    width: 19,
    height: 19,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 6,
  },
  container: {
    justifyContent: 'flex-start',
    padding: 12,
    backgroundColor: 'rgba(255, 230, 175, 0.2)',
    borderRadius: 16,
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
  text1: {
    fontFamily: 'BalooBhaijaan2-SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: '#DBA42D',
  },
  text2: {
    fontFamily: 'BalooBhaijaan2-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
  },
});

export default Bill;
