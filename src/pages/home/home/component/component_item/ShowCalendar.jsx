import React, {useState} from 'react';
import {Image, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import 'moment/locale/id';
import {useSelector, useDispatch} from 'react-redux';
import {storeGlobalSecChildSheet} from '../../../../../redux/features/globalSlice';
// import

function ShowCalendar({date, title, onChangeDate}) {
  const [open, setOpen] = useState(false);
  const {secondConditionChildSheet} = useSelector(state => state.globalStm);
  const dispatch = useDispatch();

  const handleChangeDate = value => {
    onChangeDate(moment(value).format('L'), value);
    // console.log(moment(value).format('ll'));
    dispatch(
      storeGlobalSecChildSheet({
        condition: false,
      }),
    );
    setOpen(false);
  };

  const handleOnPress = () => {
    dispatch(
      storeGlobalSecChildSheet({
        condition: true,
      }),
    );
    setOpen(true);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        handleOnPress();
      }}>
      <View style={{flexDirection: 'row', marginTop: 5}}>
        <View>
          <Image
            source={require('../../../../../assets/calendar.png')}
            style={styles.img}
          />
        </View>
        <View>
          <Text style={styles.text1}>{title}</Text>
          <Text style={styles.text2}>{date}</Text>
        </View>
        {open === true && (
          <View
            style={[
              styles.date,
              title === 'Dari Tanggal'
                ? {
                    right: -245,
                  }
                : {right: -45},
            ]}>
            <CalendarPicker
              textStyle={{color: 'black'}}
              onDateChange={e => handleChangeDate(e)}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  img: {
    marginTop: 4,
    width: 24,
    height: 24,
    marginRight: 7,
  },
  text1: {
    fontSize: 12,
    fontFamily: 'BalooBhaijaan2-Regular',
    lineHeight: 18,
    color: '#9A9A9A',
  },
  text2: {
    fontSize: 14,
    fontFamily: 'BalooBhaijaan2-SemiBold',
    lineHeight: 24,
    color: '#000',
  },
  date: {
    // width: '100%',
    alignSelf: 'flex-start',
    position: 'absolute',
    // top: 0,
    bottom: 500,
    marginVertical: 15,
    backgroundColor: '#fff',
  },
});

export default ShowCalendar;
