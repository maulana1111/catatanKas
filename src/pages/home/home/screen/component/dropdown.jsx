import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

function Dropdown({title, text}) {
  return (
    <View>
      <View
        style={{
          borderColor: '#FCBC31',
          borderWidth: 2,
          borderRadius: 8,
          paddingLeft: 18,
          paddingVertical: 15,
          marginVertical: 10,
        }}>
        <Text
          style={[
            {
              position: 'absolute',
              bottom: 45,
              left: 10,
              paddingHorizontal: 10,
              backgroundColor: '#fff',
            },
            styles.text2,
          ]}>
          {title}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.text1}>
            {text === 'gaya_hidup' && 'Gaya Hidup'}
            {text === 'makanan&minuman' && 'Makanan & Minuman'}
            {text !== 'gaya_hidup' && text !== 'makanan&minuman' && text}
          </Text>
          <Image
            source={require('../assets/arrow_drop_down.png')}
            style={{marginRight: 10}}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text1: {
    fontFamily: 'BalooBhaijaan2-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#9A9A9A',
  },
  text2: {
    fontFamily: 'BalooBhaijaan2-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#000',
  },
});

export default Dropdown;
