import {
  type AnyAction,
  type MiddlewareArray,
  type ThunkMiddleware,
} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import { AppEnvironment } from '#libs/enums/enums.js';
import { type Config } from '#libs/packages/config/config.js';
import { notification } from '#libs/packages/notification/notification.js';
import { handleError } from '#libs/packages/store/middlewares/middlewares.js';
import { authApi } from '#packages/auth/auth.js';
import { userApi } from '#packages/users/users.js';
import { reducer as authReducer } from '#slices/auth/auth.js';
import { reducer as usersReducer } from '#slices/users/users.js';

import { type Notification } from '../notification/notification.package.js';
import { storage } from '../storage/storage.js';

type RootReducer = {
  auth: ReturnType<typeof authReducer>;
  users: ReturnType<typeof usersReducer>;
};

type ExtraArguments = {
  authApi: typeof authApi;
  userApi: typeof userApi;
  storage: typeof storage;
  notification: Notification;
};

class Store {
  public instance: ReturnType<
    typeof configureStore<
      RootReducer,
      AnyAction,
      MiddlewareArray<[ThunkMiddleware<RootReducer, AnyAction, ExtraArguments>]>
    >
  >;

  public constructor(config: Config) {
    this.instance = configureStore({
      devTools: config.ENV.APP.ENVIRONMENT !== AppEnvironment.PRODUCTION,
      reducer: {
        auth: authReducer,
        users: usersReducer,
      },
      middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({
          thunk: {
            extraArgument: this.extraArguments,
          },
        }),
        handleError,
      ],
    });
  }

  public get extraArguments(): ExtraArguments {
    return {
      authApi,
      userApi,
      storage,
      notification,
    };
  }
}

export { Store };
