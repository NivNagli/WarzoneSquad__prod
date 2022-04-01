import React, { useEffect } from 'react';

// Components imports:
import Input from '../../Shared/components/Input/Input';
import Button from '../../Shared/components/Button/Button';
import classes from './Login.module.css';
import LoadingSpinner from '../../Shared/components/UI/LoadingSpinner';
import ErrorMessage from '../../Shared/components/UI/ErrorMessage';
// Methods and variables imports:
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL
} from '../../Shared/util/validators';
import { loginAttempt } from '../../../Middlewares/backend-requests';
// custom and built-in hooks imports:
import { useForm } from '../../Shared/hooks/form-hook';
import { useDispatch } from 'react-redux';
import { authActions } from '../../../store/auth';
import { useHttpClient } from '../../Shared/hooks/http-hook';

// The component:
const LoginPage = () => {
  // The useForm custom hook will serve us in order to manage the login form.
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );
  // This 4 variables will serve us to handle the login attempt.
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const dispatch = useDispatch();
  useEffect(() => { }, [error]);

  // The submit handler for the login form, this is the procedure that will execute in button press event:
  const placeSubmitHandler = async event => {
    event.preventDefault();
    try {
      const reqData = await loginAttempt(formState.inputs.email.value, formState.inputs.password.value);
      if (reqData) {  // The case the user successfully signed in.
        clearError();
        const { userID, gameProfileID, token } = reqData.data;
        // Using the redux function in order to update that the user is authenticated.
        dispatch(authActions.login({
          userID: userID,
          gameProfileID: gameProfileID,
          token: token
        }));
      }
    }
    catch (e) {
      console.log(`Some unknown error occurred in login page, err = ${e}`);
    }
    // In case the login procedure failed the 'error' variable from the custom http hook 
    // will be responsible to display her.
  };

  return (
    <React.Fragment>
      <form className={classes.login_form} onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        {error && <ErrorMessage error={error} />}

        <Input
          id="email"
          element="input"
          type="text"
          label="E-Mail"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          errorText="Please enter a valid e-mail."
          onInput={inputHandler}
        />
        <Input
          id="password"
          element="input"
          label="Password"
          type="password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password (at least 5 characters)."
          onInput={inputHandler}
        />
        <div className={classes.div4button}>
          <Button type="submit" disabled={!formState.isValid} parentClass={classes.login_button}>
            Login
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default LoginPage;
