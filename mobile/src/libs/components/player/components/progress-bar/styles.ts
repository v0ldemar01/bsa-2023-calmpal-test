import { StyleSheet } from 'react-native';

import { FontFamily } from '#libs/enums/enums';

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    width: '100%',
    marginTop: 40,
  },
  progress: {
    position: 'absolute',
    left: 17,
    bottom: 20,
    fontFamily: FontFamily.MONTSERRAT_400,
  },
  duration: {
    position: 'absolute',
    right: 17,
    bottom: 20,
    fontFamily: FontFamily.MONTSERRAT_400,
  },
});

export { styles };
