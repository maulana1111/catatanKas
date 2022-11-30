import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

function ComponentItem({image1, text, image2, bgColor}) {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <View style={[styles.bgColor, {backgroundColor: bgColor}]}>
          <Image source={require('../../../assets/income.png')} />
        </View>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View>
        <Image source={require('../../../assets/arrow_right.png')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#FFD16C',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
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
    marginTop: 3
  },
});

export default ComponentItem;
