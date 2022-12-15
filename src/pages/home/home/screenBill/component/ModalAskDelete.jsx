import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

function ModalAskDelete({visible, title, desc, onClickHandle, onClickCancel}) {
  return (
    <View>
      <Modal isVisible={visible}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'rgba(255, 89, 66, 0.9)',
              width: 340,
              height: 228,
              borderRadius: 16,
              paddingVertical: 16,
              paddingLeft: 12,
              paddingRight: 12,
            }}>
            <View style={{justifyContent: 'center', alignSelf: 'center'}}>
              <Image
                source={require('../assets/trash_icon.png')}
                style={{width: 45, height: 45, tintColor: '#fff'}}
              />
            </View>
            <View
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                padding: 10,
              }}>
              <TouchableOpacity onPress={() => onClickCancel()}>
                <Image
                  source={require('../assets/Cancel.png')}
                  style={{tintColor: '#fff'}}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  fontFamily: 'BalooBhaijaan2-SemiBold',
                  textAlign: 'center',
                }}>
                {title}
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 12,
                  fontFamily: 'BalooBhaijaan2-SemiBold',
                  textAlign: 'center',
                }}>
                {desc}
              </Text>
              <TouchableOpacity onPress={() => onClickHandle()}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                    backgroundColor: '#fff',
                    width: 270,
                    height: 44,
                    padding: 10,
                    borderRadius: 16,
                    flexDirection: 'row',
                    marginTop: 30,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'BalooBhaijaan2-SemiBold',
                      fontSize: 14,
                      lineHeight: 18,
                      color: '#FF5942',
                      textAlign: 'center',
                      marginTop: 5,
                      marginRight: 10,
                    }}>
                    {title === 'Keluar Aplikasi'
                      ? 'Keluar Sekarang'
                      : 'Hapus Sekarang'}
                  </Text>
                  <Image
                    source={require('../assets/arrow_right.png')}
                    style={{tintColor: '#FF5942'}}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ModalAskDelete;
