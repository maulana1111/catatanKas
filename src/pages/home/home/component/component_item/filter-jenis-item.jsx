import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

function FilterJenisItem({images, text, state, onChange}) {
  //   const txt = '../../../../../assets/filter' + image;
  //   const image = require(images);

  const handle = value => {
    onChange(value);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => handle(text)}>
        <View
          style={[
            styles.card,
            state !== text && {backgroundColor: '#fff', borderColor: '#D8D8D8'},
          ]}>
          <Image
            source={images}
            style={[styles.img, state !== text && {tintColor: '#9A9A9A'}]}
          />
          <Text>{text}</Text>
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
