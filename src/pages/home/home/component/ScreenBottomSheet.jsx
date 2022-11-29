import React, {Fragment} from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import ItemScreen from './component_item/item-screen';

import {ScrollView} from 'react-native-gesture-handler';

function ScreenBottomSheet() {
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
    <Fragment>
      <View
        style={{
          paddingHorizontal: 24,
          width: '100%',
        }}>
        <View>
          <View style={styles.container}>
            <Text style={styles.txt1}>Pemasukan</Text>
            <Image source={require('../../../../assets/Share.png')} />
          </View>
          {/* <FlatList
            data={data}
            renderItem={({item}) => <ItemScreen jenis={'in'} />}
          /> */}
          <ItemScreen jenis={'in'} />
          <ItemScreen jenis={'in'} />
          <ItemScreen jenis={'in'} />
          <ItemScreen jenis={'in'} />
        </View>
      </View>
      <View style={{marginVertical: 10}}>
        <Image source={require('../../../../assets/line.png')} />
      </View>
      <View
        style={{
          paddingHorizontal: 24,
          width: '100%',
        }}>
        <View>
          <View style={styles.container}>
            <Text style={styles.txt1}>Pengeluaran</Text>
            <Image source={require('../../../../assets/Share.png')} />
          </View>

          <ItemScreen jenis={'out'} />
          <ItemScreen jenis={'out'} />
          <ItemScreen jenis={'out'} />
          <ItemScreen jenis={'out'} />
          <ItemScreen jenis={'out'} />
        </View>
      </View>
    </Fragment>
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
