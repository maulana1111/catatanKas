import React from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import ComponentItem from './component-item/Component-item';

function JenisTransaksi({onClickCancel, onChangeState}) {
  const handleClick = () => {
    onClickCancel();
  };
  const handleChange = e => {
    onChangeState(e);
  };
  return (
    <View style={{padding: 14}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.text1}>Pilih Jenis Transaksi</Text>
        <TouchableOpacity onPress={() => handleClick()}>
          <Image source={require('../../assets/Cancel.png')} />
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 10}}>
        <Text style={styles.text2}>Jenis</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => handleChange('transfer')}>
          <ComponentItem
            image1={require('../../../../../../assets/filter/transfer.png')}
            text={'Transfer'}
            image2={require('../../assets/arrow_right.png')}
            bgColor={'#B4B4B4'}
            tintColor={'#000000'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChange('instant')}>
          <ComponentItem
            image1={require('../../../../../../assets/filter/instant.png')}
            text={'Instan'}
            image2={require('../../assets/arrow_right.png')}
            bgColor={'rgba(53, 50, 224, 0.4)'}
            tintColor={'#3F32E0'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChange('tunai')}>
          <ComponentItem
            image1={require('../../../../../../assets/filter/coin.png')}
            text={'Tunai'}
            image2={require('../../assets/arrow_right.png')}
            bgColor={'rgba(49, 206, 93, 0.4)'}
            tintColor={'#31CE5D'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChange('hiburan')}>
          <ComponentItem
            image1={require('../../../../../../assets/filter/entertainment.png')}
            text={'Hiburan'}
            image2={require('../../assets/arrow_right.png')}
            bgColor={'#D39BFF'}
            tintColor={'#8015D3'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChange('gaya_hidup')}>
          <ComponentItem
            image1={require('../../../../../../assets/filter/lifestyle.png')}
            text={'Gaya Hidup'}
            image2={require('../../assets/arrow_right.png')}
            bgColor={'rgba(130, 255, 240, 0.4)'}
            tintColor={'#07BBA5'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChange('makanan&minuman')}>
          <ComponentItem
            image1={require('../../../../../../assets/filter/food.png')}
            text={'Makanan & Minuman'}
            image2={require('../../assets/arrow_right.png')}
            bgColor={'rgba(237, 110, 19, 0.4)'}
            tintColor={'#ED6E13'}
          />
        </TouchableOpacity>
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
});

export default JenisTransaksi;
