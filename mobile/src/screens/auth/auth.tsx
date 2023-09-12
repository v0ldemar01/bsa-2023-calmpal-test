/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-key */
import React from 'react';
import { Text } from 'react-native';

import { SignBackground } from '#libs/components/components';
import { RootScreenName } from '#libs/enums/enums';
import { useAppDispatch, useAppRoute, useCallback } from '#libs/hooks/hooks';
import { config } from '#libs/packages/config/config';
import {
  type UserSignInRequestDto,
  type UserSignUpRequestDto,
} from '#packages/users/users';
import { actions as authActions } from '#slices/auth/auth';

import { SignInForm, SignUpForm } from './components/components';

const Auth: React.FC = () => {
  const { name } = useAppRoute();
  const dispatch = useAppDispatch();

  const handleSignInSubmit = useCallback(
    (payload: UserSignInRequestDto): void => {
      void dispatch(authActions.signIn(payload));
    },
    [dispatch],
  );

  const handleSignUpSubmit = useCallback(
    (payload: UserSignUpRequestDto): void => {
      void dispatch(authActions.signUp(payload));
    },
    [dispatch],
  );

  const getScreen = (screen: string): React.ReactNode => {
    switch (screen) {
      case RootScreenName.SIGN_IN: {
        return <SignInForm onSubmit={handleSignInSubmit} />;
      }
      case RootScreenName.SIGN_UP: {
        return (
          <>
            {/* <SignUpForm onSubmit={handleSignUpSubmit} /> */}

            {Object.entries(config.envSchema).map(([key, value]) => {
              return (
                <Text>
                  `${key}${JSON.stringify(value)}`
                </Text>
              );
            })}
            <Text>{config.envSchema.API.ORIGIN_URL}</Text>
          </>
        );
      }
    }

    return null;
  };

  return <SignBackground>{getScreen(name)}</SignBackground>;
};

export { Auth };
