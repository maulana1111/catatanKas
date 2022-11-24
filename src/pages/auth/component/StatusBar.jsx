import {
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

function MyStatusBar({backgroundColor, barStyle}) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{height: insets.top, backgroundColor}}>
      <StatusBar
        animated={true}
        backgroundColor={backgroundColor}
        barStyle={barStyle}
        hidden={false}
      />
    </View>
  );
}

export default MyStatusBar;
