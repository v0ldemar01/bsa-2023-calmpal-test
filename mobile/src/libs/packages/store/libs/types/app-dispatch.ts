import { type store } from '#libs/packages/store/store';

type AppDispatch = typeof store.instance.dispatch;

export { type AppDispatch };
