import React, {useState, useEffect} from 'react';
import {LogBox} from 'react-native';
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
import Statistik from './src/pages/home/home/screenStatistik/Statistik';
import FormTambahBill from './src/pages/home/home/screenBill/FormTambahBill';
import ScreenLoading from './src/pages/home/home/component/ScreenLoading';

import Bill from './src/pages/home/home/screenBill/Bill';

const db = new Database();
const Stack = createNativeStackNavigator();
function App() {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();
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
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        initialParams={{nextScreen: 'SecScreen'}}
      />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SecScreen" component={SecScreen} />
      <Stack.Screen name="ThirdScreen" component={ThirdScreen} />
      <Stack.Screen name="FormTambahTransaksi" component={FormTambah} />
      <Stack.Screen name="ScreenLoading" component={ScreenLoading} />
      <Stack.Screen name="Statistic" component={Statistik} />
      <Stack.Screen name="Bill" component={Bill} />
      <Stack.Screen name="FormTambahTagihan" component={FormTambahBill} />
    </Stack.Navigator>
  );
}

export default App;
