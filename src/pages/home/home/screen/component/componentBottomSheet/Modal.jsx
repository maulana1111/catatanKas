import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

function ModalItem({visible, onChange, onSubmit}) {
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
              backgroundColor: 'white',
              width: 340,
              height: 174,
              borderRadius: 16,
              paddingVertical: 16,
              paddingLeft: 12,
              paddingRight: 12,
            }}>
            <View>
              <View>
                <Text
                  style={{
                    fontFamily: 'BalooBhaijaan2-SemiBold',
                    fontSize: 16,
                    lineHeight: 24,
                    color: '#000',
                    textAlign: 'center',
                  }}>
                  Buat Transaksi
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: 'BalooBhaijaan2-SemiBold',
                    fontSize: 14,
                    lineHeight: 18,
                    color: '#000',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  Apakah Anda yakin ingin membuat Transaksi ini? Periksa
                  terlebih dahulu sebelum membuat Transaksi.
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                  }}>
                  <TouchableOpacity onPress={() => onChange()}>
                    <View style={{marginTop: 20}}>
                      <Text style={{color: 'black'}}>Batalkan Transaksi</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => onSubmit()}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        backgroundColor: '#FCBC31',
                        width: 170,
                        height: 44,
                        padding: 10,
                        borderRadius: 16,
                        flexDirection: 'row',
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'BalooBhaijaan2-SemiBold',
                          fontSize: 14,
                          lineHeight: 18,
                          color: '#fff',
                          textAlign: 'center',
                          marginTop: 5,
                          marginRight: 10,
                        }}>
                        Simpan Sekarang
                      </Text>
                      <Image
                        source={require('../../assets/arrow_right.png')}
                        style={{tintColor: 'white'}}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ModalItem;
