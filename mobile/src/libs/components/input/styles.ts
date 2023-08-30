import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: AppColor.GRAY_400,
    height: 44,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: AppColor.WHITE,
    marginBottom: 2,
    marginTop: 6,
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: AppColor.GRAY_100,
    marginTop: 4,
  },

  placeholder: {
    color: AppColor.GRAY_400,
  },
  filledInput: {
    borderWidth: 1,
    borderColor: AppColor.BLUE_300,
    borderRadius: 8,
    fontSize: 16,
    padding: 12,
    backgroundColor: AppColor.WHITE,
    elevation: 10,
    shadowColor: AppColor.BLUE_300,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },

  disabledInput: {
    borderColor: AppColor.GRAY_300,
  },

  errorInput: {
    borderColor: AppColor.RED_100,
  },

  errorText: {
    color: AppColor.RED_100,
    fontSize: 14,
    marginBottom: 4,
  },
  otherTextInput: {
    backgroundColor: AppColor.BLUE_100_ALPHA_70,
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    marginBottom: 20,
    borderColor: AppColor.WHITE,
    color: AppColor.BLUE_300,
    fontSize: 16,
  },
  otherPlaceholder: {
    color: AppColor.WHITE,
  },
});

export { styles };
