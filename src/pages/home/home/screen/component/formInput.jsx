import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

function FormInput({title, val, type, onChange}) {
  const handleChange = e => {
    onChange(e);
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          title === 'Deskripsi' ? styles.conText2 : styles.conText,
          styles.text2,
        ]}>
        {title}
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {title === 'Deskripsi' ? (
          <TextInput
            placeholder={val}
            style={styles.text1}
            keyboardType={type}
            multiline={title === 'Deskripsi' ? true : false}
            numberOfLines={title === 'Deskripsi' ? 5 : 0}
            onChangeText={e => handleChange(e)}
          />
        ) : (
          <TextInput
            placeholder={val}
            style={styles.text1}
            keyboardType={type}
            onChangeText={e => handleChange(e)}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#FCBC31',
    borderWidth: 2,
    borderRadius: 8,
    paddingLeft: 18,
    paddingVertical: 15,
    marginVertical: 10,
    backgroundColor: 'white',
  },
  conText: {
    position: 'absolute',
    bottom: 70,
    left: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 9,
  },
  conText2: {
    position: 'absolute',
    bottom: 140,
    left: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 9,
  },
  text1: {
    fontFamily: 'BalooBhaijaan2-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#000',
  },
  text2: {
    fontFamily: 'BalooBhaijaan2-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#000',
  },
});

export default FormInput;
