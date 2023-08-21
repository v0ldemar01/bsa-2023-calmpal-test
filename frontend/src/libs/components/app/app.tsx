import reactLogo from '#assets/img/react.svg';
import { Header, Link, RouterOutlet } from '#libs/components/components.js';
import { AppRoute } from '#libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useLocation,
  useNavigate,
} from '#libs/hooks/hooks.js';
import { StorageKey } from '#libs/packages/storage/storage.js';
import { actions as authActions } from '#slices/auth/auth.js';
import { actions as userActions } from '#slices/users/users.js';

const App: React.FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { users, dataStatus, user, userDataStatus } = useAppSelector(
    ({ users, auth }) => ({
      users: users.users,
      dataStatus: users.dataStatus,
      user: auth.user,
      userDataStatus: auth.dataStatus,
    }),
  );

  const isRoot = pathname === AppRoute.ROOT;

  useEffect(() => {
    if (isRoot) {
      void dispatch(userActions.loadAll());
    }
  }, [isRoot, dispatch]);

  useEffect(() => {
    if (!localStorage.getItem(StorageKey.TOKEN)) {
      navigate(AppRoute.SIGN_IN);
    }
    void dispatch(authActions.getUser())
      .unwrap()
      .catch(() => {
        navigate(AppRoute.SIGN_IN);
      });
  }, []);

  return (
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
      {isRoot && (
        <>
          <h2>User: {user?.email}</h2>
          <h2>User Status: {userDataStatus}</h2>
          <h2>Users:</h2>
          <h3>Status: {dataStatus}</h3>
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.email}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export { App };
