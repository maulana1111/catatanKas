import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

function ModalItemSuccess({visible}) {
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
              backgroundColor: 'rgba(49, 206, 93, 0.9))',
              width: 340,
              height: 174,
              borderRadius: 16,
              paddingVertical: 16,
              paddingLeft: 12,
              paddingRight: 12,
            }}>
            <View>
              <View>
                <Image
                  source={require('../../assets/success.png')}
                  style={{justifyContent: 'center', alignSelf: 'center'}}
                />
              </View>
              <View
                style={{
                  marginTop: 20,
                }}>
                <Text
                  style={{
                    fontFamily: 'BalooBhaijaan2-SemiBold',
                    fontSize: 18,
                    // lineHeight: 18,
                    color: '#fff',
                    textAlign: 'center',
                  }}>
                  Berhasil
                </Text>
                <Text
                  style={{
                    fontFamily: 'BalooBhaijaan2-SemiBold',
                    fontSize: 15,
                    // lineHeight: 18,
                    color: '#fff',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  Anda telah berhasil membuat transaksi
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ModalItemSuccess;
