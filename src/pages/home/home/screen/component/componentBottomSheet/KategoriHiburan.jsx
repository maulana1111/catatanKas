import React from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';

import ComponentSecItem from './component-item/Component-sec-item';

function KategoriHiburan({onClickCancel, onChangeState}) {
  const handleClick = () => {
    onClickCancel();
  };
  const handleChange = e => {
    onChangeState(e);
  };
  return (
    <View style={{padding: 14}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.text1}>Pilih Bank/Perorang/Perusahaan/Tokok</Text>
        <TouchableOpacity onPress={() => handleClick()}>
          <Image source={require('../../assets/Cancel.png')} />
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 10}}>
        <Text style={styles.text2}>Transfer</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => handleChange('prime')}>
          <ComponentSecItem
            image1={require('../../assets/hiburan/prime.png')}
            text={'Amazon Prime'}
            image2={require('../../assets/arrow_right.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChange('apple')}>
          <ComponentSecItem
            image1={require('../../assets/hiburan/apple.png')}
            text={'Apple Music'}
            image2={require('../../assets/arrow_right.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChange('disney')}>
          <ComponentSecItem
            image1={require('../../assets/hiburan/disney.png')}
            text={'Disney Plus'}
            image2={require('../../assets/arrow_right.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChange('netflix')}>
          <ComponentSecItem
            image1={require('../../assets/hiburan/netflix.png')}
            text={'Netflix'}
            image2={require('../../assets/arrow_right.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChange('spotify')}>
          <ComponentSecItem
            image1={require('../../assets/hiburan/spotify.png')}
            text={'Spotify'}
            image2={require('../../assets/arrow_right.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChange('tix')}>
          <ComponentSecItem
            image1={require('../../assets/hiburan/tix.png')}
            text={'Tix ID'}
            image2={require('../../assets/arrow_right.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChange('video')}>
          <ComponentSecItem
            image1={require('../../assets/hiburan/video.png')}
            text={'Vidio'}
            image2={require('../../assets/arrow_right.png')}
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

export default KategoriHiburan;
