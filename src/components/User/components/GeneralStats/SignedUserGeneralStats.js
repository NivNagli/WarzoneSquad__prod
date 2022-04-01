import React from 'react';
import {lifeTimeFilter, allWeeklyFilter} from '../../../Shared/util/dataFilters';
import MatchList from '../../../Shared/components/MatchInfo/MatchList';
import GeneralStatsTable from '../../../Shared/components/Tables/GeneralStatsTable';


const SignedUserGeneralStats = props => {
    /* This component is almost identical to the the GeneralStatsTable but this time we dont display the
     * username header and we display the last 100 games instead of the 20, i could make generic component
     * that will cover both components but in order to save time i just created this one instead */

    
    // First we will filter the information first the 'all time' information and then the 'weekly' in case he exists.
    const lifetimeDataByOrder = (({ kdRatio, kills, deaths, scorePerMinute, timePlayed, gamesPlayed, wins, downs, revives, topTwentyFive, topTen, topFive }) => ({ kdRatio, kills, deaths, scorePerMinute, timePlayed, gamesPlayed, wins, downs, revives, topTwentyFive, topTen, topFive }))(props.generalStats.br_lifetime_data);
    const filteredLifetimeStats = lifeTimeFilter(lifetimeDataByOrder);
    let filteredWeeklyStats;
    if (props.generalStats.weeklyStats) {
        if (props.generalStats.weeklyStats.all) {
            const weeklyDataByOrder = (({ kdRatio, kills, deaths, scorePerMinute, timePlayed, matchesPlayed, killsPerGame, assists, damageDone, damageTaken, distanceTraveled, avgLifeTime }) => ({ kdRatio, kills, deaths, scorePerMinute, timePlayed, matchesPlayed, killsPerGame, assists, damageDone, damageTaken, distanceTraveled, avgLifeTime }))(props.generalStats.weeklyStats.all);
            filteredWeeklyStats = allWeeklyFilter(weeklyDataByOrder);
        }
    }
    if (filteredWeeklyStats) {
        // Display with the weekly state, in case they are exists.
        return (
            <React.Fragment>
                <GeneralStatsTable header={"Lifetime Stats"} data={filteredLifetimeStats}></GeneralStatsTable>
                <GeneralStatsTable header={"Weekly Stats"} data={filteredWeeklyStats}></GeneralStatsTable>
                <MatchList signedUser={true} matchListHeader={"Last 100 Games:"} matches={props.lastGamesStats}></MatchList>
            </React.Fragment>
        );
    }
    else {
        // The case the player did not play in this week.
        return (
            <React.Fragment>
                <GeneralStatsTable header={"Lifetime Stats"} data={filteredLifetimeStats}></GeneralStatsTable>
                <MatchList signedUser={true} matchListHeader={"Last 100 Games:"} matches={props.lastGamesStats}></MatchList>
            </React.Fragment>
        );
    }
};

export default SignedUserGeneralStats;