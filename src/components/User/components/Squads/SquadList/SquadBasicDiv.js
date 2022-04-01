import React from 'react';
import classes from './SquadBasicDiv.module.css';
import SquadSubHeader from './SquadSubHeaders';
import SquadBasicInfo from './SquadBasicInfo';
import { useHistory } from "react-router-dom";

const SquadBasicDiv = props => {
    let history = useHistory();
    const { SquadAssists, SquadDamage, SquadDeaths, SquadKills, SquadName, avgSquadKd, numberOfMatches, platforms, usernames } = props.data;
    const fixedUserNames = fixedBattleUserNames(usernames, platforms);
    const squadSearch = () => {
        history.push({
            pathname: `/playersCompare/${usernames.join('_')}`,
            state: { usernames: fixedUserNames, platforms: platforms }
        });
    };

    if (!numberOfMatches) {
        // The case the squad does not have shared games yet.
        // return null;
        return (
            <div className={classes.squad__div} onClick={squadSearch}>
                <div className={classes.squad__head_info}>
                    <SquadSubHeader top={`${props.data.squadName}`} bottom={`Have 0 Shared Games`}></SquadSubHeader>
                    <SquadBasicInfo top={"K/D"} bottom={"-"}></SquadBasicInfo>
                    <SquadBasicInfo top={"Kills"} bottom={"-"}></SquadBasicInfo>
                </div>
                <div className={classes.squad__tail_info}>
                    <SquadBasicInfo top={"Deaths"} bottom={"-"}></SquadBasicInfo>
                    <SquadBasicInfo top={"damageDone"} bottom={"-"}></SquadBasicInfo>
                    <SquadBasicInfo top={"Assists"} bottom={"-"}></SquadBasicInfo>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className={classes.squad__div} onClick={squadSearch}>
                <div className={classes.squad__head_info}>
                    <SquadSubHeader top={`${SquadName}:`} bottom={`Stats from ${numberOfMatches} matches`}></SquadSubHeader>
                    <SquadBasicInfo top={"K/D"} bottom={avgSquadKd.toFixed(2)}></SquadBasicInfo>
                    <SquadBasicInfo top={"Kills"} bottom={SquadKills}></SquadBasicInfo>
                </div>
                <div className={classes.squad__tail_info}>
                    <SquadBasicInfo top={"Deaths"} bottom={SquadDeaths}></SquadBasicInfo>
                    <SquadBasicInfo top={"damageDone"} bottom={SquadDamage}></SquadBasicInfo>
                    <SquadBasicInfo top={"Assists"} bottom={SquadAssists}></SquadBasicInfo>
                </div>
            </div>
        );
    }

};

export default SquadBasicDiv;

const fixedBattleUserNames = (usernames, platforms) => {
    // Because we save the username in the database in the encoding versa for pc players we need to convert them back to their original struct.
    const result = [];
    platforms.forEach((platform,index) => {
        if(platform !== 'battle') {
            return result.push(usernames[index]);
        }
        else {
            const splittedName = usernames[index].split('%2523');
            result.push(splittedName[0] + '#' + splittedName[1]);
        }
    });
    return result;
};
