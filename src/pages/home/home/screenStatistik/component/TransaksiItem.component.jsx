import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

function TransaksiItem({image1, text, text2, bgColor, tintColor, state}) {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <View style={[styles.bgColor, {backgroundColor: bgColor}]}>
          <Image source={image1} style={{tintColor: tintColor}} />
        </View>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View>
        <Text
          style={[
            styles.text2,
            state === 'pemasukan' ? {color: '#31CE5D'} : {color: '#FF5942'},
          ]}>
          {text2}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  bgColor: {
    width: 24,
    height: 24,
    borderRadius: 6,
    padding: 3,
  },
  text: {
    fontSize: 12,
    lineHeight: 18,
    color: '#232E31',
    fontFamily: 'BalooBhaijaan2-SemiBold',
    marginLeft: 10,
    marginTop: 3,
  },
  text2: {
    fontSize: 12,
    lineHeight: 15,
    marginTop: 3,
    fontFamily: 'BalooBhaijaan2-SemiBold',
  },
});

export default TransaksiItem;
