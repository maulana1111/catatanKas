import React, {Fragment} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import ItemScreen from './component_item/item-screen';

import {useSelector} from 'react-redux';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import {useState} from 'react';

function ScreenBottomSheet() {
  const {dataTransaksiIn, dataTransaksiOut} = useSelector(
    state => state.globalStm,
  );

  const [stateTitle, setStateTitle] = useState('');
  const [stateTemp, setStateTemp] = useState('');

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
            <Image source={require('../../../../assets/Share.png')} />
          </View>

          {dataTransaksiIn !== null &&
            dataTransaksiIn.map((item, index) => {
              return (
                <View key={index}>                  
                  <ItemScreen jenis={item.transaksi} item={item} />
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
            <Image source={require('../../../../assets/Share.png')} />
          </View>

          {dataTransaksiOut !== null &&
            dataTransaksiOut.map((item, index) => {
              return (
                <View key={index}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'BalooBhaijaan2-Regular',
                      color: '#9A9A9A',
                      marginVertical: 5
                    }}>
                    {item.jenis_transaksi}
                  </Text>
                  <ItemScreen jenis={item.transaksi} item={item} />
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
