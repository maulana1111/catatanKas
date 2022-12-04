import React from 'react';
import {SafeAreaView} from 'react-native';
import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import MyStatusBar from '../../../auth/component/StatusBar';
import ListItemBill from './component/ListItemBill.component';
import {useNavigation} from '@react-navigation/native';
import ScreenBottomSheetFilter from '../component/BottomSheetFilter';
import {useDispatch, useSelector} from 'react-redux';
import {storeGlobalChildSheet} from '../../../../redux/features/globalSlice';

function Bill() {
  const navigation = useNavigation();
  const {conditionChildSheet} = useSelector(state => state.globalStm);
  const dispatch = useDispatch();

  const handleFilter = async () => {
    // if (conditionChildSheet !== true) {
    //   translateY.value = withSpring(MAX_TRANSLATE_Y, {damping: 50});
    // } else {
    //   translateY.value = withSpring(-SCREEN_HEIGHT / 2, {damping: 50});
    // }
    dispatch(storeGlobalChildSheet({condition: !conditionChildSheet}));
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
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 16,
              marginTop: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Home');
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
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.text1}>Tagihan Hari Ini</Text>
              <Text style={styles.text2}>24 Mar 2020</Text>
            </View>
            <View style={{marginVertical: 5}} />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={styles.bg}>
                <TouchableOpacity>
                  <Image source={require('./assets/capture_bill.png')} />
                </TouchableOpacity>
              </View>
              <View style={styles.bg}>
                <TouchableOpacity onPress={() => handleFilter()}>
                  <Image source={require('./assets/filter.png')} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginVertical: 5}} />
            <View style={styles.container}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={[styles.text1, {color: '#000'}]}>Pemasukan</Text>
                <Image source={require('./assets/Share.png')} />
              </View>
              <ListItemBill
                state={'transfer'}
                jenis="pemasukan"
                title={'Transfer'}
                text1={'Ferran David'}
                text2={'05:34 - Adrian (Toko)'}
                uang={'Rp. 500.000'}
              />
              <ListItemBill
                state={'transfer'}
                jenis="pemasukan"
                title={'Transfer'}
                text1={'Ferran David'}
                text2={'05:34 - Adrian (Toko)'}
                uang={'Rp. 500.000'}
              />
            </View>

            <View style={{marginVertical: 5}} />
            <View style={styles.container}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={[styles.text1, {color: '#000'}]}>Pengeluaran</Text>
                <Image source={require('./assets/Share.png')} />
              </View>
              <ListItemBill
                state={'instant'}
                jenis="pengeluaran"
                title={'Transfer'}
                text1={'Ferran David'}
                text2={'05:34 - Adrian (Toko)'}
                uang={'Rp. 500.000'}
              />
              <ListItemBill
                state={'instant'}
                jenis="pengeluaran"
                title={'Instant'}
                text1={'Ferran David'}
                text2={'05:34 - Adrian (Toko)'}
                uang={'Rp. 500.000'}
              />
            </View>
          </View>
        </View>
        <ScreenBottomSheetFilter />
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