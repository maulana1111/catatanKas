import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {color} from 'react-native-reanimated';

function ItemScreen({jenis}) {
  return (
    <View>
      <Text style={styles.txt1}>Tranfer</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Image
              source={require('../../../../../assets/BCA_icon.png')}
              style={{width: 50, height: 50}}
            />
          </View>
          <View>
            <Text style={styles.txt2}>BCA</Text>
            <Text style={styles.txt3}>05:34 Andrian Toko</Text>
          </View>
        </View>
        <View>
          <Image
            source={require('../../../../../assets/trash_icon.png')}
            style={{width: 28, height: 28, alignSelf: 'flex-end'}}
          />
          <Text
            style={[
              styles.txt4,
              jenis === 'in' ? {color: '#31CE5D'} : {color: '#FF5942'},
            ]}>
            +Rp 500,000.00
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  txt1: {
    fontSize: 16,
    fontFamily: 'BalooBhaijaan2-Regular',
    color: '#9A9A9A',
  },
  txt2: {
    fontSize: 14,
    fontFamily: 'BalooBhaijaan2-SemiBold',
    color: '#000',
  },
  txt3: {
    fontSize: 14,
    fontFamily: 'BalooBhaijaan2-Regular',
    color: '#DBA42D',
    lineHeight: 21,
  },
  txt4: {
    fontSize: 12,
    fontFamily: 'BalooBhaijaan2-Regular',
    lineHeight: 18,
  },
});

export default ItemScreen;
