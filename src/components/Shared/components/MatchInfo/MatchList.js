import React, { useEffect } from 'react';
import classes from './MatchList.module.css';
import MatchBasicDiv from './MatchBasicDiv';
import ErrorMessage from '../UI/ErrorMessage';
import LoadingSpinner from '../UI/LoadingSpinner';

import { useHttpClient } from '../../hooks/http-hook';
import { useHistory } from "react-router-dom";
import { matchSearchAttempt } from '../../../../Middlewares/backend-requests';

const MatchList = props => {
    /* As the name sound like this component will be a div that contain list of matches, for each match 
     * we send a async function that send a get request to the server and search for the match information
     * in case we found that match we redirect to the MatchResult page of that match. */

    const matches = [];
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    useEffect(() => { }, [error]);
    let history = useHistory();
    const searchSubmitHandler = async matchID => {
        /* This method will be transferred to the 'MatchBasicDiv' div component, in order to handle
           the event click on the specific game */
        try {
            const reqData = await matchSearchAttempt(matchID, sendRequest);
            if (reqData) {
                clearError();
                history.push({
                    pathname: `/matchSearch/${matchID}/`,
                    state: { matchID: matchID }
                });
            }
        }
        catch (e) {
            console.log(`Some unknown error occurred in search operation inside 'MatchList' component, err = ${e}`);
        }
    };

    if (!props.numOfMatches) {
        // The case we didn't get the number of matches that need to be displayed.
        if (props.matches.length > 20) {
            if (props.signedUser) {
                for (let i = 0; i < props.matches.length; i++) {
                    matches.push(<MatchBasicDiv teamView={props.teamView} onSearch={searchSubmitHandler} data={props.matches[i]} key={props.matches[i].matchID}></MatchBasicDiv>);
                }
            }
            else {
                for (let i = 0; i < 20; i++) {
                    matches.push(<MatchBasicDiv teamView={props.teamView} onSearch={searchSubmitHandler} data={props.matches[i]} key={props.matches[i].matchID}></MatchBasicDiv>);
                }
            }
        }
        else {
            for (let i = 0; i < props.matches.length; i++) {
                matches.push(<MatchBasicDiv teamView={props.teamView} onSearch={searchSubmitHandler} data={props.matches[i]} key={props.matches[i].matchID}></MatchBasicDiv>);
            }
        }
    }
    else {
        if (props.numOfMatches > props.matches.length) {
            for (let i = 0; i < props.matches.length; i++) {
                matches.push(<MatchBasicDiv teamView={props.teamView} onSearch={searchSubmitHandler} data={props.matches[i]} key={props.matches[i].matchID}></MatchBasicDiv>);
            }
        }
        else {
            for (let i = 0; i < props.numOfMatches; i++) {
                matches.push(<MatchBasicDiv teamView={props.teamView} onSearch={searchSubmitHandler} data={props.matches[i]} key={props.matches[i].matchID}></MatchBasicDiv>);
            }
        }

    }
    return (
        <div className={classes.match__list}>
            {isLoading && <LoadingSpinner asOverlay />}
            {error && <ErrorMessage error={error} />}
            <h2 className={classes.match_list_h2}> {props.matchListHeader} </h2>
            {matches}
        </div>
    );
};

export default MatchList;