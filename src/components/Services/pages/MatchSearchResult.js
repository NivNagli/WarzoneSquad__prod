import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useHttpClient } from '../../Shared/hooks/http-hook';
import ErrorMessage from '../../Shared/components/UI/ErrorMessage';
import { Redirect } from 'react-router-dom'
import { matchSearchAttempt } from '../../../Middlewares/backend-requests';
import TeamTable from '../../Shared/components/TeamInfo/TeamTable';
import LoadingSpinner from '../../Shared/components/UI/LoadingSpinner';

const MatchSearchResult = props => {
    /* This component is the main element of the search result for match, he will contain list of 'TeamTable'
     * components that will represent each team in the match and their stats */
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    useEffect(() => { }, [error]);
    let matchFlag;
    const location = useLocation();
    const [matchFound, setMatchFound] = useState(false);
    const [matchData, setData] = useState(null);
    useEffect(() => {
    }, [matchFlag])

    useEffect(() => {
        // Scroll to the top of the page.
        window.scrollTo(0, 0)
      }, [])

    if (!location.state) {
        return <Redirect to='/' />
    }
    const getMatchData = async () => {
        // Async function that will responsible for loading the match data from the server.
        try {
            const reqData = await matchSearchAttempt(location.state.matchID, sendRequest);
            if (reqData) {
                // The case of successful request.
                clearError();
                setData(reqData);
                return 1;
            }
        }
        catch (e) {
            console.log(`Some unknown error occurred in search result page, err = ${e}`);
        }

    };

    if (!matchFound) {
        matchFlag = getMatchData();
        if (matchFlag) {
            setMatchFound(true);
        }
    }
    if (!matchData) {
        // The case the request did not done yet.
        return <div></div>;
    }
    else {
        // The case we found the match data and now we will display each team in separate table.
        const teams = [];
        matchData.data.matchStats.forEach((dataObj, index) => {
            teams.push(<TeamTable tableHeader={`Placement: ${dataObj[0].teamPlacement}`} key={index} playersData={dataObj} wantedStats={["kills", "kdRatio", "deaths", "damageDone", "damageTaken"]}></TeamTable>)
        });
        return (
            <React.Fragment>
                {isLoading && <LoadingSpinner asOverlay />}
                {error && <ErrorMessage error={error} />}
                {teams}
            </React.Fragment>
        );
    }
};

export default MatchSearchResult;