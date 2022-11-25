import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {Style} from './style/';
import MyStatusBar from '../component/StatusBar';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import NetInfo from '@react-native-community/netinfo';
import Database from '../../../utilSqlite/database';

import RNFetchBlob from 'rn-fetch-blob';

const db = new Database();

function ThirdScreen() {
  const [idUser, setIdUser] = useState('');
  const [linkFoto, setLinkFoto] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  // NetInfo.fetch().then(state => {
  //   console.log("Connection type", state.type);
  //   console.log("Is connected?", state.isConnected);
  // })
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '732363084015-fl8rg588mh76g0urn7k6voi7v7ot2n43.apps.googleusercontent.com',
      offlineAccess: true,
    });
    _isSignedIn();
  }, []);

  useEffect(() => {
    if (linkFoto !== '') {
      console.log('hitt');
      _checkPermission();
    }

    async function _checkPermission() {
      if (Platform.OS === 'ios') {
        _doDownloadImage();
      }

      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'app need access to your storage to download Photo',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage Permission Granted.');
          _doDownloadImage();
        } else {
          alert('Storage Permission Not Granted');
        }
      } catch (error) {
        console.log('error = ' + error);
      }
    }
  }, [linkFoto]);

  const _doDownloadImage = async () => {
    let date = new Date();
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    const imageName =
      'image_' + Math.floor(date.getTime() + date.getSeconds() / 2) + '.jpg';
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: PictureDir + '/' + imageName,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', linkFoto)
      .then(res => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('Image For User Downloaded Successfully.');
      });
  };

  const _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      alert('User is already signed in');
      const data = await _getCurrentUserInfo();
      setIdUser(data.id);
      setName(data.name);
      setEmail(data.email);
      setLinkFoto(data.photo);
    }
    // setGettingLoginStatus(false);
  };

  _getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      // this.setState({userInfo});
      const {user} = JSON.parse(JSON.stringify(userInfo));
      // console.log(user);
      return user;
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        console.log('user has not signed in yet');
      } else {
        console.log('some other error');
      }
    }
  };

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      const {user} = JSON.parse(JSON.stringify(userInfo));
      setIdUser(user.id);
      setName(user.name);
      setEmail(user.email);
      setLinkFoto(user.photo);
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
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ThirdScreen;