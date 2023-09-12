import React from 'react';

import { SignBackground } from '#libs/components/components';
import { RootScreenName } from '#libs/enums/enums';
import { useAppDispatch, useAppRoute, useCallback } from '#libs/hooks/hooks';
import {
  type UserSignInRequestDto,
  type UserSignUpRequestDto,
} from '#packages/users/users';
import { actions as authActions } from '#slices/auth/auth';

import { SignInForm, SignUpForm } from './components/components';
import { config } from '#libs/packages/config/config';

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
        return <>
          {/* <SignUpForm onSubmit={handleSignUpSubmit} /> */}
          {Object.entries(config.envSchema).map(([key, value]) => `${key}${JSON.stringify(value)}`)}
           {config.envSchema.API.ORIGIN_URL}
        </>;
      }
    }

    return null;
  };

  return <SignBackground>{getScreen(name)}</SignBackground>;
};

export { Auth };
