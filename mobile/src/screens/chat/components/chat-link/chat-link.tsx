import { Link } from '@react-navigation/native';
import React from 'react';

import PlusIcon from '#assets/img/icons/plus.svg';
import { Text, View } from '#libs/components/components';
import { AppColor, RootScreenName } from '#libs/enums/enums';

import { styles } from './styles';

const ChatLink: React.FC = () => {
  return (
    <Link style={styles.linkWrapper} to={`/${RootScreenName.SIGN_IN}`}>
      <View style={styles.linkContent}>
        <PlusIcon style={styles.icon} color={AppColor.BLUE_300} />
        <Text style={styles.link}>Add new chat</Text>
      </View>
    </Link>
  );
};

export { ChatLink };
