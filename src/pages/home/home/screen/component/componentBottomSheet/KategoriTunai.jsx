import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  PermissionsAndroid,
} from 'react-native';
import Contacts, {getContactById} from 'react-native-contacts';

import ComponentSecItem from './component-item/Component-sec-item';

function KategoriTunai({onClickCancel, onChangeState}) {
  const [dataKontak, setDataKontak] = useState([]);

  const handleClick = () => {
    onClickCancel();
  };
  const handleChange = e => {
    onChangeState(e);
  };

  useEffect(() => {
    async function getContactById() {
      try {
        const andoidContactPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts Permission',
            message: 'This app would like to view your contacts.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (andoidContactPermission === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Contacts Permission granted');
          // Contacts.getAll((andoidContactPermission, contacts) => {
          //   console.log(contacts);
          // });
          Contacts.getAll()
            .then(contacts => {
              // console.log(contacts[1].displayName);
              setDataKontak(contacts);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log('Contacts permission denied');
        }
      } catch (error) {
        console.log('error = ' + error);
      }
    }
    getContactById();
  }, []);

  return (
    <View style={{padding: 14}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.text1}>Pilih Bank/Perorang/Perusahaan/Tokok</Text>
        <TouchableOpacity onPress={() => handleClick()}>
          <Image source={require('../../assets/Cancel.png')} />
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 10}}>
        <Text style={styles.text2}>Tunai</Text>
      </View>
      <View style={{marginTop: 10, marginBottom: 200}}>
        <FlatList
          data={dataKontak}
          renderItem={({item}) => {
            return (
              <TouchableOpacity onPress={() => handleChange(item.displayName)}>
                {/* <ComponentSecItem
                  image1={require('../../assets/kontak/person.png')}
                  text={item.displayName}
                  image2={require('../../assets/arrow_right.png')}
                /> */}
                <View style={styles.container}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={require('../../assets/kontak/person.png')}
                      style={{width: 25, height: 25}}
                    />
                    <Text style={styles.text}>{item.displayName}</Text>
                  </View>
                  <View>
                    <Image source={require('../../assets/arrow_right.png')} />
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text1: {
    fontSize: 18,
    lineHeight: 27,
    color: '#000',
    fontFamily: 'BalooBhaijaan2-SemiBold',
  },
  text2: {
    fontSize: 18,
    lineHeight: 27,
    color: '#FCBC31',
    fontFamily: 'BalooBhaijaan2-SemiBold',
  },
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#FFD16C',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  bgColor: {
    width: 24,
    height: 24,
    borderRadius: 6,
    padding: 3,
  },
  text: {
    fontSize: 12,
    lineHeight: 18,
    color: '#232E31',
    fontFamily: 'BalooBhaijaan2-SemiBold',
    marginLeft: 10,
    marginTop: 3,
  },
});

export default KategoriTunai;
