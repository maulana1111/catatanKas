import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Style} from './style';
import {useNavigation} from '@react-navigation/native';
import MyStatusBar from '../component/StatusBar';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
// import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import {useDispatch} from 'react-redux';
import {storeUser} from '../../../redux/features/globalSlice';
import Database from '../../../utilSqlite/database';
import {Circle} from 'react-native-animated-spinkit';
import {BackHandler} from 'react-native';
const db = new Database();

function SecScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // GoogleSignin.configure({
    //   webClientId:
    //     '732363084015-6b4vtrpshja9odh51kub15uuqjg077v6.apps.googleusercontent.com',
    //   offlineAccess: true,
    // });
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      doBackPressHandler,
    );

    return () => backHandler.remove();
  }, []);

  const doBackPressHandler = () => {
    BackHandler.exitApp();

    return true;
  };

  async function _isSignedIn() {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      const dat = await _getCurrentUserInfo();
      return dat;
    } else {
      return false;
    }
  }

  async function _getCurrentUserInfo() {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      const {user} = JSON.parse(JSON.stringify(userInfo));
      return user;
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        console.log('user has not signed in yet');
      } else {
        console.log('some other error');
      }
    }
  }

  const handleNav = async () => {
    setLoading(true);
    await db.getDataUser().then(async rowData => {
      if (rowData !== null) {
        const dt = {
          status: true,
          data: {
            id_user: rowData.id_user,
            nama_user: rowData.nama_user,
            email: rowData.email,
            foto: rowData.foto,
            link_foto: rowData.link_foto,
          },
        };
        dispatch(
          storeUser({
            dt,
          }),
        );
        setLoading(false);
        navigation.navigate('Home');
      } else {
        setLoading(false);
        navigation.navigate('ThirdScreen');
      }
    });
    // }
  };

  return (
    <SafeAreaView style={Style.container}>
      <MyStatusBar backgroundColor="#01626D" barStyle="light-content" />
      <View>
        <Text style={Style.txt1}>Ribet catat arus kas secara manual?</Text>
      </View>
      <View>
        <Text style={Style.txt2}>
          Ayok mulai catat pengeluaran dan pemasukan dengan sebuah aplikasi.
        </Text>
      </View>
      <View style={{marginTop: 20}}>
        <Image
          source={require('../../../assets/note.png')}
          style={{justifyContent: 'center', alignSelf: 'center'}}
        />
      </View>
      <View style={Style.btnContainer}>
        <TouchableOpacity style={Style.btn} onPress={() => handleNav()}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Text style={[Style.txtBtn, {marginRight: 10}]}>Ayok Mulai!</Text>
            {loading && <Circle size={20} color="#000" />}
          </View>
        </TouchableOpacity>
      </View>
      {/* </ImageBackground> */}
    </SafeAreaView>
  );
}

export default SecScreen;
