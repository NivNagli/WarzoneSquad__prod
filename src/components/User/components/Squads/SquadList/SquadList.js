import React from 'react';
import classes from './SquadList.module.css';
import SquadBasicDiv from './SquadBasicDiv';
import AddSquadButton from '../AddSquadButton';

const SquadList = props => {
    /* This component is pretty similar to the 'MatchList' component, but this time we display the general
     * stats of the given squad, and will give the user the 'add squad' button to add squads to his user. */
    if (!props.squadsArray.length) {
        return (
            <div className={classes.squad__list}>
                <h2 className={classes.squad_list_h2}> {"You don't have any squads yet."} </h2>
            </div>
        );
    }
    else {
        const Squads = [];
        for (let i = 0; i < props.squadsArray.length; i++) {
            Squads.push(<SquadBasicDiv data={props.squadsArray[i]} key={`${props.squadsArray[i].SquadName}${i}`}></SquadBasicDiv>);
        }
        return (
            <div className={classes.squad__list}>
                <h2 className={classes.squad_list_h2}> {props.squadListHeader} </h2>
                {Squads}
                <div className={classes.squad__add}>
                    <AddSquadButton token={props.token}></AddSquadButton>
                </div>
            </div>
        );
    }
};

export default SquadList;