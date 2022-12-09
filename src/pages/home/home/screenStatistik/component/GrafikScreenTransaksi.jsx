import React, {useState, useEffect} from 'react';
import {View, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';

function GrafikScreenTransaksi() {
  const {dataStatistikIn, dataStatistikOut} = useSelector(
    state => state.globalStm,
  );
  const dataIn = new Array();
  const dataOut = new Array();
  const label = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
  console.log('date trans in = ' + JSON.stringify(dataStatistikIn));
  console.log('date trans out = ' + JSON.stringify(dataStatistikOut));

  if (dataStatistikIn.length !== 0) {
    let temp = 0;
    let state = new Date(dataStatistikIn[0].tanggal_transaksi).getDay();
    let count = 0;
    let i = 0;

    for (const row of dataStatistikIn) {
      temp = new Date(row.tanggal_transaksi).getDay();
      count = count + row.nominal;
      if (temp !== state) {
        state = new Date(row.tanggal_transaksi).getDay();
        if (state - i > 1) {
          // console.log('masuk');
          for (let j = i + 1; j < state; j++) {
            dataIn.push(0);
            i++;
            // console.log('data saat ini = ' + dataIn);
          }
        }
        i++;
      }
      let tmpDt = dataIn[i];
      if (tmpDt === null || tmpDt === undefined) {
        dataIn.push(count);
      } else {
        dataIn[i] = tmpDt + row.nominal;
      }
      count = 0;
    }

    let coundArr = 7 - dataIn.length;
    for (let k = 0; k < coundArr; k++) {
      dataIn.push();
    }
  } else {
    dataIn.push(0, 0, 0, 0, 0, 0, 0);
  }

  if (dataStatistikOut.length !== 0) {
    let temp = 0;
    let state = new Date(dataStatistikOut[0].tanggal_transaksi).getDay();
    let count = 0;
    let i = 0;
    // console.log('state out = ' + state);
    let stt = state - 1;
    if (state !== 1) {
      for (let z = 0; z < stt; z++) {
        dataOut.push(0);
      }
    }

    for (const row of dataStatistikOut) {
      temp = new Date(row.tanggal_transaksi).getDay();
      count = count + row.nominal;
      if (temp !== state) {
        state = new Date(row.tanggal_transaksi).getDay();
        if (state - i > 1) {
          console.log('masuk');
          for (let j = i + 1; j < state; j++) {
            dataOut.push(0);
            i++;
            // console.log('data saat ini = ' + dataIn);
          }
        }
        i++;
        stt++;
      }
      let tmpDt = dataOut[stt];
      if (tmpDt === null || tmpDt === undefined) {
        dataOut.push(count);
      } else {
        dataOut[stt] = tmpDt + row.nominal;
      }
      count = 0;
    }

    let coundArr = 7 - dataOut.length;
    for (let k = 0; k < coundArr; k++) {
      dataOut.push(0);
    }
  } else {
    dataOut.push(0, 0, 0, 0, 0, 0, 0);
  }
  console.log('data baru out = ' + JSON.stringify(dataOut));
  console.log('data baru in = ' + JSON.stringify(dataIn));

  const dataTransaksi = {
    labels: label,
    datasets: [
      {
        data: dataIn,
        color: (opacity = 1) => `rgba(49, 206, 93, 0.2)`,
      },
      {
        data: dataOut,
        color: (opacity = 1) => `rgba(255, 89, 66, 0.3)`,
      },
    ],
  };
  return (
    <View style={{flex: 1}}>
      <View style={{marginVertical: 10}} />
      <LineChart
        data={dataTransaksi}
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
