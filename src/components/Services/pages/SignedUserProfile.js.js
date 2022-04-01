import React, { useEffect, useState } from 'react';
import classes from './SignedUserProfile.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../../store/auth';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import LoadingSpinner from '../../Shared/components/UI/LoadingSpinner';
import ErrorMessage from '../../Shared/components/UI/ErrorMessage';
import GreetingMessage from '../../Shared/components/UI/GreetingMessage';
import { getUserData } from '../../../Middlewares/backend-requests';
import { useHistory } from "react-router-dom";
import SquadList from '../../User/components/Squads/SquadList/SquadList';
import SignedUserGeneralStats from '../../User/components/GeneralStats/SignedUserGeneralStats';

const SignedUserProfile = props => {
    const dispatch = useDispatch();
    let history = useHistory();
    const token = useSelector(state => state.auth.token);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    let usersDataFound; // Flag that will help to determine when the user data is loaded.
    useEffect(() => {
    }, [usersDataFound]);  // This useEffect will monitor the usersDataFound flag and will re-render the page when he change.
    const [usersFound, setUsersFound] = useState(false);  // Another flag that will operate as boolean flag to determine that the user data is loaded
    const [userData, setData] = useState(null);  // This is the variable which will hold the response from our database for the user search.
    const getUserData2 = async () => {
        // Async function that will send a get request to the database with the user information.
        try {
            let backupToken;
            if (!token) {
                console.log("Using backup token, check why the redux one disappear!");
                backupToken = localStorage.getItem('token');
            }
            else {
                backupToken = token;
            }
            if (!backupToken) {
                dispatch(authActions.logout());
                return history.push("/");
            }
            const reqData = await getUserData(backupToken, sendRequest);
            if (reqData) {
                clearError();
                setData(reqData);
                return 1;
            }
        }
        catch (e) {
            console.log(`Some unknown error occurred in the player profile page, err = ${e}`);
        }

    };

    if (!usersFound) {
        // In case the user is not found yet we need to send request to the database.
        usersDataFound = getUserData2();
        if (usersDataFound) {
            setUsersFound(true);
        }
    }
    if (!userData) {
        // The case we didn't receive yet the user information.
        return <div>
            {isLoading && <LoadingSpinner asOverlay />}
            {(!isLoading && error) && <ErrorMessage error={error} />}
        </div>;
    }

    else {
        const fixedName = getUserName(userData);
        return (
            <React.Fragment>
                {isLoading && <LoadingSpinner asOverlay />}
                {(!isLoading && error) && <ErrorMessage error={error} />}
                <GreetingMessage title={`Welcome ${fixedName}`} message="We are always happy to see you using the site!" subMessage="WarzoneSquad Team"></GreetingMessage>
                <SquadList token={token} squadListHeader={"Your Squads"} squadsArray={userData.data.userData.squadList}></SquadList>
                <SignedUserGeneralStats generalStats={userData.data.userData.gameProfile.generalStats} lastGamesStats={userData.data.userData.gameProfile.lastGamesStats}></SignedUserGeneralStats>

            </React.Fragment>
        );
    }

};

const getUserName = (userData) => {
    // Because we save the username in the database in the encoding versa for pc players we need to convert them back to their original struct.
    if(userData.data.userData.gameProfile.platform !== 'battle') {
        return userData.data.userData.gameProfile.username;
    }
    else {
        const splittedName = userData.data.userData.gameProfile.username.split('%2523');
        return splittedName[0] + '#' + splittedName[1];
    }
};

export default SignedUserProfile;