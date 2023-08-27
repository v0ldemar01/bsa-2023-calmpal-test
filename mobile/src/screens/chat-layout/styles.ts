import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: AppColor.WHITE,
    alignItems: 'center',
    paddingBottom: 1,
  },
  header: {
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 28,
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: AppColor.BLUE_300,
    borderRadius: 10,
  },
  title: {
    fontWeight: '600',
    fontSize: 22,
    color: AppColor.GRAY_600,
    marginLeft: 17,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: AppColor.GRAY_300,
  },
  chatWrapper: {
    paddingHorizontal: 20,
  },
});

export { styles };
