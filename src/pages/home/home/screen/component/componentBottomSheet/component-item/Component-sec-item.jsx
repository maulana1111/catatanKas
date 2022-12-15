import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

function ComponentSecItem({image1, text, image2}) {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Image source={image1} style={{width: 35, height: 35}} />
        <Text style={styles.text}>{text}</Text>
      </View>
      <View>
        <Image source={image2} />
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
});
export default ComponentSecItem;
