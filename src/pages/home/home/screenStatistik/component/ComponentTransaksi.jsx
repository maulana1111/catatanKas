import React, {useState, useEffect} from 'react';
import GrafikScreenTransaksi from './GrafikScreenTransaksi';
import GrafikScreenPemasukan from './GrafikScreenPemasukan';
import GrafikScreenPengeluaran from './GrafikScreenPengeluaran';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ToastAndroid,
  ScrollView,
  Share,
} from 'react-native';
// import Database from '../../../../../utilSqlite/database';
import Database from '../../../../../../android/app/src/main/assets/database';
const db = new Database();
import {useSelector} from 'react-redux';

function ComponentTransaksi({dataIn, dataOut}) {
  const [stateMetode, setStateMetode] = useState('transaksi');

  const mathPem = Math.floor((dataIn * 100) / (dataIn+dataOut));
  const mathPeng = Math.floor((dataOut * 100) / (dataIn+dataOut));

  const HandleChangeState = e => {
    setStateMetode(e);
  };
  const ChangeRupiah = number => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };


  return (
    <View>
      <ScrollView>
        <View>
          {/* atas */}
          <View style={[styles.secondCon, {marginHorizontal: 16}]}>
            <Text style={styles.text2}>Transaksi</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 3,
              }}>
              <View>
                <Text style={styles.text3}>Minggu ini</Text>
                <Text style={styles.text4}>
                  {ChangeRupiah(dataIn - dataOut)}
                </Text>
              </View>
              <View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 5,
              }}>
              <Text style={[styles.text4, {fontSize: 14}]}>Pemasukan</Text>
              <Text
                style={[
                  styles.text4,
                  {fontSize: 12, color: '#00505E'},
                ]}>
                +{dataIn !== null ? ChangeRupiah(dataIn) : 'Rp.0'}
              </Text>
            </View>
            <View style={styles.bg1}>
              <View
                style={[
                  styles.bg2,
                  {
                    backgroundColor: '#00505E',
                    width: `${dataIn !== null ? mathPem + '%' : '0%'}`,
                  },
                ]}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 5,
              }}>
              <Text style={[styles.text4, {fontSize: 14}]}>Pengeluaran</Text>
              <Text style={[styles.text4, {fontSize: 12, color: '#7F0011'}]}>
                -{dataOut !== null ? ChangeRupiah(dataOut) : 'Rp.0'}
              </Text>
            </View>
            <View style={styles.bg1}>
              <View
                style={[
                  styles.bg2,
                  {
                    backgroundColor: '#A92728',
                    width: `${dataOut !== null ? mathPeng + '%' : '0%'}`,
                  },
                ]}
              />
            </View>
          </View>
          <View style={{marginVertical: 10}} />
          {/* bawah */}
          <View style={[styles.secondCon, {borderRadius: 0}]}>
            <Text style={styles.text2}>Transaksi</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 3,
              }}>
              <View>
                <Text style={styles.text3}>Minggu ini</Text>
                <Text style={styles.text4}>
                  {ChangeRupiah(dataIn - dataOut)}
                </Text>
              </View>
              <View></View>
            </View>
            <View style={styles.thirdCon}>
              <TouchableOpacity onPress={() => HandleChangeState('transaksi')}>
                <View
                  style={[
                    styles.bg3,
                    stateMetode === 'transaksi' && {
                      backgroundColor: '#DBA42D',
                      borderBottomLeftRadius: 16,
                      borderTopLeftRadius: 16,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.text6,
                      stateMetode === 'transaksi' && {color: '#7F0011'},
                    ]}>
                    Transaksi
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => HandleChangeState('pemasukan')}>
                <View
                  style={[
                    styles.bg3,
                    stateMetode === 'pemasukan' && {
                      backgroundColor: '#DBA42D',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.text6,
                      stateMetode === 'pemasukan' && {color: '#7F0011'},
                    ]}>
                    Pemasukan
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => HandleChangeState('pengeluaran')}>
                <View
                  style={[
                    styles.bg3,
                    stateMetode === 'pengeluaran' && {
                      backgroundColor: '#DBA42D',
                      borderBottomRightRadius: 16,
                      borderTopRightRadius: 16,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.text6,
                      stateMetode === 'pengeluaran' && {color: '#7F0011'},
                    ]}>
                    Pengeluaran
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              {stateMetode === 'transaksi' && (
                <GrafikScreenTransaksi dataIn={dataIn} dataOut={dataOut} />
              )}
              {stateMetode === 'pemasukan' && (
                <GrafikScreenPemasukan dataIn={dataIn} />
              )}
              {stateMetode === 'pengeluaran' && (
                <GrafikScreenPengeluaran dataOut={dataOut} />
              )}
            </View>
          </View>
          {/* <View style={{marginVertical: 70}} /> */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bg1: {
    backgroundColor: '#B4B4B4',
    height: 24,
    borderRadius: 16,
  },
  bg2: {
    height: 24,
    borderRadius: 16,
  },
  bg3: {
    // padding:10
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
  text1: {
    fontFamily: 'BalooBhaijaan2-SemiBold',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    color: '#000',
  },
  text1Selected: {
    color: '#FCBC31',
  },
  cardBtn: {
    paddingVertical: 5,
    paddingHorizontal: 13,
    // backgroundColor: '#FCBC31',
    borderRadius: 16,
  },
  CardSelected: {
    backgroundColor: '#FFEBBE',
    borderRadius: 16,
  },
  firstCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: '#FFEBBE',
    borderRadius: 16,
    width: 164,
    borderWidth: 1,
  },
  secondCon: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    justifyContent: 'flex-start',
    marginBottom: 0,
  },
  fourthCon: {
    backgroundColor: 'rgba(255, 230, 175, 0.3)',
    borderRadius: 16,
    padding: 16,
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  thirdCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: '#FFEBBE',
    borderRadius: 20,
    height: 35,
    // width: 210,
    justifyContent: 'flex-start',
    borderWidth: 1,
  },
  text2: {
    fontFamily: 'BalooBhaijaan2-SemiBold',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  text3: {
    fontFamily: 'BalooBhaijaan2-Regular',
    fontSize: 14,
    lineHeight: 21,
    color: '#00505E',
  },
  text4: {
    fontFamily: 'BalooBhaijaan2-SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: '#000',
  },
  text5: {
    fontFamily: 'BalooBhaijaan2-Regular',
    fontSize: 10,
    lineHeight: 15,
    color: 'rgba(154, 154, 154, 1)',
  },
  text6: {
    fontFamily: 'BalooBhaijaan2-Regular',
    fontSize: 13,
    lineHeight: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: '#00505E',
    marginTop: 2,
  },
});

export default ComponentTransaksi;
