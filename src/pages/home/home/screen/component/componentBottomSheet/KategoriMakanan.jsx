import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';

import ComponentSecItem from './component-item/Component-sec-item';

function KategoriMakanan({onClickCancel, onChangeState}) {
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
      <ScrollView>
        <View style={{marginTop: 10}}>
          <Text style={styles.text2}>Makanan & Minuman (Tokok)</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => handleChange('aw')}>
            <ComponentSecItem
              image1={require('../../assets/makan/aw.png')}
              text={'A&W'}
              image2={require('../../assets/arrow_right.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleChange('burger')}>
            <ComponentSecItem
              image1={require('../../assets/makan/burger.png')}
              text={'Burger King'}
              image2={require('../../assets/arrow_right.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleChange('carl')}>
            <ComponentSecItem
              image1={require('../../assets/makan/carl.png')}
              text={"Carl's Jr."}
              image2={require('../../assets/arrow_right.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleChange('domino')}>
            <ComponentSecItem
              image1={require('../../assets/makan/domino.png')}
              text={"Domino's Pizza"}
              image2={require('../../assets/arrow_right.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleChange('dunkin')}>
            <ComponentSecItem
              image1={require('../../assets/makan/dunkin.png')}
              text={"Dunkin' Donuts"}
              image2={require('../../assets/arrow_right.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleChange('hokben')}>
            <ComponentSecItem
              image1={require('../../assets/makan/hokben.png')}
              text={'Hokben'}
              image2={require('../../assets/arrow_right.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleChange('jco')}>
            <ComponentSecItem
              image1={require('../../assets/makan/jco.png')}
              text={'J.CO Donuts'}
              image2={require('../../assets/arrow_right.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleChange('kfc')}>
            <ComponentSecItem
              image1={require('../../assets/makan/kfc.png')}
              text={'KFC'}
              image2={require('../../assets/arrow_right.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleChange('mcd')}>
            <ComponentSecItem
              image1={require('../../assets/makan/mcd.png')}
              text={"McDonald's"}
              image2={require('../../assets/arrow_right.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleChange('pizza')}>
            <ComponentSecItem
              image1={require('../../assets/makan/pizza.png')}
              text={'Pizza Hut'}
              image2={require('../../assets/arrow_right.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleChange('starbuck')}>
            <ComponentSecItem
              image1={require('../../assets/makan/starbuck.png')}
              text={'Starbucks'}
              image2={require('../../assets/arrow_right.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleChange('yoshinoya')}>
            <ComponentSecItem
              image1={require('../../assets/makan/yoshinoya.png')}
              text={'Yoshinoya'}
              image2={require('../../assets/arrow_right.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.text2}>Makanan & Minuman (Online)</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => handleChange('gofood')}>
            <ComponentSecItem
              image1={require('../../assets/makan/gofood.png')}
              text={'GoFood'}
              image2={require('../../assets/arrow_right.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleChange('grab')}>
            <ComponentSecItem
              image1={require('../../assets/makan/grab.png')}
              text={'Grab Food'}
              image2={require('../../assets/arrow_right.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleChange('shoopeFood')}>
            <ComponentSecItem
              image1={require('../../assets/makan/shoope.png')}
              text={'Shopee Food'}
              image2={require('../../assets/arrow_right.png')}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
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

export default KategoriMakanan;
