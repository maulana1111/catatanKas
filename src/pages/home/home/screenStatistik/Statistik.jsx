import React, {useState, useEffect} from 'react';
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MyStatusBar from '../../../auth/component/StatusBar';
import {useNavigation} from '@react-navigation/native';
import {color} from 'react-native-reanimated';
import {LineChart} from 'react-native-chart-kit';
import GrafikScreenTransaksi from './component/GrafikScreenTransaksi';
import GrafikScreenPemasukan from './component/GrafikScreenPemasukan';
import GrafikScreenPengeluaran from './component/GrafikScreenPengeluaran';
import ComponentTransaksi from './component/ComponentTransaksi';
import ComponentLaporan from './component/ComponentLaporan';

function Statistik() {
  const navigation = useNavigation();
  const [stateScreen, setStateScreen] = useState('transaksi');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <MyStatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 16,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <View style={styles.back}>
              <Image
                source={require('../../../../assets/arrow_left.png')}
                style={styles.imageBack}
              />
            </View>
          </TouchableOpacity>
          <View style={{marginLeft: '30%'}}>
            <Text style={styles.title}>Statistik</Text>
          </View>
        </View>
        <View style={{marginVertical: 15}}>
          <View style={styles.firstCon}>
            <TouchableOpacity onPress={() => setStateScreen('transaksi')}>
              <View
                style={[
                  styles.cardBtn,
                  stateScreen === 'transaksi' && styles.CardSelected,
                ]}>
                <Text
                  style={[
                    styles.text1,
                    stateScreen === 'transaksi' && styles.text1Selected,
                  ]}>
                  Transaksi
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setStateScreen('laporan')}>
              <View
                style={[
                  styles.cardBtn,
                  stateScreen === 'laporan' && styles.CardSelected,
                ]}>
                <Text
                  style={[
                    styles.text1,
                    stateScreen === 'laporan' && styles.text1Selected,
                  ]}>
                  Laporan
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {stateScreen === 'transaksi' ? <ComponentTransaksi /> : <ComponentLaporan />}
      </View>
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
    backgroundColor: 'rgba(255, 230, 175, 0.3)',
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

export default Statistik;
