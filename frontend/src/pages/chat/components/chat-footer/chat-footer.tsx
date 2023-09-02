import { Input } from '#libs/components/components.js';
import { Icon } from '#libs/components/icon/icon.js';
import { DEFAULT_INPUT } from '#libs/constants/constants.js';
import { typer } from '#libs/helpers/helpers.js';
import { useAppForm, useCallback } from '#libs/hooks/hooks.js';
import { type FormControl, type FormFieldValues } from '#libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  onSend: ({ text }: { text: string }) => void;
};

type HandleForm = () => void;

type FormValue = {
  text: string;
} & FormFieldValues;

const ChatFooter: React.FC<Properties> = ({ onSend }) => {
  const { control, handleSubmit, reset } = useAppForm<FormValue>(DEFAULT_INPUT);

  const onSubmit = useCallback(
    ({ text }: FormValue): void => {
      onSend({ text });
      reset();
    },
    [onSend, reset],
  );

  return (
    <footer className={styles['chat-footer']}>
      <form
        className={styles['form']}
        onSubmit={handleSubmit(onSubmit) as HandleForm}
      >
        <Input
          placeholder="Type a message"
          customStyles={styles['input']}
          autoComplete="off"
          required
          name="text"
          control={typer<
            FormControl<FormValue, null>,
            FormControl<FormFieldValues, null>
          >(control)}
        />
        <button type="submit" className={styles['send-button']}>
          <Icon name={'send-icon'} />
        </button>
      </form>
    </footer>
  );
};

export { ChatFooter };
