import { BackButton } from '#libs/components/components.js';
import { AppRoute } from '#libs/enums/enums.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import {
  useCallback,
  useNavigate,
  useSidebarState,
} from '#libs/hooks/hooks.js';

import { ChatLayout, ChatSidebar } from './components/components.js';
import styles from './styles.module.scss';

const Chat: React.FC = () => {
  const navigate = useNavigate();
  const { isSidebarShown, setIsSidebarShown } = useSidebarState();

  const handleBackButtonPress = useCallback(() => {
    navigate(AppRoute.CHATS);
    setIsSidebarShown(true);
  }, [setIsSidebarShown, navigate]);

  return (
    <>
      <ChatSidebar
        isSidebarShown={isSidebarShown}
        setIsSidebarShown={setIsSidebarShown}
      />
      <div
        className={getValidClassNames(
          styles['container'],
          isSidebarShown && styles['hide'],
        )}
      >
        <BackButton onGoBack={handleBackButtonPress} />
        <ChatLayout />
      </div>
    </>
  );
};

export { Chat };
