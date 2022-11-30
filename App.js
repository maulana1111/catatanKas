import React, {useState, useEffect, useLayoutEffect} from 'react';
import {useDispatch, Provider, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {store} from './src/redux/store/store';
import Database from './src/utilSqlite/database';
import {storeUser} from './src/redux/features/stmSlice';
import SplashScreen from './src/pages/auth/splashscreen/SplashScreen';
import Home from './src/pages/home/home/Home';
import SecScreen from './src/pages/auth/secScreen/SecScreen';
import ThirdScreen from './src/pages/auth/thirdScreen/ThirdScreen';
import FormTambah from './src/pages/home/home/screen/FormTambah';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { Text } from 'react-native';

const db = new Database();
const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="App" component={Logic} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

function Logic() {
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [stateView, setStateView] = useState(true);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '732363084015-fl8rg588mh76g0urn7k6voi7v7ot2n43.apps.googleusercontent.com',
      offlineAccess: true,
    });
    async function _isSignedIn() {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        const {id} = await _getCurrentUserInfo();
        await db.getDataUser(id).then(data => {
          if (data) {
            const dt = {
              id_user: data.idUser,
              nama_user: data.nama_user,
              email: data.email,
              foto: data.foto,
            };
            dispatch(
              storeUser({
                dt,
              }),
            );
            setUserLoggedIn(true);
            setStateView(true);
          }
        });
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

    _isSignedIn();
  }, []);
  console.log('status logged = ' + userLoggedIn);

  // if (stateView) return null;

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {userLoggedIn === true ? (
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          initialParams={{nextScreen: 'Home'}}
        />
      ) : (
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          initialParams={{nextScreen: 'SecScreen'}}
        />
      )}
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SecScreen" component={SecScreen} />
      <Stack.Screen name="ThirdScreen" component={ThirdScreen} />
      <Stack.Screen name="FormTambahTransaksi" component={FormTambah} />
    </Stack.Navigator>
  );
}
export default App;
