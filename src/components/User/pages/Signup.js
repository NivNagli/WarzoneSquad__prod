import React, { useState, useEffect } from 'react';
// Components imports:
import Input from '../../Shared/components/Input/Input';
import Button from '../../Shared/components/Button/Button';
import classes from './Signup.module.css';
import OptionSelector from '../../Shared/components/Input/OptionSelector';
import LoadingSpinner from '../../Shared/components/UI/LoadingSpinner';
import ErrorMessage from '../../Shared/components/UI/ErrorMessage';
// Methods and variables imports:
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL
} from '../../Shared/util/validators';
// custom and built-in hooks imports:
import { useForm } from '../../Shared/hooks/form-hook';
import { useDispatch } from 'react-redux';
import { authActions } from '../../../store/auth';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import { signupAttempt } from '../../../Middlewares/backend-requests';

const Signup = () => {
  // The useForm custom hook will serve us in order to manage the signup form.
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      },
      password_verification: {
        value: '',
        isValid: false
      },
      username: {
        value: '',
        isValid: false
      }
    },
    false
  );
  // This state will be updated each time the user will pick different platform.
  const [enteredPlatform, setEnteredPlatform] = useState('psn');

  // This 4 variables will serve us to handle the login attempt.
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const dispatch = useDispatch();
  useEffect(() => { }, [error]);

  // The submit handler for the signup form, this is the procedure that will execute in button press event:
  const placeSubmitHandler = async event => {
    event.preventDefault();
    try {
      const reqData = await signupAttempt(formState.inputs.email.value, formState.inputs.password.value, formState.inputs.username.value, enteredPlatform, sendRequest);
      if (reqData) {  // The case the user successfully signed up.
        clearError(); // TODO: Make sure that not cause problems in edge cases.
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
      console.log(`Some unknown error occurred in signup page err, = ${e}`);
    }

  };

  const selectChanged = (val) => {// will need that to send the correct platform.
    setEnteredPlatform(val.target.value);
  };

  const optionsValues = ["psn", "xbl", "battle"];
  const optionsDescriptions = ["Playstation", "Xbox", "Battle.net"];

  return (
    <React.Fragment>
      <form className={classes.signup_form} onSubmit={placeSubmitHandler}>
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
        <Input
          id="password_verification"
          element="input"
          label="Password Verification"
          type="password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="The password is not identical."
          onInput={inputHandler}
          compareVal={formState.inputs.password.value}
        />
        <Input
          id="username"
          element="input"
          label="Platform Username"
          type="text"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid username."
          onInput={inputHandler}
        />
        <OptionSelector optionsValues={optionsValues} optionsDescriptions={optionsDescriptions} center={true} selectChanged={selectChanged} />
        <div className={classes.div4button}>
          <Button type="submit" disabled={!formState.isValid} parentClass={classes.signup_button}>
            Signup
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Signup;
