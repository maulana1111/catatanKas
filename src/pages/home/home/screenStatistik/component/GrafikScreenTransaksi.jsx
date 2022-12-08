import React, {useState, useEffect} from 'react';
import {View, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';

function GrafikScreenTransaksi() {
  const {dataStatistikIn, dataStatistikOut} = useSelector(
    state => state.globalStm,
  );
  // const [dataIn, setDataIn] = useState([]);
  // const [dataOut, setDataOut] = useState([]);
  const dataIn = new Array();
  const dataOut = new Array();
  // const [dataMasuk]
  const label = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
  // let date = label[new Date(dataStatistikIn[0].tanggal_transaksi).getDay() - 1];
  // date.toLocaleDateString("id", {weekday: 'long'})
  // console.log('date trans = ' + JSON.stringify(dataStatistikIn));
  if (dataStatistikIn !== null) {
    let temp = 0;
    let state =
      dataStatistikIn !== null
        ? new Date(dataStatistikIn[0].tanggal_transaksi).getDay()
        : '';
    let count = 0;
    let i = 0;

    for (const row of dataStatistikIn) {
      temp = new Date(row.tanggal_transaksi).getDay();
      // console.log('state = ' + state + ', temp = ' + temp);
      // console.log('couting = ' + i);
      count = count + row.nominal;
      // console.log('row = ' + JSON.stringify(temp));
      if (temp !== state) {
        // console.log('hit self');
        state = new Date(row.tanggal_transaksi).getDay();
        i++;
      }
      let tmpDt = dataIn[i];
      // console.log('log tmpdt = ' + tmpDt);
      if (tmpDt === null || tmpDt === undefined) {
        dataIn.push(count);
        // console.log('hit push ');
        // console.log('data count = ' + count);
      } else {
        // console.log('hit else = ' + tmpDt);
        // console.log('data count else = ' + count);
        dataIn[i] = tmpDt + row.nominal;
      }
      count = 0;
    }

    let coundArr = 7 - dataIn.length;
    for (let k = 0; k < coundArr; k++) {
      dataIn.push(0);
    }
  } else {
    dataIn.push([0, 0, 0, 0, 0, 0, 0]);
  }

  if (dataStatistikOut !== null) {
    let temp = 0;
    let state =
      dataStatistikOut !== null &&
      new Date(dataStatistikOut[0].tanggal_transaksi).getDay();
    let count = 0;
    let i = 0;

    for (const row of dataStatistikOut) {
      temp = new Date(row.tanggal_transaksi).getDay();
      // console.log('state = ' + state + ', temp = ' + temp);
      // console.log('couting = ' + i);
      count = count + row.nominal;
      // console.log('row = ' + JSON.stringify(temp));
      if (temp !== state) {
        // console.log('hit self');
        state = new Date(row.tanggal_transaksi).getDay();
        i++;
      }
      let tmpDt = dataOut[i];
      // console.log('log tmpdt = ' + tmpDt);
      if (tmpDt === null || tmpDt === undefined) {
        dataOut.push(count);
        // console.log('hit push ');
        // console.log('data count = ' + count);
      } else {
        // console.log('hit else = ' + tmpDt);
        // console.log('data count else = ' + count);
        dataOut[i] = tmpDt + row.nominal;
      }
      count = 0;
    }

    let coundArr = 7 - dataOut.length;
    for (let k = 0; k < coundArr; k++) {
      dataOut.push(0);
    }
  } else {
    dataOut.push([0, 0, 0, 0, 0, 0, 0]);
  }
  // console.log('data baru out = ' + dataOut);
  // console.log('data baru in = ' + dataIn);

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
