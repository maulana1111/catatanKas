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
        source={require('../../../assets/spscr.png')}
        resizeMode="cover"
        style={Style.imageCover}>
        <Image
          source={require('../../../assets/logo.png')}
          style={{justifyContent: 'center', alignSelf: 'center'}}
        />
{/*         
        <Svg source={require('../../../assets/logo.png')} /> */}
      </ImageBackground>
    </SafeAreaView>
  );
}

export default SplashScreen;
