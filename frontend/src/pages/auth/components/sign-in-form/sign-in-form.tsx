import { Button, Input, Link } from '#libs/components/components.js';
import { AppRoute } from '#libs/enums/enums.js';
import { useAppForm, useCallback } from '#libs/hooks/hooks.js';
import {
  type UserSignInRequestDto,
  userSignInValidationSchema,
} from '#packages/users/users.js';

import { DEFAULT_SIGN_IN_PAYLOAD } from './libs/constants.js';
import styles from './styles.module.scss';

type Properties = {
  onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
  const { control, errors, handleSubmit } = useAppForm<UserSignInRequestDto>({
    defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
    validationSchema: userSignInValidationSchema,
  });

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onSubmit)(event_);
    },
    [handleSubmit, onSubmit],
  );

  return (
    <>
      <form className={styles['authForm']} onSubmit={handleFormSubmit}>
        <h1 className={styles['greeting']}>Sign In to your account</h1>

        <Input
          type="text"
          label="Email"
          placeholder="name@gmail.com"
          name="email"
          control={control}
          errors={errors}
        />
        <Input
          type="password"
          label="Password"
          placeholder=""
          name="password"
          control={control}
          errors={errors}
        />
        <Button
          type="submit"
          label="Sign in"
          className={styles['btn'] as string}
        />

        <span className={styles['authFormLink']}>
          Don&apos;t have an account? Go to
          <Link to={AppRoute.SIGN_UP}>
            <span className={styles['text']}>Sign up</span>
          </Link>
        </span>
      </form>
    </>
  );
};

export { SignInForm };
