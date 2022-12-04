import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import NavigationItem from './component_item/Navigation-item';

function Navigation() {
  const chart = require('../../../../assets/Chart.png');
  const bill = require('../../../../assets/Bill.png');
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <NavigationItem text={'Statistic'} image={chart} />
        <NavigationItem text={'Bill'} image={bill} />
      </View>
    </View>
  );
}

export default Navigation;
