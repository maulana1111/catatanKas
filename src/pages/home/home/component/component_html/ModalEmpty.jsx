import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

function ModalEmpty({text, visible, onChange}) {
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
              height: 150,
              borderRadius: 16,
              paddingVertical: 16,
              paddingLeft: 12,
              paddingRight: 12,
            }}>
            <View>
              <View style={{justifyContent: 'center', alignSelf: 'center'}}>
                <Image
                  source={require('./assets/delete.png')}
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
                <TouchableOpacity onPress={() => onChange()}>
                  <Image
                    source={require('./assets/Cancel.png')}
                    style={{tintColor: '#fff'}}
                  />
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  fontFamily: 'BalooBhaijaan2-SemiBold',
                  textAlign: 'center',
                }}>
                Perhatian !
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 12,
                  fontFamily: 'BalooBhaijaan2-SemiBold',
                  textAlign: 'center',
                }}>
                {text}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ModalEmpty;
