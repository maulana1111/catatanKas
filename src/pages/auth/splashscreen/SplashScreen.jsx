import React, {useEffect} from 'react';
import {View, Text, ImageBackground, Image, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Style} from './style';
import {useNavigation} from '@react-navigation/native';
import MyStatusBar from '../component/StatusBar';

function SplashScreen(props) {
  const navigation = useNavigation();
  const nxtScreen = props.route.params.nextScreen;
  // console.log('next screen = ' + nxtScreen);

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(nxtScreen);
    }, 3000);
  }, []);

  return (
    <SafeAreaView style={Style.container}>
      <StatusBar hidden={true} />
      <ImageBackground
        source={require('../../../assets/paper3.jpeg')}
        resizeMode="cover"
        style={Style.imageCover}>
        <View style={[{flexDirection: 'row'}, Style.centerTag]}>
          <View>
            <Image source={require('../../../assets/pin.png')} />
          </View>
          <View style={{marginLeft: 10}}>
            <Text style={Style.title}>atatan</Text>
          </View>
        </View>
        <View>
          <Text style={Style.secTitle}>Kas</Text>
        </View>
        <View style={Style.footer}>
          <Image source={require('../../../assets/all.png')} />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default SplashScreen;
