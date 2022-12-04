import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

function FormInput({title, val, type, onChange}) {
  const handleChange = e => {
    onChange(e);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.conText, styles.text2]}>{title}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TextInput
          placeholder={val}
          style={styles.text1}
          keyboardType={type}
          onChangeText={e => handleChange(e)}
        />
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
  },
  conText: {
    position: 'absolute',
    bottom: 65,
    left: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
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

export default FormInput;
