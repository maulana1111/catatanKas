import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

function FilterJenisItem({images, text, value, state, onChange}) {
  const handle = val => {
    onChange(val);
  };

  const check = (value1, value2) => {
    // console.log(value1.includes(value2))
    return value1.includes(value2);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => handle(value)}>
        <View
          style={[
            styles.card,
            check(state, value) === false && {
              backgroundColor: '#fff',
              borderColor: '#D8D8D8',
            },
          ]}>
          <Image
            source={images}
            style={[
              styles.img,
              check(state, value) === false
                ? {tintColor: '#9A9A9A'}
                : {tintColor: '#DBA42D'},
            ]}
          />
          <Text
            style={
              check(state, value) === false
                ? {color: '#9A9A9A'}
                : {color: '#DBA42D'}
            }>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 16,
    height: 16,
    marginRight: 4,
    marginTop: 3,
  },
  card: {
    backgroundColor: 'rgba(255, 209, 108, 0.4)',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderColor: '#FFD16C',
    borderWidth: 1,
    marginHorizontal: 5,
    marginVertical: 5,
  },
});

export default FilterJenisItem;
