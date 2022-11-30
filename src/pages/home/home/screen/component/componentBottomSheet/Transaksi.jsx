import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

function Transaksi({onClickCancel}) {

    const handleClick = () =>{
        onClickCancel()
    }

  return (
    <View style={{padding: 14}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.text1}>Pilih Transaksi</Text>
        <TouchableOpacity onPress={() => handleClick()}>
          <Image source={require('../../assets/Cancel.png')} />
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 10}}>
        <Text style={styles.text2}>Transaksi</Text>
      </View>
      <View style={{borderColor: '#FFD16C', borderBottomWidth: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
          }}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={[
                styles.bgIcon,
                {backgroundColor: 'rgba(49, 206, 93, 0.4)'},
              ]}>
              <Image source={require('../../assets/income.png')} />
            </View>
            <Text style={styles.text3}>Pemasukan</Text>
          </View>
          <Image source={require('../../assets/arrow_right.png')} />
        </View>
      </View>
      <View style={{borderColor: '#FFD16C', borderBottomWidth: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
          }}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={[
                styles.bgIcon,
                {backgroundColor: 'rgba(255, 89, 66, 0.4)'},
              ]}>
              <Image source={require('../../assets/outcome.png')} />
            </View>
            <Text style={styles.text3}>Pengeluaran</Text>
          </View>
          <Image source={require('../../assets/arrow_right.png')} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text1: {
    fontSize: 18,
    lineHeight: 27,
    color: '#000',
    fontFamily: 'BalooBhaijaan2-SemiBold',
  },
  text2: {
    fontSize: 18,
    lineHeight: 27,
    color: '#FCBC31',
    fontFamily: 'BalooBhaijaan2-SemiBold',
  },
  text3: {
    fontSize: 14,
    lineHeight: 18,
    color: '#000',
    fontFamily: 'BalooBhaijaan2-SemiBold',
    marginTop: 6,
  },
  bgIcon: {
    borderRadius: 6,
    width: 24,
    height: 24,
    padding: 4,
    marginRight: 10,
  },
});

export default Transaksi;
