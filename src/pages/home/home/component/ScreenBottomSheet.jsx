import React, {Fragment} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import ItemScreen from './component_item/item-screen';

import {ScrollView, FlatList} from 'react-native-gesture-handler';

function ScreenBottomSheet({dataPemasukan, dataPengeluaran}) {
  const data = [
    {key: '1'},
    {key: '2'},
    {key: '3'},
    {key: '4'},
    {key: '5'},
    {key: '6'},
    {key: '7'},
    {key: '8'},
    {key: '9'},
  ];
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

          {dataPemasukan !== null &&
            dataPemasukan.map((item, index) => {
              console.log(item);
              return <ItemScreen jenis={'in'} key={index} />;
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

          {dataPengeluaran !== null &&
            dataPengeluaran.map((item, index) => {
              console.log(item);
              return <ItemScreen jenis={'in'} key={index} />;
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
