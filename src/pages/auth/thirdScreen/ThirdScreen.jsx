import React, {useEffect} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Style} from './style/';
import MyStatusBar from '../component/StatusBar';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

function ThirdScreen() {
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'],
      webClientId:
        '732363084015-fl8rg588mh76g0urn7k6voi7v7ot2n43.apps.googleusercontent.com',
      offlineAccess: true,
      // iosClientId:
      //   '732363084015-tthb75t6qnbr345i244p8quggmhq20dd.apps.googleusercontent.com',
    });
    _isSignedIn();
  }, []);

  const _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      alert('User is already signed in');
      // Set User Info if user is already signed in
      _getCurrentUserInfo();
    } else {
      console.log('Please Login');
    }
    // setGettingLoginStatus(false);
  };

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      // setUserInfo(userInfo);
    } catch (error) {
      console.log(JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('user cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('operation (e.g. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('play services not available or outdated');
      } else {
        console.log('some other error happened = ' + JSON.stringify(error));
      }
    }
  };

  return (
    <SafeAreaView style={Style.container}>
      <MyStatusBar backgroundColor="#40300F" barStyle="light-content" />
      <View style={Style.centerView}>
        <Image source={require('../../../assets/pen.png')} />
        <View style={{marginVertical: 30}}>
          <Text style={Style.txt1}>Masuk</Text>
        </View>
        <View>
          <View style={[{flexDirection: 'row'}, Style.secView]}>
            <View>
              <Text style={Style.txt2}>Selamat datang di </Text>
            </View>
            <View>
              <Text style={[Style.txt2, {color: '#FCBC31'}]}>Catatankas</Text>
            </View>
          </View>
          <View style={Style.secView}>
            <Text style={Style.txt2}>Silahkan masuk terlebih dahulu untuk</Text>
          </View>
          <View style={Style.secView}>
            <Text style={Style.txt2}>memulai.</Text>
          </View>
        </View>
        <View style={[{width: '100%', marginVertical: '20%'}, Style.secView]}>
          <TouchableOpacity style={Style.btn} onPress={() => _signIn()}>
            <View
              style={[
                {
                  flexDirection: 'row',
                },
                Style.btnStyle,
              ]}>
              <Image
                source={require('../../../assets/icon_google.png')}
                style={{alignContent: 'flex-start', marginHorizontal: 20}}
              />
              <View style={{width: '70%'}}>
                <Text style={Style.txt3}>Lanjutkan dengan google</Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* <GoogleSigninButton
            style={{width: 192, height: 48}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => _signIn()}
            // disabled={this.state.isSigninInProgress}
          /> */}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ThirdScreen;
