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
              height: 200,
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
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <TouchableOpacity onPress={() => onClickCancel()}>
                  <View
                    style={{
                      marginTop: 20,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'BalooBhaijaan2-SemiBold',
                        fontSize: 16,
                        color: 'white',
                        textAlign: 'center',
                        marginTop: 5,
                      }}>
                      Tidak
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onClickHandle()}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignSelf: 'center',
                      backgroundColor: '#fff',
                      width: 99,
                      height: 44,
                      padding: 10,
                      borderRadius: 16,
                      flexDirection: 'row',
                      marginTop: 15,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'BalooBhaijaan2-SemiBold',
                        fontSize: 14,
                        lineHeight: 18,
                        color: '#FF5942',
                        textAlign: 'center',
                        marginTop: 5,
                        marginRight: 1,
                      }}>
                      Hapus Sekarang
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
        </View>
      </Modal>
    </View>
  );
}

export default ModalAskDelete;
