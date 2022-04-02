import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import classes from './AddSquadForm.module.css';

// Components imports:
import SearchUser from '../../../Shared/components/Input/SearchUser';
import Button from '../../../Shared/components/Button/Button';
import OptionSelector from '../../../Shared/components/Input/OptionSelector';
import LoadingSpinner from '../../../Shared/components/UI/LoadingSpinner';
import ErrorMessage from '../../../Shared/components/UI/ErrorMessage';
import WarningMessage from '../../../Shared/components/UI/WarningMessage';
import Input from '../../../Shared/components/Input/Input';
import { useForm } from '../../../Shared/hooks/form-hook';
import {
    VALIDATOR_REQUIRE
} from '../../../Shared/util/validators';

// custom and built-in hooks imports:
import { useHttpClient } from '../../../Shared/hooks/http-hook';
import { addSquad } from '../../../../Middlewares/backend-requests';

const AddSquadForm = (props) => {
    /* This component is very similar to the 'CompareSearch' component, but this time we are receiving the jwt
     * token from the props and also addressing to the 'add-squad' service in the server with the usernames,
     * platforms and the squad name that we receive in the component here. 
     * We also receive via the props function that will be called when request succeeded. */

    /* 4 potential users states for the search field results */
    const [enteredPlatformUser1, setEnteredPlatformUser1] = useState('psn');
    const [enteredUsernameUser1, setEnteredUsernameUser1] = useState('');
    const onChangeSearchFieldsUser1 = (inputs) => {
        setEnteredPlatformUser1((inputs.platform));
        setEnteredUsernameUser1(inputs.username);
    };

    const [enteredPlatformUser2, setEnteredPlatformUser2] = useState('psn');
    const [enteredUsernameUser2, setEnteredUsernameUser2] = useState('');
    const onChangeSearchFieldsUser2 = (inputs) => {
        setEnteredPlatformUser2((inputs.platform));
        setEnteredUsernameUser2(inputs.username);
    };

    const [enteredPlatformUser3, setEnteredPlatformUser3] = useState('psn');
    const [enteredUsernameUser3, setEnteredUsernameUser3] = useState('');
    const onChangeSearchFieldsUser3 = (inputs) => {
        setEnteredPlatformUser3((inputs.platform));
        setEnteredUsernameUser3(inputs.username);
    };

    const [enteredPlatformUser4, setEnteredPlatformUser4] = useState('psn');
    const [enteredUsernameUser4, setEnteredUsernameUser4] = useState('');
    const onChangeSearchFieldsUser4 = (inputs) => {
        setEnteredPlatformUser4((inputs.platform));
        setEnteredUsernameUser4(inputs.username);
    };

    // Using the custom hook useForm in order to monitor the squad name from the input.
    const [formState, inputHandler] = useForm(
        {
            squadName: {
                value: '',
                isValid: false
            }
        },
        false
    );
    // =================================================================

    const [whileSearch, setWhileSearch] = useState(false); // This state will prevent spamming from the user while searching
    let history = useHistory();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    useEffect(() => { }, [error]);  // Render the component each time the error is changed.

    // options values for number of players select component.
    const optionsValues = [2, 3, 4];
    const optionsDescriptions = ["2 Players", "3 Players", "4 Players"];

    /* State that will hold the number of players select and afterwards a function who will responsible for update this state */
    const [enteredNumberOfPlayers, setEnteredNumberOfPlayers] = useState(2);  // init for 2 players as default.
    const selectChanged = (val) => {
        // The method that will be called when the user select new number of players.
        setEnteredNumberOfPlayers(val.target.value);
    };

    /* Setting form validation state and also make a function inside useEffect for update the state condition */
    const [formIsValid, setFormIsValid] = useState(false);
    useEffect(() => {
        /* The different here between the 'CompareSearch' is that here we also verify that we receive squad name */
        if (enteredNumberOfPlayers === 2 || enteredNumberOfPlayers === '2') {
            setFormIsValid(enteredUsernameUser1 && enteredUsernameUser2 && formState.inputs.squadName.value);
        }
        else if (enteredNumberOfPlayers === 3 || enteredNumberOfPlayers === '3') {
            setFormIsValid(enteredUsernameUser1 && enteredUsernameUser2 && enteredUsernameUser3 && formState.inputs.squadName.value);
        }

        else if (enteredNumberOfPlayers === 4 || enteredNumberOfPlayers === '4') {
            setFormIsValid(enteredUsernameUser1 && enteredUsernameUser2 && enteredUsernameUser3 && enteredUsernameUser4 && formState.inputs.squadName.value);
        }
        else {
            console.log("Invalid number of users entered!");
            setFormIsValid(false);
        }

    }, [enteredNumberOfPlayers, enteredUsernameUser1, enteredUsernameUser2, enteredUsernameUser3, enteredUsernameUser4, formState.inputs.squadName.value]);

    const placeSubmitHandler = async event => {
        /* This is the method that will be called when the user click the submit button for the add-squad */
        event.preventDefault();
        setWhileSearch(true); // Will set the search button into disabled in order to prevent spamming the search.
        let userFound = false;

        try {
            // Making the inputs arrays, using the slice method to get only the submitted inputs.
            const usernames = [enteredUsernameUser1, enteredUsernameUser2, enteredUsernameUser3, enteredUsernameUser4].slice(0, enteredNumberOfPlayers);
            const platforms = [enteredPlatformUser1, enteredPlatformUser2, enteredPlatformUser3, enteredPlatformUser4].slice(0, enteredNumberOfPlayers);
            // Send the request to the server.
            console.log(props.token, usernames, platforms, formState.inputs.squadName.value, '$$$');
            const reqData = await addSquad(props.token, usernames, platforms, formState.inputs.squadName.value, sendRequest);
            if (reqData) {
                // The case of successful request.
                userFound = true;
                clearError();
                setWhileSearch(false);
                // Refresh the page in order to send request again to server and get the updated squads list */
                history.go(0);
            }
        }
        catch (e) {
            // The case of unsuccessful request, the 'error' variable from the useHttpClient will help us to display the error.
            console.log(`Some unknown error occurred in search page, err = ${e}`);
        }
        if (!userFound) {
            setWhileSearch(false);
        };

    };

    const playersDataArray = [
        <SearchUser updateSearchFields={onChangeSearchFieldsUser1} key="User1FromAddSquad" />,
        <SearchUser updateSearchFields={onChangeSearchFieldsUser2} key="User2FromAddSquad" />,
        <SearchUser updateSearchFields={onChangeSearchFieldsUser3} key="User3FromAddSquad" />,
        <SearchUser updateSearchFields={onChangeSearchFieldsUser4} key="User4FromAddSquad" />
    ]
    return (
        <React.Fragment>
            {isLoading && <WarningMessage msg={"For the first time searching a user, the operation take between 30 sec to 2 minutes. And that's so in the next time the search will be faster."}></WarningMessage>}
            {(!isLoading && error) && <ErrorMessage error={error} />}
            <div className={classes.squad__name}>
                    <Input
                        id="squadName"
                        element="input"
                        label="Please Name The New Squad:"
                        type="text"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid squad name."
                        onInput={inputHandler}
                    />
                </div>
            <form className={classes.addSquad_form} onSubmit={placeSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                <div className={classes.players_select_div}>
                    <h3 className={classes.addSquad_header}>Select Number Of Players</h3>
                    <OptionSelector optionsValues={optionsValues} optionsDescriptions={optionsDescriptions} center={true} selectChanged={selectChanged} />
                </div>
                {playersDataArray.slice(0, enteredNumberOfPlayers)}
                <div className={classes.div4button}>
                    <Button type="submit" disabled={!formIsValid || whileSearch} parentClass={classes.addSquad_button}>
                        addSquad
                    </Button>
                </div>
            </form>
        </React.Fragment>
    );
};

export default AddSquadForm;