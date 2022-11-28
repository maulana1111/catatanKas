import React, {useState} from 'react';
import {View} from 'react-native';
import NavigationItem from './Navigation-item';

function Navigation() {
  const [stateItem, setStateItem] = useState('first');
  const cashflow = require('../../../../assets/CashFlow.png')
  const chart = require('../../../../assets/Chart.png')
  const bill = require('../../../../assets/Bill.png')

  const onChangeStateItem = item => {
    setStateItem(item);
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <NavigationItem
          state={stateItem}
          stateItem={'first'}
          text={'Tambah Transaksi'}
          image={cashflow}
          onChange={item => onChangeStateItem(item)}
        />
        <NavigationItem
          state={stateItem}
          stateItem={'second'}
          text={'Statistic'}
          image={chart}
          onChange={item => onChangeStateItem(item)}
        />
        <NavigationItem
          state={stateItem}
          stateItem={'third'}
          text={'Bill'}
          image={bill}
          onChange={item => onChangeStateItem(item)}
        />
      </View>
    </View>
  );
}

export default Navigation;
