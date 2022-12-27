import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

function FilterComponent({title, text1, text2, state, onChangeState}) {
  const handleSetState = value => {
    onChangeState(value);
  };

  return (
    <View style={{marginVertical: 5}}>
      <Text style={styles.text}>{title}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <TouchableOpacity onPress={() => handleSetState('desc')}>
          {state === 'desc' ? (
            <View
              style={[
                styles.toogleBtn,
                {
                  backgroundColor: 'rgba(255, 209, 108, 0.4)',
                  borderColor: '#FCBC31',
                },
              ]}>
              <Image
                source={require('../../../../../assets/sort_des.png')}
                style={[styles.img, {tintColor: '#FCBC31'}]}
              />
              <Text
                style={[
                  styles.text2,
                  {
                    color: '#FCBC31',
                  },
                ]}>
                {text1}
              </Text>
            </View>
          ) : (
            <View style={styles.toogleBtn}>
              <Image
                source={require('../../../../../assets/sort_des.png')}
                style={styles.img}
              />
              <Text style={styles.text2}>{text1}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSetState('asc')}>
          {state === 'asc' ? (
            <View
              style={[
                styles.toogleBtn,
                {
                  backgroundColor: 'rgba(255, 209, 108, 0.4)',
                  borderColor: '#FCBC31',
                },
              ]}>
              <Image
                source={require('../../../../../assets/sort_asc.png')}
                style={[styles.img, {tintColor: '#FCBC31'}]}
              />
              <Text
                style={[
                  styles.text2,
                  {
                    color: '#FCBC31',
                  },
                ]}>
                {text2}
              </Text>
            </View>
          ) : (
            <View style={styles.toogleBtn}>
              <Image
                source={require('../../../../../assets/sort_des.png')}
                style={styles.img}
              />
              <Text style={styles.text2}>{text2}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: 'BalooBhaijaan2-SemiBold',
    lineHeight: 24,
    color: '#FCBC31',
  },
  img: {
    width: 16,
    height: 16,
    tintColor: '#9A9A9A',
  },
  text2: {
    fontSize: 12,
    fontFamily: 'BalooBhaijaan2-Regular',
    color: '#9A9A9A',
  },
  toogleBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderColor: '#D8D8D8',
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default FilterComponent;
