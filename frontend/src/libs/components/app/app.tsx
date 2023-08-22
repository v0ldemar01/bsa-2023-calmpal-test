import reactLogo from '#assets/img/react.svg';
import {
  Header,
  Link,
  Loader,
  RouterOutlet,
} from '#libs/components/components.js';
import { AppRoute, DataStatus } from '#libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useLocation,
  useNavigate,
} from '#libs/hooks/hooks.js';
import { storage, StorageKey } from '#libs/packages/storage/storage.js';
import { actions as authActions } from '#slices/auth/auth.js';
import { actions as userActions } from '#slices/users/users.js';

const App: React.FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { authenticatedUserDataStatus } = useAppSelector(({ users, auth }) => ({
    users: users.users,
    dataStatus: users.dataStatus,
    user: auth.user,
    authenticatedUserDataStatus: auth.authenticatedUserDataStatus,
  }));

  const isRoot = pathname === AppRoute.ROOT;

  useEffect(() => {
    if (isRoot) {
      void dispatch(userActions.loadAll());
    }
  }, [isRoot, dispatch]);

  useEffect(() => {
    const checkTokenAndFetchUser = async (): Promise<void> => {
      if (!(await storage.has(StorageKey.TOKEN))) {
        navigate(AppRoute.SIGN_IN);
      }

      void dispatch(authActions.getAuthenticatedUser());
    };

    void checkTokenAndFetchUser();
  }, [dispatch, navigate]);

  return (
    <>
      {authenticatedUserDataStatus === DataStatus.FULFILLED ? (
        <>
          <Header />
          <img src={reactLogo} className="App-logo" width="30" alt="logo" />

          <ul className="App-navigation-list">
            <li>
              <Link to={AppRoute.ROOT}>Root</Link>
            </li>
            <li>
              <Link to={AppRoute.SIGN_IN}>Sign in</Link>
            </li>
            <li>
              <Link to={AppRoute.SIGN_UP}>Sign up</Link>
            </li>
          </ul>
          <p>Current path: {pathname}</p>

          <div>
            <RouterOutlet />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export { App };
