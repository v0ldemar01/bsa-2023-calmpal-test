import React from 'react';
import LibraryToast, {
  ErrorToast,
  type ToastConfig,
  type ToastConfigParams,
} from 'react-native-toast-message';

import { type NotificationType } from '#libs/enums/enums';
import { type ValueOf } from '#libs/types/types';

import { styles } from './styles';

type Properties = {
  type?: ValueOf<typeof NotificationType>;
  title?: string;
  message?: string;
};

const toastConfig: ToastConfig = {
  error: (properties: ToastConfigParams<Properties>): React.ReactNode => (
    <ErrorToast
      {...properties}
      style={styles.errorToast}
      text1Style={styles.title}
      text2Style={styles.message}
    />
  ),
};

const Toast: React.FC = () => {
  return <LibraryToast config={toastConfig} />;
};

export { Toast };
