import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  tabBarStyle: {
    borderTopWidth: 0,
    elevation: 4,
    height: 122,
    shadowColor: AppColor.GRAY_300,
  },
});

export { styles };
