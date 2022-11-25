import React, {useState, useEffect} from 'react';
import {useDispatch, Provider, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {store} from './src/redux/store/store';
import Database from './src/utilSqlite/database';
import {storeUser} from './src/redux/features/stmSlice';
import SplashScreen from './src/pages/auth/splashscreen/SplashScreen';
import Home from './src/pages/home/Home';
import SecScreen from './src/pages/auth/secScreen/SecScreen';
import ThirdScreen from './src/pages/auth/thirdScreen/ThirdScreen';

const db = new Database();
const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="app" component={Logic} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

function Logic() {
  const {user} = useSelector(state => state.stm);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [namaUser, setNamaUser] = useState('');
  const dispatch = useDispatch();

  console.log('hit');
  useEffect(() => {
    const setUser = async () => {
      await db.getDataUser('12344444').then(data => {
        if (data) {
          setUserLoggedIn(data.user_logged_in);
          setNamaUser(data.namaUser);
          dispatch(
            store({
              nama: namaUser,
            }),
          );
        }
      });
    };
    setUser();
  }, []);

  return userLoggedIn === false ? AuthTab() : HomeTab();
}

function AuthTab() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="SecScreen" component={SecScreen} />
      <Stack.Screen name="ThirdScreen" component={ThirdScreen} />
    </Stack.Navigator>
  );
}

function HomeTab() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

export default App;
