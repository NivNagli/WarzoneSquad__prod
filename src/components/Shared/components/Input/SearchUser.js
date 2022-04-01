import Input from '../Input/Input';
import { VALIDATOR_REQUIRE } from '../../util/validators';
import { useForm } from '../../hooks/form-hook';
import React, { useEffect, useState } from 'react';
import classes from './SearchUser.module.css';
import OptionSelector from './OptionSelector';
const SearchUser = props => {
    /* This component is form which contains two type of input the first one is option select input
     * for the player platform, and the second one is 'Input' which will be used to get the player username. */

    // The two options variables are for the 'OptionSelector' component.
    const optionsValues = ["psn", "xbl", "battle"];
    const optionsDescriptions = ["Playstation", "Xbox", "Battle.net"];
    // The default is playstation platform.
    const [enteredPlatform, setEnteredPlatform] = useState('psn'); 
    // Using the custom form hook to determine if the inputs are valid.
    const [formState, inputHandler] = useForm(
        {
            username: {
                value: '',
                isValid: false
            }
        },
        false
    );
    // In order to use the most recent inputs we are using useEffect.
    useEffect(() => props.updateSearchFields({ username: formState.inputs.username.value, platform: enteredPlatform }), [enteredPlatform, formState.inputs.username.value, props]);
    const selectChanged = (val) => {
        /* I need to update the state of that platform in the form where this component
         will be, because in the end we will want to send the most updated platform the user pick */
        setEnteredPlatform(val.target.value);
    };

    return (
        <React.Fragment>
            <div className={classes.searchUser_div}>
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
            </div>
        </React.Fragment>
    );
};

export default SearchUser;