import React, {useEffect, useState, useRef} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import MyStatusBar from '../../../auth/component/StatusBar';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

function ScreenLoading({route}) {
  const {screen, image} = route.params;
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);

  function handleTime() {
    if (progress < 100) {
      setProgress((prevState) => (prevState += 1));
    } else {
      navigation.navigate(screen);
    }
  }

  useEffect(() => {
    const timerId = setTimeout(handleTime, 4);
    return () => clearTimeout(timerId);
  });

  // useEffect(() => {
  //   console.log("progressTimer = "+progressTimer.current);
  //   console.log("progress = "+progress);
  // }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#006F78',
      }}>
      <MyStatusBar backgroundColor="#006F78" barStyle="light-content" />
      <View>
        <Image
          source={image}
          style={{justifyContent: 'center', alignSelf: 'center', marginTop: 80}}
        />
        <View style={{marginHorizontal: 10, marginTop: 40}}>
          <View style={styles.cont1}>
            <LinearGradient
              colors={['white', '#4358DC']}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              style={[styles.cont2, {width: progress + '%'}]}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cont1: {
    width: '100%',
    borderRadius: 20,
    height: 13,
    backgroundColor: 'white',
  },
  cont2: {
    width: '20%',
    borderRadius: 20,
    height: 13,
  },
});

export default ScreenLoading;
