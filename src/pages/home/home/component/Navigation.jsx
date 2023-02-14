import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import NavigationItem from './component_item/Navigation-item';

function Navigation() {
  const chart = require('../../../../assets/Chart.png');
  const bill = require('../../../../assets/Bill.png');
  const scrStat = require('../../../../assets/takingNote.png');
  const scrTag = require('../../../../assets/iluTagihan.png');
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <NavigationItem text={'Statistic'} image={chart} scrLoading={scrStat} />
        <NavigationItem text={'Bill'} image={bill} scrLoading={scrTag} />
      </View>
    </View>
  );
}

export default Navigation;
