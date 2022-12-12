import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Platform,
  LogBox,
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
import {useDispatch} from 'react-redux';
// import {storeUser} from '../../../redux/features/globalSlice';
import {storeUser} from '../../../redux/features/globalSlice';

import RNFetchBlob from 'rn-fetch-blob';

const db = new Database();
const date = new Date();

function ThirdScreen() {
  const [idUser, setIdUser] = useState('');
  const [linkFoto, setLinkFoto] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [stateUser, setStateUser] = useState(false);
  const [image, setImage] = useState(
    'image_' + Math.floor(date.getTime() + date.getSeconds() / 2) + '.jpg',
  );
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '732363084015-fl8rg588mh76g0urn7k6voi7v7ot2n43.apps.googleusercontent.com',
      offlineAccess: true,
    });
    async function _isSignedIn() {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        const dat = await _getCurrentUserInfo();
        console.log('data user = ' + JSON.stringify(dat));
        await db.getDataUser({id_user: dat.id}).then(rowData => {
          if (rowData) {
            const dt = {
              status: true,
              data: {
                id_user: rowData.id_user,
                nama_user: dat.name,
                email: rowData.email,
                foto: rowData.foto,
              },
            };
            dispatch(
              storeUser({
                dt,
              }),
            );
            navigation.navigate('Home');
          }
        });
      }
    }

    async function _getCurrentUserInfo() {
      try {
        const userInfo = await GoogleSignin.signInSilently();
        const {user} = JSON.parse(JSON.stringify(userInfo));
        // console.log('data user google = ' + JSON.stringify(userInfo));
        return user;
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_REQUIRED) {
          console.log('user has not signed in yet');
        } else {
          console.log('some other error');
        }
      }
    }
    _isSignedIn();
  }, []);

  async function _signIn() {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      const {user} = JSON.parse(JSON.stringify(userInfo));
      // console.log("data user google = "+user);

      db.getDataUser(user.id)
        .then(data => {
          setStateUser(true);
        })
        .catch(err => {
          console.log('Error when Check');
        });

      const dt = {
        status: true,
        data: {
          id_user: user.id,
          nama_user: user.name,
          email: user.email,
          foto: image,
        },
      };
      dispatch(
        storeUser({
          dt,
        }),
      );
      const dataset = {
        id_user: user.id,
        nama_user: user.name,
        email: user.email,
        foto: image,
      };
      db.addDataUser(dataset)
        .then(async res => {
          stateUser && (await _checkPermission(user.photo));
          console.log('res data = ' + res);
          navigation.navigate('Home');
        })
        .catch(err => {
          console.log('err = ' + err);
        });
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
  }
  async function _checkPermission(linkImage) {
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
        await _doDownloadImage(linkImage);
      } else {
        alert('Storage Permission Not Granted');
      }
    } catch (error) {
      console.log('error = ' + error);
    }
  }

  async function _doDownloadImage(linkImage) {
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    // const imageName = image;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: PictureDir + '/' + image,
        description: 'Image',
      },
    };

    // console.log('data photo = ' + linkFoto);
    config(options)
      .fetch('GET', linkImage)
      .then(res => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('Image For User Downloaded Successfully.');
      })
      .catch(err => {
        console.log('err image = ' + err);
      });
  }

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
