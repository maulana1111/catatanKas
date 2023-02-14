import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

function ModalLogout({visible, title, desc, onClickHandle, onClickCancel}) {
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
              height: 160,
              borderRadius: 16,
              paddingTop: 20
            }}>
            <Text style={[styles.text1, {fontSize: 16}]}>Keluar Aplikasi</Text>
            <Text style={[styles.text1, {fontSize: 12}]}>Apakah Anda yakin ingin keluar dari aplikasi ini?</Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity onPress={() => onClickCancel()}>
                <View
                  style={{
                    marginTop: 20,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'BalooBhaijaan2-SemiBold',
                      fontSize: 16,
                      textAlign: 'center',
                      marginTop: 5,
                      color: 'black',
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
                    backgroundColor: '#CD1717',
                    width: 150,
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
                      color: 'white',
                      textAlign: 'center',
                      marginTop: 5,
                      marginRight: 1,
                    }}>
                    Keluar Sekarang
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  text1: {
    fontFamily: 'BalooBhaijaan2-SemiBold',
    textAlign: 'center',
    marginTop: 5,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold'
  },
});

export default ModalLogout;
