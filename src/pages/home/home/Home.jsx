import React, {useMemo, useRef, useCallback} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import MyStatusBar from '../../auth/component/StatusBar';
import {Style} from './style/index';
import Navigation from './component/Navigation';
import Card from './component/Card';
import BottomSheet from '@gorhom/bottom-sheet';
import BottomSheetNav from './component/BottomSheetNav';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function Home() {
  // ref
  // const bottomSheetRef = useRef(BottomSheet);

  // // variables
  // const snapPoints = useMemo(() => ['25%', '50%'], []);

  // // callbacks
  // const handleSheetChanges = useCallback(index => {
  //   console.log('handleSheetChanges', index);
  // }, []);
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
        <MyStatusBar backgroundColor="#40300F" barStyle="light-content" />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginTop: 10,
          }}>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginRight: 10}}>
              <Image source={require('../../../assets/img_person.png')} />
            </View>
            <View>
              <Text style={Style.txt1}>Selamat Pagi</Text>
              <Text style={Style.txt2}>Toni Borrow</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity>
              <Image source={require('../../../assets/logout_btn.png')} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Card />
        </View>
        <View
          style={{
            marginVertical: 7,
          }}>
          <Navigation />
        </View>
        <BottomSheetNav />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#40300F',
  },
  // contentContainer: {
  //   flex: 1,
  //   alignItems: 'center',
  // },
});

export default Home;
