import React, {useState, useEffect} from 'react';
import {View, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import LinearGradient from 'react-native-linear-gradient';

function GrafikScreenTransaksi({state}) {
  return (
    <View style={{flex: 1}}>
      <View style={{marginVertical: 10}} />
      <LineChart
        data={state}
        width={Dimensions.get('screen').width} // from react-native
        height={220}
        withHorizontalLabels={false}
        withHorizontalLines={false}
        withVerticalLines={false}
        useShadowColorFromDataset={true}
        chartConfig={{
          strokeWidth: 3,
          withShadow: false,
          withOuterLines: false,
          backgroundColor: 'rgba(255,255,255, 1)',
          backgroundGradientFrom: 'rgba(255,255,255, 1)',
          backgroundGradientTo: 'rgba(255,255,255, 1)',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(2,2,2, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          flex: 1,
          paddingRight: 20,
          backgroundColor: 'green',
          marginVertical: 8,
          borderRadius: 16,
          marginRight: 25,
        }}
      />
    </View>
  );
}

export default GrafikScreenTransaksi;
