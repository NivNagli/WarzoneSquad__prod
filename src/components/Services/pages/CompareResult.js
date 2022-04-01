import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useHttpClient } from '../../Shared/hooks/http-hook';
import { Redirect } from 'react-router-dom'
import { playersCompareAttempt } from '../../../Middlewares/backend-requests';
import TeamTable from '../../Shared/components/TeamInfo/TeamTable';
import MatchList from '../../Shared/components/MatchInfo/MatchList';
import WarningMessage from '../../Shared/components/UI/WarningMessage';
import SuccessMessage from '../../Shared/components/UI/SuccessMessage';
import shortid from 'shortid';  // Using this package in order to generate a unique short id for each item in the list

const CompareResult = (props) => {
    let usersDataFound; // Flag that will help to determine when the user data is loaded.
    const location = useLocation(); // Will use the useLocation hook, to get the state that include the input we got from the player search component.
    const [usersFound, setUsersFound] = useState(false);  // Another flag that will operate as boolean flag to determine that the user data is loaded
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [usersData, setData] = useState(null);  // This is the variable which will hold the response from our database for the user search.


    useEffect(() => {
    }, [usersDataFound]);  // This useEffect will monitor the usersDataFound flag and will re-render the page when he change.

    if (!location.state) {  // If we didn't came from the 'PlayerSearch' component we need to redirect.
        return <Redirect to='/' />
    }
    const getUsersData = async () => {
        // Async function that will send a get request to the database with the user information.
        try {
            const reqData = await playersCompareAttempt(location.state.usernames, location.state.platforms, sendRequest);
            if (reqData) {
                clearError();
                setData(reqData);
                return 1;
            }
        }
        catch (e) {
            console.log(`Some unknown error occurred in compare result page, err = ${e}`);
        }

    };

    if (!usersFound) {
        // In case the user is not found yet we need to send request to the database.
        usersDataFound = getUsersData();
        if (usersDataFound) {
            setUsersFound(true);
        }
    }



    if (!usersData) {
        // The case we didn't receive yet the user information.
        return <div></div>;
    }

    else {
        if (usersData.data.playersSharedGamesStats.length) {
            // Display with the weekly state, in case they are exists.
            const teams = [];  // This will be array that contains 'TeamTable' components with the selected stats.

            const allTimeSortedByKills = [...sortStatsArray(usersData.data.allTimePlayersStats, "kills")];
            const allTimeSortedByDeaths = [...sortStatsArray(usersData.data.allTimePlayersStats, "deaths")];
            const allTimeSortedByKd = [...sortStatsArray(usersData.data.allTimePlayersStats, "kdRatio")];

            const sortByKills = [...sortStatsArray(usersData.data.playersSharedGamesStats, "kills")];
            const sortByDeaths = [...sortStatsArray(usersData.data.playersSharedGamesStats, "deaths")];
            const sortByAssists = [...sortStatsArray(usersData.data.playersSharedGamesStats, "assists")];
            const sortByDamage = [...sortStatsArray(usersData.data.playersSharedGamesStats, "damageDone")];
            const sortByKd = [...sortStatsArray(usersData.data.playersSharedGamesStats, "kdRatio")];

            teams.push(<TeamTable key={shortid.generate()} tableSubHeader={"Shared Games Stats"} tableHeader={"The Effective"} playersData={sortByKd} wantedStats={["kdRatio"]}></TeamTable>)
            teams.push(<TeamTable key={shortid.generate()} tableSubHeader={"All Time Stats"} tableHeader={"The Effective"} playersData={allTimeSortedByKd} wantedStats={["kdRatio"]}></TeamTable>)

            teams.push(<TeamTable key={shortid.generate()} tableSubHeader={"Shared Games Stats"} tableHeader={"The Killer"} playersData={sortByKills} wantedStats={["kills"]}></TeamTable>)
            teams.push(<TeamTable key={shortid.generate()} tableSubHeader={"All Time Stats"} tableHeader={"The Killer"} playersData={allTimeSortedByKills} wantedStats={["kills"]}></TeamTable>)

            teams.push(<TeamTable key={shortid.generate()} tableSubHeader={"Shared Games Stats"} tableHeader={"The Surviver"} playersData={sortByDeaths.reverse()} wantedStats={["deaths"]}></TeamTable>)
            teams.push(<TeamTable key={shortid.generate()} tableSubHeader={"All Time Stats"} tableHeader={"The Surviver"} playersData={allTimeSortedByDeaths.reverse()} wantedStats={["deaths"]}></TeamTable>)

            teams.push(<TeamTable key={shortid.generate()} tableSubHeader={"Shared Games Stats"} tableHeader={"The Supporter"} playersData={sortByAssists} wantedStats={["assists"]}></TeamTable>)
            teams.push(<TeamTable key={shortid.generate()} tableSubHeader={"Shared Games Stats"} tableHeader={"The Punisher"} playersData={sortByDamage} wantedStats={["damageDone"]}></TeamTable>)

            return (
                <React.Fragment>
                    {usersData.data.dateCreated && <SuccessMessage msg={`The data is based on existing squad that created by registered user on ${usersData.data.dateCreated}`}></SuccessMessage>}
                    {teams}
                    <MatchList matchListHeader={"Last Shared Games:"} teamView={true} matches={usersData.data.sharedGamesGeneralStats} numOfMatches={20}></MatchList>
                </React.Fragment>
            );
        }
        else {
            // The case the players don't have shared games on their last games.
            const teams = [];

            const allTimeSortedByKills = [...sortStatsArray(usersData.data.allTimePlayersStats, "kills")];
            const allTimeSortedByDeaths = [...sortStatsArray(usersData.data.allTimePlayersStats, "deaths")];
            const allTimeSortedByKd = [...sortStatsArray(usersData.data.allTimePlayersStats, "kdRatio")];
            const allTimeSortedByWins = [...sortStatsArray(usersData.data.allTimePlayersStats, "wins")];
            const allTimeSortedBySpm = [...sortStatsArray(usersData.data.allTimePlayersStats, "scorePerMinute")];
            const allTimeSortedByGames = [...sortStatsArray(usersData.data.allTimePlayersStats, "gamesPlayed")];
            teams.push(<TeamTable key={shortid.generate()} tableSubHeader={"All Time Stats"} tableHeader={"The Winner"} playersData={allTimeSortedByWins} wantedStats={["wins"]}></TeamTable>)
            teams.push(<TeamTable key={shortid.generate()} tableSubHeader={"All Time Stats"} tableHeader={"The Effective"} playersData={allTimeSortedByKd} wantedStats={["kdRatio"]}></TeamTable>)
            teams.push(<TeamTable key={shortid.generate()} tableSubHeader={"All Time Stats"} tableHeader={"The Killer"} playersData={allTimeSortedByKills} wantedStats={["kills"]}></TeamTable>)
            teams.push(<TeamTable key={shortid.generate()} tableSubHeader={"All Time Stats"} tableHeader={"The Surviver"} playersData={allTimeSortedByDeaths.reverse()} wantedStats={["deaths"]}></TeamTable>)
            teams.push(<TeamTable key={shortid.generate()} tableSubHeader={"All Time Stats"} tableHeader={"The Scorer"} playersData={allTimeSortedBySpm} wantedStats={["scorePerMinute"]}></TeamTable>)
            teams.push(<TeamTable key={shortid.generate()} tableSubHeader={"All Time Stats"} tableHeader={"The Veteran"} playersData={allTimeSortedByGames} wantedStats={["gamesPlayed"]}></TeamTable>)
            return (
                <React.Fragment>
                    <WarningMessage msg={"The players does not have shared matches in their last 100 matches."}></WarningMessage>
                    {teams}
                </React.Fragment>
            );
        }
    }
};

export default CompareResult;

const sortStatsArray = (statsArray, statToSortBy) => {
    /* This method will help us the sort the players objects array by selected stat */
    statsArray.sort((x, y) => {
        return parseFloat(y[statToSortBy]) - parseFloat(x[statToSortBy]);
    });
    return statsArray;
};


