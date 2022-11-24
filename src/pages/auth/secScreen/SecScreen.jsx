import React from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Style} from './style';
import {useNavigation} from '@react-navigation/native';
import MyStatusBar from '../component/StatusBar';

function SecScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={Style.container}>
      <MyStatusBar backgroundColor="#40300F" barStyle="light-content" />
      <ImageBackground
        source={require('../../../assets/bg.png')}
        resizeMode="cover"
        style={Style.imageCover}>
        <View>
          <Text style={Style.txt1}>Ribet catat arus kas secara manual?</Text>
        </View>
        <View>
          <Text style={Style.txt2}>
            Ayok mulai catat pengeluaran dan pemasukan dengan sebuah aplikasi.
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <Image source={require('../../../assets/lg.png')} />
        </View>
        <View style={Style.btnContainer}>
          <TouchableOpacity
            style={Style.btn}
            onPress={() => navigation.navigate('ThirdScreen')}>
            <Text style={Style.txtBtn}>Ayok Mulai!</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default SecScreen;
