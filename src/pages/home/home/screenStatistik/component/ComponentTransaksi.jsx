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
} from 'react-native';

function ComponentTransaksi() {
  const [stateMetode, setStateMetode] = useState('transaksi');
  const [dataGrafik, setDataGrafik] = useState({});
  const label = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
  const dataTransaksi = {
    labels: label,
    datasets: [
      {
        data: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
        ],
        color: (opacity = 1) => `rgba(49, 206, 93, 0.2)`,
      },
      {
        data: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
        ],
        color: (opacity = 1) => `rgba(255, 89, 66, 0.3)`,
      },
    ],
  };
  const dataPemasukan = {
    labels: label,
    datasets: [
      {
        data: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
        ],
        color: (opacity = 1) => `rgba(49, 206, 93, 0.2)`,
      },
    ],
  };
  const dataPengeluaran = {
    labels: label,
    datasets: [
      {
        data: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
        ],
        color: (opacity = 1) => `rgba(255, 89, 66, 0.3)`,
      },
    ],
  };

  const HandleChangeState = e => {
    setStateMetode(e);
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
                <Text style={styles.text4}>Rp. 1.000.000</Text>
              </View>
              <View>
                <Image source={require('./assets/Share.png')} />
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
                  {fontSize: 12, color: 'rgba(49, 206, 93, 1)'},
                ]}>
                +Rp 500.000
              </Text>
            </View>
            <View style={styles.bg1}>
              <View
                style={[styles.bg2, {backgroundColor: '#31CE5D', width: '80%'}]}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 5,
              }}>
              <Text style={[styles.text4, {fontSize: 14}]}>Pengeluaran</Text>
              <Text style={[styles.text4, {fontSize: 12, color: '#FF5942'}]}>
                -Rp 500.000
              </Text>
            </View>
            <View style={styles.bg1}>
              <View
                style={[styles.bg2, {backgroundColor: '#FF5942', width: '80%'}]}
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
                <Text style={styles.text4}>Rp. 1.000.000</Text>
              </View>
              <View>
                <Image source={require('./assets/Share.png')} />
              </View>
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
                      stateMetode === 'transaksi' && {color: '#fff'},
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
                      stateMetode === 'pemasukan' && {color: '#fff'},
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
                      stateMetode === 'pengeluaran' && {color: '#fff'},
                    ]}>
                    Pengeluaran
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              {stateMetode === 'transaksi' && (
                <GrafikScreenTransaksi state={dataTransaksi} />
              )}
              {stateMetode === 'pemasukan' && (
                <GrafikScreenPemasukan state={dataPemasukan} />
              )}
              {stateMetode === 'pengeluaran' && (
                <GrafikScreenPengeluaran state={dataPengeluaran} />
              )}
            </View>
          </View>
          <View style={{marginVertical: 70}} />
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
    color: '#000',
  },
  text3: {
    fontFamily: 'BalooBhaijaan2-Regular',
    fontSize: 14,
    lineHeight: 21,
    color: 'rgba(154, 154, 154, 1)',
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
    color: '#DBA42D',
    marginTop: 2,
  },
});

export default ComponentTransaksi;
