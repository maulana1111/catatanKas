import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import TransaksiItem from './TransaksiItem.component';

function ComponentLaporan() {
  return (
    <View style={{padding: 16}}>
      <View style={styles.container}>
        <Text style={styles.text}>Buku Pemasukan & Pengeluaran</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 3,
          }}>
          <View>
            <Text style={styles.text2}>Minggu ini</Text>
            <Text style={styles.text3}>Rp. 1.000.000</Text>
          </View>
          <View>
            <Image source={require('./assets/Share.png')} />
          </View>
        </View>
        <View style={styles.SecCon}>
          <Text style={styles.text4}>Pemasukan</Text>
          <Text style={styles.text5}>+Rp. 550.000</Text>
        </View>
        <View>
          <TransaksiItem
            image1={require('./assets/filter/transfer.png')}
            text={'Transfer'}
            text2={'Rp. 100.000'}
            bgColor={'#B4B4B4'}
            tintColor={'#000000'}
            state={'pemasukan'}
          />
          <TransaksiItem
            image1={require('./assets/filter/instant.png')}
            text={'Instan'}
            text2={'Rp. 100.000'}
            bgColor={'rgba(53, 50, 224, 0.4)'}
            tintColor={'#3F32E0'}
            state={'pemasukan'}
          />
        </View>
        <View style={styles.SecCon}>
          <Text style={styles.text4}>Pengeluaran</Text>
          <Text style={styles.text5}>-Rp. 550.000</Text>
        </View>
        <View>
          <TransaksiItem
            image1={require('./assets/filter/transfer.png')}
            text={'Transfer'}
            text2={'Rp. 100.000'}
            bgColor={'#B4B4B4'}
            tintColor={'#000000'}
            state={'pengeluaran'}
          />
          <TransaksiItem
            image1={require('./assets/filter/instant.png')}
            text={'Instan'}
            text2={'Rp. 100.000'}
            bgColor={'rgba(53, 50, 224, 0.4)'}
            tintColor={'#3F32E0'}
            state={'pengeluaran'}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 234, 189, 1)',
    justifyContent: 'flex-start',
    padding: 12,
    borderRadius: 16,
  },
  SecCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFD16C',
    borderTopStartRadius: 6,
    borderTopEndRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  text: {
    fontFamily: 'BalooBhaijaan2-SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(64, 48, 15, 1)',
  },
  text2: {
    fontFamily: 'BalooBhaijaan2-Regular',
    fontSize: 14,
    lineHeight: 21,
    color: 'rgba(154, 154, 154, 1)',
  },
  text3: {
    fontFamily: 'BalooBhaijaan2-SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: '#000',
  },
  text4: {
    fontFamily: 'BalooBhaijaan2-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#795B1B',
  },
  text5: {
    fontFamily: 'BalooBhaijaan2-SemiBold',
    fontSize: 10,
    lineHeight: 15,
    color: '#000',
  },
});

export default ComponentLaporan;
