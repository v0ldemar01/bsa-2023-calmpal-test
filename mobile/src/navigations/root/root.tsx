import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';

import { Loader } from '#libs/components/components';
import { DataStatus } from '#libs/enums/enums';
import { useAppDispatch, useAppSelector, useEffect } from '#libs/hooks/hooks';
import { type RootNavigationParameterList } from '#libs/types/types';
import { actions as authActions } from '#slices/auth/auth';

import { NAVIGATION_ITEMS } from './libs/constants';

const NativeStack = createNativeStackNavigator<RootNavigationParameterList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const Root: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    authenticatedUser,
    authenticatedUserDataStatus,
    surveyPreferencesDataStatus,
  } = useAppSelector(({ auth }) => {
    return {
      authenticatedUser: auth.authenticatedUser,
      authenticatedUserDataStatus: auth.authenticatedUserDataStatus,
      surveyPreferencesDataStatus: auth.surveyPreferencesDataStatus,
    };
  });

  const isLoaderVisible =
    authenticatedUserDataStatus === DataStatus.IDLE ||
    authenticatedUserDataStatus === DataStatus.PENDING ||
    surveyPreferencesDataStatus === DataStatus.PENDING;

  useEffect(() => {
    void dispatch(authActions.getAuthenticatedUser());
  }, [dispatch]);

  return (
    <>
      <NativeStack.Navigator screenOptions={screenOptions}>
        {NAVIGATION_ITEMS.filter((screen) => {
          return screen.conditionToRender(
            Boolean(authenticatedUser),
            Boolean(authenticatedUser?.isSurveyCompleted),
          );
        }).map((screen) => {
          return (
            <NativeStack.Screen
              name={screen.name}
              component={screen.component}
              key={screen.name}
            />
          );
        })}
      </NativeStack.Navigator>
      {isLoaderVisible && <Loader />}
    </>
  );
};

export { Root };
